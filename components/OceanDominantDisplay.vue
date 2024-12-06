<template>
    sea dominant
    <UButton v-for="organ in props.Organs" class="fit" color="gray" variant="solid" :label="organ.name" @click="myOpenSeaModal(organ)"/>
    <slot />
</template>
  
  
  <script setup lang="ts">
  
  import '~/assets/css/game.scss'
  import '~/assets/css/bootstrapWish.scss'
  import { defineProps } from 'vue';
  
  
  const props = defineProps({
    Organs : Array<any>,
      OpenSeaModal: Function,
      
    })
  
  function myOpenSeaModal(organ : any){
    if (props.OpenSeaModal){
      props.OpenSeaModal(organ)
    }
  }
  
  
  </script>
  