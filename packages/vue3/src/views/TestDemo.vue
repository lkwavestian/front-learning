<template>
  <div class="test-demo">
    <div class="header-section">
      <h1>Vue3 测试页面</h1>
      <p class="subtitle">验证路由和基础功能</p>
    </div>

    <section class="content-section">
      <h2>基础信息</h2>
      <div class="info-grid">
        <div class="info-card">
          <h3>Vue 版本</h3>
          <p>{{ vueVersion }}</p>
        </div>
        <div class="info-card">
          <h3>路由模式</h3>
          <p>History 模式</p>
        </div>
        <div class="info-card">
          <h3>状态管理</h3>
          <p>Pinia</p>
        </div>
        <div class="info-card">
          <h3>构建工具</h3>
          <p>Vite</p>
        </div>
      </div>
    </section>

    <section class="content-section">
      <h2>响应式测试</h2>
      <div class="test-controls">
        <button @click="count++">点击计数: {{ count }}</button>
        <button @click="toggleMessage">切换消息</button>
      </div>
      <p class="message">{{ message }}</p>
    </section>

    <section class="content-section">
      <h2>组件生命周期</h2>
      <div class="lifecycle-logs">
        <div v-for="(log, index) in lifecycleLogs" :key="index" class="log-item">
          <span class="log-time">{{ log.time }}</span>
          <span class="log-content">{{ log.content }}</span>
        </div>
      </div>
    </section>

    <section class="content-section">
      <h2>返回首页</h2>
      <button @click="goHome" class="home-button">返回首页</button>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, version } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const vueVersion = version;
const count = ref(0);
const message = ref("欢迎来到 Vue3 学习项目！");
const lifecycleLogs = ref<Array<{ time: string; content: string }>>([]);

const addLog = (content: string) => {
  const time = new Date().toLocaleTimeString();
  lifecycleLogs.value.push({ time, content });
};

const toggleMessage = () => {
  message.value =
    message.value === "欢迎来到 Vue3 学习项目！" ? "Vue3 真棒！🎉" : "欢迎来到 Vue3 学习项目！";
};

const goHome = () => {
  router.push("/");
};

onMounted(() => {
  addLog("组件已挂载 (onMounted)");
});

onBeforeUnmount(() => {
  addLog("组件即将卸载 (onBeforeUnmount)");
});

addLog("组件 setup 执行");
</script>

<style scoped>
.test-demo {
  max-width: 1100px;
  margin: 0 auto;
  padding: 20px;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
}

.header-section {
  text-align: center;
  margin-bottom: 32px;
  padding: 36px 0;
  background: linear-gradient(135deg, #42b983 0%, #35495e 100%);
  color: white;
  border-radius: 12px;
}

.header-section h1 {
  margin: 0 0 8px 0;
  font-size: 2.2rem;
}

.subtitle {
  margin: 0;
  opacity: 0.9;
}

.content-section {
  margin-bottom: 28px;
  padding: 24px;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
}

.content-section h2 {
  margin: 0 0 16px 0;
  color: #2c3e50;
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
}

.info-card {
  padding: 16px;
  background: #f8f9fa;
  border-radius: 8px;
  border-left: 4px solid #42b983;
}

.info-card h3 {
  margin: 0 0 8px 0;
  color: #2c3e50;
  font-size: 1rem;
}

.info-card p {
  margin: 0;
  color: #666;
  font-size: 1.2rem;
  font-weight: bold;
}

.test-controls {
  display: flex;
  gap: 12px;
  margin-bottom: 16px;
}

.test-controls button,
.home-button {
  padding: 10px 20px;
  background: #42b983;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 1rem;
  transition: all 0.3s ease;
}

.test-controls button:hover,
.home-button:hover {
  background: #35495e;
  transform: translateY(-2px);
}

.message {
  padding: 16px;
  background: #e7f7ef;
  border-left: 4px solid #42b983;
  border-radius: 6px;
  color: #2c3e50;
  font-size: 1.1rem;
}

.lifecycle-logs {
  background: #f8f9fa;
  padding: 16px;
  border-radius: 8px;
  max-height: 300px;
  overflow-y: auto;
}

.log-item {
  padding: 8px;
  margin-bottom: 8px;
  background: white;
  border-radius: 4px;
  border-left: 3px solid #42b983;
  display: flex;
  gap: 12px;
}

.log-time {
  color: #999;
  font-size: 0.9rem;
  min-width: 100px;
}

.log-content {
  color: #2c3e50;
  font-weight: 500;
}

@media (max-width: 768px) {
  .test-controls {
    flex-direction: column;
  }

  .info-grid {
    grid-template-columns: 1fr;
  }
}
</style>
