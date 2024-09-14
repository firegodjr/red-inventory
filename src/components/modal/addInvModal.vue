<template>
    <div class="red modal">
        <div class="modal-line-box">
            <div class="red-box line-thin"></div>
            <i class="fa-solid fa-plus"></i>
        </div>
        <div class="modal-content">
            <h1>Add a New Inventory for {{ crewName }}</h1>
            <label>Name</label>
            <input type="text" ref="nameField" placeholder="ex. Storage Locker" />
            <br />
            <br />
            <button class="red" @click="() => emit('cancel')">Cancel</button>
            <button class="green" @click="() => emit('submit', makeResultsObj())">Confirm</button>
        </div>
        <div class="red-box line-thin"></div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref, type Ref } from 'vue';
import { ModalResult, ModalType } from '../modal';
import { useUsersStore } from '@/stores/users';
import { useAccountStore } from '@/stores/account';

let userStore = useUsersStore();
let accountStore = useAccountStore();

var emit = defineEmits(['submit', 'cancel']);

const nameField: Ref<HTMLInputElement | undefined> = ref();
const usersField: Ref<HTMLTextAreaElement | undefined> = ref();

let crewName = ref("");

function makeResultsObj() {
    var result = new ModalResult({
        modalType: ModalType.NEW_INV,
        name: nameField.value?.value,
        users: usersField.value?.value
    });
    return result;
}

onMounted(async () => {
    let crewId = accountStore.account?.selectedCrewId;
    let crew = await userStore.getCrew(crewId as string);
    crewName.value = crew.name;
});
</script>
<style scoped>
.modal-line-box {
    position: relative;
}

.modal-line-box>i {
    position: absolute;
    top: 0.5em;
    left: -1.5em;
}

.modal-content {
    background-color: var(--clr-bg-red);
    padding: 0.5em;
}

.modal-content input,
.modal-content textarea,
.modal-content label {
    font-size: larger;
}
</style>
