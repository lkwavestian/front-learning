<template>
  <div class="keep-alive-demo">
    <!-- 页面头部 -->
    <div class="header-section">
      <h1>Vue2 Keep-Alive 详解</h1>
      <p class="subtitle">理解组件缓存机制、使用场景与实战应用</p>
    </div>

    <!-- 快速导航 -->
    <div class="quick-nav">
      <a href="#what-is-keep-alive" class="nav-item">是什么</a>
      <a href="#use-cases" class="nav-item">使用场景</a>
      <a href="#real-example" class="nav-item">真实例子</a>
      <a href="#hook-demo" class="nav-item">钩子演示</a>
      <a href="#router-level" class="nav-item">路由级缓存</a>
      <a href="#advanced-usage" class="nav-item">高级用法</a>
      <a href="#summary" class="nav-item">总结</a>
    </div>

    <!-- 什么是 Keep-Alive -->
    <section id="what-is-keep-alive" class="content-section">
      <h2>什么是 Keep-Alive？</h2>
      <p class="section-intro">
        <code>&lt;keep-alive&gt;</code> 是 Vue2 内置的一个抽象组件，用于缓存组件实例。
        当组件被包裹在 <code>&lt;keep-alive&gt;</code> 中时，组件的状态会被保留，
        避免重复渲染，提升用户体验和性能。
      </p>

      <div class="concept-grid">
        <div class="concept-card">
          <h3>🔍 核心概念</h3>
          <ul>
            <li><strong>组件缓存</strong>：缓存不活动的组件实例，而不是销毁它们</li>
            <li><strong>状态保持</strong>：组件的所有状态（数据、DOM、事件监听器）都会被保留</li>
            <li><strong>生命周期</strong>：被缓存的组件不会触发 <code>destroyed</code> 钩子</li>
            <li><strong>性能优化</strong>：避免重复的组件创建和销毁，减少性能开销</li>
          </ul>
        </div>

        <div class="concept-card">
          <h3>⚙️ 工作原理</h3>
          <ul>
            <li><strong>LRU 算法</strong>：使用最近最少使用算法管理缓存</li>
            <li><strong>虚拟 DOM</strong>：在虚拟 DOM 层面进行组件缓存</li>
            <li>
              <strong>条件渲染</strong>：根据 <code>include</code>、<code>exclude</code>
              属性控制缓存
            </li>
            <li><strong>动态切换</strong>：支持动态组件的缓存管理</li>
          </ul>
        </div>

        <div class="concept-card">
          <h3>🎯 适用组件</h3>
          <ul>
            <li><strong>路由组件</strong>：需要保持状态的页面组件</li>
            <li><strong>表单组件</strong>：用户输入内容需要保留的表单</li>
            <li><strong>列表组件</strong>：滚动位置、筛选状态需要保持的列表</li>
            <li><strong>复杂组件</strong>：计算成本高、渲染耗时的组件</li>
          </ul>
        </div>
      </div>
    </section>

    <!-- 使用场景 -->
    <section id="use-cases" class="content-section">
      <h2>Keep-Alive 的使用场景</h2>
      <p class="section-intro">
        <code>&lt;keep-alive&gt;</code>
        在多种场景下都能发挥重要作用，特别是在需要保持组件状态的场景中。
        了解这些使用场景有助于我们更好地应用组件缓存技术。
      </p>

      <div class="scenarios-grid">
        <div class="scenario-card">
          <h3>🏠 单页应用路由</h3>
          <div class="scenario-content">
            <h4>场景描述</h4>
            <p>在 SPA 应用中，用户在不同页面间切换时，希望保持之前页面的状态。</p>

            <h4>具体应用</h4>
            <ul>
              <li>用户列表页面：保持分页、筛选、排序状态</li>
              <li>表单页面：保持用户已输入的内容</li>
              <li>详情页面：保持展开/收起状态</li>
              <li>设置页面：保持用户的配置选择</li>
            </ul>
          </div>
        </div>

        <div class="scenario-card">
          <h3>📝 表单组件</h3>
          <div class="scenario-content">
            <h4>场景描述</h4>
            <p>用户在填写复杂表单时，可能需要切换到其他页面查看信息，返回后希望表单内容不丢失。</p>

            <h4>具体应用</h4>
            <ul>
              <li>多步骤注册表单</li>
              <li>商品发布表单</li>
              <li>文章编辑页面</li>
              <li>配置设置表单</li>
            </ul>
          </div>
        </div>

        <div class="scenario-card">
          <h3>📊 数据展示组件</h3>
          <div class="scenario-content">
            <h4>场景描述</h4>
            <p>数据展示组件（如表格、图表）在用户操作后需要保持当前状态，避免重复加载数据。</p>

            <h4>具体应用</h4>
            <ul>
              <li>数据表格：保持分页、排序、筛选状态</li>
              <li>图表组件：保持缩放、平移、图例状态</li>
              <li>树形组件：保持展开/收起状态</li>
              <li>列表组件：保持滚动位置、选中状态</li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- 真实例子 -->
    <section id="real-example" class="content-section">
      <h2>Keep-Alive 真实例子演示</h2>
      <p class="section-intro">
        下面通过一个完整的例子来演示 <code>&lt;keep-alive&gt;</code> 的实际应用。
        这个例子模拟了一个用户管理系统，包含用户列表、用户详情和用户编辑三个组件。
      </p>

      <div class="demo-container">
        <!-- 导航控制 -->
        <div class="demo-navigation">
          <h4>组件切换控制</h4>
          <div class="nav-buttons">
            <button
              @click="currentComponent = 'UserList'"
              :class="{ active: currentComponent === 'UserList' }"
              class="nav-btn"
            >
              用户列表
            </button>
            <button
              @click="currentComponent = 'UserDetail'"
              :class="{ active: currentComponent === 'UserDetail' }"
              class="nav-btn"
            >
              用户详情
            </button>
            <button
              @click="currentComponent = 'UserEdit'"
              :class="{ active: currentComponent === 'UserEdit' }"
              class="nav-btn"
            >
              用户编辑
            </button>
          </div>

          <div class="keep-alive-control">
            <label class="control-label">
              <input type="checkbox" v-model="useKeepAlive" @change="toggleKeepAlive" />
              启用 Keep-Alive 缓存
            </label>
            <p class="control-tip">
              {{ useKeepAlive ? "✅ 组件状态将被缓存" : "❌ 组件状态将被销毁" }}
            </p>
          </div>
        </div>

        <!-- 组件展示区域 -->
        <div class="component-display">
          <h4>组件内容展示</h4>

          <!-- 使用 Keep-Alive 包裹 -->
          <keep-alive v-if="useKeepAlive">
            <component :is="currentComponent" :key="currentComponent" />
          </keep-alive>

          <!-- 不使用 Keep-Alive -->
          <component v-else :is="currentComponent" :key="currentComponent" />
        </div>

        <!-- 状态监控 -->
        <div class="status-monitor">
          <h4>组件生命周期监控</h4>
          <div class="lifecycle-logs">
            <div v-for="(log, index) in lifecycleLogs" :key="index" :class="['log-item', log.type]">
              <span class="log-time">{{ log.time }}</span>
              <span class="log-component">{{ log.component }}</span>
              <span class="log-event">{{ log.event }}</span>
            </div>
          </div>
          <button @click="clearLogs" class="clear-btn">清空日志</button>
        </div>
      </div>
    </section>

    <!-- Activated/Deactivated 钩子演示 -->
    <section id="hook-demo" class="content-section">
      <h2>Activated/Deactivated 钩子数据管理演示</h2>
      <p class="section-intro">
        <code>activated</code> 和 <code>deactivated</code> 钩子是 Vue2 中配合
        <code>&lt;keep-alive&gt;</code> 使用的重要生命周期钩子。 当组件被
        <code>&lt;keep-alive&gt;</code> 包裹时，这两个钩子会在组件激活和停用时触发，
        我们可以利用它们来管理组件的数据状态、定时器、网络连接等资源。
      </p>

      <div class="hook-overview">
        <h3>🎯 钩子作用机制</h3>
        <div class="hook-mechanism">
          <div class="hook-card">
            <h4>activated 钩子</h4>
            <p><strong>触发时机：</strong>组件被激活时（从缓存中恢复）</p>
            <p><strong>主要用途：</strong></p>
            <ul>
              <li>恢复定时器状态</li>
              <li>重新建立网络连接</li>
              <li>从本地存储恢复数据</li>
              <li>启动数据刷新任务</li>
              <li>恢复用户界面状态</li>
            </ul>
          </div>
          <div class="hook-card">
            <h4>deactivated 钩子</h4>
            <p><strong>触发时机：</strong>组件被停用时（进入缓存）</p>
            <p><strong>主要用途：</strong></p>
            <ul>
              <li>暂停定时器</li>
              <li>断开网络连接</li>
              <li>保存数据到本地存储</li>
              <li>停止数据刷新任务</li>
              <li>保存用户界面状态</li>
            </ul>
          </div>
        </div>
      </div>

      <div class="hook-demo-section">
        <h3>🔍 实际演示</h3>
        <p class="demo-intro">
          下面演示两个使用 <code>activated/deactivated</code> 钩子的组件：
          <strong>DataManager</strong>（数据管理器）和
          <strong>NetworkManager</strong>（网络管理器）。
          你可以切换这两个组件来观察钩子的触发和数据的保持。
        </p>

        <div class="component-selector">
          <h4>选择演示组件：</h4>
          <div class="selector-buttons">
            <button
              @click="hookDemoComponent = 'DataManager'"
              :class="['selector-btn', { active: hookDemoComponent === 'DataManager' }]"
            >
              📊 DataManager - 数据管理
            </button>
            <button
              @click="hookDemoComponent = 'NetworkManager'"
              :class="['selector-btn', { active: hookDemoComponent === 'NetworkManager' }]"
            >
              🌐 NetworkManager - 网络管理
            </button>
          </div>
        </div>

        <div class="hook-demo-container">
          <div class="demo-info">
            <h5>当前演示组件：{{ hookDemoComponent }}</h5>
            <p class="demo-tip">
              💡 <strong>使用说明：</strong> <br />1. 在组件中操作数据（添加、删除、启动定时器等）
              <br />2. 切换到其他页面（如 Keep-Alive 演示的其他部分） <br />3.
              返回此页面，观察数据是否保持 <br />4. 查看生命周期日志，了解钩子的触发情况
            </p>
          </div>

          <div class="component-demo">
            <keep-alive>
              <component :is="hookDemoComponent" />
            </keep-alive>
          </div>
        </div>

        <div class="hook-benefits">
          <h3>💡 使用钩子的优势</h3>
          <div class="benefits-list">
            <div class="benefit-item">
              <h4>资源管理</h4>
              <p>在组件停用时自动暂停定时器、网络请求等，避免资源浪费</p>
            </div>
            <div class="benefit-item">
              <h4>状态保持</h4>
              <p>组件被缓存时保持所有状态，用户返回时无需重新操作</p>
            </div>
            <div class="benefit-item">
              <h4>性能优化</h4>
              <p>避免重复的网络请求和计算，提升应用性能</p>
            </div>
            <div class="benefit-item">
              <h4>用户体验</h4>
              <p>保持用户的输入状态和操作进度，提升使用体验</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 路由级 Keep-Alive 缓存管理 -->
    <section id="router-level" class="content-section">
      <h2>路由级 Keep-Alive 缓存管理</h2>
      <p class="section-intro">
        在实际项目中，我们通常需要在路由级别统一管理 <code>&lt;keep-alive&gt;</code> 的缓存策略。
        这样可以实现更精细的缓存控制，提升应用性能和用户体验。
      </p>

      <div class="router-cache-overview">
        <h3>🚀 路由级缓存的优势</h3>
        <div class="benefits-grid">
          <div class="benefit-item">
            <h4>统一管理</h4>
            <p>在路由配置中统一设置缓存策略，便于维护和管理</p>
          </div>
          <div class="benefit-item">
            <h4>灵活控制</h4>
            <p>支持 always、conditional、never 三种缓存策略</p>
          </div>
          <div class="benefit-item">
            <h4>动态调整</h4>
            <p>可以根据路由参数、用户权限等动态调整缓存策略</p>
          </div>
          <div class="benefit-item">
            <h4>性能优化</h4>
            <p>避免不必要的组件重新渲染，提升应用性能</p>
          </div>
        </div>
      </div>

      <div class="implementation-details">
        <h3>⚙️ 实现原理</h3>
        <div class="implementation-grid">
          <div class="impl-card">
            <h4>1. 路由元信息配置</h4>
            <p>在路由配置中添加 meta 字段，定义缓存策略：</p>
            <pre><code>{
  path: "/keep-alive-demo",
  name: "KeepAliveDemo",
  component: () => import("../views/keepAliveDemo.vue"),
  meta: {
    keepAlive: true,
    cacheStrategy: "always" // always, conditional, never
  }
}</code></pre>
          </div>

          <div class="impl-card">
            <h4>2. App.vue 中的缓存管理</h4>
            <p>使用 router-view 的插槽语法和 keep-alive 组件：</p>
            <pre><code>&lt;router-view v-slot="{ Component, route }"&gt;
  &lt;keep-alive :include="cachedComponents" :exclude="excludedComponents"&gt;
    &lt;component :is="Component" :key="route.path" /&gt;
  &lt;/keep-alive&gt;
