<template>
  <div class="data-manager">
    <div class="component-header">
      <h3>📊 数据管理器组件</h3>
      <div class="status-indicator" :class="componentStatus">
        {{ componentStatus === "active" ? "🟢 激活状态" : "🔴 非激活状态" }}
      </div>
    </div>

    <div class="data-section">
      <h4>实时数据监控</h4>
      <div class="data-grid">
        <div class="data-item">
          <span class="label">组件创建时间：</span>
          <span class="value">{{ createdTime }}</span>
        </div>
        <div class="data-item">
          <span class="label">最后激活时间：</span>
          <span class="value">{{ lastActivatedTime || "未激活" }}</span>
        </div>
        <div class="data-item">
          <span class="label">激活次数：</span>
          <span class="value">{{ activatedCount }}</span>
        </div>
        <div class="data-item">
          <span class="label">非激活次数：</span>
          <span class="value">{{ deactivatedCount }}</span>
        </div>
      </div>
    </div>

    <div class="timer-section">
      <h4>定时器管理</h4>
      <div class="timer-controls">
        <button @click="startTimer" :disabled="timerRunning" class="btn start-btn">
          {{ timerRunning ? "⏸️ 定时器运行中" : "▶️ 启动定时器" }}
        </button>
        <button @click="stopTimer" :disabled="!timerRunning" class="btn stop-btn">
          ⏹️ 停止定时器
        </button>
        <button @click="resetTimer" class="btn reset-btn">🔄 重置</button>
      </div>
      <div class="timer-display">
        <div class="timer-item">
          <span class="label">运行时长：</span>
          <span class="value">{{ formatTime(timerDuration) }}</span>
        </div>
        <div class="timer-item">
          <span class="label">定时器ID：</span>
          <span class="value">{{ timerId || "无" }}</span>
        </div>
      </div>
    </div>

    <div class="data-operations">
      <h4>数据操作</h4>
      <div class="operation-controls">
        <button @click="addDataItem" class="btn add-btn">➕ 添加数据</button>
        <button @click="clearData" class="btn clear-btn">🗑️ 清空数据</button>
        <button @click="refreshData" class="btn refresh-btn">🔄 刷新数据</button>
      </div>
      <div class="data-list">
        <h5>数据列表 ({{ dataItems.length }} 项)</h5>
        <div v-if="dataItems.length > 0" class="items-container">
          <div v-for="(item, index) in dataItems" :key="item.id" class="data-list-item">
            <span class="item-index">{{ index + 1 }}</span>
            <span class="item-content">{{ item.content }}</span>
            <span class="item-time">{{ item.timestamp }}</span>
          </div>
        </div>
        <div v-else class="no-data">
          <p>暂无数据，点击"添加数据"按钮开始</p>
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
  name: "DataManager",
  data() {
    return {
      // 组件状态
      componentStatus: "inactive",
      createdTime: "",
      lastActivatedTime: "",
      activatedCount: 0,
      deactivatedCount: 0,

      // 定时器相关
      timerRunning: false,
      timerId: null,
      timerDuration: 0,
      timerStartTime: null,

      // 数据管理
      dataItems: [],
      dataCounter: 1,

      // 生命周期日志
      lifecycleLogs: [],

      // 数据刷新定时器
      dataRefreshTimer: null,
    };
  },

  created() {
    this.createdTime = new Date().toLocaleTimeString();
    this.addLog("created", "组件创建完成", `创建时间: ${this.createdTime}`);

    // 模拟初始化数据
    this.initializeData();
  },

  mounted() {
    this.addLog("mounted", "组件挂载完成", "DOM 已渲染");
  },

  activated() {
    this.componentStatus = "active";
    this.lastActivatedTime = new Date().toLocaleTimeString();
    this.activatedCount++;

    this.addLog("activated", "组件被激活", `第 ${this.activatedCount} 次激活`);

    // 恢复定时器状态
    this.resumeTimer();

    // 启动数据刷新
    this.startDataRefresh();

    // 模拟数据同步
    this.syncData();
  },

  deactivated() {
    this.componentStatus = "inactive";
    this.deactivatedCount++;

    this.addLog("deactivated", "组件被停用", `第 ${this.deactivatedCount} 次停用`);

    // 暂停定时器
    this.pauseTimer();

    // 停止数据刷新
    this.stopDataRefresh();

    // 保存数据状态
    this.saveDataState();
  },

  beforeDestroy() {
    this.addLog("beforeDestroy", "组件即将销毁", "清理资源");

    // 清理所有定时器
    this.cleanupTimers();

    // 保存最终状态
    this.saveDataState();
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

    // 初始化数据
    initializeData() {
      // 尝试从 localStorage 恢复数据
      const savedData = localStorage.getItem("DataManager_data");
      if (savedData) {
        try {
          this.dataItems = JSON.parse(savedData);
          this.dataCounter = this.dataItems.length + 1;
          this.addLog("data", "数据恢复成功", `恢复了 ${this.dataItems.length} 条数据`);
        } catch (e) {
          this.addLog("data", "数据恢复失败", "使用默认数据");
          this.createDefaultData();
        }
      } else {
        this.createDefaultData();
      }

      // 恢复定时器状态
      const savedTimer = localStorage.getItem("DataManager_timer");
      if (savedTimer) {
        try {
          const timerData = JSON.parse(savedTimer);
          this.timerDuration = timerData.duration || 0;
          this.addLog("timer", "定时器状态恢复", `时长: ${this.formatTime(this.timerDuration)}`);
        } catch (e) {
          this.addLog("timer", "定时器状态恢复失败", "重置定时器");
        }
      }
    },

    // 创建默认数据
    createDefaultData() {
      this.dataItems = [
        { id: 1, content: "默认数据项 1", timestamp: new Date().toLocaleTimeString() },
        { id: 2, content: "默认数据项 2", timestamp: new Date().toLocaleTimeString() },
      ];
      this.dataCounter = 3;
    },

    // 启动定时器
    startTimer() {
      if (!this.timerRunning) {
        this.timerRunning = true;
        this.timerStartTime = Date.now();

        this.timerId = setInterval(() => {
          this.timerDuration += 1;
        }, 1000);

        this.addLog("timer", "定时器启动", `ID: ${this.timerId}`);
      }
    },

    // 停止定时器
    stopTimer() {
      if (this.timerRunning) {
        this.timerRunning = false;
        clearInterval(this.timerId);
        this.timerId = null;

        this.addLog("timer", "定时器停止", `总时长: ${this.formatTime(this.timerDuration)}`);
      }
    },

    // 重置定时器
    resetTimer() {
      this.stopTimer();
      this.timerDuration = 0;
      this.addLog("timer", "定时器重置", "时长已清零");
    },

    // 暂停定时器（组件停用时）
    pauseTimer() {
      if (this.timerRunning) {
        clearInterval(this.timerId);
        this.timerId = null;
        this.addLog("timer", "定时器暂停", "组件停用，定时器暂停");
      }
    },

    // 恢复定时器（组件激活时）
    resumeTimer() {
      if (this.timerRunning && !this.timerId) {
        this.timerId = setInterval(() => {
          this.timerDuration += 1;
        }, 1000);
        this.addLog("timer", "定时器恢复", "组件激活，定时器恢复运行");
      }
    },

    // 启动数据刷新
    startDataRefresh() {
      this.dataRefreshTimer = setInterval(() => {
        // 模拟数据更新
        if (this.dataItems.length > 0) {
          const randomIndex = Math.floor(Math.random() * this.dataItems.length);
          this.dataItems[randomIndex].lastUpdate = new Date().toLocaleTimeString();
        }
      }, 5000); // 每5秒更新一次

      this.addLog("data", "数据刷新启动", "每5秒自动更新数据");
    },

    // 停止数据刷新
    stopDataRefresh() {
      if (this.dataRefreshTimer) {
        clearInterval(this.dataRefreshTimer);
        this.dataRefreshTimer = null;
        this.addLog("data", "数据刷新停止", "组件停用，停止自动更新");
      }
    },

    // 添加数据项
    addDataItem() {
      const newItem = {
        id: this.dataCounter++,
        content: `数据项 ${this.dataCounter - 1}`,
        timestamp: new Date().toLocaleTimeString(),
        lastUpdate: new Date().toLocaleTimeString(),
      };

      this.dataItems.push(newItem);
      this.addLog("data", "数据添加", `新增: ${newItem.content}`);
    },

    // 清空数据
    clearData() {
      this.dataItems = [];
      this.dataCounter = 1;
      this.addLog("data", "数据清空", "所有数据已清空");
    },

    // 刷新数据
    refreshData() {
      this.dataItems.forEach((item) => {
        item.lastUpdate = new Date().toLocaleTimeString();
      });
      this.addLog("data", "数据刷新", `刷新了 ${this.dataItems.length} 条数据`);
    },

    // 同步数据
    syncData() {
      // 模拟从服务器同步数据
      setTimeout(() => {
        if (this.dataItems.length > 0) {
          this.addLog("data", "数据同步", "从服务器同步数据完成");
        }
      }, 1000);
    },

    // 保存数据状态
    saveDataState() {
      try {
        localStorage.setItem("DataManager_data", JSON.stringify(this.dataItems));
        localStorage.setItem(
          "DataManager_timer",
          JSON.stringify({
            duration: this.timerDuration,
            running: this.timerRunning,
          })
        );
        this.addLog("data", "状态保存", "数据状态已保存到本地存储");
      } catch (e) {
        this.addLog("data", "状态保存失败", e.message);
      }
    },

    // 清理定时器
    cleanupTimers() {
      if (this.timerId) {
        clearInterval(this.timerId);
        this.timerId = null;
      }
      if (this.dataRefreshTimer) {
        clearInterval(this.dataRefreshTimer);
        this.dataRefreshTimer = null;
      }
    },

    // 格式化时间
    formatTime(seconds) {
      const mins = Math.floor(seconds / 60);
      const secs = seconds % 60;
      return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
    },

    // 清空日志
    clearLogs() {
      this.lifecycleLogs = [];
    },
  },
};
</script>

