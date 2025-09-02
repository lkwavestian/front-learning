<template>
  <div class="spa-demo">
    <!-- 页面头部 -->
    <div class="header-section">
      <h1>SPA 单页面应用详解</h1>
      <p class="subtitle">理解单页面应用的概念、特性、优缺点与实现方式</p>
    </div>

    <!-- 快速导航 -->
    <div class="quick-nav">
      <a href="#what-is-spa" class="nav-item">什么是SPA</a>
      <a href="#pros-cons" class="nav-item">优缺点分析</a>
      <a href="#spa-vs-mpa" class="nav-item">SPA vs MPA</a>
      <a href="#implementation" class="nav-item">实现方式</a>
      <a href="#hash-router" class="nav-item">手写路由</a>
      <a href="#demo" class="nav-item">实际演示</a>
      <a href="#summary" class="nav-item">总结</a>
    </div>

    <!-- 什么是SPA -->
    <section id="what-is-spa" class="content-section">
      <h2>什么是单页面应用（SPA）？</h2>
      <p class="section-intro">
        <strong>单页面应用（Single Page Application，SPA）</strong>是一种Web应用程序架构模式，
        整个应用只有一个HTML页面，通过JavaScript动态更新页面内容，实现页面间的切换和交互。
      </p>

      <div class="concept-grid">
        <div class="concept-card">
          <h3>🔍 核心特征</h3>
          <ul>
            <li><strong>单一HTML页面</strong>：整个应用只有一个HTML文件</li>
            <li><strong>动态内容更新</strong>：通过JavaScript动态修改DOM</li>
            <li><strong>客户端路由</strong>：使用前端路由管理页面切换</li>
            <li><strong>异步数据加载</strong>：通过AJAX/API获取数据</li>
          </ul>
        </div>

        <div class="concept-card">
          <h3>⚙️ 工作原理</h3>
          <ul>
            <li><strong>初始加载</strong>：浏览器加载HTML、CSS、JS文件</li>
            <li><strong>路由解析</strong>：前端路由根据URL显示对应组件</li>
            <li><strong>内容替换</strong>：动态替换页面内容，不刷新整个页面</li>
            <li><strong>状态管理</strong>：维护应用状态和用户交互</li>
          </ul>
        </div>

        <div class="concept-card">
          <h3>🎯 典型应用</h3>
          <ul>
            <li><strong>管理后台</strong>：如Vue Admin、React Admin</li>
            <li><strong>社交应用</strong>：如Facebook、Twitter</li>
            <li><strong>在线工具</strong>：如Gmail、Google Docs</li>
            <li><strong>电商平台</strong>：如淘宝、京东移动端</li>
          </ul>
        </div>
      </div>

      <div class="spa-architecture">
        <h3>🏗️ SPA 架构图</h3>
        <div class="architecture-diagram">
          <div class="arch-layer">
            <h4>浏览器层</h4>
            <div class="arch-item">HTML + CSS + JavaScript</div>
          </div>
          <div class="arch-arrow">↓</div>
          <div class="arch-layer">
            <h4>前端框架层</h4>
            <div class="arch-item">Vue/React/Angular</div>
          </div>
          <div class="arch-arrow">↓</div>
          <div class="arch-layer">
            <h4>路由层</h4>
            <div class="arch-item">Vue Router / React Router</div>
          </div>
          <div class="arch-arrow">↓</div>
          <div class="arch-layer">
            <h4>组件层</h4>
            <div class="arch-item">页面组件 + 业务组件</div>
          </div>
          <div class="arch-arrow">↓</div>
          <div class="arch-layer">
            <h4>API层</h4>
            <div class="arch-item">RESTful API / GraphQL</div>
          </div>
        </div>
      </div>
    </section>

    <!-- 优缺点分析 -->
    <section id="pros-cons" class="content-section">
      <h2>SPA 的优缺点分析</h2>
      <p class="section-intro">
        了解SPA的优缺点有助于我们在项目中选择合适的架构方案。
        每种技术都有其适用场景，关键是根据项目需求做出明智的选择。
      </p>

      <div class="pros-cons-grid">
        <div class="pros-section">
          <h3>✅ 优点</h3>
          <div class="pros-list">
            <div class="pros-item">
              <h4>🚀 用户体验优秀</h4>
              <p>页面切换流畅，无刷新跳转，类似原生应用体验</p>
            </div>
            <div class="pros-item">
              <h4>⚡ 性能表现良好</h4>
              <p>减少服务器请求，客户端缓存资源，响应速度快</p>
            </div>
            <div class="pros-item">
              <h4>🔧 开发效率高</h4>
              <p>前后端分离，组件化开发，代码复用性强</p>
            </div>
            <div class="pros-item">
              <h4>📱 移动端友好</h4>
              <p>适合移动设备，支持离线缓存和PWA特性</p>
            </div>
            <div class="pros-item">
              <h4>🔄 状态管理灵活</h4>
              <p>全局状态管理，数据共享方便，状态持久化</p>
            </div>
          </div>
        </div>

        <div class="cons-section">
          <h3>❌ 缺点</h3>
          <div class="cons-list">
            <div class="cons-item">
              <h4>🐌 首屏加载慢</h4>
              <p>初始需要加载大量JavaScript代码，首屏渲染时间长</p>
            </div>
            <div class="cons-item">
              <h4>🔍 SEO不友好</h4>
              <p>搜索引擎难以抓取动态内容，影响搜索排名</p>
            </div>
            <div class="cons-item">
              <h4>💾 内存占用高</h4>
              <p>长时间运行可能造成内存泄漏，影响性能</p>
            </div>
            <div class="cons-item">
              <h4>🌐 兼容性问题</h4>
              <p>依赖JavaScript，老版本浏览器支持有限</p>
            </div>
            <div class="cons-item">
              <h4>🔒 安全性考虑</h4>
              <p>客户端代码暴露，需要额外的安全防护措施</p>
            </div>
          </div>
        </div>
      </div>

      <div class="optimization-tips">
        <h3>💡 优化建议</h3>
        <div class="tips-grid">
          <div class="tip-card">
            <h4>首屏优化</h4>
            <ul>
              <li>代码分割和懒加载</li>
              <li>服务端渲染（SSR）</li>
              <li>预加载关键资源</li>
              <li>CDN加速</li>
            </ul>
          </div>
          <div class="tip-card">
            <h4>SEO优化</h4>
            <ul>
              <li>服务端渲染</li>
              <li>预渲染技术</li>
              <li>静态站点生成</li>
              <li>Meta标签管理</li>
            </ul>
          </div>
          <div class="tip-card">
            <h4>性能优化</h4>
            <ul>
              <li>虚拟滚动</li>
              <li>图片懒加载</li>
              <li>缓存策略</li>
              <li>内存管理</li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- SPA vs MPA -->
    <section id="spa-vs-mpa" class="content-section">
      <h2>SPA vs MPA 对比分析</h2>
      <p class="section-intro">
        单页面应用（SPA）和多页面应用（MPA）各有特点，了解它们的区别有助于选择合适的技术方案。
      </p>

      <div class="comparison-table">
        <table>
          <thead>
            <tr>
              <th>对比维度</th>
              <th>SPA（单页面应用）</th>
              <th>MPA（多页面应用）</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>页面数量</strong></td>
              <td>单个HTML页面</td>
              <td>多个HTML页面</td>
            </tr>
            <tr>
              <td><strong>页面切换</strong></td>
              <td>前端路由，无刷新</td>
              <td>整页刷新</td>
            </tr>
            <tr>
              <td><strong>用户体验</strong></td>
              <td>流畅，类似原生应用</td>
              <td>传统Web体验</td>
            </tr>
            <tr>
              <td><strong>首屏加载</strong></td>
              <td>较慢，需加载所有资源</td>
              <td>较快，按需加载</td>
            </tr>
            <tr>
              <td><strong>SEO友好性</strong></td>
              <td>较差，需要额外处理</td>
              <td>天然友好</td>
            </tr>
            <tr>
              <td><strong>开发复杂度</strong></td>
              <td>较高，需要状态管理</td>
              <td>较低，传统开发模式</td>
            </tr>
            <tr>
              <td><strong>维护成本</strong></td>
              <td>较低，代码复用性好</td>
              <td>较高，重复代码多</td>
            </tr>
            <tr>
              <td><strong>适用场景</strong></td>
              <td>管理后台、社交应用</td>
              <td>官网、博客、电商</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="scenario-recommendation">
        <h3>🎯 场景推荐</h3>
        <div class="scenario-grid">
          <div class="scenario-card spa-recommended">
            <h4>推荐使用 SPA</h4>
            <ul>
              <li>管理后台系统</li>
              <li>企业内部应用</li>
              <li>社交网络应用</li>
              <li>在线协作工具</li>
              <li>数据可视化平台</li>
              <li>移动端Web应用</li>
            </ul>
          </div>
          <div class="scenario-card mpa-recommended">
            <h4>推荐使用 MPA</h4>
            <ul>
              <li>企业官网</li>
              <li>博客系统</li>
              <li>电商网站</li>
              <li>新闻门户</li>
              <li>营销落地页</li>
              <li>内容管理系统</li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- 实现方式 -->
    <section id="implementation" class="content-section">
      <h2>如何实现 SPA 应用</h2>
      <p class="section-intro">
        SPA应用的实现涉及多个技术层面，从基础的前端路由到复杂的状态管理，
        每个环节都需要仔细考虑和设计。
      </p>

      <div class="implementation-steps">
        <h3>🚀 实现步骤</h3>
        <div class="steps-container">
          <div class="step-item">
            <div class="step-number">1</div>
            <div class="step-content">
              <h4>选择前端框架</h4>
              <p>根据项目需求选择合适的框架：</p>
              <ul>
                <li><strong>Vue.js</strong>：渐进式框架，学习曲线平缓</li>
                <li><strong>React</strong>：组件化开发，生态丰富</li>
                <li><strong>Angular</strong>：企业级框架，功能完整</li>
              </ul>
            </div>
          </div>

          <div class="step-item">
            <div class="step-number">2</div>
            <div class="step-content">
              <h4>配置路由系统</h4>
              <p>实现前端路由管理：</p>
              <ul>
                <li><strong>Hash路由</strong>：使用 # 符号，兼容性好</li>
                <li><strong>History路由</strong>：使用HTML5 History API</li>
                <li><strong>路由守卫</strong>：权限控制、页面拦截</li>
              </ul>
            </div>
          </div>

          <div class="step-item">
            <div class="step-number">3</div>
            <div class="step-content">
              <h4>设计组件架构</h4>
              <p>构建可复用的组件体系：</p>
              <ul>
                <li><strong>页面组件</strong>：对应路由的顶级组件</li>
                <li><strong>业务组件</strong>：封装具体业务逻辑</li>
                <li><strong>通用组件</strong>：可复用的UI组件</li>
              </ul>
            </div>
          </div>

          <div class="step-item">
            <div class="step-number">4</div>
            <div class="step-content">
              <h4>状态管理</h4>
              <p>管理应用全局状态：</p>
              <ul>
                <li><strong>Vuex/Redux</strong>：集中式状态管理</li>
                <li><strong>Context API</strong>：React内置状态管理</li>
                <li><strong>本地存储</strong>：localStorage/sessionStorage</li>
              </ul>
            </div>
          </div>

          <div class="step-item">
            <div class="step-number">5</div>
            <div class="step-content">
              <h4>API集成</h4>
              <p>与后端服务通信：</p>
              <ul>
                <li><strong>HTTP客户端</strong>：Axios、Fetch API</li>
                <li><strong>请求拦截</strong>：统一处理认证、错误</li>
                <li><strong>响应处理</strong>：数据格式化、错误处理</li>
              </ul>
            </div>
          </div>

          <div class="step-item">
            <div class="step-number">6</div>
            <div class="step-content">
              <h4>构建优化</h4>
              <p>提升应用性能：</p>
              <ul>
                <li><strong>代码分割</strong>：按需加载，减少包体积</li>
                <li><strong>资源压缩</strong>：JS/CSS压缩，图片优化</li>
                <li><strong>缓存策略</strong>：浏览器缓存、CDN缓存</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div class="code-examples">
        <h3>💻 代码示例</h3>
        <div class="example-tabs">
          <div class="tab-buttons">
            <button
              v-for="tab in codeTabs"
              :key="tab.id"
              @click="activeTab = tab.id"
              :class="['tab-btn', { active: activeTab === tab.id }]"
            >
              {{ tab.label }}
            </button>
          </div>
          <div class="tab-content">
            <div v-if="activeTab === 'router'" class="code-block">
              <h4>Vue Router 配置示例</h4>
              <pre><code>// router/index.js
