<template>
  <div class="slot-demo">
    <!-- 页面头部 -->
    <div class="header-section">
      <h1>Vue2 Slot 详解</h1>
      <p class="subtitle">理解插槽的分类、使用场景与实战例子</p>
    </div>

    <!-- 快速导航 -->
    <div class="quick-nav">
      <a href="#overview" class="nav-item">概述</a>
      <a href="#default-slot" class="nav-item">默认插槽</a>
      <a href="#named-slot" class="nav-item">具名插槽</a>
      <a href="#scoped-slot" class="nav-item">作用域插槽</a>
      <a href="#dynamic-slot" class="nav-item">动态插槽</a>
      <a href="#summary" class="nav-item">总结</a>
    </div>

    <!-- 概述 -->
    <section id="overview" class="content-section">
      <h2>Slot 概述</h2>
      <p class="section-intro">
        Vue
        插槽（Slot）是组件化开发中非常重要的概念，它允许父组件向子组件传递内容，实现组件的灵活性和可复用性。
        如果⽗组件在使⽤到⼀个复⽤组件的时候，获取这个组件在不同的地⽅有少量的更改，如果去重写组件
        是⼀件不明智的事情。通过 slot
        插槽向组件内部指定位置传递内容，完成这个复⽤组件在不同场景的应⽤，
        ⽐如布局组件、表格列、下拉选、弹框显示内容等。
      </p>

      <div class="concept-grid">
        <div class="concept-card">
          <h3>什么是插槽？</h3>
          <p>
            插槽是 Vue
            实现内容分发的一种方式，它允许我们在使用组件时，将组件标签内的内容传递到组件的指定位置。
          </p>
        </div>
        <div class="concept-card">
          <h3>插槽的作用</h3>
          <ul>
            <li>提高组件的灵活性</li>
            <li>实现内容分发</li>
            <li>增强组件的可复用性</li>
            <li>支持复杂的组件组合</li>
          </ul>
        </div>
      </div>
    </section>

    <!-- 默认插槽 -->
    <section id="default-slot" class="content-section">
      <h2>默认插槽 (Default Slot)</h2>
      <p class="section-intro">
        默认插槽是最基础的插槽类型，用于接收组件标签内的所有内容。当父组件没有指定插槽名称时，内容会传递到默认插槽。
      </p>

      <div class="example-container">
        <h3>使用场景</h3>
        <ul class="usage-list">
          <li><strong>通用容器组件</strong>：如卡片、面板等需要灵活内容的组件</li>
          <li><strong>按钮组件</strong>：允许自定义按钮文本和图标</li>
          <li><strong>模态框组件</strong>：自定义弹窗内容</li>
          <li><strong>列表项组件</strong>：自定义每个列表项的显示内容</li>
        </ul>

        <h3>实际效果展示</h3>
        <div class="live-demo">
          <h4>ChildComponent 默认插槽演示</h4>
          <div class="demo-container">
            <!-- 使用默认插槽传递内容 -->
            <child-component>
              <div class="slot-content">
                <p>这是从父组件传递的内容</p>
                <demo-button>父组件的按钮</demo-button>
              </div>
            </child-component>
          </div>

          <h4>DemoButton 默认插槽演示</h4>
          <div class="demo-container">
            <demo-button>自定义按钮文本</demo-button>
            <demo-button>
              <span>带图标的按钮</span>
              <span>🚀</span>
            </demo-button>
          </div>
        </div>

        <div class="code-explanation">
          <h4>实现原理</h4>
          <p>
            <code>ChildComponent</code> 使用 <code>&lt;slot&gt;</code> 标签接收父组件传递的内容，
            <code>DemoButton</code>
            同样使用默认插槽来接收按钮文本，这样父组件就可以灵活地控制子组件的内容。
          </p>
        </div>
      </div>
    </section>

    <!-- 具名插槽 -->
    <section id="named-slot" class="content-section">
      <h2>具名插槽 (Named Slots)</h2>
      <p class="section-intro">
        具名插槽允许我们为不同的插槽指定名称，实现更精确的内容分发。通过
        <code>v-slot</code> 指令或简写 <code>#</code> 来指定插槽名称。
      </p>

      <div class="example-container">
        <h3>使用场景</h3>
        <ul class="usage-list">
          <li><strong>布局组件</strong>：如页面布局、卡片布局等需要多个内容区域的组件</li>
          <li><strong>表单组件</strong>：自定义表单项的标签、输入框、错误提示等</li>
          <li><strong>导航组件</strong>：自定义导航的头部、菜单、底部等</li>
          <li><strong>数据展示组件</strong>：自定义表格的头部、行、底部等</li>
        </ul>

        <h3>实际效果展示</h3>
        <div class="live-demo">
          <h4>LayoutComponent 具名插槽演示</h4>
          <div class="demo-container">
            <layout-component>
              <template #header>
                <h1>我的网站标题</h1>
                <p>副标题：Vue2 插槽学习</p>
              </template>

              <template #main>
                <article>
                  <h2>主要内容区域</h2>
                  <p>这里可以放置页面的主要内容，比如文章、产品列表等。</p>
                  <demo-button>主内容按钮</demo-button>
                </article>
              </template>

              <template #sidebar>
                <nav>
                  <h3>导航菜单</h3>
                  <ul>
                    <li><a href="#home">首页</a></li>
                    <li><a href="#about">关于</a></li>
                    <li><a href="#contact">联系</a></li>
                  </ul>
                </nav>
              </template>

              <template #footer>
                <p>版权信息 © 2024</p>
                <p>Vue2 插槽学习项目</p>
              </template>
            </layout-component>
          </div>
        </div>

        <div class="code-explanation">
          <h4>实现原理</h4>
          <p>
            <code>LayoutComponent</code>
            定义了四个具名插槽：<code>header</code>、<code>main</code>、<code>sidebar</code>、<code>footer</code>。
            父组件通过
            <code>&lt;template #slotName&gt;</code> 的方式向指定插槽传递内容，实现了灵活的布局定制。
          </p>
        </div>
      </div>
    </section>

    <!-- 作用域插槽 -->
    <section id="scoped-slot" class="content-section">
      <h2>作用域插槽 (Scoped Slots)</h2>
      <p class="section-intro">
        作用域插槽允许子组件向父组件传递数据，实现数据的双向流动。父组件可以访问子组件传递的数据，并根据数据动态渲染内容。
      </p>

      <div class="example-container">
        <h3>使用场景</h3>
        <ul class="usage-list">
          <li><strong>列表组件</strong>：自定义每个列表项的渲染方式</li>
          <li><strong>表格组件</strong>：自定义表格列的显示内容和样式</li>
          <li><strong>表单组件</strong>：根据表单数据动态渲染表单项</li>
          <li><strong>数据展示组件</strong>：根据数据状态显示不同的UI</li>
        </ul>

        <h3>实际效果展示</h3>
        <div class="live-demo">
          <h4>DataList 作用域插槽演示</h4>
          <div class="demo-container">
            <data-list :items="demoItems">
              <template #default="{ item, index }">
                <custom-list-item :item="item" :index="index" />
              </template>
            </data-list>

            <h4>自定义渲染方式</h4>
            <data-list :items="demoItems">
              <template #default="{ item, index }">
                <div class="custom-render">
                  <span class="badge">{{ index + 1 }}</span>
                  <span class="name">{{ item.name }}</span>
                  <span class="age">{{ item.age }}岁</span>
                  <demo-button @click="handleItemClick(item)">查看详情</demo-button>
                </div>
              </template>
            </data-list>
          </div>
        </div>

        <div class="code-explanation">
          <h4>实现原理</h4>
          <p>
            <code>DataList</code> 组件通过
            <code>&lt;slot :item="item" :index="index"&gt;</code> 向父组件传递数据。
            父组件可以通过解构的方式接收这些数据，并使用
            <code>CustomListItem</code> 组件或自定义的渲染方式来显示数据。
            这样既保持了组件的复用性，又提供了高度的定制能力。
          </p>
        </div>
      </div>
    </section>

    <!-- 动态插槽 -->
    <section id="dynamic-slot" class="content-section">
      <h2>动态插槽 (Dynamic Slots)</h2>
      <p class="section-intro">
        动态插槽允许我们根据数据动态决定使用哪个插槽。通过动态的插槽名称，可以实现更灵活的组件组合。
      </p>

      <div class="example-container">
        <h3>使用场景</h3>
        <ul class="usage-list">
          <li><strong>条件渲染</strong>：根据状态动态选择不同的插槽</li>
          <li><strong>主题切换</strong>：根据主题动态选择不同的内容</li>
          <li><strong>权限控制</strong>：根据用户权限显示不同的内容</li>
          <li><strong>多语言支持</strong>：根据语言动态选择内容</li>
        </ul>

        <h3>实际效果展示</h3>
        <div class="live-demo">
          <h4>动态插槽切换演示</h4>
          <div class="demo-container">
            <div class="dynamic-slot-demo">
              <div class="slot-display">
                <div v-if="currentSlot === 'header'" class="slot-content header">
                  <h2>头部内容</h2>
                  <p>这是头部插槽的内容</p>
                </div>
                <div v-else-if="currentSlot === 'content'" class="slot-content content">
                  <p>主要内容</p>
                  <ul>
                    <li>列表项 1</li>
                    <li>列表项 2</li>
                    <li>列表项 3</li>
                  </ul>
                </div>
                <div v-else-if="currentSlot === 'footer'" class="slot-content footer">
                  <p>底部内容</p>
                  <demo-button>底部按钮</demo-button>
                </div>
              </div>
              <demo-button @click="changeSlot">切换插槽</demo-button>
              <p class="current-slot">当前插槽: {{ currentSlot }}</p>
            </div>
          </div>

          <h4>DynamicSlot 组件演示</h4>
          <div class="demo-container">
            <dynamic-slot :slot-name="currentSlot">
              <template #header>
                <div class="slot-content header">
                  <h3>动态头部</h3>
                  <p>通过 props 动态传递插槽名称</p>
                </div>
              </template>
              <template #content>
                <div class="slot-content content">
                  <h3>动态内容</h3>
                  <p>内容区域</p>
                </div>
              </template>
              <template #footer>
                <div class="slot-content footer">
                  <h3>动态底部</h3>
                  <p>底部区域</p>
                </div>
              </template>
            </dynamic-slot>
          </div>
        </div>

        <div class="code-explanation">
          <h4>实现原理</h4>
          <p>
            动态插槽通过 <code>v-if/v-else-if</code> 指令根据
            <code>currentSlot</code> 的值来条件渲染不同的内容。 <code>DynamicSlot</code> 组件接收
            <code>slotName</code> 属性，父组件可以根据需要动态切换插槽内容。
            这种方式特别适合需要根据状态或配置动态显示不同内容的场景。
          </p>
        </div>
      </div>
    </section>

    <!-- 总结 -->
    <section id="summary" class="content-section">
      <h2>总结</h2>
      <div class="summary-content">
        <div class="summary-grid">
          <div class="summary-card">
            <h3>插槽类型对比</h3>
            <table class="comparison-table">
              <thead>
                <tr>
                  <th>类型</th>
                  <th>语法</th>
                  <th>使用场景</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>默认插槽</strong></td>
                  <td><code>&lt;slot&gt;</code></td>
                  <td>通用容器、按钮、模态框</td>
                </tr>
                <tr>
                  <td><strong>具名插槽</strong></td>
                  <td><code>&lt;slot name="xxx"&gt;</code></td>
                  <td>布局组件、表单、导航</td>
                </tr>
                <tr>
                  <td><strong>作用域插槽</strong></td>
                  <td><code>&lt;slot :data="xxx"&gt;</code></td>
                  <td>列表、表格、数据展示</td>
                </tr>
                <tr>
                  <td><strong>动态插槽</strong></td>
                  <td><code>v-if + 插槽</code></td>
                  <td>条件渲染、主题切换</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div class="summary-card">
            <h3>实际应用场景</h3>
            <ul>
              <li><strong>布局系统</strong>：使用具名插槽构建灵活的页面布局</li>
              <li><strong>数据展示</strong>：使用作用域插槽自定义数据渲染方式</li>
              <li><strong>表单系统</strong>：使用插槽自定义表单项的显示和验证</li>
              <li><strong>组件库</strong>：使用插槽提供高度可定制的组件</li>
              <li><strong>主题系统</strong>：使用动态插槽实现主题切换</li>
            </ul>
          </div>

          <div class="summary-card">
            <h3>最佳实践</h3>
            <ul>
              <li>为插槽提供合理的默认内容，提高组件的易用性</li>
              <li>使用语义化的插槽名称，提高代码的可读性</li>
              <li>合理使用作用域插槽传递数据，避免过度复杂化</li>
              <li>保持插槽的单一职责，一个插槽只负责一个功能</li>
              <li>使用 TypeScript 类型定义提高插槽的类型安全性</li>
            </ul>
          </div>
        </div>

        <div class="key-points">
          <h3>关键要点</h3>
          <p>
            插槽是 Vue
            组件化开发中实现内容分发的重要机制，合理使用插槽可以大大提高组件的灵活性和可复用性。
            通过不同类型的插槽，我们可以创建出功能强大且易于维护的组件系统。
            在实际开发中，应该根据具体需求选择合适的插槽类型，并遵循最佳实践来构建高质量的组件。
          </p>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import ChildComponent from "../components/ChildComponent.vue";
