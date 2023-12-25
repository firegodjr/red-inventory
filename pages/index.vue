<template>
    <GenericModal v-if="ModalDisplay" :type="CurrModalType" :modal="CurrModal" @submit="handleModalSubmit"
        @cancel="handleModalCancel" />
    <NavFrame>

        <template v-slot:invs>
            <InventoriesPage :inventories="(inventories as any)" @reqest-modal="showModal" />
        </template>

        <template v-slot:arch>
            <ArchitecturesPage :architectures="[]" @reqest-modal="showModal"/>
        </template>

        <template v-slot:acct>
            
        </template>

    </NavFrame>

    <div class="login-debug yellow">
        Logged in as: {{ UserString }}
    </div>
</template>

<script setup lang="ts">
import GenericModal from "../ui/genericModal.vue";
import GenericList from "../ui/generic/genericList.vue";
import { ModalType } from "../ui/modal";
import NavFrame from "../ui/navFrame.vue";
import AddInvModal from "../ui/modal/addInvModal.vue";
import TwoPane from "../ui/generic/holoPanes.vue";
import InventoriesPage from "../ui/inventories/inventoriesPage.vue";
import ArchitecturesPage from "../ui/architectures/architecturesPage.vue";
import AccountPage from "../ui/account/accountPage.vue";

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

const { data: inventories } = await useFetch("/api/getInventoriesForCrew", {
    method: 'post',
    body: {
        id: 1
    }
});

onMounted(async () => {
    let userString = await getUserString();
    if(userString) {
        UserString.value = userString;
    }
})

function showAddInventory() {
    CurrModal.value = AddInvModal;
    ModalDisplay.value = true;
}
function showAddArchitecture() {
    CurrModal.value = null; //TODO
    ModalDisplay.value = true;
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

function handleModalSubmit(e: any) {
    switch (e.modalType) {
        case ModalType.NEW_INV:

            break;
    }
}

function handleModalCancel(e: any) {
    ModalDisplay.value = false;
}

async function getUserString() {
    var user = await useFetch("/api/getUser", {
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