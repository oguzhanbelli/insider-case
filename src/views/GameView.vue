<template>
  <div
    class="bg-background font-poppins w-full min-h-screen p-6 transition-colors duration-300"
  >
    <div class="max-w-7xl mx-auto">
      <GameHeader
        :is-generating="store.isGenerating"
        :is-racing="store.isRacing"
        :is-paused="store.isPaused"
        :has-horses="store.horses.length > 0"
        :has-schedule="!!store.schedule"
        @generate-game="generateGame"
        @toggle-race="toggleRace"
        @reset-game="resetGame"
      />

      <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div class="lg:col-span-3">
          <HorsesTable
            :horses="store.horses"
            :is-racing="store.isRacing"
            :current-race="store.currentRace"
            :completed-races="store.completedRaces"
          />
        </div>

        <div class="lg:col-span-6">
          <div v-if="store.currentRace" class="mb-4">
            <RaceTrack :race="store.currentRace" />
          </div>
          <div
            v-else
            class="bg-background-glass backdrop-blur-md rounded-lg p-6 border border-glass min-h-96 flex items-center justify-center"
          >
            <div class="flex flex-col items-center space-y-4">
              <FlagIcon class="w-16 h-16 text-muted" />

              <p class="text-xl">
                Start a race to see the action!
              </p>
            </div>
          </div>
        </div>

        <div class="lg:col-span-3">
          <ProgramAndResults
            :schedule="store.schedule"
            :is-racing="store.isRacing"
            :completed-races="store.completedRaces"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { onMounted } from "vue";
  import { useHorseRacingStore } from "@/stores/horse-racing";
  import { useThemeStore } from "@/stores/theme";
  import GameHeader from "@/components/game/GameHeader.vue";
  import RaceTrack from "@/components/game/RaceTrack.vue";
  import HorsesTable from "@/components/game/HorsesTable.vue";
  import ProgramAndResults from "@/components/game/ProgramAndResults.vue";
  import { FlagIcon } from "@heroicons/vue/24/outline";

  const store = useHorseRacingStore();
  const themeStore = useThemeStore();

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

  onMounted(() => {
    themeStore.initTheme();
    if (store.horses.length === 0) {
      store.generateHorses();
    }
  });
</script>
