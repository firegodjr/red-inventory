<template>
    <div id="trs">
        <HoloPanes :pane-names="['architectures', 'archView']" :curr-pane="CurrPane">
            <template v-slot:architectures>
                <div class="relative">
                    <h1>NET ARCHITECTURES</h1>
                    <p>Your home away from meatspace.</p>
                    <div
                        @click="emit('reqest-modal', ModalType.NEW_ARCH)"
                        class="add-new noselect green p-3 absolute top-3 right-0"
                    >
                        <h2>
                            <i class="fa-solid fa-circle-plus"></i><span> New Architecture</span>
                        </h2>
                    </div>
                </div>
                <br />
                <GenericList
                    :add-button-string="'New Architecture'"
                    :entries="[]"
                    :entry-name-key="'name'"
                    :entry-desc-keys="[]"
                    :entry-desc-format="''"
                    @entry-click="handleArchSelected"
                    @addbtn-click="handleAddArch"
                >
                    <i class="fa-solid fa-code fa-sm"></i>
                </GenericList>
            </template>
            <template v-slot:archView> </template>
        </HoloPanes>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import GenericList from '../components/generic/genericList.vue';
import HoloPanes from '../components/generic/holoPanes.vue';
import { ModalType } from '../components/modal';

const props = defineProps<{
    architectures: any[];
}>();

const emit = defineEmits(['reqest-modal']);

let CurrPane = ref('architectures');
let SelectedArch = ref(null);

function handleArchSelected(e: any) {
    SelectedArch.value = e;
    CurrPane.value = 'archView';
}

function handleAddArch() {
    emit('reqest-modal', ModalType.NEW_ARCH);
}
</script>
