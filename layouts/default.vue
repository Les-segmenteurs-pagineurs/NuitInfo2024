<template>
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
import "~/assets/css/bootstrapWish.scss";

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
      label: "Dashboard",
      icon: "i-heroicons-chart-bar",
      to: "/dashboard",
    },
  ],
  [
    ...userLink,
    {
      label: "Help",
      icon: "i-heroicons-question-mark-circle",
    },
  ],
];
</script>
