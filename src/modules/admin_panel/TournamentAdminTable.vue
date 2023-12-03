<template>
  <div class="border m-4">
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
      <Column header="Acciones" :exportable="false" style="min-width:5rem">
        <template #body="slotProps">
          <div v-if="!loading && checkDateAfterToday(slotProps.data.date)" class="flex flex-row w-full  gap-2">
            <Button v-tooltip.bottom="'manejar torneo'" icon="pi pi-pencil" @click="manageTournament(slotProps.data.id)" />
          </div>
        </template>
      </Column>
      <Column field="name" header="Nombre" style="width: 25%"></Column>
      <Column field="date" header="Fecha" style="width: 15%">
        <template #body="slotProps">
          <div class="flex flex-row w-full  gap-2">
            {{formatDate(new Date(slotProps.data.date), 'dd/mm/yyyy')}}
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

  </div>
</template>

<script setup lang="ts">
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import { ref, onMounted } from 'vue';
import { fetchAdminCreatedTournaments } from '@/utils/admin.tournaments.service'
import { formatDate } from '@/utils/date.service';
import Button from 'primevue/button';
import {useRouter} from 'vue-router';

const tournaments = ref([]);

const loading = ref(true);

const checkDateAfterToday=(date:Date)=>
{
  return (new Date()) >= date;
}

const router = useRouter()
  

onMounted(async () => {
  const _tournaments = await fetchAdminCreatedTournaments();
  loading.value = false;
  tournaments.value = _tournaments  
});

const manageTournament =(tournamentId:string)=>{
  router.push({path:`tournaments/${tournamentId}`,replace:true});
}

</script>
