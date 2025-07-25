import { defineStore } from "pinia";

export const useExampleStore = defineStore("example", {
  state: () => ({
    message: "Hello, Vite + Vue 3 + Tailwind CSS! Example Store",
  }),
  getters: {
    uppercaseMessage: (state) => state.message.toUpperCase(),
  },
  actions: {
    updateMessage(newMessage: string) {
      this.message = newMessage;
    },
  },
});
