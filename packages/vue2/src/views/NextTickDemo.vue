<template>
  <div class="nexttick-demo">
    <h1>Vue $nextTick 详解：作用、用法与原理</h1>

    <!-- 1. 基本概念 -->
    <section class="card">
      <h2>1. $nextTick 的作用</h2>
      <div class="demo-section">
        <div class="info-box">
          <p><strong>核心作用：</strong>在下次 DOM 更新循环结束之后执行延迟回调</p>
          <p><strong>使用场景：</strong></p>
          <ul>
            <li>数据变化后，需要操作更新后的 DOM</li>
            <li>等待 Vue 完成异步 DOM 更新</li>
            <li>确保获取到最新的 DOM 状态</li>
          </ul>
        </div>
      </div>
    </section>

    <!-- 2. 基础用法演示 -->
    <section class="card">
      <h2>2. 基础用法演示</h2>
      <div class="demo-section">
        <div class="example-box">
          <h3>场景1：数据变化后操作 DOM</h3>
          <p>当前列表长度：{{ list.length }}</p>
          <div class="list-container">
            <div v-for="(item, index) in list" :key="index" class="list-item" :ref="`item${index}`">
              {{ item }}
            </div>
          </div>
          <div class="buttons">
            <button class="btn primary" @click="addItemWithoutNextTick">
              不加 nextTick 添加（会报错）
            </button>
            <button class="btn success" @click="addItemWithNextTick">
              加 nextTick 添加（正常）
            </button>
            <button class="btn warn" @click="clearList">清空列表</button>
          </div>
        </div>

        <div class="example-box">
          <h3>场景2：获取元素尺寸</h3>
          <div class="size-demo" :style="{ width: boxWidth + 'px' }" ref="sizeBox">
            <p>动态宽度盒子</p>
            <p>当前宽度：{{ boxWidth }}px</p>
          </div>
          <div class="buttons">
            <button class="btn primary" @click="changeWidthWithoutNextTick">
              改变宽度（不等待更新）
            </button>
            <button class="btn success" @click="changeWidthWithNextTick">
              改变宽度（等待更新后获取）
            </button>
          </div>
          <p>获取到的宽度：{{ measuredWidth }}px</p>
        </div>
      </div>
    </section>

    <!-- 3. 高级用法 -->
    <section class="card">
      <h2>3. 高级用法</h2>
      <div class="demo-section">
        <div class="example-box">
          <h3>Promise 语法</h3>
          <div class="code-block">
            <pre><code>// Vue 2.1.0+ 支持 Promise 语法
this.$nextTick().then(() => {
  // DOM 已更新
});</code></pre>
          </div>
          <button class="btn primary" @click="usePromiseNextTick">测试 Promise 语法</button>
        </div>

        <div class="example-box">
          <h3>async/await 语法</h3>
          <div class="code-block">
            <pre><code>// 使用 async/await
async updateData() {
  this.data = newValue;
  await this.$nextTick();
  // 此时 DOM 已更新
}</code></pre>
          </div>
          <button class="btn primary" @click="useAsyncNextTick">测试 async/await</button>
        </div>

        <div class="example-box">
          <h3>回调函数语法</h3>
          <div class="code-block">
            <pre><code>// 传统回调函数语法
