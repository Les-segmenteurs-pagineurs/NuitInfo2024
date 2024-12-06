<template>
  human dominant
  <UButton v-for="organ in props.Organs" class="fit" color="gray" variant="solid" :label="organ.name" @click="myOpenHumanModal(organ)"/>
  <slot />
  
</template>


<script setup lang="ts">

import '~/assets/css/game.scss'
import '~/assets/css/bootstrapWish.scss'
import { defineProps } from 'vue';


const props = defineProps({
  Organs : Array<any>,
  OpenHumanModal: Function,

  })

function myOpenHumanModal(organ : any){
  if (props.OpenHumanModal){
    props.OpenHumanModal(organ)
  }
}


</script>