&lt;/router-view&gt;</code></pre>
          </div>

          <div class="impl-card">
            <h4>3. 动态缓存策略</h4>
            <p>根据路由变化自动更新缓存策略：</p>
            <pre><code>watch: {
  '$route'(to, from) {
    this.updateCacheStrategy(to);
  }
}</code></pre>
          </div>
        </div>
      </div>

      <div class="cache-strategies">
        <h3>🎯 三种缓存策略详解</h3>
        <div class="strategies-grid">
          <div class="strategy-card always">
            <h4>Always 策略</h4>
            <p class="strategy-desc">组件总是被缓存，适用于：</p>
            <ul>
              <li>用户列表页面（保持分页、筛选状态）</li>
              <li>设置页面（保持用户配置）</li>
              <li>仪表板页面（保持数据展示状态）</li>
            </ul>
            <div class="strategy-example">
              <strong>示例路由：</strong>
              <code>MixinTest</code>, <code>ComponentVsPlugin</code>, <code>AxiosDemo</code>
            </div>
          </div>

          <div class="strategy-card conditional">
            <h4>Conditional 策略</h4>
            <p class="strategy-desc">根据条件决定是否缓存，适用于：</p>
            <ul>
              <li>详情页面（根据ID参数决定）</li>
              <li>编辑页面（根据用户权限决定）</li>
              <li>搜索结果页（根据查询参数决定）</li>
            </ul>
            <div class="strategy-example">
              <strong>示例路由：</strong>
              <code>VuexTest</code>, <code>DynamicData</code>, <code>NextTickDemo</code>
            </div>
          </div>

          <div class="strategy-card never">
            <h4>Never 策略</h4>
            <p class="strategy-desc">组件从不被缓存，适用于：</p>
            <ul>
              <li>登录页面（每次都需要重新渲染）</li>
              <li>错误页面（不需要保持状态）</li>
              <li>临时页面（状态不重要）</li>
            </ul>
            <div class="strategy-example">
              <strong>示例路由：</strong>
              <code>DataTest</code>, <code>ModifiersDemo</code>
            </div>
          </div>
        </div>
      </div>

      <div class="router-cache-demo">
        <h3>🔍 路由级缓存演示</h3>
        <p class="demo-intro">
          下面演示如何在实际项目中使用路由级 keep-alive 缓存管理。
          你可以切换不同的路由来观察缓存行为。
        </p>

        <div class="cache-control-panel">
          <h4>缓存控制面板</h4>
          <div class="control-buttons">
            <button @click="showCacheStatus" class="control-btn status-btn">查看缓存状态</button>
            <button @click="clearAllCache" class="control-btn clear-btn">清空所有缓存</button>
            <button @click="toggleCurrentCache" class="control-btn toggle-btn">
              切换当前页面缓存
            </button>
          </div>

          <div class="cache-info" v-if="cacheInfo">
            <h5>当前缓存状态：</h5>
            <div class="cache-details">
              <div class="cache-item">
                <span class="label">已缓存组件：</span>
                <span class="value">{{ cacheInfo.cached.join(", ") || "无" }}</span>
              </div>
              <div class="cache-item">
                <span class="label">排除组件：</span>
                <span class="value">{{ cacheInfo.excluded.join(", ") || "无" }}</span>
              </div>
              <div class="cache-item">
                <span class="label">当前路由：</span>
                <span class="value">{{ $route.name }}</span>
              </div>
              <div class="cache-item">
                <span class="label">缓存策略：</span>
                <span class="value">{{ $route.meta?.cacheStrategy || "未设置" }}</span>
              </div>
            </div>
          </div>
        </div>

        <div class="route-navigation">
          <h4>快速路由导航</h4>
          <p class="nav-tip">点击下面的按钮快速切换到不同路由，观察缓存行为：</p>
          <div class="route-buttons">
            <button
              v-for="route in demoRoutes"
              :key="route.name"
              @click="navigateToRoute(route)"
              :class="['route-btn', { active: $route.name === route.name }]"
            >
              {{ route.name }} - {{ route.label }}
              <small>{{ route.cacheStrategy }}</small>
            </button>
          </div>
        </div>
      </div>

      <div class="advanced-cache-features">
        <h3>🚀 高级缓存功能</h3>
        <div class="features-grid">
          <div class="feature-card">
            <h4>条件缓存逻辑</h4>
            <p>支持根据路由参数、查询参数、用户权限等条件动态决定是否缓存：</p>
            <pre><code>shouldCacheComponent(route, componentName) {
  // 根据路由参数判断
  if (route.params && route.params.id) {
    return true;
  }
  
  // 根据查询参数判断
  if (route.query && route.query.cache === 'true') {
    return true;
  }
  
  // 根据用户权限判断
  const userRole = localStorage.getItem('userRole');
  if (userRole === 'admin') {
    return true;
  }
  
  return false;
}</code></pre>
          </div>

          <div class="feature-card">
            <h4>手动缓存控制</h4>
            <p>提供手动控制组件缓存的API，支持动态调整缓存策略：</p>
            <pre><code>// 手动控制组件缓存
