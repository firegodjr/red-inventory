<template>
    <div class="inv-grid">
        <div class="line-box">
            <div class="line-thin red-box"></div>
            <i class="fa-solid fa-layer-group fa-sm"></i>
        </div>
        <template v-for="inv in inventories">
            <div class="inv-entry">
                <span class="blue">{{ inv.name }}</span>
                <span class="desc white">Items: {{ inv._count.items }} - Users: {{ inv._count.users }}</span>
                <span class="chevron"><i class="fa-solid fa-caret-right"></i></span>
            </div>
            <div class="line-thin red-box"></div>
        </template>
        <i class="fa-solid fa-vector-square"></i>
    </div>
    <p style="font-size: x-small; opacity: 50%;">
        <br />{{ inventories }}
    </p>
</template>

<script setup lang="ts">
import { Inventory, Prisma } from '.prisma/client';

const { data: inventories } = await useFetch("/api/getInventoriesForUser", {
    method: 'post',
    body: {
        email: "coyote@kickflip.gov"
    }
});
</script>

<style>
.inv-grid {
    display: grid;
    position: relative;
    font-size: x-large;
    font-weight: bold;
    background-color: var(--clr-bg-red);
    margin-left: 1.40em;
}

.inv-grid > i {
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

.inv-entry {
    position: relative;
    padding: 0.75em;
    cursor: pointer;
    background-color: var(--clr-bg-black);
}

.inv-entry > .desc {
    font-size: smaller;
    margin-left: 1em;
}

.inv-entry > .chevron {
    position: absolute;
    right: 1em;
}

.inv-entry:hover {
    background-color: var(--clr-bg-red);
}

.inv-entry:active {
    background-color: var(--clr-bg-red-active);
}
</style>