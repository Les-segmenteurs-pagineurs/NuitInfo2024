<template>


  <div v-if="humanDisplay" class="h-100 w-100">
    <HumanDominantDisplay :OpenHumanModal="OpenHumanModal" :Organs="humanOrgans">
      <div class="h-100 w-100">
        <UButton square class="fit sw-btn" color="gray" variant="solid" icon="i-heroicons-arrows-right-left"
          @click="humanDisplay = !humanDisplay" />
        <div class="display-corner">
          <div class="m1">
            Santé
            <UMeter :value="health" />
          </div>
          <div class="m1">
            Argent
            <UMeter :value="money" />
          </div>
        </div>
      </div>


    </HumanDominantDisplay>
  </div>

  <div v-else class="h-100 w-100">
    <OceanDominantDisplay :OpenSeaModal="OpenSeaModal" :Organs="seaOrgans">
      <div class="h-100 w-100">
        <UButton square class="fit sw-btn" color="gray" variant="solid" icon="i-heroicons-arrows-right-left"
          @click="humanDisplay = !humanDisplay" />
        <div class="display-corner">
          <div class="m1">
            Santé
            <UMeter :value="health" />
          </div>
          <div class="m1">
            Argent
            <UMeter :value="money" />
          </div>
        </div>
      </div>
    </OceanDominantDisplay>
  </div>

  <UModal v-for="item in humanOrgans" :key="item.id" v-model="item.modalOpen">
    <div class="flex-col">
      <UButton square class="fit m1" color="green" :label="item.answer_a" @click="human_a_clicked(item)" />
      <UButton square class="fit m1" color="red" :label="item.answer_b" @click="human_b_clicked(item)" />
    </div>
  </UModal>

  <UModal v-for="item in seaOrgans" :key="item.id" v-model="item.modalOpen">
    <div class="flex-col">
      <UButton square class="fit m1" color="green" :label="item.answer_a" @click="sea_a_clicked(item)" />
      <UButton square class="fit m1" color="red" :label="item.answer_b" @click="sea_b_clicked(item)" />
    </div>
  </UModal>

  <UModal v-model="isMessageModalOpen">
    <div class="flex-col m2">
      <h1>{{ message }}</h1>
    </div>
  </UModal>




</template>

<script setup lang="ts">





import "assets/css/bootstrapWish.css"
import { ref } from 'vue'
import HumanDominantDisplay from '~/components/HumanDominantDisplay.vue';

let humanDisplay = ref(true)


let humanOrgans = reactive(await $fetch("/api/humanorgan"))

let seaOrgans = reactive(await $fetch("/api/seaorgan"))

let health = ref(50)
let money = ref(50) 
let message = ref("")

let isMessageModalOpen = ref(false)

function OpenHumanModal(organ: any) {
  organ.modalOpen = true
}

function set_stats(health_modifier: number, money_modifier: number) {
  health.value += health_modifier
  money.value += money_modifier
}

function human_a_clicked(organ: any) {
  set_stats(organ.answer_a_health, organ.answer_a_money)
  message = organ.answer_a_message
  organ.modalOpen = false
  isMessageModalOpen.value = true
}
function human_b_clicked(organ: any) {
  set_stats(organ.answer_b_health, organ.answer_b_money)
  message = organ.answer_b_message
  organ.modalOpen = false
  isMessageModalOpen.value = true
}


function OpenSeaModal(organ: any) {
  organ.modalOpen = true
}

function sea_a_clicked(organ: any) {
  set_stats(organ.answer_a_health, organ.answer_a_money)
  message = organ.answer_a_message
  organ.modalOpen = false
  isMessageModalOpen.value = true

}
function sea_b_clicked(organ: any) {
  set_stats(organ.answer_b_health, organ.answer_b_money)
  message = organ.answer_b_message
  organ.modalOpen = false
  isMessageModalOpen.value = true
}


</script>

<style scoped>
.fit {
  width: fit-content;
  height: fit-content;
}

.flex-col {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

.m1 {
  margin: 0.5rem;
}
.m2 {
  margin: 1rem;
}

.sw-btn {
  position: absolute;
  left: 21.5vw;
  top: 25vh;
}

.display-corner {
  position: relative;
  left: 100%;
}
</style>