import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home.vue'
import About from '@/views/About.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: About
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router</code></pre>
            </div>
            <div v-if="activeTab === 'component'" class="code-block">
              <h4>Vue 组件示例</h4>
              <pre><code>// components/UserList.vue
&lt;template&gt;
  &lt;div class="user-list"&gt;
    &lt;h2&gt;用户列表&lt;/h2&gt;
    &lt;ul&gt;
      &lt;li v-for="user in users" :key="user.id"&gt;
        \{\{ user.name \}\} - \{\{ user.email \}\}
      &lt;/li&gt;
    &lt;/ul&gt;
  &lt;/div&gt;
&lt;/template&gt;

&lt;script&gt;
export default {
  name: 'UserList',
  data() {
    return {
      users: []
    }
  },
  async mounted() {
    this.users = await this.fetchUsers()
  },
  methods: {
    async fetchUsers() {
      const response = await fetch('/api/users')
      return response.json()
    }
  }
}
&lt;/script&gt;</code></pre>
            </div>
            <div v-if="activeTab === 'state'" class="code-block">
              <h4>Vuex 状态管理示例</h4>
              <pre><code>// store/index.js
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null,
    loading: false
  },
  mutations: {
    SET_USER(state, user) {
      state.user = user
    },
    SET_LOADING(state, loading) {
      state.loading = loading
    }
  },
  actions: {
    async login({ commit }, credentials) {
      commit('SET_LOADING', true)
      try {
        const user = await api.login(credentials)
        commit('SET_USER', user)
      } finally {
        commit('SET_LOADING', false)
      }
    }
  }
})</code></pre>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 手写SPA路由系统 -->
    <section id="hash-router" class="content-section">
      <h2>手写SPA路由系统 - Hash模式</h2>
      <p class="section-intro">
        下面展示一个手写的SPA路由系统，采用Hash模式，通过监听URL的hash变化来实现路由跳转。
        这个实现展示了SPA路由的核心原理和工作机制。
      </p>

      <div class="router-principle">
        <h3>🔧 路由系统原理</h3>
        <div class="principle-grid">
          <div class="principle-card">
            <h4>Hash监听</h4>
            <p>通过监听<code>hashchange</code>事件来捕获URL变化</p>
            <pre><code>window.addEventListener('hashchange', handleHashChange);</code></pre>
          </div>
          <div class="principle-card">
            <h4>路由映射</h4>
            <p>维护路由配置表，将路径映射到对应组件</p>
            <pre><code>routes.set('/about', { component: AboutComponent });</code></pre>
          </div>
          <div class="principle-card">
            <h4>组件切换</h4>
            <p>根据当前路径动态渲染对应组件</p>
            <pre><code>&lt;component :is="currentComponent" /&gt;</code></pre>
          </div>
          <div class="principle-card">
            <h4>历史管理</h4>
            <p>使用History API管理浏览器前进后退</p>
            <pre><code>window.history.pushState(null, '', '#/path');</code></pre>
          </div>
        </div>
      </div>

      <!-- 手写路由演示组件 -->
      <HashRouterDemo />
    </section>

    <!-- 实际演示 -->
    <section id="demo" class="content-section">
      <h2>SPA 特性演示</h2>
      <p class="section-intro">
        下面通过实际演示来展示SPA的核心特性：前端路由、组件切换、状态保持等。
      </p>

      <div class="demo-container">
        <div class="demo-navigation">
          <h4>SPA 路由演示</h4>
          <div class="nav-buttons">
            <button
              v-for="route in demoRoutes"
              :key="route.name"
              @click="currentRoute = route.name"
              :class="['nav-btn', { active: currentRoute === route.name }]"
            >
              {{ route.label }}
            </button>
          </div>
          <div class="route-info">
            <p><strong>当前路由：</strong>{{ currentRoute }}</p>
            <p><strong>URL变化：</strong>{{ currentUrl }}</p>
            <p><strong>页面刷新：</strong>无刷新切换</p>
          </div>
        </div>

        <div class="component-display">
          <h4>组件内容展示</h4>
          <div class="component-content">
            <component :is="currentRoute" />
          </div>
        </div>

        <div class="spa-features">
          <h4>SPA 特性展示</h4>
          <div class="features-grid">
            <div class="feature-demo">
              <h5>🔄 状态保持</h5>
              <p>切换路由时，组件状态会被保持</p>
              <div class="counter-demo">
                <button @click="counter++">计数: {{ counter }}</button>
                <p>切换路由后返回，计数会保持</p>
              </div>
            </div>
            <div class="feature-demo">
              <h5>⚡ 快速切换</h5>
              <p>路由切换无页面刷新，响应迅速</p>
              <div class="performance-demo">
                <p>切换时间: {{ switchTime }}ms</p>
                <button @click="measureSwitch">测试切换性能</button>
              </div>
            </div>
            <div class="feature-demo">
              <h5>🎯 动态加载</h5>
              <p>支持组件懒加载，按需加载资源</p>
              <div class="loading-demo">
                <button @click="loadLazyComponent">加载懒组件</button>
                <div v-if="lazyComponentLoaded" class="lazy-content">
                  <p>懒加载组件已加载！</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 总结 -->
    <section id="summary" class="content-section">
      <h2>SPA 总结</h2>
      <div class="summary-content">
        <div class="summary-grid">
          <div class="summary-card">
            <h3>核心要点</h3>
            <ul>
              <li><strong>单页面架构</strong>：整个应用只有一个HTML页面</li>
              <li><strong>前端路由</strong>：通过JavaScript管理页面切换</li>
              <li><strong>动态更新</strong>：无刷新更新页面内容</li>
              <li><strong>状态管理</strong>：维护应用状态和用户交互</li>
            </ul>
          </div>

          <div class="summary-card">
            <h3>选择建议</h3>
            <ul>
              <li>管理后台、企业内部应用推荐SPA</li>
              <li>官网、博客、电商网站推荐MPA</li>
              <li>考虑SEO需求时优先选择MPA或SSR</li>
              <li>重视用户体验时选择SPA</li>
            </ul>
          </div>
        </div>

        <div class="key-points">
          <h3>关键要点</h3>
          <p>
            SPA是现代Web应用的重要架构模式，它通过前端路由和组件化开发，
            提供了优秀的用户体验和开发效率。但同时也带来了SEO、首屏加载等挑战。
            选择SPA还是MPA，需要根据具体的项目需求、用户群体和技术团队能力来决定。
          </p>
          <p class="future-trend">
            <strong>发展趋势</strong>：随着SSR、SSG等技术的成熟，
            SPA正在向更完善的方向发展，既保持了优秀的用户体验， 又解决了SEO和首屏加载的问题。
          </p>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import HashRouterDemo from "../components/HashRouterDemo.vue";

