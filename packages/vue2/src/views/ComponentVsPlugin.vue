<template>
  <div class="component-vs-plugin">
    <div class="header-section">
      <h1>Vue2 组件 vs 插件</h1>
      <p class="subtitle">理解组件和插件的本质区别及其应用场景</p>
    </div>

    <!-- 概念对比 -->
    <div class="concept-section">
      <h2>概念对比</h2>
      <div class="comparison-grid">
        <div class="comparison-card">
          <h3>组件 (Component)</h3>
          <ul>
            <li>可复用的Vue实例</li>
            <li>拥有自己的模板、逻辑和样式</li>
            <li>通过 props 接收数据</li>
            <li>通过 events 向父组件通信</li>
            <li>作用域局限于组件内部</li>
          </ul>
        </div>
        <div class="comparison-card">
          <h3>插件 (Plugin)</h3>
          <ul>
            <li>全局功能增强器</li>
            <li>可以添加全局方法、指令、混入等</li>
            <li>通过 Vue.use() 安装</li>
            <li>主要是对Vue功能的增强与补充，影响整个Vue应用</li>
            <li>通常用于第三方库集成</li>
          </ul>
        </div>
      </div>
    </div>

    <!-- 组件示例 -->
    <div class="example-section">
      <h2>组件示例</h2>

      <h3>1. 基础组件</h3>
      <div class="code-demo">
        <div class="demo-preview">
          <h4>预览效果：</h4>
          <CustomButton :text="buttonText" :type="buttonType" @click="handleButtonClick" />
          <div class="button-controls">
            <label>按钮文本：</label>
            <input v-model="buttonText" placeholder="输入按钮文本" />
            <br /><br />
            <label>按钮类型：</label>
            <select v-model="buttonType">
              <option value="primary">Primary</option>
              <option value="secondary">Secondary</option>
              <option value="danger">Danger</option>
            </select>
          </div>
        </div>
        <div class="code-block">
          <h4>组件定义（使用 render 函数）：</h4>
          <pre><code>// CustomButton.vue
const CustomButton = {
  name: 'CustomButton',
  props: {
    text: {
      type: String,
      default: 'Button'
    },
    type: {
      type: String,
      default: 'primary'
    }
  },
  render(h) {
    return h('button', {
      class: ['custom-btn', 'btn-' + this.type],
      on: {
        click: () => this.$emit('click')
      }
    }, this.text);
  }
};</code></pre>
        </div>
      </div>

      <h3>2. 组件通信示例</h3>
      <div class="code-demo">
        <div class="demo-preview">
          <h4>预览效果：</h4>
          <div class="counter-demo">
            <p>当前计数：{{ counter }}</p>
            <CounterControls
              :value="counter"
              @increment="counter++"
              @decrement="counter--"
              @reset="counter = 0"
            />
          </div>
        </div>
        <div class="code-block">
          <h4>父子组件通信（使用 render 函数）：</h4>
          <pre><code>// 父组件
&lt;CounterControls 
  :value="counter"           // 传递数据
  @increment="counter++"     // 监听事件
  @decrement="counter--"
  @reset="counter = 0"
/&gt;

