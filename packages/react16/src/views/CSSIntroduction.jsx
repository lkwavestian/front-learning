import React, { useState } from 'react';
import './CSSIntroduction.css';
import styles from './CSSIntroduction.module.css';

// ============ 1. 内联样式示例 ============
function InlineStyleDemo() {
  const [size, setSize] = useState(16);

  return (
    <div className="demo-container">
      <h3>内联样式 (Inline Styles)</h3>
      <div
        style={{
          padding: '20px',
          backgroundColor: '#e3f2fd',
          borderRadius: '8px',
          border: '2px solid #2196f3',
          fontSize: `${size}px`,
          color: '#1565c0'
        }}
      >
        <p style={{ margin: '0 0 10px 0' }}>
          这个文字大小受内联样式控制
        </p>
        <button
          onClick={() => setSize(size + 2)}
          style={{
            padding: '8px 16px',
            backgroundColor: '#2196f3',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '14px'
          }}
        >
          增大字体
        </button>
      </div>
    </div>
  );
}

// ============ 2. CSS Modules 示例 ============
function CSSModulesDemo() {
  return (
    <div className="demo-container">
      <h3>CSS Modules</h3>
      <div className={styles.modulesBox}>
        <p className={styles.modulesText}>
          这个盒子使用了 CSS Modules
        </p>
        <button className={styles.modulesButton}>
          CSS Modules 按钮
        </button>
      </div>
    </div>
  );
}

// ============ 3. Styled Components 风格的内联示例 ============
function StyledComponentDemo() {
  const Button = ({ primary, children, onClick }) => {
    const buttonStyle = {
      padding: '12px 24px',
      borderRadius: '6px',
      border: primary ? 'none' : '2px solid #4caf50',
      backgroundColor: primary ? '#4caf50' : 'transparent',
      color: primary ? 'white' : '#4caf50',
      cursor: 'pointer',
      fontSize: '16px',
      fontWeight: '600',
      transition: 'all 0.3s',
    };

    return (
      <button style={buttonStyle} onClick={onClick}>
        {children}
      </button>
    );
  };

  return (
    <div className="demo-container">
      <h3>Styled Components 风格（动态样式）</h3>
      <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
        <Button primary>主要按钮</Button>
        <Button>次要按钮</Button>
      </div>
    </div>
  );
}

// ============ 4. CSS-in-JS 示例 ============
function CSSInJSDemo() {
  const Box = ({ color, size }) => {
    const boxStyle = React.useMemo(() => ({
      width: size,
      height: size,
      backgroundColor: color,
      borderRadius: '8px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'white',
      fontWeight: 'bold',
      transition: 'all 0.3s',
    }), [color, size]);

    return <div style={boxStyle}>{size}px</div>;
  };

  return (
    <div className="demo-container">
      <h3>CSS-in-JS 风格</h3>
      <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
        <Box color="#f44336" size={80} />
        <Box color="#2196f3" size={100} />
        <Box color="#4caf50" size={120} />
      </div>
    </div>
  );
}