// 演示组件
const HomeComponent = {
  template: `
    <div class="demo-component home">
      <h3>🏠 首页组件</h3>
      <p>这是SPA应用的首页，展示了前端路由的工作原理。</p>
      <ul>
        <li>URL: /home</li>
        <li>组件: HomeComponent</li>
        <li>加载方式: 动态切换</li>
      </ul>
    </div>
  `,
};

const AboutComponent = {
  template: `
    <div class="demo-component about">
      <h3>📋 关于页面</h3>
      <p>这是关于页面，演示了SPA中不同组件的切换。</p>
      <ul>
        <li>URL: /about</li>
        <li>组件: AboutComponent</li>
        <li>特点: 无刷新切换</li>
      </ul>
    </div>
  `,
};

const ContactComponent = {
  template: `
    <div class="demo-component contact">
      <h3>📞 联系我们</h3>
      <p>联系页面展示了SPA的状态保持特性。</p>
      <ul>
        <li>URL: /contact</li>
        <li>组件: ContactComponent</li>
        <li>状态: 会被保持</li>
      </ul>
    </div>
  `,
};

export default {
  name: "SPADemo",
  components: {
    HashRouterDemo,
    Home: HomeComponent,
    About: AboutComponent,
    Contact: ContactComponent,
  },
  data() {
    return {
      currentRoute: "Home",
      counter: 0,
      switchTime: 0,
      lazyComponentLoaded: false,
      codeTabs: [
        { id: "router", label: "路由配置" },
        { id: "component", label: "组件示例" },
        { id: "state", label: "状态管理" },
      ],
      activeTab: "router",
      demoRoutes: [
        { name: "Home", label: "首页" },
        { name: "About", label: "关于" },
        { name: "Contact", label: "联系" },
      ],
    };
  },
  computed: {
    currentUrl() {
      return `/${this.currentRoute.toLowerCase()}`;
    },
  },
  methods: {
    measureSwitch() {
      const start = performance.now();
      this.currentRoute = this.currentRoute === "Home" ? "About" : "Home";
      this.$nextTick(() => {
        const end = performance.now();
        this.switchTime = Math.round(end - start);
      });
    },
    loadLazyComponent() {
      this.lazyComponentLoaded = true;
    },
  },
};
</script>

