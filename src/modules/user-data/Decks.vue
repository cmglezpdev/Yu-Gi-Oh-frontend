<template>
  <div class="flex flex-row justify-center">
    <TabMenu :model="items">
      <template #item="{ item, props }">
        <router-link v-if="item.route" v-slot="{ href, navigate }" :to="item.route" custom>
          <a v-ripple :href="href" v-bind="props.action" @click="navigate">
            <span :class="item.icon" />
            <span class="ml-2">{{ item.label }}</span>
          </a>
        </router-link>
        <a v-else v-ripple :href="item.url" :target="item.target" v-bind="props.action">
          <span :class="item.icon" />
          <span class="ml-2">{{ item.label }}</span>
        </a>
      </template>
    </TabMenu>
  </div>
  <router-view></router-view>
  <Teleport to="body">
  <div class="fixed bottom-0 right-0">
<SpeedDial :model="items_panel" :radius="120" type="quarter-circle" direction="up-left" :tooltipOptions="{ position: 'left' }"  :style="{ right: 0, bottom: 0 }" />
  <Dialog v-model:visible="active_modal_create" maximizable modal header="" :style="{ width: '50rem' }" :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
        <DeckEdit ref='deckModal' :isModeEdit="false"
          @deckCreated="handleDeckCreation"
          @deckEdited="handleDeckEdition"
          @close="handleModalClose"
        />
        </Dialog>
  </div>
  </Teleport>
  <Toast />
</template>

<script setup >
import TabMenu from 'primevue/tabmenu';
import SpeedDial from 'primevue/speeddial';
import Toast from 'primevue/toast';
import Dialog from 'primevue/dialog';
import DeckEdit from './DeckEdit.vue';


import { useToast } from 'primevue/usetoast';
import { useRoute } from 'vue-router';
import { ref, watch,inject } from 'vue';


const toast = useToast();
const route = useRoute();
const id = ref(null);
const active_modal_create = ref(false);
const deckModal = ref(null);


watch(() => {
  id.value = route.params.id;
})

const handleDeckCreation =(resp)=>{
  toast.add({ severity: 'info', summary: 'Deck creado', detail: 'Data Added' });
}
const handleDeckEdition =(resp)=>{
  toast.add({ severity: 'info', summary: 'Deck editado', detail: 'Data Added' });
}
const handleModalClose =(resp)=>{
  active_modal_create.value=false;
}

const items_panel = ref([
    {
        label: 'crear deck',
        icon: 'pi pi-pencil',
        toast:'crear deck',
        command: () => {
             active_modal_create.value=true;
        }
    },
    {
        label: 'actualizar deck',
        icon: 'pi pi-refresh',
        toast:'actualizar deck',
        command: () => {
            toast.add({ severity: 'success', summary: 'Update', detail: 'Data Updated' });
        }
    },
    {
        label: 'eliminar deck',
        icon: 'pi pi-trash',
        toast:'eliminar deck',
        command: () => {
            toast.add({ severity: 'error', summary: 'Delete', detail: 'Data Deleted' });
        }
    }
])
const items = ref([

  {
    label: 'Vista general',
    icon: 'pi pi-home',
    route: `/my-decks/${id.value}/general`
  },
  {
    label: 'Vista de tabla',
    icon: 'pi pi-table',
    route: `/my-decks/${id.value}/table`
  },
]);
</script>
