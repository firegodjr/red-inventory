<template>
    <span :class="qualityClassObj()">{{ ItemQualityToString(quality) }}</span>
</template>

<script setup lang="ts">
import { ItemQuality, ItemQualityToString } from '../../util/itemsUtil';

const props = defineProps<{
    quality: ItemQuality
}>();

function qualityClassObj() {
    return {
        yellow: props.quality == ItemQuality.EXCELLENT,
        white: props.quality == ItemQuality.STANDARD,
        red: props.quality == ItemQuality.POOR
    }
    
}
</script>