<style scoped>
.spa-demo {
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

.spa-architecture {
  margin-top: 30px;
}

.spa-architecture h3 {
  color: #2c3e50;
  margin-bottom: 20px;
  font-size: 1.4rem;
}

.architecture-diagram {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
  padding: 20px;
  background: #f8f9fa;
  border-radius: 8px;
}

.arch-layer {
  text-align: center;
  padding: 15px 30px;
  background: white;
  border-radius: 6px;
  border: 2px solid #e9ecef;
  min-width: 200px;
}

.arch-layer h4 {
  margin: 0 0 10px 0;
  color: #2c3e50;
  font-size: 1.1rem;
}

.arch-item {
  color: #555;
  font-weight: 500;
}

.arch-arrow {
  font-size: 1.5rem;
  color: #007bff;
  font-weight: bold;
}

.pros-cons-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;
  margin-top: 25px;
}

.pros-section,
.cons-section {
  padding: 25px;
  border-radius: 10px;
}

.pros-section {
  background: #e8f5e8;
  border-left: 4px solid #28a745;
}

.cons-section {
  background: #f8d7da;
  border-left: 4px solid #dc3545;
}

.pros-section h3,
.cons-section h3 {
  color: #2c3e50;
  margin-bottom: 20px;
  font-size: 1.3rem;
}

