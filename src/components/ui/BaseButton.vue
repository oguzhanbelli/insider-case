<template>
  <button :class="buttonClasses" :disabled="disabled" @click="handleClick">
    <div class="flex items-center justify-center gap-2">
      <span v-if="loading" class="loading-spinner" />
      <slot />
    </div>
  </button>
</template>

<script setup lang="ts">
  import { computed } from "vue";

  interface ButtonProps {
    variant?: "primary" | "secondary" | "success" | "danger" | "warning";
    size?: "sm" | "md" | "lg";
    disabled?: boolean;
    loading?: boolean;
    block?: boolean;
  }
  interface ButtonEmits {
    click: [event: MouseEvent];
  }

  const props = withDefaults(defineProps<ButtonProps>(), {
    variant: "primary",
    size: "md",
    disabled: false,
    loading: false,
    block: false,
  });

  const emit = defineEmits<ButtonEmits>();

  const buttonClasses = computed(() => [
    "base-button",
    `base-button--${props.variant}`,
    `base-button--${props.size}`,
    {
      "base-button--disabled": props.disabled,
      "base-button--loading": props.loading,
      "base-button--block": props.block,
    },
  ]);

  const handleClick = (event: MouseEvent) => {
    if (!props.disabled) {
      emit("click", event);
    }
  };
</script>

<style scoped>
  @import "@/styles/button.css";
</style>
