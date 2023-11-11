<template>
  <NavFrame>
    <template v-slot:invs>
      <h1>Your Inventories</h1>
      <p>Where your crew stashes loot, guns, and chrome.</p>
      <br />
      
      <InventoryGrid />
    </template>
    <template v-slot:arch>
      <h1>NET Architectures</h1>
      <p>Virtual worlds for 'runners to explore.</p>
    </template>
    <template v-slot:acct>
      <h1>Account</h1>
      <p>Your detes.</p>
    </template>
  </NavFrame>
</template>

<script setup>
import InventoryGrid from "./ui/inventories/inventoryGrid.vue";
import NavFrame from "./ui/nav_frame.vue";

useHead({
  script: [
    {
      //FontAwesome solid and regular kit
      src: "https://kit.fontawesome.com/8ee48232fe.js",
      crossorigin: "anonymous"
    }
  ]
})
</script>

<style>
body { 
  height: 100vh;
  background: rgb(0,22,20);
  background: linear-gradient(0deg, rgb(0, 14, 12) 0%, #27080f 100%);
}
</style>