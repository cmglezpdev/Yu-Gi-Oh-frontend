<template>
  <div v-if="loading" class="w-screen h-screen fixed z-50 blurred-background top-0 flex justify-center items-center">
    <ProgressSpinner style="width: 50px; height: 50px" strokeWidth="8" fill="var(--surface-ground)"
      animationDuration=".5s" aria-label="Custom ProgressSpinner" />
  </div>
  <TabView>
    <TabPanel header="Pendientes">
      <DataTable :value="pending" paginator :rows="5" :rowsPerPageOptions="[5, 10, 20, 50]" tableStyle="min-width: 50rem"
        paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
        currentPageReportTemplate="{first} to {last} of {totalRecords}">
        <Column header="Acciones">
          <template #body="slotProps">
            <div class="flex flex-row gap-2">
              <Button v-tooltip.bottom="'aceptar subscripcion'" icon="pi pi-check"
                @click="accept(slotProps.data.id)" />
              <Button v-tooltip.bottom="'rechazar subscripcion'" icon="pi pi-trash" @click="decline(slotProps.data.id)"
                severity="danger" />
            </div>
          </template>
        </Column>
        <Column field="username" header="Nombre" style="width: 25%"></Column>
        <Column field="deckname" header="Nombre del deck"></Column>
      </DataTable>
    </TabPanel>
    <TabPanel header="Aceptados">
      <DataTable :value="accepted" paginator :rows="5" :rowsPerPageOptions="[5, 10, 20, 50]" tableStyle="min-width: 50rem"
        paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
        currentPageReportTemplate="{first} to {last} of {totalRecords}">
        <Column field="username" header="Nombre" style="width: 25%"></Column>
        <Column field="useremail" header="Correo" style="width: 25%"></Column>
        <Column field="deckname" header="Nombre del deck" style="width: 25%"></Column>
      </DataTable>
    </TabPanel>
    <TabPanel header="Rechazados">
      <DataTable :value="rejected" paginator :rows="5" :rowsPerPageOptions="[5, 10, 20, 50]" tableStyle="min-width: 50rem"
        paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
        currentPageReportTemplate="{first} to {last} of {totalRecords}">
        <Column field="username" header="Nombre" style="width: 25%"></Column>
        <Column field="useremail" header="Correo" style="width: 25%"></Column>
        <Column field="deckname" header="Nombre del deck" style="width: 25%"></Column>
      </DataTable>
    </TabPanel>
  </TabView>
</template>

<script setup>

import { useRoute } from 'vue-router'
import ProgressSpinner from 'primevue/progressspinner';
import { Status, fetchTournamentInscriptions } from '@/utils/admin.tournaments.service'
import Column from 'primevue/column';
import TabView from 'primevue/tabview';
import TabPanel from 'primevue/tabpanel';
import { watch, ref, onMounted } from 'vue'
import DataTable from 'primevue/datatable';
import Button from 'primevue/button';
import { acceptInscription,rejectInscription } from '@/utils/inscriptions.service'

const route = useRoute()

const tournamentId = route.params.id
const pending = ref([])
const accepted = ref([])
const rejected = ref([])
const loading = ref(false);


const load = () => {
  fetchTournamentInscriptions(tournamentId, Status.Pending)
    .then(
      response => {
        pending.value = response.map(el => { return { id:el.id, username: el.user.name, deckname: el.deck.name } })
      }
    )

  fetchTournamentInscriptions(tournamentId, Status.Rejected)
    .then(
      response => {
        rejected.value = response.map(el => { return { username: el.user.name, deckname: el.deck.name } })

      }
    )
  fetchTournamentInscriptions(tournamentId, Status.Aprobbed)
    .then(
      response => {
        accepted.value = response.map(el => { return { username: el.user.name, deckname: el.deck.name } })
      }
    )
}

onMounted(load)

const accept = async (subId) => {
  loading.value=true;
  await acceptInscription(subId);
  load()
  loading.value=false;
}
const decline = async (subId) => {
  loading.value=true;
  await rejectInscription(subId);
  load()
  loading.value=false;
}

</script>
