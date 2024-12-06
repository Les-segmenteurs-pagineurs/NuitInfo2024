<template>

    <div v-if="humanDisplay" class="h-100 w-100">
        <HumanDominantDisplay :OpenHumanModal="OpenHumanModal" :Organs="humanOrgans"
            >
            <div class="h-100 w-100">
                <UButton square class="fit sw-btn" color="gray" variant="solid" icon="i-heroicons-arrows-right-left"
                    @click="humanDisplay = !humanDisplay" />
            </div>
        </HumanDominantDisplay>
    </div>

    <div v-else class="h-100 w-100">
        <OceanDominantDisplay>
            <UButton square class="fit sw-btn" color="gray" variant="solid" icon="i-heroicons-arrows-right-left"
                @click="humanDisplay = !humanDisplay" />
        </OceanDominantDisplay>
    </div>



    <div v-for="item in humanOrgans">
        {{ item }}
    </div>
    <UModal v-for="item in humanOrgans" :key="item.id" v-model="item.modalOpen">
        <div class="flex-col">
            <h1>{{ item.question }}</h1>
            <UButton square class="fit m1" color="green" :label="item.answer_a" @click="human_a_clicked(item)"/>
            <UButton square class="fit m1" color="red" :label="item.answer_b"  @click="human_b_clicked(item)"/>
        </div>
    </UModal>



</template>


<script setup lang="ts">





import "~/assets/css/bootstrapWish.scss"
import { ref } from 'vue'
import HumanDominantDisplay from '~/components/HumanDominantDisplay.vue';

let humanDisplay = ref(true)

const isHeartAnswered = ref(false)
const isLungsAnswered = ref(false)
const isReinsAnswered = ref(false)
const isLiverAnswered = ref(false)

const assocNameToref = reactive({})


let humanOrgans = reactive(await $fetch("/api/humanorgan"))

// humanOrgans.map((o) => o.modalOpen = ref(false))

console.log(humanOrgans)


function OpenHumanModal(organ: any) {
    organ.modalOpen = true
}

function human_a_clicked(organ : any){
    alert(`${organ.yes_message} money : ${organ.yes_money} health : ${organ.yes_health}`)
}
function human_b_clicked(organ : any){
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
</style>
