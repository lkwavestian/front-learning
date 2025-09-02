<template>
  <div class="hash-router-demo">
    <div class="demo-header">
      <h3>🔗 手写SPA路由系统演示</h3>
      <p>基于Hash模式的路由实现，监听URL变化进行页面切换</p>
    </div>

    <!-- 路由导航 -->
    <div class="router-nav">
      <h4>路由导航</h4>
      <div class="nav-buttons">
        <button
          v-for="route in routes"
          :key="route.path"
          @click="navigateTo(route.path)"
          :class="['nav-btn', { active: currentPath === route.path }]"
        >
          {{ route.name }}
        </button>
      </div>
    </div>

    <!-- 当前路由信息 -->
    <div class="route-info">
      <h4>当前路由信息</h4>
      <div class="info-grid">
        <div class="info-item">
          <strong>当前路径：</strong>
          <span class="path">{{ currentPath }}</span>
        </div>
        <div class="info-item">
          <strong>Hash值：</strong>
          <span class="hash">#{{ currentPath }}</span>
        </div>
        <div class="info-item">
          <strong>路由名称：</strong>
          <span class="name">{{ currentRoute?.name || "未知" }}</span>
        </div>
        <div class="info-item">
          <strong>组件：</strong>
          <span class="component">{{ currentRoute?.component?.name || "未知" }}</span>
        </div>
      </div>
    </div>

    <!-- 路由内容展示区域 -->
    <div class="router-view">
      <h4>路由内容</h4>
      <div class="content-container">
        <component v-if="currentRoute" :is="currentRoute.component" :key="currentPath" />
        <div v-else class="no-route">
          <p>❌ 未找到对应的路由组件</p>
          <p>当前路径: {{ currentPath }}</p>
        </div>
      </div>
    </div>

    <!-- 路由操作 -->
    <div class="router-actions">
      <h4>路由操作</h4>
      <div class="action-buttons">
        <button @click="goBack" class="action-btn">⬅️ 后退</button>
        <button @click="goForward" class="action-btn">➡️ 前进</button>
        <button @click="refreshRoute" class="action-btn">🔄 刷新路由</button>
        <button @click="showRouteInfo" class="action-btn">ℹ️ 显示路由信息</button>
      </div>
    </div>

    <!-- 路由历史 -->
    <div class="route-history">
      <h4>路由历史</h4>
      <div class="history-list">
        <div
          v-for="(item, index) in routeHistory"
          :key="index"
          class="history-item"
          :class="{ current: index === routeHistory.length - 1 }"
        >
          <span class="index">{{ index + 1 }}</span>
          <span class="path">{{ item.path }}</span>
          <span class="name">{{ item.name }}</span>
          <span class="time">{{ item.time }}</span>
        </div>
      </div>
    </div>

    <!-- 路由守卫演示 -->
    <div class="route-guards">
      <h4>路由守卫演示</h4>
      <div class="guard-demo">
        <div class="guard-item">
          <label>
            <input type="checkbox" v-model="enableBeforeGuard" @change="toggleBeforeGuard" />
            启用前置守卫（阻止访问 /protected）
          </label>
        </div>
        <div class="guard-item">
          <label>
            <input type="checkbox" v-model="enableAfterGuard" @change="toggleAfterGuard" />
            启用后置守卫（记录路由变化）
          </label>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import hashRouter from "../utils/hashRouter.js";

// 演示组件 - 使用render函数避免模板编译问题
const HomeComponent = {
  name: "HomeComponent",
  render(h) {
    return h("div", { class: "demo-component home" }, [
      h("h3", "🏠 首页"),
      h("p", "这是首页组件，展示了手写路由系统的基本功能。"),
      h("ul", [
        h("li", "路径: /"),
        h("li", "Hash: #/"),
        h("li", "组件: HomeComponent"),
        h("li", "特点: 默认路由"),
      ]),
    ]);
  },
};

const AboutComponent = {
  name: "AboutComponent",
  render(h) {
    return h("div", { class: "demo-component about" }, [
      h("h3", "📋 关于页面"),
      h("p", "这是关于页面，演示了路由切换功能。"),
      h("ul", [
        h("li", "路径: /about"),
        h("li", "Hash: #/about"),
        h("li", "组件: AboutComponent"),
        h("li", "特点: 普通路由"),
      ]),
    ]);
  },
};

const ContactComponent = {
  name: "ContactComponent",
  render(h) {
    return h("div", { class: "demo-component contact" }, [
      h("h3", "📞 联系我们"),
      h("p", "联系页面展示了路由参数传递。"),
      h("ul", [
        h("li", "路径: /contact"),
        h("li", "Hash: #/contact"),
        h("li", "组件: ContactComponent"),
        h("li", "特点: 联系信息"),
      ]),
    ]);
  },
};

