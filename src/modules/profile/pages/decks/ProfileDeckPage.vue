<template>
    <ProfileLayout>
        <section class="m-4">
      <DataTable :value="decksShown" showGridlines tableStyle="min-width: 50rem">
        <Column field="name" header="Nombre" />
        <Column field="archetype" header="Arquetipo" />
        <Column field="main" header="Main Deck" />
        <Column field="extra" header="Extra Deck" />
        <Column field="side" header="Side Deck" />
      </DataTable>
    </section>
    </ProfileLayout>
</template>

<script lang="ts" setup>
  import DataTable from 'primevue/datatable';
  import Column from 'primevue/column';
  import SelectButton from 'primevue/selectbutton';

  import ProfileLayout from '@/modules/profile/layouts/ProfileLayout.vue';
  import { ref } from 'vue';

  const decks = [
  {
    name: 'deck de prueba',
    archetype: 'Hero',
    main: 40,
    extra: 8,
    side: 10
  },
  {
    name: 'deck de prueba2',
    archetype: 'Kashtira',
    main: 43,
    extra: 14,
    side: 4
  }
];
  const selectedView = ref({ label: 'Main Deck', value: 'main'})

  const viewOptions = ref([
    { label: 'Main Deck', value: 'main' },
    { label: 'Extra Deck', value: 'extra' },
    { label: 'Side Deck', value: 'side' }
  ])

  const decksShown = ref(decks)
</script>