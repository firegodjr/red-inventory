<template>
   <h1>Account</h1>
    <p>Your detes.</p>
    <br />
    <div class="white" v-if="UserInfo">
        <h2><span class="red">User <i class="fa-solid fa-caret-right"></i></span> {{ UserInfo.username }}</h2>
        <h2><span class="red">Email <i class="fa-solid fa-caret-right"></i></span> {{ UserInfo.email }}</h2>
        <label>Current Crew</label>
        <select @change="handleCrewSelected">
            <option>None</option>
            <option v-for="crew in CrewsForUser" value="">{{ crew.name }}</option>
        </select>
    </div>
    <div>
        <label>Email Address</label>
        <input type="email" />
    </div>
</template>

<script setup lang="ts">
import { Crew, User } from '.prisma/client';

let CrewsForUser: Ref<Crew[]> = ref([]);
let UserInfo: Ref<User | undefined> = ref(undefined);

onMounted(async () => {
    let crews = await useFetch("/api/user/getCrews", {
        credentials: 'include'
    });
    let userInfo = await useFetch("/api/user/getUser", {
        credentials: 'include'
    })

    CrewsForUser.value = crews.data.value as any;
    UserInfo.value = userInfo.data.value as any;

    // TODO select currently selected crew here
});

function handleCrewSelected(e: any) {

}
</script>