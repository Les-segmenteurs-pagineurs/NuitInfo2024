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