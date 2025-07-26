<template>
  <div class="space-y-4 max-h-96 overflow-y-auto custom-scrollbar">
    <EmptyState
      v-if="!schedule"
      :icon="ClipboardDocumentListIcon"
      message="No program generated yet"
      variant="simple"
    />

    <div
      v-for="(race, index) in schedule?.races"
      :key="race.id"
      class="bg-surface rounded-lg border border-primary"
    >
      <div
        :class="cn(
          'px-4 py-2 rounded-t-lg text-center font-bold text-white text-sm',
          {
            'bg-yellow-500/80': index === schedule?.currentRaceIndex && isRacing,
            'bg-green-500/80': race.status === RaceStatus.FINISHED,
            'bg-blue-500/80': race.status === RaceStatus.PENDING,
          }
        )"
      >
        {{ getOrdinalNumber(race.round) }} Lap - {{ race.distance }}m
      </div>

      <div class="p-3">
        <table class="w-full text-primary text-xs">
          <thead>
            <tr class="border-b border-primary">
              <th class="text-left py-1 px-2 font-medium">
                Pos
              </th>
              <th class="text-left py-1 px-2 font-medium">
                Name
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(horse, horseIndex) in getRaceHorses(race)"
              :key="horse.id"
              class="border-b border-primary hover:bg-surface-hover"
            >
              <td class="py-1 px-2">
                <div class="flex items-center space-x-2">
                  <div
                    class="w-3 h-3 rounded-full"
                    :style="{ backgroundColor: horse.color }"
                  />
                  <span class="font-medium">{{
                    getHorsePosition(race, horse.id, horseIndex)
                  }}</span>
                </div>
              </td>
              <td class="py-1 px-2 text-xs">
                {{ horse.name }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { RaceStatus } from "@/types/enums";
  import type { RaceSchedule, Race, Horse } from "@/types/horse-racing";
  import { ClipboardDocumentListIcon } from "@heroicons/vue/24/outline";
  import EmptyState from "@/components/ui/EmptyState.vue";
  import { cn } from "@/utils";

  interface RaceProgramProps {
    schedule: RaceSchedule | null;
    isRacing: boolean;
  }

  defineProps<RaceProgramProps>();

  const getOrdinalNumber = (num: number): string => {
    const ordinals = ["1st", "2nd", "3rd", "4th", "5th", "6th"];
    return ordinals[num - 1] || `${num}th`;
  };

  const getRaceHorses = (race: Race): Horse[] => {
    if (race.status === RaceStatus.FINISHED && race.results) {
      return race.results
        .sort((a, b) => a.position - b.position)
        .map((result) => result.horse);
    }
    return race.horses;
  };

  const getHorsePosition = (
    race: Race,
    horseId: number,
    startingIndex: number,
  ): number => {
    if (race.status === RaceStatus.FINISHED && race.results) {
      const result = race.results.find((r) => r.horse.id === horseId);
      return result?.position || startingIndex + 1;
    }
    return startingIndex + 1;
  };
</script>
