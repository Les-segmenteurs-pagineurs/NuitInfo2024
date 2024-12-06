<template>

  
  <div v-if="humanDisplay" class="h-100 w-100">
    <HumanDominantDisplay :OpenHumanModal="OpenHumanModal" :Organs="humanOrgans">
      <div class="h-100 w-100">
        <UButton
          square
          class="fit sw-btn"
          color="gray"
          variant="solid"
          icon="i-heroicons-arrows-right-left"
          @click="humanDisplay = !humanDisplay"
        />
      </div>
    </HumanDominantDisplay>
  </div>

  <div v-else class="h-100 w-100">
    <OceanDominantDisplay        
        :OpenSeaModal="OpenSeaModal"
        :Organs="seaOrgans"
        >
      <UButton
        square
        class="fit sw-btn"
        color="gray"
        variant="solid"
        icon="i-heroicons-arrows-right-left"
        @click="humanDisplay = !humanDisplay"
      />
    </OceanDominantDisplay>
  </div>

  <UModal v-for="item in humanOrgans" :key="item.id" v-model="item.modalOpen">
        <div class="flex-col">
            <UButton square class="fit m1" color="green" :label="item.answer_a" @click="human_a_clicked(item)"/>
            <UButton square class="fit m1" color="red" :label="item.answer_b"  @click="human_b_clicked(item)"/>
        </div>
    </UModal>

    <UModal v-for="item in seaOrgans" :key="item.id" v-model="item.modalOpen">
        <div class="flex-col">
            <UButton square class="fit m1" color="green" :label="item.answer_a" @click="sea_a_clicked(item)"/>
            <UButton square class="fit m1" color="red" :label="item.answer_b"  @click="sea_b_clicked(item)"/>
        </div>
    </UModal>
</template>

<script setup lang="ts">





import "~/assets/css/bootstrapWish.scss"
import { ref } from 'vue'
import HumanDominantDisplay from '~/components/HumanDominantDisplay.vue';

let humanDisplay = ref(true)


let humanOrgans = reactive(await $fetch("/api/humanorgan"))

let seaOrgans = reactive(await $fetch("/api/seaorgan"))




function OpenHumanModal(organ: any) {
    organ.modalOpen = true
}

function human_a_clicked(organ : any){
    alert(`${organ.answer_a_message} money : ${organ.answer_a_money} health : ${organ.answer_a_health}`)
}
function human_b_clicked(organ : any){
    alert(`${organ.answer_b_message} money : ${organ.answer_b_money} health : ${organ.answer_b_health}`)
}


function OpenSeaModal(organ: any) {
    organ.modalOpen = true
}

function sea_a_clicked(organ : any){
    alert(`${organ.yes_message} money : ${organ.yes_money} health : ${organ.yes_health}`)
}
function sea_b_clicked(organ : any){
    alert(`${organ.no_message} money : ${organ.no_money} health : ${organ.no_health}`)
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
.sw-btn {
  position: absolute;
  left: 21.5vw;
  top: 25vh;
}
</style>
