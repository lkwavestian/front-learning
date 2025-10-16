import { createRouter, createWebHistory } from "vue-router";
import type { RouteRecordRaw } from "vue-router";

// 导航菜单配置
export interface NavMenuItem {
  path: string;
  name: string;
  label: string;
  desc: string;
  component: () => Promise<any>;
  meta: {
    keepAlive: boolean;
    title: string;
    cacheStrategy: "always" | "conditional" | "never";
  };
}

export const navMenu: NavMenuItem[] = [
  {
    path: "/proxy-vs-defineproperty",
    name: "ProxyVsDefineProperty",
    label: "Proxy vs defineProperty",
    desc: "Vue3 为什么使用 Proxy API 替代 defineProperty - 交互式演示",
    component: () => import("../views/ProxyVsDefineProperty.vue"),
    meta: {
      keepAlive: true,
      title: "Proxy vs defineProperty",
      cacheStrategy: "always",
    },
  },
];

// 提取路由配置
const routes: RouteRecordRaw[] = navMenu.map((item) => ({
  path: item.path,
  name: item.name,
  component: item.component,
  meta: item.meta,
}));

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
