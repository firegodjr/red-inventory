<template>
    <GenericModal v-if="ModalDisplay" :type="CurrModalType" :modal="CurrModal" @submit="handleModalSubmit"
        @cancel="handleModalCancel" />
    <NavFrame>
        <template v-slot:invs>
            <InventoriesPage v-if="!LoadingInventories" @reqest-modal="showModal" />
        </template>

        <template v-slot:arch>
            <ArchitecturesPage :architectures="[]" @reqest-modal="showModal"/>
        </template>

        <template v-slot:crew>
            <CrewsPage />
        </template>

        <template v-slot:acct>
            <AccountPage />
        </template>

    </NavFrame>

    <div class="login-debug yellow">
        Logged in as: {{ UserString }}
        <button @click="handleLogoutClick">Logout</button>
    </div>
</template>

<script setup lang="ts">
import GenericModal from "../ui/genericModal.vue";
import { ModalType } from "../ui/modal";
import NavFrame from "../ui/navFrame.vue";
import AddInvModal from "../ui/modal/addInvModal.vue";
import InventoriesPage from "../ui/inventories/inventoriesPage.vue";
import ArchitecturesPage from "../ui/architectures/architecturesPage.vue";
import CrewsPage from "../ui/crews/crewsPage.vue";
import AccountPage from "../ui/account/accountPage.vue";
import { HandleLogout } from "~/util/loginUtil";

useHead({
    script: [
        {
            //FontAwesome solid and regular kit
            src: "https://kit.fontawesome.com/8ee48232fe.js",
            crossorigin: "anonymous"
        }
    ]
});

let ModalDisplay = ref(false);
let CurrModalType = ref(ModalType.CONFIRM);
let CurrModal: Ref<object | null> = ref(null);
let UserString: Ref<string> = ref("");

let LoadingInventories: Ref<boolean> = ref(false);

onMounted(async () => {
    let userString = await getUserString();
    if(userString) {
        UserString.value = userString;
    }
});

function refreshInventories() {
    LoadingInventories.value = true;
    LoadingInventories.value = false;
}

function showModal(e: ModalType) {
    ModalDisplay.value = true;
    CurrModalType.value = e;
    CurrModal.value = createModal(e);
}

function createModal(e: ModalType) {
    switch(e) {
        case ModalType.NEW_INV:
            return AddInvModal;
        default:
            return null;
    }
}

async function handleModalSubmit(e: any) {
    switch (e.modalType) {
        case ModalType.NEW_INV:
            await useFetch("/api/addInventory", {
                method: "post",
                credentials: "include",
                body: { name: e.name }
            });
            refreshInventories();
            break;
    }
}

function handleModalCancel(e: any) {
    ModalDisplay.value = false;
}

async function handleLogoutClick(e: any) {
    await HandleLogout();
    navigateTo("/login");
}

async function getUserString() {
    var user = await useFetch("/api/user/getUser", {
        credentials: "include"
    });

    if(!user.data.value?.username) {
        navigateTo("/login");
    }

    return user.data.value?.username
}
</script>

<style>
.login-debug {
    position: fixed;
    bottom: 0;
    padding: 0.5em;
}


</style>