<template>
    <HoloPanes 
    :show-header="false"
    :pane-names="['crews', 'crewinfo']"
    :curr-pane="CurrPane">
        <template v-slot:crews>
            <div class="relative">
                <h1 class="red">CREWS</h1>
                <p>Keep track of your choombas in crime.</p>
            </div>
            <br />
            <GenericList 
            :add-button-string="'Add a Crew'"
            :entries="Crews" 
            :entry-name-key="'name'" 
            :entry-desc-keys="['itemCount']"
            :entry-desc-format="'Users: {0}'" 
            @addbtn-click="handleAddCrew"
            @entry-click="handleCrewSelected">
                <i class="fa-solid fa-handshake fa-sm"></i>
            </GenericList>
        </template>
        <template v-slot:crewinfo>
            <button class="back-btn" @click="() => CurrPane = 'crews'">Back to Crews</button><br />
            <h1 class="white"><span class="red">></span> {{ SelectedCrew?.name }}</h1>
            
            <br />
            <!-- <GenericList 
            :add-button-string="'Add Edgerunners'"
            :entries="SelectedCrew?.users" 
            :entry-name-key="'name'" 
            :entry-desc-keys="[]"
            :entry-desc-format="''" 
            :get-item-type="(e) => e.type"
            @addbtn-click=""
            @entry-click="">
                <i class="fa-solid fa-boxes-stacked"></i>
            </GenericList> -->
        </template>
    </HoloPanes>
</template>

<script lang="ts" setup>
import { Crew } from '@prisma/client';
import GenericList from '../generic/genericList.vue';
import HoloPanes from '../generic/holoPanes.vue';

let CurrPane: Ref<string> = ref('crews');
let Crews: Ref<Crew[]> = ref([]);
let SelectedCrew: Ref<Crew | undefined> = ref(undefined);

onMounted(async () => {
    let crews = await useFetch('/api/user/getCrews', {
        credentials: 'include'
    });

    Crews.value = crews.data.value as any;
});

function handleAddCrew(e: any) {

}

function handleCrewSelected(e: any) {
    SelectedCrew.value = e;
    CurrPane.value = 'crewinfo';
}

</script>