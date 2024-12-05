<template>
  
  <div class="main">
    <div class="left-side">
      
      <div class="corner-pic">
        <slot />
      </div>
      <div>
        <ul>
          <li>stat</li>
          <li>stat</li>
          <li>stat</li>
        </ul>
      </div>
    </div>
    <div class="w-100 h-100 right-side">
      content
    </div>
  </div>
  



</template>


<script setup lang="ts">
import '~/assets/css/game.scss'
import '~/assets/css/bootstrapWish.scss'

</script>
