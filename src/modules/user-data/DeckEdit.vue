<template>
  <ProgressSpinner style="width: 50px; height: 50px" strokeWidth="8" fill="var(--surface-ground)" animationDuration=".5s"
    aria-label="Custom ProgressSpinner" v-if="isLoading" />
  <div class="flex flex-row w-full justify-center text-lg">
    <h1>{{ isModeEdit ? 'Editar Carta' : 'Crear Carta' }}</h1>
  </div>
  <form class="w-full flex flex-col gap-4 p-6"> <span class="p-float-label ">
      <InputText v-model="deck_create_form.title.value" :disabled="!deck_create_form.title.enabled"
        :class="{ 'p-invalid': !deck_create_form.title.valid, 'p-valid': deck_create_form.title.valid }" class="w-full"
        type="text" placeholder="Normal" />
      <label for="number-input">Nombre del deck</label>
    </span>

    <span class="p-float-label ">
      <AutoComplete v-model="deck_create_form.archetype.value" :disabled="!deck_create_form.archetype.enabled"
        class="w-full" :class="{ 'p-invalid': !deck_create_form.archetype.valid }" :suggestions="items"
        @complete="search" inputStyle="width: 100%;" />
      <label for="number-input">Arquetipo</label>
    </span>

    <span class="p-float-label">
      <InputNumber id="number-input" class="w-full" v-model="deck_create_form.cardCount.value"
        :disabled="!deck_create_form.cardCount.enabled" :class="{ 'p-invalid': !deck_create_form.cardCount.valid }" />
      <label for="number-input">cartas en el deck</label>
    </span>
    <span class="p-float-label">
      <InputNumber id="number-input" class="w-full" v-model="deck_create_form.sideDeck.cardCount.value"
        :disabled="!deck_create_form.sideDeck.cardCount.enabled"
        :class="{ 'p-invalid': !deck_create_form.sideDeck.cardCount.valid }" />
      <label for="number-input">cartas en el side deck</label>
    </span>
    <span class="p-float-label">
      <InputNumber id="number-input" class="w-full" v-model="deck_create_form.extraDeck.cardCount.value"
        :disabled="!deck_create_form.extraDeck.cardCount.enabled"
        :class="{ 'p-invalid': !deck_create_form.extraDeck.cardCount.valid }" />
      <label for="number-input">cartas en el extra deck</label>
    </span>
    <Button @click="onSubmit" :label="isModeEdit ? 'Editar Deck' : 'Crear Deck'" icon="pi pi-check"
      :disabled="deck_create_form.invalid" />
  </form>
</template>
<script setup>
import AutoComplete from 'primevue/autocomplete';
import InputNumber from 'primevue/inputnumber';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import ProgressSpinner from 'primevue/progressspinner';
import { ref, watch, reactive, toRefs, onMounted } from 'vue';
import { addUserDeck } from '@/utils/deck.service';
import { fetchArchetypes } from '@/utils/archetype.service';

const emit = defineEmits();

const isLoading = ref(false);


const props = defineProps({
  isModeEdit: Boolean,
})

const validatorRequired = (elem) => elem != null;
const validatorMin = (minv) => {
  return (elem) => elem >= minv;
}

const { isModeEdit } = toRefs(props);

const deck_create_form = reactive({
  title: {
    value: null,
    valid: true,
    enabled: true,
    validators: [validatorRequired]
  },
  archetype: {
    value: null,
    valid: true,
    enabled: true,
    validators: [validatorRequired]
  },
  cardCount: {
    value: null,
    valid: true,
    enabled: true,
    validators: [validatorRequired, validatorMin(0)]
  },
  extraDeck: {
    cardCount: {
      value: null,
      valid: true,
      enabled: true,
      validators: [validatorRequired, validatorMin(0)]
    }
  },
  sideDeck: {
    cardCount: {
      value: null,
      valid: true,
      enabled: true,
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
      form[field]['valid'] = validity;
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

const onSubmit = async () => {

  if (isModeEdit.value) {
    emit('deckEdited');
  } else {

    isLoading.value = true;
    disableForm(deck_create_form);

    const deck = {
      title:deck_create_form.title.value,
      arquetype:deck_create_form.archetype.value,
      cardCount:deck_create_form.cardCount.value,
      sideDeck:{
        cardCount:deck_create_form.sideDeck.cardCount.value
      },
      extraDeck:{
        cardCount:deck_create_form.extraDeck.cardCount.value
      }
    }

    await addUserDeck(deck);
    emit('deckCreated');
  }
  emit('close');
}
const items = ref([]);

onMounted(()=>{
fetchArchetypes();
})

const search = async (event) => {
  const {query} = event;
  isLoading.value=true;
  const all = await fetchArchetypes();
  isLoading.value=false;
  items.value = all.filter(elem=> elem.name.toLowerCase().includes(query.toLowerCase())).map(elem=>elem.name);
}
// disableForm(deck_create_form)
checkValidity(deck_create_form);

</script>
