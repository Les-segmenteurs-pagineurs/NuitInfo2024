<template>
  <div class="stats-container">
    <div v-for="stat in stats" :key="stat.name" class="stat-item">
      <div class="stat-name">{{ formatStatName(stat.name) }}</div>
      <div class="stat-bar">
        <div 
          class="stat-bar-fill" 
          :style="{ width: `${(stat.value / 255) * 100}%` }"
        ></div>
      </div>
      <div class="stat-value">{{ stat.value }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  stats: Array<{
    name: string;
    value: number;
  }>;
}>();

const formatStatName = (name: string) => {
  return name
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};
</script>

<style scoped>
.stats-container {
  margin: 20px 0;
}

.stat-item {
  margin: 10px 0;
}

.stat-name {
  font-size: 12px;
  margin-bottom: 5px;
}

.stat-value {
  font-size: 12px;
  text-align: right;
  margin-top: 5px;
}
</style>