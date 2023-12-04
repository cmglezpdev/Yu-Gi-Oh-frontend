<template>
  <div class="relative">
    <div v-if="isLoading" class="fixed w-full h-screen z-50">
      <div class="flex justify-center h-96 items-center">
        <ProgressSpinner style="width: 80px; height: 80px" strokeWidth="8" fill="var(--surface-ground)"
          animationDuration=".5s" aria-label="Custom ProgressSpinner" />
      </div>
    </div>
    <div class="flex flex-row w-full justify-center text-lg">
      <h1>{{ isModeEdit ? 'Editar Deck' : 'Crear Deck' }}</h1>
    </div>
    <form class="w-full flex flex-col gap-4 p-6"> <span class="p-float-label ">
        <InputText v-model="deck_create_form.title.value" :disabled="!deck_create_form.title.enabled"
          :class="{ 'p-invalid': !deck_create_form.title.valid, 'p-valid': deck_create_form.title.valid }" class="w-full"
          type="text" placeholder="Normal" @click="deck_create_form.title.touched = true" />
        <label for="number-input">Nombre del deck</label>
        <transition name="fade" mode="out-in">
          <div v-if="!deck_create_form.title.valid" class="text-red-700">campo requerido</div>
        </transition>
      </span>

      <span class="p-float-label ">
        <AutoComplete forceSelection v-model="deck_create_form.archetype.value" optionLabel="name"
          :disabled="!deck_create_form.archetype.enabled" class="w-full"
          :class="{ 'p-invalid': !deck_create_form.archetype.valid }" :suggestions="items" @complete="search"
          inputStyle="width: 100%;" @click="deck_create_form.archetype.touched = true">
          <template #option="slotProps">
            <div @click="selectArchetype(slotProps.option.id)">
              {{ slotProps.option.name }}
            </div>
          </template>
        </AutoComplete>
        <label for="number-input">Arquetipo</label>
        <transition name="fade" mode="out-in">
          <div v-if="!deck_create_form.archetype.valid" class="text-red-700">campo requerido</div>
        </transition>
      </span>

      <span class="p-float-label">
        <InputNumber id="number-input" class="w-full" v-model="deck_create_form.cardCount.value"
          :disabled="!deck_create_form.cardCount.enabled" :class="{ 'p-invalid': !deck_create_form.cardCount.valid }"
          @click="deck_create_form.cardCount.touched = true" />
        <label for="number-input">cartas en el deck</label>
        <transition name="fade" mode="out-in">
          <div v-if="!deck_create_form.cardCount.valid" class="text-red-700">campo requerido</div>
        </transition>
      </span>
      <span class="p-float-label">
        <InputNumber id="number-input" class="w-full" v-model="deck_create_form.sideDeck.cardCount.value"
          :disabled="!deck_create_form.sideDeck.cardCount.enabled"
          :class="{ 'p-invalid': !deck_create_form.sideDeck.cardCount.valid }"
          @click="deck_create_form.sideDeck.cardCount.touched = true" />
        <label for="number-input">cartas en el side deck</label>
        <transition name="fade" mode="out-in">
          <div v-if="!deck_create_form.sideDeck.cardCount.valid" class="text-red-700">campo requerido</div>
        </transition>
      </span>
      <span class="p-float-label">
        <InputNumber id="number-input" class="w-full" v-model="deck_create_form.extraDeck.cardCount.value"
          :disabled="!deck_create_form.extraDeck.cardCount.enabled"
          :class="{ 'p-invalid': !deck_create_form.extraDeck.cardCount.valid }"
          @click="deck_create_form.extraDeck.cardCount.touched = true" />
        <transition name="fade" mode="out-in">
          <div v-if="!deck_create_form.extraDeck.cardCount.valid" class="text-red-700">campo requerido</div>
        </transition>
        <label for="number-input">cartas en el extra deck</label>
      </span>
      <Button @click="onSubmit" :label="isModeEdit ? 'Editar Deck' : 'Crear Deck'" icon="pi pi-check"
        :disabled="deck_create_form.invalid" />
    </form>
  </div>
</template>
<script setup lang="ts">
import AutoComplete from 'primevue/autocomplete';
import InputNumber from 'primevue/inputnumber';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import ProgressSpinner from 'primevue/progressspinner';
import { ref, watch, defineProps, reactive, toRefs, onMounted } from 'vue';
import { editUserDeck, addUserDeck, getDeckInfo } from '@/utils/deck.service';
import { fetchArchetypes } from '@/utils/archetype.service';

const emit = defineEmits();

const isLoading = ref(false);

let selectedId  ;

