<template>
  <div class="space-y-4 max-h-96 overflow-y-auto custom-scrollbar">
    <EmptyState
      v-if="!schedule"
      :icon="ClipboardDocumentListIcon"
      message="No program generated yet"
      variant="simple"
    />

    <RaceCard
      v-for="(race, index) in schedule?.races"
      :key="race.id"
      :race="race"
      variant="program"
      :is-current-race="index === schedule?.currentRaceIndex"
      :is-racing="isRacing"
    />
  </div>
</template>

<script setup lang="ts">
  import type { RaceSchedule } from "@/types/horse-racing";
  import { ClipboardDocumentListIcon } from "@heroicons/vue/24/outline";
  import EmptyState from "@/components/ui/EmptyState.vue";
  import RaceCard from "@/components/game/RaceCard.vue";

  interface RaceProgramProps {
    schedule: RaceSchedule | null;
    isRacing: boolean;
  }

  defineProps<RaceProgramProps>();
</script>
