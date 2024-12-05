<template>
  <div class="p-4">
    <NuxtLink to="/pokedex" class="retro-button mb-8 inline-block">
      Back to List
    </NuxtLink>

    <div v-if="loading" class="text-center">Loading...</div>
    <div v-else-if="pokemon" class="pokemon-detail">
      <h1 class="text-xl mb-4 text-center">{{ formattedName }}</h1>

      <div class="text-center mb-8">
        <img :src="pokemon.sprites.front_default" :alt="pokemon.name" class="mx-auto"
          style="width: 200px; height: 200px; image-rendering: pixelated;">
      </div>

      <div class="mb-6">
        <div class="mb-2">Types:</div>
        <div class="flex gap-2">
          <span v-for="type in pokemon.types" :key="type.type.name" class="px-3 py-1 bg-red-600 rounded">
            {{ type.type.name }}
          </span>
        </div>
      </div>

      <div class="grid grid-cols-2 gap-4 mb-6">
        <div>Height: {{ pokemon.height / 10 }}m</div>
        <div>Weight: {{ pokemon.weight / 10 }}kg</div>
      </div>

      <StatsDisplay :stats="formattedStats" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { usePokeAPI } from '@/composables/usePokeAPI';
const route = useRoute();
const { getPokemonByName } = usePokeAPI();

const loading = ref(true);
const pokemon = ref(null);

const formattedName = computed(() => {
  if (!pokemon.value) return '';
  return pokemon.value.name.charAt(0).toUpperCase() + pokemon.value.name.slice(1);
});

const formattedStats = computed(() => {
  if (!pokemon.value) return [];
  return pokemon.value.stats.map(stat => ({
    name: stat.stat.name,
    value: stat.base_stat
  }));
});

onMounted(async () => {
  const name = route.params.name as string;
  pokemon.value = await getPokemonByName(name);
  loading.value = false;
});
</script>


<style scoped>
@keyframes scanline {
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(100vh);
  }
}

@keyframes flicker {
  0% { opacity: 0.9; }
  5% { opacity: 0.8; }
  10% { opacity: 0.9; }
  15% { opacity: 0.85; }
  20% { opacity: 0.9; }
}

body {
  font-family: 'Press Start 2P', cursive;

  margin: 0;
  padding: 0;
}

.retro-container {
  position: relative;
  overflow: hidden;
  min-height: 100vh;
}

.retro-container::before {
  content: '';
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: repeating-linear-gradient(
      0deg,
      rgba(0, 0, 0, 0.15),
      rgba(0, 0, 0, 0.15) 1px,
      transparent 1px,
      transparent 2px
  );
  pointer-events: none;
  animation: flicker 0.3s infinite;
}

.retro-container::after {
  content: '';
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 2px;
  background: rgba(255, 255, 255, 0.1);
  animation: scanline 6s linear infinite;
  pointer-events: none;
}

.retro-button {
  background-color: #ff0000;
  border: 3px solid #ffffff;
  color: #ffffff;
  padding: 15px 30px;
  font-family: 'Press Start 2P', cursive;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
  text-transform: uppercase;
  box-shadow: 0 0 10px rgba(255, 0, 0, 0.5);
}

.retro-button:hover {
  background-color: #ffffff;
  color: #ff0000;
  box-shadow: 0 0 20px rgba(255, 0, 0, 0.8);
}

.pokemon-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
  padding: 20px;
}

.pokemon-card {
  border: 4px solid #ff0000;
  padding: 15px;
  text-align: center;
  transition: all 0.3s ease;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.pokemon-card:hover {
  transform: scale(1.05);
  box-shadow: 0 0 15px rgba(255, 0, 0, 0.6);
}

.pokemon-card img {
  image-rendering: pixelated;
  width: 120px;
  height: 120px;
}

.pokemon-card .name {
  margin-top: 10px;
  font-size: 12px;
  color: #ffffff;
  text-transform: uppercase;
}

.pokemon-detail {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background-color: #111;
  border: 4px solid #ff0000;
  box-shadow: 0 0 20px rgba(255, 0, 0, 0.4);
}

.stat-bar {
  background-color: #333;
  height: 20px;
  margin: 5px 0;
  position: relative;
}

.stat-bar-fill {
  background-color: #ff0000;
  height: 100%;
  transition: width 1s ease-in-out;
}
</style>