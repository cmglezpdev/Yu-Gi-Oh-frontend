<template>
  <div v-if="loading" class="w-screen h-screen fixed z-50 blurred-background top-0 flex justify-center items-center">
    <ProgressSpinner style="width: 50px; height: 50px" strokeWidth="8" fill="var(--surface-ground)"
      animationDuration=".5s" aria-label="Custom ProgressSpinner" />
  </div>
  <div class="border m-4">
    <DataTable :value="tournaments" paginator :rows="5" :rowsPerPageOptions="[5, 10, 20, 50]"
      tableStyle="min-width: 50rem"
      paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
      currentPageReportTemplate="{first} to {last} of {totalRecords}">
      <Column header="Acciones" :exportable="false" style="min-width:5rem">
        <template #body="slotProps">
          <div v-if="!loading && checkDateAfterToday(slotProps.data.date)" class="flex flex-row w-full  gap-2">
            <Button v-tooltip.bottom="'manejar torneo'" icon="pi pi-pencil"
              @click="manageTournament(slotProps.data.id)" />
            <Button v-tooltip.bottom="'manejar inscripciones'" icon="pi pi-pencil"
              @click="manageInscriptions(slotProps.data.id)" />
          </div>
        </template>
      </Column>
      <Column field="name" header="Nombre" style="width: 25%"></Column>
      <Column field="date" header="Fecha" style="width: 15%">
        <template #body="slotProps">
          <div class="flex flex-row w-full  gap-2">
            {{ formatDate(new Date(slotProps.data.date), 'dd/mm/yyyy') }}
          </div>
        </template>
      </Column>
      <Column field="place" header="Lugar" style="width: 25%" />
      <Column field="numberOfPlayers" header="Jugadores" style="width: 10%; text-align: center;" />
      <Column field="numberOfInscriptions" header="Inscripciones" style="width: 10%; text-align: center;" />

      <template v-if="loading">
        <div v-for="index in 50" :key="index" class="p-skeleton p-component">
          <div class="p-skeleton-row p-skeleton-row-indent"></div>
        </div>
      </template>

    </DataTable>

    <SpeedDial @click="create_tournament" :radius="120" type="quarter-circle" direction="up-left"
      :tooltipOptions="{ position: 'left' } as any" :style="{ right: 0, bottom: 0 }" />

    <Dialog v-model:visible="active_modal_create" modal header="Crear un Torneo" :style="{ width: '30rem' }"
      :breakpoints="{ '99px': '25vw', '575px': '90vw' }">
      <TournamentCreate @error="handle_error" @tournament_creating="handle_creating"
        @tournament_created="handle_creation" />
    </Dialog>

  </div>
  <Toast />
</template>

<script setup lang="ts">

import ProgressSpinner from 'primevue/progressspinner';
import TournamentCreate from '@/modules/admin_panel/TournamentCreate.vue';
import Toast from 'primevue/toast';
import DataTable from 'primevue/datatable';
import Dialog from 'primevue/dialog';
import SpeedDial from 'primevue/speeddial';
import Column from 'primevue/column';
import { ref, onMounted } from 'vue';
import { fetchAdminCreatedTournaments } from '@/utils/admin.tournaments.service'
import { formatDate } from '@/utils/date.service';
import Button from 'primevue/button';
import { useRouter } from 'vue-router';
import { getUserData } from '@/utils/user.service';
import { useToast } from 'primevue/usetoast';

const toast = useToast();
const tournaments = ref([] as any[]);

const loading = ref(true);

const checkDateAfterToday = (date: Date) => {
  return (new Date()) <= date;
}

const router = useRouter()

const active_modal_create = ref(false);

const loadData = async () => {
  const _tournaments: any[] = await fetchAdminCreatedTournaments(getUserData().id) as Array<any>;
  loading.value = false;
  tournaments.value = _tournaments;
}
const handle_creating = () => {
  loading.value = true;
  active_modal_create.value = false;
}
const handle_creation = () => {
  active_modal_create.value = false;
  toast.add({ severity: 'info', summary: 'Torneo creado', detail: 'Data Added' });
 loading.value = true;
 loadData();
}



onMounted(loadData);



const create_tournament = () => {
  active_modal_create.value = true;
}

const handle_error = () => {
  toast.add({ severity: 'error', summary: 'Ha ocurrido un error', detail: 'Data Added' });
}

const manageTournament = (tournamentId: string) => {
  router.push({ path: `tournaments/${tournamentId}`, replace: true });
}
const manageInscriptions = (tournamentId: string) => {
  router.push({ path: `inscriptions/${tournamentId}`, replace: true });
}

</script>
