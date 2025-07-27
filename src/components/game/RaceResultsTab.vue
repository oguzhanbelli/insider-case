<template>
  <div class="space-y-4 max-h-96 overflow-y-auto custom-scrollbar">
    <EmptyState
      v-if="completedRaces.length === 0"
      :icon="FlagIcon"
      message="No completed races yet"
      variant="simple"
    />

    <RaceCard
      v-for="race in completedRaces"
      :key="race.id"
      :race="race"
      variant="results"
    />
  </div>
</template>

<script setup lang="ts">
  import type { Race } from "@/types/horse-racing";
  import { FlagIcon } from "@heroicons/vue/24/outline";
  import EmptyState from "@/components/ui/EmptyState.vue";
  import RaceCard from "@/components/game/RaceCard.vue";

  interface RaceResultsTabProps {
    completedRaces: Race[];
  }

  defineProps<RaceResultsTabProps>();
</script>
