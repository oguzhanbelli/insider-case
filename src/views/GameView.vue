<template>
  <div
    class="bg-background font-poppins w-full min-h-screen p-6 transition-colors duration-300"
  >
    <div class="max-w-7xl mx-auto">
      <GameHeader />

      <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div class="lg:col-span-3">
          <HorsesTable />
        </div>

        <div class="lg:col-span-6">
          <div v-if="store.currentRace" class="mb-4">
            <RaceTrack />
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
          <ProgramAndResults />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { onMounted } from "vue";
  import { useHorseRacingStore } from "@/stores/horse-racing";
  import GameHeader from "@/components/game/GameHeader.vue";
  import RaceTrack from "@/components/game/RaceTrack.vue";
  import HorsesTable from "@/components/game/HorsesTable.vue";
  import ProgramAndResults from "@/components/game/ProgramAndResults.vue";
  import { FlagIcon } from "@heroicons/vue/24/outline";

  const store = useHorseRacingStore();

  onMounted(() => {
    if (store.horses.length === 0) {
      store.generateHorses();
    }
  });
</script>
