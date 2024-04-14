<template>
    <div class="red modal">
        <div class="modal-line-box">
            <div class="red-box line-thin"></div>
            <i class="fa-solid fa-plus"></i>
        </div>
        <div class="modal-content">
            <h1>Add a New Inventory</h1>
            <label>Name</label>
            <input type="text" ref="nameField" placeholder="ex. My Inventory" />
            <br />
            <label>Users</label>
            <textarea ref="usersField"></textarea>
            <br /><br />
            <button class="red" @click="() => emit('cancel')">Cancel</button>
            <button class="white" @click="() => emit('submit', makeResultsObj())">Confirm</button>
        </div>
        <div class="red-box line-thin"></div>
    </div>
</template>

<script setup lang="ts">
import { ModalType } from '../modal';

var emit = defineEmits(['submit', 'cancel']);

const nameField: Ref<HTMLInputElement | undefined> = ref();
const usersField: Ref<HTMLTextAreaElement | undefined> = ref();

function makeResultsObj() {
    return {
        modalType: ModalType.NEW_INV,
        name: nameField.value?.value,
        users: usersField.value?.value
    };
}
</script>
