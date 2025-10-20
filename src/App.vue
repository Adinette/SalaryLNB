<script setup lang="ts"></script>

<template>
  <v-app>
    <v-main>
      <RouterView />
    </v-main>
  </v-app>
</template>

<style lang="scss">
	// Main Stylesheet
	@import "../src/assets/scss/main";

	// All color themes are included and available by default
	// Feel free to comment out any of them if you won't use them in your project
	@import "../src/assets/scss/oneui/themes/amethyst";
	@import "../src/assets/scss/oneui/themes/city";
	@import "../src/assets/scss/oneui/themes/flat";
	@import "../src/assets/scss/oneui/themes/modern";
	@import "../src/assets/scss/oneui/themes/smooth";
	@import "../src/assets/scss/oneui/themes/custom";
</style>
