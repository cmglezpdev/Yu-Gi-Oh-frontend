<template>
  <ProfileLayout>
    <section class="m-4">
      <div class="flex justify-end mb-4">
        <SelectButton v-model="selectedView" @change="updateTorunamentsView" :options="viewOptions" optionLabel="label" dataKey="value" />
      </div>
      <DataTable :value="tournamentsShown" showGridlines tableStyle="min-width: 50rem">
        <Column field="name" header="Nombre" />
        <Column field="date" header="Fecha" />
        <Column field="place" header="Lugar" />
        <Column field="deck" header="Deck" />
      </DataTable>
    </section>
  </ProfileLayout>
</template>

<script lang="ts" setup>
  import DataTable from 'primevue/datatable';
  import Column from 'primevue/column';
  import SelectButton from 'primevue/selectbutton';
  
  import ProfileLayout from '@/modules/profile/layouts/ProfileLayout.vue'
  import { ref } from 'vue';
 
  const tournaments = [
    {
      name: 'Torneo de prueba',
      date: '2021-10-10',
      place: 'Casa de Carlos',
      deck: 'Dragon Link',
      status: 'approved'
    },
    {
      name: 'Torneo para comprobar',
      date: '2021-10-10',
      place: 'Pinar del Rio, Cuba',
      deck: 'Dragon Link',
      status: 'rejected'
    },
  ];

  const selectedView = ref({ label: 'Aprobados', value: 'approved' })
  const viewOptions = ref([
    { label: 'Aprobados', value: 'approved' },
    { label: 'Pendientes', value: 'pending' },
    { label: 'Rechazados', value: 'rejected' },
    { label: 'Pasados', value: 'passed' }
  ])
  const tournamentsShown = ref(tournaments.filter(t => t.status === selectedView.value.value))

  const updateTorunamentsView = () => {
    tournamentsShown.value = tournaments.filter(t => t.status === selectedView.value.value)
  }

</script>