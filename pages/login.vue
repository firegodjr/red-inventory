<template>
    <div class="login-box red">
        <h1>Login</h1>
        <h3 class="yellow">{{ Error }}</h3>
        <label>Username</label>
        <input type="text" v-model="Username" />
        <br />
        <label>Password</label>
        <input type="password" v-model="Password" />
        <br />
        <button @click="submit">Login</button>
    </div>
</template>

<script setup lang="ts">
import { HandleLogin } from '~/util/loginUtil';

let Username = ref("");
let Password = ref("");
let Error = ref("");

async function submit() {
    let result = await HandleLogin(Username.value, Password.value);
    if(result.success) {
        navigateTo("/");
    }
    else {
        if(result.error)
            Error.value = result.error;
    }
}
</script>

<style>
.login-box {
    max-width: fit-content;
    margin: auto;
}
</style>