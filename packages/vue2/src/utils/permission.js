import axios from "axios";

// 注意：在实际项目中，这些导入需要根据项目结构进行调整
// import router from '../router'
// import store from '../store'

// 临时模拟store和router，实际使用时请替换为真实的导入
const mockStore = {
  getters: {
    userPermissions: ["user:view", "user:add", "user:edit"],
    userRoles: ["user"],
  },
};

const mockRouter = {
  push: (path) => console.log(`路由跳转到: ${path}`),
};

// 使用模拟对象或实际导入
const store = mockStore;
const router = mockRouter;

/**
 * Vue2 权限管理系统
 * 包含接口权限、按钮权限、菜单权限、路由权限的完整实现
 */

// ==================== 接口权限管理 ====================

/**
 * 接口权限拦截器
 * 在请求发送前检查用户是否有权限访问该接口
 */
export const setupApiPermission = () => {
  // 添加请求拦截器
  axios.interceptors.request.use(
    (config) => {
      // 检查接口权限
      const hasPermission = checkApiPermission(config.url, config.method);
      if (!hasPermission) {
        return Promise.reject(new Error("没有权限访问该接口"));
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // 添加响应拦截器
  axios.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error.response && error.response.status === 403) {
        // 权限不足，跳转到无权限页面
        router.push("/no-permission");
      }
      return Promise.reject(error);
    }
  );
};

/**
 * 检查接口权限
 * @param {string} url - 接口地址
 * @param {string} method - 请求方法
 * @returns {boolean} 是否有权限
 */
export const checkApiPermission = (url, method) => {
  const userPermissions = store.getters.userPermissions || [];
  const apiKey = `${method.toUpperCase()}:${url}`;

  // 检查用户是否有该接口的权限
  return userPermissions.includes(apiKey) || userPermissions.includes("*:*");
};

/**
 * 获取用户接口权限列表
 * @returns {Promise<Array>} 权限列表
 */
export const getUserApiPermissions = async () => {
  try {
    const response = await axios.get("/api/user/permissions");
    return response.data.permissions || [];
  } catch (error) {
    console.error("获取用户权限失败:", error);
    return [];
  }
};

// ==================== 按钮权限管理 ====================

/**
 * 按钮权限指令
 * 使用方式：v-has-permission="'user:add'"
 */
export const hasPermission = {
  inserted(el, binding, vnode) {
    const { value } = binding;
    console.log("value", value);
    // 从组件实例获取权限
    const component = vnode.context;
    if (component && component.$hasPermission) {
      if (value && !component.$hasPermission(value)) {
        // 没有权限，隐藏按钮
        el.parentNode && el.parentNode.removeChild(el);
      }
    }
  },
  update(el, binding, vnode) {
    // 当权限更新时重新检查
    const { value } = binding;
    const component = vnode.context;
    if (component && component.$hasPermission) {
      if (value && !component.$hasPermission(value)) {
        // 没有权限，隐藏按钮
        if (el.parentNode && el.parentNode.contains(el)) {
          el.parentNode.removeChild(el);
        }
      }
    }
  },
};

/**
 * 检查按钮权限
 * @param {string} permission - 权限标识
 * @param {Array} userPermissions - 用户权限列表
 * @returns {boolean} 是否有权限
 */
export const hasButtonPermission = (permission, userPermissions) => {
  if (!permission) return true;
  if (userPermissions.includes("*:*")) return true;

  return userPermissions.includes(permission);
};

/**
 * 按钮权限混入
 * 可以在组件中使用 this.$hasPermission('user:add') 检查权限
 */
export const permissionMixin = {
  data() {
    return {
      // 默认权限配置
      rolePermissions: {
        guest: ["user:view"],
        user: ["user:view", "user:add", "user:edit"],
        manager: ["user:view", "user:add", "user:edit", "user:delete"],
        admin: ["user:view", "user:add", "user:edit", "user:delete", "system:config", "*:*"],
      },
    };
  },
  methods: {
    $hasPermission(permission) {
      // 从组件实例获取当前角色，如果没有则使用默认权限
      const currentRole = this.currentRole || "user";
      const userPermissions = this.rolePermissions[currentRole] || [];
      return hasButtonPermission(permission, userPermissions);
    },
  },
};

// ==================== 菜单权限管理 ====================

/**
 * 过滤有权限的菜单
 * @param {Array} menus - 原始菜单数据
 * @param {Array} userPermissions - 用户权限列表
 * @returns {Array} 过滤后的菜单
 */
export const filterMenusByPermission = (menus, userPermissions) => {
  if (!menus || !Array.isArray(menus)) return [];

  return menus.filter((menu) => {
    // 检查菜单权限
    if (menu.permission && !hasButtonPermission(menu.permission, userPermissions)) {
      return false;
    }

    // 递归处理子菜单
    if (menu.children && menu.children.length > 0) {
      menu.children = filterMenusByPermission(menu.children, userPermissions);
      // 如果子菜单都被过滤掉了，也隐藏父菜单
      return menu.children.length > 0;
    }

    return true;
  });
};

/**
 * 生成动态菜单
 * @param {Array} userPermissions - 用户权限列表
 * @returns {Array} 动态菜单
 */