this.$nextTick(() => {
  // DOM 已更新
});</code></pre>
          </div>
          <button class="btn primary" @click="useCallbackNextTick">测试回调函数</button>
        </div>
      </div>
    </section>

    <!-- 4. 实际应用场景 -->
    <section class="card">
      <h2>4. 实际应用场景</h2>
      <div class="demo-section">
        <div class="example-box">
          <h3>表单验证后聚焦</h3>
          <div class="form-demo">
            <input
              ref="focusInput"
              v-model="inputValue"
              class="input"
              placeholder="输入内容后点击验证"
            />
            <button class="btn primary" @click="validateAndFocus">验证并聚焦</button>
          </div>
          <p>验证状态：{{ validationStatus }}</p>
        </div>

        <div class="example-box">
          <h3>动态组件切换后操作</h3>
          <div class="component-demo">
            <button class="btn" @click="toggleComponent">切换组件</button>
            <component :is="currentComponent" ref="dynamicComponent" />
            <button class="btn primary" @click="operateComponent">操作动态组件</button>
          </div>
        </div>
      </div>
    </section>

    <!-- 5. 原理与执行时机 -->
    <section class="card">
      <h2>5. 原理与执行时机</h2>
      <div class="demo-section">
        <div class="info-box">
          <h3>执行时机</h3>
          <ol>
            <li><strong>同步代码执行完毕</strong></li>
            <li><strong>DOM 更新完成</strong>（Vue 的异步更新队列处理完毕）</li>
            <li><strong>浏览器重绘完成</strong></li>
          </ol>

          <h3>实现原理</h3>
          <p>Vue 使用微任务（microtask）队列来批量更新 DOM：</p>
          <ul>
            <li>数据变化时，Vue 将更新操作推入队列</li>
            <li>使用 Promise.then() 或 MutationObserver 等微任务</li>
            <li>当前事件循环结束后，执行队列中的更新</li>
            <li>$nextTick 在更新完成后执行回调</li>
          </ul>
        </div>
      </div>
    </section>

    <!-- 6. 日志展示 -->
    <section class="card">
      <h2>6. 操作日志</h2>
      <div class="log-container">
        <div v-for="(log, index) in logs" :key="index" class="log-item">
          <span class="log-time">{{ log.time }}</span>
          <span class="log-message">{{ log.message }}</span>
        </div>
      </div>
      <div class="buttons">
        <button class="btn danger" @click="logs = []">清空日志</button>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: "NextTickDemo",
  data() {
    return {
      list: ["项目1", "项目2", "项目3"],
      boxWidth: 200,
      measuredWidth: 0,
      inputValue: "",
      validationStatus: "未验证",
      currentComponent: "ComponentA",
      logs: [],
    };
  },
  components: {
    ComponentA: {
      template: '<div class="component-a">组件 A</div>',
      mounted() {
        this.$parent.log(`组件 A 已挂载`);
      },
    },
    ComponentB: {
      template: '<div class="component-b">组件 B</div>',
      mounted() {
        this.$parent.log(`组件 B 已挂载`);
      },
    },
  },
  methods: {
    log(message) {
      const time = new Date().toLocaleTimeString();
      this.logs.push({ time, message });
      if (this.logs.length > 50) this.logs.shift();
    },

    // 场景1：不加 nextTick 会报错
    addItemWithoutNextTick() {
      this.log("尝试不加 nextTick 添加项目...");
      this.list.push(`新项目${this.list.length + 1}`);

      try {
        // 立即尝试访问新添加的 DOM 元素，会报错
        const newItem = this.$refs[`item${this.list.length - 1}`];
        if (newItem && newItem[0]) {
          newItem[0].style.backgroundColor = "red";
          this.log("成功设置背景色（不应该发生）");
        }
      } catch (error) {
        this.log(`错误：${error.message}`);
      }
    },

    // 场景1：加 nextTick 正常
    addItemWithNextTick() {
      this.log("使用 nextTick 添加项目...");
      this.list.push(`新项目${this.list.length + 1}`);

      this.$nextTick(() => {
        // 此时 DOM 已更新，可以安全访问
        const newItem = this.$refs[`item${this.list.length - 1}`];
        if (newItem && newItem[0]) {
          newItem[0].style.backgroundColor = "#52c41a";
          this.log("成功设置新项目背景色（绿色）");
        }
      });
    },

    clearList() {
      this.list = [];
      this.log("列表已清空");
    },

    // 场景2：改变宽度
    changeWidthWithoutNextTick() {
      this.log("改变宽度，立即测量...");
      this.boxWidth = Math.floor(Math.random() * 300) + 100;

      // 立即获取宽度，可能还是旧值
      const rect = this.$refs.sizeBox.getBoundingClientRect();
      this.measuredWidth = Math.round(rect.width);
      this.log(`立即测量宽度：${this.measuredWidth}px（期望：${this.boxWidth}px）`);
    },

    changeWidthWithNextTick() {
      this.log("改变宽度，等待 nextTick 后测量...");
      this.boxWidth = Math.floor(Math.random() * 300) + 100;

      this.$nextTick(() => {
        // 等待 DOM 更新完成后再测量
        const rect = this.$refs.sizeBox.getBoundingClientRect();
        this.measuredWidth = Math.round(rect.width);
        this.log(`nextTick 后测量宽度：${this.measuredWidth}px（期望：${this.boxWidth}px）`);
      });
    },

    // 高级用法测试
    usePromiseNextTick() {
      this.log("使用 Promise 语法...");
      this.list.push(`Promise项目${this.list.length + 1}`);

      this.$nextTick().then(() => {
        this.log("Promise nextTick 回调执行，DOM 已更新");
      });
    },

    useAsyncNextTick() {
      this.log("使用 async/await 语法...");
      this.list.push(`Async项目${this.list.length + 1}`);

      this.asyncUpdate();
    },

    async asyncUpdate() {
      await this.$nextTick();
      this.log("async/await nextTick 执行完成，DOM 已更新");
    },

    useCallbackNextTick() {
      this.log("使用回调函数语法...");
      this.list.push(`Callback项目${this.list.length + 1}`);

      this.$nextTick(() => {
        this.log("回调函数 nextTick 执行完成，DOM 已更新");
      });
    },

    // 实际应用场景
    validateAndFocus() {
      this.log("验证表单...");
      if (this.inputValue.trim()) {
        this.validationStatus = "验证通过";
        this.log("验证通过，准备聚焦输入框");

        this.$nextTick(() => {
          this.$refs.focusInput.focus();
          this.log("输入框已聚焦");
        });
      } else {
        this.validationStatus = "验证失败";
        this.log("验证失败，不进行聚焦");
      }
    },

    toggleComponent() {
      this.currentComponent = this.currentComponent === "ComponentA" ? "ComponentB" : "ComponentA";
      this.log(`切换到组件：${this.currentComponent}`);
    },

    operateComponent() {
      this.log("尝试操作动态组件...");

      this.$nextTick(() => {
        if (this.$refs.dynamicComponent) {
          this.log(`成功访问动态组件：${this.currentComponent}`);
          // 可以在这里进行组件操作
        } else {
          this.log("无法访问动态组件");
        }
      });
    },
  },
};
</script>

