<template>
  <div class="modifiers-demo">
    <h1>Vue2 常用修饰符与自定义修饰符示例</h1>

    <!-- 1. 事件修饰符 -->
    <section class="card">
      <h2>1. 事件修饰符</h2>
      <div class="demo-section">
        <div class="box" @click="log('父容器捕获到点击')">
          <button class="btn" @click.stop="log('子按钮点击（.stop 阻止冒泡）')">
            .stop 阻止冒泡
          </button>
          <a
            href="https://example.com"
            @click.prevent="log('链接点击（.prevent 阻止默认）')"
            class="link"
            >.prevent 阻止默认</a
          >
        </div>
        <div class="box capture" @click.capture="log('父容器（.capture 捕获阶段）')">
          <button class="btn" @click="log('子按钮（冒泡阶段）')">.capture 捕获阶段</button>
        </div>
        <div class="box self" @click.self="log('只有点击灰色区域才触发（.self）')">
          <button class="btn" @click="log('点击子按钮，不会触发父（.self）')">.self 示例</button>
        </div>
        <div class="box once">
          <button class="btn" @click.once="clickedOnce++">
            .once 只触发一次（{{ clickedOnce }}）
          </button>
        </div>
        <div class="box passive">
          <div class="scroll" @wheel.passive="onPassiveWheel">.passive（滚轮时不阻塞）</div>
        </div>
      </div>
    </section>

    <!-- 2. 键盘与系统修饰符 -->
    <section class="card">
      <h2>2. 键盘与系统修饰符</h2>
      <div class="demo-section">
        <input class="input" placeholder="按 Enter 触发" @keyup.enter="log('按下 Enter')" />
        <input
          class="input"
          placeholder="Ctrl + Enter 触发"
          @keyup.ctrl.enter="log('按下 Ctrl + Enter')"
        />
        <div class="mouse">
          <button class="btn" @click.left="log('左键点击')">左键 .left</button>
          <button class="btn" @click.middle="log('中键点击')">中键 .middle</button>
          <button class="btn" @click.right.prevent="log('右键点击（阻止默认菜单）')">
            右键 .right
          </button>
        </div>
      </div>
    </section>

    <!-- 3. v-model 修饰符 -->
    <section class="card">
      <h2>3. v-model 修饰符</h2>
      <div class="demo-section grid">
        <div>
          <label>v-model.trim</label>
          <input class="input" v-model.trim="modelTrim" placeholder="输入两边空格会被去除" />
          <p>值: "{{ modelTrim }}"</p>
        </div>
        <div>
          <label>v-model.number</label>
          <input class="input" v-model.number="modelNumber" placeholder="输入将转为数字" />
          <p>值: {{ modelNumber }}（类型：{{ typeof modelNumber }}）</p>
        </div>
        <div>
          <label>v-model.lazy</label>
          <input class="input" v-model.lazy="modelLazy" placeholder="失焦或回车时更新" />
          <p>值: "{{ modelLazy }}"</p>
        </div>
      </div>
    </section>

    <!-- 4. 自定义指令 v-debounce（带修饰符 .immediate/.trim/.number） -->
    <section class="card">
      <h2>4. 自定义修饰符：v-debounce</h2>
      <div class="demo-section">
        <div class="grid">
          <div>
            <label>v-debounce:input="{ handler, delay }"</label>
            <input
              class="input"
              v-debounce:input="{ handler: onDebouncedInput, delay: debounceDelay }"
              placeholder="输入将被防抖（尾沿触发）"
            />
          </div>
          <div>
            <label>v-debounce:input.immediate</label>
            <input
              class="input"
              v-debounce:input.immediate="{
                handler: onDebouncedImmediate,
                delay: immediateDebounceDelay,
              }"
              placeholder="输入将被防抖（头沿触发）"
            />
          </div>
          <div>
            <label>v-debounce:input.trim.number</label>
            <input
              class="input"
              v-debounce:input.trim.number="{ handler: onDebouncedTransformed, delay: 400 }"
              placeholder="会 .trim 并尝试 .number 转换"
            />
          </div>
        </div>

        <div class="buttons">
          <button class="btn" @click="debounceDelay = 800">将尾沿 delay 改为 800ms</button>
          <button class="btn" @click="immediateDebounceDelay = 150">将头沿 delay 改为 150ms</button>
        </div>

        <div class="log-container">
          <div v-for="(logItem, i) in debounceLogs" :key="i" class="log-item">
            <span class="log-time">{{ logItem.time }}</span>
            <span class="log-message">{{ logItem.message }}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- 5. v-bind 修饰符 .sync -->
    <section class="card">
      <h2>5. v-bind 修饰符 .sync</h2>
      <div class="demo-section grid">
        <div>
          <h3>单个 prop .sync</h3>
          <p>父值："{{ parentTitle }}"</p>
          <sync-prop-child :title.sync="parentTitle" />
        </div>
        <div>
          <h3>对象 .sync</h3>
          <p>父配置：title="{{ config.title }}"，count={{ config.count }}</p>
          <sync-object-child v-bind.sync="config" />
        </div>
      </div>
    </section>

    <!-- 5. 统一日志展示（复用 MixinTest 的风格） -->
    <section class="card">
      <h2>6. 日志</h2>
      <div class="log-container">
        <div v-for="(msg, i) in logs" :key="i" class="log-item">
          <span class="log-time">#{{ i + 1 }}</span>
          <span class="log-message">{{ msg }}</span>
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
  name: "ModifiersDemo",
  components: {
    SyncPropChild: {
      props: ["title"],
      methods: {
        updateTitle() {
          this.$emit("update:title", `${this.title} + 子更新`);
        },
      },
      render(h) {
        return h("div", { class: "child" }, [
          h("p", [h("strong", "子组件接收的 title："), this.title]),
          h(
            "button",
            {
              class: "btn",
              on: { click: this.updateTitle },
            },
            "子组件更新 title（$emit('update:title')）"
          ),
        ]);
      },
    },
    SyncObjectChild: {
      props: ["config"],
      methods: {
        changeTitle() {
          this.$emit("update:title", `${this.config.title} *`);
        },
        incCount() {
          this.$emit("update:count", this.config.count + 1);
        },
      },
      render(h) {
        return h("div", { class: "child" }, [
          h("p", [
            h("strong", "子组件接收的 config："),
            `title="${this.config.title}"，count=${this.config.count}`,
          ]),
          h("div", { class: "buttons" }, [
            h("button", { class: "btn", on: { click: this.changeTitle } }, "emit update:title"),
            h("button", { class: "btn", on: { click: this.incCount } }, "emit update:count"),
          ]),
        ]);
      },
    },
  },
  data() {
    return {
      clickedOnce: 0,
      modelTrim: "",
      modelNumber: null,
      modelLazy: "",
      logs: [],
      debounceDelay: 500,
      immediateDebounceDelay: 300,
      debounceLogs: [],
      parentTitle: "父标题",
      config: { title: "配置标题", count: 0 },
    };
  },
  directives: {
    debounce: {
      bind(el, binding) {
        const setup = () => {
          cleanup();
          const value = binding.value;
          const eventName = binding.arg || "input";
          const modifiers = binding.modifiers || {};

          let handler = null;
          let delay = 300;
          if (typeof value === "function") {
            handler = value;
          } else if (value && typeof value.handler === "function") {
            handler = value.handler;
            if (typeof value.delay === "number") {
              delay = value.delay;
            }
          }
          if (!handler) return;

          const immediate = !!modifiers.immediate;

          const transform = (val) => {
            let v = val;
            if (modifiers.trim && typeof v === "string") v = v.trim();
            if (modifiers.number) {
              const n = Number(v);
              v = Number.isNaN(n) ? v : n;
            }
            return v;
          };

          let timeoutId = null;
          const listener = (evt) => {
            if (modifiers.stop) evt.stopPropagation();
            if (modifiers.prevent) evt.preventDefault();

            const raw = evt && evt.target ? evt.target.value : undefined;
            const payload = transform(raw);

            const call = () => handler(payload, evt);

            if (immediate) {
              const callNow = timeoutId === null;
              clearTimeout(timeoutId);
              timeoutId = setTimeout(() => {
                timeoutId = null;
              }, delay);
              if (callNow) call();
            } else {
              clearTimeout(timeoutId);
              timeoutId = setTimeout(call, delay);
            }
          };

          el.__vDebounce__ = { listener, eventName };
          el.addEventListener(eventName, listener);
        };

        const cleanup = () => {
          const state = el.__vDebounce__;
          if (state) {
            el.removeEventListener(state.eventName, state.listener);
            el.__vDebounce__ = null;
          }
        };

        el.__vDebounceSetup__ = setup;
        el.__vDebounceCleanup__ = cleanup;
        setup();
      },
      componentUpdated(el) {
        if (el.__vDebounceCleanup__) {
          el.__vDebounceCleanup__();
        }
        if (el.__vDebounceSetup__) {
          el.__vDebounceSetup__();
        }
      },
      unbind(el) {
        if (el.__vDebounceCleanup__) {
          el.__vDebounceCleanup__();
        }
      },
    },
  },
  methods: {
    log(message) {
      console.log(message);
      this.logs.push(message);
    },
    onPassiveWheel() {
      this.log("滚轮事件（passive）");
    },
    onDebouncedInput(value) {
      this.addDebounceLog(`尾沿触发: ${JSON.stringify(value)}`);
    },
    onDebouncedImmediate(value) {
      this.addDebounceLog(`头沿触发: ${JSON.stringify(value)}`);
    },
    onDebouncedTransformed(value) {
      this.addDebounceLog(`.trim/.number 后: ${JSON.stringify(value)}（类型：${typeof value}）`);
    },
    addDebounceLog(message) {
      const time = new Date().toLocaleTimeString();
      this.debounceLogs.push({ time, message });
      if (this.debounceLogs.length > 30) this.debounceLogs.shift();
    },
  },
};
</script>

<style scoped>
.modifiers-demo {
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

.demo-section {
  margin-bottom: 20px;
}
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 16px;
}
.mouse {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}
.box {
  padding: 12px;
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  margin: 8px 0;
}
.box.capture {
  background: #fafafa;
}
.box.self {
  background: #f6ffed;
}
.box.once {
  background: #fffbe6;
}
.box.passive .scroll {
  height: 80px;
  overflow: auto;
  background: #fafafa;
  padding: 8px;
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
.btn.danger {
  background: #ff4d4f;
}

.input {
  width: 100%;
  padding: 8px 10px;
  border: 1px solid #d9d9d9;
  border-radius: 6px;
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

@media (max-width: 768px) {
  .modifiers-demo {
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
