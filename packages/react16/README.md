# React 学习项目

这是一个专门用于学习 React 的项目，包含了 React 的核心功能演示和实战例子。

## 📚 项目结构

```
react16/
├── src/
│   ├── router/           # 路由配置
│   │   └── index.js     # 导航菜单和路由配置
│   ├── views/           # 页面组件
│   │   └── TestDemo.jsx # 测试页面
│   ├── components/      # 可复用组件（待添加）
│   ├── App.js          # 主应用组件
│   ├── App.css         # 全局样式
│   └── index.js        # 应用入口
├── public/             # 静态资源
└── package.json        # 项目配置
```

## 🚀 快速开始

### 安装依赖

```bash
cd packages/react16
npm install
```

### 启动开发服务器

```bash
npm start
```

应用将在 [http://localhost:3000](http://localhost:3000) 打开。

### 构建生产版本

```bash
npm run build
```

## 📖 功能特性

### 已实现

- ✅ **路由系统**：使用 React Router v6 实现单页面应用路由
- ✅ **首页导航**：卡片式布局展示所有学习模块
- ✅ **测试页面**：包含计数器、列表管理等基础功能演示
- ✅ **懒加载**：路由组件按需加载，优化性能
- ✅ **响应式设计**：支持移动端和桌面端

### 待添加

- ⏳ **状态管理**：Redux 或 Context API 示例
- ⏳ **Hooks 详解**：useState、useEffect、useContext 等
- ⏳ **组件通信**：父子组件、兄弟组件通信方式
- ⏳ **生命周期**：类组件和函数组件生命周期对比
- ⏳ **表单处理**：受控组件与非受控组件
- ⏳ **HTTP 请求**：Axios 封装与使用
- ⏳ **性能优化**：React.memo、useMemo、useCallback
- ⏳ **高阶组件**：HOC 模式与应用

## 🎯 学习路线

1. **基础概念**

   - 组件化思想
   - JSX 语法
   - Props 和 State
   - 事件处理

2. **Hooks**

   - useState - 状态管理
   - useEffect - 副作用处理
   - useContext - 上下文共享
   - useReducer - 复杂状态管理
   - useMemo/useCallback - 性能优化

3. **路由**

   - React Router 配置
   - 路由跳转与参数传递
   - 路由守卫

4. **状态管理**

   - Context API
   - Redux
   - Redux Toolkit

5. **性能优化**
   - Virtual DOM
   - React.memo
   - 代码分割
   - 懒加载

## 📝 添加新页面

1. 在 `src/views/` 创建新组件：

```jsx
// src/views/NewDemo.jsx
import React from "react";
import "./NewDemo.css";

function NewDemo() {
  return (
    <div className="new-demo-container">
      <h1>新页面</h1>
    </div>
  );
}

export default NewDemo;
```

2. 在 `src/router/index.js` 添加路由配置：

```javascript
{
  path: "/new-demo",
  name: "NewDemo",
  label: "新页面",
  desc: "页面描述",
  component: () => import("../views/NewDemo"),
}
```

3. 页面会自动出现在首页的导航卡片中！

## 🛠️ 技术栈

- **React 19.2** - JavaScript 库
- **React Router 6** - 路由管理
- **React Hooks** - 状态和副作用管理
- **CSS3** - 样式设计

## 📱 响应式支持

项目完全支持响应式设计，可在以下设备完美显示：

- 桌面电脑（>1200px）
- 平板电脑（768px - 1200px）
- 移动设备（<768px）

## 🎨 设计理念

- **简洁优雅**：清爽的界面设计
- **易于学习**：每个示例都有详细注释
- **实战导向**：贴近真实项目场景
- **可扩展性**：易于添加新的学习模块

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📄 许可证

MIT License

---

**开始你的 React 学习之旅！** ⚛️
