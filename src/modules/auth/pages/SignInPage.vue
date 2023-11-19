<template>
  <div class="card flex flex-col gap-3">

    <h1>Inicia Sesion</h1>
    <InputGroup class="flex flex-col">
      <span class="p-float-label">
        <InputText id="email" v-model="loginForm.get('email').realValue"
          :class="{'p-invalid':!loginForm.get('email').valid && loginForm.get('email').touched}"
          :disabled="!loginForm.get('email').enabled"
          @click="loginForm.get('email').touch()"
        />
        <label for="email">Email</label>
      </span>
      <div v-if="loginForm.get('email').hasError('required') && loginForm.get('email').touched" class="text-red-700">campo requerido</div>
      <div v-if="!loginForm.get('email').hasError('required') && loginForm.get('email').hasError('email') && loginForm.get('email').touched" class="text-red-700">Email Invalido</div>
    </InputGroup >

    <InputGroup class="flex flex-col">

      <span class="p-float-label">
      <InputText id="password" :type="isPass1 ? 'password' : 'text'" placeholder="Password"  v-model="loginForm.get('password').realValue"
          :class="{'p-invalid':!loginForm.get('password').valid&& loginForm.get('password').touched}"
          :disabled="!loginForm.get('password').enabled"
          @click="loginForm.get('password').touch()"
      />
        <label for="password">Contrasena</label>
      <InputGroupAddon @click="isPass1 = !isPass1">
        <i class="pi pi-eye-slash" :class="{ 'pi-eye-slash': isPass1, 'pi-eye': !isPass1 }"></i>
      </InputGroupAddon>

      </span>
      <div v-if="loginForm.get('password').hasError('minlength') && loginForm.get('password').touched" class="text-red-700">la contrasena debe tener mas de 6 caracteres</div>
    </InputGroup>
    <div class="flex flex-col justify-start w-full">
    </div>
    <Button class="accept-button" @click="onSubmit" label="Aceptar" :disabled="!valid" />

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
import {FormBuilder,Validators,FormGroup} from '@/reactive_form_module/ReactiveFormModule';
import {login} from '@/utils/auth.service'
import { useRouter } from 'vue-router';
import { ref, reactive,toRefs } from 'vue';

const _formBuilder = new FormBuilder();

const router = useRouter()
  

const loginForm =  _formBuilder.group(
  {
    email:[null,[Validators.email,Validators.required]],
    password:[null,[Validators.minLength(6)]]
  }
);

const valid = loginForm.valid;


const onSubmit=async ()=>{
  const {email,password} = loginForm.value;
    await login(email,password) ;
  router.push({
    path:'/',
    replace:true
  })
}


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
