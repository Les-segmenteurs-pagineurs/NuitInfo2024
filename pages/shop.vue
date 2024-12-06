<template>
  <UCard class="max-w-lg w-full">
    <template #header class="d-flex justify-content-center">
      <h2 class="text-xl font-bold text-indigo-600">Welcome to the Skin Shop</h2>
    </template>

    <div class="text-center mb-6">
      <p class="text-lg">Your Balance: <span class="font-bold text-green-500">${{ user.money }}</span></p>
    </div>

    <div class="space-y-6">
      <div v-for="skin in skins" :key="skin.id" class="p-4 bg-gray-100 rounded-lg shadow-lg hover:shadow-xl transition-all">
        <img :src="skin.image_url" :alt="skin.name" class="w-full h-40 object-cover rounded-t-lg" />
        <div class="mt-4">
          <h3 class="text-xl font-semibold text-gray-800">{{ skin.name }}</h3>
          <p class="font-bold text-lg text-gray-700 mb-4">${{ skin.price }}</p>
          <div v-if="skin.isPurchased">
            <p class="text-sm text-red-500 font-semibold">You already own this skin!</p>
          </div>
          <div v-else>
            <form @submit.prevent="onSubmit(skin.id)" class="space-y-4">
              <input name="skinId" type="hidden" :value="skin.id" />
              <button type="submit" class="w-full py-2 px-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all disabled:opacity-50">
                Buy Now
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </UCard>
</template>

<script setup lang="ts">
import { reactive, ref, onMounted } from "vue";

interface User {
  money: number;
}

interface Skin {
  id: string;
  name: string;
  price: number;
  image_url: string;
  isPurchased: boolean; // Ajout pour savoir si le skin est déjà acheté
}

// États utilisateur et skins
const user = ref<User>({ money: 0 });
const skins = ref<Skin[]>([]);

// Récupérer les données utilisateur
const fetchUserData = async () => {
  try {
    const response = await $fetch<{ user: User }>("/api/user/user_data");
    user.value.money = response.user.money;
  } catch (error) {
    console.error("Error fetching user data:", error);
  }
};

// Récupérer la liste des skins et vérifier si un skin est déjà acheté
const fetchSkins = async () => {
  try {
    const response = await $fetch<{ skins: Skin[] }>("/api/skin/skins");
    skins.value = response.skins.map(skin => ({
      ...skin,
      isPurchased: skin.isPurchased || false // Vérifier si le skin est déjà acheté
    }));
  } catch (error) {
    console.error("Error fetching skins:", error);
  }
};

// Soumettre une action pour acheter un skin
async function onSubmit(skinId: string) {
  try {
    const response = await $fetch('/api/user/buy_skin', {
      method: 'POST',
      body: { skinId }
    });

    // Mettre à jour la liste des skins pour marquer le skin comme acheté
    const updatedSkin = skins.value.find(skin => skin.id === skinId);
    if (updatedSkin) {
      updatedSkin.isPurchased = true;
    }
    // Optionnel : Mettre à jour le solde de l'utilisateur après l'achat
    user.value.money -= updatedSkin?.price || 0;

  } catch (error) {
    console.error("Error during purchase:", error);
  }
}

onMounted(() => {
  fetchUserData();
  fetchSkins();
});
</script>