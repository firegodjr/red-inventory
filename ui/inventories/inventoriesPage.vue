<template>
    <HoloPanes 
    :show-header="false"
    :pane-names="['inventories', 'items', 'itemView']"
    :curr-pane="CurrPane">
        <template v-slot:inventories>
            <div class="relative">
                <h1>INVENTORIES</h1>
                <p>Where your crew stashes loot, guns, and chrome.</p>
            </div>
            <br />
            <GenericList 
            :add-button-string="'New Inventory'"
            :entries="Inventories" 
            :entry-name-key="'name'" 
            :entry-desc-keys="['itemCount', 'userCount']"
            :entry-desc-format="'Items: {0} - Users: {1}'" 
            @addbtn-click="handleAddInventory"
            @entry-click="handleInvSelected">
                <i class="fa-solid fa-layer-group fa-sm"></i>
            </GenericList>
        </template>
        <template v-slot:items>
            <button class="back-btn" @click="() => CurrPane = 'inventories'">Back to Inventories</button><br />
            <h1>{{ SelectedInventory?.name }}</h1>
            
            <br />
            <GenericList 
            :add-button-string="'New Item'"
            :entries="SelectedInventory?.items" 
            :entry-name-key="'name'" 
            :entry-desc-keys="(e) => [ItemQualityToString(e.quality), ItemTypeToString(e.type), e.count]"
            :entry-desc-format="'{0} {1} x{2}'" 
            :get-item-type="(e) => e.type"
            @addbtn-click="handleAddItem"
            @entry-click="handleItemSelected">
                <i class="fa-solid fa-boxes-stacked"></i>
            </GenericList>
        </template>
        <template v-slot:itemView>
            <button class="back-btn" @click="() => CurrPane = 'items'">Back to Items</button><br />
            <h1 class="red">{{ SelectedItem?.name }}</h1>
            <h3 class="white">
                <ItemIcon :item-type="SelectedItem?.type || ItemType.NONE" />
                <ItemQualityStr :quality="SelectedItem?.quality || ItemQuality.NONE"/>
                {{ ItemTypeToString(SelectedItem?.type) }}</h3>
            <br />
            <h3>Attributes</h3>
            <GenericList 
            :noclick="true"
            :entries="SelectedItem?.fields" 
            :entry-name-key="'name'" 
            :entry-desc-keys="['value']"
            :entry-desc-format="'{0}'">
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
import { ItemQuality, ItemType, ItemTypeToString, ItemQualityToString } from '~/items/itemsUtil';
import ItemQualityStr from './itemQualityStr.vue';
import { Inventory } from '@prisma/client';

let SelectedInventory: Ref<any | null> = ref(null);
let SelectedItem: Ref<any | null> = ref(null);
let CurrPane = ref('inventories');
let Inventories: Ref<Inventory[]> = ref([]);

const emit = defineEmits([
    'reqest-modal'
])

onMounted(async () => {
    let inventories = await useFetch(
    '/api/user/getInventoriesForSelectedCrew', {
        credentials: 'include'
    });
    Inventories.value = inventories.data.value as any;
});

async function handleInvSelected(e: any) {
    SelectedInventory.value = e;
    CurrPane.value = 'items';
}

function handleAddInventory(e: any) {
    emit('reqest-modal', ModalType.NEW_INV);
}

async function handleItemSelected(e: any) {
    SelectedItem.value = e;
    CurrPane.value = 'itemView'
}

function handleAddItem(e: any) {
    emit('reqest-modal', ModalType.NEW_INV_ITEM)
}
</script>