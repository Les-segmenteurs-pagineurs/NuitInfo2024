

<template>
  <div class="main">
    <div class="left-side">
      <div class="corner-pic">
        <img
          src="../assets/img/backgroundHumanScreen.svg"
          alt="Background Ocean"
          class="background-human"
        />
        <slot />
      </div>
    </div>
    <div class="right-side">
      <div class="imgbg"></div>
      <div class="ocean-icons">
        <img src="../assets/img/fishes.svg" alt="Fish Icon" class="fishes hovereffect" @click="myOpenSeaModal('Poisson')"/>
        <img src="../assets/img/algae.svg" alt="Algae Icon" class="algae hovereffect" @click="myOpenSeaModal('Algues')" />
        <img src="../assets/img/corals.svg" alt="Corals Icon" class="corals hovereffect"  @click="myOpenSeaModal('Coraux')"/>
        <img
          src="../assets/img/seaCurrents.svg"
          alt="Sea Currents Icon"
          class="sea-currents hovereffect"
          @click="myOpenSeaModal('Courant marin')"
        />
      </div>
    </div>
  </div>

</template>

<script setup lang="ts">
  
import 'assets/css/game.css'
import 'assets/css/bootstrapWish.css'
import { defineProps } from 'vue';


const props = defineProps({
  Organs : Array<any>,
  OpenSeaModal: Function,
    
  })

function myOpenSeaModal(nameOrgan : string){
  if(props.Organs){
    const index = props.Organs.findIndex((o) => o.name == nameOrgan)
    if (props.OpenSeaModal){
      props.OpenSeaModal(props.Organs[index])
    }
  }

}

</script>

<style lang="css" scoped>
.stats {
  margin-top: 0.5rem;
}

.main {
  height: 100vh;
  width: 100vw;
  position: relative;
}

.background-ocean {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  bottom: 0;
  background-size: 100% 100%;
}

.background-human {
  background-color: white;
  width: 100%;
  position: absolute;
  bottom: 0;
  padding: 1rem;
  height: 100%;
  object-fit: contain;
  border-radius: 2.5rem;
}

.left-side {
  position: absolute;
  top: 0;
  left: 0;
  width: 23vw;
  height: 100%;
  display: flex;
  flex-direction: column;
  z-index: 2;
}

.corner-pic {
  position: relative;
  height: 35vh;
  width: 100%;
  border-bottom-right-radius: 1rem;
}

.sw-btn {
  position: absolute;
  left: 21.5vw;
  top: 25vh;
}

.right-side {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: start;
  align-items: end;
}

.imgbg {
  background-image: url("../assets/img/backgroundOcean.svg");
  background-repeat: no-repeat;
  height: 80%;
  width: 100%;
}

.fishes {
  position: absolute;
  left: 70rem;
  bottom: 20rem;
}

.algae {
  position: absolute;
  bottom: 4rem;
  left: 38rem;
}

.corals {
  position: absolute;
  left: 90rem;
  bottom: 7rem;
}

.sea-currents {
  position: absolute;
  left: 85%;
  bottom: 35rem;
}

.hovereffect{
  border-radius: 5%;
}
.hovereffect:hover{
  -webkit-box-shadow: 0px 0px 26px -1px rgba(0, 0, 0, 0.89); 
  box-shadow: 0px 0px 26px -1px rgba(0, 0, 0, 0.89);
}
</style>
