<template>
  <div class="account p-8 max-w-4xl mx-auto">
    <h1 class="text-4xl font-bold text-center mb-8">My Account</h1>

    <!-- User Details Section -->
    <div class="account-details bg-white shadow-md rounded-lg p-6 mb-8">
      <h2 class="text-2xl font-semibold mb-6">User Details</h2>
      <form @submit.prevent="updateUser" class="space-y-4">
        <div class="form-group">
          <label for="username" class="block text-gray-700 font-medium mb-2">Username:</label>
          <input
            v-model="user.username"
            id="username"
            type="text"
            class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring focus:ring-blue-500"
          />
        </div>
        <div class="form-group">
          <label for="email" class="block text-gray-700 font-medium mb-2">Email:</label>
          <input
            v-model="user.email"
            id="email"
            type="email"
            class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring focus:ring-blue-500"
          />
        </div>
        <div class="form-group">
          <label for="password" class="block text-gray-700 font-medium mb-2">Current Password:</label>
          <input
            v-model="user.password"
            id="password"
            type="password"
            class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring focus:ring-blue-500"
          />
        </div>
        <div class="form-group">
          <label for="newPassword" class="block text-gray-700 font-medium mb-2">New Password:</label>
          <input
            v-model="user.newPassword"
            id="newPassword"
            type="password"
            class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring focus:ring-blue-500"
          />
        </div>
        <button
          type="submit"
          class="w-full bg-blue-500 text-white font-medium py-2 rounded-lg hover:bg-blue-600 transition"
        >
          Save Changes
        </button>
      </form>
    </div>

    <!-- Skins Section -->
    <div class="skins-section">
      <h2 class="text-2xl font-semibold mb-6">Available Skins</h2>
      <div class="skins-list grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <div
          v-for="skin in skins"
          :key="skin.id"
          class="skin-item border rounded-lg p-4 text-center shadow-md hover:shadow-lg transition relative"
          :class="{ 'border-blue-500': skin.id === user.selectedSkin }"
        >
          <img
            :src="skin.image_url"
            :alt="skin.name"
            class="w-full h-32 object-cover rounded-md mb-4"
          />
          <p class="text-gray-700 font-medium mb-4">{{ skin.name }}</p>
          <button
            @click="selectSkin(skin.id)"
            class="bg-blue-500 text-white font-medium px-4 py-2 rounded-lg hover:bg-blue-600 transition"
          >
            Select Skin
          </button>
          <div
            v-if="skin.id === user.selectedSkin"
            class="absolute top-2 right-2 bg-blue-500 text-white text-xs px-2 py-1 rounded-full"
          >
            Selected
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";

export default {
  setup() {
    const router = useRouter(); // Déclare le routeur
    const token = useCookie('authToken').value; // Récupère le token du cookie
    const user = ref({
      username: "",
      email: "",
      password: "",
      newPassword: "",
      selectedSkin: null,
    });

    const skins = ref([]);

    // Fetch user data and skins
    const getUser = async () => {
      try {
        const response = await $fetch("/api/user/user_data");
        user.value.username = response.user.username;
        user.value.email = response.user.email;
        user.value.selectedSkin = response.user.selectedSkin || null;
        skins.value = response.user.skins || [];
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    // Select a skin
    const selectSkin = (skinId) => {
      if (user.value.selectedSkin !== skinId) {
        user.value.selectedSkin = skinId;
      }
    };

    // Update user details
    const updateUser = async () => {
      try {
        const response = await fetch("/api/user/user", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: user.value.username,
            email: user.value.email,
            password: user.value.password,
            newPassword: user.value.newPassword,
            selectedSkin: user.value.selectedSkin,
          }),
        });

        if (response.ok) {
          const data = await response.json();
          if (data.success) {
            console.log("User updated successfully:", data);
            alert("User details updated successfully!");
          } else {
            console.error("Password verification failed:", data.message);
            alert(data.message || "Failed to update user details.");
          }
        } else {
          console.error("Error updating user details:", response.statusText);
          alert("Failed to update user details.");
        }
      } catch (error) {
        console.error("Error updating user details:", error);
      }
    };

    // Fetch user and skins on component mount
    onMounted(() => {
      if (!token) {
        router.push('/login'); // Redirige vers la page de login si le token n'existe pas
      } else {
        getUser(); // Appel de la fonction pour récupérer les données de l'utilisateur
      }
    });

    return {
      user,
      skins,
      selectSkin,
      updateUser,
    };
  },
};
</script>