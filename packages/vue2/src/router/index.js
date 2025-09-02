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
    meta: {
      keepAlive: true,
      title: "Vuex 测试",
      cacheStrategy: "conditional", // 条件缓存
    },
  },
  {
    path: "/data-test",
    name: "DataTest",
    label: "Data",
    desc: "为什么 Vue2 中的 data 属性是一个函数？",
    component: () => import("../views/FndataOrObjdata.vue"),
    meta: {
      keepAlive: false,
      title: "Data 属性详解",
      cacheStrategy: "never", // 不缓存
    },
  },
  {
    path: "/dynamic-data",
    name: "DynamicData",
    label: "Data",
    desc: "动态添加 data 属性的响应式行为",
    component: () => import("../views/dynamicData.vue"),
    meta: {
      keepAlive: true,
      title: "动态 Data",
      cacheStrategy: "conditional",
    },
  },
  {
    path: "/mixin-test",
    name: "MixinTest",
    label: "Mixin",
    desc: "vue2的mixin的理解与应⽤场景",
    component: () => import("../views/MixinText.vue"),
    meta: {
      keepAlive: true,
      title: "Mixin 详解",
      cacheStrategy: "always",
    },
  },
  {
    path: "/modifiers-demo",
    name: "ModifiersDemo",
    label: "Modifiers",
    desc: "Vue2 常用修饰符与自定义指令 v-debounce",
    component: () => import("../views/ModifiersDemo.vue"),
    meta: {
      keepAlive: false,
      title: "修饰符详解",
      cacheStrategy: "never",
    },
  },
  {
    path: "/nexttick-demo",
    name: "NextTickDemo",
    label: "NextTick",
    desc: "Vue $nextTick 详解：作用、用法与原理",
    component: () => import("../views/NextTickDemo.vue"),
    meta: {
      keepAlive: true,
      title: "NextTick 详解",
      cacheStrategy: "conditional",
    },
  },
  {
    path: "/component-vs-plugin",
    name: "ComponentVsPlugin",
    label: "Component vs Plugin",
    desc: "Vue2 组件和插件的区别详解",
    component: () => import("../views/ComponentVsPlugin.vue"),
    meta: {
      keepAlive: true,
      title: "组件 vs 插件",
      cacheStrategy: "always",
    },
  },
  {
    path: "/slot-demo",
    name: "SlotDemo",
    label: "Slot",
    desc: "Vue2 插槽的分类、使用场景与实战例子",
    component: () => import("../views/SlotDemo.vue"),
    meta: {
      keepAlive: true,
      title: "插槽详解",
      cacheStrategy: "conditional",
    },
  },
  {
    path: "/axios-demo",
    name: "AxiosDemo",
    label: "Axios",
    desc: "Vue2 项目中 Axios 的特性、与 Fetch 对比及二次封装",
    component: () => import("../views/axiosDemo.vue"),
    meta: {
      keepAlive: true,
      title: "Axios 详解",
      cacheStrategy: "always",
    },
  },
  {
    path: "/permission-demo",
    name: "PermissionDemo",
    label: "权限管理",
    desc: "Vue2 权限管理系统详解：接口权限、按钮权限、菜单权限、路由权限",
    component: () => import("../views/permissionDemo.vue"),
    meta: {
      keepAlive: true,
      title: "权限管理详解",
      cacheStrategy: "conditional",
    },
  },
  {
    path: "/keep-alive-demo",
    name: "KeepAliveDemo",
    label: "Keep-Alive",
    desc: "Vue2 Keep-Alive 详解：组件缓存机制、使用场景与实战应用",
    component: () => import("../views/keepAliveDemo.vue"),
    meta: {
      keepAlive: true,
      title: "Keep-Alive 详解",
      cacheStrategy: "always", // 可选值: always, conditional, never
    },
  },
  {
    path: "/spa-demo",
    name: "SPADemo",
    label: "SPA 单页面应用",
    desc: "SPA单页面应用详解：概念、优缺点、与MPA区别及实现方式",
    component: () => import("../views/spaDemo.vue"),
    meta: {
      keepAlive: true,
      title: "SPA 单页面应用详解",
      cacheStrategy: "always",
    },
  },
];

// 提取路由配置
const routes = navMenu.map((item) => ({
  path: item.path,
  name: item.name,
  component: item.component,
  props: item.props || {},
  meta: item.meta,
}));

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
