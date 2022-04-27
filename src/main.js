import "normalize.css";
import "@/assets/css/public.css";
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./plugins/element.js";
import axios from "@/http/request";
Vue.prototype.$axios = axios;

import * as API from '@/http/api'
Vue.prototype.$api = API


Vue.config.productionTip = false;

router.beforeEach((to, from, next) => {
  if (to.path != "/login") {
    if (!sessionStorage.getItem("token")) {
      next("/login");
    }
  }
  next();
});

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
