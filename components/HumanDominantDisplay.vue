<template>
    

  <UButton v-for="organ in props.Organs" class="fit" color="gray" variant="solid" :label="organ.name" @click="myOpenHumanModal(organ)"/>
  
    <!-- <UButton class="fit" color="gray" variant="solid" label="Heart" @click="myOpenHeartModal"/>
    <UButton class="fit" color="gray" variant="solid" label="Liver" @click="myOpenLiverModal"/>
    <UButton class="fit" color="gray" variant="solid" label="Lungs" @click="myOpenLungsModal"/>
    <UButton class="fit" color="gray" variant="solid" label="Reins" @click="myOpenReinsModal"/> -->

  
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
