<template>
   <h1>Account</h1>
    <p>Your detes.</p>
    <br />
    <div>
        <label>Current Crew</label>
        <select>
            <option v-for="crew in CrewsForUser" value=""></option>
        </select>
    </div>
    <div>
        <label>Email Address</label>
        <input type="email" />
    </div>
</template>

<script setup lang="ts">
import { Crew, User } from '.prisma/client';

const props = defineProps<{
    user: User
}>()

let CrewsForUser: Ref<Crew[]> = ref([]);

// onMounted() {
//     let crews = useFetch()
// }
</script>