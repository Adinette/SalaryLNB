// main.ts
import { createApp } from "vue";
import App from "./App.vue";

// Template components
import BaseBlock from "../src/components/BaseBlock.vue";
import BaseBackground from "../src/components/BaseBackground.vue";
import BasePageHeading from "../src/components/BasePageHeading.vue";

// Utils
import { AppUtils } from "./utils";

// ⚡ Import du router configuré
import router from "./router";

const app = createApp(App);

// Global components
app.component("BaseBlock", BaseBlock);
app.component("BaseBackground", BaseBackground);
app.component("BasePageHeading", BasePageHeading);

// Register plugins
AppUtils.registerPlugins(app);

// ⚡ Brancher le router
app.use(router);

// Mount app
app.mount("#app");
