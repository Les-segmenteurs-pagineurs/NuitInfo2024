<template>
  <div class="p-4 min-h-screen max-w-screen-lg mx-auto">
    <div v-if="loading" class="text-center">Loading...</div>
    <div v-else-if="pokemon" class="pokemon-detail">
      <div class="flex flex-col items-center w-full">
        <NuxtLink to="/pokedex" class="retro-button mb-8 inline-block">
          Back to List
        </NuxtLink>

        <div class="scanline"></div> <!-- Trait animé -->
        <h1 class="text-2xl mb-4 text-center text-shadow">{{ pokemonNameFR }}</h1>

        <div class="text-center mb-8 w-full flex justify-center">
          <img :src="pokemon.sprites.front_default" :alt="image" class="mx-auto w-full max-w-lg"
            style="image-rendering: pixelated;">
        </div>

        <div class="m-auto w-full md:w-5/6">
          <p v-if="text" class="text-white text-xl text-shadow text-center">
            {{ text }}
          </p>
        </div>
        <div class="m-auto w-full md:w-5/6 mt-8">
          <h3 class="text-xl text-shadow mb-4">Source: </h3>
          <iframe v-if="url" :src="url" class="w-full" style="height: 800px; border: none;">
          </iframe>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import urlsPokemons from '@/assets/urls_pokemons.json';
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

const getPokemonUrl = (pokemonName) => {
  for (const issue in urlsPokemons.pokemon_issues) {
    if (urlsPokemons.pokemon_issues[issue].pokemons.includes(pokemonName)) {
      text = urlsPokemons.pokemon_issues[issue].text;
      url = urlsPokemons.pokemon_issues[issue].url;
      return { text, url };
    }
  }
  return null;
};

let issue: any = null;
let text: string | null = null;
let url: string | null = null;
let pokemonNameFR: string | null = null;

async function getPokemonnNameFR(pokemonName: string) {
  const species = await usePokeAPI().getPokemonSpeciesByName(pokemonName);
  const frenchNameObject = species.names.find(name => name.language.name === 'fr');
  return frenchNameObject ? frenchNameObject.name : pokemonName;
}

onMounted(async () => {
  const name = route.params.name as string;
  pokemon.value = await getPokemonByName(name);

  issue = getPokemonUrl(name.charAt(0).toUpperCase() + name.slice(1));
  if (issue) {
    text = issue.text;
    url = issue.url;
  }

  pokemonNameFR = await getPokemonnNameFR(name);
  loading.value = false;
});
</script>

<style scoped>
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

.pokemon-detail {
  font-family: 'Press Start 2P', cursive;
  position: relative;
  overflow-x: hidden;
  outline: none;
  background-color: #f0c838;
  z-index: 1;
  background: repeating-linear-gradient(180deg,
      #f0c838,
      #f0c838 2px,
      transparent 2px,
      transparent 3px);

  /* Par défaut en colonne, centrée */
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
}

.text-shadow {
  text-shadow: 2px 2px 4px #000000;
}
</style>
