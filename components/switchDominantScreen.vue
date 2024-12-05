<script setup lang="ts">
import { useRoute } from "#app";

const page = useRoute();
const actualPage = page.name;
let nextPage = "";

if (actualPage === "humanDominant") {
  nextPage = "oceanDominant";
} else {
  nextPage = "humanDominant";
}
</script>

<template>
  <button>
    <NuxtLink :to="`/${nextPage}`">
      <Icon name="i-heroicons-arrows-right-left" style="color: white" />
    </NuxtLink>
  </button>
</template>

<style lang="css" scoped></style>
