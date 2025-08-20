<template>
  <div class="mixin-test">
    <h1>Vue2 Mixin 功能测试</h1>

    <!-- Mixin 基础功能演示 -->
    <section class="card">
      <h2>1. 基础 Mixin 功能</h2>
      <div class="demo-section">
        <p><strong>来自 Mixin 的数据：</strong>{{ mixinData }}</p>
        <p><strong>来自 Mixin 的计算属性：</strong>{{ mixinComputed }}</p>
        <p><strong>来自 Mixin 的方法调用：</strong>{{ mixinMethodResult }}</p>

        <div class="buttons">
          <button @click="callMixinMethod" class="btn primary">调用 Mixin 方法</button>
          <button @click="updateMixinData" class="btn success">更新 Mixin 数据</button>
        </div>
      </div>
    </section>

    <!-- 多个 Mixin 合并演示 -->
    <section class="card">
      <h2>2. 多个 Mixin 合并</h2>
      <div class="demo-section">
        <p><strong>Logger Mixin 状态：</strong>{{ loggerEnabled ? "启用" : "禁用" }}</p>
        <p><strong>Counter Mixin 计数：</strong>{{ counter }}</p>
        <p><strong>合并后的方法：</strong>{{ combinedMethodResult }}</p>

        <div class="buttons">
          <button @click="toggleLogger" class="btn warn">切换日志状态</button>
          <button @click="incrementCounter" class="btn primary">增加计数</button>
          <button @click="callCombinedMethod" class="btn success">调用合并方法</button>
        </div>
      </div>
    </section>

    <!-- Mixin 与组件数据冲突演示 -->
    <section class="card">
      <h2>3. 数据冲突与合并策略</h2>
      <div class="demo-section">
        <p><strong>组件数据 (优先级最高)：</strong>{{ conflictingData }}</p>
        <p><strong>Mixin 数据：</strong>{{ mixinConflictingData }}</p>
        <p><strong>最终显示值：</strong>{{ conflictingData }}</p>

        <div class="buttons">
          <button @click="showDataPriority" class="btn info">显示数据优先级</button>
        </div>
      </div>
    </section>

    <!-- 生命周期 Hook 演示 -->
    <section class="card">
      <h2>4. 生命周期 Hook 执行顺序</h2>
      <div class="demo-section">
        <p><strong>生命周期日志：</strong></p>
        <div class="log-container">
          <div v-for="(log, index) in lifecycleLogs" :key="index" class="log-item">
            <span class="log-time">{{ log.time }}</span>
            <span class="log-message">{{ log.message }}</span>
          </div>
        </div>

        <div class="buttons">
          <button @click="clearLogs" class="btn danger">清空日志</button>
          <button @click="simulateUpdate" class="btn primary">模拟组件更新</button>
        </div>
      </div>
    </section>

    <!-- Mixin 使用注意事项 -->
    <section class="card">
      <h2>5. Mixin 使用注意事项</h2>
      <div class="demo-section">
        <div class="warning">
          <h3>⚠️ 注意事项：</h3>
          <ul>
            <li>数据冲突时，组件数据优先级最高</li>
            <li>方法冲突时，组件方法会覆盖 Mixin 方法</li>
            <li>生命周期 Hook 会按顺序执行（Mixin → 组件）</li>
            <li>计算属性和侦听器会合并，不会覆盖</li>
            <li>过度使用 Mixin 可能导致代码难以维护</li>
          </ul>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { baseMixin, loggerMixin, counterMixin } from "@/utils/mixins.js";
// 或者使用一次性导入所有 mixins
// import { allMixins } from '@/utils/mixins.js';

