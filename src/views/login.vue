<template>
    <div id="trs">
        <div class="login-box red">
            <h1>Login</h1>
            <h3>Welcome back, cyberpunk.</h3>
            <h3 class="yellow">{{ Error }}</h3>
            <label>Username</label>
            <input type="text" v-model="Username" />
            <br />
            <label>Password</label>
            <input type="password" v-model="Password" @keyup="handleKeyup" />
            <br />
            <router-link :to="{ name: 'register' }"><button>Register</button></router-link>
            <button @click="submit">Login</button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { HandleLogin } from '../util/clientLoginUtil';
import { ref } from 'vue';

let Username = ref('');
let Password = ref('');
let Error = ref('');

function handleKeyup(ev: KeyboardEvent) {
    if (ev.key == 'Enter') {
        submit();
    }
}

async function submit() {
    HandleLogin(Username.value, Password.value)
        .then(async (result) => {
            if (result) return result.json();
        })
        .then((json) => {
            if (json.success) {
                window.location.href = window.location.pathname;
            } else {
                Error.value = json.message;
            }
        });
}
</script>

<style>
.login-box {
    max-width: fit-content;
    margin: auto;
}
</style>
