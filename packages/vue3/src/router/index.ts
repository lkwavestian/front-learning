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
    path: "/test-demo",
    name: "TestDemo",
    label: "测试页面",
    desc: "Vue3 测试页面 - 验证路由和基础功能",
    component: () => import("../views/TestDemo.vue"),
    meta: {
      keepAlive: true,
      title: "测试页面",
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
