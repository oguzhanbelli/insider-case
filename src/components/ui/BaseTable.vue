<template>
  <div class="flex flex-col space-y-4">
    <table class="w-full text-primary text-sm transition-all duration-200">
      <thead class="sticky top-0 bg-background-soft backdrop-blur-sm">
        <tr class="border-b border-primary">
          <th
            v-for="column in columns"
            :key="column.key"
            :class="
              cn('py-2 px-3 font-semibold', {
                'text-center': column.align === 'center',
                'text-right': column.align === 'right',
                'text-left': !column.align || column.align === 'left',
              })
            "
          >
            {{ column.title }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(row, index) in data"
          :key="index"
          :class="
            cn(
              'border-b border-primary hover:bg-surface-hover transition-colors',
              row._class ?? row._class,
            )
          "
        >
          <td
            v-for="column in columns"
            :key="column.key"
            :class="
              cn('py-2 px-3', {
                'text-center': column.align === 'center',
                'text-right': column.align === 'right',
                'text-left': !column.align || column.align === 'left',
              })
            "
          >
            <slot
              :name="`cell(${column.key})`"
              :value="row[column.key]"
              :row="row"
              :index="index"
            >
              {{ row[column.key] }}
            </slot>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts" generic="T extends Record<string, unknown>">
  import type { TableColumn } from "@/types/ui";
  import { cn } from "@/utils";

  interface BaseTableProps {
    columns: TableColumn[];
    data: T[];
  }

  defineProps<BaseTableProps>();
</script>
