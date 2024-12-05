<script setup lang="ts">
import SwitchDominantScreen from "~/components/switchDominantScreen.vue";
</script>

<template>
  <div class="minor">
    <h1>Minor Ocean</h1>
    <p>Minor Ocean Page</p>
  </div>
  <div class="dominant">
    <h1>Human Dominant</h1>
    <p>Human Dominant Page</p>
  </div>
  <div><SwitchDominantScreen /></div>
</template>

<style>
.minor {
  background-color: red;
}

.dominant {
  background-color: blue;
}
</style>
