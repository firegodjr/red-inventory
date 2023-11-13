<template>
  <GenericModal
  v-if="ModalDisplay"
  :type="CurrModalType" 
  @submit="handleModalSubmit"
  @cancel="handleModalCancel"/>
  <NavFrame>

    <template v-slot:invs>
      <div class="relative">
        <h1>INVENTORIES</h1>
        <p>Where your crew stashes loot, guns, and chrome.</p>
        <div @click="showAddInventory" class="add-new noselect green p-3 absolute top-3 right-0">
          <h2><i class="fa-solid fa-circle-plus"></i> New Inventory</h2>
        </div>
      </div>
      <br />
      <GenericList
      :entries="inventories"
      :entry-name-key="'name'"
      :entry-desc-keys="['items', 'users']"
      :entry-desc-format="'Items: {0} - Users: {1}'">
        <i class="fa-solid fa-layer-group fa-sm"></i>
      </GenericList>
    </template>

    <template v-slot:arch>
      <div class="relative">
        <h1>NET ARCHITECTURES</h1>
        <p>Your home away from meatspace.</p>
        <div @click="showAddArchitecture" class="add-new noselect green p-3 absolute top-3 right-0">
        <h2><i class="fa-solid fa-circle-plus"></i> New Architecture</h2>
      </div>
      </div>
      <br />
      <GenericList
      :entries="[]"
      :entry-name-key="'name'"
      :entry-desc-keys="[]"
      :entry-desc-format="''">
        <i class="fa-solid fa-code fa-sm"></i>
      </GenericList>
    </template>

    <template v-slot:acct>
      <h1>ACCOUNT</h1>
      <p>Your detes.</p>
    </template>

  </NavFrame>
</template>

<script setup lang="ts">
import GenericModal from "./ui/genericModal.vue";
import GenericList from "./ui/inventories/genericList.vue";
import { ModalType } from "./ui/modal";
import NavFrame from "./ui/navFrame.vue";

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

const { data: inventories } = await useFetch("/api/getInventoriesForUser", {
    method: 'post',
    body: {
        email: "coyote@kickflip.gov"
    }
});

function showAddInventory() {
  CurrModalType.value = ModalType.NEW_INV;
  ModalDisplay.value = true;
}
function showAddArchitecture() {
  CurrModalType.value = ModalType.NEW_ARCH;
  ModalDisplay.value = true;
}

function showModal() {
  ModalDisplay.value = true;
}

function handleModalSubmit(e: any) {
  switch(e.modalType) {
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
  background: rgb(0,22,20);
  background: linear-gradient(0deg, rgb(0, 14, 12) 0%, #27080f 100%);
}

.add-new:hover {
  background-color: var(--clr-bg-green);
}

.add-new:active {
  background-color: var(--clr-bg-green-active);
}
</style>