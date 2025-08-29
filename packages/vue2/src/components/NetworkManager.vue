<template>
  <div class="network-manager">
    <div class="component-header">
      <h3>🌐 网络管理器组件</h3>
      <div class="status-indicator" :class="componentStatus">
        {{ componentStatus === "active" ? "🟢 激活状态" : "🔴 非激活状态" }}
      </div>
    </div>

    <div class="network-status">
      <h4>网络连接状态</h4>
      <div class="status-grid">
        <div class="status-item">
          <span class="label">连接状态：</span>
          <span class="value" :class="connectionStatus">
            {{ connectionStatus === "online" ? "🟢 在线" : "🔴 离线" }}
          </span>
        </div>
        <div class="status-item">
          <span class="label">最后检查：</span>
          <span class="value">{{ lastCheckTime || "未检查" }}</span>
        </div>
        <div class="status-item">
          <span class="label">检查次数：</span>
          <span class="value">{{ checkCount }}</span>
        </div>
        <div class="status-item">
          <span class="label">网络延迟：</span>
          <span class="value">{{ networkLatency || "未测量" }}</span>
        </div>
      </div>
    </div>

    <div class="api-requests">
      <h4>API 请求管理</h4>
      <div class="request-controls">
        <button @click="fetchUserData" :disabled="loading" class="btn fetch-btn">
          {{ loading ? "⏳ 请求中..." : "📡 获取用户数据" }}
        </button>
        <button @click="fetchPostData" :disabled="loading" class="btn fetch-btn">
          {{ loading ? "⏳ 请求中..." : "📡 获取文章数据" }}
        </button>
        <button @click="clearCache" class="btn clear-btn">🗑️ 清空缓存</button>
        <button @click="refreshAll" class="btn refresh-btn">🔄 刷新所有</button>
      </div>

      <div class="cache-info">
        <h5>缓存信息</h5>
        <div class="cache-stats">
          <div class="cache-stat">
            <span class="label">用户数据缓存：</span>
            <span class="value">{{ userDataCache ? "✅ 已缓存" : "❌ 未缓存" }}</span>
          </div>
          <div class="cache-stat">
            <span class="label">文章数据缓存：</span>
            <span class="value">{{ postDataCache ? "✅ 已缓存" : "❌ 未缓存" }}</span>
          </div>
          <div class="cache-stat">
            <span class="label">缓存时间：</span>
            <span class="value">{{ cacheTime || "无" }}</span>
          </div>
        </div>
      </div>
    </div>

    <div class="data-display">
      <h4>数据展示</h4>
      <div class="data-tabs">
        <button
          @click="activeTab = 'users'"
          :class="['tab-btn', { active: activeTab === 'users' }]"
        >
          用户数据 ({{ userData.length }})
        </button>
        <button
          @click="activeTab = 'posts'"
          :class="['tab-btn', { active: activeTab === 'posts' }]"
        >
          文章数据 ({{ postData.length }})
        </button>
      </div>

      <div class="tab-content">
        <!-- 用户数据标签页 -->
        <div v-if="activeTab === 'users'" class="tab-pane">
          <div v-if="userData.length > 0" class="data-list">
            <div v-for="user in userData.slice(0, 5)" :key="user.id" class="data-item">
              <div class="item-header">
                <span class="item-id">#{{ user.id }}</span>
                <span class="item-name">{{ user.name }}</span>
                <span class="item-email">{{ user.email }}</span>
              </div>
              <div class="item-details">
                <span class="detail-item">用户名: {{ user.username }}</span>
                <span class="detail-item">电话: {{ user.phone }}</span>
                <span class="detail-item">网站: {{ user.website }}</span>
              </div>
            </div>
          </div>
          <div v-else class="no-data">
            <p>暂无用户数据，点击"获取用户数据"按钮开始</p>
          </div>
        </div>

        <!-- 文章数据标签页 -->
        <div v-if="activeTab === 'posts'" class="tab-pane">
          <div v-if="postData.length > 0" class="data-list">
            <div v-for="post in postData.slice(0, 5)" :key="post.id" class="data-item">
              <div class="item-header">
                <span class="item-id">#{{ post.id }}</span>
                <span class="item-title">{{ post.title }}</span>
                <span class="item-author">作者: {{ post.userId }}</span>
              </div>
              <div class="item-content">
                <p>{{ post.body.substring(0, 100) }}...</p>
              </div>
            </div>
          </div>
          <div v-else class="no-data">
            <p>暂无文章数据，点击"获取文章数据"按钮开始</p>
          </div>
        </div>
      </div>
    </div>

    <div class="lifecycle-logs">
      <h4>生命周期日志</h4>
      <div class="logs-container">
        <div v-for="(log, index) in lifecycleLogs" :key="index" :class="['log-item', log.type]">
          <span class="log-time">{{ log.time }}</span>
          <span class="log-event">{{ log.event }}</span>
          <span class="log-detail">{{ log.detail }}</span>
        </div>
      </div>
      <button @click="clearLogs" class="btn clear-logs-btn">清空日志</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "NetworkManager",
  data() {
    return {
      // 组件状态
      componentStatus: "inactive",
      activeTab: "users",

      // 网络状态
      connectionStatus: "online",
      lastCheckTime: "",
      checkCount: 0,
      networkLatency: null,
      networkCheckTimer: null,

      // API 请求状态
      loading: false,
      userData: [],
      postData: [],

      // 缓存管理
      userDataCache: false,
      postDataCache: false,
      cacheTime: null,

      // 生命周期日志
      lifecycleLogs: [],

      // 网络监控定时器
      networkMonitorTimer: null,
    };
  },

  created() {
    this.addLog("created", "组件创建完成", "初始化网络管理器");

    // 检查网络状态
    this.checkNetworkStatus();

    // 尝试从缓存恢复数据
    this.restoreFromCache();
  },

  mounted() {
    this.addLog("mounted", "组件挂载完成", "开始网络监控");

    // 启动网络监控
    this.startNetworkMonitoring();
  },

  beforeRouteEnter(to, from, next) {
    console.log("beforeRouteEnter", to, from);
    next((vm) => {
      console.log("vm", vm);
      vm.componentStatus = "active";
    });
  },

  activated() {
    this.componentStatus = "active";
    this.addLog("activated", "组件被激活", "恢复网络连接和缓存数据");

    // 恢复网络监控
    this.resumeNetworkMonitoring();

    // 检查缓存是否需要更新
    this.checkCacheValidity();

    // 恢复定时器
    this.resumeTimers();
  },

  deactivated() {
    this.componentStatus = "inactive";
    this.addLog("deactivated", "组件被停用", "暂停网络监控，保存缓存");

    // 暂停网络监控
    this.pauseNetworkMonitoring();

    // 保存数据到缓存
    this.saveToCache();

    // 暂停定时器
    this.pauseTimers();
  },

  beforeDestroy() {
    this.addLog("beforeDestroy", "组件即将销毁", "清理网络资源");

    // 清理所有定时器
    this.cleanupTimers();

    // 保存最终缓存
    this.saveToCache();
  },

  methods: {
    // 添加生命周期日志
    addLog(event, title, detail = "") {
      const now = new Date();
      this.lifecycleLogs.unshift({
        time: now.toLocaleTimeString(),
        event: title,
        detail: detail,
        type:
          event === "activated"
            ? "success"
            : event === "deactivated"
            ? "warning"
            : event === "beforeDestroy"
            ? "error"
            : "info",
      });

      // 限制日志数量
      if (this.lifecycleLogs.length > 15) {
        this.lifecycleLogs = this.lifecycleLogs.slice(0, 15);
      }
    },

    // 检查网络状态
    checkNetworkStatus() {
      this.connectionStatus = navigator.onLine ? "online" : "offline";
      this.lastCheckTime = new Date().toLocaleTimeString();
      this.checkCount++;

      // 测量网络延迟
      this.measureNetworkLatency();

      this.addLog(
        "network",
        "网络状态检查",
        `${this.connectionStatus} - 检查次数: ${this.checkCount}`
      );
    },

    // 测量网络延迟
    async measureNetworkLatency() {
      const startTime = Date.now();
      try {
        // 使用一个轻量级的请求来测量延迟
        await fetch("https://jsonplaceholder.typicode.com/posts/1", {
          method: "HEAD",
          cache: "no-cache",
        });
        this.networkLatency = Date.now() - startTime;
      } catch (error) {
        this.networkLatency = null;
      }
    },

    // 启动网络监控
    startNetworkMonitoring() {
      // 监听在线/离线事件
      window.addEventListener("online", this.handleOnline);
      window.addEventListener("offline", this.handleOffline);

      // 定期检查网络状态
      this.networkCheckTimer = setInterval(() => {
        this.checkNetworkStatus();
      }, 30000); // 每30秒检查一次

      this.addLog("network", "网络监控启动", "开始定期检查网络状态");
    },

    // 暂停网络监控
    pauseNetworkMonitoring() {
      if (this.networkCheckTimer) {
        clearInterval(this.networkCheckTimer);
        this.networkCheckTimer = null;
      }

      this.addLog("network", "网络监控暂停", "组件停用，暂停网络检查");
    },

    // 恢复网络监控
    resumeNetworkMonitoring() {
      if (!this.networkCheckTimer) {
        this.networkCheckTimer = setInterval(() => {
          this.checkNetworkStatus();
        }, 30000);
      }

      this.addLog("network", "网络监控恢复", "组件激活，恢复网络检查");
    },

    // 处理在线事件
    handleOnline() {
      this.connectionStatus = "online";
      this.addLog("network", "网络连接恢复", "检测到网络连接");
    },

    // 处理离线事件
    handleOffline() {
      this.connectionStatus = "offline";
      this.addLog("network", "网络连接断开", "检测到网络断开");
    },

    // 获取用户数据
    async fetchUserData() {
      if (this.loading) return;

      this.loading = true;
      this.addLog("api", "开始请求", "获取用户数据");

      try {
        const response = await fetch("https://jsonplaceholder.typicode.com/users");
        const data = await response.json();

        this.userData = data;
        this.userDataCache = true;
        this.updateCacheTime();

        this.addLog("api", "请求成功", `获取到 ${data.length} 条用户数据`);
      } catch (error) {
        this.addLog("api", "请求失败", `获取用户数据失败: ${error.message}`);
      } finally {
        this.loading = false;
      }
    },

    // 获取文章数据
    async fetchPostData() {
      if (this.loading) return;

      this.loading = true;
      this.addLog("api", "开始请求", "获取文章数据");

      try {
        const response = await fetch("https://jsonplaceholder.typicode.com/posts");
        const data = await response.json();

        this.postData = data;
        this.postDataCache = true;
        this.updateCacheTime();

        this.addLog("api", "请求成功", `获取到 ${data.length} 条文章数据`);
      } catch (error) {
        this.addLog("api", "请求失败", `获取文章数据失败: ${error.message}`);
      } finally {
        this.loading = false;
      }
    },

    // 清空缓存
    clearCache() {
      this.userData = [];
      this.postData = [];
      this.userDataCache = false;
      this.postDataCache = false;
      this.cacheTime = null;

      // 清除本地存储
      localStorage.removeItem("NetworkManager_userData");
      localStorage.removeItem("NetworkManager_postData");
      localStorage.removeItem("NetworkManager_cacheTime");

      this.addLog("cache", "缓存清空", "所有缓存数据已清空");
    },

    // 刷新所有数据
    async refreshAll() {
      this.addLog("api", "开始刷新", "刷新所有数据");

      await Promise.all([this.fetchUserData(), this.fetchPostData()]);

      this.addLog("api", "刷新完成", "所有数据已刷新");
    },

    // 更新缓存时间
    updateCacheTime() {
      this.cacheTime = new Date().toLocaleTimeString();
    },

    // 检查缓存有效性
    checkCacheValidity() {
      const cacheTime = localStorage.getItem("NetworkManager_cacheTime");
      if (cacheTime) {
        const cacheDate = new Date(cacheTime);
        const now = new Date();
        const diffHours = (now - cacheDate) / (1000 * 60 * 60);

        // 如果缓存超过1小时，标记为过期
        if (diffHours > 1) {
          this.addLog("cache", "缓存过期", "缓存数据已超过1小时，建议刷新");
        }
      }
    },

    // 保存到缓存
    saveToCache() {
      try {
        if (this.userData.length > 0) {
          localStorage.setItem("NetworkManager_userData", JSON.stringify(this.userData));
        }
        if (this.postData.length > 0) {
          localStorage.setItem("NetworkManager_postData", JSON.stringify(this.postData));
        }
        if (this.cacheTime) {
          localStorage.setItem("NetworkManager_cacheTime", this.cacheTime);
        }

        this.addLog("cache", "缓存保存", "数据已保存到本地存储");
      } catch (error) {
        this.addLog("cache", "缓存保存失败", error.message);
      }
    },

    // 从缓存恢复
    restoreFromCache() {
      try {
        const userData = localStorage.getItem("NetworkManager_userData");
        const postData = localStorage.getItem("NetworkManager_postData");
        const cacheTime = localStorage.getItem("NetworkManager_cacheTime");

        if (userData) {
          this.userData = JSON.parse(userData);
          this.userDataCache = true;
          this.addLog("cache", "用户数据恢复", `从缓存恢复了 ${this.userData.length} 条数据`);
        }

        if (postData) {
          this.postData = JSON.parse(postData);
          this.postDataCache = true;
          this.addLog("cache", "文章数据恢复", `从缓存恢复了 ${this.postData.length} 条数据`);
        }

        if (cacheTime) {
          this.cacheTime = cacheTime;
        }
      } catch (error) {
        this.addLog("cache", "缓存恢复失败", error.message);
      }
    },

    // 恢复定时器
    resumeTimers() {
      // 这里可以恢复其他需要运行的定时器
      this.addLog("timer", "定时器恢复", "组件激活，恢复所有定时器");
    },

    // 暂停定时器
    pauseTimers() {
      // 这里可以暂停其他定时器
      this.addLog("timer", "定时器暂停", "组件停用，暂停所有定时器");
    },

    // 清理定时器
    cleanupTimers() {
      if (this.networkCheckTimer) {
        clearInterval(this.networkCheckTimer);
        this.networkCheckTimer = null;
      }

      if (this.networkMonitorTimer) {
        clearInterval(this.networkMonitorTimer);
        this.networkMonitorTimer = null;
      }

      // 移除事件监听器
      window.removeEventListener("online", this.handleOnline);
      window.removeEventListener("offline", this.handleOffline);
    },

    // 清空日志
    clearLogs() {
      this.lifecycleLogs = [];
    },
  },
};
</script>

