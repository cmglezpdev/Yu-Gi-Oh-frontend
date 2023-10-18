<template>
  <ProfileLayout>
    <section class="m-4">
      <div class="flex justify-start gap-4 mb-4">
        <MultiSelect v-model="selectedUsers" @change="filterTable" :options="inscriptions" optionLabel="user" dataKey="user" filter :maxSelectedLabels="3" placeholder="Usuarios" />
        <MultiSelect v-model="selectedTournaments" @change="filterTable" :options="inscriptions" optionLabel="tournament" dataKey="tournament" filter :maxSelectedLabels="3" placeholder="Torneos" />
        <MultiSelect v-model="selectedPlaces" @change="filterTable" :options="inscriptions" optionLabel="place" dataKey="place" filter :maxSelectedLabels="3" placeholder="Lugares" />
      </div>
      <DataTable :value="inscriptions" showGridlines tableStyle="min-width: 50rem">
        <Column field="user" header="Usuario" />
        <Column field="tournament" header="Torneo" />
        <Column field="inscription_date" header="Fecha de inscripción" />
        <Column field="place" header="Lugar" />
        <Column field="actions" header="Acciones" />
      </DataTable>
    </section>
  </ProfileLayout>
</template>

<script lang="ts" setup>
  import DataTable from 'primevue/datatable';
  import Column from 'primevue/column';
  import MultiSelect from 'primevue/multiselect';

  import ProfileLayout from '@/modules/profile/layouts/ProfileLayout.vue'
  import { ref } from 'vue';

  interface ITournament {
    user: string;
    tournament: string;
    inscription_date: string;
    place: string;
    actions: string;
  }

  const inscriptions = ref<ITournament[]>([
    {
      user: '@cmglezpdev',
      tournament: 'Enanitos verdes',
      inscription_date: '2021-10-10',
      place: 'C. Sur, P. Río',
      actions: 'delete'
    },
    {
      user: '@alexsanchez',
      tournament: 'Enanitos verdes',
      inscription_date: '2021-10-10',
      place: 'C. Sur, P. Río',
      actions: 'delete'
    },
    {
      user: '@damian',
      tournament: 'Valeria',
      inscription_date: '2021-10-10',
      place: 'C. Sur, P. Río',
      actions: 'delete'
    } 
  ])

  const inscripcionesShown = ref<ITournament[]>(inscriptions.value)
  const selectedUsers = ref<ITournament[]>([])
  const selectedTournaments = ref<ITournament[]>([])
  const selectedPlaces = ref<ITournament[]>([])

  const filterTable = () => {
    console.log("filtrando...");
    inscripcionesShown.value = inscriptions.value.filter(inscription => {
      return (
        selectedUsers.value.some(su => su.user === inscription.user) &&
        selectedTournaments.value.some(su => su.tournament === inscription.tournament) &&
        selectedPlaces.value.some(su => su.place === inscription.place)
      )
    })
  }

</script>