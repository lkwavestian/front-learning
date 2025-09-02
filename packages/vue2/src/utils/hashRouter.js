/**
 * 手写SPA路由系统 - Hash模式
 * 通过监听URL的hash变化来实现路由跳转
 */

class HashRouter {
  constructor() {
    this.routes = new Map(); // 存储路由配置
    this.currentRoute = null; // 当前路由
    this.beforeHooks = []; // 路由前置守卫
    this.afterHooks = []; // 路由后置守卫

    // 初始化路由系统
    this.init();
  }

  /**
   * 初始化路由系统
   */
  init() {
    // 监听hashchange事件
    window.addEventListener("hashchange", this.handleHashChange.bind(this));

    // Hash 路由不需要监听 popstate（仅 history 模式需要）

    // 初始加载时处理当前hash
    this.handleHashChange();
  }

  /**
   * 添加路由配置
   * @param {string} path - 路由路径
   * @param {Object} config - 路由配置
   */
  addRoute(path, config) {
    this.routes.set(path, {
      path,
      component: config.component,
      name: config.name,
      meta: config.meta || {},
      beforeEnter: config.beforeEnter,
      ...config,
    });
  }

  /**
   * 批量添加路由
   * @param {Array} routes - 路由配置数组
   */
  addRoutes(routes) {
    routes.forEach((route) => {
      this.addRoute(route.path, route);
    });
  }

  /**
   * 处理hash变化
   */
  handleHashChange() {
    const hash = this.getHash();
    const path = hash === "" ? "/" : hash;

    console.log("Hash changed:", path);

    // 执行路由跳转
    this.navigateTo(path);
  }

  /**
   * 处理浏览器前进后退
   */
  // history 模式专用，Hash 路由无需该方法
  handlePopState() {}

  /**
   * 获取当前hash值
   * @returns {string}
   */
  getHash() {
    return window.location.hash.slice(1);
  }

  /**
   * 获取当前路径
   * @returns {string}
   */
  getCurrentPath() {
    return this.getHash() || "/";
  }

  /**
   * 导航到指定路径
   * @param {string} path - 目标路径
   * @param {Object} options - 导航选项
   */
  async navigateTo(path, options = {}) {
    const route = this.routes.get(path);

    if (!route) {
      console.warn(`Route not found: ${path}`);
      // 尝试匹配通配符路由
      const wildcardRoute = this.routes.get("*");
      if (wildcardRoute) {
        return this.navigateTo("*", options);
      }
      return;
    }

    // 执行前置守卫
    const canNavigate = await this.runBeforeHooks(route, options);
    if (!canNavigate) {
      return;
    }

    // 更新当前路由
    const previousRoute = this.currentRoute;
    this.currentRoute = route;

    // 执行路由组件的前置守卫
    if (route.beforeEnter) {
      const canEnter = await route.beforeEnter(route, previousRoute);
      if (!canEnter) {
        return;
      }
    }

    // 更新 URL（触发 hashchange 事件）
    if (!options.replace) {
      window.location.hash = path;
    } else {
      const url = `${window.location.origin}${window.location.pathname}${window.location.search}#${path}`;
      window.location.replace(url);
    }

    // 触发路由变化事件
    this.triggerRouteChange(route, previousRoute);

    // 执行后置守卫
    this.runAfterHooks(route, previousRoute);
  }

  /**
   * 路由跳转
   * @param {string} path - 目标路径
   */
  push(path) {
    this.navigateTo(path);
  }

  /**
   * 替换当前路由
   * @param {string} path - 目标路径
   */
  replace(path) {
    this.navigateTo(path, { replace: true });
  }

  /**
   * 返回上一页
   */
  back() {
    window.history.back();
  }

  /**
   * 前进到下一页
   */
  forward() {
    window.history.forward();
  }

  /**
   * 执行前置守卫
   * @param {Object} route - 目标路由
   * @param {Object} options - 导航选项
   * @returns {boolean}
   */
  async runBeforeHooks(route, options) {
    for (const hook of this.beforeHooks) {
      const result = await hook(route, this.currentRoute);
      if (result === false) {
        return false;
      }
    }
    return true;
  }

  /**
   * 执行后置守卫
   * @param {Object} route - 目标路由
   * @param {Object} previousRoute - 上一个路由
   */
  runAfterHooks(route, previousRoute) {
    this.afterHooks.forEach((hook) => {
      hook(route, previousRoute);
    });
  }

  /**
   * 添加全局前置守卫
   * @param {Function} hook - 守卫函数
   */
  beforeEach(hook) {
    this.beforeHooks.push(hook);
  }

  /**
   * 添加全局后置守卫
   * @param {Function} hook - 守卫函数
   */
  afterEach(hook) {
    this.afterHooks.push(hook);
  }

  /**
   * 触发路由变化事件
   * @param {Object} route - 当前路由
   * @param {Object} previousRoute - 上一个路由
   */
  triggerRouteChange(route, previousRoute) {
    // 创建自定义事件
    const event = new CustomEvent("router:change", {
      detail: {
        route,
        previousRoute,
        path: route.path,
      },
    });

    // 触发事件
    window.dispatchEvent(event);
  }

  /**
   * 获取所有路由配置
   * @returns {Array}
   */
  getRoutes() {
    return Array.from(this.routes.values());
  }

  /**
   * 获取当前路由
   * @returns {Object|null}
   */
  getCurrentRoute() {
    return this.currentRoute;
  }

  /**
   * 检查路由是否存在
   * @param {string} path - 路由路径
   * @returns {boolean}
   */
  hasRoute(path) {
    return this.routes.has(path);
  }

  /**
   * 销毁路由实例
   */
  destroy() {
    window.removeEventListener("hashchange", this.handleHashChange.bind(this));
    // 无需移除 popstate 监听（未注册）
    this.routes.clear();
    this.beforeHooks = [];
    this.afterHooks = [];
    this.currentRoute = null;
  }
}

// 创建路由实例
const hashRouter = new HashRouter();

// 导出路由实例和类
export { HashRouter, hashRouter };
export default hashRouter;
