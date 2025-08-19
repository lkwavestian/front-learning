import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

// 导航菜单配置
export const navMenu = [
  {
    path: "/about",
    name: "About",
    label: "关于",
    desc: "关于我们",
    component: () => import("../views/About.vue"),
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