this.$root.$cacheManager.toggle('ComponentName', true);

// 清空所有缓存
this.$root.$cacheManager.clear();

// 获取缓存状态
const status = this.$root.$cacheManager.status();</code></pre>
          </div>

          <div class="feature-card">
            <h4>缓存状态监控</h4>
            <p>实时监控缓存状态，支持调试和性能分析：</p>
            <pre><code>watch: {
  '$route'(to, from) {
    this.updateCacheStrategy(to);
    console.log('缓存策略更新:', {
      to: to.name,
      strategy: to.meta?.cacheStrategy
    });
  }
}</code></pre>
          </div>
        </div>
      </div>
    </section>

    <!-- 总结 -->
    <section id="summary" class="content-section">
      <h2>Keep-Alive 总结</h2>
      <div class="summary-content">
        <div class="summary-grid">
          <div class="summary-card">
            <h3>核心要点</h3>
            <ul>
              <li><strong>组件缓存</strong>：缓存不活动的组件实例，保持状态</li>
              <li><strong>性能优化</strong>：避免重复创建和销毁，提升性能</li>
              <li><strong>用户体验</strong>：保持用户操作状态，提升流畅度</li>
              <li><strong>灵活控制</strong>：通过属性精确控制缓存行为</li>
            </ul>
          </div>

          <div class="summary-card">
            <h3>使用建议</h3>
            <ul>
              <li>合理使用，避免过度缓存导致内存占用过高</li>
              <li>配合 activated/deactivated 钩子进行数据管理</li>
              <li>使用 include/exclude 精确控制缓存范围</li>
              <li>在路由级别统一管理缓存策略</li>
              <li>根据业务需求选择合适的缓存策略（always/conditional/never）</li>
              <li>利用路由元信息灵活配置缓存行为</li>
            </ul>
          </div>
        </div>

        <div class="key-points">
          <h3>关键要点</h3>
          <p>
            <code>&lt;keep-alive&gt;</code> 是 Vue2
            中非常重要的性能优化工具，它通过缓存组件实例来避免重复渲染，
            特别适用于需要保持状态的场景。合理使用 keep-alive 可以显著提升应用性能和用户体验。
          </p>
          <p class="router-cache-summary">
            <strong>路由级缓存管理</strong>：通过路由元信息配置缓存策略，在 App.vue 中统一管理，
            支持 always、conditional、never 三种策略，实现更精细的缓存控制和更好的性能优化。
          </p>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import UserList from "../components/UserList.vue";
