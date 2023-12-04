<template>
  <Accordion :activeIndex="[]" :multiple="true">
    <AccordionTab v-for="match of matches" :header="match.user1 + ' vz ' + match.user2">
      <Card>
        <template #title> Match 1 </template>
        <template #content>
          <div class="flex flex-row justify-center">
            <div class="flex flex-col gap-3">
              <p class="m-0">
                Quien Gana?
              </p>

              <div class="flex flex-row gap-8">

                <div class="flex flex-col gap-1">
                  <label for="chkbox1">{{ match.user1 }}</label>
                  <Checkbox inputId="chkbox1" />
                </div>
                <div class="flex flex-col gap-1">
                  <label for="chkbox1">{{ match.user2 }}</label>
                  <Checkbox inputId="chkbox1" />
                </div>
              </div>
            </div>
          </div>
        </template>
      </Card>
      <Card>
        <template #title> Match 2 </template>
        <template #content>
          <div class="flex flex-row justify-center">
            <div class="flex flex-col gap-3">
              <p class="m-0">
                Winner
              </p>

              <div class="flex flex-row gap-8">

                <div class="flex flex-col gap-1">
                  <label for="chkbox1">{{ match.user1 }}</label>
                  <Checkbox inputId="chkbox1" />
                </div>
                <div class="flex flex-col gap-1">
                  <label for="chkbox1">{{ match.user2 }}</label>
                  <Checkbox inputId="chkbox1" />
                </div>

              </div>

            </div>
          </div>
        </template>
      </Card>
      <Card>
        <template #title> Match 3 </template>
        <template #content>
          <div class="flex flex-row justify-center">
            <div class="flex flex-col gap-3">
              <p class="m-0">
                Quien gano?
              </p>

              <div class="flex flex-row gap-8">

                <div class="flex flex-col gap-1">
                  <label for="chkbox1">{{ match.user1 }}</label>
                  <Checkbox inputId="chkbox1" />
                </div>
                <div class="flex flex-col gap-1">
                  <label for="chkbox1">{{ match.user2 }}</label>
                  <Checkbox inputId="chkbox1" />
                </div>

              </div>

            </div>
          </div>
        </template>
      </Card>
    </AccordionTab>
  </Accordion>
</template>

<script setup  lang="ts">
import { defineProps, watch, toRefs } from 'vue';
import Checkbox from 'primevue/checkbox';
import Card from 'primevue/card';
import Accordion from 'primevue/accordion';
import AccordionTab from 'primevue/accordiontab';
const props = defineProps({
  matches: Array<any>
})

const { matches } = toRefs(props);

console.log(matches!.value)


</script>


