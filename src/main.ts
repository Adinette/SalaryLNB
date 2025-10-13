// main.ts
import { createApp } from "vue";
import App from "./App.vue";

// Template components
import BaseBlock from "../src/components/BaseBlock.vue";
import BaseBackground from "../src/components/BaseBackground.vue";
import BasePageHeading from "../src/components/BasePageHeading.vue";

// Template directives
import clickRipple from "../src/directives/clickRipple";

// Bootstrap framework
import * as bootstrap from "bootstrap";
window.bootstrap = bootstrap;
// Global CSS
// import "../src/assets/scss/oneui.min.css"
import "../src/assets/tailwind.css";
import "vue-toastification/dist/index.css";

// Utils
import { AppUtils } from "./utils";

// ⚡ Import du router configuré
import router from "./router";

const app = createApp(App);

// Global components
app.component("BaseBlock", BaseBlock);
app.component("BaseBackground", BaseBackground);
app.component("BasePageHeading", BasePageHeading);

// Register global directives
app.directive("click-ripple", clickRipple);

// Register plugins
AppUtils.registerPlugins(app);

// ⚡ Brancher le router
app.use(router);

// Mount app
app.mount("#app");
