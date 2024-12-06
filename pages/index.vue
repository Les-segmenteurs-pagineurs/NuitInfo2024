<script setup lang="ts"></script>

<template>
  <div class="full-div">
    <div class="under-water"></div>
    <div class="human"></div>

    <div class="absolute bg-gradient-to-r from-transparent to-black"></div>

    <div
      class="asbolute flex flex-col circle-div bg-gradient-to-r from-transparent via-slate-900 to-transparent"
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
.under-water {
  width: 100%;
  height: 100%;
  background-image: url("../assets/img/backgroundUnderWaterHomePage.jpg");
  object-fit: contain;
  background-size: 100% 100%;
}
.human {
  width: 100%;
  height: 100%;
  background-image: url("../assets/img/backgroundHumanHomePage.jpg");
  background-repeat: no-repeat;
  object-fit: cover;
  background-size: 100% 100%;
}
.circle-div {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  width: 50%;
  height: 90%;
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
