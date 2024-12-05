<template>
  <div class="pokedex-container" @keydown="handleKeydown" tabindex="0">
    <div class="scanline"></div> <!-- Trait animé -->
    <div class="pokedex-left">
      <h1 class="title">Pokédex National</h1>
      <div class="pokemon-list rounded-2xl" ref="pokemonListContainer">
        <div
            v-for="(pokemon, index) in pokemonList"
            :key="pokemon.name"
            :class="['pokemon-item', { active: index === currentIndex }]"
            @click="selectPokemon(index)"
        >
          <div class="pokemon-number">{{ formatNumber(index + 1) }}</div>
          <div class="pokemon-name pl-4">{{ pokemon.name }}</div>
        </div>
      </div>
      <div class="flex mt-4">
        <p class="pr-2">Use the arrow keys to navigate the Pokédex.</p>
        <UKbd>↑</UKbd> <UKbd class="ml-2">↓</UKbd>
      </div>
    </div>
    <div class="pokedex-right">
      <div class="pokemon-details">
        <img
            v-if="pokemonList[currentIndex]?.image"
            :src="pokemonList[currentIndex]?.image"
            :alt="pokemonList[currentIndex]?.name"
            class="pokemon-image"
        />
        <h2 class="pokemon-name-detail">{{ pokemonList[currentIndex]?.name }}</h2>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { usePokeAPI } from '@/composables/usePokeAPI';

const { getFirstGeneration } = usePokeAPI();
const loading = ref(true);
const pokemonList = ref([]);
const currentIndex = ref(0);
const pokemonListContainer = ref(null);

onMounted(async () => {
  // Fetch Pokémon data
  const data = await getFirstGeneration();
  pokemonList.value = data.map((pokemon, index) => ({
    ...pokemon,
    image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index + 1}.png`, // Placeholder for Pokémon sprite
  }));
  loading.value = false;
});

const selectPokemon = (index) => {
  currentIndex.value = index;
  updateScrollPosition(); // Update scroll position when a Pokémon is selected
};

const formatNumber = (num) => {
  return num.toString().padStart(3, '0');
};

// Mettre à jour la position de la barre de défilement
const updateScrollPosition = () => {
  const container = pokemonListContainer.value;
  if (!container) return;

  const itemHeight = container.children[0]?.offsetHeight || 0; // Hauteur d'un élément dans la liste
  container.scrollTop = itemHeight * currentIndex.value - (container.offsetHeight / 2) + itemHeight / 2;
};

// Handler pour les flèches du clavier
const handleKeydown = (event) => {
  if (event.key === 'ArrowDown') {
    // Naviguer vers le Pokémon suivant
    if (currentIndex.value < pokemonList.value.length - 1) {
      currentIndex.value++;
      updateScrollPosition();
    }
  } else if (event.key === 'ArrowUp') {
    // Naviguer vers le Pokémon précédent
    if (currentIndex.value > 0) {
      currentIndex.value--;
      updateScrollPosition();
    }
  }
};
</script>

<style scoped>
/* Conteneur principal */
.pokedex-container {
  display: flex;
  flex-direction: row;
  height: 100vh;
  font-family: 'Press Start 2P', cursive;
  position: relative;
  overflow: hidden;
  outline: none; /* Pour éviter le contour bleu de focus sur le conteneur */
}

/* Trait animé */
.scanline {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 4px;
  background: rgba(255, 255, 255, 0.6);
  animation: scanline 6s linear infinite;
  z-index: 10;
  background: repeating-linear-gradient(
      0deg,
      rgba(0, 0, 0, 0.15),
      rgba(0, 0, 0, 0.15) 1px,
      transparent 1px,
      transparent 2px
  );
}

@keyframes scanline {
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(100vh);
  }
}

/* Partie gauche */
.pokedex-left {
  width: 40%;
  background-color: #f0c838;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 20px;
  z-index: 1;
  background: repeating-linear-gradient(
      180deg,
      #f0c838,
      #f0c838 1px,
      transparent 1px,
      transparent 2px
  );

}

.title {
  font-size: 1.5rem;
  text-align: center;
  margin-bottom: 20px;
  background: repeating-linear-gradient(
      180deg,
      #F8C080,
      #F8C080 1px,
      transparent 1px,
      transparent 2px
  );
  border-radius: 10px;
  padding: 10px;
  border: 4px solid #000;
  color: #fff;
  text-shadow: 2px 2px  #000;
}

.pokemon-list {
  width: 100%;
  max-height: 80%;
  overflow-y: auto;
  border: 4px solid #000;
  padding: 10px;
  color: #000;
  background: repeating-linear-gradient(
      180deg,
      #ffffff,
      #ffffff 1px,
      transparent 1px,
      transparent 2px
  );
}

.pokemon-item {
  display: flex;
  align-items: center;
  padding: 12px;
  margin: 6px 0;
  border-radius: 20px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s, color 0.3s;
  background-color: #fff;
  position: relative;
}

.pokemon-item.active {
  background-color: #ffa500;
  color: #fff;
  font-weight: bold;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  border: 2px solid #ff0000;
}

.pokemon-number {
  width: 40px;
  text-align: center;
  font-size: 1.1rem;
  color: #000;
}

.pokemon-name {
  flex-grow: 1;
  text-align: left;
  margin-left: 10px;
}

/* Partie droite */
.pokedex-right {
  width: 60%;
  background: repeating-linear-gradient(
      180deg,
      #6078A0,
      #6078A0 1px,
      transparent 1px,
      transparent 2px
  );
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
  border-left: 4px solid #000;
  z-index: 1;
}

.pokemon-details {
  text-align: center;
}

.pokemon-image {
  max-width: 80%;
  height: auto;
  margin-bottom: 20px;
}

.pokemon-name-detail {
  font-size: 1.5rem;
  color: #fff;
  margin-top: 10px;
}
</style>