.pros-item,
.cons-item {
  margin-bottom: 20px;
  padding: 15px;
  background: white;
  border-radius: 6px;
}

.pros-item h4,
.cons-item h4 {
  color: #2c3e50;
  margin-bottom: 8px;
  font-size: 1.1rem;
}

.pros-item p,
.cons-item p {
  color: #555;
  margin: 0;
  line-height: 1.5;
}

.optimization-tips {
  margin-top: 30px;
}

.optimization-tips h3 {
  color: #2c3e50;
  margin-bottom: 20px;
  font-size: 1.4rem;
}

.tips-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-top: 20px;
}

.tip-card {
  padding: 20px;
  background: #f8f9fa;
  border-radius: 8px;
  border-left: 4px solid #ffc107;
}

.tip-card h4 {
  color: #2c3e50;
  margin-bottom: 15px;
  font-size: 1.1rem;
}

.tip-card ul {
  padding-left: 20px;
  color: #555;
}

.tip-card li {
  margin-bottom: 5px;
}

.comparison-table {
  margin-top: 25px;
  overflow-x: auto;
}

.comparison-table table {
  width: 100%;
  border-collapse: collapse;
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.comparison-table th,
.comparison-table td {
  padding: 15px;
  text-align: left;
  border-bottom: 1px solid #e9ecef;
}

.comparison-table th {
  background: #f8f9fa;
  color: #2c3e50;
  font-weight: 600;
}

.comparison-table tr:hover {
  background: #f8f9fa;
}

.scenario-recommendation {
  margin-top: 30px;
}

.scenario-recommendation h3 {
  color: #2c3e50;
  margin-bottom: 20px;
  font-size: 1.4rem;
}

.scenario-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 25px;
  margin-top: 20px;
}

