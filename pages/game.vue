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

  <UModal v-for="item in humanOrgans" :key="item.id" v-model="item.modalOpen" prevent-close>
    <UCard :ui="{ ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
      <template #header>
        <div class="flex items-center justify-between">
          <h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
            Quelle action choisissez-vous ?
          </h3>
          <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1" @click="item.modalOpen = false" />
        </div>
      </template>
      <div class="flex-col">
        <UButton square class="fit m1" color="green" :label="item.answer_a" @click="human_a_clicked(item)" />
        <UButton square class="fit m1" color="red" :label="item.answer_b" @click="human_b_clicked(item)" />
      </div>
    </UCard>
  </UModal>

  <UModal v-for="item in seaOrgans" :key="item.id" v-model="item.modalOpen" prevent-close>
    <UCard :ui="{ ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
      <template #header>
        <div class="flex items-center justify-between">
          <h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
            Quelle action choisissez-vous ?
          </h3>
          <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1" @click="item.modalOpen = false" />
        </div>
      </template>
      <div class="flex-col">
        <UButton square class="fit m1" color="green" :label="item.answer_a" @click="sea_a_clicked(item)" />
        <UButton square class="fit m1" color="red" :label="item.answer_b" @click="sea_b_clicked(item)" />
      </div>
    </UCard>
  </UModal>

  <UModal v-model="isMessageModalOpen" prevent-close>
    <UCard :ui="{ ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
      <template #header>
        <div class="flex items
        -center justify-between">
          <h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
            Message
          </h3>
          <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1" @click="check_stats" />
        </div>
      </template>
      <div class="flex-col">
        <p class="m1">{{ message }}</p>
      </div>
    </UCard>
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
  humanDisplay.value = !humanDisplay.value
  organ.modalOpen = false
  isMessageModalOpen.value = true
}
function human_b_clicked(organ: any) {
  set_stats(organ.answer_b_health, organ.answer_b_money)
  message = organ.answer_b_message
  humanDisplay.value = !humanDisplay.value
  organ.modalOpen = false
  isMessageModalOpen.value = true
}


function OpenSeaModal(organ: any) {
  organ.modalOpen = true
}

function sea_a_clicked(organ: any) {
  set_stats(organ.answer_a_health, organ.answer_a_money)
  message = organ.answer_a_message
  humanDisplay.value = !humanDisplay.value
  organ.modalOpen = false
  isMessageModalOpen.value = true

}
function sea_b_clicked(organ: any) {
  set_stats(organ.answer_b_health, organ.answer_b_money)
  message = organ.answer_b_message
  humanDisplay.value = !humanDisplay.value
  organ.modalOpen = false
  isMessageModalOpen.value = true
}

function check_stats() {
  isMessageModalOpen.value = false
  console.log(money.value)
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