<style scoped>
.data-manager {
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

.data-section,
.timer-section,
.data-operations,
.lifecycle-logs {
  margin-bottom: 25px;
  padding: 20px;
  background: #f8f9fa;
  border-radius: 8px;
  border-left: 4px solid #17a2b8;
}

.data-section h4,
.timer-section h4,
.data-operations h4,
.lifecycle-logs h4 {
  margin: 0 0 15px 0;
  color: #2c3e50;
  font-size: 1.1rem;
}

.data-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 15px;
}

.data-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background: white;
  border-radius: 6px;
  border: 1px solid #e9ecef;
}

.data-item .label {
  font-weight: 600;
  color: #495057;
}

.data-item .value {
  color: #212529;
  font-family: monospace;
  background: #f8f9fa;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 0.9rem;
}

.timer-controls {
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

.start-btn {
  background: #28a745;
  color: white;
}

.start-btn:hover:not(:disabled) {
  background: #218838;
}

.start-btn:disabled {
  background: #6c757d;
  cursor: not-allowed;
}

.stop-btn {
  background: #dc3545;
  color: white;
}

.stop-btn:hover:not(:disabled) {
  background: #c82333;
}

.stop-btn:disabled {
  background: #6c757d;
  cursor: not-allowed;
}

.reset-btn {
  background: #ffc107;
  color: #212529;
}

.reset-btn:hover {
  background: #e0a800;
}

.timer-display {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 15px;
}

.timer-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px;
  background: white;
  border-radius: 4px;
}

