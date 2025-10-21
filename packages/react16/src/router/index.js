// 导航菜单配置
export const navMenu = [
  {
    path: "/test-demo",
    name: "TestDemo",
    label: "测试页面",
    desc: "React 测试页面 - 验证路由和基础功能",
    component: () => import("../views/TestDemo"),
  },
];

// 导出路由配置
export const routes = navMenu.map((item) => ({
  path: item.path,
  name: item.name,
  element: item.component,
}));

export default routes;

