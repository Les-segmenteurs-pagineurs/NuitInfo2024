<script setup lang="ts"></script>

<template>
  <h1>home page</h1>
  <ULink to="/pokedex">Pokedex</ULink>
  <div class="full-div">
    <div
      class="flex flex-col circle-div bg-gradient-to-r from-transparent via-slate-900 to-transparent"
    >
      <h1 class="title">Les Segmenteurs pagineurs vous proposent...</h1>
      <button
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-32"
      >
        <NuxtLink to="/game" class="btn btn-primary"> Découvrir </NuxtLink>
      </button>
    </div>
  </div>
</template>

<style scoped>
.circle-div {
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  width: 50rem;
  height: 50rem;
}
.title {
  font-size: xx-large;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
}
.full-div {
  display: flex;
  flex-direction: row;
  flex: 1;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
}
</style>
