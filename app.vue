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
            <h1>ACCOUNT</h1>
            <p>Your detes.</p>
        </template>

    </NavFrame>
</template>

<script setup lang="ts">
import GenericModal from "./ui/genericModal.vue";
import GenericList from "./ui/generic/genericList.vue";
import { ModalType } from "./ui/modal";
import NavFrame from "./ui/navFrame.vue";
import AddInvModal from "./ui/modal/addInvModal.vue";
import TwoPane from "./ui/generic/holoPanes.vue";
import InventoriesPage from "./ui/inventories/inventoriesPage.vue";
import ArchitecturesPage from "./ui/architectures/architecturesPage.vue";

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

const { data: inventories } = await useFetch("/api/getInventoriesForUser", {
    method: 'post',
    body: {
        email: "coyote@kickflip.gov"
    }
});

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
</script>

<style>
@import url(./assets/css/ui.css);

body {
    height: 100vh;
    background: rgb(0, 22, 20);
    background: linear-gradient(0deg, rgb(0, 14, 12) 0%, #27080f 100%);
    overflow-x:hidden;
}

.add-new:hover {
    background-color: var(--clr-bg-green);
}

.add-new:active {
    background-color: var(--clr-bg-green-active);
}
</style>