import LayoutComponent from "../components/LayoutComponent.vue";
import DataList from "../components/DataList.vue";
import CustomListItem from "../components/CustomListItem.vue";
import DemoButton from "../components/DemoButton.vue";
import DynamicSlot from "../components/DynamicSlot.vue";

export default {
  name: "SlotDemo",
  components: {
    ChildComponent,
    LayoutComponent,
    DataList,
    CustomListItem,
    DemoButton,
    DynamicSlot,
  },
  data() {
    return {
      demoItems: [
        { id: 1, name: "张三", age: 25 },
        { id: 2, name: "李四", age: 30 },
        { id: 3, name: "王五", age: 28 },
      ],
      currentSlot: "header",
    };
  },
  methods: {
    changeSlot() {
      const slots = ["header", "content", "footer"];
      const currentIndex = slots.indexOf(this.currentSlot);
      this.currentSlot = slots[(currentIndex + 1) % slots.length];
    },
    handleItemClick(item) {
      alert(`点击了 ${item.name}，年龄：${item.age}岁`);
    },
  },
};
</script>

<style scoped>
.slot-demo {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
}

.header-section {
  text-align: center;
  margin-bottom: 40px;
  padding: 40px 0;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-radius: 12px;
}

.header-section h1 {
  font-size: 2.5rem;
  margin-bottom: 10px;
  font-weight: 700;
}

