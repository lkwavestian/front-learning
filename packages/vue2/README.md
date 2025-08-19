# Vue2 学习项目

这是一个基于 Vue.js 2.7.16 的学习项目，展示了 Vue2 的核心功能和最佳实践。

## 🚀 项目特性

- **Vue.js 2.7.16** - 使用最新的 Vue2 版本
- **Vue Router 3** - 官方路由管理器
- **Vue CLI 5** - 现代化的构建工具
- **Babel** - ES6+ 语法支持

## 📁 项目结构

```
src/
├── App.vue              # 根组件（包含导航菜单）
├── main.js              # 应用入口文件
├── router/              # 路由配置
│   └── index.js         # 路由规则定义
├── components/          # 组件目录
│   └── HelloWorld.vue   # 首页组件（Vue2功能演示）
├── views/               # 页面组件
│   ├── About.vue        # 关于页面
│   ├── Contact.vue      # 联系页面
│   └── Profile.vue      # 个人资料页面
└── assets/              # 静态资源
```

## 🎯 功能演示

### 1. 路由系统 (Vue Router)

- **导航菜单** - 响应式导航栏
- **路由配置** - 支持历史模式路由
- **页面组件** - 懒加载页面组件
- **路由守卫** - 可扩展的路由控制

### 2. 数据绑定 (Data Binding)

- 双向数据绑定 (`v-model`)
- 文本插值 (`{{ }}`)

### 3. 事件处理 (Event Handling)

- 点击事件 (`@click`)
- 方法调用

### 4. 计算属性 (Computed Properties)

- 响应式计算
- 缓存优化

### 5. 条件渲染 (Conditional Rendering)

- `v-if` / `v-else`
- 动态显示/隐藏

### 6. 列表渲染 (List Rendering)

- `v-for` 循环
- 动态添加项目

## 🌐 页面说明

### 首页 (`/`)

- HelloWorld 组件展示 Vue2 核心功能
- 包含数据绑定、事件处理、计算属性等示例

### 关于页面 (`/about`)

- 项目介绍和技术栈说明
- 主要特性列表

### 联系页面 (`/contact`)

- 联系表单（姓名、邮箱、留言）
- 表单验证和提交反馈

### 个人资料页面 (`/profile`)

- 用户信息展示
- 技能标签和最近活动

## 🛠️ 开发命令

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run serve

# 构建生产版本
npm run build
```

## 🌐 访问地址

开发服务器启动后，访问: `http://localhost:8080`

## 📚 学习资源

- [Vue.js 2.x 官方文档](https://v2.vuejs.org/)
- [Vue Router 3.x 文档](https://v3.router.vuejs.org/)
- [Vue CLI 文档](https://cli.vuejs.org/)
- [Vue 组件指南](https://v2.vuejs.org/v2/guide/components.html)

## 🔧 技术栈

- **前端框架**: Vue.js 2.7.16
- **路由管理**: Vue Router 3.6.5
- **构建工具**: Vue CLI 5
- **包管理器**: npm
- **转译器**: Babel

## 📝 注意事项

- 本项目使用 Vue2 语法，与 Vue3 有显著差异
- Vue2 已于 2024 年 6 月 30 日结束生命周期支持
- 建议新项目使用 Vue3，本项目主要用于学习和参考
- 路由使用 HTML5 History 模式，需要服务器配置支持

## 🤝 贡献

欢迎提交 Issue 和 Pull Request 来改进这个项目！
