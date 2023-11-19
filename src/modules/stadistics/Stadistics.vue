<template>
  <div class="flex flex-row justify-between">

    <div class=" flex flex-col w-full p-6 items-center justify-center h-screen">
      <div>
        <div class="flex flex-row w-full justify-center">
          <Knob v-model="winned_matches" :size="200" readonly valueColor="blue" class="mr-0" rangeColor="red" min="0"
            :max="total" />
        </div>
        <div class="flex flex-row gap-4">
          <Badge :value="ganadas" class="bg-blue-600"></Badge>
          <Badge :value="perdidas" class="bg-red-600"></Badge>
          <Badge :value="totales" class="bg-gray-500"></Badge>
        </div>
      </div>
    </div>
    <div class="flex flex-col w-full p-4 items-center justify-center h-screen">
      <div class="flex justify-end  m-3 w-full">
        <Button @click="setEditable" v-tooltip.bottom="'Editar Informacion'"><i class="pi pi-pencil"></i></Button>
      </div>
      <div class="flex flex-col p-3 gap-3">

        <InputGroup class="flex flex-col">
          <span class="p-float-label">
            <InputText id="name" v-model="signUpForm.get('name').realValue"
              :class="{ 'p-invalid': !signUpForm.get('name').valid && signUpForm.get('name').touched }"
              :disabled="!signUpForm.get('name').enabled" @click="signUpForm.get('name').touch()" />
            <label for="name">Nombre</label>
          </span>
          <div v-if="signUpForm.get('name').hasError('required') && signUpForm.get('name').touched" class="text-red-700">
            campo requerido</div>
          <div
            v-if="!signUpForm.get('name').hasError('required') && signUpForm.get('name').hasError('minlength') && signUpForm.get('name').touched"
            class="text-red-700">debe tener mas de 4 caracteres</div>
        </InputGroup>
        <InputGroup class="flex flex-col">
          <span class="p-float-label">
            <InputText id="email" v-model="signUpForm.get('email').realValue"
              :class="{ 'p-invalid': !signUpForm.get('email').valid && signUpForm.get('email').touched }" :disabled="true"
              @click="signUpForm.get('email').touch()" />
            <label for="email">Email</label>
          </span>
          <div v-if="signUpForm.get('email').hasError('required') && signUpForm.get('email').touched"
            class="text-red-700">campo requerido</div>
          <div
            v-if="!signUpForm.get('email').hasError('required') && signUpForm.get('email').hasError('email') && signUpForm.get('email').touched"
            class="text-red-700">Email Invalido</div>
        </InputGroup>

        <div class="flex flex-row justify-between">

          <div class="drops card flex justify-content-center">
            <Dropdown v-model="signUpForm.get('province').realValue" editable :options="allProvinces" optionLabel="name"
              placeholder="Provincia" class="w-full md:w-14rem"
              :class="{ 'p-invalid': !signUpForm.get('province').valid && signUpForm.get('province').touched }"
              :disabled="!signUpForm.get('province').enabled" @click="signUpForm.get('province').touch()" />

          </div>
          <div class="drops card flex justify-content-center">
            <Dropdown v-model="signUpForm.get('municipality').realValue" editable :options="municipalities"
              optionLabel="name" placeholder="Municipio" class="w-full md:w-14rem"
              :class="{ 'p-invalid': !signUpForm.get('municipality').valid && signUpForm.get('municipality').touched }"
              :disabled="!signUpForm.get('municipality').enabled" @click="signUpForm.get('municipality').touch()" />
          </div>
        </div>

      </div>

      <Button class="accept-button w-full" v-if="edit" @click="onSubmit" :disabled="!valid"  label="Aceptar" />
    </div>

  </div>
</template>

<script setup>
import Knob from 'primevue/knob';
import Badge from 'primevue/badge';
import InputText from 'primevue/inputtext';
import InputGroup from 'primevue/inputgroup';
import InputGroupAddon from 'primevue/inputgroupaddon';
import Button from 'primevue/button';
import Dropdown from 'primevue/dropdown';
import { getUserData, getUserFullInfo,editUserInfo } from '@/utils/user.service';
import { getAllProvinces, getMunicipalities } from '@/utils/provinceMunicipality.service'
import { reactive, ref, computed } from "vue";
import { FormBuilder, Validators, FormGroup, AbstractControl } from '@/reactive_form_module/ReactiveFormModule';

const userId = getUserData().id;


const winned_matches = ref(0)
const total = ref(0)
const edit = ref(false)
const ganadas = computed(() => {
  return `ganadas: ${winned_matches.value}`
});

const perdidas = computed(() => {
  return `perdidas: ${total.value - winned_matches.value}`
})
const totales = computed(() => {
  return `totales: ${total.value}`
})

let allProvinces = reactive([]);
let municipalities = reactive([]);

getAllProvinces()
  .then((provinceList) => {
    allProvinces = provinceList;
  })

const _formBuilder = new FormBuilder();

const signUpForm = _formBuilder.group({
  name: [null, [Validators.required, Validators.minLength(4)]],
  email: [null, [Validators.required, Validators.email]],
  province: [null, [Validators.required]],
  municipality: [null, [Validators.required]],
});


signUpForm.get('province').valueChange(
  async (value) => {
    municipalities = [];
    signUpForm.get('municipality').setValue(null)
    signUpForm.disable();
    municipalities = await getMunicipalities(value.id);
    if(edit.value)
  {
    signUpForm.enable();
    }
  }
)

const valid = signUpForm.valid;

signUpForm.disable();

getUserFullInfo(userId)
  .then(
    (resp) => {
      signUpForm.patchValue(resp);
      signUpForm.get('province').setValue(allProvinces.find((item) => {
        return item.id == resp.province.id
      }))
        getMunicipalities(resp.province.id).then(_municipalities => {
          municipalities = _municipalities;
          signUpForm.get('municipality').setValue(municipalities.find((item) => {
            return item.id == resp.municipality.id
          }))
        })
      winned_matches.value = resp.winned_matches;
      total.value = resp.winned_matches + resp.losed_matches;
    }
  )

const setEditable = () => {
  edit.value = true;
  signUpForm.enable();
}

const onSubmit = async ()=>{
  signUpForm.disable();
  const {name,email,province,municipality} = signUpForm.value;
  await editUserInfo(userId,name,email,province,municipality);
  edit.value=false;
}

</script>