// 主组件
function CSSIntroduction() {
  const [activeSection, setActiveSection] = useState('methods');
  const [hoverIndex, setHoverIndex] = useState(null);

  const sections = [
    { id: 'methods', name: '样式引入方式' },
    { id: 'comparison', name: '方式对比' },
    { id: 'global', name: '全局 vs 局部' },
    { id: 'performance', name: '性能对比' },
    { id: 'modules-sass', name: 'CSS Modules + Sass' },
  ];

  // 代码示例
  const inlineStylesCode = `// 1. 内联样式（Inline Styles）
function Component() {
  const [active, setActive] = useState(false);
  
  const style = {
    padding: '20px',
    backgroundColor: active ? '#4caf50' : '#f44336',
    color: 'white',
    borderRadius: '8px',
    cursor: 'pointer'
  };
  
  return (
    <div style={style} onClick={() => setActive(!active)}>
      点击切换颜色
    </div>
  );
}

// 特点：
// ✅ 样式范围限定在组件
// ✅ 可以动态计算
// ✅ 不需要额外的 CSS 文件
// ⚠️ 无法使用伪类和媒体查询
// ⚠️ 样式代码会混入 JSX`;

  const cssModulesCode = `// 2. CSS Modules
// Component.module.css
.container {
  padding: 20px;
  background-color: #e3f2fd;
  border-radius: 8px;
}

.title {
  color: #1565c0;
  font-size: 24px;
}

// Component.jsx
import styles from './Component.module.css';

function Component() {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>使用 CSS Modules</h2>
    </div>
  );
}

// 编译后类名会被哈希化：
// <div class="Component_container__abc123">

// 特点：
// ✅ 局部作用域，不会冲突
// ✅ 支持所有 CSS 特性
// ✅ 类名自动哈希化
// ✅ 代码提示和自动补全
// ⚠️ 需要额外配置`;

  const styledComponentsCode = `// 3. Styled Components（需要安装）
// npm install styled-components

import styled from 'styled-components';

// 创建带样式的组件
const Button = styled.button\`
  padding: 12px 24px;
  background-color: \${props => props.primary ? '#4caf50' : 'transparent'};
  color: \${props => props.primary ? 'white' : '#4caf50'};
  border: 2px solid #4caf50;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s;
  
  &:hover {
    transform: scale(1.05);
  }
\`;

function Component() {
  return (
    <>
      <Button primary>主要按钮</Button>
      <Button>次要按钮</Button>
    </>
  );
}

// 特点：
// ✅ 组件和样式耦合
// ✅ 支持 props 动态样式
// ✅ 自动处理作用域
// ✅ 支持嵌套和伪类
// ⚠️ 需要额外安装包`;

  const cssInJSCode = `// 4. CSS-in-JS 其他库
// emotion
import { css } from '@emotion/react';

const container = css\`
  padding: 20px;
  background-color: #e3f2fd;
  &:hover {
    background-color: #bbdefb;
  }
\`;

// 或运行时解决方案
import { style } from 'typestyle';

const containerStyle = style({
  padding: '20px',
  backgroundColor: '#e3f2fd',
  ':hover': {
    backgroundColor: '#bbdefb'
  }
});

// 特点：
// ✅ 完全集成在 JS 中
// ✅ 动态样式能力强
// ✅ 可编程式样式
// ⚠️ 性能开销较大
// ⚠️ 调试困难`;

  const importStylesCode = `// 5. 直接导入 CSS 文件
// App.css
.app-container {
  padding: 20px;
  background-color: #f5f5f5;
}

.title {
  color: #333;
  font-size: 32px;
}

// App.jsx
import './App.css';  // 全局作用域

function App() {
  return (
    <div className="app-container">
      <h1 className="title">我的应用</h1>
    </div>
  );
}

// 特点：
// ✅ 简单直接
// ✅ 支持所有 CSS 特性
// ✅ 可以使用预处理器（Sass/Less）
// ❌ 全局作用域，容易冲突
// ❌ 打包后体积可能较大`;

  const scssExampleCode = `// 6. Sass/SCSS（需要安装）
// npm install sass

// Component.scss
$primary-color: #2196f3;
$border-radius: 8px;

.container {
  padding: 20px;
  background-color: $primary-color;
  border-radius: $border-radius;
  
  .title {
    color: white;
    font-size: 24px;
    
    &:hover {
      transform: scale(1.1);
    }
  }
}

// Component.jsx
import './Component.scss';

function Component() {
  return (
    <div className="container">
      <h2 className="title">Sass 示例</h2>
    </div>
  );
}

// 特点：
// ✅ 支持变量、嵌套、混入
// ✅ 成熟的生态系统
// ✅ 编译后是标准 CSS
// ⚠️ 需要编译步骤`;

  const modulesSassBasicCode = `// ========== CSS Modules + Sass 基础示例 ==========

// Button.module.scss
// 1. 使用 Sass 变量
$primary: #2196f3;
$secondary: #f44336;
$border-radius: 8px;
$transition: all 0.3s ease;

.button {
  padding: 12px 24px;
  border: none;
  border-radius: $border-radius;
  transition: $transition;
  
  // 2. 使用嵌套
  &:hover {
    transform: scale(1.05);
  }
  
  // 3. 使用修饰符
  &--primary {
    background-color: $primary;
    color: white;
  }
  
  &--secondary {
    background-color: $secondary;
    color: white;
  }
  
  // 4. 嵌套媒体查询
  @media (max-width: 768px) {
    padding: 8px 16px;
    font-size: 14px;
  }
}

// Button.jsx
import styles from './Button.module.scss';

function Button({ variant = 'primary', children }) {
  return (
    <button className={\`\${styles.button} \${styles[\`button--\${variant}\`]}\`}>
      {children}
    </button>
  );
}`;

  const modulesSassAdvancedCode = `// ========== CSS Modules + Sass 进阶技巧 ==========

// 1. 使用混入（Mixin）
// mixins.scss（共享文件）
@mixin flex-center {
  display: flex;
  align-items: center;
  justify-content: center;
}

@mixin card-shadow {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  
  &:hover {
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
  }
}

// Card.module.scss
@import '../styles/mixins.scss';

.card {
  @include flex-center;
  @include card-shadow;
  padding: 20px;
  border-radius: 12px;
}

// 2. 使用函数
@function calculate-rem($size) {
  @return $size / 16px * 1rem;
}

.title {
  font-size: calculate-rem(24px);
  line-height: calculate-rem(32px);
}

// 3. 使用占位符选择器
%button-base {
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s;
}

.primary-button {
  @extend %button-base;
  background-color: #2196f3;
}

.secondary-button {
  @extend %button-base;
  background-color: #fff;
  border: 2px solid #2196f3;
}`;

  const modulesSassStructureCode = `// ========== CSS Modules + Sass 项目结构 ==========

src/
├── styles/
│   ├── variables.scss      # 全局变量
│   ├── mixins.scss         # 全局混入
│   ├── functions.scss      # 全局函数
│   └── breakpoints.scss    # 断点定义
│
├── components/
│   ├── Button/
│   │   ├── Button.jsx
│   │   └── Button.module.scss
│   ├── Card/
│   │   ├── Card.jsx
│   │   └── Card.module.scss
│   └── Layout/
│       ├── Layout.jsx
│       └── Layout.module.scss

// variables.scss
$colors: (
  primary: #2196f3,
  secondary: #f44336,
  success: #4caf50,
  warning: #ff9800,
  error: #f44336
);

$spacing: (
  xs: 4px,
  sm: 8px,
  md: 16px,
  lg: 24px,
  xl: 32px
);

$breakpoints: (
  mobile: 768px,
  tablet: 1024px,
  desktop: 1440px
);

// Card.module.scss
@import '../../styles/variables.scss';
@import '../../styles/mixins.scss';

@function color($name) {
  @return map-get($colors, $name);
}

@function spacing($size) {
  @return map-get($spacing, $size);
}

.card {
  background: white;
  padding: spacing(lg);
  border-radius: spacing(md);
  
  .title {
    color: color(primary);
    margin-bottom: spacing(md);
  }
  
  // 使用 map-get
  @media (max-width: map-get($breakpoints, mobile)) {
    padding: spacing(md);
  }
}`;

  const modulesSassComparisonCode = `// ========== CSS Modules 和 CSS Modules + Sass 对比 ==========

// ===== 普通 CSS Modules =====
// Button.module.css
.button {
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  background-color: #2196f3;
  color: white;
  transition: all 0.3s;
}

.button:hover {
  transform: scale(1.05);
}

.button--secondary {
  background-color: #f44336;
}

.button--small {
  padding: 8px 16px;
  font-size: 14px;
}

// 缺点：
// ❌ 无法使用变量，颜色需要重复写
// ❌ 嵌套规则需要重复写类名
// ❌ 无法使用函数和混入
// ❌ 代码重复多


// ===== CSS Modules + Sass =====
// Button.module.scss
$primary: #2196f3;
$secondary: #f44336;

@mixin button-base {
  border: none;
  border-radius: 8px;
  transition: all 0.3s;
  
  &:hover {
    transform: scale(1.05);
  }
}

.button {
  @include button-base;
  padding: 12px 24px;
  background-color: $primary;
  color: white;
  
  &--secondary {
    background-color: $secondary;
  }
  
  &--small {
    padding: 8px 16px;
    font-size: 14px;
  }
}

// 优点：
// ✅ 使用变量，便于维护
// ✅ 嵌套语法清晰
// ✅ 混入复用代码
// ✅ 代码更简洁

// ===== 使用对比 =====
// 两者在 JavaScript 中使用方式完全相同！
import styles from './Button.module.css';    // 或 .scss
// 类名哈希化机制完全一致
<button className={styles.button}>按钮</button>`;

  const comparisonTableData = [
    {
      aspect: '学习成本',
      inline: '⭐⭐⭐ 低',
      modules: '⭐⭐ 中',
      styled: '⭐ 高',
      import: '⭐⭐⭐⭐ 极低',
      sass: '⭐⭐ 中',
    },
    {
      aspect: '性能开销',
      inline: '⭐⭐ 中等',
      modules: '⭐⭐⭐⭐ 优秀',
      styled: '⭐ 较大（运行时）',
      import: '⭐⭐⭐⭐⭐ 最优',
      sass: '⭐⭐⭐⭐ 优秀',
    },
    {
      aspect: '作用域',
      inline: '局部',
      modules: '局部',
      styled: '局部',
      import: '全局',
      sass: '取决于使用方式',
    },
    {
      aspect: '动态样式',
      inline: '⭐⭐⭐⭐⭐ 强',
      modules: '⭐ 弱',
      styled: '⭐⭐⭐⭐⭐ 强',
      import: '⭐ 弱',
      sass: '⭐ 弱',
    },
    {
      aspect: 'CSS 特性支持',
      inline: '不支持伪类、媒体查询',
      modules: '⭐⭐⭐⭐⭐ 完整支持',
      styled: '⭐⭐⭐⭐ 基本支持',
      import: '⭐⭐⭐⭐⭐ 完整支持',
      sass: '⭐⭐⭐⭐⭐ 完整支持+扩展',
    },
    {
      aspect: '调试方便性',
      inline: '⭐⭐⭐ 一般',
      modules: '⭐⭐⭐⭐ 好',
      styled: '⭐⭐ 困难',
      import: '⭐⭐⭐⭐⭐ 最好',
      sass: '⭐⭐⭐⭐ 好',
    },
    {
      aspect: '构建工具要求',
      inline: '无需',
      modules: '需要配置',
      styled: '需要安装包',
      import: '无需',
      sass: '需要安装预处理器',
    },
    {
      aspect: '代码分离',
      inline: '⭐ 样式混入 JS',
      modules: '⭐⭐⭐⭐⭐ 完全分离',
      styled: '⭐⭐⭐ 部分分离',
      import: '⭐⭐⭐⭐⭐ 完全分离',
      sass: '⭐⭐⭐⭐⭐ 完全分离',
    },
  ];

  const globalVsLocalCode = `// ==================== 全局样式 ====================
// global.css（全局作用域）
.container {     /* 所有 .container 都会生效 */
  padding: 20px;
}

.title {         /* 所有 .title 都会生效 */
  color: #333;
}

// 导入全局样式
import './global.css';  // 在 index.js 或根组件中

// 问题：样式会泄漏，影响所有组件
function ComponentA() {
  return <div className="container">...</div>;  // 受影响
}

function ComponentB() {
  return <div className="container">...</div>;  // 也受影响
}


// ==================== 局部样式 ====================
// CSS Modules（局部作用域）
// Component.module.css
.container {
  padding: 20px;
}

// Component.jsx
import styles from './Component.module.css';

function Component() {
  return (
    <div className={styles.container}>  {/* 只影响这个组件 */}
      ...
    </div>
  );
}

// 编译后：Component_container__abc123
// 其他组件完全不受影响


// ==================== 最佳实践 ====================
// 全局样式：基础重置、字体、主题
// global.css
* { margin: 0; padding: 0; box-sizing: border-box; }
body { font-family: -apple-system, BlinkMacSystemFont, ...; }

// 局部样式：组件特定样式
// Button.module.css
.button { ... }

// index.js
import './global.css';  // 只导入一次

// 组件中
import styles from './Button.module.css';  // 每个组件自己的样式`;

  const performanceComparisonCode = `// ==================== 打包大小 ====================

// 1. 直接导入 CSS
import './Component.css';
// 打包后：CSS 文件单独打包，体积较大但可缓存


// 2. CSS Modules
import styles from './Component.module.css';
// 打包后：类名哈希化，CSS 提取，体积较小


// 3. Styled Components（运行时）
import styled from 'styled-components';
const Button = styled.button\`...\`;
// 打包后：运行时解析样式，JS 体积增加 ~13KB


// 4. CSS-in-JS（编译时）
import { css } from '@emotion/react';
// 打包后：编译时处理，相比运行时更小


// ==================== 运行时性能 ====================

// 内联样式 + 对象缓存
const cachedStyle = { padding: '20px', color: 'blue' };
<div style={cachedStyle}>  ✅ 避免重复创建对象

<div style={{ padding: '20px', color: 'blue' }}>  ❌ 每次渲染创建新对象

// CSS Modules：最优
import styles from './Component.module.css';
<div className={styles.container}>  ✅ 类名编译时确定，零运行时开销

// Styled Components：中等
const Button = styled.button\`...\`;  ⚠️ 运行时解析，首次渲染较慢

// ==================== 缓存策略 ====================

// 静态 CSS：浏览器可缓存
link rel="stylesheet" href="app.css?v=1.0.0"

// CSS-in-JS：随 JS 一起加载，无独立缓存
`;

  const bestPracticesCode = `// ==================== 推荐组合 ====================

// 1. 全局样式 + CSS Modules（推荐）
// global.css - 基础样式
* { margin: 0; padding: 0; }

// App.jsx
import './global.css';  // 全局
import styles from './App.module.css';  // 局部

function App() {
  return <div className={styles.app}>...</div>;
}


// 2. 内联样式 + CSS Modules
function DynamicComponent({ theme, size }) {
  const dynamicStyle = {
    backgroundColor: theme === 'dark' ? '#333' : '#fff',
    width: size,
    height: size
  };
  
  return (
    <div 
      className={styles.container}  // 固定样式
      style={dynamicStyle}           // 动态样式
    >
      内容
    </div>
  );
}


// 3. Styled Components + CSS Modules
// 使用 Styled Components 处理需要动态的组件
const AnimatedButton = styled.button\`...\`;

// 使用 CSS Modules 处理静态样式
import styles from './Layout.module.css';

<div className={styles.layout}>
  <AnimatedButton>按钮</AnimatedButton>
</div>


// ==================== 性能优化技巧 ====================

// 1. 使用 useMemo 缓存内联样式
const style = useMemo(() => ({
  padding: '20px',
  backgroundColor: color
}), [color]);

// 2. 避免在渲染中创建新对象
// ❌ 不好
<div style={{ padding: 20 }}>  

// ✅ 好
const style = { padding: 20 };
<div style={style}>

// 3. CSS Modules 类名组合
import styles from './Component.module.css';
import classNames from 'classnames';

<div className={classNames(styles.container, {
  [styles.active]: isActive,
  [styles.disabled]: disabled
})}>

// 4. 使用 CSS 变量实现动态主题
// :root {
//   --primary-color: #2196f3;
// }
.button {
  background-color: var(--primary-color);
}`;

  return (
    <div className="css-intro-container">
      {/* 返回首页按钮 */}
      <button className="back-button" onClick={() => window.history.back()}>
        ← 返回首页
      </button>

      {/* 页面标题 */}
      <div className="page-header">
        <h1>React CSS 引入方式详解</h1>
        <p className="subtitle">全面对比六种样式引入方式，帮你选择最适合的方案</p>
      </div>

      {/* 核心概念 */}
      <section className="section">
        <h2>🎨 六种样式引入方式</h2>
        <div className="methods-grid">
          <div className={`method-card ${hoverIndex === 0 ? 'hovered' : ''}`}
               onMouseEnter={() => setHoverIndex(0)}
               onMouseLeave={() => setHoverIndex(null)}>
            <div className="method-badge inline">内联</div>
            <h3>1. 内联样式</h3>
            <p>使用 style 属性，样式写在 JSX 中</p>
            <div className="method-tags">
              <span className="tag pros">✅ 最简单</span>
              <span className="tag pros">✅ 动态样式</span>
              <span className="tag cons">❌ 无伪类支持</span>
            </div>
          </div>

          <div className={`method-card ${hoverIndex === 1 ? 'hovered' : ''}`}
               onMouseEnter={() => setHoverIndex(1)}
               onMouseLeave={() => setHoverIndex(null)}>
            <div className="method-badge modules">模块化</div>
            <h3>2. CSS Modules</h3>
            <p>文件名.module.css，局部作用域</p>
            <div className="method-tags">
              <span className="tag pros">✅ 作用域隔离</span>
              <span className="tag pros">✅ 零运行时</span>
              <span className="tag cons">❌ 需配置</span>
            </div>
          </div>

          <div className={`method-card ${hoverIndex === 2 ? 'hovered' : ''}`}
               onMouseEnter={() => setHoverIndex(2)}
               onMouseLeave={() => setHoverIndex(null)}>
            <div className="method-badge styled">组件化</div>
            <h3>3. Styled Components</h3>
            <p>CSS-in-JS 运行时方案</p>
            <div className="method-tags">
              <span className="tag pros">✅ 动态强大</span>
              <span className="tag pros">✅ 组件化</span>
              <span className="tag cons">❌ 性能开销</span>
            </div>
          </div>

          <div className={`method-card ${hoverIndex === 3 ? 'hovered' : ''}`}
               onMouseEnter={() => setHoverIndex(3)}
               onMouseLeave={() => setHoverIndex(null)}>
            <div className="method-badge import">导入</div>
            <h3>4. 直接导入</h3>
            <p>import './Component.css'</p>
            <div className="method-tags">
              <span className="tag pros">✅ 简单直接</span>
              <span className="tag pros">✅ 完整特性</span>
              <span className="tag cons">❌ 全局作用域</span>
            </div>
          </div>

          <div className={`method-card ${hoverIndex === 4 ? 'hovered' : ''}`}
               onMouseEnter={() => setHoverIndex(4)}
               onMouseLeave={() => setHoverIndex(null)}>
            <div className="method-badge sass">预处理器</div>
            <h3>5. Sass/SCSS</h3>
            <p>使用预处理器扩展 CSS</p>
            <div className="method-tags">
              <span className="tag pros">✅ 功能强大</span>
              <span className="tag pros">✅ 嵌套语法</span>
              <span className="tag cons">❌ 需编译</span>
            </div>
          </div>

          <div className={`method-card ${hoverIndex === 5 ? 'hovered' : ''}`}
               onMouseEnter={() => setHoverIndex(5)}
               onMouseLeave={() => setHoverIndex(null)}>
            <div className="method-badge js">CSS-in-JS</div>
            <h3>6. CSS-in-JS</h3>
            <p>Emotion, Typestyle 等库</p>
            <div className="method-tags">
              <span className="tag pros">✅ 完全集成</span>
              <span className="tag pros">✅ 可编程</span>
              <span className="tag cons">❌ 调试困难</span>
            </div>
          </div>
        </div>
      </section>

      {/* 演示区域 */}
      <section className="section">
        <h2>🎯 交互式演示</h2>

        {/* 场景选择 */}
        <div className="test-selector">
          {sections.map(section => (
            <button
              key={section.id}
              className={`test-btn ${activeSection === section.id ? 'active' : ''}`}
              onClick={() => setActiveSection(section.id)}
            >
              {section.name}
            </button>
          ))}
        </div>

        <div className="demo-container">
          {/* 场景1: 样式引入方式 */}
          {activeSection === 'methods' && (
            <div className="test-case">
              <h3>场景1: 不同方式的演示</h3>
              
              <div className="demos-grid">
                <InlineStyleDemo />
                <CSSModulesDemo />
                <StyledComponentDemo />
                <CSSInJSDemo />
              </div>

              <div className="code-section">
                <h4>1. 内联样式</h4>
                <div className="code-block">
                  <pre>{inlineStylesCode}</pre>
                </div>

                <h4>2. CSS Modules</h4>
                <div className="code-block">
                  <pre>{cssModulesCode}</pre>
                </div>

                <h4>3. Styled Components</h4>
                <div className="code-block">
                  <pre>{styledComponentsCode}</pre>
                </div>

                <h4>4. CSS-in-JS 其他库</h4>
                <div className="code-block">
                  <pre>{cssInJSCode}</pre>
                </div>

                <h4>5. 直接导入 CSS</h4>
                <div className="code-block">
                  <pre>{importStylesCode}</pre>
                </div>

                <h4>6. Sass/SCSS</h4>
                <div className="code-block">
                  <pre>{scssExampleCode}</pre>
                </div>
              </div>

              <div className="conclusion">
                <strong>总结:</strong> 每种方式都有其适用场景。内联样式适合快速原型和小组件；
                CSS Modules 适合大多数生产项目；Styled Components 适合需要高度动态样式的场景。
              </div>
            </div>
          )}

          {/* 场景2: 方式对比 */}
          {activeSection === 'comparison' && (
            <div className="test-case">
              <h3>场景2: 详细对比表</h3>
              
              <div className="comparison-table-wrapper">
                <table className="comparison-table">
                  <thead>
                    <tr>
                      <th>特性</th>
                      <th>内联样式</th>
                      <th>CSS Modules</th>
                      <th>Styled Components</th>
                      <th>直接导入</th>
                      <th>Sass</th>
                    </tr>
                  </thead>
                  <tbody>
                    {comparisonTableData.map((row, index) => (
                      <tr key={index}>
                        <td><strong>{row.aspect}</strong></td>
                        <td>{row.inline}</td>
                        <td>{row.modules}</td>
                        <td>{row.styled}</td>
                        <td>{row.import}</td>
                        <td>{row.sass}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="conclusion">
                <strong>结论:</strong> 没有绝对最好的方式，需要根据项目规模、团队偏好和性能要求选择。
                建议：中小型项目用 CSS Modules，大型项目可考虑 Styled Components + CSS Modules 组合。
              </div>
            </div>
          )}

          {/* 场景3: 全局 vs 局部 */}
          {activeSection === 'global' && (
            <div className="test-case">
              <h3>场景3: 全局样式 vs 局部样式</h3>
              
              <div className="code-block large">
                <pre>{globalVsLocalCode}</pre>
              </div>

              <div className="warning-box">
                <div className="warning-icon">💡</div>
                <div className="warning-content">
                  <strong>最佳实践：</strong>
                  <ul>
                    <li>使用全局样式处理基础重置、字体、主题变量</li>
                    <li>使用 CSS Modules 处理组件特定样式</li>
                    <li>避免在组件文件中直接导入全局 CSS</li>
                    <li>在 <code>index.js</code> 或根组件中统一导入全局样式</li>
                  </ul>
                </div>
              </div>

              <div className="scope-comparison">
                <div className="scope-card global">
                  <h4>🌐 全局样式</h4>
                  <div className="scope-list">
                    <div className="scope-item">基础重置（reset）</div>
                    <div className="scope-item">字体定义</div>
                    <div className="scope-item">主题变量</div>
                    <div className="scope-item">通用动画</div>
                    <div className="scope-item">工具类</div>
                  </div>
                </div>

                <div className="scope-card local">
                  <h4>📦 局部样式</h4>
                  <div className="scope-list">
                    <div className="scope-item">组件特定样式</div>
                    <div className="scope-item">组件布局</div>
                    <div className="scope-item">状态样式</div>
                    <div className="scope-item">组件内部元素</div>
                    <div className="scope-item">响应式断点</div>
                  </div>
                </div>
              </div>

              <div className="conclusion">
                <strong>结论:</strong> 全局和局部应该结合使用，各司其职。全局样式提供基础框架，局部样式保证组件独立性。
              </div>
            </div>
          )}

          {/* 场景4: 性能对比 */}
          {activeSection === 'performance' && (
            <div className="test-case">
              <h3>场景4: 性能考虑</h3>
              
              <div className="code-block large">
                <pre>{performanceComparisonCode}</pre>
              </div>

              <div className="performance-grid">
                <div className="perf-card">
                  <h4>打包大小</h4>
                  <div className="perf-bars">
                    <div className="perf-bar">
                      <div className="bar-label">直接导入</div>
                      <div className="bar-container">
                        <div className="bar" style={{ width: '70%' }}></div>
                        <span>中等</span>
                      </div>
                    </div>
                    <div className="perf-bar">
                      <div className="bar-label">CSS Modules</div>
                      <div className="bar-container">
                        <div className="bar good" style={{ width: '40%' }}></div>
                        <span>较小</span>
                      </div>
                    </div>
                    <div className="perf-bar">
                      <div className="bar-label">Styled Components</div>
                      <div className="bar-container">
                        <div className="bar bad" style={{ width: '85%' }}></div>
                        <span>较大</span>
                      </div>
                    </div>
                    <div className="perf-bar">
                      <div className="bar-label">内联样式</div>
                      <div className="bar-container">
                        <div className="bar" style={{ width: '50%' }}></div>
                        <span>较小</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="perf-card">
                  <h4>运行时性能</h4>
                  <div className="perf-list">
                    <div className="perf-item">
                      <span className="perf-name">CSS Modules</span>
                      <span className="perf-rating good">⭐⭐⭐⭐⭐ 最优</span>
                    </div>
                    <div className="perf-item">
                      <span className="perf-name">直接导入</span>
                      <span className="perf-rating good">⭐⭐⭐⭐ 优秀</span>
                    </div>
                    <div className="perf-item">
                      <span className="perf-name">内联样式（缓存）</span>
                      <span className="perf-rating">⭐⭐⭐ 良好</span>
                    </div>
                    <div className="perf-item">
                      <span className="perf-name">Styled Components</span>
                      <span className="perf-rating bad">⭐⭐ 中等</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="code-block large">
                <pre>{bestPracticesCode}</pre>
              </div>

              <div className="conclusion">
                <strong>结论:</strong> 对于大多数应用，CSS Modules 提供最好的性能平衡。
                如果需要动态样式，合理使用内联样式或 Styled Components 的编译时版本。
              </div>
            </div>
          )}

          {/* 场景5: CSS Modules + Sass */}
          {activeSection === 'modules-sass' && (
            <div className="test-case">
              <h3>场景5: CSS Modules + Sass 组合方案</h3>
              
              <div className="warning-box">
                <div className="warning-icon">💡</div>
                <div className="warning-content">
                  <strong>核心概念：</strong>
                  CSS Modules 提供作用域隔离，Sass 提供强大的编程能力。两者结合使用是最佳实践！
                  <ul>
                    <li>✅ 保留 CSS Modules 的所有优势（作用域隔离、零运行时）</li>
                    <li>✅ 增加 Sass 的编程能力（变量、嵌套、混入、函数）</li>
                    <li>✅ 在 JavaScript 中使用方式完全一致</li>
                    <li>✅ 编译后仍然是标准 CSS，性能无影响</li>
                  </ul>
                </div>
              </div>

              <div className="code-section">
                <h4>1. 基础示例</h4>
                <div className="code-block large">
                  <pre>{modulesSassBasicCode}</pre>
                </div>

                <h4>2. 进阶技巧</h4>
                <div className="code-block large">
                  <pre>{modulesSassAdvancedCode}</pre>
                </div>

                <h4>3. 项目结构</h4>
                <div className="code-block large">
                  <pre>{modulesSassStructureCode}</pre>
                </div>

                <h4>4. 对比分析</h4>
                <div className="code-block large">
                  <pre>{modulesSassComparisonCode}</pre>
                </div>
              </div>

              <div className="modules-sass-features">
                <h4>CSS Modules + Sass 的核心优势</h4>
                <div className="features-grid">
                  <div className="feature-card">
                    <div className="feature-icon">🎨</div>
                    <h5>主题系统</h5>
                    <p>使用 Sass Maps 管理颜色、间距、断点等</p>
                  </div>
                  <div className="feature-card">
                    <div className="feature-icon">🔧</div>
                    <h5>代码复用</h5>
                    <p>混入和占位符避免重复代码</p>
                  </div>
                  <div className="feature-card">
                    <div className="feature-icon">📐</div>
                    <h5>计算能力</h5>
                    <p>使用函数动态计算尺寸和颜色</p>
                  </div>
                  <div className="feature-card">
                    <div className="feature-icon">🎯</div>
                    <h5>BEM 友好</h5>
                    <p>嵌套语法完美支持 BEM 命名</p>
                  </div>
                  <div className="feature-card">
                    <div className="feature-icon">📱</div>
                    <h5>响应式</h5>
                    <p>嵌套媒体查询更加清晰</p>
                  </div>
                  <div className="feature-card">
                    <div className="feature-icon">🛡️</div>
                    <h5>作用域隔离</h5>
                    <p>保持 CSS Modules 的隔离优势</p>
                  </div>
                </div>
              </div>

              <div className="bem-example">
                <h4>BEM + CSS Modules + Sass 最佳实践</h4>
                <div className="code-block large">
                  <pre>{`// Card.module.scss - BEM 命名规范
.card {                    // Block
  padding: 20px;
  border-radius: 12px;
  
  &__header {              // Element
    display: flex;
    align-items: center;
    
    &--centered {          // Modifier of Element
      justify-content: center;
    }
  }
  
  &__title {
    font-size: 24px;
    
    &--large {             // Modifier
      font-size: 32px;
    }
  }
  
  &__content {
    margin-top: 16px;
  }
  
  &--highlighted {         // Modifier of Block
    background-color: #fff3cd;
    border: 2px solid #ffc107;
  }
}

// Card.jsx
import styles from './Card.module.scss';
import classNames from 'classnames';

function Card({ highlighted, titleLarge, centered }) {
  return (
    <div className={classNames(
      styles.card,
      { [styles['card--highlighted']]: highlighted }
    )}>
      <div className={classNames(
        styles['card__header'],
        { [styles['card__header--centered']]: centered }
      )}>
        <h2 className={classNames(
          styles['card__title'],
          { [styles['card__title--large']]: titleLarge }
        )}>
          标题
        </h2>
      </div>
      <div className={styles['card__content']}>
        内容
      </div>
    </div>
  );
}

// 优点：
// ✅ BEM 命名清晰
// ✅ Sass 嵌套语法简化代码
// ✅ CSS Modules 保证作用域隔离
// ✅ 类名仍然被哈希化`}</pre>
                </div>
              </div>

              <div className="installation-guide">
                <h4>安装和配置</h4>
                <div className="installation-steps">
                  <div className="installation-step">
                    <div className="step-number">1</div>
                    <div className="step-content">
                      <strong>安装 Sass</strong>
                      <div className="code-block small">
                        <pre>npm install sass</pre>
                      </div>
                    </div>
                  </div>

                  <div className="installation-step">
                    <div className="step-number">2</div>
                    <div className="step-content">
                      <strong>创建 .module.scss 文件</strong>
                      <div className="code-block small">
                        <pre>{`// Button.module.scss
$primary: #2196f3;

.button {
  background-color: $primary;
}`}</pre>
                      </div>
                    </div>
                  </div>

                  <div className="installation-step">
                    <div className="step-number">3</div>
                    <div className="step-content">
                      <strong>在组件中导入</strong>
                      <div className="code-block small">
                        <pre>{`// Button.jsx
import styles from './Button.module.scss';

<button className={styles.button}>按钮</button>`}</pre>
                      </div>
                    </div>
                  </div>

                  <div className="installation-step">
                    <div className="step-number">4</div>
                    <div className="step-content">
                      <strong>创建共享样式文件（可选）</strong>
                      <div className="code-block small">
                        <pre>{`// src/styles/variables.scss
$primary: #2196f3;
$secondary: #f44336;

// Button.module.scss
@import '../../styles/variables.scss';
.button {
  background: $primary;
}`}</pre>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="conclusion">
                <strong>总结:</strong> CSS Modules + Sass 是目前最推荐的组合方案。
                它完美结合了模块化的作用域隔离和 Sass 的编程能力，适用于大中型项目的生产环境。
                在保持零运行时开销的同时，大幅提升开发体验和代码质量。
              </div>
            </div>
          )}
        </div>
      </section>

      {/* 关键要点 */}
      <section className="section">
        <h2>🔑 关键要点</h2>
        <div className="key-points">
          <div className="point-card">
            <div className="point-number">1</div>
            <div className="point-content">
              <h4>选择合适的方案</h4>
              <p>没有唯一的最佳方案，需要根据项目规模、团队技能和性能要求选择</p>
            </div>
          </div>
          <div className="point-card">
            <div className="point-number">2</div>
            <div className="point-content">
              <h4>混合使用是常态</h4>
              <p>实际项目中经常混合使用多种方式，各取所长</p>
            </div>
          </div>
          <div className="point-card">
            <div className="point-number">3</div>
            <div className="point-content">
              <h4>关注性能开销</h4>
              <p>CSS-in-JS 运行时方案会带来性能成本，合理使用</p>
            </div>
          </div>
          <div className="point-card">
            <div className="point-number">4</div>
            <div className="point-content">
              <h4>保持一致性</h4>
              <p>在项目中选择一套主方案，避免过度混合增加维护成本</p>
            </div>
          </div>
        </div>
      </section>

      {/* 推荐配置 */}
      <section className="section">
        <h2>⚙️ 推荐配置</h2>
        <div className="recommendations">
          <div className="recommendation-card priority-1">
            <div className="priority-badge">推荐</div>
            <h3>中小型项目</h3>
            <div className="recommendation-content">
              <div className="when-use">
                <strong>配置：</strong>
                <ul>
                  <li>✅ 全局样式（index.css）</li>
                  <li>✅ CSS Modules（组件样式）</li>
                  <li>✅ 少量内联样式（动态）</li>
                </ul>
              </div>
              <div className="code-example-small">
                <code>最平衡的配置</code>
              </div>
            </div>
          </div>

          <div className="recommendation-card priority-2">
            <div className="priority-badge">高级</div>
            <h3>大型项目</h3>
            <div className="recommendation-content">
              <div className="when-use">
                <strong>配置：</strong>
                <ul>
                  <li>✅ Sass/SCSS（全局）</li>
                  <li>✅ CSS Modules（组件）</li>
                  <li>✅ Styled Components（动态组件）</li>
                  <li>✅ CSS Variables（主题）</li>
                </ul>
              </div>
              <div className="code-example-small">
                <code>适合复杂场景</code>
              </div>
            </div>
          </div>

          <div className="recommendation-card priority-3">
            <div className="priority-badge">简单</div>
            <h3>快速原型</h3>
            <div className="recommendation-content">
              <div className="when-use">
                <strong>配置：</strong>
                <ul>
                  <li>✅ 内联样式为主</li>
                  <li>✅ Tailwind CSS</li>
                  <li>✅ 少量全局样式</li>
                </ul>
              </div>
              <div className="code-example-small">
                <code>快速迭代</code>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default CSSIntroduction;

