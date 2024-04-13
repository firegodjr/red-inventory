<template>
    <span class="icon-box">
        <i v-if="itemType == ItemType.CW_AUDIO" class="fa-solid fa-ear-listen"></i>
        <i v-if="itemType == ItemType.CW_OPTICS" class="fa-solid fa-eye"></i>
        <i v-if="itemType == ItemType.CW_BORGWARE" class="fa-solid fa-robot"></i>
        <i v-if="cyberware.indexOf(itemType) != -1" class="fa-solid fa-microchip"></i>
        <i v-if="guns.indexOf(itemType) != -1" class="fa-solid fa-gun"></i>
    </span>
</template>

<script setup lang="ts">
import { ItemType } from '../../util/itemsUtil';

const cyberware = [
    ItemType.CW_GENERIC,
    ItemType.CW_INTERNAL,
    ItemType.CW_EXTERNAL,
    ItemType.CW_FASHION
]

const guns = [
    ItemType.WP_ASSAULT_RIFLE,
    ItemType.WP_PISTOL_LIGHT,
    ItemType.WP_PISTOL_MEDIUM,
    ItemType.WP_PISTOL_HEAVY,
    ItemType.WP_PISTOL_VHEAVY,
    ItemType.WP_ROCKET_LAUNCHER,
    ItemType.WP_SHOTGUN,
    ItemType.WP_SNIPER
]

const props = defineProps<{
    itemType: ItemType
}>();
</script>

<style>
.icon-box {
    margin: 0 0.5em;
}
</style>