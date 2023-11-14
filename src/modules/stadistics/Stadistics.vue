<template>
  <div class="">
 <Knob v-model="winned_matches" readonly valueColor="SlateGray" rangeColor="MediumTurquoise" />     
<Badge value="ganadas"  severity="success"></Badge>
<Badge value="perdidas"></Badge>
<Badge value="totales"></Badge>
  </div>
</template>

<script setup>
import Knob from 'primevue/knob';
import Badge from 'primevue/badge';
import { ref } from 'vue';

const winned_matches = ref(10)

</script>
