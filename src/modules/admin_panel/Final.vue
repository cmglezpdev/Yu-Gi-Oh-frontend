<template>
  <div class="flex flex-row justify-center gap-2 items-center">
    <h1 class="text-lg text-stone-50">Tabla de Posiciones</h1>
    <h3>Ganadores</h3>
  </div>

  <OrganizationChart :value="data" collapsible>
    <template #person="slotProps">
      <div class="flex flex-column">
        <div class="flex flex-column gap-3 align-items-center">
          <span class="font-bold mb-2">{{ slotProps.node.data.name }}</span>
          <span>{{ slotProps.node.data.title }}</span>
        </div>
      </div>
    </template>
    <template #default="slotProps">
      <span>{{ slotProps.node.label }}</span>
    </template>
  </OrganizationChart>
</template>

<script setup lang="ts">
import { reactive, ref, watch } from "vue";
import OrganizationChart from 'primevue/organizationchart';
import { defineProps, toRefs } from 'vue';

const props = defineProps({
  players: Array<any>
});

const { players } = toRefs(props)


const data = ref(
{
    key: '0',
    type: 'person',
    styleClass: 'bg-indigo-500 text-white border-round-xl',
    data: {
      image: 'https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png',
      name: players?.value![0].user1,
      title: players?.value![0].deck1
    },
    children: [
      {
        key: '0_0',
        type: 'person',
        styleClass: 'bg-purple-500 text-white border-round-xl',
        data: {
          image: 'https://primefaces.org/cdn/primevue/images/avatar/annafali.png',
          name: players?.value![1].user1,
          title: players?.value![1].deck1
        },
      },
      {
        key: '0_1',
        type: 'person',
        styleClass: 'bg-teal-500 text-white border-round-xl',
        data: {
          image: 'https://primefaces.org/cdn/primevue/images/avatar/stephenshaw.png',
          name: players?.value![2].user1,
          title: players?.value![2].deck1
        },
      }
    ]
}
);


</script>
