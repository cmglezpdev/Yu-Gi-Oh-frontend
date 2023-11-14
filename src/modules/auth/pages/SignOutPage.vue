<template>
  <div class="form ">


    <h1>Registro</h1>

    <InputGroup>
      <span class="p-float-label">
        <InputText id="name" v-model="formRegister.name" />
        <label for="name">Name</label>
      </span>
    </InputGroup>


    <InputGroup>
      <span class="p-float-label">
        <InputText id="email" v-model="formRegister.email" />
        <label for="email">Email</label>
      </span>
    </InputGroup>

    <InputGroup>
      <InputText :type="isPass1? 'password':'text'" placeholder="Contrasena" v-model="formRegister.password" />
      <InputGroupAddon @click="isPass1=!isPass1">
        <i class="pi pi-eye-slash" :class="{'pi-eye-slash': isPass1,'pi-eye':!isPass1}" ></i>
      </InputGroupAddon>
    </InputGroup>

    <InputGroup>
      <InputText :type="isPass2? 'password':'text'" placeholder="Confirmar contrasena" v-model="formRegister.password_confirm" />
      <InputGroupAddon @click="isPass2=!isPass2">
        <i class="pi pi-eye-slash" :class="{'pi-eye-slash': isPass2,'pi-eye':!isPass2}" ></i>
      </InputGroupAddon>
    </InputGroup>

    <div class="drops card flex justify-content-center">
      <Dropdown v-model="selectedCity" editable :options="cities" optionLabel="name" placeholder="Select a City"
        class="w-full md:w-14rem" />

      <Dropdown v-model="selectedCity" :options="groupedCities" optionLabel="label" optionGroupLabel="label"
        optionGroupChildren="items" placeholder="Select a City" class="w-full md:w-14rem">
        <template #optiongroup="slotProps">
          <div class="flex align-items-center">
            <img :alt="slotProps.option.label" src="https://primefaces.org/cdn/primevue/images/flag/flag_placeholder.png"
              :class="`mr-2 flag flag-${slotProps.option.code.toLowerCase()}`" style="width: 18px" />
            <div>{{ slotProps.option.label }}</div>
          </div>
        </template>
      </Dropdown>
    </div>

    <Button class="accept-button" label="Aceptar" />

    <div class="flex flex-row justify-start">
      ya tienes cuenta?
      <router-link to="signin"> inicia sesion </router-link>
    </div>
  </div>
</template>

<script setup>

import InputText from 'primevue/inputtext';
import InputGroup from 'primevue/inputgroup';
import InputGroupAddon from 'primevue/inputgroupaddon';
import Button from 'primevue/button';
import Dropdown from 'primevue/dropdown';

import { reactive, ref } from "vue";

const selectedCity = ref();
const cities = ref([
  { name: 'Sancti Spiritu', code: 'NY' },
  { name: 'Rome', code: 'RM' },
  { name: 'London', code: 'LDN' },
  { name: 'Istanbul', code: 'IST' },
  { name: 'Paris', code: 'PRS' }
]);


const isPass1=ref(true);
const isPass2=ref(true);

const formRegister=reactive({
  name:null,
  email:null,
  password:null,
  password_confirm:null,
  municipio:null,
  provincia:null
})


</script>

<style scoped>
  .form{
    display:flex;
    flex-direction:column;
    gap:3%;
    max-width:50%;
    max-height:90%;
    padding:20px;
    border: 1px lightgray solid;
    border-radius: 10px;
    box-shadow: 1px 1px 10px gray;
  }

    .drops{
      display:flex;
      flex-direction:row;
      gap: 2%;
    }

    .accept-button{
        width:100%;
    }
</style>
