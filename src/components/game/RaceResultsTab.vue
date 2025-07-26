<template>
  <div class="space-y-4 max-h-96 overflow-y-auto custom-scrollbar">
    <EmptyState
      v-if="completedRaces.length === 0"
      :icon="FlagIcon"
      message="No completed races yet"
      variant="simple"
    />

    <div
      v-for="race in completedRaces"
      :key="race.id"
      class="bg-surface rounded-lg border border-primary"
    >
      <div
        class="px-4 py-2 rounded-t-lg text-center font-bold text-white text-sm bg-green-500/80"
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
              <th class="text-center py-1 px-2 font-medium">
                Time
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="result in race.results"
              :key="result.horse.id"
              class="border-b border-primary hover:bg-surface-hover"
            >
              <td class="py-1 px-2">
                <div class="flex items-center space-x-2">
                  <span class="text-lg">{{
                    getPositionEmoji(result.position)
                  }}</span>
                  <span class="font-medium">{{ result.position }}</span>
                </div>
              </td>
              <td class="py-1 px-2 text-xs">
                {{ result.horse.name }}
              </td>
              <td class="py-1 px-2 text-center text-xs">
                {{ result.time.toFixed(2) }}s
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import type { Race } from "@/types/horse-racing";
  import { FlagIcon } from "@heroicons/vue/24/outline";
  import EmptyState from "@/components/ui/EmptyState.vue";

  interface RaceResultsTabProps {
    completedRaces: Race[];
  }

  defineProps<RaceResultsTabProps>();

  const getOrdinalNumber = (num: number): string => {
    const ordinals = ["1st", "2nd", "3rd", "4th", "5th", "6th"];
    return ordinals[num - 1] || `${num}th`;
  };

  const getPositionEmoji = (position: number): string => {
    switch (position) {
    case 1:
      return "🥇";
    case 2:
      return "🥈";
    case 3:
      return "🥉";
    }
    return "";
  };
</script>
