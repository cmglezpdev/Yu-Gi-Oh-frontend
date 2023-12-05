<template>
   <div v-if="loading">
<ProgressSpinner style="width: 50px; height: 50px" strokeWidth="8" fill="var(--surface-ground)"
      animationDuration=".5s" aria-label="Custom ProgressSpinner" />
  </div>
  <Accordion :activeIndex="[]" :multiple="true">
    <AccordionTab v-for="match of matches" :header="match.playerA.name + ' vs ' + match.playerB.name">
      <Card v-if="match.playerWinnerId == null">
        <template #title> Match </template>
        <template #content>
          <div class="flex flex-row justify-center">
            <div class="flex flex-col gap-3">
              <p class="m-0">
                Quien Gana?
              </p>

              <div class="flex flex-row gap-8">

                <div class="flex flex-col gap-1">
                  <label for="chkbox1">{{ match.playerA.name }} - Wins: {{  match.playerAScore }}</label>
                  <Checkbox inputId="chkbox1" @click="decirWinner(match.id, 'A')"/>
                </div>
                <div class="flex flex-col gap-1">
                  <label for="chkbox1">{{ match.playerB.name}} - Wins: {{  match.playerBScore }}</label>
                  <Checkbox inputId="chkbox1" @click="decirWinner(match.id, 'B')"/>
                </div>
              </div>
            </div>
          </div>
        </template>
      </Card>
      <Card v-else>
        <template #content>
        <h1>El ganador es: {{ match.playerWinner.name }}</h1>
      </template>
      </Card>
    </AccordionTab>
  </Accordion>
</template>

<script setup  lang="ts">
import { defineProps, ref, toRefs } from 'vue';
import Checkbox from 'primevue/checkbox';
import Card from 'primevue/card';
import Accordion from 'primevue/accordion';
import ProgressSpinner from 'primevue/progressspinner';
import AccordionTab from 'primevue/accordiontab';
import { TournamentManagement } from '@/utils/tournament.management.service';

const props = defineProps({
  matches: Array<any>,
  tournamentID: String,
})

const emit = defineEmits();

const manager = new TournamentManagement();
const { matches, tournamentID } = toRefs(props);
const loading = ref(false);

console.log(matches!.value)

const decirWinner = async(duelId:string, letra: 'A' | 'B') => {
  loading.value = true;
  await manager.realizaDuel(duelId, letra)
  emit('reload')
  loading.value = false;
}
</script>