.subtitle {
  font-size: 1.2rem;
  opacity: 0.9;
}

.quick-nav {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 15px;
  margin-bottom: 40px;
  padding: 20px;
  background: #f8f9fa;
  border-radius: 8px;
}

.nav-item {
  padding: 8px 16px;
  background: #007bff;
  color: white;
  text-decoration: none;
  border-radius: 20px;
  font-size: 0.9rem;
  transition: all 0.3s ease;
}

.nav-item:hover {
  background: #0056b3;
  transform: translateY(-2px);
}

.content-section {
  margin-bottom: 50px;
  padding: 30px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.content-section h2 {
  color: #2c3e50;
  font-size: 1.8rem;
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 3px solid #3498db;
}

.section-intro {
  font-size: 1.1rem;
  color: #555;
  margin-bottom: 25px;
  line-height: 1.6;
}

.concept-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  margin-top: 25px;
}

.concept-card {
  padding: 20px;
  background: #f8f9fa;
  border-radius: 8px;
  border-left: 4px solid #3498db;
}

.concept-card h3 {
  color: #2c3e50;
  margin-bottom: 15px;
}

.concept-card ul {
  padding-left: 20px;
}

.concept-card li {
  margin-bottom: 8px;
  color: #555;
}

.example-container {
  margin-top: 30px;
}

