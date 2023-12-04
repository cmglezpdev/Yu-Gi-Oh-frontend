<template>
  <div class="border m-4">
    <DataTable :value="users" paginator :rows="5" :rowsPerPageOptions="[5, 10, 20, 50]"
      tableStyle="min-width: 50rem"
      paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
      currentPageReportTemplate="{first} to {last} of {totalRecords}">
      <template #paginatorstart>
        <Button type="button" icon="pi pi-refresh" text />
      </template>
      <template #paginatorend>
        <Button type="button" icon="pi pi-download" text />
      </template>
      <Column field="name" header="Nombre" style="width: 25%"></Column>
      <Column field="role" header="rol" style="width: 25%"></Column>
      <Column field="email" header="email" style="width: 25%" />
      <!-- <Column field="place" header="lugar" style="width: 25%"> -->
      <!-- </Column> -->

      <div v-if="loading" v-for="index in 5" :key="index" class="p-skeleton p-component">
        <div class="p-skeleton-row p-skeleton-row-indent"></div>
      </div>

    </DataTable>

  </div>
</template>

<script setup>
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import { ref, onMounted } from 'vue';
import { fetchUserAprovedTournaments } from '@/utils/userTournaments.service'
import { formatDate } from '@/utils/date.service';

import {getusersFromPanel} from '@/utils/admin.users.service.ts'

const users = ref([]);

const loading = ref(true);

const load=async () => {
  const _users = await getusersFromPanel();
  loading.value = false;
  users.value = _users
}


onMounted(load);


</script>
