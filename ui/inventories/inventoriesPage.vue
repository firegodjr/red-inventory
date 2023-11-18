<template>
    <div class="relative">
        <h1>INVENTORIES</h1>
        <p>Where your crew stashes loot, guns, and chrome.</p>
        <div @click="() => emit('reqest-modal', ModalType.NEW_INV)" class="add-new noselect green p-3 absolute top-3 right-0">
            <h2><i class="fa-solid fa-circle-plus"></i><span> New Inventory</span></h2>
        </div>
    </div>
    <br />
    <HoloPanes 
    ref="InvPanes"
    :show-header="true"
    :pane-names="['inventories', 'items', 'itemView']"
    :curr-pane="CurrPane">
        <template v-slot:inventories>
            {{ inventories }}
            <GenericList 
            :entries="inventories" 
            :entry-name-key="'name'" 
            :entry-desc-keys="['itemCount', 'userCount']"
            :entry-desc-format="'Items: {0} - Users: {1}'" 
            @entry-click="handleSelectInventory">
                <i class="fa-solid fa-layer-group fa-sm"></i>
            </GenericList>
        </template>
        <template v-slot:items>
            <GenericList 
            :entries="SelectedInventory?.items" 
            :entry-name-key="'name'" 
            :entry-desc-keys="(e) => [ItemTypeToString(e.type), e.count]"
            :entry-desc-format="'{0} x{1}'" 
            :get-item-type="(e) => e.type"
            @entry-click="handleSelectItem">
                <i class="fa-solid fa-boxes-stacked"></i>
            </GenericList>
        </template>
        <template v-slot:itemView>
            <h1 class="blue">{{ SelectedItem?.name }}</h1>
            <h3 class="white">
                <ItemIcon :item-type="SelectedItem?.type || ItemType.NONE" />
                {{ ItemTypeToString(SelectedItem?.type) }}</h3>
            <br />
            <h3>Attributes</h3>
            <GenericList 
            :entries="SelectedItem?.items" 
            :entry-name-key="'name'" 
            :entry-desc-keys="['type', 'count']"
            :entry-desc-format="'{0} x{1}'"
            @entry-click="handleSelectItem">
                <i class="fa-solid fa-paperclip"></i>
            </GenericList>
        </template>
    </HoloPanes>
</template>

<script setup lang="ts">
import { ModalType } from '../modal';
import HoloPanes from '../generic/holoPanes.vue';
import GenericList from '../generic/genericList.vue';
import ItemIcon from './itemIcon.vue';
import { ItemType, ItemTypeToString } from '~/items/itemsUtil';

let SelectedInventory: Ref<any | null> = ref(null);
let SelectedItem: Ref<any | null> = ref(null);
let CurrPane = ref('inventories');

const props = defineProps<{
    inventories: any[]
}>();

const emit = defineEmits([
    'reqest-modal'
])

async function handleSelectInventory(e: any) {
    SelectedInventory.value = e;
    CurrPane.value = 'items';
}

async function handleSelectItem(e: any) {
    SelectedItem.value = e;
    CurrPane.value = 'itemView'
}

onMounted(() => {
});
</script>