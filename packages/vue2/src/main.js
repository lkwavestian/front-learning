import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import MyPlugin from "./plugins/myPlugin";
import { hasPermission } from "./utils/permission";

// 安装插件
Vue.use(MyPlugin, {
  debug: true,
  prefix: "MainApp",
});

// 注册全局权限指令
Vue.directive('has-permission', hasPermission);

// 验证插件安装
console.log("插件安装完成，Vue.prototype.$showToast:", Vue.prototype.$showToast);
console.log("插件安装完成，Vue.prototype.$showToast:", Vue.prototype.$formatDate);
console.log("权限指令注册完成");

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