.example-container h3 {
  color: #2c3e50;
  margin-bottom: 20px;
  font-size: 1.3rem;
}

.usage-list {
  background: #f8f9fa;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 25px;
  border-left: 4px solid #28a745;
}

.usage-list li {
  margin-bottom: 10px;
  color: #555;
  line-height: 1.5;
}

.usage-list strong {
  color: #2c3e50;
}

.live-demo {
  margin-top: 30px;
}

.live-demo h4 {
  color: #34495e;
  margin-bottom: 15px;
  font-size: 1.1rem;
}

.demo-container {
  padding: 20px;
  background: #f8f9fa;
  border-radius: 8px;
  border: 2px solid #e9ecef;
  margin-bottom: 20px;
}

.slot-content {
  padding: 15px;
  background: #e3f2fd;
  border-radius: 6px;
  margin: 15px 0;
}

.code-explanation {
  background: #f1f3f4;
  padding: 20px;
  border-radius: 8px;
  margin-top: 20px;
  border-left: 4px solid #ffc107;
}

.code-explanation h4 {
  color: #2c3e50;
  margin-bottom: 15px;
}

.code-explanation p {
  color: #555;
  line-height: 1.6;
}

.code-explanation code {
  background: #e9ecef;
  padding: 2px 6px;
  border-radius: 4px;
  font-family: "Courier New", monospace;
}

