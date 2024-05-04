<template>
    <h1 class="red">{{ props.item.name }}</h1>
    <h3 class="white">
        <ItemIcon :item-type="props.item.type || ItemType.NONE" />
        <ItemQualityStr :quality="props.item.quality || ItemQuality.NONE" />
        {{ ItemTypeToString(props.item.type) }}
    </h3>
    <div class="float-right">
        <div v-if="props.item.heldById && userStore.users[props.item.heldById]">
            <h3 class="red">
                Held By
                <span class="white">{{ userStore.users[props.item.heldById].username }}</span>
                <button
                    v-if="props.item.heldById === accountStore.account?.dataId"
                    @click="handleReturn"
                >
                    Return
                </button>
            </h3>
        </div>
        <h3 v-else>
            <button @click="handleCheckout">Check Out Item</button>
        </h3>
    </div>
    <br />
    <h3>Attributes</h3>
    <GenericList
        :noclick="true"
        :entries="props.item.fields"
        :entry-name-key="'name'"
        :entry-desc-keys="['value']"
        :entry-desc-format="'{0}'"
    >
        <i class="fa-solid fa-paperclip"></i>
    </GenericList>
</template>

<script lang="ts" setup>
import { ItemQuality, ItemType, ItemTypeToString, ItemQualityToString } from '../util/itemsUtil';
import ItemQualityStr from '../components/inventories/itemQualityStr.vue';
import GenericList from '@/components/generic/genericList.vue';
import { type Item, type Field } from '@prisma/client';
import { useUsersStore } from '@/stores/users';
import { onMounted } from 'vue';
import { useAccountStore } from '@/stores/account';
import { useInventoryStore } from '@/stores/inventory';

const props = defineProps<{
    item: Item & { fields: Field[] };
}>();

let userStore = useUsersStore();
let accountStore = useAccountStore();
let inventoryStore = useInventoryStore();

let handleCheckout = async () => {
    let id = accountStore.account?.dataId;
    if (id) {
        props.item.heldById = id;
        await userStore.fetchUser(id);
        await inventoryStore.holdItem(props.item.id, id);
    }
};

let handleReturn = async () => {
    props.item.heldById = null;
    await inventoryStore.holdItem(props.item.id, null);
};

onMounted(async () => {
    if (props.item.heldById) {
        await userStore.fetchUser(props.item.heldById);
    }
});
</script>