// 子组件
const CounterControls = {
  name: 'CounterControls',
  props: {
    value: {
      type: Number,
      default: 0
    }
  },
  render(h) {
    return h('div', { class: 'counter-controls' }, [
      h('button', {
        class: ['counter-btn', 'counter-btn-secondary'],
        on: { click: () => this.$emit('decrement') }
      }, '-'),
      h('span', { class: 'counter-value' }, this.value),
      h('button', {
        class: ['counter-btn', 'counter-btn-primary'],
        on: { click: () => this.$emit('increment') }
      }, '+'),
      h('button', {
        class: ['counter-btn', 'counter-btn-danger'],
        on: { click: () => this.$emit('reset') }
      }, '重置')
    ]);
  }
};</code></pre>
        </div>
      </div>
    </div>

    <!-- 插件示例 -->
    <div class="example-section">
      <h2>插件示例</h2>

      <h3>1. 真实插件演示</h3>
      <div class="code-demo">
        <div class="demo-preview">
          <h4>预览效果：</h4>
          <div class="plugin-demo">
            <h5>全局方法演示：</h5>
            <button @click="demoFormatDate">格式化当前时间</button>
            <p>格式化结果：{{ formattedDate }}</p>

            <h5>全局指令演示：</h5>
            <input v-focus v-model="inputText" placeholder="自动聚焦的输入框" />
            <input v-model="inputText" placeholder="非自动聚焦的输入框（对比用）" />
            <div v-highlight="highlightColor" class="highlight-demo">
              高亮背景区域 (点击按钮改变颜色)
            </div>
            <button @click="changeHighlightColor">改变高亮颜色</button>

            <h5>全局过滤器演示：</h5>
            <p>金额：{{ 1234.56 | currency }}</p>
            <p>金额：{{ 1234.56 | currency("USD") }}</p>
            <p>大写：{{ "hello world" | capitalize }}</p>
            <p>大写：{{ "vue.js" | capitalize }}</p>
            <h5>Toast 提示演示：</h5>
            <button @click="showSuccessToast">成功提示</button>
            <button @click="showErrorToast">错误提示</button>
            <button @click="showWarningToast">警告提示</button>
          </div>
        </div>
        <div class="code-block">
          <h4>插件定义（包含5种增强方式）：</h4>
          <pre><code>// myPlugin.js
export default {
  install(Vue, options = {}) {
    const { debug = false, prefix = 'MyPlugin' } = options;
    
    // 1. 添加全局方法
    Vue.prototype.$formatDate = function(date, format = 'zh-CN') {
      if (!date) return '';
      if (typeof date === 'string') {
        date = new Date(date);
      }
      
      switch (format) {
        case 'zh-CN':
          return date.toLocaleDateString('zh-CN');
        case 'en-US':
          return date.toLocaleDateString('en-US');
        case 'iso':
          return date.toISOString();
        default:
          return date.toLocaleDateString();
      }
    };
    
    Vue.prototype.$showToast = function(message, type = 'info', duration = 3000) {
      // 创建toast元素
      const toast = document.createElement('div');
      toast.className = `my-plugin-toast my-plugin-toast-${type}`;
      toast.textContent = message;
      
      // 添加到页面
      document.body.appendChild(toast);
      
      // 显示动画
      setTimeout(() => toast.classList.add('show'), 100);
      
      // 自动移除
      setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => document.body.removeChild(toast), 300);
      }, duration);
    };
    
    // 2. 添加全局指令
    Vue.directive('focus', {
      inserted: function(el) {
        el.focus();
      },
      update: function(el) {
        if (el.value) {
          el.focus();
        }
      }
    });
    
    Vue.directive('highlight', {
      bind(el, binding) {
        const color = binding.value || '#ffeb3b';
        el.style.backgroundColor = color;
        el.style.transition = 'background-color 0.3s';
      },
      update(el, binding) {
        const color = binding.value || '#ffeb3b';
        el.style.backgroundColor = color;
      }
    });
    
    // 3. 添加全局混入
    Vue.mixin({
      created() {
        if (debug) {
          console.log(`[${prefix}] 组件 ${this.$options.name || 'Anonymous'} 被创建`);
        }
      },
      mounted() {
        if (debug) {
          console.log(`[${prefix}] 组件 ${this.$options.name || 'Anonymous'} 已挂载`);
        }
      }
    });
    
    // 4. 添加全局过滤器
    Vue.filter('currency', function(value, currency = 'CNY') {
      if (!value && value !== 0) return '';
      
      const formatter = new Intl.NumberFormat('zh-CN', {
        style: 'currency',
        currency: 'CNY'
      });
      
      return formatter.format(value);
    });
    
    Vue.filter('capitalize', function(value) {
      if (!value) return '';
      return value.charAt(0).toUpperCase() + value.slice(1);
    });
    
    // 5. 添加全局属性
    Vue.prototype.$pluginConfig = {
      debug,
      prefix,
      version: '1.0.0'
    };
    
    if (debug) {
      console.log(`[${prefix}] 插件已安装，版本: 1.0.0`);
    }
  }
};</code></pre>
        </div>
      </div>

      <h3>2. 插件使用</h3>
      <div class="code-block">
        <h4>安装和使用插件：</h4>
        <pre><code>// main.js