export const generateDynamicMenus = async (userPermissions) => {
  try {
    // 从服务器获取菜单配置
    const response = await axios.get("/api/menus");
    const allMenus = response.data.menus || [];

    // 根据权限过滤菜单
    return filterMenusByPermission(allMenus, userPermissions);
  } catch (error) {
    console.error("获取菜单失败:", error);
    return [];
  }
};

// ==================== 路由权限管理 ====================

/**
 * 路由权限守卫
 * 在路由跳转前检查用户是否有权限访问该页面
 */
export const setupRoutePermission = () => {
  router.beforeEach(async (to, from, next) => {
    // 白名单路由，不需要权限验证
    const whiteList = ["/login", "/register", "/404", "/no-permission"];
    if (whiteList.includes(to.path)) {
      next();
      return;
    }

    // 检查用户是否已登录
    const token = localStorage.getItem("token");
    if (!token) {
      next("/login");
      return;
    }

    // 检查用户权限是否已加载
    const userPermissions = store.getters.userPermissions;
    if (!userPermissions || userPermissions.length === 0) {
      try {
        // 获取用户权限
        await store.dispatch("getUserPermissions");
      } catch (error) {
        console.error("获取用户权限失败:", error);
        next("/login");
        return;
      }
    }

    // 检查路由权限
    if (to.meta && to.meta.permission) {
      const hasPermission = hasButtonPermission(to.meta.permission, store.getters.userPermissions);
      if (!hasPermission) {
        next("/no-permission");
        return;
      }
    }

    next();
  });
};

/**
 * 动态添加路由
 * 根据用户权限动态添加可访问的路由
 * @param {Array} userPermissions - 用户权限列表
 */
export const addDynamicRoutes = async (userPermissions) => {
  try {
    // 获取动态路由配置
    const response = await axios.get("/api/routes");
    const dynamicRoutes = response.data.routes || [];

    // 根据权限过滤路由
    const allowedRoutes = filterRoutesByPermission(dynamicRoutes, userPermissions);

    // 添加动态路由
    allowedRoutes.forEach((route) => {
      router.addRoute(route);
    });

    return allowedRoutes;
  } catch (error) {
    console.error("添加动态路由失败:", error);
    return [];
  }
};

/**
 * 过滤有权限的路由
 * @param {Array} routes - 路由配置
 * @param {Array} userPermissions - 用户权限列表
 * @returns {Array} 过滤后的路由
 */
export const filterRoutesByPermission = (routes, userPermissions) => {
  if (!routes || !Array.isArray(routes)) return [];

  return routes.filter((route) => {
    // 检查路由权限
    if (route.meta && route.meta.permission) {
      if (!hasButtonPermission(route.meta.permission, userPermissions)) {
        return false;
      }
    }

    // 递归处理子路由
    if (route.children && route.children.length > 0) {
      route.children = filterRoutesByPermission(route.children, userPermissions);
    }

    return true;
  });
};

// ==================== 权限工具函数 ====================

/**
 * 检查用户是否有任意一个权限
 * @param {Array} permissions - 权限列表
 * @param {Array} userPermissions - 用户权限列表
 * @returns {boolean} 是否有权限
 */
export const hasAnyPermission = (permissions, userPermissions) => {
  if (!permissions || !Array.isArray(permissions)) return false;
  if (userPermissions.includes("*:*")) return true;

  return permissions.some((permission) => userPermissions.includes(permission));
};

/**
 * 检查用户是否有所有权限
 * @param {Array} permissions - 权限列表
 * @param {Array} userPermissions - 用户权限列表
 * @returns {boolean} 是否有权限
 */
export const hasAllPermissions = (permissions, userPermissions) => {
  if (!permissions || !Array.isArray(permissions)) return false;
  if (userPermissions.includes("*:*")) return true;

  return permissions.every((permission) => userPermissions.includes(permission));
};

/**
 * 获取用户角色
 * @returns {Array} 用户角色列表
 */
export const getUserRoles = () => {
  return store.getters.userRoles || [];
};

/**
 * 检查用户是否有指定角色
 * @param {string|Array} roles - 角色或角色列表
 * @returns {boolean} 是否有角色
 */
export const hasRole = (roles) => {
  const userRoles = getUserRoles();

  if (typeof roles === "string") {
    return userRoles.includes(roles);
  }

  if (Array.isArray(roles)) {
    return roles.some((role) => userRoles.includes(role));
  }

  return false;
};

/**
 * 权限管理初始化
 * 在应用启动时调用
 */
export const initPermission = () => {
  // 设置接口权限拦截器
  setupApiPermission();

  // 设置路由权限守卫
  setupRoutePermission();

  // 注册按钮权限指令
  if (window.Vue) {
    window.Vue.directive("has-permission", hasPermission);
  }
};

// 导出所有权限相关的方法
export default {
  // 接口权限
  setupApiPermission,
  checkApiPermission,
  getUserApiPermissions,

  // 按钮权限
  hasPermission,
  hasButtonPermission,
  permissionMixin,

  // 菜单权限
  filterMenusByPermission,
  generateDynamicMenus,

  // 路由权限
  setupRoutePermission,
  addDynamicRoutes,
  filterRoutesByPermission,

  // 工具函数
  hasAnyPermission,
  hasAllPermissions,
  getUserRoles,
  hasRole,

  // 初始化
  initPermission,
};
