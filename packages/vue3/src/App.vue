<template>
  <div id="app">
    <!-- 页面头部 -->
    <header class="header">
      <div class="header-container">
        <div class="brand">
          <img alt="Vue logo" src="./assets/vue.svg" class="logo" />
          <span class="brand-text">Vue3 学习项目</span>
        </div>
      </div>
    </header>

    <!-- 主内容区域 -->
    <main class="main-content">
      <!-- 路由列表页面 -->
      <div class="route-list-page" v-if="route.path === '/'">
        <div class="welcome-section">
          <h1>欢迎来到 Vue3 学习项目</h1>
          <p>这是一个专门用于学习 Vue.js 3.x 的项目，包含了 Vue3 的核心功能演示。</p>
        </div>

        <div class="route-grid">
          <div
            v-for="item in navMenu"
            :key="item.name"
            class="route-card"
            @click="navigateTo(item.path)"
          >
            <div class="card-icon">
              <span class="icon-text">{{ item.label.charAt(0) }}</span>
            </div>
            <div class="card-content">
              <h3>{{ item.label }}</h3>
              <p>{{ item.desc }}</p>
            </div>
            <div class="card-arrow">
              <span>→</span>
            </div>
          </div>
        </div>
      </div>

      <!-- 其他页面内容 -->
      <router-view v-else v-slot="{ Component }">
        <keep-alive :include="cachedComponents" :exclude="excludedComponents">
          <component :is="Component" />
        </keep-alive>
      </router-view>
    </main>

    <!-- 页脚 -->
    <footer class="footer">
      <p>&copy; 2025 Vue3 学习项目. 使用 Vue.js {{ vueVersion }} 构建</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, version } from "vue";
import { useRoute, useRouter } from "vue-router";
import { navMenu } from "./router";

const route = useRoute();
const router = useRouter();
const vueVersion = version;

const cachedComponents = ref<string[]>([]);
const excludedComponents = ref<string[]>([]);

const navigateTo = (path: string) => {
  router.push(path);
};

// 根据路由元信息更新缓存策略
const updateCacheStrategy = (currentRoute: typeof route) => {
  if (currentRoute.meta && currentRoute.meta.keepAlive !== undefined) {
    const componentName = currentRoute.name as string;

    if (currentRoute.meta.keepAlive === false) {
      // 不缓存：添加到排除列表
      if (!excludedComponents.value.includes(componentName)) {
        excludedComponents.value.push(componentName);
      }
      // 从缓存列表中移除
      cachedComponents.value = cachedComponents.value.filter((name) => name !== componentName);
    } else if (currentRoute.meta.cacheStrategy === "always") {
      // 总是缓存：添加到缓存列表
      if (!cachedComponents.value.includes(componentName)) {
        cachedComponents.value.push(componentName);
      }
      // 从排除列表中移除
      excludedComponents.value = excludedComponents.value.filter((name) => name !== componentName);
    } else if (currentRoute.meta.cacheStrategy === "conditional") {
      // 条件缓存：根据具体条件决定
      handleConditionalCache(currentRoute, componentName);
    }
  }
};

// 处理条件缓存逻辑
const handleConditionalCache = (currentRoute: typeof route, componentName: string) => {
  const shouldCache = shouldCacheComponent(currentRoute, componentName);

  if (shouldCache) {
    if (!cachedComponents.value.includes(componentName)) {
      cachedComponents.value.push(componentName);
    }
    excludedComponents.value = excludedComponents.value.filter((name) => name !== componentName);
  } else {
    if (!excludedComponents.value.includes(componentName)) {
      excludedComponents.value.push(componentName);
    }
    cachedComponents.value = cachedComponents.value.filter((name) => name !== componentName);
  }
};

// 判断组件是否应该被缓存（条件缓存逻辑）
const shouldCacheComponent = (currentRoute: typeof route, componentName: string): boolean => {
  // 1. 根据路由参数判断
  if (currentRoute.params && currentRoute.params.id) {
    return true;
  }

  // 2. 根据查询参数判断
  if (currentRoute.query && currentRoute.query.cache === "true") {
    return true;
  }

  // 3. 根据用户权限判断（示例）
  const userRole = localStorage.getItem("userRole") || "guest";
  if (userRole === "admin" && componentName.includes("Admin")) {
    return true;
  }

  // 4. 默认策略：条件缓存的组件默认不缓存，除非有特殊条件
  return false;
};

