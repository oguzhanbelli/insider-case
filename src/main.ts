import { createApp } from "vue";
import "@/styles/globals.css";
import App from "@/App.vue";
import router from "@/router/index.ts";
import { createPinia } from "pinia";
const pinia = createPinia();
const app = createApp(App);

app.use(router);
app.use(pinia);

app.mount("#app");
