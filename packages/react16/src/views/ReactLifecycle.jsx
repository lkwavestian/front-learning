import React from 'react';
import './ReactLifecycle.css';

// ============ 类组件生命周期演示 ============
class LifecycleDemo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
      message: '组件已挂载'
    };
    
    console.log('🔵 constructor - 构造函数');
    this.handleClick = this.handleClick.bind(this);
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    console.log('🟢 getDerivedStateFromProps - 从 props 派生状态');
    // 这是静态方法，不能访问 this
    return null; // 返回 null 表示不更新状态
  }

  componentDidMount() {
    console.log('🟢 componentDidMount - 组件挂载完成');
    this.intervalId = setInterval(() => {
      console.log('⏰ 定时器运行中...');
    }, 2000);
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log('🟡 shouldComponentUpdate - 是否应该更新');
    // 可以在这里进行性能优化
    return true; // 返回 false 可以阻止组件重新渲染
  }

  getSnapshotBeforeUpdate(prevProps, prevState) {
    console.log('🟡 getSnapshotBeforeUpdate - 更新前获取快照');
    return null; // 返回值会传递给 componentDidUpdate
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log('🟢 componentDidUpdate - 组件更新完成');
    if (prevState.count !== this.state.count) {
      console.log('  → count 从', prevState.count, '变为', this.state.count);
    }
  }

  componentWillUnmount() {
    console.log('🔴 componentWillUnmount - 组件即将卸载');
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  handleClick = () => {
    this.setState({ count: this.state.count + 1 });
  }

  render() {
    console.log('⚪ render - 渲染组件');
    return (
      <div className="lifecycle-demo">
        <h4>生命周期演示组件</h4>
        <div className="count-display">
          <span className="count-number">{this.state.count}</span>
        </div>
        <button onClick={this.handleClick} className="demo-button">
          点击 +1
        </button>
        <p className="demo-message">{this.state.message}</p>
        <div className="log-note">
          打开浏览器控制台查看完整生命周期日志
        </div>
      </div>
    );
  }
}

// ============ 函数组件 Hooks 对比演示 ============
function FunctionalComponentDemo() {
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    console.log('🟢 useEffect(挂载) - 相当于 componentDidMount');
    
    return () => {
      console.log('🔴 useEffect(卸载) - 相当于 componentWillUnmount');
    };
  }, []); // 空依赖数组，只在挂载/卸载时执行

  React.useEffect(() => {
    console.log('🟢 useEffect(更新) - 相当于 componentDidUpdate');
  }, [count]); // 依赖 count，count 变化时执行

  React.useLayoutEffect(() => {
    console.log('🟡 useLayoutEffect - 同步执行，在 DOM 更新后、浏览器绘制前');
  }, [count]);

  return (
    <div className="lifecycle-demo">
      <h4>函数组件 Hooks 演示</h4>
      <div className="count-display">
        <span className="count-number">{count}</span>
      </div>
      <button onClick={() => setCount(count + 1)} className="demo-button">
        点击 +1
      </button>
      <div className="log-note">
        打开浏览器控制台查看完整日志
      </div>
    </div>
  );
}

