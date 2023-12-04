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
        <InputText id="description" v-model="tournament_create_form.get('description').realValue"
          :class="{'p-invalid':!tournament_create_form.get('description').valid && tournament_create_form.get('description').touched}"
          :disabled="!tournament_create_form.get('description').enabled"
          @click="tournament_create_form.get('description').touch()"
        />
        <label for="description">description</label>
      </span>
      <div v-if="tournament_create_form.get('description').hasError('required') && tournament_create_form.get('description').touched" class="text-red-700">campo requerido</div>
    </InputGroup >




    <InputGroup class="flex flex-col">
      <span class="p-float-label">
        <Calendar id="startDate" v-model="tournament_create_form.get('startDate').realValue"
          :class="{'p-invalid':!tournament_create_form.get('startDate').valid && tournament_create_form.get('startDate').touched}"
          :disabled="!tournament_create_form.get('startDate').enabled"
          @click="tournament_create_form.get('startDate').touch()"
        />
        <label for="startDate">startDate</label>
      </span>
      <div v-if="tournament_create_form.get('startDate').hasError('required') && tournament_create_form.get('startDate').touched" class="text-red-700">campo requerido</div>
    </InputGroup >


    <InputGroup class="flex flex-col">
      <span class="p-float-label">
        <Calendar id="endDate" v-model="tournament_create_form.get('endDate').realValue"
          :class="{'p-invalid':!tournament_create_form.get('endDate').valid && tournament_create_form.get('endDate').touched}"
          :disabled="!tournament_create_form.get('endDate').enabled"
          @click="tournament_create_form.get('endDate').touch()"
        />
        <label for="endDate">endDate</label>
      </span>
      <div v-if="tournament_create_form.get('endDate').hasError('required') && tournament_create_form.get('endDate').touched" class="text-red-700">campo requerido</div>
    </InputGroup >

    <div class="drops card flex  gap-4 justify-content-center">
      <Dropdown v-model="tournament_create_form.get('province').realValue" editable :options="allProvinces" optionLabel="name" placeholder="Provincia"
        class="w-full md:w-14rem"
          :class="{'p-invalid':!tournament_create_form.get('province').valid&& tournament_create_form.get('province').touched}"
          :disabled="!tournament_create_form.get('province').enabled"
          @click="tournament_create_form.get('province').touch()"
      />

      <Dropdown v-model="tournament_create_form.get('municipality').realValue" editable :options="municipalities" optionLabel="name" placeholder="Municipio"
        class="w-full md:w-14rem" 
          :class="{'p-invalid':!tournament_create_form.get('municipality').valid&& tournament_create_form.get('municipality').touched}"
          :disabled="!tournament_create_form.get('municipality').enabled"
          @click="tournament_create_form.get('municipality').touch()"
      />
    </div>

    <Button class="accept-button" @click="onSubmit" label="Aceptar" :disabled="!valid" />

    
  </form>
  
</template>

<script setup lang="ts">
import { FormBuilder, Validators, FormGroup, AbstractControl } from '@/reactive_form_module/ReactiveFormModule';
import Calendar from 'primevue/calendar';
import InputText from 'primevue/inputtext';
import InputGroup from 'primevue/inputgroup';
import Dropdown from 'primevue/dropdown';
import Button from 'primevue/button';
import {ref} from 'vue'
import {createTournament} from '@/utils/tournaments.service.ts'
import ProgressSpinner from 'primevue/progressspinner';
import {getAllProvinces,getMunicipalities} from '@/utils/provinceMunicipality.service'

const loading = ref(false);

const emit = defineEmits();

const municipalities = ref([]);
const allProvinces = ref([]);

const _formbuilder = new FormBuilder();
const isPass1 = ref(true)


getAllProvinces()
  .then((provinceList)=>{
    allProvinces.value = provinceList
  })


const tournament_create_form = _formbuilder.group({
  name:[null,[Validators.required]],
  description:[null,[Validators.required]],
  municipality:[null,[Validators.required]],
  province:[null,[Validators.required]],
  startDate:[null,[Validators.required]],
  endDate:[null,[Validators.required]]
})


tournament_create_form.get('province').valueChange(
  async (value)=>{    
    console.log(tournament_create_form.value)
    municipalities.value=[];
    tournament_create_form.get('municipality').setValue(null)
    tournament_create_form.disable();
   municipalities.value = await getMunicipalities(value.id);
    tournament_create_form.enable();
  }
)


const valid = tournament_create_form.valid;

const onSubmit = async ()=>{
  const {name,description,playerCount,municipality,province,startDate,endDate}=tournament_create_form.value;
  loading.value=true;
  valid.value=false;
   await createTournament(name,description,municipality.id,startDate,endDate)
      emit('tournament_created')
}

</script>
