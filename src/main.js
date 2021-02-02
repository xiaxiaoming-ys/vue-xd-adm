import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

// 全局配置
import '@/assets/scss/reset.scss';

// 第三方包
import ElementPlus from 'element-plus';
import 'element-plus/lib/theme-chalk/index.css';
import http from '@/api/config.js';
import './mock'

const app = createApp(App);

// vue3全局挂在方法 this.$http 使用即可
app.config.globalProperties.$http = http;

app.use(store)
  .use(router)
  .use(ElementPlus)
  .mount("#app");
