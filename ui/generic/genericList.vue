<template>
    <div class="cyber-list noselect">
        <div class="line-box">
            <div class="line-thin red-box"></div>
            <slot><i class="fa-solid fa-layer-group fa-sm"></i></slot>
        </div>
        <template v-for="entry in entries">
            <div :tabindex="0" class="cyber-list-entry" :class="{clickable: !noclick}" @click="() => emit('entry-click', entry)">
                <ItemIcon v-if="getItemType" class="red" :item-type="getItemType(entry)" />
                <span class="blue">{{ getEntryName(entry) }}</span>
                <span class="desc white">{{ getEntryDesc(entry) }}</span>
                <span v-if="!noclick" class="chevron"><i class="fa-solid fa-caret-right"></i></span>
            </div>
            <div class="line-thin red-box"></div>
        </template>
        <template v-if="entries == null || entries?.length == 0">
            <div class="cyber-list-entry">
                <span class="red">NO DATA</span>
            </div>
        </template>
        <template v-if="addButtonString">
            <div class="cyber-list-entry add-new clickable" @click="emit('addbtn-click')">
                <span class="red"><i class="fa-solid fa-circle-plus"></i> {{ addButtonString }}</span>
            </div>
            <div class="line-thin red-box"></div>
        </template>
        <i class="fa-solid fa-vector-square"></i>
    </div>
    <p class="noselect" style="font-size: x-small; opacity: 50%;">
        <br />
        [ { "id": 1, "name": "Bathsheba", "items": [ { "id": 1, "name": "Militech XR-83", "type": "Heavy Ranged Weapon", "count": 1, "inventoryId": 1, "fields": [ { "id": 1, "name": "Damage", "value": "3d6", "itemId": 1 }, { "id": 2, "name": "Magazine Size", "value": "8", "itemId": 1 } ] }, { "id": 2, "name": "Arasaka Smart Shotgun", "type": "Heavy Ranged Weapon", "count": 1, "inventoryId": 1, "fields": [ { "id": 3, "name": "Damage", "value": "3d6", "itemId": 2 }, { "id": 4, "name": "Magazine Size", "value": "4", "itemId": 2 } ] } ], "users": [ { "id": 1, "email": "coyote@kickflip.gov" } ], "_count": { "users": 1, "items": 2 } }, { "id": 2, "name": "Dumpster on 12th & Main", "items": [ { "id": 3, "name": "Militech XR-83", "type": "Heavy Ranged Weapon", "count": 1, "inventoryId": 2, "fields": [ { "id": 5, "name": "Damage", "value": "3d6", "itemId": 3 }, { "id": 6, "name": "Magazine Size", "value": "8", "itemId": 3 } ] }, { "id": 4, "name": "Arasaka Smart Shotgun", "type": "Heavy Ranged Weapon", "count": 1, "inventoryId": 2, "fields": [ { "id": 7, "name": "Damage", "value": "3d6", "itemId": 4 }, { "id": 8, "name": "Magazine Size", "value": "4", "itemId": 4 } ] } ], "users": [ { "id": 1, "email": "coyote@kickflip.gov" } ], "_count": { "users": 1, "items": 2 } } ]
    </p>
</template>

<script setup lang="ts">
import ItemIcon from '../inventories/itemIcon.vue';
import { ItemType } from '~/items/itemsUtil';

const props = defineProps<{
    noclick?: boolean,
    entries?: any[] | null,
    entryNameKey: string,
    entryDescKeys: ((e: any) => string[]) | string[],
    entryDescFormat: string,
    addButtonString?: string,
    getItemType?: ((e: any) => ItemType)
}>();

const emit = defineEmits([
    "entry-click",
    "addbtn-click"
])

function getEntryName(entry: any): string {
    return entry[props.entryNameKey];
}

function getEntryDesc(entry: any): string {
    let desc = props.entryDescFormat;
    let descKeys: string[] = [];
    if((props.entryDescKeys as any).at) {
        descKeys = props.entryDescKeys as string[];
        for(let i = 0; i < descKeys.length; ++i) {
            desc = desc.replaceAll(`{${i}}`, entry[descKeys[i]]);
        }
    }
    else {
        descKeys = (props.entryDescKeys as (e: any) => string[])(entry);
        for(let i = 0; i < descKeys.length; ++i) {
            desc = desc.replaceAll(`{${i}}`, descKeys[i]);
        }
    }

    return desc;
}
</script>

<style>
.cyber-list {
    display: grid;
    position: relative;
    font-size: large;
    font-weight: bold;
    background-color: var(--clr-bg-red);
    margin-left: 1.40em;

    container-type: inline-size;
    container-name: generic-list;
}

.cyber-list > i {
    position: absolute;
    left: -1.25em;
    font-size: x-small;
    bottom: -0.07em;
}

.line-box {
    position: relative;
}

.line-box > i {
    position: absolute;
    left: -1.50em;
    top: 0.50em;
}

.cyber-list-entry {
    position: relative;
    padding: 0.75em;
}

.cyber-list-entry > .desc {
    font-size: smaller;
    font-weight: normal;
    margin-left: 1em;
}

.cyber-list-entry > .chevron {
    position: absolute;
    right: 1em;
}

.cyber-list-entry.clickable {
    cursor: pointer;
}

.cyber-list-entry.clickable:hover {
    background-color: var(--clr-bg-red);
}

.cyber-list-entry.clickable:active {
    background-color: var(--clr-bg-red-active);
}

.cyber-list-entry.add-new {
    padding: 0.25em;
    text-align: center;
}

@container generic-list (max-width: 400px) {
    .cyber-list-entry * {
        font-size: 1rem;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    .cyber-list-entry .desc::before {
        content: "\a";
        white-space: pre;
    }
}
</style>