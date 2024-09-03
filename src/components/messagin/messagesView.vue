<script lang="ts" setup>
import Message from './message.vue';
import { type UserNotif } from '@prisma/client';
import { useUsersStore } from '@/stores/users';
const props = defineProps<{
    notif: UserNotif;
}>();
const userStore = useUsersStore();
</script>
<template>
    <h1 class="blue text-header">
        {{ userStore.users[notif.senderId].username }}
    </h1>
    <div class="blue-box line-thin"></div>
    <br />
    <Message :notif="notif" />
</template>
<style>
.text-header {
    text-align: center;
}
</style>
