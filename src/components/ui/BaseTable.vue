<template>
  <div class="max-h-96 overflow-y-auto custom-scrollbar">
    <table class="w-full text-primary text-sm">
      <thead class="sticky top-0 bg-background-soft backdrop-blur-sm">
        <tr class="border-b border-primary">
          <th
            v-for="column in columns"
            :key="column.key"
            :class="cn(
              'py-2 px-3 font-semibold',
              {
                'text-center': column.align === 'center',
                'text-right': column.align === 'right',
                'text-left': !column.align || column.align === 'left',
              }
            )"
          >
            {{ column.title }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(row, index) in data"
          :key="index"
          :class="cn(
            'border-b border-primary hover:bg-surface-hover transition-colors',
            row._class
          )"
        >
          <td
            v-for="column in columns"
            :key="column.key"
            :class="cn(
              'py-2 px-3',
              {
                'text-center': column.align === 'center',
                'text-right': column.align === 'right',
                'text-left': !column.align || column.align === 'left',
              }
            )"
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

<script setup lang="ts">
  import type { TableColumn, TableRow } from "@/types/ui";
  import { cn } from "@/utils";

  interface BaseTableProps {
    columns: TableColumn[];
    data: TableRow[];
  }

  defineProps<BaseTableProps>();
</script>
