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
  {
    path: "/data-test",
    name: "DataTest",
    label: "Data",
    desc: "为什么 Vue2 中的 data 属性是一个函数？",
    component: () => import("../views/FndataOrObjdata.vue"),
  },
  {
    path: "/dynamic-data",
    name: "DynamicData",
    label: "Data",
    desc: "动态添加 data 属性的响应式行为",
    component: () => import("../views/dynamicData.vue"),
  },
  {
    path: "/mixin-test",
    name: "MixinTest",
    label: "Mixin",
    desc: "vue2的mixin的理解与应⽤场景",
    component: () => import("../views/MixinText.vue"),
  },
  {
    path: "/modifiers-demo",
    name: "ModifiersDemo",
    label: "Modifiers",
    desc: "Vue2 常用修饰符与自定义指令 v-debounce",
    component: () => import("../views/ModifiersDemo.vue"),
  },
  {
    path: "/nexttick-demo",
    name: "NextTickDemo",
    label: "NextTick",
    desc: "Vue $nextTick 详解：作用、用法与原理",
    component: () => import("../views/NextTickDemo.vue"),
  },
  {
    path: "/component-vs-plugin",
    name: "ComponentVsPlugin",
    label: "Component vs Plugin",
    desc: "Vue2 组件和插件的区别详解",
    component: () => import("../views/ComponentVsPlugin.vue"),
  },
  {
    path: "/slot-demo",
    name: "SlotDemo",
    label: "Slot",
    desc: "Vue2 插槽的分类、使用场景与实战例子",
    component: () => import("../views/SlotDemo.vue"),
  },
  {
    path: "/axios-demo",
    name: "AxiosDemo",
    label: "Axios",
    desc: "Vue2 项目中 Axios 的特性、与 Fetch 对比及二次封装",
    component: () => import("../views/axiosDemo.vue"),
  },
  {
    path: "/permission-demo",
    name: "PermissionDemo",
    label: "权限管理",
    desc: "Vue2 权限管理系统详解：接口权限、按钮权限、菜单权限、路由权限",
    component: () => import("../views/permissionDemo.vue"),
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
