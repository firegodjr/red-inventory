<template>
    <div id="trs">
        <HoloPanes
            :show-header="false"
            :pane-names="['details', 'notifications', 'notifView']"
            :curr-pane="CurrPane"
        >
            <template v-slot:details>
                <h1>ACCOUNT</h1>
                <p>Your detes.</p>
                <br />
                <button
                    class="green float-right absolute right-0 z-10"
                    @click="() => (CurrPane = 'notifications')"
                >
                    Notifs
                </button>
                <div class="white" v-if="accountStore.account">
                    <label class="red">User</label>
                    <input type="text" :value="accountStore.account?.username" disabled="true" />
                    <br />
                    <label class="red">Email</label>
                    <input type="text" :value="accountStore.account?.email" disabled="true" />
                </div>
            </template>
            <template v-slot:notifications>
                <button class="back-btn" @click="() => (CurrPane = 'details')">
                    Back to Details
                </button>
                <br />
                <br />
                <h1>Notifications</h1>
                <GenericList
                    :entries="accountStore.account?.notifs"
                    :entry-name-key="'title'"
                    :entry-desc-keys="['content']"
                    :entry-desc-format="'{0}'"
                    :get-item-type="(e: UserNotif) => (e.unread ? ItemType.UNREAD : ItemType.READ)"
                    @entry-click="handleNotifSelected"
                >
                    <i class="fa-regular fa-envelope"></i>
                </GenericList>
            </template>
            <template v-slot:notifView>
                <template v-if="SelectedNotif">
                    <button class="back-btn" @click="() => (CurrPane = 'notifications')">
                        Back to Notifs
                    </button>
                    <br />
                    <h1 class="blue text-header">
                        {{ userStore.users[SelectedNotif?.senderId].username }}
                    </h1>
                    <div class="blue-box line-thin"></div>
                    <br />
                    <div>
                        <h3>
                            <span class="yellow">{{
                                userStore.users[SelectedNotif?.senderId].username
                            }}</span>
                        </h3>
                        <div class="text-msg yellow-box-hollow yellow">
                            <h2>{{ SelectedNotif?.title }}</h2>
                            <div class="yellow-box line-thin"></div>
                            <p>{{ SelectedNotif?.content }}</p>
                        </div>
                    </div>
                </template>
            </template>
        </HoloPanes>
    </div>
</template>

<script setup lang="ts">
import type { Crew, UserNotif } from '@prisma/client';
import { onMounted, ref, type Ref } from 'vue';
import { useAccountStore } from '@/stores/account';
import { useUsersStore } from '@/stores/users';
import GenericList from '@/components/generic/genericList.vue';
import HoloPanes from '@/components/generic/holoPanes.vue';
import { ItemType } from '@/util/itemsUtil';

let CurrPane: Ref<string> = ref('details');
let SelectedNotif: Ref<UserNotif | undefined> = ref();
let CrewsForUser: Ref<Crew[]> = ref([]);
const accountStore = useAccountStore();
const userStore = useUsersStore();

function handleNotifSelected(notif: UserNotif) {
    userStore.fetchUser(notif.senderId).then(() => {
        SelectedNotif.value = notif;
        CurrPane.value = 'notifView';
    });
}

onMounted(async () => {
    // TODO select currently selected crew here
});
</script>

<style scoped>
.text-msg {
    left: 0;
    max-width: 50%;
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
.text-header {
    text-align: center;
}
</style>
