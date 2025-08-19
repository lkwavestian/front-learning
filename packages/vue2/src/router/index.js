import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

// 导航菜单配置
export const navMenu = [
  {
    path: "/vuex-test",
    name: "VuexTest",
    label: "Vuex",
    desc: "测试Vuex相关API",
    component: () => import("../views/VuexTest.vue"),
  },
];

// 提取路由配置
const routes = navMenu.map((item) => ({
  path: item.path,
  name: item.name,
  component: item.component,
  props: item.props || {},
}));

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
