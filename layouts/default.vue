<template>
  <div class="flex flex-col h-screen">
    <UHorizontalNavigation
      :links="links"
      class="border-b border-gray-200 dark:border-gray-800"
    />
    <slot />
    <div class="border-t border-gray-200 dark:border-gray-800 footer">
      <div class="container mx-auto py-2">
        <div class="text-center text-sm text-gray-500 dark:text-gray-400">
          © 2024 - Made with ❤️ by
          <UButton variant="ghost">
            <ULink to="https://github.com/Les-segmenteurs-pagineurs/NuitInfo2024">Les segmenteurs pagineurs</ULink>
          </UButton>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import "assets/css/bootstrapWish.css";

let isLogged = false;

let userLink = [];

if (isLogged) {
  userLink = [
    {
      label: "MyAccount",
      icon: "i-heroicons-user-circle",
    },
    {
      label: "Sign out",
      icon: "i-heroicons-arrow-left-end-on-rectangle",
    },
  ];
} else {
  userLink = [
    {
      label: "Login",
      icon: "i-heroicons-arrow-right-end-on-rectangle",
      to: "/login",
    },
    {
      label: "Sign In",
      icon: "i-heroicons-arrow-right-circle",
      to: "/signin",
    },
  ];
}

const links = [
  [
    {
      label: "Accueil",
      icon: "i-heroicons-home",
      to: "/",
    },
    {
      label: "Pokedex",
      icon: "i-heroicons-wallet",
      to: "/pokedex",
    },
    {
      label: "Podcasts",
      icon: "i-heroicons-microphone",
      to: "/podcast",
    },
  ],
  [...userLink],
];
</script>
