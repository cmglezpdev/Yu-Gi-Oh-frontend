<template>
  <div class="border m-4">
    <div class="flex flex-row justify-between m-2">
  <InputText v-model="filter.nameFilter" placeholder="filtrar por nombre"></InputText>
  <InputText v-model="filter.placeFilter" placeholder="filtrar por lugar"></InputText>
  <InputText v-model="filter.dateFilter" type="date" placeholder="filtrar por fecha"></InputText>
    </div>
    <DataTable :value="tournaments" paginator :rows="5" :rowsPerPageOptions="[5, 10, 20, 50]"
      tableStyle="min-width: 50rem"
      paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
      currentPageReportTemplate="{first} to {last} of {totalRecords}">
      <template #paginatorstart>
        <Button type="button" icon="pi pi-refresh" text />
      </template>
      <template #paginatorend>
        <Button type="button" icon="pi pi-download" text />
      </template>
      <Column header="acciones" :exportable="false" style="min-width:8rem">
        <template #body="slotProps">
                  <div v-if="!loading" class="flex flex-row w-full  gap-2">
                     <Button v-tooltip.right="'inscribirse'" icon="pi pi-users" @click="select_tournament(slotProps.data.id)"  severity="warning"/>
                  </div>
        </template>
      </Column>
      <Column field="name" header="Nombre" style="width: 25%"></Column>
      <Column field="date" header="fecha" style="width: 25%"></Column>
      <Column field="admin" header="nombre del organizador" style="width: 25%" />
      <Column field="place" header="lugar" style="width: 25%">
      </Column>

      <div v-if="loading" v-for="index in 5" :key="index" class="p-skeleton p-component">
        <div class="p-skeleton-row p-skeleton-row-indent"></div>
      </div>

    </DataTable>
  </div>
  <Teleport to="body">
      <Dialog v-model:visible="subscriptionModal" modal header="" :style="{ width: '30rem' }"
        :breakpoints="{ '99px': '25vw', '575px': '90vw' }">
      <MakeSubscription @close="onCloseDialog($event)" :tournamentId="selectedTournament" />
      </Dialog>
  </Teleport>
  <Toast />
</template>

<script setup>
import DataTable from 'primevue/datatable';
import Dialog from 'primevue/dialog';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import Column from 'primevue/column';
import MakeSubscription from './MakeSubscription.vue'
import { ref,watch, onMounted,reactive } from 'vue';
import { formatDate } from '@/utils/date.service';
import {filterTournaments,Filter} from '@/utils/tournaments.service'
import Toast from 'primevue/toast';
import { useToast } from 'primevue/usetoast';
const toast = useToast();

const tournaments = ref([]);
const subscriptionModal=ref(false)
const loading = ref(true);
const selectedTournament = ref(null);


const filter= reactive({
  nameFilter:null,
  placeFilter:null,
  dateFilter:new Date()
})

onMounted(async () => {
  const _tournaments = await filterTournaments(filter);
  loading.value = false;
  tournaments.value = _tournaments.map(elem=>{
    elem.date = formatDate(elem.date,'dd/mm/yyyy');
    return elem
  });
});

watch(filter,async ()=>{
  loading.value=true;
  const _tournaments = await filterTournaments(filter);
  loading.value = false;
  tournaments.value = _tournaments.map(elem=>{
    elem.date = formatDate(elem.date,'dd/mm/yyyy');
    return elem
  });
})
const select_tournament= (tournamentId)=>{
  selectedTournament.value=tournamentId;
  subscriptionModal.value=true;
}

const onCloseDialog=(resp)=>{
  subscriptionModal.value=false;
        if (resp.status) {
          toast.add({ severity: 'info', summary: 'subscripcion exitosa' });
        }else{
          toast.add({ severity: 'danger', summary: resp.message });
        }
}

</script>
