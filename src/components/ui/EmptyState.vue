<template>
  <div
    :class="
      cn('flex items-center justify-center', containerClass, {
        'bg-background-glass backdrop-blur-md border border-glass':
          variant === 'glass',
        'text-muted text-center': variant === 'simple',
      })
    "
  >
    <div class="flex flex-col items-center space-y-4">
      <div :class="cn('flex justify-center', iconContainerClass)">
        <component :is="icon" :class="cn(iconClass)" />
      </div>
      <p :class="cn(textClass)">
        {{ message }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
  import type { Component } from "vue";
  import { cn } from "@/utils";

  interface EmptyStateProps {
    icon: Component;
    message: string;
    variant?: "simple" | "glass";
    containerClass?: string;
    iconContainerClass?: string;
    iconClass?: string;
    textClass?: string;
  }

  withDefaults(defineProps<EmptyStateProps>(), {
    variant: "simple",
    containerClass: "py-8",
    iconContainerClass: "mb-4",
    iconClass: "w-16 h-16 text-muted",
    textClass: "text-base",
  });
</script>
