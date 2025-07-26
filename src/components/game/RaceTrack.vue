<template>
  <div
    class="bg-background-glass backdrop-blur-md rounded-lg p-6 border border-glass"
  >
    <div class="text-center mb-6">
      <h3 class="text-lg md:text-2xl font-bold text-heading mb-2">
        Round {{ race!.round }} - {{ race!.distance }}m
      </h3>
      <div class="flex justify-center items-center space-x-4">
        <div class="bg-background-soft px-4 py-2 rounded-full">
          <span class="text-primary">Status: {{ race!.status }}</span>
        </div>
        <div
          v-if="race!.status === RaceStatus.RUNNING"
          class="bg-red-500 w-3 h-3 rounded-full animate-pulse"
        />
      </div>
    </div>

    <div
      class="relative bg-amber-100 dark:bg-amber-300 rounded-md p-4 min-h-[300px]"
    >
      <div class="absolute right-4 top-0 bottom-0 w-1 bg-red-600 z-10">
        <div class="absolute -top-4 -left-2 text-red-600 font-bold text-xs">
          FINISH
        </div>
      </div>

      <div class="absolute left-4 top-0 bottom-0 w-1 bg-green-600 z-10">
        <div class="absolute -top-4 -left-2 text-green-600 font-bold text-xs">
          START
        </div>
      </div>

      <div
        class="absolute top-2 left-0 right-0 flex justify-between px-4 text-xs text-gray-600 dark:text-gray-700"
      >
        <span>0m</span>
        <span>{{ Math.floor(race!.distance / 4) }}m</span>
        <span>{{ Math.floor(race!.distance / 2) }}m</span>
        <span>{{ Math.floor((race!.distance * 3) / 4) }}m</span>
        <span>{{ race!.distance }}m</span>
      </div>

      <div class="pt-8 space-y-2">
        <div
          v-for="(horse, index) in race!.horses"
          :key="horse.id"
          class="relative h-10 bg-white/40 dark:bg-white/60 rounded border border-gray-300 dark:border-gray-400 shadow-sm"
        >
          <div
            class="absolute -left-10 top-2 text-sm font-bold text-gray-700 dark:text-gray-800 bg-white/80 dark:bg-white/90 px-2 py-1 rounded"
          >
            {{ index + 1 }}
          </div>

          <div
            class="absolute top-0.5 transition-all duration-100 ease-out z-20"
            :style="{
              left: `${calculateHorsePosition(horse)}%`,
            }"
          >
            <div class="flex items-center gap-1">
              <div
                class="relative"
                :class="
                  cn({
                    'horse-running':
                      (race!.status === RaceStatus.RUNNING ||
                        (race!.status !== RaceStatus.PENDING &&
                          race!.status !== RaceStatus.PAUSED)) &&
                      horse.position &&
                      horse.position < race!.distance,
                  })
                "
              >
                <HorseIcon
                  class="w-10 h-10 drop-shadow-md"
                  :style="{
                    fill: horse.color,
                  }"
                  :aria-label="`${horse.name} horse`"
                />
              </div>

              <div
                class="text-xs font-bold text-gray-800 dark:text-gray-900 bg-white/90 dark:bg-white/95 px-2 py-1 rounded shadow-md border"
              >
                {{ horse.name }}
              </div>
            </div>
          </div>

          <div
            v-if="horse.position !== undefined"
            class="absolute right-2 top-2 text-xs font-semibold text-gray-700 dark:text-gray-800 bg-yellow-200 dark:bg-yellow-300 px-2 py-1 rounded"
          >
            {{ getDisplayPosition(horse) }}m
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import type { Horse } from "@/types/horse-racing";
  import HorseIcon from "@/assets/icons/horse.svg";
  import { RaceStatus } from "@/types/enums";
  import { useHorseRacingStore } from "@/stores/horse-racing";
  import { storeToRefs } from "pinia";
  import { cn } from "@/utils";

  const { currentRace: race } = storeToRefs(useHorseRacingStore());

  const calculateHorsePosition = (horse: Horse): number => {
    if (!horse.position) return 0;

    const progressPercentage = Math.min(
      horse.position / race!.value!.distance,
      1,
    );

    const startPosition = 0;
    const finishPosition = 96;
    const usableTrackWidth = finishPosition - startPosition;

    const calculatedPosition =
      startPosition + progressPercentage * usableTrackWidth;

    return Math.max(
      startPosition,
      Math.min(calculatedPosition, finishPosition),
    );
  };

  const getDisplayPosition = (horse: Horse): number => {
    if (!horse.position) return 0;

    if (race?.value?.status === RaceStatus.FINISHED) {
      return race.value?.distance;
    }

    const currentPos = Math.min(horse.position, race!.value!.distance);
    return Math.round(currentPos / 10) * 10;
  };
</script>
