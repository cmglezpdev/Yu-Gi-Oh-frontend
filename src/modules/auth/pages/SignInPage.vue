<template>
  <section class='w-[500px] mx-auto mt-20 p-5 border border-violet-500'>
    <header class="w-full text-center text-4xl">
      <h1>Inicia Sesión</h1>
    </header>

    <form class="flex flex-col gap-5 mt-10">
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
      
      <fieldset class="flex flex-col">
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
      </fieldset>

      <fieldset class="mt-6">
        <Buttonn type="submit" label="Iniciar sesión" class="w-full" />
      </fieldset>
    </form>

    <footer>
      <p class="text-center mt-5">
        ¿No tienes cuenta? 
        <router-link to="/auth/signup" class="text-violet-500">
          Créate una
        </router-link>
      </p>
    </footer>
  </section>
</template>

<script lang='ts'>
  import InputText from 'primevue/inputtext'
  import Buttonn from 'primevue/button'
  export default {
    name: 'SignInPage',
    components: {
      InputText,
      Buttonn,
    },
  }
</script>