import UserDetail from "../components/UserDetail.vue";
import UserEdit from "../components/UserEdit.vue";
import DataManager from "../components/DataManager.vue";
import NetworkManager from "../components/NetworkManager.vue";

export default {
  name: "KeepAliveDemo",
  components: {
    UserList,
    UserDetail,
    UserEdit,
    DataManager,
    NetworkManager,
  },
  data() {
    return {
      currentComponent: "UserList",
      useKeepAlive: true,
      lifecycleLogs: [],
      cacheInfo: null,
      // 新增：activated/deactivated 钩子演示组件
      hookDemoComponent: "DataManager",
      demoRoutes: [
        { name: "VuexTest", label: "Vuex 测试", cacheStrategy: "conditional" },
        { name: "DataTest", label: "Data 属性", cacheStrategy: "never" },
        { name: "MixinTest", label: "Mixin 详解", cacheStrategy: "always" },
        { name: "ModifiersDemo", label: "修饰符", cacheStrategy: "never" },
        { name: "SlotDemo", label: "插槽详解", cacheStrategy: "conditional" },
        { name: "AxiosDemo", label: "Axios 详解", cacheStrategy: "always" },
        { name: "PermissionDemo", label: "权限管理", cacheStrategy: "conditional" },
        { name: "KeepAliveDemo", label: "Keep-Alive", cacheStrategy: "always" },
      ],
    };
  },

  //beforeRouteEnter 也可以实现在缓存组件中刷新数据，只不过一定是得在路由组件中
  beforeRouteEnter(to, from, next) {
    console.log("beforeRouteEnter", to, from);
    next((vm) => {
      console.log("vm", vm);
      vm.componentStatus = "active";
    });
  },
  methods: {
    toggleKeepAlive() {
      this.addLog("System", "Keep-Alive", this.useKeepAlive ? "启用" : "禁用");
    },
    addLog(component, event, detail = "") {
      const now = new Date();
      const time = now.toLocaleTimeString();
      this.lifecycleLogs.unshift({
        time,
        component,
        event,
        detail,
        type: "info",
      });

      // 限制日志数量
      if (this.lifecycleLogs.length > 20) {
        this.lifecycleLogs = this.lifecycleLogs.slice(0, 20);
      }
    },
    clearLogs() {
      this.lifecycleLogs = [];
    },
    // 路由级缓存相关方法
    showCacheStatus() {
      if (this.$root.$cacheManager) {
        this.cacheInfo = this.$root.$cacheManager.status();
        this.addLog("System", "缓存状态", "已获取当前缓存状态");
      } else {
        this.addLog("System", "缓存状态", "缓存管理器未初始化");
      }
    },
    clearAllCache() {
      if (this.$root.$cacheManager) {
        this.$root.$cacheManager.clear();
        this.cacheInfo = null;
        this.addLog("System", "清空缓存", "已清空所有组件缓存");
      } else {
        this.addLog("System", "清空缓存", "缓存管理器未初始化");
      }
    },
    toggleCurrentCache() {
      if (this.$root.$cacheManager) {
        const currentRoute = this.$route.name;
        const isCurrentlyCached = this.cacheInfo?.cached.includes(currentRoute);
        const shouldCache = !isCurrentlyCached;

        this.$root.$cacheManager.toggle(currentRoute, shouldCache);
        this.showCacheStatus(); // 刷新缓存状态

        this.addLog(
          "System",
          "切换缓存",
          `${currentRoute} ${shouldCache ? "已启用缓存" : "已禁用缓存"}`
        );
      } else {
        this.addLog("System", "切换缓存", "缓存管理器未初始化");
      }
    },
    navigateToRoute(route) {
      this.$router.push({ name: route.name });
      this.addLog("System", "路由切换", `切换到 ${route.label} (${route.cacheStrategy})`);

      // 延迟获取缓存状态，等待路由切换完成
      setTimeout(() => {
        this.showCacheStatus();
      }, 100);
    },
  },
  watch: {
    currentComponent(newVal, oldVal) {
      this.addLog("System", "组件切换", `${oldVal} → ${newVal}`);
    },
  },
};
</script>