<style scoped>
.nexttick-demo {
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
  font-size: 2rem;
}

h2 {
  color: #2c3e50;
  margin-bottom: 20px;
  border-bottom: 2px solid #42b983;
  padding-bottom: 10px;
}

h3 {
  color: #34495e;
  margin-bottom: 16px;
}

.demo-section {
  margin-bottom: 20px;
}

.info-box {
  background: #f8f9fa;
  border: 1px solid #e9ecef;
  border-radius: 8px;
  padding: 16px;
}

.info-box ul,
.info-box ol {
  margin: 12px 0;
  padding-left: 20px;
}

.info-box li {
  margin: 8px 0;
  line-height: 1.5;
}

.example-box {
  background: #fff;
  border: 1px solid #f0f0f0;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 20px;
}

.list-container {
  background: #f8f9fa;
  border: 1px solid #e9ecef;
  border-radius: 6px;
  padding: 12px;
  margin: 12px 0;
  min-height: 60px;
}

.list-item {
  background: #e9ecef;
  padding: 8px 12px;
  margin: 4px 0;
  border-radius: 4px;
  border-left: 4px solid #6c757d;
}

.size-demo {
  background: #e3f2fd;
  border: 2px solid #2196f3;
  border-radius: 8px;
  padding: 16px;
  margin: 12px 0;
  text-align: center;
  transition: width 0.3s ease;
}

.form-demo {
  display: flex;
  gap: 12px;
  align-items: center;
  margin: 12px 0;
}

.component-demo {
  margin: 12px 0;
}

.component-a,
.component-b {
  background: #f0f8ff;
  border: 1px solid #87ceeb;
  border-radius: 6px;
  padding: 12px;
  margin: 8px 0;
  text-align: center;
}

.component-b {
  background: #fff0f5;
  border-color: #ff69b4;
}

.code-block {
  background: #f8f9fa;
  border: 1px solid #e9ecef;
  border-radius: 6px;
  padding: 12px;
  margin: 12px 0;
  overflow-x: auto;
}

.code-block pre {
  margin: 0;
  font-family: "Courier New", monospace;
  font-size: 14px;
  line-height: 1.4;
}

.code-block code {
  color: #e83e8c;
}

.buttons {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  margin-top: 16px;
}

.btn {
  padding: 8px 14px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.2s ease;
  background: #1890ff;
  color: #fff;
}

.btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.btn.primary {
  background: #1890ff;
}

.btn.success {
  background: #52c41a;
}

.btn.warn {
  background: #faad14;
}

.btn.danger {
  background: #ff4d4f;
}

.input {
  padding: 8px 12px;
  border: 1px solid #d9d9d9;
  border-radius: 6px;
  font-size: 14px;
}

.log-container {
  background: #f8f9fa;
  border: 1px solid #e9ecef;
  border-radius: 6px;
  padding: 12px;
  max-height: 300px;
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

@media (max-width: 768px) {
  .nexttick-demo {
    padding: 16px;
  }

  .buttons {
    flex-direction: column;
  }

  .btn {
    width: 100%;
  }

  .form-demo {
    flex-direction: column;
    align-items: stretch;
  }
}
</style>
