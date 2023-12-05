<template>

  <div v-if="loading" class="w-screen h-screen fixed z-50 blurred-background top-0 flex justify-center items-center">
    <ProgressSpinner style="width: 50px; height: 50px" strokeWidth="8" fill="var(--surface-ground)"
      animationDuration=".5s" aria-label="Custom ProgressSpinner" />
  </div>

  <div class="border m-4">
    <DataTable :value="users" paginator :rows="5" :rowsPerPageOptions="[5, 10, 20, 50]" tableStyle="min-width: 50rem"
      paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
      currentPageReportTemplate="{first} to {last} of {totalRecords}">

      <Column header="Acciones" :exportable="false" style="min-width:5rem">
        <template #body="slotProps">
          <div  class="flex flex-row w-full  gap-2">
            <Button :disabled="loading" @click="update_user_role(slotProps.data)" v-tooltip.right="'convertir en administrador'" icon="pi pi-pencil" severity="danger" />
          </div>
        </template>
      </Column>
      <Column field="name" header="Nombre" style="width: 25%" />
      <Column field="email" header="Correo" style="width: 25%" />
      <Column field="rolesString" header="Roles" style="width: 25%" />
      <Column field="place" header="Lugar" style="width: 25%" />

      <div v-if="loading" v-for="index in 5" :key="index" class="p-skeleton p-component">
        <div class="p-skeleton-row p-skeleton-row-indent"></div>
      </div>

    </DataTable>

    <Dialog v-model:visible="active_modal_create" modal header="Crear un Usuario" :style="{ width: '30rem' }"
      :breakpoints="{ '99px': '25vw', '575px': '90vw' }">
      <UserEdit />
    </Dialog>

    <Dialog v-model:visible="active_modal_delete" modal header="Crear un Torneo" :style="{ width: '30rem' }"
      :breakpoints="{ '99px': '25vw', '575px': '90vw' }">
      <UserEdit />
    </Dialog>

    <Toast />
  </div>
</template>

<script setup>
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Dialog from 'primevue/dialog';
import SpeedDial from 'primevue/speeddial';
import ProgressSpinner from 'primevue/progressspinner';
import Button from 'primevue/button';
import { ref, onMounted } from 'vue';
import { formatDate } from '@/utils/date.service';
import { useToast } from 'primevue/usetoast';
import {fetchRoles,setUserRole} from '@/utils/roles.services'

const toast = useToast();

import { getUsersFromPanel } from '@/utils/admin.users.service.ts'

const users = ref([]);
const active_modal_create = ref(false);
const active_modal_delete = ref(false);
const roles = ref([]);
const loading = ref(true);

const load = async () => {

  const _users = await getUsersFromPanel();
  const _roles = await fetchRoles();
  loading.value = false;
  roles.value = _roles;
  users.value = _users;
}


const update_user_role = async (user)=>{
  loading.value=true;
  await setUserRole(user.id,roles.value[0].id,!user.roles.some(rol=>rol.name=='Admin'))
  load()
}


onMounted(load);

</script>
