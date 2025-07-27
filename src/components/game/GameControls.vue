<template>
  <div class="flex flex-wrap gap-2 md:gap-4 items-center w-full justify-center">
    <BaseButton
      variant="primary"
      size="md"
      :loading="isGenerating"
      :disabled="isRacing || isPaused"
      @click="generateGame"
    >
      <span class="flex items-center space-x-2">
        <span>{{
          hasHorses && hasSchedule ? "Regenerate" : "Generate"
        }}
          Program</span>
      </span>
    </BaseButton>

    <BaseButton
      :variant="isRacing && !isPaused ? 'warning' : 'success'"
      size="md"
      :loading="isRacing && !isPaused"
      :disabled="!hasSchedule || isGenerating"
      @click="toggleRace"
    >
      <span class="flex items-center space-x-2">
        <span>
          {{
            !isRacing ? "Start Racing" : isPaused ? "Resume Race" : "Pause Race"
          }}
        </span>
      </span>
    </BaseButton>

    <BaseButton
      variant="secondary"
      size="md"
      :disabled="!hasSchedule"
      @click="resetGame"
    >
      <span class="flex items-center space-x-2">
        <span>Reset Game</span>
      </span>
    </BaseButton>
  </div>
</template>

<script setup lang="ts">
  import BaseButton from "@/components/ui/BaseButton.vue";
  import { useHorseRacingStore } from "@/stores/horse-racing";
  import { storeToRefs } from "pinia";
  import { computed } from "vue";

  const store = useHorseRacingStore();
  const { isGenerating, isRacing, isPaused } = storeToRefs(store);

  const hasHorses = computed(() => store.horses.length > 0);
  const hasSchedule = computed(() => !!store.schedule?.races.length);

  const generateGame = async () => {
    store.generateHorses();
    await store.generateRaceSchedule();
  };
  const toggleRace = () => {
    store.toggleRacing();
  };

  const resetGame = () => {
    store.resetGame();
  };
</script>