import Vue from 'vue'
import MyPlugin from './plugins/myPlugin'

// 安装插件
Vue.use(MyPlugin, {
  debug: true,        // 启用调试模式
  prefix: 'MyPlugin'  // 自定义前缀
})

// 在组件中使用
export default {
  mounted() {
    // 使用全局方法
    this.$formatDate(new Date())
    this.$showToast('插件加载成功！', 'success')
    
    // 使用全局指令
    // &lt;input v-focus&gt;
    // &lt;div v-highlight="'#ffeb3b'"&gt;
    
    // 使用全局过滤器
    // {{ 1234.56 | currency }}
    // {{ 'hello' | capitalize }}
    
    // 使用全局混入
    // 会自动在每个组件创建时执行
    
    // 访问插件配置
    console.log('插件版本:', this.$pluginConfig.version)
  }
}</code></pre>
      </div>
    </div>

    <!-- 实际应用场景 -->
    <div class="scenarios-section">
      <h2>应用场景对比</h2>

      <div class="scenarios-grid">
        <div class="scenario-card">
          <h3>何时使用组件？</h3>
          <ul>
            <li>需要复用的UI元素（按钮、表单、卡片等）</li>
            <li>业务逻辑模块化（用户列表、商品详情等）</li>
            <li>页面布局组件（头部、侧边栏、页脚等）</li>
            <li>需要父子组件通信的场景</li>
            <li>组件内部状态管理</li>
          </ul>
        </div>

        <div class="scenario-card">
          <h3>何时使用插件？</h3>
          <ul>
            <li>全局功能增强（路由、状态管理等）</li>
            <li>第三方库集成（Element UI、Vuex等）</li>
            <li>全局指令、混入、方法</li>
            <li>跨组件的工具方法</li>
            <li>应用级别的配置和初始化</li>
          </ul>
        </div>
      </div>
    </div>

    <!-- 总结 -->
    <div class="summary-section">
      <h2>总结</h2>
      <div class="summary-content">
        <p><strong>组件</strong>是Vue应用的基础构建块，专注于UI的复用和组件间的通信。</p>
        <p><strong>插件</strong>是Vue应用的增强器，提供全局功能扩展和第三方库集成能力。</p>
        <p>
          在实际开发中，组件用于构建用户界面，插件用于增强Vue的功能。两者结合使用，可以构建出功能强大、结构清晰的Vue应用。
        </p>
      </div>
    </div>
  </div>
</template>

<script>
// 自定义按钮组件
const CustomButton = {
  name: "CustomButton",
  props: {
    text: {
      type: String,
      default: "Button",
    },
    type: {
      type: String,
      default: "primary",
    },
  },
  render(h) {
    return h(
      "button",
      {
        class: ["custom-btn", "btn-" + this.type],
        on: {
          click: () => this.$emit("click"),
        },
      },
      this.text
    );
  },
};

// 计数器控制组件
const CounterControls = {
  name: "CounterControls",
  props: {
    value: {
      type: Number,
      default: 0,
    },
  },
  render(h) {
    return h("div", { class: "counter-controls" }, [
      h(
        "button",
        {
          class: ["counter-btn", "counter-btn-secondary"],
          on: { click: () => this.$emit("decrement") },
        },
        "-"
      ),
      h("span", { class: "counter-value" }, this.value),
      h(
        "button",
        {
          class: ["counter-btn", "counter-btn-primary"],
          on: { click: () => this.$emit("increment") },
        },
        "+"
      ),
      h(
        "button",
        {
          class: ["counter-btn", "counter-btn-danger"],
          on: { click: () => this.$emit("reset") },
        },
        "重置"
      ),
    ]);
  },
};