/* 动态插槽样式 */
.dynamic-slot-demo {
  text-align: center;
}

.slot-display {
  margin: 20px 0;
  min-height: 100px;
}

.slot-content.header {
  background: #d4edda;
  border: 2px solid #c3e6cb;
  color: #155724;
}

.slot-content.content {
  background: #d1ecf1;
  border: 2px solid #bee5eb;
  color: #0c5460;
}

.slot-content.footer {
  background: #f8d7da;
  border: 2px solid #f5c6cb;
  color: #721c24;
}

.current-slot {
  margin-top: 15px;
  font-weight: 500;
  color: #6c757d;
}

/* 自定义渲染样式 */
.custom-render {
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 10px;
  background: #f8f9fa;
  border-radius: 6px;
  margin: 5px 0;
}

.custom-render .badge {
  background: #007bff;
  color: white;
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 0.8rem;
  font-weight: bold;
}

.custom-render .name {
  font-weight: 500;
  color: #2c3e50;
}

.custom-render .age {
  color: #6c757d;
  font-size: 0.9rem;
}

/* 总结样式 */
.summary-content {
  margin-top: 25px;
}

.summary-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 25px;
  margin-bottom: 30px;
}

.summary-card {
  padding: 25px;
  background: #f8f9fa;
  border-radius: 10px;
  border-left: 4px solid #ffc107;
}

.summary-card h3 {
  color: #2c3e50;
  margin-bottom: 20px;
  font-size: 1.3rem;
}

.summary-card ul {
  padding-left: 20px;
}

.summary-card li {
  margin-bottom: 10px;
  color: #555;
  line-height: 1.5;
}

.summary-card strong {
  color: #2c3e50;
}

.comparison-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 15px;
}

.comparison-table th,
.comparison-table td {
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid #dee2e6;
}

.comparison-table th {
  background: #e9ecef;
  font-weight: 600;
  color: #2c3e50;
}

.comparison-table td {
  color: #555;
}

.comparison-table code {
  background: #e9ecef;
  padding: 2px 6px;
  border-radius: 4px;
  font-family: "Courier New", monospace;
}

.key-points {
  padding: 25px;
  background: #e3f2fd;
  border-radius: 10px;
  border-left: 4px solid #2196f3;
}

.key-points h3 {
  color: #2c3e50;
  margin-bottom: 15px;
  font-size: 1.3rem;
}

.key-points p {
  color: #555;
  line-height: 1.6;
  font-size: 1.1rem;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .slot-demo {
    padding: 15px;
  }

  .header-section h1 {
    font-size: 2rem;
  }

  .quick-nav {
    flex-direction: column;
    align-items: center;
  }

  .concept-grid,
  .summary-grid {
    grid-template-columns: 1fr;
  }

  .layout-component {
    grid-template-columns: 1fr;
    grid-template-rows: auto auto auto auto;
  }

  .layout-component .sidebar {
    grid-column: 1;
  }

  .comparison-table {
    font-size: 0.9rem;
  }

  .comparison-table th,
  .comparison-table td {
    padding: 8px;
  }
}
</style>
