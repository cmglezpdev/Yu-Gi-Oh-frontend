<template>

  <form class="w-full flex flex-col gap-4 p-6">
<span class="p-float-label ">
<InputText v-model="deck_create_form.title" class="w-full" type="text" placeholder="Normal" />
    <label for="number-input">Nombre del deck</label>
</span>
<span class="p-float-label">
    <InputNumber id="number-input" class="w-full" v-model="deck_create_form.cardCount" />
    <label for="number-input">cartas en el deck</label>
</span>
<span class="p-float-label">
    <InputNumber id="number-input" class="w-full" v-model="deck_create_form.sideDeck.cardCount" />
    <label for="number-input">cartas en el side deck</label>
</span>
<span class="p-float-label">
    <InputNumber id="number-input" class="w-full" v-model="deck_create_form.extraDeck.cardCount" />
    <label for="number-input">cartas en el extra deck</label>
</span>
<Button @click="enviarEvento" :label="isModeEdit?'Editar Deck':'Crear Deck'" icon="pi pi-check" />
  </form>

</template>
<script setup>
import InputNumber from 'primevue/inputnumber';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import { reactive ,toRefs } from 'vue';

const emit = defineEmits();

const enviarEvento = () => {
  // Enviar un evento al componente padre con el mensaje actual
  emit('evento-hijo-padre', props.mensaje);
};

const props = defineProps({
   isModeEdit:Boolean,
})

const {isModeEdit} = toRefs(props);

const deck_create_form=reactive({
  title:null,
  cardCount:null, 
  extraDeck:{
    cardCount:null
  },
  sideDeck:{
    cardCount:null
  }
})


const onSubmit=()=>{
 console.log('creado deck : ',deck_create_form);
}

</script>
