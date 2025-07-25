<template>
  <div
    class="bg-background-glass backdrop-blur-md rounded-lg border border-glass overflow-hidden"
    role="tablist"
  >
    <div class="flex">
      <button
        v-for="tab in tabs"
        :id="`tab-${tab.key}`"
        :key="tab.key"
        role="tab"
        :aria-selected="activeTab === tab.key"
        :aria-controls="`panel-${tab.key}`"
        :tabindex="activeTab === tab.key ? 0 : -1"
        class="flex-1 px-4 py-3 text-primary font-bold text-center transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:ring-inset flex items-center justify-center"
        :class="[
          activeTab === tab.key
            ? `${getActiveTabClass(tab.color)} shadow-lg`
            : 'bg-background-glass hover:bg-surface-hover active:bg-background-mute hover:scale-105 active:scale-95',
        ]"
        @click="$emit('update:activeTab', tab.key)"
      >
        <component
          :is="tab.icon"
          v-if="tab.icon && typeof tab.icon !== 'string'"
          class="w-5 h-5 mr-2"
        />
        <span v-else-if="tab.icon" class="mr-2">{{ tab.icon }}</span>
        {{ tab.title }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
  import type { TabItem } from "@/types/ui";
  interface BaseTabsProps {
    tabs: TabItem[];
    activeTab: string;
  }

  interface BaseTabsEmits {
    "update:activeTab": [value: string];
  }

  defineProps<BaseTabsProps>();
  defineEmits<BaseTabsEmits>();

  const getActiveTabClass = (color?: string): string => {
    switch (color) {
    case "green":
      return "bg-green-500/80 hover:bg-green-500/90";
    case "blue":
      return "bg-blue-500/80 hover:bg-blue-500/50 ";
    case "yellow":
      return "bg-yellow-500/80 hover:bg-yellow-500/90";
    case "red":
      return "bg-red-500/80 hover:bg-red-500/90";
    default:
      return "bg-blue-500/80 hover:bg-blue-500/90";
    }
  };
</script>
