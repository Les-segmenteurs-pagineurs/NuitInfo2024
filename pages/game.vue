
<template>

    <div v-if="humanDisplay" class="h-100 w-100">
        <HumanDominantDisplay>
            <div class="h-100 w-100">
                <UButton square class="fit sw-btn" color="gray" variant="solid" icon="i-heroicons-arrows-right-left" @click="humanDisplay = !humanDisplay"/>
            </div>
        </HumanDominantDisplay>
    </div>

    <div v-else class="h-100 w-100"> 
        <OceanDominantDisplay>
            <UButton square class="fit sw-btn" color="gray" variant="solid" icon="i-heroicons-arrows-right-left" @click="humanDisplay = !humanDisplay"/>
        </OceanDominantDisplay>
    </div>



</template>


<script setup lang="ts">
import "~/assets/css/bootstrapWish.scss"
import {ref} from 'vue'
import HumanDominantDisplay from '~/components/HumanDominantDisplay.vue';

let humanDisplay = ref(true)

</script>

<style scoped>
    .fit{
        width: fit-content;
        height: fit-content;
    }

</style>
