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
];

// 导出路由配置
export const routes = navMenu.map((item) => ({
  path: item.path,
  name: item.name,
  element: item.component,
}));

export default routes;
