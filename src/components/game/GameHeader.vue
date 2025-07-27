<template>
  <div
    class="sticky top-0 z-50 bg-background backdrop-blur-sm border-b border-glass mb-2 px-4 p-6"
  >
    <div
      class="flex items-center justify-center gap-4 lg:gap-0 flex-wrap md:justify-between md:items-center"
    >
      <div class="flex items-center space-x-3">
        <h1 class="text-2xl md:text-5xl font-bold text-heading">
          Horse Racing
        </h1>
      </div>

      <div class="flex items-center flex-wrap md:flex-nowrap gap-2 md:gap-4">
        <GameControls />
        <ThemeToggle />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import GameControls from "@/components/game/GameControls.vue";
  import ThemeToggle from "@/components/ui/ThemeToggle.vue";
</script>
