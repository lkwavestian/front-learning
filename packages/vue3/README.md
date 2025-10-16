# Vue3 学习项目

这是一个专门用于学习 Vue.js 3.x 的项目，包含了 Vue3 的核心功能演示。

## 技术栈

- **Vue 3.5+**: 采用 Composition API 和 `<script setup>` 语法
- **TypeScript**: 全面的类型支持
- **Vue Router 4**: 现代化的路由管理
- **Pinia**: 新一代状态管理
- **Vite**: 快速的构建工具

## 项目结构

```
src/
├── assets/          # 静态资源（图片、字体等）
├── components/      # 可复用组件
│   └── README.md   # 组件使用规范
├── router/         # 路由配置
│   └── index.ts    # 路由和导航菜单配置
├── store/          # Pinia 状态管理
│   └── index.ts    # 全局 Store
├── utils/          # 工具函数
│   └── README.md   # 工具函数规范
├── views/          # 页面组件
│   └── TestDemo.vue # 测试页面
├── App.vue         # 根组件
├── main.ts         # 应用入口
└── style.css       # 全局样式
```

## 开发指南

### 安装依赖

```bash
npm install
```

### 启动开发服务器

```bash
npm run dev
```

### 构建生产版本

```bash
npm run build
```

### 预览生产版本

```bash
npm run preview
```

## 核心特性

### 1. 路由配置

在 `router/index.ts` 中配置导航菜单，支持：

- 路由懒加载
- Meta 信息配置
- Keep-Alive 缓存策略

### 2. Keep-Alive 缓存管理

在 `App.vue` 中实现了智能缓存管理：

- **always**: 总是缓存
- **conditional**: 条件缓存（根据路由参数、用户权限等）
- **never**: 从不缓存

### 3. 状态管理

使用 Pinia 进行状态管理，提供了示例 Store：

- `useCounterStore`: 计数器状态
- `useUserStore`: 用户信息状态

### 4. TypeScript 支持

全面的类型注解和类型推断，提高代码质量和开发体验。

## 添加新页面

1. 在 `views/` 创建新的页面组件
2. 在 `router/index.ts` 的 `navMenu` 中添加路由配置
3. 配置相应的 meta 信息和缓存策略

示例：

```typescript
{
  path: "/my-demo",
  name: "MyDemo",
  label: "我的演示",
  desc: "演示页面描述",
  component: () => import("../views/MyDemo.vue"),
  meta: {
    keepAlive: true,
    title: "我的演示",
    cacheStrategy: "always",
  },
}
```

## 最佳实践

1. **组件命名**: 使用 PascalCase
2. **文件组织**: 按功能模块划分
3. **类型安全**: 充分利用 TypeScript
4. **代码复用**: 抽取公共组件和工具函数
5. **性能优化**: 合理使用 Keep-Alive 和懒加载

## 与 Vue2 项目对比

| 特性       | Vue2              | Vue3                               |
| ---------- | ----------------- | ---------------------------------- |
| API 风格   | Options API       | Composition API + `<script setup>` |
| 状态管理   | Vuex              | Pinia                              |
| 路由       | Vue Router 3      | Vue Router 4                       |
| 构建工具   | Vue CLI + Webpack | Vite                               |
| TypeScript | 部分支持          | 完整支持                           |
| 性能       | 基准              | 更快、更小                         |

## 学习资源

- [Vue 3 官方文档](https://vuejs.org/)
- [Pinia 文档](https://pinia.vuejs.org/)
- [Vue Router 4 文档](https://router.vuejs.org/)
- [Vite 文档](https://vitejs.dev/)

## 许可证

MIT
