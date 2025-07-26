<template>
  <div class="mb-8">
    <div
      class="flex items-center justify-center gap-4 md:gap-0 flex-wrap md:justify-between md:items-center mb-6"
    >
      <div class="flex items-center space-x-3">
        <h1 class="text-2xl md:text-5xl font-bold text-heading">
          Horse Racing
        </h1>
      </div>

      <div class="flex items-center flex-wrap gap-2 md:gap-4">
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
