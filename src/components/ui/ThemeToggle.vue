<template>
  <button
    class="flex items-center justify-center w-10 h-10 rounded-full bg-background hover:bg-background-hover transition-colors focus:ring-primary"
    :aria-pressed="themeStore.isDark"
    :aria-checked="themeStore.isDark"
    :title="themeStore.isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'"
    :aria-label="
      themeStore.isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'
    "
    @click="themeStore.toggleTheme()"
  >
    <div class="w-6 h-6 flex items-center justify-center">
      <div class="transition-all duration-300 ease-in-out">
        <template v-if="themeStore.isDark">
          <MoonIcon class="w-5 h-5 text-blue-500" />
        </template>
        <template v-else>
          <SunIcon class="w-5 h-5 text-yellow-500" />
        </template>
      </div>
    </div>
  </button>
</template>

<script setup lang="ts">
  import { useThemeStore } from "@/stores/theme";
  import { SunIcon, MoonIcon } from "@heroicons/vue/24/outline";

  const themeStore = useThemeStore();
</script>
