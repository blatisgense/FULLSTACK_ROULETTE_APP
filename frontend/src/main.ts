import { App, createApp } from "vue";
import Application from "@app";
import { router } from "@router/router.ts";
import { createPinia, Pinia } from "pinia";
import "@styles/style.scss";

const pinia: Pinia = createPinia();
const app: App<Element> = createApp(Application);

app.use(pinia);
app.use(router);

app.mount("#app");
