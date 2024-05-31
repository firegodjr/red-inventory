<template>
    <div id="trs">
        <div class="login-box red">
            <h1>REGISTER</h1>
            <h3>Welcome to Night City, choom.</h3>
            <h3 class="yellow">{{ Error }}</h3>
            <label>Username</label>
            <input type="text" v-model="Username" />
            <br />
            <label>Password</label>
            <input type="password" v-model="Password" />
            <br />
            <label>Confirm Password</label>
            <input type="password" v-model="ConfirmPassword" />
            <br />
            <button @click="submit">Register</button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { HandleLogin } from '../util/clientLoginUtil';
import { ref } from 'vue';

let Username = ref('');
let Password = ref('');
let ConfirmPassword = ref('');
let Error = ref('');

async function submit() {
    if (Password.value != ConfirmPassword.value) {
        Error.value = 'Password and Confirm Password do not match.';
    } else {
        // todo
    }
}
</script>

<style>
.login-box {
    max-width: fit-content;
    margin: auto;
}
</style>
