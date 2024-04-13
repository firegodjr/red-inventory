<template>
    <NavFrame>
        <!-- <template v-slot:invs>
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
        </template> -->

    </NavFrame>

    <div class="login-debug yellow">
        Logged in as: {{ UserString }}
        <button @click="handleLogoutClick">Logout</button>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref, type Ref } from "vue";
import { ModalType } from "../components/modal";
import NavFrame from "../components/navFrame.vue";
import AddInvModal from "../components/modal/addInvModal.vue";
import { HandleLogout } from "../util/clientLoginUtil";

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
    return "user login not set up :(";
}
</script>

<style>
.login-debug {
    position: fixed;
    bottom: 0;
    padding: 0.5em;
}


</style>
./util/clientLoginUtil../components/modal./accountPage.vue./inventoriesPage.vue