<style scoped>
.network-manager {
  padding: 20px;
  background: white;
  border-radius: 8px;
  border: 2px solid #e9ecef;
}

.component-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 15px;
  border-bottom: 2px solid #f8f9fa;
}

.component-header h3 {
  margin: 0;
  color: #2c3e50;
}

.status-indicator {
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 600;
}

.status-indicator.active {
  background: #d4edda;
  color: #155724;
}

.status-indicator.inactive {
  background: #f8d7da;
  color: #721c24;
}

.network-status,
.api-requests,
.data-display,
.lifecycle-logs {
  margin-bottom: 25px;
  padding: 20px;
  background: #f8f9fa;
  border-radius: 8px;
  border-left: 4px solid #17a2b8;
}

.network-status h4,
.api-requests h4,
.data-display h4,
.lifecycle-logs h4 {
  margin: 0 0 15px 0;
  color: #2c3e50;
  font-size: 1.1rem;
}

.status-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 15px;
}

.status-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background: white;
  border-radius: 6px;
  border: 1px solid #e9ecef;
}

.status-item .label {
  font-weight: 600;
  color: #495057;
}

.status-item .value {
  color: #212529;
  font-family: monospace;
  background: #f8f9fa;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 0.9rem;
}

.value.online {
  background: #d4edda;
  color: #155724;
}