.operation-controls {
  display: flex;
  gap: 10px;
  margin-bottom: 15px;
  flex-wrap: wrap;
}

.add-btn {
  background: #007bff;
  color: white;
}

.add-btn:hover {
  background: #0056b3;
}

.clear-btn {
  background: #6c757d;
  color: white;
}

.clear-btn:hover {
  background: #5a6268;
}

.refresh-btn {
  background: #17a2b8;
  color: white;
}

.refresh-btn:hover {
  background: #138496;
}

.data-list h5 {
  margin: 0 0 10px 0;
  color: #495057;
}

.items-container {
  max-height: 200px;
  overflow-y: auto;
}

.data-list-item {
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 8px 12px;
  margin-bottom: 8px;
  background: white;
  border-radius: 4px;
  border: 1px solid #e9ecef;
}

.item-index {
  background: #007bff;
  color: white;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.8rem;
  font-weight: 600;
}

.item-content {
  flex: 1;
  color: #212529;
}

.item-time {
  color: #6c757d;
  font-size: 0.8rem;
  font-family: monospace;
}

.no-data {
  text-align: center;
  padding: 20px;
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
  .data-grid,
  .timer-display {
    grid-template-columns: 1fr;
  }

  .timer-controls,
  .operation-controls {
    flex-direction: column;
  }

  .btn {
    width: 100%;
  }
}
</style>
