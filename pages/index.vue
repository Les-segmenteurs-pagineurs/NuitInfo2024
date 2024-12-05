<script setup lang="ts">
const toast = useToast()
</script>

<template>
  <div class="circle-div bg-gradient-to-r from-slate-900 to-transparent">
    <h1 class="title">Un site par les Segmenteurs Pagineurs</h1>
  </div>
</template>

<style scoped>
  .circle-div{
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    width: 50rem;
    height: 50rem;
  }
  .title{
    font-size: xx-large;
    font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif
  }
</style>