.value.offline {
  background: #f8d7da;
  color: #721c24;
}

.request-controls {
  display: flex;
  gap: 10px;
  margin-bottom: 15px;
  flex-wrap: wrap;
}

.btn {
  padding: 8px 16px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 600;
  transition: all 0.3s ease;
}

.fetch-btn {
  background: #007bff;
  color: white;
}

.fetch-btn:hover:not(:disabled) {
  background: #0056b3;
}

.fetch-btn:disabled {
  background: #6c757d;
  cursor: not-allowed;
}

.clear-btn {
  background: #dc3545;
  color: white;
}

.clear-btn:hover {
  background: #c82333;
}

.refresh-btn {
  background: #28a745;
  color: white;
}

.refresh-btn:hover {
  background: #218838;
}

.cache-info {
  background: white;
  padding: 15px;
  border-radius: 6px;
  border: 1px solid #e9ecef;
}

.cache-info h5 {
  margin: 0 0 10px 0;
  color: #495057;
}

.cache-stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 10px;
}

.cache-stat {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px;
  background: #f8f9fa;
  border-radius: 4px;
}

.data-tabs {
  display: flex;
  gap: 5px;
  margin-bottom: 15px;
}

.tab-btn {
  padding: 10px 20px;
  border: 2px solid #e9ecef;
  background: white;
  color: #495057;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 0.9rem;
}