.scenario-card {
  padding: 25px;
  border-radius: 10px;
  border-left: 4px solid;
}

.scenario-card.spa-recommended {
  background: #e8f5e8;
  border-left-color: #28a745;
}

.scenario-card.mpa-recommended {
  background: #fff3cd;
  border-left-color: #ffc107;
}

.scenario-card h4 {
  color: #2c3e50;
  margin-bottom: 15px;
  font-size: 1.2rem;
}

.scenario-card ul {
  padding-left: 20px;
  color: #555;
}

.scenario-card li {
  margin-bottom: 8px;
  line-height: 1.5;
}

.implementation-steps {
  margin-top: 25px;
}

.implementation-steps h3 {
  color: #2c3e50;
  margin-bottom: 20px;
  font-size: 1.4rem;
}

.steps-container {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: 20px;
}

.step-item {
  display: flex;
  align-items: flex-start;
  gap: 20px;
  padding: 20px;
  background: #f8f9fa;
  border-radius: 8px;
  border-left: 4px solid #007bff;
}

.step-number {
  width: 40px;
  height: 40px;
  background: #007bff;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 1.2rem;
  flex-shrink: 0;
}

.step-content h4 {
  color: #2c3e50;
  margin-bottom: 10px;
  font-size: 1.2rem;
}

