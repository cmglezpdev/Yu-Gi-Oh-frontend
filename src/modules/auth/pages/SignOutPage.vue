<template>
  <div class="form ">


    <h1>Registro</h1>

    <InputGroup class="flex flex-col">
      <span class="p-float-label">
        <InputText id="name" v-model="signUpForm.get('name').realValue"
          :class="{'p-invalid':!signUpForm.get('name').valid && signUpForm.get('name').touched}"
          :disabled="!signUpForm.get('name').enabled"
          @click="signUpForm.get('name').touch()"
        />
        <label for="name">Nombre</label>
      </span>
      <div v-if="signUpForm.get('name').hasError('required') && signUpForm.get('name').touched" class="text-red-700">campo requerido</div>
      <div v-if="!signUpForm.get('name').hasError('required') && signUpForm.get('name').hasError('minlength') && signUpForm.get('name').touched" class="text-red-700">debe tener mas de 4 caracteres</div>
    </InputGroup >
    <InputGroup class="flex flex-col">
      <span class="p-float-label">
        <InputText id="email" v-model="signUpForm.get('email').realValue"
          :class="{'p-invalid':!signUpForm.get('email').valid && signUpForm.get('email').touched}"
          :disabled="!signUpForm.get('email').enabled"
          @click="signUpForm.get('email').touch()"
        />
        <label for="email">Email</label>
      </span>
      <div v-if="signUpForm.get('email').hasError('required') && signUpForm.get('email').touched" class="text-red-700">campo requerido</div>
      <div v-if="!signUpForm.get('email').hasError('required') && signUpForm.get('email').hasError('email') && signUpForm.get('email').touched" class="text-red-700">Email Invalido</div>
    </InputGroup >

    <InputGroup class="flex flex-col">

      <span class="p-float-label">
      <InputText id="password" :type="isPass1 ? 'password' : 'text'" placeholder="Password"  v-model="signUpForm.get('password').realValue"
          :class="{'p-invalid':!signUpForm.get('password').valid&& signUpForm.get('password').touched}"
          :disabled="!signUpForm.get('password').enabled"
          @click="signUpForm.get('password').touch()"
      />
        <label for="password">Contrasenna</label>
      <InputGroupAddon @click="isPass1 = !isPass1">
        <i class="pi pi-eye-slash" :class="{ 'pi-eye-slash': isPass1, 'pi-eye': !isPass1 }"></i>
      </InputGroupAddon>

      </span>
      <div v-if="signUpForm.get('password').hasError('minlength') && signUpForm.get('password').touched" class="text-red-700">la contrasena debe tener mas de 6 caracteres</div>
    </InputGroup>

    <InputGroup class="flex flex-col">
      <span class="p-float-label">
      <InputText id="passwordConfirm" :type="isPass2 ? 'password' : 'text'" placeholder="passwordConfirm"  v-model="signUpForm.get('passwordConfirm').realValue"
          :class="{'p-invalid':!signUpForm.get('passwordConfirm').valid&& signUpForm.get('passwordConfirm').touched}"
          :disabled="!signUpForm.get('passwordConfirm').enabled"
          @click="signUpForm.get('passwordConfirm').touch()"
      />
        <label for="passwordConf">Confirmar Contrasenna</label>
      <InputGroupAddon @click="isPass2 = !isPass2">
        <i class="pi pi-eye-slash" :class="{ 'pi-eye-slash': isPass2, 'pi-eye': !isPass2 }"></i>
      </InputGroupAddon>

      </span>
      <div v-if="signUpForm.get('passwordConfirm').hasError('samePassword') && signUpForm.get('passwordConfirm').touched" class="text-red-700">Las contrasenas no coinciden</div>
    </InputGroup>


    <div class="drops card flex justify-content-center">
      <Dropdown v-model="signUpForm.get('province').realValue" editable :options="allProvinces" optionLabel="name" placeholder="Provincia"
        class="w-full md:w-14rem"
          :class="{'p-invalid':!signUpForm.get('province').valid&& signUpForm.get('province').touched}"
          :disabled="!signUpForm.get('province').enabled"
          @click="signUpForm.get('province').touch()"
      />

      <Dropdown v-model="signUpForm.get('municipality').realValue" editable :options="municipalities" optionLabel="name" placeholder="Municipio"
        class="w-full md:w-14rem" 
          :class="{'p-invalid':!signUpForm.get('municipality').valid&& signUpForm.get('municipality').touched}"
          :disabled="!signUpForm.get('municipality').enabled"
          @click="signUpForm.get('municipality').touch()"
      />
    </div>

    <Button class="accept-button" @click="onSubmit" :disabled="!valid" label="Aceptar" />

    <div class="flex flex-row justify-start h-72 ">
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
import {register} from '@/utils/auth.service';
import { useRouter} from 'vue-router';
import {getAllProvinces,getMunicipalities} from '@/utils/provinceMunicipality.service'
import { reactive, ref } from "vue";
import { FormBuilder, Validators, FormGroup, AbstractControl } from '@/reactive_form_module/ReactiveFormModule';


let allProvinces=reactive([]);
let municipalities = reactive([]);

getAllProvinces()
  .then((provinceList)=>{
   allProvinces=provinceList;
  })

const router = useRouter()
 
const isPass1 = ref(true);
const isPass2 = ref(true);


const _formBuilder = new FormBuilder();

const signUpForm = _formBuilder.group({
  name: [null, [Validators.required, Validators.minLength(4)]],
  email: [null, [Validators.required, Validators.email]],
  province: [null, [Validators.required]],
  municipality: [null, [Validators.required]],
  password: [null, [Validators.required, Validators.minLength(6)]],
  passwordConfirm: [null, [Validators.required]]
});

const samePasswordValidator=
  (_param)=>{
  if (signUpForm.get('password')?.value === _param.value) {
    return null;
  }
  return { 'samePassword': true }
  };

signUpForm.get('passwordConfirm').addValidator(samePasswordValidator);

const valid = signUpForm.valid;

signUpForm.get('province').valueChange(
  async (value)=>{    
    municipalities=[];
    signUpForm.get('municipality').setValue(null)
    signUpForm.disable();
   municipalities = await getMunicipalities(value.id);
    signUpForm.enable();
  }
)

const onSubmit =async ()=>{
    const {name,email,password,passwordConfirm,province,municipality} = signUpForm.value;
    await register(name,email,password,passwordConfirm,province.id,municipality.id) ;
  router.push({
    path:'/',
    replace:true
  })
}

</script>

<style scoped>
.form {
  display: flex;
  flex-direction: column;
  gap: 3%;
  max-width: 50%;
  max-height: 90%;
  padding: 20px;
  border: 1px lightgray solid;
  border-radius: 10px;
  box-shadow: 1px 1px 10px gray;
}

.drops {
  display: flex;
  flex-direction: row;
  gap: 2%;
}

.accept-button {
  width: 100%;
}
</style>
