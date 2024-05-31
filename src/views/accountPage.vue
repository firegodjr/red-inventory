<template>
    <div id="trs">
        <h1>ACCOUNT</h1>
        <p>Your detes.</p>
        <br />
        <div class="white" v-if="accountStore.account">
            <h2>
                <span class="red">User <i class="fa-solid fa-caret-right"></i></span>
                {{ accountStore.account?.username }}
            </h2>
            <h2>
                <span class="red">Email <i class="fa-solid fa-caret-right"></i></span>
                {{ accountStore.account?.email }}
            </h2>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { Crew } from '@prisma/client';
import { onMounted, ref, type Ref } from 'vue';
import { useAccountStore } from '@/stores/account';

let CrewsForUser: Ref<Crew[]> = ref([]);
const accountStore = useAccountStore();

onMounted(async () => {
    // TODO select currently selected crew here
});

function handleCrewSelected(e: any) {}
</script>
