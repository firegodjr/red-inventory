<template>
    <NavFrame />

    <div class="content-frame red">
        <RouterView />
    </div>
    <div class="login-debug yellow" v-if="accountStore.account">
        Logged in as: {{ UserString }}
        <button @click="handleLogoutClick">Logout</button>
    </div>
</template>

<script setup lang="ts">
import { onMounted, type Ref, ref } from 'vue';
import NavFrame from '../components/navFrame.vue';
import { HandleLogout } from '../util/clientLoginUtil';
import '../assets/output.css';
import { useAccountStore } from '@/stores/account';
import { useInventoryStore } from '@/stores/inventory';

let UserString: Ref<string> = ref('');
let accountStore = useAccountStore();
let inventoryStore = useInventoryStore();

onMounted(async () => {
    // todo show a loading icon while fetching stuff, and do it in parallel
    await accountStore.fetchUserData();
    await inventoryStore.fetchInventories();
    let userString = await getUserString();
    if (userString) {
        UserString.value = userString;
    }
});

async function handleLogoutClick() {
    HandleLogout().then(() => {
        window.location.href = window.location.origin;
    });
}

async function getUserString() {
    if (accountStore.account) {
        return accountStore.account.username;
    } else {
        return 'Not Logged In';
    }
}
</script>

<style>
.content-frame {
    padding: 2em;
    max-width: 70rem;
    margin: auto;
}

.login-debug {
    position: fixed;
    bottom: 0;
    padding: 0.5em;
}
</style>
