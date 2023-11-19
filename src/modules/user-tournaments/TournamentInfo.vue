<template>
    <div class="flex justify-center border-0">
        <SelectButton v-model="value" :options="options" optionLabel="value" dataKey="value" aria-labelledby="custom">
            <template #option="slotProps">
                <routerLink :to="slotProps.option.route" class="w-full">
                {{slotProps.option.value}}
        </routerLink>
            </template>
        </SelectButton>
    </div>

    <routerView></routerView>
</template>

<script setup>
import { ref } from 'vue';
import { getUserData} from '@/utils/user.service';
import SelectButton from 'primevue/selectbutton';
const userdata = getUserData();
const value = ref(
    { route: `my-tournaments/${userdata.id}/aprobed`, value: 'aprobados' },
);
const options = ref([
    { route: `/my-tournaments/${userdata.id}/aprobed`, value: 'aprobados' },
    { route: `/my-tournaments/${userdata.id}/pending`, value: 'pendientes' },
    { route: `/my-tournaments/${userdata.id}/rejected`, value: 'rechazados' },
    { route: `/my-tournaments/${userdata.id}/past`, value: 'pasados' },
    { route: `/my-tournaments/${userdata.id}/pick`, value: 'buscar nuevos' }
]);




</script>
