# 组件目录

这个目录用于存放可复用的 React 组件。

## 📁 目录结构

```
components/
├── Button/          # 按钮组件
├── Card/           # 卡片组件
├── Form/           # 表单组件
├── Modal/          # 弹窗组件
└── ...            # 其他组件
```

## 📝 组件命名规范

1. **组件文件**：使用 PascalCase 命名
   - `Button.jsx` / `Button.js`
   - `UserCard.jsx`
   - `FormInput.jsx`

2. **样式文件**：与组件同名
   - `Button.css`
   - `Button.module.css`（CSS Modules）

3. **组件目录**：组件相关文件放在同一目录
   ```
   Button/
   ├── index.jsx      # 组件主文件
   ├── Button.css     # 样式文件
   └── README.md      # 组件说明（可选）
   ```

## 🎯 组件开发指南

### 函数组件模板

```jsx
import React from 'react';
import './ComponentName.css';

/**
 * 组件说明
 * @param {Object} props - 组件属性
 * @param {string} props.title - 标题
 * @param {Function} props.onClick - 点击事件
 */
function ComponentName({ title, onClick }) {
  return (
    <div className="component-name">
      <h2>{title}</h2>
      <button onClick={onClick}>点击</button>
    </div>
  );
}

export default ComponentName;
```

### Hooks 使用示例

```jsx
import React, { useState, useEffect, useCallback, useMemo } from 'react';

function ExampleComponent() {
  // 状态管理
  const [count, setCount] = useState(0);
  
  // 副作用
  useEffect(() => {
    console.log('组件挂载或更新');
    
    return () => {
      console.log('组件卸载');
    };
  }, [count]);
  
  // 回调函数优化
  const handleClick = useCallback(() => {
    setCount(prev => prev + 1);
  }, []);
  
  // 计算值优化
  const doubleCount = useMemo(() => {
    return count * 2;
  }, [count]);
  
  return (
    <div>
      <p>Count: {count}</p>
      <p>Double: {doubleCount}</p>
      <button onClick={handleClick}>增加</button>
    </div>
  );
}
```

## 🔧 组件类型

### 1. 展示组件（Presentational Components）
- 只负责 UI 展示
- 通过 props 接收数据
- 无状态或只有 UI 状态

```jsx
function UserCard({ user }) {
  return (
    <div className="user-card">
      <h3>{user.name}</h3>
      <p>{user.email}</p>
    </div>
  );
}
```

### 2. 容器组件（Container Components）
- 负责数据获取和状态管理
- 处理业务逻辑
- 向展示组件传递数据

```jsx
function UserContainer() {
  const [user, setUser] = useState(null);
  
  useEffect(() => {
    fetchUser().then(setUser);
  }, []);
  
  return <UserCard user={user} />;
}
```

### 3. 高阶组件（HOC）
- 增强组件功能
- 复用组件逻辑

```jsx
function withLoading(Component) {
  return function WithLoadingComponent({ isLoading, ...props }) {
    if (isLoading) return <div>Loading...</div>;
    return <Component {...props} />;
  };
}
```

### 4. 自定义 Hooks
- 复用状态逻辑
- 以 use 开头命名

```jsx
function useCounter(initialValue = 0) {
  const [count, setCount] = useState(initialValue);
  
  const increment = useCallback(() => {
    setCount(c => c + 1);
  }, []);
  
  const decrement = useCallback(() => {
    setCount(c => c - 1);
  }, []);
  
  return { count, increment, decrement };
}
```

## 💡 最佳实践

1. **单一职责**：每个组件只做一件事
2. **Props 验证**：使用 PropTypes 或 TypeScript
3. **默认值**：为 props 提供默认值
4. **性能优化**：适当使用 React.memo、useMemo、useCallback
5. **可访问性**：添加 aria-* 属性
6. **错误边界**：处理组件错误

## 📦 导出方式

### 命名导出
```jsx
export function Button() { /* ... */ }
export function Card() { /* ... */ }
```

### 默认导出
```jsx
export default function Button() { /* ... */ }
```

### 组合导出
```jsx
// components/index.js
export { default as Button } from './Button';
export { default as Card } from './Card';
export { default as Form } from './Form';
```

## 🎨 样式方案

1. **普通 CSS**
```jsx
import './Component.css';
```

2. **CSS Modules**
```jsx
import styles from './Component.module.css';
<div className={styles.container}>
```

3. **Styled Components**
```jsx
import styled from 'styled-components';
const Container = styled.div`
  padding: 20px;
`;
```

4. **Inline Styles**
```jsx
<div style={{ padding: '20px', color: 'blue' }}>
```

---

**开始创建你的第一个组件吧！** 🚀

