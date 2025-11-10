// 导航菜单配置
export const navMenu = [
  {
    path: "/controlled-vs-uncontrolled",
    name: "ControlledVsUncontrolled",
    label: "受控 vs 非受控组件",
    desc: "深入理解 React 受控组件与非受控组件的区别、使用场景与最佳实践",
    component: () => import("../views/ControlledVsUncontrolled"),
  },
  {
    path: "/react-event-system",
    name: "ReactEventSystem",
    label: "React 事件机制",
    desc: "深入理解 React 合成事件、事件委托、事件冒泡捕获与最佳实践",
    component: () => import("../views/ReactEventSystem"),
  },
  {
    path: "/component-types",
    name: "ComponentTypes",
    label: "组件创建方式",
    desc: "对比函数组件、createClass 和 Class Component 三种创建方式的异同",
    component: () => import("../views/ComponentTypes"),
  },
  {
    path: "/css-introduction",
    name: "CSSIntroduction",
    label: "CSS 引入方式",
    desc: "详解六种 React CSS 样式引入方式，对比优缺点和适用场景",
    component: () => import("../views/CSSIntroduction"),
  },
  {
    path: "/react-lifecycle",
    name: "ReactLifecycle",
    label: "React 生命周期",
    desc: "深入理解 React 16.4+ 类组件生命周期三个阶段与 Hooks 对比",
    component: () => import("../views/ReactLifecycle"),
  },
  {
    path: "/component-communication",
    name: "ComponentCommunication",
    label: "组件通信",
    desc: "全面掌握 React 六种组件通信方式：Props、Context、回调、Ref、状态提升、自定义 Hooks",
    component: () => import("../views/ComponentCommunication"),
  },
  {
    path: "/higher-order-component",
    name: "HigherOrderComponent",
    label: "高阶组件",
    desc: "深入理解高阶组件 (HOC) 的概念、实现与实际应用场景，学习代码复用高级技巧",
    component: () => import("../views/HigherOrderComponent"),
  },
  {
    path: "/error-handling",
    name: "ReactErrorHandling",
    label: "错误处理",
    desc: "全面掌握 React 项目中错误捕获的六种方法：Error Boundary、try-catch、Promise、全局监听等",
    component: () => import("../views/ReactErrorHandling"),
  },
];

// 导出路由配置
export const routes = navMenu.map((item) => ({
  path: item.path,
  name: item.name,
  element: item.component,
}));

export default routes;
