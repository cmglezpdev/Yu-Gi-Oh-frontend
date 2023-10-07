<template>
  <section class='w-[500px] mx-auto mt-20 p-5 border border-violet-500'>
    <header class="w-full text-center text-3xl">
      <h1>Créate una cuenta</h1>
    </header>

    <form class="flex flex-col gap-5 mt-10">
      <fieldset class="flex flex-col">
        <label for="fullname">Nombre y apellidos</label>
        <span class="p-input-icon-left">
          <i class="pi pi-user text-xl" />
          <InputText 
            id="fullname" 
            type="text" 
            placeholder="Jhon Doe" 
            class="w-full"
          />
        </span>
      </fieldset>
      
      <fieldset class="flex flex-col">
        <label for="email">Correo electrónico</label>
        <span class="p-input-icon-left">
          <i class="pi pi-at text-xl" />
          <InputText 
            id="email" 
            type="email" 
            placeholder="ejemplo@correo.com" 
            class="w-full"
          />
        </span>
      </fieldset>
      
      <fieldset class="grid grid-cols-2 gap-3">
        <div class="flex flex-col">
          <label for="password">Contraseña</label>
          <span class="p-input-icon-right">
            <i class="pi pi-eye text-xl" />
            <InputText 
              id="password" 
              type="password" 
              placeholder="********" 
              class="w-full"
            />
          </span>
        </div>
        <div class="flex flex-col">
          <label for="confirm_password">Confirmar contraseña</label>
          <span class="p-input-icon-right">
            <i class="pi pi-eye text-xl" />
            <InputText 
              id="confirm_password" 
              type="password" 
              placeholder="********" 
              class="w-full"
            />
          </span>

        </div>
      </fieldset>

      <fieldset class="grid grid-cols-2 gap-3">
        <div class="flex flex-col">
          <label for="province">Provincia</label>
          <Dropdown
            editable
            id="province" 
            class="w-full"
            placeholder="Selecciona un país"
            optionLabel="name"
            v-model="selectedProvince"
            :options="provinces"
          />
        </div>
        <div class="flex flex-col">
          <label for="minicipality">Municipio</label>
          <Dropdown
            editable
            id="minicipality" 
            class="w-full"
            placeholder="Selecciona un país"
            optionLabel="name"
            v-model="selectedMunicipality"
            :options="minicipalities"
          />
        </div>
      </fieldset>

      <fieldset class="mt-6">
        <Buttonn type="submit" label="Iniciar sesión" class="w-full" />
      </fieldset>
    </form>
    
    <footer>
      <p class="text-center mt-5">
        ¿Ya tienes una cuenta? 
        <router-link to="/auth/signin" class="text-violet-500">
          Inicia sesión
        </router-link>
      </p>
    </footer>
  </section>
</template>

<script lang="ts" setup>
  import { ref } from 'vue'

  import Buttonn from 'primevue/button'
  import InputText from 'primevue/inputtext'
  import Dropdown from 'primevue/dropdown' 

  const selectedProvince = ref(null)
  const selectedMunicipality = ref(null)

  const provinces = ref([
    {id: '1', name: 'Pinar del Rio'},
    {id: '2', name: 'Artemisa'},
    {id: '3', name: 'La Habana'},
    {id: '4', name: 'Matanzas'},
  ])

  const minicipalities = ref([
    {id: '1', name: 'Consolación del Sur'},
    {id: '1', name: 'Santa Clara'},
    {id: '1', name: 'San Cristobal'},
  ])
</script>