const ProtectedComponent = {
  name: "ProtectedComponent",
  render(h) {
    return h("div", { class: "demo-component protected" }, [
      h("h3", "🔒 受保护页面"),
      h("p", "这是一个受保护的页面，需要权限才能访问。"),
      h("ul", [
        h("li", "路径: /protected"),
        h("li", "Hash: #/protected"),
        h("li", "组件: ProtectedComponent"),
        h("li", "特点: 需要权限"),
      ]),
      h("div", { class: "warning" }, "⚠️ 如果启用了前置守卫，访问此页面会被阻止"),
    ]);
  },
};

const NotFoundComponent = {
  name: "NotFoundComponent",
  render(h) {
    return h("div", { class: "demo-component not-found" }, [
      h("h3", "❌ 页面未找到"),
      h("p", "抱歉，您访问的页面不存在。"),
      h("ul", [
        h("li", "路径: 任意未定义路径"),
        h("li", "组件: NotFoundComponent"),
        h("li", "特点: 404页面"),
      ]),
    ]);
  },
};

export default {
  name: "HashRouterDemo",
  components: {
    HomeComponent,
    AboutComponent,
    ContactComponent,
    ProtectedComponent,
    NotFoundComponent,
  },
  data() {
    return {
      currentPath: "/",
      currentRoute: null,
      routeHistory: [],
      enableBeforeGuard: false,
      enableAfterGuard: false,
      routes: [
        { path: "/", name: "首页", component: "HomeComponent" },
        { path: "/about", name: "关于", component: "AboutComponent" },
        { path: "/contact", name: "联系", component: "ContactComponent" },
        { path: "/protected", name: "受保护页面", component: "ProtectedComponent" },
        { path: "*", name: "404页面", component: "NotFoundComponent" },
      ],
    };
  },
  mounted() {
    this.initRouter();
    this.setupEventListeners();
  },
  beforeDestroy() {
    this.removeEventListeners();
  },
  methods: {
    /**
     * 初始化路由系统
     */
    initRouter() {
      // 添加路由配置
      this.routes.forEach((route) => {
        hashRouter.addRoute(route.path, {
          name: route.name,
          component: this.$options.components[route.component],
          meta: { demo: true },
        });
      });

      // 添加受保护路由的前置守卫
      hashRouter.addRoute("/protected", {
        name: "受保护页面",
        component: this.$options.components.ProtectedComponent,
        beforeEnter: (to, from) => {
          if (this.enableBeforeGuard) {
            alert("前置守卫阻止了访问！");
            return false;
          }
          return true;
        },
      });

      // 更新当前路由信息
      this.updateCurrentRoute();
    },

    /**
     * 设置事件监听
     */
    setupEventListeners() {
      // 监听路由变化
      window.addEventListener("router:change", this.handleRouteChange);

      // 监听hash变化
      window.addEventListener("hashchange", this.handleHashChange);
    },

    /**
     * 移除事件监听
     */
    removeEventListeners() {
      window.removeEventListener("router:change", this.handleRouteChange);
      window.removeEventListener("hashchange", this.handleHashChange);
    },

    /**
     * 处理路由变化
     */
    handleRouteChange(event) {
      const { route, previousRoute } = event.detail;
      this.updateCurrentRoute();
      this.addToHistory(route);

      console.log("路由变化:", {
        from: previousRoute?.path,
        to: route.path,
        route: route.name,
      });
    },

    /**
     * 处理hash变化
     */
    handleHashChange() {
      this.updateCurrentRoute();
    },

    /**
     * 更新当前路由信息
     */
    updateCurrentRoute() {
      this.currentPath = hashRouter.getCurrentPath();
      this.currentRoute = hashRouter.getCurrentRoute();
    },

    /**
     * 导航到指定路径
     */
    navigateTo(path) {
      hashRouter.push(path);
    },

    /**
     * 返回上一页
     */
    goBack() {
      hashRouter.back();
    },

    /**
     * 前进到下一页
     */
    goForward() {
      hashRouter.forward();
    },

    /**
     * 刷新当前路由
     */
    refreshRoute() {
      const currentPath = this.currentPath;
      hashRouter.replace(currentPath);
    },

    /**
     * 显示路由信息
     */
    showRouteInfo() {
      const info = {
        currentPath: this.currentPath,
        currentRoute: this.currentRoute,
        allRoutes: hashRouter.getRoutes(),
        history: this.routeHistory,
      };

      console.log("路由信息:", info);
      alert(`当前路径: ${this.currentPath}\n路由名称: ${this.currentRoute?.name || "未知"}`);
    },

    /**
     * 添加到路由历史
     */
    addToHistory(route) {
      const historyItem = {
        path: route.path,
        name: route.name,
        time: new Date().toLocaleTimeString(),
      };

      this.routeHistory.push(historyItem);

      // 限制历史记录数量
      if (this.routeHistory.length > 10) {
        this.routeHistory.shift();
      }
    },

    /**
     * 切换前置守卫
     */
    toggleBeforeGuard() {
      if (this.enableBeforeGuard) {
        console.log("前置守卫已启用");
      } else {
        console.log("前置守卫已禁用");
      }
    },

    /**
     * 切换后置守卫
     */
    toggleAfterGuard() {
      if (this.enableAfterGuard) {
        hashRouter.afterEach((to, from) => {
          console.log("后置守卫触发:", {
            from: from?.path,
            to: to.path,
          });
        });
        console.log("后置守卫已启用");
      } else {
        console.log("后置守卫已禁用");
      }
    },
  },
};
</script>

