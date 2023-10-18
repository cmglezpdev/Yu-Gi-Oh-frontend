<template>
  <ProfileLayout>
    <section class="m-4">
      <div class="flex justify-start gap-4 mb-4">
        <MultiSelect v-model="selectedUsers" @change="filterTable" :options="users" filter :maxSelectedLabels="3" placeholder="Usuarios" />
        <MultiSelect v-model="selectedTournaments" @change="filterTable" :options="tournaments" filter :maxSelectedLabels="3" placeholder="Torneos" />
        <MultiSelect v-model="selectedPlaces" @change="filterTable" :options="places" filter :maxSelectedLabels="3" placeholder="Lugares" />
      </div>
      <DataTable :value="inscriptionsShown" showGridlines tableStyle="min-width: 50rem">
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
  import { ref } from 'vue';
  import DataTable from 'primevue/datatable';
  import Column from 'primevue/column';
  import MultiSelect from 'primevue/multiselect';

  import ProfileLayout from '@/modules/profile/layouts/ProfileLayout.vue'

  interface IInscriptions {
    user: string;
    tournament: string;
    inscription_date: string;
    place: string;
    actions: string;
  }

  const inscriptions: IInscriptions[] = [
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
  ]

  const inscriptionsShown = ref<IInscriptions[]>(inscriptions)
  const users = ref<string[]>([...new Set(inscriptions.map(i => i.user))])
  const tournaments = ref<string[]>([...new Set(inscriptions.map(i => i.tournament))])
  const places = ref<string[]>([...new Set(inscriptions.map(i => i.place))])

  const selectedUsers = ref<string[]>([])
  const selectedTournaments = ref<string[]>([])
  const selectedPlaces = ref<string[]>([])

  const filterTable = () => {
    inscriptionsShown.value = inscriptions.filter(inscription => {
      return (
        (selectedUsers.value.length === 0 || selectedUsers.value.some(user => user === inscription.user)) &&
        (selectedTournaments.value.length === 0 || selectedTournaments.value.some(tournament => tournament === inscription.tournament)) &&
        (selectedPlaces.value.length === 0 || selectedPlaces.value.some(place => place === inscription.place))
      )
    })
  }

</script>