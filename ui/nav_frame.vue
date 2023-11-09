<template>
    <div class="wrapper">
        <div class="topnav">
            <div>Inventories</div>
            <div>Architectures</div>
            <div>Account</div>
        </div>
        <div class="line red-box"></div>
        <div class="content-frame">

        </div>
    </div>
</template>

<script setup lang="ts">

</script>

<style>
.topnav {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    font-weight: bold;
}

.topnav > div {
    text-align: center;
    padding: 0.5em;
    font-size: larger;
}
</style>