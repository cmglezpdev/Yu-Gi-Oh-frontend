<template>
  <div v-if="loading">
<ProgressSpinner style="width: 50px; height: 50px" strokeWidth="8" fill="var(--surface-ground)"
      animationDuration=".5s" aria-label="Custom ProgressSpinner" />
  </div>
  <Round @reload="updateMatches" :matches="matches" />
<div class="flex h-screen flex-col justify-between p-8" v-if="items.length > 0">
    <div class="flex flex-row justify-center gap-2 items-center">
    <h1 class="text-lg text-stone-50">{{tName.toUpperCase()}}</h1>
      <h3>({{tPlayersCount}} jugadores)</h3>
    </div>
    <Steps  :model="items" :readonly="false" v-model:activeStep="currentStep" />


    

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
  <InputGroup v-if="currentStep==0" class="flex flex-col">
      <span class="p-float-label">
        <InputText id="name" v-model="round2"/>
        <label for="name">cantidad para pasar al round 2</label>
      </span>
    </InputGroup >
  <div class="flex flex-row gap-3">
<Button @click="prevStep" :disabled="currentStep === 0" label="Anterior" icon="pi pi-right" />
<Button @click="nextStep" :disabled="round2==0"  label="Siguiente" icon="pi pi-left" iconPos="right" />
  </div>
</template>

<script setup>
import Steps from 'primevue/steps';
import Final from './Final.vue'
import Round from './Round.vue'
import ProgressSpinner from 'primevue/progressspinner';
import Button from 'primevue/button';
import { fetchTournamentMatches, fetchTournamentInfo } from '@/utils/tournaments.service'
import { TournamentManagement } from '@/utils/tournament.management.service';

import { ref, watch, onMounted } from "vue";
import { useRouter, useRoute } from 'vue-router'
import InputText from 'primevue/inputtext';
import InputGroup from 'primevue/inputgroup';

const route = useRoute()

const tournamentId = route.params.id

const tournamentManage = ref(new TournamentManagement());

//reactivity handeling
const items = ref([]);
const tName = ref('');
const tPlayersCount = ref(0);
const currentStep = ref(0);
const competitionStep = ref(1);
const round2 = ref(0)
const loading = ref(true);
const matches = ref([]);
const title = ref("");

onMounted(async () => {
  const resp = await tournamentManage.value.generateMixing(tournamentId)
  const round = await tournamentManage.value.getRoundDuels(tournamentId, 0);
   matches.value=round.data.result;
   loading.value = false;
   console.log(matches.value);
})

const updateMatches = async () => {
  loading.value = true;
  let round;
  if(currentStep.value==1){
       round = await tournamentManage.value.roundAfterMixing(tournamentId,round2.value);
  }else{
      round = await tournamentManage.value.getRoundDuels(tournamentId, currentStep.value);
  }
  matches.value = round.data.result;
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
    currentStep.value++;
    updateMatches();
  
};

const prevStep = () => {
  if (currentStep.value > 1) {
    currentStep.value--;
  }
};

//methods
//main
//updateMatches();
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
}
</style>