<style scoped>
.keep-alive-demo {
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

.scenarios-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 25px;
  margin-top: 25px;
}

.scenario-card {
  padding: 25px;
  background: #f8f9fa;
  border-radius: 10px;
  border-left: 4px solid #ffc107;
}

.scenario-card h3 {
  color: #2c3e50;
  margin-bottom: 20px;
  font-size: 1.3rem;
}

.scenario-content h4 {
  color: #2c3e50;
  margin: 15px 0 8px 0;
  font-size: 1.1rem;
}

.scenario-content p {
  color: #555;
  margin-bottom: 10px;
  line-height: 1.5;
}

.scenario-content ul {
  padding-left: 20px;
  color: #555;
}

.scenario-content li {
  margin-bottom: 5px;
}

.benefits-section {
  margin-top: 30px;
}

.benefits-section h3 {
  color: #2c3e50;
  margin-bottom: 20px;
  font-size: 1.4rem;
}

.benefits-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
}

.benefit-item {
  display: flex;
  align-items: flex-start;
  gap: 15px;
  padding: 20px;
  background: white;
  border-radius: 8px;
  border-left: 4px solid #28a745;
}

.benefit-icon {
  font-size: 2rem;
  flex-shrink: 0;
}

.benefit-content h4 {
  color: #2c3e50;
  margin-bottom: 8px;
  font-size: 1.1rem;
}

.benefit-content p {
  color: #555;
  line-height: 1.5;
  margin: 0;
}

.demo-container {
  margin-top: 30px;
}

