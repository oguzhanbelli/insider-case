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
      class="relative bg-gradient-to-r from-amber-50 via-amber-100 to-amber-50 dark:from-amber-200 dark:via-amber-300 dark:to-amber-200 rounded-md p-2.5 min-h-[400px]"
    >
      <div class="absolute right-4 top-0 bottom-0 w-2 bg-red-600 z-40">
        <div
          class="absolute -bottom-5 translate-x-[-50%] left-2 text-red-600 font-bold text-xs z-[210] whitespace-nowrap"
        >
          FINISH
        </div>
      </div>

      <div
        class="absolute top-2 left-17 right-5 text-xs text-gray-600 dark:text-gray-700"
      >
        <span
          v-for="mark in [
            0,
            race!.distance / 4,
            race!.distance / 2,
            (race!.distance * 3) / 4,
            race!.distance,
          ]"
          :key="mark"
          class="absolute transform -translate-x-1/2"
          :style="{ left: `${(mark / race!.distance) * 100}%` }"
        >
          {{ Math.round(mark) }}m
        </span>
      </div>

      <div class="relative pl-10 pr-4 pt-6">
        <div
          class="absolute top-4 left-10 w-16 h-4 bg-gray-800 rounded-t-lg shadow-lg z-30"
        >
          <div
            class="absolute top-1 left-2 right-2 h-1 bg-yellow-400 rounded-full"
          />
        </div>

        <div>
          <div
            v-for="(horse, index) in race!.horses"
            :key="`row-${horse.id}`"
            class="flex items-stretch"
          >
            <div
              class="relative w-16 bg-gradient-to-r from-gray-600 to-gray-700 shadow-2xl z-20"
            >
              <div
                class="absolute -left-8 top-1/2 transform -translate-y-1/2 w-6 h-6 bg-white rounded-full flex items-center justify-center text-xs font-bold text-gray-800 shadow-md border-2 border-gray-300"
              >
                {{ index + 1 }}
              </div>
              <div
                class="absolute inset-0 bg-gradient-to-r from-gray-400 to-gray-300"
              >
                <div class="absolute inset-1 bg-white/20 rounded-sm" />
              </div>
              <div
                class="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-700 transition-all duration-500 ease-in-out shadow-inner"
                :class="{
                  'transform translate-x-full opacity-0':
                    race!.status !== RaceStatus.PENDING,
                  'transform translate-x-0 opacity-100':
                    race!.status === RaceStatus.PENDING,
                }"
              >
                <div
                  class="absolute right-1 top-1/2 transform -translate-y-1/2 w-1 h-8 bg-blue-400 rounded-full shadow-sm"
                />
                <div
                  class="absolute right-3 top-1/2 transform -translate-y-1/2 w-0.5 h-4 bg-blue-300 rounded-full"
                />
              </div>
            </div>

            <div
              class="relative flex-1 h-[58px] bg-white/30 dark:bg-white/50 rounded-r-lg border-y border-r border-gray-300 dark:border-gray-400 shadow-sm"
            >
              <div class="absolute inset-0 flex items-center">
                <div class="w-full h-0.5 bg-white/60 dark:bg-white/80" />
                <div
                  class="absolute left-1/4 w-0.5 h-full bg-white/40 dark:bg-white/60"
                />
                <div
                  class="absolute left-1/2 w-0.5 h-full bg-white/40 dark:bg-white/60"
                />
                <div
                  class="absolute left-3/4 w-0.5 h-full bg-white/40 dark:bg-white/60"
                />
              </div>

              <div
                class="absolute top-1 z-20 horse-element"
                :class="{
                  'horse-running-state': isHorseActive(horse),
                  'horse-finished-state':
                    (horse.position ?? 0) >= race!.distance,
                  'horse-pending-state': race!.status === RaceStatus.PENDING,
                }"
                :style="{
                  left: calculateHorseLeft(horse),
                  transform: calculateHorseTransform(horse),
                }"
              >
                <div
                  class="flex items-center gap-2"
                  :class="{ hidden: horse.position == race!.distance }"
                >
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
                      class="w-10 h-10 drop-shadow-lg transition-transform duration-200"
                      :style="{
                        fill: horse.color,
                        transform:
                          race!.status === RaceStatus.PENDING
                            ? 'scale(0.9)'
                            : 'scale(1)',
                      }"
                      :aria-label="`${horse.name} horse`"
                    />
                  </div>
                  <div
                    class="text-xs font-bold text-gray-800 dark:text-gray-900 bg-white/95 dark:bg-white/98 px-2 py-1 rounded-full shadow-md border border-gray-200 dark:border-gray-300 whitespace-nowrap"
                  >
                    {{ horse.name }}
                  </div>
                </div>
              </div>

              <div
                v-if="horse.position !== undefined"
                class="absolute right-2 top-1/2 transform -translate-y-1/2 text-xs font-semibold text-gray-700 dark:text-gray-800 bg-gradient-to-r from-yellow-200 to-yellow-300 dark:from-yellow-300 dark:to-yellow-400 px-3 py-1 rounded-full shadow-md border border-yellow-400"
              >
                {{ getDisplayPosition(horse) }}m
              </div>
            </div>
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
    if (!horse.position || horse.position <= 0) {
      return 0;
    }

    const progressPercentage = Math.min(
      horse.position / race!.value!.distance,
      1,
    );

    const startPosition = 1;
    const finishPosition = 100;
    const usableTrackWidth = finishPosition - startPosition;

    const calculatedPosition =
      startPosition + progressPercentage * usableTrackWidth;

    return Math.max(
      startPosition,
      Math.min(calculatedPosition, finishPosition),
    );
  };
  const calculateHorseLeft = (horse: Horse) => {
    if (race!.value!.status !== RaceStatus.PENDING) {
      return `calc(${calculateHorsePosition(horse)}% + 1.5rem)`;
    }
    return `${calculateHorsePosition(horse)}%`;
  };

  const calculateHorseTransform = (horse: Horse) => {
    if (race!.value!.status === RaceStatus.PENDING && !horse.position) {
      return "translateX(-56px)";
    }
    return "translateX(-25%)";
  };

  const isHorseActive = (horse: Horse) => {
    return horse.position ?? 0 < race!.value!.distance;
  };

  const getDisplayPosition = (horse: Horse): number => {
    if (!horse.position || !race?.value?.distance) return 0;

    if (race?.value?.status === RaceStatus.FINISHED) {
      return race.value.distance;
    }

    const currentPos = Math.min(horse.position, race.value.distance);
    return Math.round(currentPos / 10) * 10;
  };
</script>

<style scoped>
  .horse-element {
    transition: transform 250ms ease-out;
  }

  .horse-running-state {
    transition:
      left 200ms cubic-bezier(0.25, 0.46, 0.45, 0.94),
      transform 250ms ease-out;
  }

  .horse-finished-state {
    transition:
      transform 300ms ease-out,
      opacity 200ms ease-out;
  }

  .horse-pending-state {
    transition: transform 200ms ease-out;
  }
</style>
