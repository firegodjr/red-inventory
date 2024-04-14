<template>
    <button v-if="showHeader" @click="setPaneByIndex(currPaneIndex - 1)">Back</button>
    <button v-if="showHeader" @click="setPaneByIndex(currPaneIndex + 1)">Forward</button>
    <div class="holo-pane-wrapper">
        <div
            v-for="pane in paneNames"
            class="pane"
            :class="{ hidden: currPane != pane }"
            :style="getPaneStyle(pane, currPaneIndex)"
        >
            <h2 v-if="showHeader">{{ pane }}</h2>
            <slot :name="pane">
                <div class="yellow">
                    <h1>HoloPane isn't properly set up.</h1>
                    <p>
                        Make sure that the value for paneNames and the name of your v-slot bindings
                        match
                    </p>
                </div>
            </slot>
        </div>
    </div>
</template>

<script setup lang="ts">
import { type StyleValue, ref, onMounted, watchEffect } from 'vue';

const props = defineProps<{
    paneNames: string[];
    currPane: string;
    showHeader?: boolean;
}>();

const emit = defineEmits(['back-request']);

let currPaneIndex = ref(0);
let currPane = ref('');

onMounted(() => {
    watchEffect(() => {
        setPane(props.currPane);
    });
});

function setPaneByIndex(index: number) {
    currPaneIndex.value = index;
    currPane.value = props.paneNames[index];
}

function setPane(name: string) {
    currPaneIndex.value = props.paneNames.indexOf(name);
    currPane.value = name;
}

function getPaneStyle(name: string, currPaneIndex: number): StyleValue {
    let paneIndex = props.paneNames.indexOf(name);
    let paneDepth = currPaneIndex - paneIndex;

    if (paneDepth < 0) {
        return {
            'z-index': -99,
            filter: `blur(9px)`,
            opacity: '0',
            'pointer-events': 'none',
            transform: `translateX(${15}rem) scale(1.3)`
        };
    }

    return {
        filter: `blur(${9 * paneDepth}px)`,
        opacity: `${1 - 0.5 * paneDepth}`,
        transform: `translateX(${-15 * paneDepth}rem) scale(${Math.max(0, 1 - 0.2 * paneDepth)})`,
        'pointer-events': paneDepth > 0 ? 'none' : 'inherit'
    };
}
</script>

<style>
.holo-pane-wrapper {
    display: grid;
    position: relative;
    gap: 1em;

    container-type: inline-size;
    container-name: two-pane;
}

.pane {
    position: absolute;
    transition: 0.2s ease;
    width: 100%;
    min-height: 50vh;
}
</style>
