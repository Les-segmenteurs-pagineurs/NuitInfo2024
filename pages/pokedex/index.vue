<template>
  <div class="pokedex-container" @keydown="handleKeydown" tabindex="0">
    <div class="scanline"></div> <!-- Trait animé -->
    <div class="pokedex-left">
      <h1 class="title">Pokédex National</h1>
      <div class="pokemon-list rounded-2xl" ref="pokemonListContainer">
        <div v-for="(pokemon, index) in pokemonList" :key="pokemon.name"
          :class="['pokemon-item', { active: index === currentIndex }]" @click="selectPokemon(index)">
          <div class="pokemon-number">{{ formatNumber(index + 1) }}</div>
          <div class="pokemon-name pl-4">{{ pokemon.nameFR }}</div>
        </div>
      </div>
      <div class="flex mt-2 flex-col text-xl">
        <div>
          <p class="pr-2">Utilisez les touches
            <UKbd>↑</UKbd>
            <UKbd class="ml-2">↓</UKbd>
            pour naviguer.
          </p>
        </div>
        <div>
          Ou <UKbd class="ml-2">←</UKbd>
          <UKbd class="ml-2">→</UKbd> pour sauter de 10 en 10.
        </div>
      </div>
    </div>
    <ULink class="pokedex-right" :to="`/pokedex/${pokemonList[currentIndex]?.name}`">
      <div class="pokemon-details">
        <div class="text-center mb-8">
          <div ref="qrCodeContainer"></div>
        </div>
        <h2 class="pokemon-name-detail">{{ pokemonList[currentIndex]?.nameFR }}</h2>
      </div>
    </ULink>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue';
import { usePokeAPI } from '@/composables/usePokeAPI';
import urlsPokemons from '@/assets/urls_pokemons.json';
import QRCodeStyling from 'qr-code-styling';

const { getFirstGeneration, getPokemonSpeciesByName } = usePokeAPI();
const loading = ref(true);
const pokemonList = ref([]);
const currentIndex = ref(0);
const pokemonListContainer = ref(null);
const qrCodeContainer = ref<HTMLDivElement | null>(null);

onMounted(async () => {
  const data = await getFirstGeneration();
  pokemonList.value = await Promise.all(
    data.map(async (pokemon, index) => {
      const species = await getPokemonSpeciesByName(pokemon.name);
      const frenchNameObject = species.names.find(name => name.language.name === 'fr');
      const frenchName = frenchNameObject ? frenchNameObject.name : pokemon.name;

      return {
        ...pokemon,
        nameFR: frenchName,
        image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index + 1}.png`,
      };
    })
  );

  loading.value = false;
  await nextTick();
  generateCustomQRCode();
});

const selectPokemon = (index) => {
  currentIndex.value = index;
  generateCustomQRCode();
  updateScrollPosition();
};

const formatNumber = (num) => {
  return num.toString().padStart(3, '0');
};

const updateScrollPosition = () => {
  const container = pokemonListContainer.value;
  if (!container) return;

  const activeItem = container.children[currentIndex.value];
  if (activeItem) {
    activeItem.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
    });
  }
};

const handleKeydown = (event) => {
  if (event.key === 'ArrowDown') {
    if (currentIndex.value < pokemonList.value.length - 1) {
      currentIndex.value++;
      updateScrollPosition();
    }
  } else if (event.key === 'ArrowUp') {
    if (currentIndex.value > 0) {
      currentIndex.value--;
      updateScrollPosition();
    }
  } else if (event.key === 'ArrowRight') {
    const newIndex = Math.min(currentIndex.value + 10, pokemonList.value.length - 1);
    currentIndex.value = newIndex;
    updateScrollPosition();
  } else if (event.key === 'ArrowLeft') {
    const newIndex = Math.max(currentIndex.value - 10, 0);
    currentIndex.value = newIndex;
    updateScrollPosition();
  }
  generateCustomQRCode();
};

const getPokemonUrl = (pokemonName) => {
  for (const issue in urlsPokemons.pokemon_issues) {
    if (urlsPokemons.pokemon_issues[issue].pokemons.includes(pokemonName)) {
      return urlsPokemons.pokemon_issues[issue].url;
    }
  }
  return null;
};

const generateCustomQRCode = async () => {
  const pokemon = pokemonList.value[currentIndex.value];
  if (qrCodeContainer.value && pokemon) {
    const pokemonUrl = getPokemonUrl(pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1));
    const routeUrl = `${window.location.origin}/pokedex/${pokemon.name}`;

    const species = await getPokemonSpeciesByName(pokemon.name);
    let primaryColor = species ? species.color.name : '#ffffff';

    if (primaryColor == 'white') {
      primaryColor = 'black';
    }

    const isMobile = window.innerWidth < 768;
    const qrSize = isMobile ? 300 : 500;

    const qrCode = new QRCodeStyling({
      width: qrSize,
      height: qrSize,
      data: routeUrl,
      image: pokemon.image,
      dotsOptions: {
        color: primaryColor,
        type: 'rounded',
      },
      backgroundOptions: {
        color: '#FFFFFF',
      },
      imageOptions: {
        crossOrigin: 'anonymous',
        margin: 0,
        scale: 1.0,
      },
      version: 3,
    });

    qrCodeContainer.value.innerHTML = '';

    qrCode.append(qrCodeContainer.value);
  }
};
</script>

<style scoped>
.pokedex-container {
  display: flex;
  flex-direction: row;
  min-height: 100vh;
  font-family: 'Press Start 2P', cursive;
  position: relative;
  overflow-x: hidden;
  outline: none;
}

.scanline {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 4px;
  background: rgba(255, 255, 255, 0.6);
  animation: scanline 6s linear infinite;
  z-index: 10;
  background: repeating-linear-gradient(0deg,
      rgba(0, 0, 0, 0.15),
      rgba(0, 0, 0, 0.15) 1px,
      transparent 1px,
      transparent 2px);
}

@keyframes scanline {
  0% {
    transform: translateY(0);
  }

  100% {
    transform: translateY(100vh);
  }
}

.pokedex-left {
  width: 60%;
  background-color: #f0c838;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 20px;
  z-index: 1;
  background: repeating-linear-gradient(180deg,
      #f0c838,
      #f0c838 2px,
      transparent 2px,
      transparent 3px);
}

.title {
  font-size: 1.5rem;
  text-align: center;
  margin-bottom: 20px;
  background: repeating-linear-gradient(180deg,
      #f8c080,
      #f8c080 2px,
      transparent 2px,
      transparent 3px);
  border-radius: 10px;
  padding: 10px;
  border: 4px solid #000;
  color: #fff;
  text-shadow: 2px 2px #000;
}

.pokemon-list {
  width: 100%;
  max-height: 80%;
  overflow-y: auto;
  border: 4px solid #000;
  padding: 10px;
  color: #000;
  background: #a0872c;
  -webkit-overflow-scrolling: touch;
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

.pokedex-right {
  width: 60%;
  background: repeating-linear-gradient(180deg,
      #6078A0,
      #6078A0 4px,
      transparent 4px,
      transparent 6px);
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

.pokemon-name-detail {
  font-size: 1.5rem;
  color: #fff;
  margin-top: 10px;
}

@media (max-width: 768px) {
  .pokedex-container {
    flex-direction: column;
  }

  .pokedex-left,
  .pokedex-right {
    width: 100%;
    padding: 10px;
    border: none;
  }

  .pokedex-right {
    border-top: 4px solid #000;
  }

  .pokemon-list {
    max-height: 50vh;
  }
}
</style>
