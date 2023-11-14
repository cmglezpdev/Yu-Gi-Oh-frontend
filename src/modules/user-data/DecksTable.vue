<template>
  <div class="border m-4">
    <DataTable :value="loading?skeletonData:customers" paginator :rows="5" :rowsPerPageOptions="[5, 10, 20, 50]" tableStyle="min-width: 50rem"
      paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
      currentPageReportTemplate="{first} to {last} of {totalRecords}">
      <template #paginatorstart>
        <Button type="button" icon="pi pi-refresh" text />
      </template>
      <template #paginatorend>
        <Button type="button" icon="pi pi-download" text />
      </template>
      <Column field="title" header="Name" style="width: 25%"></Column>
      <Column field="cardCount" header="Cantidad de cartas" style="width: 25%"></Column>
      <Column field="sideDeck.cardCount" header="Cartas en el side deck" style="width: 25%">
      </Column>
      <Column field="extraDeck.cardCount" header="Cartas en el extra deck" style="width: 25%">
      </Column>


<div v-if="loading" v-for="index in skeletonRowCount" :key="index" class="p-skeleton p-component">
<div class="p-skeleton-row p-skeleton-row-indent"></div>
</div>

 <div v-if="loading" v-for="index in 1" :key="index" class="p-skeleton p-component">
    <div class="p-skeleton-row p-skeleton-row-indent"></div>
  </div>
    </DataTable>


  </div>
</template>

<script setup>
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
 import Row from 'primevue/row';  
import Skeleton from 'primevue/skeleton';
import { ref, onMounted } from 'vue';
import { fetchUserDecks } from '@/utils/deck.service.ts'

const customers = ref([]);

const loading = ref(true);

const skeletonRowCount = 5; // Número de filas de esqueleto que deseas mostrar
const skeletonData = ref(initializeSkeletonData(skeletonRowCount));


onMounted(() => {
  fetchUserDecks().then((data) => {
    loading.value=false;
    customers.value = data;
  });
});

function initializeSkeletonData(count) {
  return Array.from({ length: count }, (_, index) => ({
    title: '',
    cardCount: '',
    sideDeck: { cardCount: '' },
    extraDeck: { cardCount: '' },
    id: index,
  }));
}


</script>
