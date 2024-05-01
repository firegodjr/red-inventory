<template>
    <NavFrame v-if="UserString" />

    <div class="login-debug yellow">
        Logged in as: {{ UserString }}
        <button @click="handleLogoutClick">Logout</button>
    </div>
</template>

<script setup lang="ts">
import { onMounted, type Ref, ref } from 'vue';
import NavFrame from '../components/navFrame.vue';
import { HandleLogout } from '../util/clientLoginUtil';
import '../assets/output.css';

let UserString: Ref<string> = ref('');

onMounted(async () => {
    let userString = await getUserString();
    if (userString) {
        UserString.value = userString;
    }
});

async function handleLogoutClick() {
    await HandleLogout();
    // navigateTo("/login");
}

async function getUserString() {
    // var user = await useFetch("/api/user/getUser", {
    //     credentials: "include"
    // });

    // if(!user.data.value?.username) {
    //     navigateTo("/login");
    // }

    // return user.data.value?.username
    return 'user login not set up :(';
}
</script>

<style>
.login-debug {
    position: fixed;
    bottom: 0;
    padding: 0.5em;
}
</style>
