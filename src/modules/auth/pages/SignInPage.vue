<template>
  <div class="card flex flex-col gap-3">

    <h1>Inicia Sesion</h1>
    <InputGroup>
      <span class="p-float-label">
        <InputText id="email" v-model="loginForm.email" />
        <label for="email">Email</label>
      </span>
    </InputGroup>

    <InputGroup>
      <InputText :type="isPass1 ? 'password' : 'text'" placeholder="Password" v-model="loginForm.password" />
      <InputGroupAddon @click="isPass1 = !isPass1">
        <i class="pi pi-eye-slash" :class="{ 'pi-eye-slash': isPass1, 'pi-eye': !isPass1 }"></i>
      </InputGroupAddon>
    </InputGroup>

    <Button class="accept-button" label="Aceptar" />

    <div class="flex flex-row justify-start">
      Aun no tienes cuenta?
      <router-link to="signup"> crea una cuenta </router-link>
    </div>
  </div>
</template>

<script setup>

import InputText from 'primevue/inputtext';
import InputGroup from 'primevue/inputgroup';
import InputGroupAddon from 'primevue/inputgroupaddon';
import Button from 'primevue/button';

import { ref, reactive } from 'vue';

const loginForm = reactive({
  email: null,
  password: null
})

const isPass1 = ref(true);

</script>

<style scoped>
.card {
  display: flex;
  flex-direction: column;
  /* row-gap: 4; */
  width: 50%;
  height: 59%;
  padding: 20px;
  gap: 3%;
  border: 1px lightgray solid;
  border-radius: 10px;
  box-shadow: 1px 1px 10px gray;
}

.accept-button {
  width: 100%;
}
</style>
