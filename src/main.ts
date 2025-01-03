import { createApp } from "vue";
import { createPinia } from "pinia";

import { MotionPlugin } from "@vueuse/motion";
import WrapBalancer from "vue-wrap-balancer";

import {
  RecycleScroller,
  DynamicScroller,
  DynamicScrollerItem,
  // @ts-ignore
} from "vue-virtual-scroller";
import VWave from "v-wave";
import { autoAnimatePlugin } from "@formkit/auto-animate/vue";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";

import App from "./App.vue";
import { router } from "./router";
import { setupI18n } from "./i18n";
import vTooltip from "./directives/vTooltip";

import "./assets/scss/index.scss";
import "vue-virtual-scroller/dist/vue-virtual-scroller.css";

const app = createApp(App);
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

app.use(pinia);
app.use(router);
app.use(autoAnimatePlugin);
app.use(VWave);
app.use(MotionPlugin);
app.use(setupI18n());

app.directive("tooltip", vTooltip);

app.component("WrapBalancer", WrapBalancer);
app.component("RecycleScroller", RecycleScroller);
app.component("DynamicScroller", DynamicScroller);
app.component("DynamicScrollerItem", DynamicScrollerItem);

app.mount("#app");
