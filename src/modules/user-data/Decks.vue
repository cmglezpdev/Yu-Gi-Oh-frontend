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
  <div class="fixed top-3/4 left-full">
  <SpeedDial :model="items_panel" direction="left" :style="{ top: 'calc(50% - 2rem)', right: 0 }"  />
  </div>
  <Toast />
</template>

<script setup >
import { ref, watch } from 'vue';
import TabMenu from 'primevue/tabmenu';
import { useRoute } from 'vue-router';
import SpeedDial from 'primevue/speeddial';
import Toast from 'primevue/toast';
import { useToast } from 'primevue/usetoast';
const toast = useToast();
const route = useRoute();
const id = ref(null);


watch(() => {
  id.value = route.params.id;
})
const items_panel = ref([
    {
        label: 'Add',
        icon: 'pi pi-pencil',
        command: () => {
            toast.add({ severity: 'info', summary: 'Add', detail: 'Data Added' });
        }
    },
    {
        label: 'Update',
        icon: 'pi pi-refresh',
        command: () => {
            toast.add({ severity: 'success', summary: 'Update', detail: 'Data Updated' });
        }
    },
    {
        label: 'Delete',
        icon: 'pi pi-trash',
        command: () => {
            toast.add({ severity: 'error', summary: 'Delete', detail: 'Data Deleted' });
        }
    },
    {
        label: 'Upload',
        icon: 'pi pi-upload',
        command: () => {
            router.push('/fileupload');
        }
    },
    {
        label: 'Vue Website',
        icon: 'pi pi-external-link',
        command: () => {
            window.location.href = 'https://vuejs.org/'
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