.demo-navigation {
  background: #f8f9fa;
  padding: 25px;
  border-radius: 8px;
  border: 2px solid #e9ecef;
  margin-bottom: 25px;
}

.demo-navigation h4 {
  color: #2c3e50;
  margin-bottom: 20px;
  font-size: 1.2rem;
}

.nav-buttons {
  display: flex;
  gap: 15px;
  margin-bottom: 20px;
  flex-wrap: wrap;
}

.nav-btn {
  padding: 10px 20px;
  border: 2px solid #3498db;
  background: white;
  color: #3498db;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 1rem;
}

.nav-btn:hover {
  background: #3498db;
  color: white;
}

.nav-btn.active {
  background: #3498db;
  color: white;
}

.keep-alive-control {
  padding: 20px;
  background: white;
  border-radius: 6px;
  border-left: 4px solid #17a2b8;
}

.control-label {
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 10px;
}

.control-label input[type="checkbox"] {
  width: 18px;
  height: 18px;
}

.control-tip {
  color: #555;
  margin: 0;
  font-size: 0.9rem;
}

.component-display {
  background: #f8f9fa;
  padding: 25px;
  border-radius: 8px;
  border: 2px solid #e9ecef;
  margin-bottom: 25px;
}

.component-display h4 {
  color: #2c3e50;
  margin-bottom: 20px;
  font-size: 1.2rem;
}

.status-monitor {
  background: #f8f9fa;
  padding: 25px;
  border-radius: 8px;
  border: 2px solid #e9ecef;
  margin-bottom: 25px;
}

.status-monitor h4 {
  color: #2c3e50;
  margin-bottom: 20px;
  font-size: 1.2rem;
}

.lifecycle-logs {
  max-height: 300px;
  overflow-y: auto;
  background: white;
  border-radius: 6px;
  padding: 15px;
  margin-bottom: 15px;
}

.log-item {
  display: flex;
  gap: 15px;
  padding: 8px 12px;
  margin-bottom: 8px;
  background: #f8f9fa;
  border-radius: 4px;
  font-family: monospace;
  font-size: 0.9rem;
}

.log-item.info {
  border-left: 3px solid #17a2b8;
}

.log-item.warning {
  border-left: 3px solid #ffc107;
}

.log-item.error {
  border-left: 3px solid #dc3545;
}

.log-time {
  color: #6c757d;
  min-width: 80px;
}

.log-component {
  color: #495057;
  min-width: 100px;
}

.log-event {
  color: #212529;
}

.clear-btn {
  padding: 8px 16px;
  background: #6c757d;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.3s ease;
}

.clear-btn:hover {
  background: #5a6268;
}

.usage-instruction {
  background: #e3f2fd;
  padding: 25px;
  border-radius: 8px;
  border-left: 4px solid #2196f3;
}

.usage-instruction h4 {
  color: #2c3e50;
  margin-bottom: 20px;
  font-size: 1.2rem;
}

.instruction-content ol {
  padding-left: 20px;
  color: #555;
}

.instruction-content li {
  margin-bottom: 10px;
  line-height: 1.6;
}

.instruction-content ul {
  padding-left: 20px;
  margin-top: 8px;
}

.instruction-content li li {
  margin-bottom: 5px;
}

.advanced-features {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 25px;
  margin-top: 25px;
}

.feature-card {
  padding: 25px;
  background: #f8f9fa;
  border-radius: 10px;
  border-left: 4px solid #6f42c1;
}

.feature-card h3 {
  color: #2c3e50;
  margin-bottom: 20px;
  font-size: 1.3rem;
}

.feature-content p {
  color: #555;
  margin-bottom: 15px;
  line-height: 1.6;
}

.feature-content h4 {
  color: #2c3e50;
  margin: 20px 0 10px 0;
  font-size: 1.1rem;
}

.feature-content ul {
  padding-left: 20px;
  color: #555;
  margin-bottom: 15px;
}

.feature-content li {
  margin-bottom: 5px;
}

.feature-content pre {
  background: #2d3748;
  color: #e2e8f0;
  padding: 15px;
  border-radius: 6px;
  overflow-x: auto;
  margin: 10px 0;
  font-size: 0.9rem;
}

.feature-content code {
  background: #f1f3f4;
  color: #d73a49;
  padding: 2px 6px;
  border-radius: 3px;
  font-family: monospace;
  font-size: 0.9rem;
}

.code-example {
  background: #e3f2fd;
  padding: 20px;
  border-radius: 8px;
  border-left: 4px solid #2196f3;
  margin-top: 25px;
}

.code-example h4 {
  color: #2c3e50;
  margin-bottom: 15px;
  font-size: 1.2rem;
}

.example-description p {
  color: #555;
  margin-bottom: 15px;
  line-height: 1.6;
}

.example-description ul {
  padding-left: 20px;
  color: #555;
}

.example-description li {
  margin-bottom: 8px;
}

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

.router-cache-summary {
  margin-top: 15px;
  font-size: 0.95rem;
  color: #555;
  line-height: 1.5;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .keep-alive-demo {
    padding: 15px;
  }

  .header-section h1 {
    font-size: 2rem;
  }

  .quick-nav {
    flex-direction: column;
    align-items: center;
  }

  .concept-grid {
    grid-template-columns: 1fr;
  }

  .scenarios-grid {
    grid-template-columns: 1fr;
  }

  .summary-grid {
    grid-template-columns: 1fr;
  }

  .nav-buttons {
    flex-direction: column;
  }

  .nav-btn {
    text-align: center;
  }
}

