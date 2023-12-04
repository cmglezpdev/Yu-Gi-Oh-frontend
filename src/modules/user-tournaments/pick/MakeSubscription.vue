<template>
  <div class="flex flex-col gap-4 m-4 relative">
    <div class="flex w-full flex-row justify-center z-50" v-if="loading">
      <ProgressSpinner style="width: 38px; height: 38px;" class="absolute" strokeWidth="8" fill="var(--surface-ground)"
        animationDuration=".5s" aria-label="Custom ProgressSpinner" />
    </div>
    <InputGroup class="flex flex-col">
      <span class="p-float-label ">
        <AutoComplete forceSelection field="title" v-model="subscriptionForm.get('deck').realValue"
          :disabled="!subscriptionForm.get('deck').enabled" class="w-full"
          :class="{ 'p-invalid': !subscriptionForm.get('deck').valid }" :suggestions="filteredItems" @complete="search"
          inputStyle="width: 100%;" @click="subscriptionForm.get('deck').touch()" @onSelect="selectItem" />
        <label for="number-input">Deck</label>
      </span>
      <div v-if="subscriptionForm.get('deck').hasError('required') && subscriptionForm.get('deck').touched"
        class="text-red-700">campo requerido</div>
    </InputGroup>
    <Button class="accept-button w-full" @click="onSubmit" label="Hacer Inscripcion"
      :disabled="!valid || !subscriptionForm.get('deck').enabled" />
  </div>
</template>

<script setup>
import { toRefs, ref } from 'vue';
import { FormBuilder, Validators, FormGroup, AbstractControl } from '@/reactive_form_module/ReactiveFormModule';
import ProgressSpinner from 'primevue/progressspinner';
import AutoComplete from 'primevue/autocomplete';
import InputGroup from 'primevue/inputgroup';
import Button from 'primevue/button';
import { getUserData } from '@/utils/user.service';
import { fetchUserDecks } from '@/utils/deck.service'
import { makeTournamentSubscription } from '@/utils/tournaments.service'


const _formBuilder = new FormBuilder();
const items = ref([]);
const filteredItems = ref([]);
const userId = getUserData().id;
const loading = ref(true);

const subscriptionForm = _formBuilder.group({
  deck: [null, [Validators.required]]
})

subscriptionForm.disable();


fetchUserDecks(userId)
  .then(
    (decks) => {
      loading.value = false;
      subscriptionForm.enable();
      items.value = decks;
      filteredItems.value = decks;
    }
  )

const valid = subscriptionForm.valid;

const props = defineProps({
  tournamentId: String
})

const emit = defineEmits();

const { tournamentId } = toRefs(props);

const search = (event) => {
  filteredItems.value = items.value.filter(
    item => {
      return item.title.toLowerCase().includes(event.query.toLowerCase())
    }
  )
}
const selectItem = (param) => {
  // subscriptionForm.get('deck').setValue(param.id)
}

const onSubmit = async () => {
  subscriptionForm.disable();
  loading.value = true;
  makeTournamentSubscription(userId, tournamentId.value, subscriptionForm.value.deck.id)
    .then(
      (resp => {
        subscriptionForm.enable();
        loading.value = false;
        emit('close',resp);
      })
    )
}

</script>
