import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import MyPlugin from "./plugins/myPlugin";

// 安装插件
Vue.use(MyPlugin, {
  debug: true,
  prefix: "MainApp",
});

// 验证插件安装
console.log("插件安装完成，Vue.prototype.$showToast:", Vue.prototype.$showToast);
console.log("插件安装完成，Vue.prototype.$formatDate:", Vue.prototype.$formatDate);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
