<template>
  <div class="border m-4">
    <DataTable strippedRows :value="loading?skeletonData:decks" paginator :rows="5" :rowsPerPageOptions="[5, 10, 20, 50]" tableStyle="min-width: 50rem"
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
                     <Button v-tooltip.bottom="'eliminar'" icon="pi pi-trash" @click="deleteDeck(slotProps.data.id)"  severity="danger"/>
                     <Button v-tooltip.bottom="'editar'"    icon="pi pi-pencil" @click="editDeck(slotProps.data.id)" />
                  </div>
        </template>
      </Column>
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
import Button from 'primevue/button';
import Column from 'primevue/column';
 import Row from 'primevue/row';  
import Skeleton from 'primevue/skeleton';
import {toRefs, ref, onMounted } from 'vue';
import { fetchUserDecks } from '@/utils/deck.service.ts'


const props = defineProps({
   decks:Array,
  loading:Boolean
});

const {decks,loading} = toRefs(props);

const skeletonRowCount = 5; // Número de filas de esqueleto que deseas mostrar
const skeletonData = ref(initializeSkeletonData(skeletonRowCount));

const emit = defineEmits();

emit('askReload')
const editDeck=(deckId)=>{
    emit('editDeck',deckId);
}
const deleteDeck=(deckId)=>{
    emit('removeDeck',deckId);
}

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