export default {
  name: "MixinTest",
  mixins: [baseMixin, loggerMixin, counterMixin],
  // 如果使用 allMixins，可以这样写：
  // mixins: allMixins,
  data() {
    return {
      // 与 Mixin 冲突的数据，优先级更高
      conflictingData: "组件数据（优先级最高）",
      mixinMethodResult: "",
      combinedMethodResult: "",
      lifecycleLogs: [],
    };
  },
  created() {
    this.addLifecycleLog("组件 created");
  },
  mounted() {
    this.addLifecycleLog("组件 mounted");
    this.log("组件已挂载完成");
  },
  methods: {
    callMixinMethod() {
      this.mixinMethodResult = this.mixinMethod();
      this.log("调用了 Mixin 方法");
    },

    updateMixinData() {
      this.mixinData = "Mixin 数据已被更新";
      this.log("更新了 Mixin 数据");
    },

    callCombinedMethod() {
      // 调用来自不同 Mixin 的方法
      this.log("调用合并方法");
      this.incrementCounter();
      this.combinedMethodResult = `日志状态: ${this.loggerEnabled}, 计数: ${this.counter}`;
    },

    showDataPriority() {
      this.log(`数据优先级演示 - 组件数据: ${this.conflictingData}`);
      alert(
        `数据优先级演示：\n组件数据: ${this.conflictingData}\nMixin 数据: ${this.mixinConflictingData}\n最终显示: ${this.conflictingData}`
      );
    },

    addLifecycleLog(message) {
      const time = new Date().toLocaleTimeString();
      this.lifecycleLogs.push({ time, message });
      // 保持日志数量在合理范围内
      if (this.lifecycleLogs.length > 20) {
        this.lifecycleLogs.shift();
      }
    },

    clearLogs() {
      this.lifecycleLogs = [];
      this.log("日志已清空");
    },

    simulateUpdate() {
      this.log("模拟组件更新");
      this.$forceUpdate();
    },
  },
};
</script>

<style scoped>
.mixin-test {
  max-width: 1000px;
  margin: 0 auto;
  padding: 20px;
}

.card {
  background: white;
  border-radius: 12px;
  padding: 24px;
  margin-bottom: 24px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  border: 1px solid #f0f0f0;
}

h1 {
  color: #42b983;
  text-align: center;
  margin-bottom: 30px;
  font-size: 2.2rem;
}

h2 {
  color: #2c3e50;
  margin-bottom: 20px;
  border-bottom: 2px solid #42b983;
  padding-bottom: 10px;
}

.demo-section {
  margin-bottom: 20px;
}

.demo-section p {
  margin: 12px 0;
  line-height: 1.6;
}

.buttons {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  margin-top: 16px;
}

.btn {
  padding: 10px 16px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.2s ease;
}

.btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.btn.primary {
  background: #1890ff;
  color: white;
}
.btn.success {
  background: #52c41a;
  color: white;
}
.btn.warn {
  background: #faad14;
  color: white;
}
.btn.info {
  background: #13c2c2;
  color: white;
}
.btn.danger {
  background: #ff4d4f;
  color: white;
}

.log-container {
  background: #f8f9fa;
  border: 1px solid #e9ecef;
  border-radius: 6px;
  padding: 12px;
  max-height: 200px;
  overflow-y: auto;
  margin: 12px 0;
}

.log-item {
  display: flex;
  gap: 12px;
  padding: 4px 0;
  border-bottom: 1px solid #e9ecef;
}

.log-item:last-child {
  border-bottom: none;
}

.log-time {
  color: #6c757d;
  font-size: 12px;
  min-width: 80px;
}

.log-message {
  color: #495057;
  font-family: monospace;
}

.warning {
  background: #fff7e6;
  border: 1px solid #ffd591;
  border-radius: 8px;
  padding: 16px;
}

.warning h3 {
  color: #d48806;
  margin-top: 0;
  margin-bottom: 12px;
}

.warning ul {
  margin: 0;
  padding-left: 20px;
}

.warning li {
  margin: 8px 0;
  color: #614700;
  line-height: 1.5;
}

@media (max-width: 768px) {
  .mixin-test {
    padding: 16px;
  }

  .buttons {
    flex-direction: column;
  }

  .btn {
    width: 100%;
  }
}
</style>
