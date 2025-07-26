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
            class="rounded-lg p-6 min-h-96"
          >
            <EmptyState
              :icon="FlagIcon"
              message="Start a race to see the action!"
              variant="glass"
              container-class="min-h-96"
              text-class="text-xl text-text-muted"
            />
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
  import EmptyState from "@/components/ui/EmptyState.vue";
  import { FlagIcon } from "@heroicons/vue/24/outline";

  const store = useHorseRacingStore();

  onMounted(() => {
    if (store.horses.length === 0) {
      store.generateHorses();
    }
  });
</script>
