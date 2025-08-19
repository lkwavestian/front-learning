<template>
  <div id="app">
    <!-- 页面头部 -->
    <header class="header">
      <div class="header-container">
        <div class="brand">
          <img alt="Vue logo" src="./assets/logo.png" class="logo" />
          <span class="brand-text">Vue2 学习项目</span>
        </div>
      </div>
    </header>

    <!-- 主内容区域 -->
    <main class="main-content">
      <!-- 路由列表页面 -->
      <div class="route-list-page" v-if="$route.path === '/'">
        <div class="welcome-section">
          <h1>欢迎来到 Vue2 学习项目</h1>
          <p>这是一个专门用于学习 Vue.js 2.x 的项目，包含了 Vue2 的核心功能演示。</p>
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
      <router-view v-else />
    </main>

    <!-- 页脚 -->
    <footer class="footer">
      <p>&copy; 2024 Vue2 学习项目. 使用 Vue.js 2.7.16 构建</p>
    </footer>
  </div>
</template>

<script>
import { navMenu } from "./router";

export default {
  name: "App",
  data() {
    return {
      navMenu,
    };
  },
  methods: {
    navigateTo(path) {
      this.$router.push(path);
    },
  },
};
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
  grid-template-columns: repeat(auto-fit, minmax(280px, 320px));
  gap: 25px;
  margin-top: 40px;
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

/* 全局样式重置 */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  background-color: #f5f5f5;
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
