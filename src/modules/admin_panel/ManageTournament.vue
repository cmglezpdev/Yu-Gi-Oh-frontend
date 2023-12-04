<template>
  <div v-if="loading" class="w-screen h-screen fixed z-50 blurred-background top-0 flex justify-center items-center">
    <ProgressSpinner style="width: 50px; height: 50px" strokeWidth="8" fill="var(--surface-ground)"
      animationDuration=".5s" aria-label="Custom ProgressSpinner" />
  </div>

  <div class="flex h-screen flex-col justify-between p-8" v-if="items.length > 0">
    <div class="flex flex-row justify-center gap-2 items-center">
    <h1 class="text-lg text-stone-50">{{tName.toUpperCase()}}</h1>
      <h3>({{tPlayersCount}} jugadores)</h3>
    </div>
    <Steps  :model="items" :readonly="false" v-model:activeStep="currentStep" />

  <div v-if="currentStep != items.length - 1">
    <Round :matches="matches" />
  </div>
  <div v-if="currentStep == items.length - 1">
    <Final :players="matches" />
  </div>

  <div class="flex flex-row justify-center">
  <div class="flex flex-row gap-3">
<Button @click="prevStep" :disabled="currentStep === 1" label="Anterior" icon="pi pi-right" />
<Button @click="nextStep" :disabled="currentStep === items.length" label="Siguiente" icon="pi pi-left" iconPos="right" />
  </div>
  </div>
  </div>

</template>

<script setup>
import Steps from 'primevue/steps';
import Final from './Final.vue'
import Round from './Round.vue'
import ProgressSpinner from 'primevue/progressspinner';
import Button from 'primevue/button';
import { fetchTournamentMatches,fetchTournamentInfo } from '@/utils/tournaments.service'

import { ref, watch } from "vue";
import  {useRouter,useRoute} from 'vue-router'


const route = useRoute()
  
const tournamentId=route.params.id

//reactivity handeling
const items = ref([]);
const tName = ref('');
const tPlayersCount = ref(0);
const currentStep = ref(0);
const competitionStep = ref(1);
const loading = ref(true);
const matches = ref([]);
const title= ref("");

fetchTournamentInfo(tournamentId)
  .then(tinfo=>{
    tName.value= tinfo.name;
    tPlayersCount.value = tinfo.players;
     for (let i=0;i<tinfo.stages ; i++) {
       items.value.push({label:''})
     }
  })

const updateMatches = async () => {
  loading.value = true;
  matches.value = await fetchTournamentMatches(tournamentId, competitionStep.value)
  loading.value = false;
  console.log(matches.value)
}

watch(currentStep, async (oldval, newval) => {
  competitionStep.value = currentStep.value + 1;
  updateMatches();

})
//reactivity handeling
//constants
//constants
//methods


const nextStep = () => {
  if (currentStep.value < items.value.length) {
    currentStep.value++;
  }
};

const prevStep = () => {
  if (currentStep.value > 1) {
    currentStep.value--;
  }
};

//methods
//main
updateMatches();
//main
</script>
<style scoped>
.blurred-background {
  background-color: rgba(255, 255, 255, 0.1);
  /* Color azul semitransparente */
  border-radius: 10px;
  /* Bordes redondeados */
}

.blurred-background::before {
  content: "";
  position: absolute;
  inset: 0;
  background: inherit;
  filter: blur(10px);
  /* Ajusta el valor para controlar la cantidad de desenfoque */
}</style>