.tab-btn:hover {
  border-color: #007bff;
  color: #007bff;
}

.tab-btn.active {
  background: #007bff;
  border-color: #007bff;
  color: white;
}

.tab-content {
  background: white;
  border-radius: 6px;
  border: 1px solid #e9ecef;
  overflow: hidden;
}

.tab-pane {
  padding: 20px;
}

.data-list {
  max-height: 300px;
  overflow-y: auto;
}

.data-item {
  padding: 15px;
  margin-bottom: 15px;
  background: #f8f9fa;
  border-radius: 6px;
  border: 1px solid #e9ecef;
}

.item-header {
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 10px;
}

.item-id {
  background: #007bff;
  color: white;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 0.8rem;
  font-weight: 600;
}

.item-name,
.item-title {
  font-weight: 600;
  color: #2c3e50;
  flex: 1;
}

.item-email,
.item-author {
  color: #6c757d;
  font-size: 0.9rem;
}

.item-details {
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
}

.detail-item {
  color: #495057;
  font-size: 0.9rem;
}

.item-content p {
  margin: 0;
  color: #555;
  line-height: 1.5;
}

.no-data {
  text-align: center;
  padding: 40px;
  color: #6c757d;
  font-style: italic;
}

.lifecycle-logs {
  border-left-color: #6f42c1;
}

