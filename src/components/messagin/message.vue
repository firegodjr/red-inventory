<script lang="ts" setup>
import { useUsersStore } from '@/stores/users';
import { type UserNotif } from '@prisma/client';
const userStore = useUsersStore();
const props = defineProps<{
    notif: UserNotif;
}>();
</script>

<template>
    <div>
        <h3>
            <span class="yellow">{{ userStore.users[props.notif.senderId].username }}</span>
        </h3>
        <div class="text-msg yellow-box-hollow yellow">
            <h2>{{ props.notif.title }}</h2>
            <div class="yellow-box line-thin"></div>
            <p>{{ props.notif.content }}</p>
        </div>
    </div>
</template>

<style scoped>
.text-msg {
    left: 0;
    max-width: 60%;
    width: fit-content;
    border-radius: 0.5em;
    border-top-left-radius: 0;
    padding: 1em;
    padding-top: 0.75em;
}

.text-msg > h1,
.text-msg > h2,
.text-msg > h3 {
    margin: 0;
}

.text-msg > * + * {
    margin-top: 0.75em;
}
</style>
