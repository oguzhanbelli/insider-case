<template>
  <div class="bg-surface rounded-lg border border-primary">
    <div
      :class="
        cn(
          'px-4 py-2 rounded-t-lg text-center font-bold text-white text-sm',
          headerClass,
        )
      "
    >
      {{ getOrdinalNumber(race.round) }} Lap - {{ race.distance }}m
    </div>

    <div class="p-3 max-h-auto">
      <BaseTable :columns="columns" :data="tableData">
        <template #cell(position)="{ value, row }">
          <div class="flex items-center space-x-2">
            <div
              v-if="showColorDot"
              class="w-3 h-3 rounded-full"
              :style="{ backgroundColor: row.color }"
            />
            <span v-if="showPositionEmoji" class="text-lg">
              {{ getPositionEmoji(value as number) }}
            </span>
            <span class="font-medium">{{ value }}</span>
          </div>
        </template>

        <template #cell(time)="{ value }">
          {{ (value as number).toFixed(2) }}s
        </template>
      </BaseTable>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { computed } from "vue";
  import type { Race, Horse, RaceResult } from "@/types/horse-racing";
  import type { TableColumn } from "@/types/ui";
  import { RaceStatus } from "@/types/enums";
  import BaseTable from "@/components/ui/BaseTable.vue";
  import { cn } from "@/utils";

  interface RaceCardProps {
    race: Race;
    variant?: "program" | "results";
    isCurrentRace?: boolean;
    isRacing?: boolean;
  }

  const props = withDefaults(defineProps<RaceCardProps>(), {
    variant: "program",
    isCurrentRace: false,
    isRacing: false,
  });

  const showColorDot = computed(() => props.variant === "program");
  const showPositionEmoji = computed(() => props.variant === "results");

  const headerClass = computed(() => {
    if (props.variant === "results") {
      return "bg-green-500/80";
    }

    if (props.isCurrentRace && props.isRacing) {
      return "bg-yellow-500/80";
    }

    if (props.race.status === RaceStatus.FINISHED) {
      return "bg-green-500/80";
    }

    return "bg-blue-500/80";
  });

  const columns = computed((): TableColumn[] => {
    const baseColumns: TableColumn[] = [
      { key: "position", title: "Pos", align: "left" },
      { key: "name", title: "Name", align: "left" },
    ];

    if (props.variant === "results") {
      baseColumns.push({ key: "time", title: "Time", align: "center" });
    }

    return baseColumns;
  });

  const tableData = computed(() => {
    if (props.variant === "results" && props.race.results) {
      return [...props.race.results]
        .sort((a, b) => a.position - b.position)
        .map((result: RaceResult) => ({
          id: result.horse.id,
          position: result.position,
          name: result.horse.name,
          color: result.horse.color,
          time: result.time,
        }));
    }

    const horses = getRaceHorses(props.race);
    return horses.map((horse: Horse, index: number) => ({
      id: horse.id,
      position: getHorsePosition(props.race, horse.id, index),
      name: horse.name,
      color: horse.color,
    }));
  });

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
    default:
      return "";
    }
  };

  const getRaceHorses = (race: Race): Horse[] => {
    if (race.status === RaceStatus.FINISHED && race.results) {
      return [...race.results]
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
