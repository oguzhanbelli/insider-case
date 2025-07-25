<template>
  <div class="rounded-lg">
    <div class="flex flex-wrap gap-4 justify-center">
      <BaseButton
        variant="primary"
        size="md"
        :loading="props.isGenerating"
        :disabled="props.isRacing || props.isPaused"
        @click="$emit('generate-game')"
      >
        <span class="flex items-center space-x-2">
          <span>{{
            props.hasHorses && props.hasSchedule ? "Regenerate" : "Generate"
          }}
            Program</span>
        </span>
      </BaseButton>

      <BaseButton
        :variant="props.isRacing && !props.isPaused ? 'warning' : 'success'"
        size="md"
        :loading="props.isRacing && !props.isPaused"
        :disabled="!props.hasSchedule"
        @click="$emit('toggle-race')"
      >
        <span class="flex items-center space-x-2">
          <span>
            {{
              !props.isRacing
                ? "Start Racing"
                : props.isPaused
                  ? "Resume Race"
                  : "Pause Race"
            }}
          </span>
        </span>
      </BaseButton>

      <BaseButton
        variant="secondary"
        size="md"
        :disabled="!props.hasSchedule"
        @click="$emit('reset-game')"
      >
        <span class="flex items-center space-x-2">
          <span>Reset Game</span>
        </span>
      </BaseButton>
    </div>
  </div>
</template>

<script setup lang="ts">
  import BaseButton from "@/components/ui/BaseButton.vue";

  interface GameControlsProps {
    isGenerating: boolean;
    isRacing: boolean;
    isPaused?: boolean;
    hasHorses: boolean;
    hasSchedule: boolean;
  }

  interface GameControlsEmits {
    (event: "generate-game"): void;
    (event: "toggle-race"): void;
    (event: "reset-game"): void;
  }

  const props = defineProps<GameControlsProps>();

  defineEmits<GameControlsEmits>();
</script>
