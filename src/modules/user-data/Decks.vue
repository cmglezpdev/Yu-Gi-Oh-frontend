<template>
  <div class="flex flex-row justify-center">
    <TabMenu :model="items">
      <template #item="{ item, props }">
        <router-link @click="loadData" v-if="item.route" v-slot="{ href, navigate }" :to="item.route" custom>
          <a v-ripple :href="href" v-bind="props.action" @click="navigate">
            <span :class="item.icon" />
            <span class="ml-2">{{ item.label }}</span>
          </a>
        </router-link>
        <a v-else v-ripple @click="loadData" :href="item.url" :target="item.target" v-bind="props.action">
          <span :class="item.icon" />
          <span class="ml-2">{{ item.label }}</span>
        </a>
      </template>
    </TabMenu>
  </div>
  <router-view
    @askReload="loadData"
    :decks="decks" :loading="loading" @editDeck="activeDeckEdit($event)"
    @removeDeck="activeRemoveDeck($event)"></router-view>
  <Teleport to="body">
    <div class="fixed bottom-0 right-0">
      <SpeedDial @click="createDeck" :model="items_panel" :radius="120" type="quarter-circle" direction="up-left"
        :tooltipOptions="{ position: 'left' }" :style="{ right: 0, bottom: 0 }" />
      <Dialog v-model:visible="active_modal_create" maximizable modal header="" :style="{ width: '50rem' }"
        :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
        <DeckEdit ref='deckModal' :isModeEdit="isModeEdit" :deckId="deckId" @deckCreated="handleDeckCreation"
          @deckEdited="handleDeckEdition" @close="handleModalClose" />
      </Dialog>
      <Dialog v-model:visible="active_modal_remove" modal header="" :style="{ width: '30rem' }"
        :breakpoints="{ '99px': '25vw', '575px': '90vw' }">
        <DeckDelete @deckRemoved="handleDeckDeletion" :deckId="deckId" @close="handleModalClose" />
      </Dialog>
    </div>
  </Teleport>
  <Toast />
</template>

<script setup lang="ts">
import TabMenu from 'primevue/tabmenu';
import DeckDelete from './DeckDelete.vue'
import SpeedDial from 'primevue/speeddial';
import Toast from 'primevue/toast';
import Dialog from 'primevue/dialog';
import DeckEdit from './DeckEdit.vue';
import { fetchUserDecks } from '@/utils/deck.service';
import { useToast } from 'primevue/usetoast';
import { useRoute } from 'vue-router';
import { ref, watch, onMounted } from 'vue';
import { getUserData } from '@/utils/user.service';

const userId = getUserData().id;

const toast = useToast();
const route = useRoute();

const id = ref('');

  id.value = route.params.id;

const active_modal_create = ref(false);
const active_modal_remove = ref(false);

const deckModal = ref(null);

const loading = ref(true);
const decks = ref([]);


watch(id,() => {
  id.value = route.params.id;
})

let isModeEdit = true;
let deckId;

const handleDeckCreation = (resp) => {
  toast.add({ severity: 'info', summary: 'Deck creado', detail: 'Data Added' });
  loadData();
}
const handleDeckEdition = (resp) => {
  toast.add({ severity: 'info', summary: 'Deck editado', detail: 'Data Added' });
  loadData();
}
const handleDeckDeletion = (resp) => {
  toast.add({ severity: 'warn', summary: 'Deck eliminado' });
  loadData();
  handleModalClose();
}
const handleModalClose = (resp) => {
  active_modal_create.value = false;
  active_modal_remove.value = false;
}

const items_panel = ref([
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


const createDeck = () => {
  isModeEdit = false;
  active_modal_create.value = true;
}
const activeDeckEdit = (event) => {
  isModeEdit = true;
  deckId = event;
  active_modal_create.value = true;
}

const activeRemoveDeck = (event) => {
  deckId = event;
  active_modal_remove.value = true;
}


const loadData = () => {
  loading.value = true;
  fetchUserDecks(userId).then((data) => {
    loading.value = false;
    decks.value = data;
  });
}

onMounted(() => {
  loadData();
})


</script>
