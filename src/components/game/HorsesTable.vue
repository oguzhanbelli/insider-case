<template>
  <div
    class="bg-background-glass backdrop-blur-md rounded-lg p-6 border border-glass"
  >
    <h2
      class="text-2xl font-bold text-heading mb-4 flex items-center space-x-2"
    >
      <span>Horse List (1 - {{ horses.length }})</span>
    </h2>

    <div v-if="horses.length === 0" class="text-muted text-center py-12">
      <p>Click "Generate Game" to populate the horse list</p>
    </div>

    <div v-else>
      <BaseTable :columns="columns" :data="tableData">
        <template #cell(id)="{ row }">
          <div class="flex items-center space-x-2">
            <div
              class="w-4 h-4 rounded-full border-2 border-primary"
              :style="{ backgroundColor: row.color as string }"
            />
            <span class="font-medium">{{ row.id }}</span>
          </div>
        </template>

        <template #cell(name)="{ row }">
          <span class="font-medium">{{ row.name }}</span>
        </template>

        <template #cell(condition)="{ row }">
          <div class="flex items-center justify-center">
            <div class="w-12 bg-background-mute rounded-full h-2 mr-2">
              <div
                class="bg-gradient-to-r from-red-500 to-green-500 h-2 rounded-full"
                :style="{ width: `${row.condition}%` }"
              />
            </div>
            <span class="text-xs">{{ row.condition }}</span>
          </div>
        </template>

        <template #cell(status)="{ row }">
          <span
            v-if="
              isHorseInCurrentRace(row.id as number) &&
                isRacing &&
                currentRace?.status !== RaceStatus.FINISHED
            "
            class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-500/20 text-yellow-600 dark:text-yellow-200 border border-yellow-400/30"
          >
            Racing
          </span>
          <span
            v-else
            class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-background-mute text-muted"
          >
            Ready
          </span>
        </template>
      </BaseTable>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { computed } from "vue";
  import BaseTable from "@/components/ui/BaseTable.vue";

  import type { TableColumn } from "@/types/ui";
  import { useHorseRacingStore } from "@/stores/horse-racing";
  import { RaceStatus } from "@/types/enums";
  import { storeToRefs } from "pinia";

  const { horses, currentRace, isRacing } = storeToRefs(useHorseRacingStore());

  const columns: TableColumn[] = [
    { key: "id", title: "#", align: "left" },
    { key: "name", title: "Name", align: "left" },
    { key: "condition", title: "Condition", align: "center" },
    { key: "status", title: "Status", align: "center" },
  ];

  const tableData = computed(() => {
    return horses.value.map((horse) => ({
      ...horse,
      _class: [
        isHorseInCurrentRace(horse.id) &&
          isRacing &&
          currentRace.value!.status !== RaceStatus.FINISHED
          ? "bg-yellow-500/20 border-yellow-400/30"
          : "",
      ]
        .filter(Boolean)
        .join(" "),
    }));
  });

  const isHorseInCurrentRace = (horseId: number) => {
    return (
      currentRace.value?.horses.some((horse) => horse.id === horseId) || false
    );
  };
</script>
