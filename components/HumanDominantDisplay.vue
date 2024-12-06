
<template>
  <div class="main">
    <div class="left-side">
      <div class="corner-pic">
        <img
          src="../assets/img/backgroundOceanScreen.svg"
          alt="Background Ocean"
          class="background-ocean"
        />
        <slot />
      </div>
    </div>
    <div class="h-100 right-side">
      <img
        src="../assets/img/backgroundHuman.svg"
        alt="Background Ocean"
        class="background-human"
      />
      <div class="human-icons">
        <img src="../assets/img/hearth.svg" alt="Hearth Icon" class="hearth hovereffect" />
        <img src="../assets/img/kidneys.svg" alt="Kidney Icon" class="kidney hovereffect" />
        <img src="../assets/img/liver.svg" alt="liver Icon" class="liver hovereffect" />
        <img src="../assets/img/lungs.svg" alt="lungs Icon" class="lungs hovereffect" />
      </div>
    </div>
  </div>
  <UButton v-for="organ in props.Organs" class="fit" color="gray" variant="solid" :label="organ.name" @click="myOpenHumanModal(organ)"/>
</template>

<script setup lang="ts">

import 'assets/css/game.css'
import 'assets/css/bootstrapWish.css'

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
<style lang="css" scoped>
.stats {
  margin-top: 0.5rem;
}

.background-ocean {
  position: absolute;
  bottom: 0;
  padding: 1rem;
  height: 100%;
  object-fit: cover;
  border-radius: 2.5rem;
  background-color: white;
}

.background-human {
  bottom: 0;
  padding: 1rem;
  height: 100%;
  object-fit: contain;
}

.main {
  display: flex;
  height: 100%;
  position: relative;
}

.left-side {
  position: absolute;
  width: 23vw;
  height: 100%;
  display: flex;
  z-index: 2;
  flex-direction: column;
}

.corner-pic {
  position: relative;
  height: 35vh;
  width: 23vw;
  border-bottom-right-radius: 1rem;
}

.sw-btn {
  position: absolute;
  left: 21.5vw;
  top: 25vh;
}

.right-side {
  width: 80%;
  left: 20%;
  position: relative;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.human-icons {
  position: absolute;
}

.hearth {
  position: absolute;
  top: -10vh;
  left: 5vw;
  width: 10vw;
}

.kidney {
  position: absolute;
  top: 30vh;
  left: 8vw;
  width: 10vw;
}

.liver {
  position: absolute;
  top: 30vh;
  left: -7vw;
  width: 10vw;
}

.hovereffect{
  border-radius: 50%;
}
.hovereffect:hover{
  -webkit-box-shadow: 0px 0px 26px -1px rgba(255, 255, 255, 0.89); 
  box-shadow: 0px 0px 26px -1px rgba(255, 255, 255, 0.89);
}
</style>
