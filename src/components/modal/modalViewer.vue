<template>
    <template v-if="showModal">
        <div class="block-ui">
            <div class="modal red">
                <div v-if="modalType == ModalType.CONFIRM">
                    <h1>{{ modalText }}</h1>
                    <button @click="showModal = false">Confirm</button>
                </div>
                <div v-if="modalType == ModalType.NEW_INV">
                    <AddInvModal @submit="handleAddInv" />
                </div>
                <div v-if="modalType == ModalType.NEW_INV_ITEM"></div>
                <div v-if="modalType == ModalType.NEW_INV_ITEM_ATTR"></div>
                <div v-if="modalType == ModalType.NEW_ARCH"></div>
                <div v-if="modalType == ModalType.NEW_ARCH_LEVEL"></div>
                <div v-if="modalType == ModalType.NEW_ARCH_ITEM"></div>
            </div>
        </div>
    </template>
</template>

<script lang="ts" setup>
import { Subscriber } from '@/pubsub/subscriber';
import { ref } from 'vue';
import { ModalRequest, ModalType, ModalResult } from '../modal';
import AddInvModal from './addInvModal.vue';
import { useInventoryStore } from '@/stores/inventory';

var invStore = useInventoryStore();
var modalType = ref(ModalType.NEW_INV);
var modalText = ref('');
var showModal = ref(false);
var sub = new Subscriber('modal', (req: ModalRequest) => {
    modalText.value = req.text;
    modalType.value = req.type;
    showModal.value = true;
});
sub.subscribe();

function handleAddInv(result: ModalResult) {
    var name = result.results['name']

    invStore.addInventory(name);
    showModal.value = false;
}
</script>

<style scoped>
.modal {
    align-self: center;
    margin: auto;
    min-width: 40em;
    width: 50vw;
    max-height: 90vh;
    overflow-y: auto;
}

.block-ui {
    display: grid;
    position: fixed;
    z-index: 999;
    backdrop-filter: blur(10px);
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
}
</style>