export default {
  name: "ComponentVsPlugin",
  components: {
    CustomButton,
    CounterControls,
  },
  data() {
    return {
      buttonText: "点击我",
      buttonType: "primary",
      counter: 0,
      formattedDate: "",
      inputText: "",
      highlightColor: "#ffeb3b",
    };
  },
  methods: {
    handleButtonClick() {
      this.showToast("info", `你点击了：${this.buttonText}`);
    },
    showToast(type, message) {
      // 模拟toast提示
      alert(`${type.toUpperCase()}: ${message}`);
    },
    formatDate(date) {
      this.formattedDate = date.toLocaleDateString("zh-CN");
    },
    // 插件演示方法
    demoFormatDate() {
      this.formattedDate = this.$formatDate(new Date(), "zh-CN");
    },
    changeHighlightColor() {
      const colors = ["#ffeb3b", "#4caf50", "#2196f3", "#f44336", "#9c27b0"];
      const currentIndex = colors.indexOf(this.highlightColor);
      const nextIndex = (currentIndex + 1) % colors.length;
      this.highlightColor = colors[nextIndex];
    },
    showSuccessToast() {
      console.log("=== showSuccessToast 开始 ===");
      console.log("this.$showToast:", this.$showToast);
      console.log("typeof this.$showToast:", typeof this.$showToast);

      if (typeof this.$showToast === "function") {
        console.log("调用 $showToast...");
        try {
          this.$showToast("操作成功！", "success");
          console.log("$showToast 调用完成");
        } catch (error) {
          console.error("调用 $showToast 时出错:", error);
        }
      } else {
        console.error("this.$showToast 不是一个函数！");
        console.log("Vue.prototype:", Vue.prototype);
        console.log("Vue.prototype.$showToast:", Vue.prototype.$showToast);
      }
      console.log("=== showSuccessToast 结束 ===");
    },
    showErrorToast() {
      this.$showToast("操作失败！", "error");
    },
    showWarningToast() {
      this.$showToast("请注意！", "warning");
    },
    testDirectToast() {
      this.$showToast("直接测试Toast！", "info");
    },
    testPluginInstallation() {
      console.log("=== 测试插件安装状态 ===");
      console.log("this.$formatDate:", this.$formatDate);
      console.log("this.$showToast:", this.$showToast);
      console.log("this.$pluginConfig:", this.$pluginConfig);
      console.log("Vue.prototype.$showToast:", Vue.prototype.$showToast);
      console.log("=== 插件安装状态测试完成 ===");
    },
  },
};
</script>

<style scoped>
.component-vs-plugin {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.header-section {
  text-align: center;
  margin-bottom: 40px;
  padding: 30px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-radius: 10px;
}

.header-section h1 {
  margin: 0 0 10px 0;
  font-size: 2.5em;
}

.subtitle {
  font-size: 1.2em;
  opacity: 0.9;
  margin: 0;
}

.concept-section,
.example-section,
.scenarios-section,
.summary-section {
  margin-bottom: 40px;
}

h2 {
  color: #2c3e50;
  border-bottom: 3px solid #42b983;
  padding-bottom: 10px;
  margin-bottom: 20px;
}

h3 {
  color: #34495e;
  margin: 25px 0 15px 0;
}

.comparison-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-bottom: 30px;
}

.comparison-card {
  background: #f8f9fa;
  padding: 20px;
  border-radius: 8px;
  border-left: 4px solid #42b983;
}

.comparison-card h3 {
  color: #42b983;
  margin-top: 0;
}

.comparison-card ul {
  margin: 0;
  padding-left: 20px;
}

.comparison-card li {
  margin-bottom: 8px;
  line-height: 1.6;
}

.code-demo {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-bottom: 30px;
  background: #f8f9fa;
  padding: 20px;
  border-radius: 8px;
}

.demo-preview {
  padding: 20px;
  background: white;
  border-radius: 6px;
  border: 1px solid #e9ecef;
}

.code-block {
  background: #2d3748;
  color: #e2e8f0;
  padding: 20px;
  border-radius: 6px;
  overflow-x: auto;
}

.code-block h4 {
  color: #81e6d9;
  margin-top: 0;
}

.code-block pre {
  margin: 0;
}

.code-block code {
  font-family: "Courier New", monospace;
  font-size: 14px;
  line-height: 1.5;
}

