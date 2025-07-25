<template>
  <div
    class="bg-red-300 font-poppins w-full h-screen flex items-center justify-center"
  >
    {{ message }}
  </div>
</template>

<script setup lang="ts">
  import { ref, type Ref } from "vue";
  import { useExampleStore } from "@/stores/example";
  import { type HomeState } from "@/types/home";

  const store = useExampleStore();
  const message: Ref<HomeState["message"]> = ref(store.message);
</script>