/* 路由级缓存相关样式 */
.router-cache-overview {
  margin-bottom: 30px;
}

.router-cache-overview h3 {
  color: #2c3e50;
  margin-bottom: 20px;
  font-size: 1.4rem;
}

.benefits-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-top: 20px;
}

.benefit-item {
  padding: 20px;
  background: #f8f9fa;
  border-radius: 8px;
  border-left: 4px solid #28a745;
}

.benefit-item h4 {
  color: #2c3e50;
  margin-bottom: 10px;
  font-size: 1.1rem;
}

.benefit-item p {
  color: #555;
  margin: 0;
  line-height: 1.5;
}

.implementation-details {
  margin-bottom: 30px;
}

.implementation-details h3 {
  color: #2c3e50;
  margin-bottom: 20px;
  font-size: 1.4rem;
}

.implementation-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 25px;
  margin-top: 20px;
}

.impl-card {
  padding: 25px;
  background: #f8f9fa;
  border-radius: 10px;
  border-left: 4px solid #6f42c1;
}

.impl-card h4 {
  color: #2c3e50;
  margin-bottom: 15px;
  font-size: 1.2rem;
}

.impl-card p {
  color: #555;
  margin-bottom: 15px;
  line-height: 1.6;
}

.impl-card pre {
  background: #2d3748;
  color: #e2e8f0;
  padding: 15px;
  border-radius: 6px;
  overflow-x: auto;
  margin: 10px 0;
  font-size: 0.9rem;
}

.impl-card code {
  padding: 2px 6px;
  border-radius: 3px;
  font-family: monospace;
  font-size: 0.9rem;
}

.cache-strategies {
  margin-bottom: 30px;
}

.cache-strategies h3 {
  color: #2c3e50;
  margin-bottom: 20px;
  font-size: 1.4rem;
}

.strategies-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 25px;
  margin-top: 20px;
}

.strategy-card {
  padding: 25px;
  border-radius: 10px;
  border-left: 4px solid;
}

.strategy-card.always {
  background: #e8f5e8;
  border-left-color: #28a745;
}

.strategy-card.conditional {
  background: #fff3cd;
  border-left-color: #ffc107;
}

.strategy-card.never {
  background: #f8d7da;
  border-left-color: #dc3545;
}

.strategy-card h4 {
  color: #2c3e50;
  margin-bottom: 15px;
  font-size: 1.2rem;
}

.strategy-desc {
  color: #555;
  margin-bottom: 15px;
  font-weight: 600;
}

.strategy-card ul {
  padding-left: 20px;
  color: #555;
  margin-bottom: 15px;
}

.strategy-card li {
  margin-bottom: 8px;
  line-height: 1.5;
}

.strategy-example {
  padding: 15px;
  background: rgba(255, 255, 255, 0.7);
  border-radius: 6px;
  font-size: 0.9rem;
}

.strategy-example strong {
  color: #2c3e50;
}

.strategy-example code {
  padding: 2px 6px;
  border-radius: 3px;
  font-family: monospace;
  font-size: 0.9rem;
}

.router-cache-demo {
  margin-bottom: 30px;
}

.router-cache-demo h3 {
  color: #2c3e50;
  margin-bottom: 20px;
  font-size: 1.4rem;
}

.demo-intro {
  color: #555;
  margin-bottom: 25px;
  line-height: 1.6;
}

.cache-control-panel {
  background: #f8f9fa;
  padding: 25px;
  border-radius: 8px;
  border: 2px solid #e9ecef;
  margin-bottom: 25px;
}

.cache-control-panel h4 {
  color: #2c3e50;
  margin-bottom: 20px;
  font-size: 1.2rem;
}

.control-buttons {
  display: flex;
  gap: 15px;
  margin-bottom: 20px;
  flex-wrap: wrap;
}

.control-btn {
  padding: 10px 20px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 1rem;
  font-weight: 600;
}

.status-btn {
  background: #17a2b8;
  color: white;
}

.status-btn:hover {
  background: #138496;
}

.clear-btn {
  background: #dc3545;
  color: white;
}

.clear-btn:hover {
  background: #c82333;
}

.toggle-btn {
  background: #ffc107;
  color: #212529;
}

.toggle-btn:hover {
  background: #e0a800;
}

.cache-info {
  background: white;
  padding: 20px;
  border-radius: 6px;
  border-left: 4px solid #17a2b8;
}

.cache-info h5 {
  color: #2c3e50;
  margin-bottom: 15px;
  font-size: 1.1rem;
}

.cache-details {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 15px;
}