.logs-container {
  max-height: 200px;
  overflow-y: auto;
  margin-bottom: 15px;
}

.log-item {
  display: flex;
  gap: 15px;
  padding: 8px 12px;
  margin-bottom: 8px;
  background: white;
  border-radius: 4px;
  font-family: monospace;
  font-size: 0.9rem;
  border-left: 3px solid;
}

.log-item.info {
  border-left-color: #17a2b8;
}

.log-item.success {
  border-left-color: #28a745;
}

.log-item.warning {
  border-left-color: #ffc107;
}

.log-item.error {
  border-left-color: #dc3545;
}

.log-time {
  color: #6c757d;
  min-width: 80px;
}

.log-event {
  color: #495057;
  min-width: 120px;
  font-weight: 600;
}

.log-detail {
  color: #212529;
  flex: 1;
}

.clear-logs-btn {
  background: #6c757d;
  color: white;
}

.clear-logs-btn:hover {
  background: #5a6268;
}

@media (max-width: 768px) {
  .status-grid,
  .cache-stats {
    grid-template-columns: 1fr;
  }

  .request-controls {
    flex-direction: column;
  }

  .btn {
    width: 100%;
  }

  .data-tabs {
    flex-direction: column;
  }

  .item-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }

  .item-details {
    flex-direction: column;
    gap: 8px;
  }
}
</style>
