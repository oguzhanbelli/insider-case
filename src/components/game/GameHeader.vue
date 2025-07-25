<template>
  <div class="mb-8">
    <div
      class="flex justify-start flex-wrap md:justify-between md:items-center mb-6"
    >
      <div class="flex items-center space-x-3">
        <h1 class="text-5xl font-bold text-heading">
          Horse Racing
        </h1>
      </div>

      <div class="flex items-center gap-4">
        <GameControls
          :is-generating="isGenerating ?? false"
          :is-racing="isRacing ?? false"
          :is-paused="isPaused ?? false"
          :has-horses="hasHorses ?? false"
          :has-schedule="hasSchedule ?? false"
          @generate-game="$emit('generate-game')"
          @toggle-race="$emit('toggle-race')"
          @reset-game="$emit('reset-game')"
        />
        <ThemeToggle />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import GameControls from "@/components/game/GameControls.vue";
  import ThemeToggle from "@/components/ui/ThemeToggle.vue";

  interface GameHeaderProps {
    isGenerating?: boolean;
    isRacing?: boolean;
    isPaused?: boolean;
    hasHorses?: boolean;
    hasSchedule?: boolean;
  }

  interface GameHeaderEmits {
    (event: "generate-game"): void;
    (event: "toggle-race"): void;
    (event: "reset-game"): void;
  }

  defineProps<GameHeaderProps>();

  defineEmits<GameHeaderEmits>();
</script>