.step-content p {
  color: #555;
  margin-bottom: 10px;
  line-height: 1.6;
}

.step-content ul {
  padding-left: 20px;
  color: #555;
}

.step-content li {
  margin-bottom: 5px;
  line-height: 1.5;
}

.code-examples {
  margin-top: 30px;
}

.code-examples h3 {
  color: #2c3e50;
  margin-bottom: 20px;
  font-size: 1.4rem;
}

.example-tabs {
  background: #f8f9fa;
  border-radius: 8px;
  overflow: hidden;
}

.tab-buttons {
  display: flex;
  background: #e9ecef;
}

.tab-btn {
  flex: 1;
  padding: 15px 20px;
  border: none;
  background: transparent;
  color: #495057;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 500;
}

.tab-btn:hover {
  background: #dee2e6;
}

.tab-btn.active {
  background: #007bff;
  color: white;
}

.tab-content {
  padding: 20px;
}

.code-block h4 {
  color: #2c3e50;
  margin-bottom: 15px;
  font-size: 1.1rem;
}

.code-block pre {
  background: #2d3748;
  color: #e2e8f0;
  padding: 20px;
  border-radius: 6px;
  overflow-x: auto;
  font-size: 0.9rem;
  line-height: 1.5;
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

.route-info {
  background: white;
  padding: 15px;
  border-radius: 6px;
  border-left: 4px solid #17a2b8;
}

.route-info p {
  margin: 5px 0;
  color: #555;
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

.component-content {
  background: white;
  border-radius: 6px;
  padding: 20px;
  min-height: 200px;
}

.demo-component {
  padding: 20px;
  background: #f8f9fa;
  border-radius: 6px;
  border-left: 4px solid #28a745;
}

.demo-component h3 {
  color: #2c3e50;
  margin-bottom: 15px;
}

.demo-component p {
  color: #555;
  margin-bottom: 15px;
  line-height: 1.6;
}

.demo-component ul {
  padding-left: 20px;
  color: #555;
}

.demo-component li {
  margin-bottom: 5px;
}

.spa-features {
  background: #f8f9fa;
  padding: 25px;
  border-radius: 8px;
  border: 2px solid #e9ecef;
}

.spa-features h4 {
  color: #2c3e50;
  margin-bottom: 20px;
  font-size: 1.2rem;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
}

.feature-demo {
  background: white;
  padding: 20px;
  border-radius: 6px;
  border-left: 4px solid #ffc107;
}

.feature-demo h5 {
  color: #2c3e50;
  margin-bottom: 10px;
  font-size: 1.1rem;
}

.feature-demo p {
  color: #555;
  margin-bottom: 15px;
  line-height: 1.5;
}

.counter-demo,
.performance-demo,
.loading-demo {
  text-align: center;
}

.counter-demo button,
.performance-demo button,
.loading-demo button {
  padding: 8px 16px;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin: 5px;
}

.counter-demo button:hover,
.performance-demo button:hover,
.loading-demo button:hover {
  background: #0056b3;
}

.lazy-content {
  margin-top: 15px;
  padding: 15px;
  background: #d4edda;
  border-radius: 4px;
  color: #155724;
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

.future-trend {
  margin-top: 15px;
  font-size: 0.95rem;
  color: #555;
  line-height: 1.5;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .spa-demo {
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

  .pros-cons-grid {
    grid-template-columns: 1fr;
  }

  .scenario-grid {
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

  .features-grid {
    grid-template-columns: 1fr;
  }

  .tab-buttons {
    flex-direction: column;
  }

  .architecture-diagram {
    gap: 10px;
  }

  .arch-layer {
    min-width: 150px;
    padding: 10px 20px;
  }
}

/* 路由原理样式 */
.router-principle {
  margin-top: 25px;
}

.router-principle h3 {
  color: #2c3e50;
  margin-bottom: 20px;
  font-size: 1.4rem;
}

.principle-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-top: 20px;
}

.principle-card {
  padding: 20px;
  background: #f8f9fa;
  border-radius: 8px;
  border-left: 4px solid #17a2b8;
}

.principle-card h4 {
  color: #2c3e50;
  margin-bottom: 10px;
  font-size: 1.1rem;
}

.principle-card p {
  color: #555;
  margin-bottom: 15px;
  line-height: 1.5;
}

.principle-card pre {
  background: #2d3748;
  color: #e2e8f0;
  padding: 15px;
  border-radius: 6px;
  overflow-x: auto;
  font-size: 0.85rem;
  line-height: 1.4;
  margin: 0;
}

.principle-card code {
  background: #f1f3f4;
  color: #d73a49;
  padding: 2px 6px;
  border-radius: 3px;
  font-size: 0.9rem;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .principle-grid {
    grid-template-columns: 1fr;
  }
}
</style>
