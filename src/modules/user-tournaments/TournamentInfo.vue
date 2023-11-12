<template>
    <div class="flex justify-center border-0">
        <SelectButton v-model="value" :options="options" optionLabel="value" dataKey="value" aria-labelledby="custom">
            <template #option="slotProps">
                {{slotProps.option.value}}
            </template>
        </SelectButton>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { userdata} from '@/utils/user.service';
import SelectButton from 'primevue/selectbutton';
const value = ref(
    { route: `my-tournaments/${userdata.id}/aprobed`, value: 'aprobados' },
);
const options = ref([
    { route: `my-tournaments/${userdata.id}/aprobed`, value: 'aprobados' },
    { route: `my-tournaments/${userdata.id}/pending`, value: 'pendientes' },
    { route: `my-tournaments/${userdata.id}/rejected`, value: 'rechazados' },
    { route: `my-tournaments/${userdata.id}/past`, value: 'pasados' }
]);




</script>
