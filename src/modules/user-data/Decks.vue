<template>
  <div class="flex flex-row justify-center" >
 <TabMenu :model="items" >
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
</template>

<script setup >
import { ref,watch } from 'vue';
import TabMenu from 'primevue/tabmenu';
import { useRoute } from 'vue-router';

const route= useRoute();
const id = ref(null);

console.log(route);

watch(()=>{
id.value=route.params.id;
})

const items = ref([

  { label: 'Vista general', 
    icon: 'pi pi-home' ,
    route:`/my-decks/${id.value}/general`
  },
    {
    label: 'Vista de tabla',
    icon: 'pi pi-table' ,
    route:`/my-decks/${id.value}/table`
  },
]);
</script>