.custom-btn {
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  margin: 10px;
  transition: all 0.3s ease;
}

.btn-primary {
  background: #007bff;
  color: white;
}

.btn-primary:hover {
  background: #0056b3;
}

.btn-secondary {
  background: #6c757d;
  color: white;
}

.btn-secondary:hover {
  background: #545b62;
}

.btn-danger {
  background: #dc3545;
  color: white;
}

.btn-danger:hover {
  background: #c82333;
}

.button-controls {
  margin-top: 20px;
}

.button-controls label {
  display: inline-block;
  width: 80px;
  margin-right: 10px;
}

.button-controls input,
.button-controls select {
  padding: 5px;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-bottom: 10px;
}

.counter-demo {
  text-align: center;
}

.counter-demo p {
  font-size: 18px;
  font-weight: bold;
  color: #2c3e50;
}

.counter-controls {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin-top: 15px;
}

.counter-controls .counter-btn {
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  margin: 0 5px;
}

.counter-btn-primary {
  background: #007bff;
  color: white;
}

.counter-btn-primary:hover {
  background: #0056b3;
}

.counter-btn-secondary {
  background: #6c757d;
  color: white;
}

.counter-btn-secondary:hover {
  background: #545b62;
}

.counter-btn-danger {
  background: #dc3545;
  color: white;
}

.counter-btn-danger:hover {
  background: #c82333;
}

.counter-value {
  font-size: 20px;
  font-weight: bold;
  color: #2c3e50;
  min-width: 40px;
  text-align: center;
}

.plugin-demo {
  text-align: center;
}

.plugin-demo button {
  margin: 5px;
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  background: #42b983;
  color: white;
}

.plugin-demo button:hover {
  background: #3aa876;
}

.plugin-demo h5 {
  margin: 20px 0 10px 0;
  color: #2c3e50;
  border-bottom: 1px solid #e9ecef;
  padding-bottom: 5px;
}

.plugin-demo h5:first-child {
  margin-top: 0;
}

.highlight-demo {
  padding: 15px;
  margin: 10px 0;
  border-radius: 4px;
  text-align: center;
  font-weight: bold;
  color: #333;
  cursor: pointer;
}

.plugin-demo input {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin: 10px 0;
}

.scenarios-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

.scenario-card {
  background: #f8f9fa;
  padding: 20px;
  border-radius: 8px;
  border-left: 4px solid #17a2b8;
}

.scenario-card h3 {
  color: #17a2b8;
  margin-top: 0;
}

.scenario-card ul {
  margin: 0;
  padding-left: 20px;
}

.scenario-card li {
  margin-bottom: 8px;
  line-height: 1.6;
}

.summary-section {
  background: #e8f5e8;
  padding: 30px;
  border-radius: 10px;
  border-left: 5px solid #42b983;
}

.summary-content p {
  line-height: 1.8;
  margin-bottom: 15px;
  font-size: 16px;
}

.summary-content strong {
  color: #2c3e50;
}

@media (max-width: 768px) {
  .comparison-grid,
  .code-demo,
  .scenarios-grid {
    grid-template-columns: 1fr;
  }

  .code-demo {
    grid-template-columns: 1fr;
  }

  .demo-preview {
    order: 1;
  }

  .code-block {
    order: 2;
  }
}
</style>

<!-- 全局 Toast 样式 -->
<style>
/* Toast 样式 - 全局作用域 */
.my-plugin-toast {
  position: fixed;
  top: 20px;
  right: 20px;
  padding: 12px 20px;
  border-radius: 4px;
  color: white;
  font-weight: bold;
  z-index: 9999;
  transform: translateX(100%);
  transition: transform 0.3s ease;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  font-family: Arial, sans-serif;
  font-size: 14px;
  min-width: 200px;
  text-align: center;
}

.my-plugin-toast.show {
  transform: translateX(0);
}

.my-plugin-toast-success {
  background-color: #4caf50;
}

.my-plugin-toast-error {
  background-color: #f44336;
}

.my-plugin-toast-warning {
  background-color: #ff9800;
}

.my-plugin-toast-info {
  background-color: #2196f3;
}
</style>