.cache-item {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.cache-item .label {
  font-weight: 600;
  color: #495057;
  font-size: 0.9rem;
}

.cache-item .value {
  color: #212529;
  font-family: monospace;
  background: #f8f9fa;
  padding: 5px 8px;
  border-radius: 4px;
  font-size: 0.9rem;
}

.route-navigation {
  background: #f8f9fa;
  padding: 25px;
  border-radius: 8px;
  border: 2px solid #e9ecef;
}

.route-navigation h4 {
  color: #2c3e50;
  margin-bottom: 15px;
  font-size: 1.2rem;
}

.nav-tip {
  color: #555;
  margin-bottom: 20px;
  line-height: 1.5;
}

.route-buttons {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 15px;
}

.route-btn {
  padding: 12px 16px;
  border: 2px solid #6c757d;
  background: white;
  color: #495057;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 0.9rem;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
}

.route-btn:hover {
  border-color: #007bff;
  color: #007bff;
  transform: translateY(-2px);
}

.route-btn.active {
  background: #007bff;
  border-color: #007bff;
  color: white;
}

.route-btn small {
  font-size: 0.8rem;
  opacity: 0.8;
  text-transform: uppercase;
  font-weight: 600;
}

.advanced-cache-features {
  margin-bottom: 30px;
}

.advanced-cache-features h3 {
  color: #2c3e50;
  margin-bottom: 20px;
  font-size: 1.4rem;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 25px;
  margin-top: 20px;
}

.feature-card {
  padding: 25px;
  background: #f8f9fa;
  border-radius: 10px;
  border-left: 4px solid #6f42c1;
}

.feature-card h4 {
  color: #2c3e50;
  margin-bottom: 15px;
  font-size: 1.2rem;
}

.feature-card p {
  color: #555;
  margin-bottom: 15px;
  line-height: 1.6;
}

.feature-card pre {
  background: #2d3748;
  color: #e2e8f0;
  padding: 15px;
  border-radius: 6px;
  overflow-x: auto;
  margin: 10px 0;
  font-size: 0.9rem;
}

.feature-card code {
  padding: 2px 6px;
  border-radius: 3px;
  font-family: monospace;
  font-size: 0.9rem;
}

/* Hook Demo 样式 */
.hook-overview {
  margin-bottom: 30px;
}

.hook-overview h3 {
  color: #2c3e50;
  margin-bottom: 20px;
  font-size: 1.4rem;
}

.hook-mechanism {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 25px;
  margin-top: 20px;
}

.hook-card {
  padding: 25px;
  background: #f8f9fa;
  border-radius: 10px;
  border-left: 4px solid #28a745;
}

.hook-card h4 {
  color: #2c3e50;
  margin-bottom: 15px;
  font-size: 1.2rem;
}

.hook-card p {
  color: #555;
  margin-bottom: 15px;
  line-height: 1.6;
}

.hook-card ul {
  padding-left: 20px;
  color: #555;
}

.hook-card li {
  margin-bottom: 8px;
  line-height: 1.5;
}

.hook-demo-section {
  margin-bottom: 30px;
}

.hook-demo-section h3 {
  color: #2c3e50;
  margin-bottom: 20px;
  font-size: 1.4rem;
}

.component-selector {
  background: #f8f9fa;
  padding: 25px;
  border-radius: 8px;
  border: 2px solid #e9ecef;
  margin-bottom: 25px;
}

.component-selector h4 {
  color: #2c3e50;
  margin-bottom: 20px;
  font-size: 1.2rem;
}

.selector-buttons {
  display: flex;
  gap: 15px;
  flex-wrap: wrap;
}

.selector-btn {
  padding: 12px 24px;
  border: 2px solid #e9ecef;
  background: white;
  color: #495057;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 1rem;
  font-weight: 600;
}

.selector-btn:hover {
  border-color: #007bff;
  color: #007bff;
  transform: translateY(-2px);
}

.selector-btn.active {
  background: #007bff;
  border-color: #007bff;
  color: white;
}

.hook-demo-container {
  background: #f8f9fa;
  padding: 25px;
  border-radius: 8px;
  border: 2px solid #e9ecef;
  margin-bottom: 25px;
}

.demo-info h5 {
  color: #2c3e50;
  margin-bottom: 15px;
  font-size: 1.1rem;
}

.demo-tip {
  background: #e3f2fd;
  border: 1px solid #2196f3;
  border-radius: 6px;
  padding: 15px;
  color: #1565c0;
  line-height: 1.6;
  margin-bottom: 20px;
}

.component-demo {
  background: white;
  border-radius: 8px;
  border: 2px solid #e9ecef;
  overflow: hidden;
}

.hook-benefits {
  margin-bottom: 30px;
}

.hook-benefits h3 {
  color: #2c3e50;
  margin-bottom: 20px;
  font-size: 1.4rem;
}

.benefits-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  margin-top: 20px;
}

.benefit-item {
  padding: 20px;
  background: #f8f9fa;
  border-radius: 8px;
  border-left: 4px solid #ffc107;
}

.benefit-item h4 {
  color: #2c3e50;
  margin-bottom: 10px;
  font-size: 1.1rem;
}

.benefit-item p {
  color: #555;
  line-height: 1.5;
  margin: 0;
}

/* 响应式调整 */
@media (max-width: 768px) {
  .benefits-grid {
    grid-template-columns: 1fr;
  }

  .implementation-grid {
    grid-template-columns: 1fr;
  }

  .strategies-grid {
    grid-template-columns: 1fr;
  }

  .features-grid {
    grid-template-columns: 1fr;
  }

  .control-buttons {
    flex-direction: column;
  }

  .route-buttons {
    grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  }

  .cache-details {
    grid-template-columns: 1fr;
  }

  .hook-mechanism {
    grid-template-columns: 1fr;
  }

  .benefits-list {
    grid-template-columns: 1fr;
  }

  .selector-buttons {
    flex-direction: column;
  }
}
</style>
