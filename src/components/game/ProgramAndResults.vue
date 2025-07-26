<template>
  <div class="space-y-4">
    <BaseTabs
      :tabs="tabs"
      :active-tab="activeTab"
      @update:active-tab="activeTab = $event as Tab"
    />

    <RaceProgram
      v-if="activeTab === Tab.Program"
      :schedule="schedule"
      :is-racing="isRacing"
    />

    <RaceResultsTab
      v-if="activeTab === Tab.Results"
      :completed-races="completedRaces"
    />
  </div>
</template>

<script setup lang="ts">
  import { ref } from "vue";
  import BaseTabs from "@/components/ui/BaseTabs.vue";
  import RaceProgram from "@/components/game/RaceProgram.vue";
  import RaceResultsTab from "@/components/game/RaceResultsTab.vue";
  import type { TabItem } from "@/types/ui";
  import {
    ClipboardDocumentListIcon,
    TrophyIcon,
  } from "@heroicons/vue/24/outline";
  import { useHorseRacingStore } from "@/stores/horse-racing";
  import { storeToRefs } from "pinia";
  import { Tab } from "@/types/enums";

  const { schedule, completedRaces, isRacing } = storeToRefs(
    useHorseRacingStore(),
  );

  const activeTab = ref<Tab>(Tab.Program);

  const tabs: TabItem[] = [
    {
      key: Tab.Program,
      title: "Program",
      icon: ClipboardDocumentListIcon,
      color: "blue",
    },
    {
      key: Tab.Results,
      title: "Results",
      icon: TrophyIcon,
      color: "green",
    },
  ];
</script>
