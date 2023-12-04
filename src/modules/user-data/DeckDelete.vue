<template>  
<div class="flex flex-col justify-center m-0 relative ">
    <div class="absolute top-50 left-50 flex justify-center w-full z-50" v-if="loading">
        <ProgressSpinner  style="width: 80px; height: 80px" strokeWidth="8" fill="var(--surface-ground)"
          animationDuration=".5s" aria-label="Custom ProgressSpinner" />
    </div>
    <h1 class="text-center m-4">
      Seguro quiere eliminar el deck?
    </h1>
    <div class="flex flex-row gap-3 justify-center">
    <Button @click="deleteDeck">Si</Button>
    <Button @click="close" class="bg-red-400">No</Button>
    </div>

  </div>
</template>

<script setup lang="ts">
import Button from 'primevue/button';
import ProgressSpinner from 'primevue/progressspinner';
import {ref, toRefs} from 'vue';
const emit = defineEmits();
import {removeUserDeck} from '@/utils/deck.service'

const props = defineProps({
  deckId: String
})

const {deckId} = toRefs(props);

const close=()=>{
  emit('close');
}

const loading = ref(false);

const deleteDeck=async () => {
  loading.value=true;
  console.log({ props })
  await removeUserDeck(deckId!.value!)
  loading.value=false;
  emit('deckRemoved');
}
</script>
