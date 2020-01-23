import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import BaseIcon from "@/components/BaseIcon.vue";
import BaseInput from "@/components/BaseInput.vue";
import "nprogress/nprogress.css";

Vue.component("BaseIcon", BaseIcon);
Vue.component("BaseInput", BaseInput);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
