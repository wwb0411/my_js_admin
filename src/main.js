import { createApp } from 'vue'
import App from './App.vue';

const  app = createApp(App);
//配置路由的基本
import router from "./router/index";
//配置vuex
import store from "./store/index";

//全局配置axios的信息
import axios from "axios";
app.config.globalProperties.$axios = axios;

app.use(router).use(store).mount('#app');
