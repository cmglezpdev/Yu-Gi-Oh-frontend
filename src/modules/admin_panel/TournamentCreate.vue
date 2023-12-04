<template>
  <div v-if="loading" class="w-100 h-100  z-50 blurred-background flex flex-col justify-center items-center">
    <ProgressSpinner style="width: 50px; height: 50px" strokeWidth="8" fill="var(--surface-ground)"
      animationDuration=".5s" aria-label="Custom ProgressSpinner" />
  </div>
  <form class="flex flex-col gap-3 justify-center m-3">
     

    <InputGroup class="flex flex-col">
      <span class="p-float-label">
        <InputText id="name" v-model="tournament_create_form.get('name').realValue"
          :class="{'p-invalid':!tournament_create_form.get('name').valid && tournament_create_form.get('name').touched}"
          :disabled="!tournament_create_form.get('name').enabled"
          @click="tournament_create_form.get('name').touch()"
        />
        <label for="name">name</label>
      </span>
      <div v-if="tournament_create_form.get('name').hasError('required') && tournament_create_form.get('name').touched" class="text-red-700">campo requerido</div>
    </InputGroup >

    <InputGroup class="flex flex-col">

      <span class="p-float-label">
      <InputText id="playerCount" :type="isPass1 ? 'password' : 'text'" placeholder="Cantidad de jugadores"  v-model="tournament_create_form.get('playerCount').realValue"
          :class="{'p-invalid':!tournament_create_form.get('playerCount').valid&& tournament_create_form.get('playerCount').touched}"
          :disabled="!tournament_create_form.get('playerCount').enabled"
          @click="tournament_create_form.get('playerCount').touch()"
      />
        <label for="playerCount">Cantidad de jugadores</label>
      <InputGroupAddon @click="isPass1 = !isPass1">
        <i class="pi pi-eye-slash" :class="{ 'pi-eye-slash': isPass1, 'pi-eye': !isPass1 }"></i>
      </InputGroupAddon>

      </span>
      <div v-if="tournament_create_form.get('playerCount').hasError('min') && tournament_create_form.get('playerCount').touched" class="text-red-700">debe haber mas de 2 jugadores</div>
    </InputGroup>
    <div class="flex flex-col justify-start w-full">
    </div>
    <Button class="accept-button" @click="onSubmit" label="Aceptar" :disabled="!valid" />

    
  </form>
  
</template>

<script setup lang="ts">
import { FormBuilder, Validators, FormGroup, AbstractControl } from '@/reactive_form_module/ReactiveFormModule';
import InputText from 'primevue/inputtext';
import InputGroup from 'primevue/inputgroup';
import InputGroupAddon from 'primevue/inputgroupaddon';
import Button from 'primevue/button';
import {ref} from 'vue'
import {createTournament} from '@/utils/tournaments.service.ts'
import ProgressSpinner from 'primevue/progressspinner';


const loading = ref(false);

const emit = defineEmits();

const _formbuilder = new FormBuilder();
const isPass1 = ref(true)

const tournament_create_form = _formbuilder.group({
  name:[null,[Validators.required]],
  playerCount:[null,[Validators.required]]
})

const valid = tournament_create_form.valid;

const onSubmit = async ()=>{
  const {name,playerCount}=tournament_create_form.value;
  loading.value=true;
  valid.value=false;
   await createTournament(name,playerCount)
      emit('tournament_created')
}

</script>