<style scoped>
.hash-router-demo {
  max-width: 1000px;
  margin: 0 auto;
  padding: 20px;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
}

.demo-header {
  text-align: center;
  margin-bottom: 30px;
  padding: 20px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-radius: 10px;
}

.demo-header h3 {
  margin: 0 0 10px 0;
  font-size: 1.5rem;
}

.demo-header p {
  margin: 0;
  opacity: 0.9;
}

.router-nav,
.route-info,
.router-view,
.router-actions,
.route-history,
.route-guards {
  margin-bottom: 25px;
  padding: 20px;
  background: #f8f9fa;
  border-radius: 8px;
  border-left: 4px solid #007bff;
}

.router-nav h4,
.route-info h4,
.router-view h4,
.router-actions h4,
.route-history h4,
.route-guards h4 {
  margin: 0 0 15px 0;
  color: #2c3e50;
  font-size: 1.2rem;
}

.nav-buttons {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.nav-btn {
  padding: 8px 16px;
  border: 2px solid #007bff;
  background: white;
  color: #007bff;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 0.9rem;
}

.nav-btn:hover {
  background: #007bff;
  color: white;
}

.nav-btn.active {
  background: #007bff;
  color: white;
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 15px;
}

.info-item {
  padding: 10px;
  background: white;
  border-radius: 6px;
  border-left: 3px solid #28a745;
}

.info-item strong {
  color: #2c3e50;
  display: block;
  margin-bottom: 5px;
}

.path,
.hash,
.name,
.component {
  color: #007bff;
  font-weight: 500;
}

.content-container {
  background: white;
  border-radius: 6px;
  padding: 20px;
  min-height: 200px;
}

.demo-component {
  padding: 20px;
  background: #f8f9fa;
  border-radius: 6px;
  border-left: 4px solid #28a745;
}

.demo-component h3 {
  margin: 0 0 15px 0;
  color: #2c3e50;
}

.demo-component p {
  margin: 0 0 15px 0;
  color: #555;
  line-height: 1.6;
}

.demo-component ul {
  padding-left: 20px;
  color: #555;
}

.demo-component li {
  margin-bottom: 5px;
}

.warning {
  margin-top: 15px;
  padding: 10px;
  background: #fff3cd;
  border: 1px solid #ffeaa7;
  border-radius: 4px;
  color: #856404;
}

.no-route {
  text-align: center;
  padding: 40px;
  color: #dc3545;
}

.action-buttons {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.action-btn {
  padding: 8px 16px;
  border: 2px solid #28a745;
  background: white;
  color: #28a745;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 0.9rem;
}

.action-btn:hover {
  background: #28a745;
  color: white;
}

.history-list {
  max-height: 200px;
  overflow-y: auto;
}

.history-item {
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 8px 12px;
  background: white;
  border-radius: 4px;
  margin-bottom: 5px;
  border-left: 3px solid #6c757d;
}

.history-item.current {
  border-left-color: #007bff;
  background: #e3f2fd;
}

.index {
  width: 20px;
  height: 20px;
  background: #6c757d;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.8rem;
  font-weight: bold;
}

.history-item.current .index {
  background: #007bff;
}

.path {
  flex: 1;
  font-weight: 500;
  color: #2c3e50;
}

.name {
  flex: 1;
  color: #555;
}

.time {
  color: #6c757d;
  font-size: 0.8rem;
}

.guard-demo {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.guard-item {
  padding: 10px;
  background: white;
  border-radius: 6px;
}

.guard-item label {
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  color: #2c3e50;
}

.guard-item input[type="checkbox"] {
  width: 18px;
  height: 18px;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .hash-router-demo {
    padding: 15px;
  }

  .nav-buttons {
    flex-direction: column;
  }

  .nav-btn {
    text-align: center;
  }

  .info-grid {
    grid-template-columns: 1fr;
  }

  .action-buttons {
    flex-direction: column;
  }

  .action-btn {
    text-align: center;
  }

  .history-item {
    flex-direction: column;
    align-items: flex-start;
    gap: 5px;
  }

  .index {
    align-self: flex-start;
  }
}
</style>