// 手动控制组件缓存
const toggleComponentCache = (componentName: string, shouldCache: boolean) => {
  if (shouldCache) {
    if (!cachedComponents.value.includes(componentName)) {
      cachedComponents.value.push(componentName);
    }
    excludedComponents.value = excludedComponents.value.filter((name) => name !== componentName);
  } else {
    if (!excludedComponents.value.includes(componentName)) {
      excludedComponents.value.push(componentName);
    }
    cachedComponents.value = cachedComponents.value.filter((name) => name !== componentName);
  }
};

// 清空所有缓存
const clearAllCache = () => {
  cachedComponents.value = [];
  excludedComponents.value = [];
};

// 获取当前缓存状态
const getCacheStatus = () => {
  return {
    cached: [...cachedComponents.value],
    excluded: [...excludedComponents.value],
    total: cachedComponents.value.length + excludedComponents.value.length,
  };
};

// 监听路由变化，自动更新缓存策略
watch(
  () => route.path,
  () => {
    updateCacheStrategy(route);
    console.log("cachedComponents:", cachedComponents.value);
    console.log("excludedComponents:", excludedComponents.value);
    console.log("路由变化，更新缓存策略:", {
      to: route.name,
      cacheStrategy: route.meta?.cacheStrategy,
      keepAlive: route.meta?.keepAlive,
    });
  }
);

onMounted(() => {
  // 初始化时设置当前路由的缓存策略
  if (route.meta) {
    updateCacheStrategy(route);
  }

  // 将缓存管理方法暴露到全局，方便调试
  (window as any).cacheManager = {
    toggle: toggleComponentCache,
    clear: clearAllCache,
    status: getCacheStatus,
  };

  console.log("App 组件挂载完成，缓存管理器已初始化");
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

/* 页面头部样式 */
.header {
  background-color: #2c3e50;
  padding: 1rem 0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.header-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

h3 {
  margin: 30px 0 15px;
  color: #2c3e50;
  border-bottom: 2px solid #42b983;
  padding-bottom: 5px;
}

.brand {
  display: flex;
  align-items: center;
}

.logo {
  height: 30px;
  margin-right: 10px;
}

.brand-text {
  font-size: 1.2rem;
  font-weight: bold;
  color: white;
}

/* 主内容区域 */
.main-content {
  flex: 1;
  padding: 20px 0;
}

/* 路由列表页面样式 */
.route-list-page {
  max-width: 1000px;
  margin: 0 auto;
  padding: 0 20px;
}

.welcome-section {
  text-align: center;
  margin-bottom: 50px;
}

.welcome-section h1 {
  color: #42b983;
  font-size: 2.5rem;
  margin-bottom: 20px;
}

.welcome-section p {
  color: #666;
  font-size: 1.1rem;
  line-height: 1.6;
}

.route-grid {
  display: grid;
  grid-template-columns: repeat(4, 320px);
  gap: 25px;
  margin-top: 40px;
  justify-content: center;
}

.route-card {
  background: white;
  border-radius: 12px;
  padding: 25px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  border: 2px solid transparent;
}

.route-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  border-color: #42b983;
}

.card-icon {
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, #42b983, #3aa876);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 20px;
  flex-shrink: 0;
}

.icon-text {
  color: white;
  font-size: 24px;
  font-weight: bold;
}

.card-content {
  flex: 1;
}

.card-content h3 {
  color: #2c3e50;
  font-size: 1.3rem;
  margin: 0 0 8px 0;
  border: none;
  padding: 0;
}

.card-content p {
  color: #666;
  margin: 0;
  line-height: 1.5;
  font-size: 0.9rem;
}

.card-arrow {
  color: #42b983;
  font-size: 1.5rem;
  font-weight: bold;
  margin-left: 15px;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.route-card:hover .card-arrow {
  opacity: 1;
}

/* 页脚样式 */
.footer {
  background-color: #34495e;
  color: #bdc3c7;
  text-align: center;
  padding: 20px;
  margin-top: auto;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .welcome-section h1 {
    font-size: 2rem;
  }

  .route-grid {
    grid-template-columns: 1fr;
    gap: 20px;
  }

  .route-card {
    padding: 20px;
  }

  .card-icon {
    width: 50px;
    height: 50px;
    margin-right: 15px;
  }

  .icon-text {
    font-size: 20px;
  }
}
</style>
