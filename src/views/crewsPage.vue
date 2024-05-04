<template>
    <div>
        <HoloPanes :show-header="false" :pane-names="['crews', 'crewinfo']" :curr-pane="CurrPane">
            <template v-slot:crews>
                <div class="relative">
                    <h1 class="red">CREWS</h1>
                    <p>Keep track of your choombas in crime.</p>
                </div>
                <br />
                <GenericList
                    :selected-entry="
                        Crews.filter((crew) => crew.id == accountStore.account?.selectedCrewId)[0]
                    "
                    :add-button-string="'Add a Crew'"
                    :entries="Crews"
                    :entry-name-key="'name'"
                    :entry-desc-keys="['itemCount']"
                    :entry-desc-format="'Users: {0}'"
                    @addbtn-click="handleAddCrew"
                    @entry-click="handleCrewSelected"
                >
                    <i class="fa-solid fa-handshake fa-sm"></i>
                </GenericList>
            </template>
            <template v-slot:crewinfo>
                <button class="back-btn" @click="() => (CurrPane = 'crews')">Back to Crews</button
                ><br />
                <h1 class="white"><span class="red">></span> {{ SelectedCrew?.name }}</h1>
                <button
                    v-if="accountStore.account?.selectedCrewId !== SelectedCrew?.id"
                    @click="handleSetActiveCrew"
                >
                    Set as Active
                </button>
                <h3 v-else class="yellow">Active Crew</h3>

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
    </div>
</template>

<script lang="ts" setup>
import type { Crew } from '@prisma/client';
import GenericList from '../components/generic/genericList.vue';
import HoloPanes from '../components/generic/holoPanes.vue';
import { onMounted, ref, type Ref } from 'vue';
import { useAccountStore } from '@/stores/account';

let CurrPane: Ref<string> = ref('crews');
let Crews: Ref<Crew[]> = ref([]);
let SelectedCrew: Ref<Crew | undefined> = ref(undefined);
let accountStore = useAccountStore();

onMounted(async () => {
    await fetch('/api/user/getCrews', {
        credentials: 'include'
    })
        .then((response) => response.json())
        .then((json) => {
            console.log(json);
            Crews.value = json;
        });
});

async function handleSetActiveCrew() {
    if (SelectedCrew.value) await accountStore.updateActiveCrew(SelectedCrew.value?.id);
}

function handleAddCrew(e: any) {}

function handleCrewSelected(e: any) {
    SelectedCrew.value = e;
    CurrPane.value = 'crewinfo';
}
</script>
