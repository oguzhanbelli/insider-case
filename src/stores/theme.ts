import { ref, computed } from "vue";
import { defineStore } from "pinia";

export const useThemeStore = defineStore("theme", () => {
  const isDark = ref(true);

  const theme = computed(() => (isDark.value ? "dark" : "light"));

  const toggleTheme = () => {
    isDark.value = !isDark.value;
    applyTheme();
    saveTheme();
  };

  const setTheme = (newTheme: "dark" | "light") => {
    isDark.value = newTheme === "dark";
    applyTheme();
    saveTheme();
  };

  const applyTheme = () => {
    document.documentElement.classList.toggle("dark", isDark.value);
  };

  const saveTheme = () => {
    localStorage.setItem("theme", theme.value);
  };

  const initTheme = () => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      isDark.value = savedTheme === "dark";
    } else {
      isDark.value = window.matchMedia("(prefers-color-scheme: dark)").matches;
    }
    applyTheme();
  };

  return {
    isDark,
    theme,
    toggleTheme,
    setTheme,
    initTheme,
  };
});
