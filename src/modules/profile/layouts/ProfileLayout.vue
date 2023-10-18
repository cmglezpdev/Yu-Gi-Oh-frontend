<template>
  <RootLayout>
    <main class="w-full grid grid-cols-[1fr_3fr]">
      <aside class="w-full border border-violet-200 p-3">
        <section>
          <picture>
            <img class="rounded-full" src="/images/user-placeholder.png" alt="{{ username }}">
          </picture>
          <div class="mt-2 flex flex-col">
            <span class="font-black text-xl">Carlos Manuel González</span>
            <span class="font-extralight">{{ username }}</span>
            <Button class="mt-3 py-2 text-center" label="Editar Perfil" />
          </div>
        </section>
        
        <Divider />

        <section class="flex flex-col gap-2 mt-6">
          <Button label="Decks" />
          <Button label="Torneos" />
          <Tree :value="adminOptionsNodes" />
        </section>
      </aside>

      <section class="w-full">
        <slot />
      </section>
    </main>
  </RootLayout>
</template>

<script setup lang="ts">
  import { useRoute } from 'vue-router'
  import Button from 'primevue/button'
  import Divider from 'primevue/divider'
  import Tree from 'primevue/tree'
  import RootLayout from '@/modules/shared/layouts/RootLayout.vue'

  const route = useRoute()
  const { username } = route.params
  console.log({ username })

  const adminOptionsNodes = [
    {
      key: "1", 
      label: 'Administración', 
      children: [
        {key: "1", label: "Torneos"},
        {key: "1", label: "Inscripciones"},
      ]
    }
  ]
</script>
