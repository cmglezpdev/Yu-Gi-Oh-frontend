<template>
  <div class="flex justify-center">
    <div class="grid-container">
      <Skeleton size="20rem" v-for="index in 100" v-if="loading"></Skeleton>

      <Card style="width: 20rem" v-for="(deck, index) in  decks"
        v-animateonscroll="{ enterClass: 'fadein', leaveClass: 'fadeout' }">
        <template #content>
          <div class="flex flex-col gap-3 relative">

            <div class="flex flex-row justify-center ">
              <h1 class="font-bold text-2xl">{{ deck.title.toUpperCase() }}</h1>
            </div>

            <img alt="deck-image" class="w-full h-full object-cover" src="@/assets/deck.jpeg" />

            <div class="absolute top-0 w-full h-full" @mouseover="mostrarMenu(index)" @mouseleave="quitarMenu()">
              <transition name="fade" mode="out-in">
                <div v-if="index == activeMenu" class="h-full flex justify-start flex-col">
                  <div class="flex flex-row w-full justify-between">
                     <Button v-tooltip="'eliminar'" icon="pi pi-trash" @click="deleteDeck(deck.id)"  severity="danger"/>
                     <Button v-tooltip="'editar'"   icon="pi pi-pencil" @click="editDeck(deck.id)" />
                  </div>
                  <div class="flex items-end h-full w-full  ">
                    <div class="flex flex-col w-full inset-0 bg-gray-500 bg-opacity-20 backdrop-blur-md">
                      <div class="w-full border">
                        <h3 class="text-cyan-500 text-center text-2xl m-4">Arquetipo: {{ deck.arquetype }} </h3>
                        <h3 class="text-cyan-500 text-center text-2xl m-4">Main Deck: {{ deck.cardCount }} </h3>
                      </div>
                      <div class="w-full border flex flex-row ">
                        <div class="w-full border">
                          <h3 class="text-cyan-300 text-center text-2xl m-4">Side Deck: {{ deck.sideDeck.cardCount }}
                          </h3>
                        </div>
                        <div class="w-full border">
                          <h3 class="text-cyan-300 text-center text-2xl m-4">Extra Deck: {{ deck.extraDeck.cardCount }}
                          </h3>
                        </div>
                      </div>
                      <div class="w-full border">
                        <!-- <router-link to="/"> -->
                        <!--   <h3 class="text-cyan-300 text-center text-2xl m-4">Ver Detalles </h3> -->
                        <!-- </router-link> -->
                      </div>
                    </div>
                  </div>
                </div>
              </transition>
            </div>

          </div>
        </template>
      </Card>
    </div>
  </div>
</template>


<script setup>
import { useRoute } from 'vue-router';
import Skeleton from 'primevue/skeleton';
import { fetchUserDecks } from '@/utils/deck.service'
import Card from 'primevue/card';
import Button from 'primevue/button';
import { toRefs, ref, watch } from 'vue';
import Dialog from 'primevue/dialog';
import DeckEdit from './DeckEdit.vue';
import { useToast } from 'primevue/usetoast';
const route = useRoute();
const id = ref(null);
const activeMenu = ref(-1);

const props = defineProps({
  decks:Array,
  loading:Boolean
});

const {decks,loading} = toRefs(props);

console.log(decks)

const mostrarMenu = (index) => {
  activeMenu.value = index
}


const quitarMenu = () => {
  activeMenu.value = -1;
}

const emit = defineEmits();

emit('askReload')

const editDeck=(deckId)=>{
    emit('editDeck',deckId);
}
const deleteDeck=(deckId)=>{
    emit('removeDeck',deckId);
}


watch(() => {
  id.value = route.value;
})

</script>

<style scoped>
.grid-container {
  padding: 20px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  /* Tres columnas de igual tamaño */
  gap: 16px;
  /* Espacio entre las cajas */
}


/* Dos columnas en pantallas medianas */
@media screen and (max-width: 1000) {
  .grid-container {
    grid-template-columns: repeat(3, 1fr);
  }
}

/* Una columna en pantallas pequeñas */
@media screen and (max-width: 700) {
  .grid-container {
    grid-template-columns: repeat(2, 1fr);
  }
}

.item {
  padding: 16px;
  border: 1px solid #ddd;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

@keyframes slidedown-icon {
  0% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(10px);
  }

  100% {
    transform: translateY(0);
  }
}

.slidedown-icon {
  animation: slidedown-icon;
  animation-duration: 5s;
  animation-iteration-count: infinite;
}


.box {
  background-image: radial-gradient(var(--primary-300), var(--primary-600));
  border-radius: 50% !important;
  color: var(--primary-color-text);
}</style>