const props = defineProps({
  isModeEdit: Boolean,
  deckId: String
});

const { isModeEdit, deckId } = toRefs(props);

const validatorRequired = (elem) => elem != null;

const validatorMin = (minv) => {
  return (elem) => elem >= minv;
}

const selectArchetype = (id) => {
  selectedId = id;
}

const deck_create_form = reactive({
  title: {
    value: null,
    valid: true,
    enabled: true,
    touched: false,
    validators: [validatorRequired]
  },
  archetype: {
    value: null,
    valid: true,
    enabled: true,
    touched: false,
    validators: [validatorRequired]
  },
  cardCount: {
    value: null,
    valid: true,
    enabled: true,
    touched: false,
    validators: [validatorRequired, validatorMin(0)]
  },
  extraDeck: {
    cardCount: {
      value: null,
      valid: true,
      enabled: true,
      touched: false,
      validators: [validatorRequired, validatorMin(0)]
    }
  },
  sideDeck: {
    cardCount: {
      value: null,
      valid: true,
      enabled: true,
      touched: false,
      validators: [validatorRequired, validatorMin(0)]
    }
  },
  valid: true,
  invalid: false
})

const enableForm = (form) => {
  for (let field of Object.keys(form)) {
    if (Object.keys(form[field]).includes('enabled')) {
      form[field]['enabled'] = true;
    } else {
      enableForm(form[field]);
    }
  }
}


const disableForm = (form) => {
  for (let field of Object.keys(form)) {
    if (Object.keys(form[field]).includes('enabled')) {
      form[field]['enabled'] = false;
    } else {
      disableForm(form[field]);
    }
  }
}


const checkValidity = (form) => {
  let isvalid = true;
  for (let field of Object.keys(form)) {
    if (Object.keys(form[field]).includes('valid')) {
      let validity = true;
      for (let validator of form[field]['validators']) {
        validity = validity && validator(form[field]['value'])
      }
      form[field]['valid'] = !form[field]['touched'] || validity;
      isvalid = isvalid && validity;
    } else {
      isvalid = checkValidity(form[field]) && isvalid;
    }
  }
  return isvalid;
}


watch(() => {
  deck_create_form.valid = checkValidity(deck_create_form);
  deck_create_form.invalid = !deck_create_form.valid;
})

if (isModeEdit.value) {
  isLoading.value = true;
  disableForm(deck_create_form);
  getDeckInfo(deckId!.value!)
    .then(
      (resp:any) => {
        isLoading.value = false;
        deck_create_form.title.value = resp.title
        deck_create_form.archetype.value = resp.arquetype;
        deck_create_form.cardCount.value = resp.cardCount;
        deck_create_form.sideDeck.cardCount.value = resp.cardCount;
        deck_create_form.extraDeck.cardCount.value = resp.cardCount;
        enableForm(deck_create_form);
        checkValidity(deck_create_form)
      }
    )
}

const onSubmit = async () => {
  const archetypes = await fetchArchetypes() as any[];
  const archetype = archetypes.find(atype => atype.name == deck_create_form.archetype.value)

  // console.log( deck_create_form.archetype.value)

  if (isModeEdit.value) {
    isLoading.value = true;
    disableForm(deck_create_form);

    const deck = {
      deckId,
      title: deck_create_form.title.value,
      arquetype: archetype.id,
      cardCount: deck_create_form.cardCount.value,
      sideDeck: {
        cardCount: deck_create_form.sideDeck.cardCount.value
      },
      extraDeck: {
        cardCount: deck_create_form.extraDeck.cardCount.value
      }
    }
    console.log(deck)
    alert()
    await editUserDeck(deck);
    emit('deckEdited');
  } else {

    isLoading.value = true;
    disableForm(deck_create_form);

    const deck = {
      title: deck_create_form.title.value,
      arquetype: deck_create_form.archetype.value,
      cardCount: deck_create_form.cardCount.value,
      sideDeck: {
        cardCount: deck_create_form.sideDeck.cardCount.value
      },
      extraDeck: {
        cardCount: deck_create_form.extraDeck.cardCount.value
      }
    }


    await addUserDeck(deck);
    emit('deckCreated');
  }
  emit('close');
}
const items = ref([]);

onMounted(() => {
  fetchArchetypes();
})

const search = async (event) => {
  const { query } = event;
  isLoading.value = true;
  const all = await fetchArchetypes();
  isLoading.value = false;
  items.value = all.filter(elem => elem.name.toLowerCase().includes(query.toLowerCase()));
}

// disableForm(deck_create_form)
checkValidity(deck_create_form);

</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 1.9s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
