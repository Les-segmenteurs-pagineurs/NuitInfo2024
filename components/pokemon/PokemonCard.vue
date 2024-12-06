<template>
  <NuxtLink :to="`/pokedex/${pokemon.name}`" class="">
    <img :src="imageUrl" :alt="pokemon.name">
    <div class="name">#{{ formattedId }} {{ formattedName }}</div>
  </NuxtLink>
</template>

<script setup lang="ts">
const props = defineProps<{
  pokemon: {
    name: string;
    url: string;
  }
}>();

const id = computed(() => {
  const matches = props.pokemon.url.match(/\/(\d+)\/$/);
  return matches ? matches[1] : '0';
});

const formattedId = computed(() => {
  return id.value.replace(/^0+/, '');
});

const imageUrl = computed(() => {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${formattedId.value}.png`;
});

const formattedName = computed(() =>
  props.pokemon.name.charAt(0).toUpperCase() + props.pokemon.name.slice(1)
);
</script>