<template>
  <div class="w-full vh-full ">

    <div class="card">
      <Toolbar>
        <template #start>
          <Button icon="pi pi-align-justify" @click="visible = true" />
        </template>

        <template #center>
        </template>

        <template #end>
          <SplitButton label="Save" icon="pi pi-check" :model="items"></SplitButton>
        </template>
      </Toolbar>
    </div>

    <Sidebar v-model:visible="visible">
      <div class="flex overflow-x-hidden flex-col justify-center m-3 gap-4">

        <div class="flex justify-center">
          <Avatar image="https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png" icon="pi pi-user"
            class=" mr-2 usericon" size="xlarge" shape="circle" />
        </div>
        <h2 class="flex justify-center">{{ userdata.name }}</h2>
        <h3 class="flex justify-center">{{ userdata.email }}</h3>

        <div class="flex justify-center">

          <Menu :model="items" class="border-0 w-full">
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
          </Menu>
        </div>
      </div>
    </Sidebar>

    <router-view></router-view>

  </div>
</template>

<script setup>

import Sidebar from 'primevue/sidebar';
import Button from 'primevue/button'
import Menu from 'primevue/menu';
import Avatar from 'primevue/avatar';
import Toolbar from 'primevue/toolbar';
import { ref,onUpdated } from 'vue';
import { reload,items, userdata, setRedirection } from './layout_syntax';
import { useRouter } from 'vue-router';
const router = useRouter()

setRedirection(
  () => {
    router.push(
      {
        path: '/auth/signin',
        replace: true
      }
    );

  }
)

onUpdated(() => {
  reload()
})

const visible = ref(true);



</script>


<style >
.w-full {
  width: 100%;
}

.h-full {
  height: 100%;
}

.vh-full {
  height: 100vh;
}

.flex {
  display: fex;
}

.flex-row {
  flex-direction: row;
}

.flex-col {
  flex-direction: column;
}

.justify-center {
  justify-content: center;
}

.usericon {
  width: 150px;
  height: 150px;
  background-color: lightgray;
}

.m-3 {
  margin: 0.3rem;
}

.card {
  border: 1px solid lightgray;
  border-radius: 5px;
  margin: 10px;
  box-shadow: 1px 1px 3px lightgray
}
</style>