// 主组件
function ReactLifecycle() {
  const [showClassComponent, setShowClassComponent] = React.useState(true);
  const [showFunctionalComponent, setShowFunctionalComponent] = React.useState(false);
  const [activeSection, setActiveSection] = React.useState('overview');

  const sections = [
    { id: 'overview', name: '生命周期概览' },
    { id: 'mount', name: '挂载阶段' },
    { id: 'update', name: '更新阶段' },
    { id: 'unmount', name: '卸载阶段' },
    { id: 'error', name: '错误处理' },
    { id: 'comparison', name: '对比 Hooks' },
  ];

  // 代码示例
  const lifecycleOverviewCode = `// React 16.4+ 类组件完整生命周期
class MyComponent extends React.Component {
  // ========== 挂载阶段 ==========
  constructor(props) {
    super(props);
    // 1. 初始化 state
    // 2. 绑定事件处理函数
    this.state = { count: 0 };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    // 2. 从 props 派生 state（不常用）
    return null; // 返回 null 不更新，返回对象则合并到 state
  }

  render() {
    // 3. 返回 JSX，准备渲染
    return <div>{this.state.count}</div>;
  }

  componentDidMount() {
    // 4. 组件挂载完成
    // - 发起 AJAX 请求
    // - 设置订阅
    // - 操作 DOM
  }

  // ========== 更新阶段 ==========
  static getDerivedStateFromProps(nextProps, prevState) {
    // 每次 props/state 变化时都执行（挂载后）
  }

  shouldComponentUpdate(nextProps, nextState) {
    // 决定是否重新渲染（性能优化关键）
    return true; // false 阻止渲染
  }

  render() {
    // 重新渲染
  }

  getSnapshotBeforeUpdate(prevProps, prevState) {
    // DOM 更新前获取快照
    return null; // 返回值传给 componentDidUpdate
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    // 组件更新完成
    // - 比较 prevProps 和 nextProps
    // - 执行 DOM 操作
  }

  // ========== 卸载阶段 ==========
  componentWillUnmount() {
    // 组件即将卸载
    // - 清理定时器
    // - 取消订阅
    // - 清理资源
  }
}`;

  const functionalComponentCode = `// React 函数组件完整生命周期（使用 Hooks）
import { useState, useEffect, useLayoutEffect, useMemo, memo } from 'react';

function MyComponent({ userId }) {
  // ========== 挂载阶段 ==========
  
  // 1. useState - 初始化状态（相当于 constructor）
  const [count, setCount] = useState(0);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  // 2. useEffect 挂载 - 相当于 componentDidMount
  useEffect(() => {
    console.log('组件挂载完成');
    // - 发起 AJAX 请求
    // - 设置订阅
    // - 操作 DOM
    fetchUserData(userId);
    
    // 返回清理函数 - 相当于 componentWillUnmount
    return () => {
      console.log('组件卸载');
      // - 清理定时器
      // - 取消订阅
      // - 清理资源
      clearInterval(intervalId);
    };
  }, []); // 空依赖数组，只执行一次

  // 3. useEffect 更新 - 相当于 componentDidUpdate
  useEffect(() => {
    console.log('count 更新为:', count);
    // 当 count 变化时执行
  }, [count]); // 依赖 count

  // 4. useEffect 每次渲染都执行
  useEffect(() => {
    console.log('每次渲染都执行');
  }); // 无依赖数组，每次渲染都执行

  // ========== 性能优化 ==========
  
  // useMemo - 相当于 shouldComponentUpdate 的内存优化
  const expensiveValue = useMemo(() => {
    console.log('计算昂贵值');
    return computeExpensiveValue(count);
  }, [count]); // 只有当 count 变化时才重新计算

  // React.memo - 阻止不必要的重新渲染
  const MemoizedChild = memo(ChildComponent);

  // ========== 同步副作用 ==========
  
  // useLayoutEffect - 相当于 getSnapshotBeforeUpdate
  useLayoutEffect(() => {
    console.log('同步执行，在浏览器绘制前');
    // - 读取 DOM 布局并同步触发重渲染
    // - 在浏览器绘制之前执行
    const width = elementRef.current.offsetWidth;
    setWidth(width);
  }, [count]);

  // ========== 辅助函数 ==========
  const fetchUserData = async (id) => {
    setLoading(true);
    try {
      const response = await fetch(\`/api/users/\${id}\`);
      const data = await response.json();
      setUser(data);
    } catch (error) {
      console.error('获取用户数据失败:', error);
    } finally {
      setLoading(false);
    }
  };

  // ========== 渲染 ==========
  if (loading) {
    return <div>加载中...</div>;
  }

  return (
    <div>
      <h2>{user?.name || '用户'}</h2>
      <p>计数: {count}</p>
      <p>昂贵值: {expensiveValue}</p>
      <button onClick={() => setCount(count + 1)}>+1</button>
      <MemoizedChild data={data} />
    </div>
  );
}

// 注意：
// - 没有对应的 componentDidCatch，需要使用 Error Boundary 类组件
// - 所有副作用都在 useEffect 中处理
// - 使用依赖数组控制执行时机
// - 清理函数在组件卸载时自动执行`;

  const mountingPhaseCode = `// ========== 挂载阶段执行顺序 ==========

// 1️⃣ constructor(props)
constructor(props) {
  super(props);
  console.log('constructor');
  this.state = { count: 0 };
  this.handleClick = this.handleClick.bind(this);
}

// ⚠️ 注意：
// - 必须调用 super(props)
// - 不要在这里调用 setState
// - 不要在这里使用 async/await

// 2️⃣ static getDerivedStateFromProps(nextProps, prevState)
static getDerivedStateFromProps(nextProps, prevState) {
  console.log('getDerivedStateFromProps');
  // 静态方法，不能访问 this
  // 根据 props 和 state 返回新的 state，或返回 null
  if (nextProps.id !== prevState.id) {
    return { id: nextProps.id };
  }
  return null;
}

// ⚠️ 注意：
// - 很少使用，可能导致 bug
// - 尽量用其他方式实现派生状态

// 3️⃣ render()
render() {
  console.log('render');
  return <div>{this.state.count}</div>;
}

// ⚠️ 注意：
// - 必须是纯函数
// - 不要在这里调用 setState
// - 不要进行副作用操作

// 4️⃣ componentDidMount()
componentDidMount() {
  console.log('componentDidMount');
  
  // ✅ 在这里可以做：
  // - 发起网络请求
  // - 设置订阅
  // - 操作 DOM
  // - 设置定时器
  
  // 🔴 不要在这里：
  // - 频繁调用 setState（会触发重新渲染）
}

// ========== 完整的挂载流程 ==========
// constructor
//   ↓
// getDerivedStateFromProps
//   ↓
// render
//   ↓
// React 更新 DOM 和 refs
//   ↓
// componentDidMount`;

  const updatePhaseCode = `// ========== 更新阶段执行顺序 ==========

// 触发更新的三种情况：
// 1. props 变化
// 2. this.setState()
// 3. this.forceUpdate()

// 1️⃣ static getDerivedStateFromProps(nextProps, prevState)
static getDerivedStateFromProps(nextProps, prevState) {
  console.log('getDerivedStateFromProps');
  // 每次 props/state 变化时都执行
  return null;
}

// 2️⃣ shouldComponentUpdate(nextProps, nextState)
shouldComponentUpdate(nextProps, nextState) {
  console.log('shouldComponentUpdate');
  
  // ⚠️ 性能优化的关键方法
  // 返回 false 可以阻止组件重新渲染
  if (this.props.color === nextProps.color) {
    return false; // 颜色没变，不重新渲染
  }
  return true;
}

// ⚠️ 注意：
// - 不要在这里调用 setState（会死循环）
// - 推荐使用 PureComponent 自动浅比较
// - 如果返回 false，后续生命周期都不会执行

// 3️⃣ render()
render() {
  console.log('render');
  return <div>{this.state.count}</div>;
}

// 4️⃣ getSnapshotBeforeUpdate(prevProps, prevState)
getSnapshotBeforeUpdate(prevProps, prevState) {
  console.log('getSnapshotBeforeUpdate');
  
  // 在 DOM 更新前调用，可以捕获一些信息
  // 返回值会传给 componentDidUpdate
  if (prevProps.list.length < this.props.list.length) {
    const list = this.listRef.current;
    return list.scrollHeight - list.scrollTop;
  }
  return null;
}

// ⚠️ 注意：
// - 必须返回值或 null
// - 可以配合 componentDidUpdate 实现"滚动位置保持"

// 5️⃣ componentDidUpdate(prevProps, prevState, snapshot)
componentDidUpdate(prevProps, prevState, snapshot) {
  console.log('componentDidUpdate', snapshot);
  
  // ✅ 在这里可以做：
  // - 比较 prevProps 和 nextProps
  // - 根据 props 发起网络请求
  // - 操作 DOM
  
  if (this.props.userID !== prevProps.userID) {
    this.fetchData(this.props.userID);
  }
}

// ⚠️ 注意：
// - 不要在这里频繁调用 setState
// - 必须先判断条件再 setState，否则会死循环

// ========== 完整的更新流程 ==========
// getDerivedStateFromProps
//   ↓
// shouldComponentUpdate
//   ↓ (返回 true)
// render
//   ↓
// getSnapshotBeforeUpdate
//   ↓
// React 更新 DOM 和 refs
//   ↓
// componentDidUpdate`;

  const unmountPhaseCode = `// ========== 卸载阶段 ==========

componentWillUnmount() {
  console.log('componentWillUnmount');
  
  // ✅ 必须做的事情：
  // 1. 清理定时器
  clearInterval(this.intervalId);
  clearTimeout(this.timeoutId);
  
  // 2. 取消网络请求
  if (this.request) {
    this.request.abort();
  }
  
  // 3. 取消订阅
  this.subscription.unsubscribe();
  
  // 4. 清理 DOM 事件监听器
  document.removeEventListener('click', this.handleClick);
  
  // 5. 清理其他资源
  this.webSocket.close();
}

// ⚠️ 注意：
// - 这是清理资源的最后机会
// - 不要在这里调用 setState
// - 组件已从 DOM 中移除

// ========== 完整示例 ==========
class TimerComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = { seconds: 0 };
    this.intervalId = null;
  }

  componentDidMount() {
    console.log('组件挂载，开始计时');
    this.intervalId = setInterval(() => {
      this.setState({ seconds: this.state.seconds + 1 });
    }, 1000);
  }

  componentWillUnmount() {
    console.log('组件卸载，清理定时器');
    clearInterval(this.intervalId);  // ⚠️ 必须清理！
  }

  render() {
    return <div>计时: {this.state.seconds} 秒</div>;
  }
}

// 如果不清理定时器会发生什么？
// 1. 组件卸载后，定时器仍然在运行
// 2. setState 会报错："Can't perform a React state update on an unmounted component"
// 3. 内存泄漏`;

  const errorHandlingCode = `// ========== 错误处理生命周期 ==========

// React 16+ 新增错误边界（Error Boundary）
// 注意：错误边界必须是类组件！

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  // 1️⃣ static getDerivedStateFromError(error)
  // 在错误抛出后调用，用于渲染降级 UI
  static getDerivedStateFromError(error) {
    console.log('getDerivedStateFromError', error);
    return { hasError: true, error };
  }

  // 2️⃣ componentDidCatch(error, errorInfo)
  // 用于记录错误信息（比如发送到日志服务）
  componentDidCatch(error, errorInfo) {
    console.log('componentDidCatch', error, errorInfo);
    
    // 记录错误到日志服务
    logErrorToService(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // 降级 UI
      return <h1>出错了: {this.state.error.message}</h1>;
    }

    return this.props.children;
  }
}

// 使用方式
function App() {
  return (
    <ErrorBoundary>
      <MyComponent />
    </ErrorBoundary>
  );
}

// ⚠️ 注意：
// - 错误边界只能捕获子组件树中的错误
// - 不能捕获自身、事件处理器、异步代码的错误
// - 生产环境会自动移除 console.error

// ========== 错误边界的使用场景 ==========
// 1. 捕获渲染错误
// 2. 提供降级 UI
// 3. 记录错误日志
// 4. 恢复应用状态`;

  const hooksComparisonCode = `// ========== 函数组件 Hooks 对比 ==========

// 类组件生命周期
class ClassComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = { count: 0 };
  }

  componentDidMount() {
    console.log('挂载');
  }

  componentDidUpdate(prevProps, prevState) {
    console.log('更新');
  }

  componentWillUnmount() {
    console.log('卸载');
  }

  render() {
    return <div>{this.state.count}</div>;
  }
}

// ═══════════════════════════════════════

// 函数组件 Hooks 等效实现
function FunctionalComponent() {
  const [count, setCount] = useState(0);

  // 挂载 + 卸载
  useEffect(() => {
    console.log('挂载');
    return () => console.log('卸载');
  }, []); // 空依赖数组

  // 更新
  useEffect(() => {
    console.log('更新');
  }, [count]); // 依赖 count

  // 每次渲染都执行
  useEffect(() => {
    console.log('每次渲染');
  }); // 无依赖数组

  return <div>{count}</div>;
}

// ═══════════════════════════════════════

// Hooks 完整生命周期映射

// constructor → useState 初始化
const [state, setState] = useState(initialState);

// componentDidMount → useEffect(挂载)
useEffect(() => {
  // 只在挂载时执行一次
}, []); // 空依赖数组

// componentDidUpdate → useEffect(更新)
useEffect(() => {
  // 依赖项变化时执行
}, [dependencies]);

// componentWillUnmount → useEffect(清理)
useEffect(() => {
  return () => {
    // 清理函数
  };
}, []);

// shouldComponentUpdate → React.memo, useMemo
const MemoComponent = React.memo(Component);
const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);

// getSnapshotBeforeUpdate → useLayoutEffect
useLayoutEffect(() => {
  // 同步执行，在浏览器绘制前
}, []);

// getDerivedStateFromProps → 不需要特殊 Hook
// - 在渲染时直接从 props 计算即可

// componentDidCatch → 暂无对应 Hook
// - 仍需使用 Error Boundary 类组件

// ═══════════════════════════════════════

// 推荐：混合使用
class App extends React.Component {
  render() {
    return (
      <ErrorBoundary>  {/* 类组件：错误边界 */}
        <FunctionalChild />  {/* 函数组件：普通组件 */}
      </ErrorBoundary>
    );
  }
}`;

  return (
    <div className="lifecycle-container">
      {/* 返回首页按钮 */}
      <button className="back-button" onClick={() => window.history.back()}>
        ← 返回首页
      </button>

      {/* 页面标题 */}
      <div className="page-header">
        <h1>React 16.4+ 生命周期详解</h1>
        <p className="subtitle">深入理解类组件生命周期三个阶段与 Hooks 对比</p>
      </div>

      {/* 核心概念 */}
      <section className="section">
        <h2>📚 生命周期三个阶段</h2>
        <div className="phase-cards">
          <div className="phase-card mounting">
            <div className="phase-icon">🟢</div>
            <h3>挂载阶段 (Mounting)</h3>
            <p>组件被创建并插入到 DOM 中的过程</p>
            <div className="phase-methods">
              <span>constructor</span>
              <span>getDerivedStateFromProps</span>
              <span>render</span>
              <span>componentDidMount</span>
            </div>
          </div>

          <div className="phase-card updating">
            <div className="phase-icon">🟡</div>
            <h3>更新阶段 (Updating)</h3>
            <p>组件的 props 或 state 发生变化时的过程</p>
            <div className="phase-methods">
              <span>getDerivedStateFromProps</span>
              <span>shouldComponentUpdate</span>
              <span>render</span>
              <span>getSnapshotBeforeUpdate</span>
              <span>componentDidUpdate</span>
            </div>
          </div>

          <div className="phase-card unmounting">
            <div className="phase-icon">🔴</div>
            <h3>卸载阶段 (Unmounting)</h3>
            <p>组件从 DOM 中移除的过程</p>
            <div className="phase-methods">
              <span>componentWillUnmount</span>
            </div>
          </div>

          <div className="phase-card error">
            <div className="phase-icon">⚠️</div>
            <h3>错误处理</h3>
            <p>错误发生时的特殊生命周期</p>
            <div className="phase-methods">
              <span>getDerivedStateFromError</span>
              <span>componentDidCatch</span>
            </div>
          </div>
        </div>
      </section>

      {/* 交互式演示 */}
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
          {/* 场景0: 生命周期概览 */}
          {activeSection === 'overview' && (
            <div className="test-case">
              <h3>生命周期完整流程</h3>
              
              <div className="demo-switch">
                <button
                  className={`switch-btn ${showClassComponent ? 'active' : ''}`}
                  onClick={() => {
                    setShowClassComponent(true);
                    setShowFunctionalComponent(false);
                  }}
                >
                  类组件演示
                </button>
                <button
                  className={`switch-btn ${showFunctionalComponent ? 'active' : ''}`}
                  onClick={() => {
                    setShowClassComponent(false);
                    setShowFunctionalComponent(true);
                  }}
                >
                  函数组件演示
                </button>
              </div>

              <div className="demo-area">
                {showClassComponent && <LifecycleDemo />}
                {showFunctionalComponent && <FunctionalComponentDemo />}
              </div>

              <div className="code-block large">
                <pre>{showClassComponent ? lifecycleOverviewCode : functionalComponentCode}</pre>
              </div>

              <div className="flow-diagram">
                <h4>完整生命周期流程图</h4>
                <div className="flow-container">
                  <div className="flow-box mounting">
                    <div className="flow-title">🟢 挂载阶段</div>
                    <div className="flow-steps">
                      <div className="flow-step">1. constructor</div>
                      <div className="flow-arrow">↓</div>
                      <div className="flow-step">2. getDerivedStateFromProps</div>
                      <div className="flow-arrow">↓</div>
                      <div className="flow-step">3. render</div>
                      <div className="flow-arrow">↓</div>
                      <div className="flow-step">4. componentDidMount</div>
                    </div>
                  </div>

                  <div className="flow-box updating">
                    <div className="flow-title">🟡 更新阶段</div>
                    <div className="flow-steps">
                      <div className="flow-step">1. getDerivedStateFromProps</div>
                      <div className="flow-arrow">↓</div>
                      <div className="flow-step">2. shouldComponentUpdate</div>
                      <div className="flow-arrow">↓</div>
                      <div className="flow-step">3. render</div>
                      <div className="flow-arrow">↓</div>
                      <div className="flow-step">4. getSnapshotBeforeUpdate</div>
                      <div className="flow-arrow">↓</div>
                      <div className="flow-step">5. componentDidUpdate</div>
                    </div>
                  </div>

                  <div className="flow-box unmounting">
                    <div className="flow-title">🔴 卸载阶段</div>
                    <div className="flow-steps">
                      <div className="flow-step">1. componentWillUnmount</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="conclusion">
                <strong>提示:</strong> 打开浏览器控制台可以查看完整的生命周期方法调用日志。
                点击演示组件中的按钮可以观察更新阶段的生命周期。
              </div>
            </div>
          )}

          {/* 场景1: 挂载阶段 */}
          {activeSection === 'mount' && (
            <div className="test-case">
              <h3>场景1: 挂载阶段详解</h3>
              
              <div className="code-block large">
                <pre>{mountingPhaseCode}</pre>
              </div>

              <div className="method-details">
                <div className="method-card">
                  <h4>constructor(props)</h4>
                  <p><strong>执行时机：</strong>组件创建时，最先执行</p>
                  <div className="method-usage">
                    <strong>主要用途：</strong>
                    <ul>
                      <li>初始化 state</li>
                      <li>绑定事件处理函数</li>
                      <li>创建 ref</li>
                    </ul>
                  </div>
                  <div className="method-warning">
                    <strong>注意事项：</strong>
                    <ul>
                      <li>必须调用 super(props)</li>
                      <li>不要在这里调用  setState</li>
                      <li>不要使用 async/await</li>
                    </ul>
                  </div>
                </div>

                <div className="method-card">
                  <h4>getDerivedStateFromProps</h4>
                  <p><strong>执行时机：</strong>挂载时和每次更新时</p>
                  <div className="method-usage">
                    <strong>主要用途：</strong>
                    <ul>
                      <li>从 props 派生 state（很少使用）</li>
                    </ul>
                  </div>
                  <div className="method-warning">
                    <strong>注意事项：</strong>
                    <ul>
                      <li>静态方法，不能访问 this</li>
                      <li>返回 null 不更新，返回对象合并到 state</li>
                      <li>可能导致 bug，尽量少用</li>
                    </ul>
                  </div>
                </div>

                <div className="method-card">
                  <h4>render()</h4>
                  <p><strong>执行时机：</strong>挂载时和每次更新时</p>
                  <div className="method-usage">
                    <strong>主要用途：</strong>
                    <ul>
                      <li>返回 JSX</li>
                      <li>准备渲染内容</li>
                    </ul>
                  </div>
                  <div className="method-warning">
                    <strong>注意事项：</strong>
                    <ul>
                      <li>必须是纯函数</li>
                      <li>不要调用 setState</li>
                      <li>不要进行副作用操作</li>
                    </ul>
                  </div>
                </div>

                <div className="method-card">
                  <h4>componentDidMount()</h4>
                  <p><strong>执行时机：</strong>挂载完成后，DOM 已更新</p>
                  <div className="method-usage">
                    <strong>主要用途：</strong>
                    <ul>
                      <li>发起 AJAX 请求</li>
                      <li>设置订阅</li>
                      <li>操作 DOM</li>
                      <li>设置定时器</li>
                    </ul>
                  </div>
                  <div className="method-warning">
                    <strong>注意事项：</strong>
                    <ul>
                      <li>可以调用 setState（会触发一次重新渲染）</li>
                      <li>但不要频繁调用，避免性能问题</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="conclusion">
                <strong>总结:</strong> 挂载阶段是组件生命周期的开始，按照顺序执行四个方法。
                通常在最开始的 constructor 中初始化状态，在最后的 componentDidMount 中执行副作用操作。
              </div>
            </div>
          )}

          {/* 场景2: 更新阶段 */}
          {activeSection === 'update' && (
            <div className="test-case">
              <h3>场景2: 更新阶段详解</h3>
              
              <div className="code-block large">
                <pre>{updatePhaseCode}</pre>
              </div>

              <div className="trigger-cards">
                <div className="trigger-card">
                  <h4>触发更新的三种方式</h4>
                  <div className="trigger-list">
                    <div className="trigger-item">
                      <span className="trigger-number">1</span>
                      <div className="trigger-content">
                        <strong>props 变化</strong>
                        <p>父组件传入的 props 发生变化</p>
                      </div>
                    </div>
                    <div className="trigger-item">
                      <span className="trigger-number">2</span>
                      <div className="trigger-content">
                        <strong>this.setState()</strong>
                        <p>组件内部调用 setState 更新状态</p>
                      </div>
                    </div>
                    <div className="trigger-item">
                      <span className="trigger-number">3</span>
                      <div className="trigger-content">
                        <strong>this.forceUpdate()</strong>
                        <p>强制组件重新渲染（不推荐）</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="method-details">
                <div className="method-card">
                  <h4>shouldComponentUpdate</h4>
                  <p><strong>执行时机：</strong>更新前，render 之前</p>
                  <div className="method-usage">
                    <strong>主要用途：</strong>
                    <ul>
                      <li>性能优化（决定是否渲染）</li>
                      <li>可以跳过不必要的渲染</li>
                    </ul>
                  </div>
                  <div className="method-warning">
                    <strong>注意事项：</strong>
                    <ul>
                      <li>返回 false 可以阻止渲染和后续生命周期</li>
                      <li>不要调用 setState（会死循环）</li>
                      <li>推荐使用 PureComponent 代替手动判断</li>
                    </ul>
                  </div>
                </div>

                <div className="method-card">
                  <h4>getSnapshotBeforeUpdate</h4>
                  <p><strong>执行时机：</strong>DOM 更新前，浏览器绘制前</p>
                  <div className="method-usage">
                    <strong>主要用途：</strong>
                    <ul>
                      <li>捕获 DOM 信息（如滚动位置）</li>
                      <li>返回值传给 componentDidUpdate</li>
                    </ul>
                  </div>
                  <div className="method-warning">
                    <strong>注意事项：</strong>
                    <ul>
                      <li>必须返回值或 null</li>
                      <li>不常用，特定场景使用</li>
                    </ul>
                  </div>
                </div>

                <div className="method-card">
                  <h4>componentDidUpdate</h4>
                  <p><strong>执行时机：</strong>更新完成后，DOM 已更新</p>
                  <div className="method-usage">
                    <strong>主要用途：</strong>
                    <ul>
                      <li>比较 prevProps 和 props</li>
                      <li>根据 props 发起请求</li>
                      <li>操作 DOM</li>
                    </ul>
                  </div>
                  <div className="method-warning">
                    <strong>注意事项：</strong>
                    <ul>
                      <li>可以调用 setState，但必须有条件判断</li>
                      <li>否则会死循环</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="conclusion">
                <strong>总结:</strong> 更新阶段是最复杂的生命周期，包含五个方法。
                shouldComponentUpdate 是性能优化的关键，可以有效减少不必要的渲染。
              </div>
            </div>
          )}

          {/* 场景3: 卸载阶段 */}
          {activeSection === 'unmount' && (
            <div className="test-case">
              <h3>场景3: 卸载阶段详解</h3>
              
              <div className="code-block large">
                <pre>{unmountPhaseCode}</pre>
              </div>

              <div className="cleanup-grid">
                <div className="cleanup-card">
                  <h4>🕐 必须清理的资源</h4>
                  <ul>
                    <li>✅ 定时器 (setInterval, setTimeout)</li>
                    <li>✅ 网络请求 (abort)</li>
                    <li>✅ 订阅 (unsubscribe)</li>
                    <li>✅ DOM 事件监听器</li>
                    <li>✅ WebSocket 连接</li>
                    <li>✅ 其他可能泄漏的资源</li>
                  </ul>
                </div>

                <div className="cleanup-card">
                  <h4>⚠️ 不清理的后果</h4>
                  <ul>
                    <li>❌ 内存泄漏</li>
                    <li>❌ setState 在卸载组件上调用报错</li>
                    <li>❌ 网络请求浪费</li>
                    <li>❌ 状态污染</li>
                  </ul>
                </div>
              </div>

              <div className="conclusion">
                <strong>总结:</strong> componentWillUnmount 是清理资源的最后机会，
                必须在这里清理所有可能产生泄漏的资源，否则会导致严重的性能问题和 bug。
              </div>
            </div>
          )}

          {/* 场景4: 错误处理 */}
          {activeSection === 'error' && (
            <div className="test-case">
              <h3>场景4: 错误处理（Error Boundary）</h3>
              
              <div className="code-block large">
                <pre>{errorHandlingCode}</pre>
              </div>

              <div className="error-boundary-info">
                <div className="error-card">
                  <h4>错误边界的特点</h4>
                  <ul>
                    <li>✅ 捕获子组件树中的渲染错误</li>
                    <li>✅ 渲染降级 UI</li>
                    <li>✅ 记录错误信息</li>
                    <li>❌ 不能捕获自身错误</li>
                    <li>❌ 不能捕获事件处理器错误</li>
                    <li>❌ 不能捕获异步代码错误</li>
                  </ul>
                </div>

                <div className="error-card">
                  <h4>适用场景</h4>
                  <ul>
                    <li>✅ 捕获第三方组件错误</li>
                    <li>✅ 防止白屏</li>
                    <li>✅ 优雅的错误提示</li>
                    <li>✅ 错误日志上报</li>
                  </ul>
                </div>
              </div>

              <div className="conclusion">
                <strong>总结:</strong> 错误边界是 React 16+ 新增的功能，
                只能使用类组件实现。它提供了优雅的错误处理机制，提升用户体验。
              </div>
            </div>
          )}

          {/* 场景5: Hooks 对比 */}
          {activeSection === 'comparison' && (
            <div className="test-case">
              <h3>场景5: 函数组件 Hooks 对比</h3>
              
              <div className="code-block large">
                <pre>{hooksComparisonCode}</pre>
              </div>

              <div className="hooks-mapping">
                <h4>生命周期方法映射表</h4>
                <table className="hooks-table">
                  <thead>
                    <tr>
                      <th>类组件生命周期</th>
                      <th>函数组件 Hooks</th>
                      <th>说明</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td><code>constructor</code></td>
                      <td><code>useState</code></td>
                      <td>初始化状态</td>
                    </tr>
                    <tr>
                      <td><code>componentDidMount</code></td>
                      <td><code>useEffect(, [])</code></td>
                      <td>空依赖数组</td>
                    </tr>
                    <tr>
                      <td><code>componentDidUpdate</code></td>
                      <td><code>useEffect(, [deps])</code></td>
                      <td>指定依赖项</td>
                    </tr>
                    <tr>
                      <td><code>componentWillUnmount</code></td>
                      <td><code>useEffect(() =&gt; () =&gt; {}, [])</code></td>
                      <td>清理函数</td>
                    </tr>
                    <tr>
                      <td><code>shouldComponentUpdate</code></td>
                      <td><code>React.memo</code> / <code>useMemo</code></td>
                      <td>性能优化</td>
                    </tr>
                    <tr>
                      <td><code>getSnapshotBeforeUpdate</code></td>
                      <td><code>useLayoutEffect</code></td>
                      <td>同步执行</td>
                    </tr>
                    <tr>
                      <td><code>getDerivedStateFromProps</code></td>
                      <td>无需特殊 Hook</td>
                      <td>渲染时计算即可</td>
                    </tr>
                    <tr>
                      <td><code>componentDidCatch</code></td>
                      <td>暂无对应</td>
                      <td>仍需类组件</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="conclusion">
                <strong>总结:</strong> Hooks 提供了更简洁的方式来实现类似的功能。
                推荐使用函数组件 + Hooks，对于错误边界仍需要使用类组件。
              </div>
            </div>
          )}
        </div>
      </section>

      {/* 版本变化 */}
      <section className="section">
        <h2>🔄 React 16 生命周期变化</h2>
        <div className="version-changes">
          <div className="version-card deprecated">
            <h4>❌ 已废弃的生命周期（React 16.3）</h4>
            <ul>
              <li><code>componentWillMount</code></li>
              <li><code>componentWillReceiveProps</code></li>
              <li><code>componentWillUpdate</code></li>
            </ul>
            <p>这些方法在 React 17 中已被移除</p>
          </div>

          <div className="version-card new">
            <h4>✅ 新增的生命周期（React 16.3+）</h4>
            <ul>
              <li><code>getDerivedStateFromProps</code> - 替代 componentWillReceiveProps</li>
              <li><code>getSnapshotBeforeUpdate</code> - 替代 componentWillUpdate</li>
              <li><code>getDerivedStateFromError</code> - 错误边界</li>
              <li><code>componentDidCatch</code> - 错误边界</li>
            </ul>
          </div>

          <div className="version-card unchanged">
            <h4>✅ 保留的生命周期</h4>
            <ul>
              <li><code>constructor</code></li>
              <li><code>render</code></li>
              <li><code>componentDidMount</code></li>
              <li><code>shouldComponentUpdate</code></li>
              <li><code>componentDidUpdate</code></li>
              <li><code>componentWillUnmount</code></li>
            </ul>
          </div>
        </div>
      </section>

      {/* 关键要点 */}
      <section className="section">
        <h2>🔑 关键要点</h2>
        <div className="key-points">
          <div className="point-card">
            <div className="point-number">1</div>
            <div className="point-content">
              <h4>理解三个阶段</h4>
              <p>挂载、更新、卸载是生命周期的核心，掌握每个阶段的作用很关键</p>
            </div>
          </div>
          <div className="point-card">
            <div className="point-number">2</div>
            <div className="point-content">
              <h4>性能优化</h4>
              <p>shouldComponentUpdate 和 PureComponent 是性能优化的关键</p>
            </div>
          </div>
          <div className="point-card">
            <div className="point-number">3</div>
            <div className="point-content">
              <h4>清理资源</h4>
              <p>componentWillUnmount 中必须清理所有可能泄漏的资源</p>
            </div>
          </div>
          <div className="point-card">
            <div className="point-number">4</div>
            <div className="point-content">
              <h4>Hooks 是趋势</h4>
              <p>函数组件 + Hooks 是现代 React 的推荐方式</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ReactLifecycle;

