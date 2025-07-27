<template>
  <div class="space-y-4">
    <BaseTabs
      :tabs="tabs"
      :active-tab="activeTab"
      @update:active-tab="activeTab = $event as Tab"
    />

    <component
      :is="selectedTab"
      v-if="selectedTab && dynamicProps"
      :key="activeTab"
      v-bind="dynamicProps"
    />
  </div>
</template>

<script setup lang="ts">
  import { computed, defineAsyncComponent, ref } from "vue";
  import BaseTabs from "@/components/ui/BaseTabs.vue";

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

  const componentsMap = {
    [Tab.Program]: defineAsyncComponent(
      () => import("../game/RaceProgram.vue"),
    ),
    [Tab.Results]: defineAsyncComponent(
      () => import("../game/RaceResultsTab.vue"),
    ),
  };

  const selectedTab = computed(() => {
    return componentsMap[activeTab.value as keyof typeof componentsMap];
  });
  const dynamicProps = computed(() => {
    return {
      schedule: activeTab.value === Tab.Program ? schedule.value : null,
      isRacing: activeTab.value === Tab.Program ? isRacing.value : false,
      completedRaces:
        activeTab.value === Tab.Results ? completedRaces.value : [],
    };
  });

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
