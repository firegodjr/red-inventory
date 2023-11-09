<template>
  <NavFrame />
  <h1 class="text-3xl font-bol underline">HELLO TAILWIND!!!!</h1>
</template>

<script setup>
import NavFrame from "./ui/nav_frame.vue";
</script>

<style>
body { 
  height: 100vh;
  background: rgb(0,22,20);
  background: linear-gradient(0deg, rgb(0, 14, 12) 0%, #27080f 100%);

  text-shadow: 0 0 7px var(--clr-text-red);
  color: var(--clr-text-red);
}
</style>