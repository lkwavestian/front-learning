<template>
  <div class="permission-demo">
    <!-- 页面头部 -->
    <div class="header-section">
      <h1>Vue2 权限管理系统详解</h1>
      <p class="subtitle">理解权限管理的核心概念、实现方式与最佳实践</p>
    </div>

    <!-- 快速导航 -->
    <div class="quick-nav">
      <a href="#what-is-permission" class="nav-item">什么是权限</a>
      <a href="#api-permission" class="nav-item">接口权限</a>
      <a href="#button-permission" class="nav-item">按钮权限</a>
      <a href="#menu-permission" class="nav-item">菜单权限</a>
      <a href="#route-permission" class="nav-item">路由权限</a>
      <a href="#implementation" class="nav-item">实现演示</a>
      <a href="#summary" class="nav-item">总结</a>
    </div>

    <!-- 什么是权限 -->
    <section id="what-is-permission" class="content-section">
      <h2>什么是权限管理？</h2>
      <p class="section-intro">
        权限管理是现代Web应用系统中不可或缺的重要组成部分，它控制着用户能够访问哪些功能、
        查看哪些数据、执行哪些操作。在Vue2项目中，权限管理主要涉及前端路由控制、
        组件渲染控制、接口访问控制等多个层面。
      </p>

      <div class="concept-grid">
        <div class="concept-card">
          <h3>权限管理的核心概念</h3>
          <ul>
            <li><strong>身份认证（Authentication）</strong>：验证用户身份，确认"你是谁"</li>
            <li><strong>权限控制（Authorization）</strong>：控制用户权限，确认"你能做什么"</li>
            <li><strong>角色管理（Role Management）</strong>：通过角色分配权限，便于管理</li>
            <li><strong>资源保护（Resource Protection）</strong>：保护敏感资源和功能</li>
          </ul>
        </div>

        <div class="concept-card">
          <h3>权限管理的层次结构</h3>
          <ul>
            <li><strong>页面级权限</strong>：控制用户能访问哪些页面</li>
            <li><strong>组件级权限</strong>：控制页面中哪些组件可见</li>
            <li><strong>按钮级权限</strong>：控制具体操作按钮的显示</li>
            <li><strong>数据级权限</strong>：控制用户能查看哪些数据</li>
          </ul>
        </div>

        <div class="concept-card">
          <h3>权限管理的实现方式</h3>
          <ul>
            <li><strong>前端权限控制</strong>：路由守卫、组件渲染控制</li>
            <li><strong>后端权限验证</strong>：接口权限检查、数据过滤</li>
            <li><strong>权限数据管理</strong>：权限配置、角色分配</li>
            <li><strong>动态权限加载</strong>：根据用户角色动态加载权限</li>
          </ul>
        </div>
      </div>
    </section>

    <!-- 接口权限 -->
    <section id="api-permission" class="content-section">
      <h2>接口权限管理</h2>
      <p class="section-intro">
        接口权限是权限管理的第一道防线，它确保只有有权限的用户才能调用相应的API接口。
        通过请求拦截器，我们可以在请求发送前进行权限验证，防止未授权访问。
      </p>

      <div class="feature-demo">
        <div class="demo-item">
          <h4>🔒 请求拦截器</h4>
          <ul>
            <li>在请求发送前检查接口权限</li>
            <li>自动添加用户认证信息</li>
            <li>记录请求日志和权限验证</li>
            <li>阻止无权限的接口调用</li>
          </ul>
        </div>

        <div class="demo-item">
          <h4>📡 响应拦截器</h4>
          <ul>
            <li>处理权限不足的响应（403状态码）</li>
            <li>自动跳转到无权限页面</li>
            <li>统一错误处理和用户提示</li>
            <li>清理无效的认证信息</li>
          </ul>
        </div>

        <div class="demo-item">
          <h4>🛡️ 权限验证逻辑</h4>
          <ul>
            <li>检查用户权限列表</li>
            <li>支持通配符权限（*:*）</li>
            <li>支持方法级别的权限控制</li>
            <li>动态权限更新和缓存</li>
          </ul>
        </div>
      </div>

      <div class="code-example">
        <h4>接口权限实现示例</h4>
        <div class="example-description">
          <p>通过axios拦截器实现接口权限控制，在请求发送前检查用户是否有权限访问该接口：</p>
          <ul>
            <li>自动检查每个HTTP请求的权限</li>
            <li>支持GET、POST、PUT、DELETE等方法的权限控制</li>
            <li>权限不足时自动阻止请求并提示用户</li>
            <li>支持动态权限更新和实时验证</li>
          </ul>
        </div>
      </div>
    </section>

    <!-- 按钮权限 -->
    <section id="button-permission" class="content-section">
      <h2>按钮权限管理</h2>
      <p class="section-intro">
        按钮权限控制是用户界面权限管理的重要组成部分，它确保只有有权限的用户才能看到和执行相应的操作按钮。
        通过Vue指令和混入，我们可以优雅地实现按钮级别的权限控制。
      </p>

      <div class="feature-demo">
        <div class="demo-item">
          <h4>🎯 自定义指令</h4>
          <ul>
            <li>v-has-permission="'user:add'" 指令</li>
            <li>自动隐藏无权限的按钮</li>
            <li>支持单个权限或多个权限检查</li>
            <li>动态权限更新时自动刷新</li>
          </ul>
        </div>

        <div class="demo-item">
          <h4>🔧 权限混入</h4>
          <ul>
            <li>this.$hasPermission('user:edit') 方法</li>
            <li>在组件中灵活检查权限</li>
            <li>支持条件渲染和逻辑控制</li>
            <li>便于权限逻辑的复用</li>
          </ul>
        </div>

        <div class="demo-item">
          <h4>⚡ 权限检查方法</h4>
          <ul>
            <li>hasButtonPermission() 核心检查方法</li>
            <li>支持通配符权限检查</li>
            <li>支持权限组合检查</li>
            <li>高性能的权限验证</li>
          </ul>
        </div>
      </div>

      <div class="usage-example">
        <h4>按钮权限使用方式</h4>
        <div class="example-description">
          <p>按钮权限可以通过多种方式实现，满足不同的使用场景：</p>
          <ul>
            <li><strong>指令方式</strong>：v-has-permission="'user:add'" 直接控制按钮显示</li>
            <li><strong>混入方式</strong>：this.$hasPermission('user:edit') 在逻辑中判断</li>
            <li><strong>计算属性</strong>：computed中根据权限控制按钮状态</li>
            <li><strong>条件渲染</strong>：v-if配合权限检查方法</li>
          </ul>
        </div>
      </div>
    </section>

    <!-- 菜单权限 -->
    <section id="menu-permission" class="content-section">
      <h2>菜单权限管理</h2>
      <p class="section-intro">
        菜单权限控制确保用户只能看到他们有权限访问的菜单项。通过动态菜单生成和权限过滤，
        我们可以根据用户的权限动态构建导航菜单，提供个性化的用户体验。
      </p>

      <div class="feature-demo">
        <div class="demo-item">
          <h4>🌳 菜单权限过滤</h4>
          <ul>
            <li>递归过滤菜单树结构</li>
            <li>支持多级菜单权限控制</li>
            <li>自动隐藏无权限的菜单项</li>
            <li>保持菜单结构的完整性</li>
          </ul>
        </div>

        <div class="demo-item">
          <h4>🔄 动态菜单生成</h4>
          <ul>
            <li>从服务器获取菜单配置</li>
            <li>根据用户权限动态过滤</li>
            <li>支持菜单权限的实时更新</li>
            <li>缓存优化和性能提升</li>
          </ul>
        </div>

        <div class="demo-item">
          <h4>📱 响应式菜单</h4>
          <ul>
            <li>支持移动端和桌面端</li>
            <li>菜单权限的实时同步</li>
            <li>支持菜单的展开收起</li>
            <li>权限变更时自动刷新</li>
          </ul>
        </div>
      </div>

      <div class="menu-structure">
        <h4>菜单权限结构示例</h4>
        <div class="menu-tree">
          <div class="menu-item">
            <span class="menu-icon">🏠</span>
            <span class="menu-text">首页</span>
          </div>
          <div class="menu-item">
            <span class="menu-icon">👥</span>
            <span class="menu-text">用户管理</span>
            <div class="submenu">
              <div class="submenu-item">用户列表</div>
              <div class="submenu-item">添加用户</div>
              <div class="submenu-item">用户详情</div>
            </div>
          </div>
          <div class="menu-item">
            <span class="menu-icon">⚙️</span>
            <span class="menu-text">系统设置</span>
            <div class="submenu">
              <div class="submenu-item">角色管理</div>
              <div class="submenu-item">权限配置</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 路由权限 -->
    <section id="route-permission" class="content-section">
      <h2>路由权限管理</h2>
      <p class="section-intro">
        路由权限是前端权限管理的核心，它控制着用户能够访问哪些页面。通过路由守卫和动态路由，
        我们可以在用户访问页面时进行权限验证，确保只有有权限的用户才能进入相应的页面。
      </p>

      <div class="feature-demo">
        <div class="demo-item">
          <h4>🛡️ 路由守卫</h4>
          <ul>
            <li>beforeEach 全局前置守卫</li>
            <li>检查用户登录状态</li>
            <li>验证页面访问权限</li>
            <li>自动跳转和错误处理</li>
          </ul>
        </div>

        <div class="demo-item">
          <h4>🔄 动态路由</h4>
          <ul>
            <li>根据权限动态添加路由</li>
            <li>支持嵌套路由权限控制</li>
            <li>路由权限的实时更新</li>
            <li>保持路由结构的完整性</li>
          </ul>
        </div>

        <div class="demo-item">
          <h4>⚡ 权限验证</h4>
          <ul>
            <li>路由元信息权限检查</li>
            <li>支持白名单路由配置</li>
            <li>权限不足时自动跳转</li>
            <li>支持权限的缓存和更新</li>
          </ul>
        </div>
      </div>

      <div class="route-example">
        <h4>路由权限配置示例</h4>
        <div class="example-description">
          <p>路由权限可以通过路由元信息进行配置，支持多种权限控制方式：</p>
          <ul>
            <li><strong>单个权限</strong>：meta: { permission: 'user:view' }</li>
            <li><strong>多个权限</strong>：meta: { permission: ['user:view', 'user:edit'] }</li>
            <li><strong>角色控制</strong>：meta: { roles: ['admin', 'manager'] }</li>
            <li><strong>白名单</strong>：不需要权限验证的公共页面</li>
          </ul>
        </div>
      </div>
    </section>

    <!-- 实现演示 -->
    <section id="implementation" class="content-section">
      <h2>权限管理实现演示</h2>
      <p class="section-intro">
        下面展示了权限管理系统的实际使用效果，包括不同权限用户的界面差异、
        权限检查的实际应用场景等。
      </p>

      <div class="demo-container">
        <div class="permission-simulation">
          <h4>权限模拟演示</h4>

          <div class="role-selector">
            <label>选择用户角色：</label>
            <select v-model="currentRole" @change="changeRole">
              <option value="guest">访客用户</option>
              <option value="user">普通用户</option>
              <option value="manager">管理员</option>
              <option value="admin">超级管理员</option>
            </select>
          </div>

          <div class="permission-display">
            <h5>当前权限：{{ currentRoleName }}</h5>
            <div class="permission-list">
              <div class="permission-item" v-for="perm in currentPermissions" :key="perm">
                <span class="permission-icon">✅</span>
                <span>{{ perm }}</span>
              </div>
            </div>
          </div>

          <div class="feature-demo-section">
            <h5>功能演示区域</h5>

            <!-- 按钮权限演示 -->
            <div class="button-demo">
              <h6>按钮权限控制：</h6>
              <button v-has-permission="'user:add'" class="demo-btn add-btn">添加用户</button>
              <button v-has-permission="'user:edit'" class="demo-btn edit-btn">编辑用户</button>
              <button v-has-permission="'user:delete'" class="demo-btn delete-btn">删除用户</button>
              <button v-has-permission="'system:config'" class="demo-btn config-btn">
                系统配置
              </button>
            </div>

            <!-- 条件渲染演示 -->
            <div class="conditional-demo">
              <h6>条件渲染演示：</h6>
              <div v-if="$hasPermission('user:view')" class="demo-content">
                <p>用户列表内容（需要 user:view 权限）</p>
                <ul>
                  <li>用户1 - 张三</li>
                  <li>用户2 - 李四</li>
                  <li>用户3 - 王五</li>
                </ul>
              </div>
              <div v-else class="no-permission">
                <p>您没有查看用户列表的权限</p>
              </div>
            </div>

            <!-- 权限检查演示 -->
            <div class="permission-check-demo">
              <h6>权限检查演示：</h6>
              <div class="check-results">
                <div class="check-item">
                  <span>user:add 权限：</span>
                  <span :class="checkResultClass('user:add')">
                    {{ $hasPermission("user:add") ? "有权限" : "无权限" }}
                  </span>
                </div>
                <div class="check-item">
                  <span>user:edit 权限：</span>
                  <span :class="checkResultClass('user:edit')">
                    {{ $hasPermission("user:edit") ? "有权限" : "无权限" }}
                  </span>
                </div>
                <div class="check-item">
                  <span>system:config 权限：</span>
                  <span :class="checkResultClass('system:config')">
                    {{ $hasPermission("system:config") ? "有权限" : "无权限" }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 总结 -->
    <section id="summary" class="content-section">
      <h2>权限管理总结</h2>
      <div class="summary-content">
        <div class="summary-grid">
          <div class="summary-card">
            <h3>权限管理的核心要素</h3>
            <ul>
              <li><strong>分层控制</strong>：接口、路由、菜单、按钮多层次权限控制</li>
              <li><strong>动态加载</strong>：根据用户角色动态加载权限和功能</li>
              <li><strong>统一管理</strong>：集中化的权限配置和管理</li>
              <li><strong>实时验证</strong>：权限变更时实时更新和验证</li>
            </ul>
          </div>

          <div class="summary-card">
            <h3>实现方式对比</h3>
            <ul>
              <li><strong>接口权限</strong>：axios拦截器 + 后端验证</li>
              <li><strong>按钮权限</strong>：Vue指令 + 混入方法</li>
              <li><strong>菜单权限</strong>：动态过滤 + 权限检查</li>
              <li><strong>路由权限</strong>：路由守卫 + 动态路由</li>
            </ul>
          </div>

          <div class="summary-card">
            <h3>最佳实践建议</h3>
            <ul>
              <li>前后端权限验证相结合</li>
              <li>权限粒度要适中，避免过度细化</li>
              <li>支持权限的动态更新和缓存</li>
              <li>提供友好的权限不足提示</li>
            </ul>
          </div>
        </div>

        <div class="key-points">
          <h3>关键要点</h3>
          <p>
            Vue2权限管理系统是一个综合性的解决方案，需要从多个层面进行设计和实现。
            通过合理的权限架构设计，我们可以构建出安全、灵活、易维护的权限管理系统，
            为用户提供个性化的功能体验，同时保护系统的安全性。
          </p>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { permissionMixin } from "../utils/permission";

export default {
  name: "PermissionDemo",
  mixins: [permissionMixin],
  data() {
    return {
      currentRole: "user",
      rolePermissions: {
        guest: ["user:view"],
        user: ["user:view", "user:add", "user:edit"],
        manager: ["user:view", "user:add", "user:edit", "user:delete"],
        admin: ["user:view", "user:add", "user:edit", "user:delete", "system:config", "*:*"],
      },
      roleNames: {
        guest: "访客用户",
        user: "普通用户",
        manager: "管理员",
        admin: "超级管理员",
      },
    };
  },
  computed: {
    currentRoleName() {
      return this.roleNames[this.currentRole] || "未知角色";
    },
    currentPermissions() {
      return this.rolePermissions[this.currentRole] || [];
    },
  },
  methods: {
    changeRole() {
      // 模拟角色切换
      console.log(`切换到角色: ${this.currentRole}`);
      // 在实际应用中，这里会调用store更新用户权限
    },
    checkResultClass(permission) {
      return this.$hasPermission(permission) ? "has-permission" : "no-permission";
    },
  },
};
</script>

<style scoped>
.permission-demo {
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

.feature-demo {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-top: 25px;
}

.demo-item {
  padding: 20px;
  background: #f8f9fa;
  border-radius: 8px;
  border-left: 4px solid #ffc107;
}

.demo-item h4 {
  color: #2c3e50;
  margin-bottom: 15px;
  font-size: 1.1rem;
}

.demo-item ul {
  padding-left: 20px;
}

.demo-item li {
  margin-bottom: 8px;
  color: #555;
}

.code-example,
.usage-example,
.route-example {
  background: #e3f2fd;
  padding: 20px;
  border-radius: 8px;
  border-left: 4px solid #2196f3;
  margin-top: 25px;
}

.code-example h4,
.usage-example h4,
.route-example h4 {
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

.menu-structure {
  margin-top: 25px;
}

.menu-structure h4 {
  color: #2c3e50;
  margin-bottom: 20px;
  font-size: 1.2rem;
}

.menu-tree {
  background: #f8f9fa;
  padding: 20px;
  border-radius: 8px;
  border: 2px solid #e9ecef;
}

.menu-item {
  margin-bottom: 15px;
  padding: 10px;
  background: white;
  border-radius: 6px;
  border-left: 3px solid #17a2b8;
}

.menu-icon {
  margin-right: 10px;
  font-size: 1.2rem;
}

.submenu {
  margin-left: 30px;
  margin-top: 10px;
}

.submenu-item {
  padding: 5px 10px;
  margin: 5px 0;
  background: #e9ecef;
  border-radius: 4px;
  font-size: 0.9rem;
  color: #555;
}

.demo-container {
  margin-top: 30px;
}

.permission-simulation h4 {
  color: #2c3e50;
  margin-bottom: 20px;
  font-size: 1.3rem;
  text-align: center;
}

.role-selector {
  text-align: center;
  margin-bottom: 25px;
  padding: 20px;
  background: #f8f9fa;
  border-radius: 8px;
}

.role-selector label {
  font-weight: 600;
  margin-right: 10px;
  color: #2c3e50;
}

.role-selector select {
  padding: 8px 16px;
  border: 2px solid #3498db;
  border-radius: 6px;
  font-size: 1rem;
  background: white;
  color: #2c3e50;
}

.permission-display {
  background: #e8f5e8;
  padding: 20px;
  border-radius: 8px;
  border-left: 4px solid #28a745;
  margin-bottom: 25px;
}

.permission-display h5 {
  color: #2c3e50;
  margin-bottom: 15px;
  font-size: 1.1rem;
}

.permission-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 10px;
}

.permission-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  background: white;
  border-radius: 6px;
  border-left: 3px solid #28a745;
}

.permission-icon {
  font-size: 1rem;
}

.feature-demo-section {
  background: #f8f9fa;
  padding: 25px;
  border-radius: 8px;
  border: 2px solid #e9ecef;
}

.feature-demo-section h5 {
  color: #2c3e50;
  margin-bottom: 20px;
  font-size: 1.2rem;
  text-align: center;
}

.button-demo,
.conditional-demo,
.permission-check-demo {
  margin-bottom: 25px;
  padding: 20px;
  background: white;
  border-radius: 8px;
  border-left: 4px solid #17a2b8;
}

.button-demo h6,
.conditional-demo h6,
.permission-check-demo h6 {
  color: #2c3e50;
  margin-bottom: 15px;
  font-size: 1.1rem;
}

.demo-btn {
  padding: 8px 16px;
  margin: 5px;
  border: none;
  border-radius: 6px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.add-btn {
  background: #28a745;
  color: white;
}

.edit-btn {
  background: #ffc107;
  color: #2c3e50;
}

.delete-btn {
  background: #dc3545;
  color: white;
}

.config-btn {
  background: #6f42c1;
  color: white;
}

.demo-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.demo-content {
  background: #e8f5e8;
  padding: 15px;
  border-radius: 6px;
  border-left: 3px solid #28a745;
}

.demo-content ul {
  margin: 10px 0;
  padding-left: 20px;
}

.demo-content li {
  margin-bottom: 5px;
  color: #555;
}

.no-permission {
  background: #f8d7da;
  padding: 15px;
  border-radius: 6px;
  border-left: 3px solid #dc3545;
  color: #721c24;
}

.check-results {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 15px;
}

.check-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 15px;
  background: #f8f9fa;
  border-radius: 6px;
  border-left: 3px solid #17a2b8;
}

.check-item span:first-child {
  color: #2c3e50;
  font-weight: 500;
}

.has-permission {
  color: #28a745;
  font-weight: 600;
}

.no-permission {
  color: #dc3545;
  font-weight: 600;
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

/* 响应式设计 */
@media (max-width: 768px) {
  .permission-demo {
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

  .feature-demo {
    grid-template-columns: 1fr;
  }

  .summary-grid {
    grid-template-columns: 1fr;
  }

  .permission-list {
    grid-template-columns: 1fr;
  }

  .check-results {
    grid-template-columns: 1fr;
  }

  .check-item {
    flex-direction: column;
    gap: 10px;
    align-items: flex-start;
  }
}
</style>
