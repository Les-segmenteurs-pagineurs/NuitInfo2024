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
  <div class="flex flex-col h-screen">
    <UHorizontalNavigation
      :links="links"
      class="border-b border-gray-200 dark:border-gray-800"
    />
    <slot />
    <div class="border-t border-gray-200 dark:border-gray-800 footer"></div>
  </div>
</template>

<script setup lang="ts">
import "assets/css/bootstrapWish.css";

// Utilisation du cookie d'authentification
const isLogged = useCookie("authToken").value;
let userLink: Array<{ label: string; icon: string; to?: string; onclick?: () => Promise<any> }> = [];

if (isLogged) {
  userLink = [
    {
      label: "Mon profil",
      icon: "i-heroicons-user-circle",
      to: "/account",
    },
    {
      label: "Se déconnecter",
      icon: "i-heroicons-arrow-left-end-on-rectangle",
      onclick: async () => {
        await $fetch("/api/user/logout");
      },
      to : "/"
    },
  ];
} else {
  userLink = [
    {
      label: "Se connecter",
      icon: "i-heroicons-arrow-right-end-on-rectangle",
      to: "/login",
    },
    {
      label: "S'inscrire",
      icon: "i-heroicons-arrow-right-circle",
      to: "/signup",
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
      label: "Boutique",
      icon: "i-heroicons-building-storefront",
      to: "/shop",
    },
  ],
  [...userLink],
];
</script>