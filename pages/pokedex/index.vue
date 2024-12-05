<template>
  <div class="p-4 retro-container">
    <h1 class="text-xl mb-8 text-center">Pokédex</h1>
    <div v-if="loading" class="text-center">Loading...</div>
    <div v-else class="carousel-container">
      <button class="retro-button" @click="previousPokemon">↑</button>
      <div class="pokemon-display">
        <PokemonCard :pokemon="pokemonList[currentIndex]" />
      </div>
      <button class="retro-button" @click="nextPokemon">↓</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { usePokeAPI } from '@/composables/usePokeAPI';
import PokemonCard from '@/components/pokemon/PokemonCard.vue';

const { getFirstGeneration } = usePokeAPI();
const loading = ref(true);
const pokemonList = ref([]);
const currentIndex = ref(0);

onMounted(async () => {
  pokemonList.value = await getFirstGeneration();
  loading.value = false;
});

const nextPokemon = () => {
  if (currentIndex.value < pokemonList.value.length - 1) {
    currentIndex.value++;
  } else {
    currentIndex.value = 0; // Retour au début si on dépasse la fin.
  }
};

const previousPokemon = () => {
  if (currentIndex.value > 0) {
    currentIndex.value--;
  } else {
    currentIndex.value = pokemonList.value.length - 1; // Aller à la fin si on remonte depuis le début.
  }
};
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

 .carousel-container {
   display: flex;
   flex-direction: column;
   align-items: center;
   gap: 20px;
 }

.pokemon-display {
  width: 200px;
  height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  border: 4px solid #ff0000;
  overflow: hidden;
  background: rgba(0, 0, 0, 0.8);
  box-shadow: 0 0 10px rgba(255, 0, 0, 0.5);
}

.pokemon-display img {
  image-rendering: pixelated;
  max-width: 100%;
  max-height: 100%;
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