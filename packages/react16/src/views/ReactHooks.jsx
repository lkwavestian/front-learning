import React, { useState, useEffect, useCallback, useMemo, useRef, useContext, useReducer, memo } from 'react';
import './ReactHooks.css';

// 示例：Class组件的问题
const classComponentProblems = `// 类组件的痛点
class Counter extends React.Component {
  constructor(props) {
    super(props);
    this.state = { count: 0 };
    // 1. 必须在constructor中绑定this
    this.handleClick = this.handleClick.bind(this);
  }

  // 2. 相关逻辑分散在不同生命周期方法中
  componentDidMount() {
    document.title = \`计数: \${this.state.count}\`;
    // 订阅事件
    window.addEventListener('resize', this.handleResize);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.count !== this.state.count) {
      document.title = \`计数: \${this.state.count}\`;
    }
  }

  componentWillUnmount() {
    // 清理逻辑
    window.removeEventListener('resize', this.handleResize);
  }

  handleResize = () => {
    // 处理窗口大小变化
  }

  handleClick() {
    this.setState({ count: this.state.count + 1 });
  }

  render() {
    return (
      <div>
        <p>计数: {this.state.count}</p>
        <button onClick={this.handleClick}>增加</button>
      </div>
    );
  }
}`;

// Hooks解决方案
const hooksSolution = `// 使用 Hooks 的函数组件
function Counter() {
  const [count, setCount] = useState(0);

  // 相关逻辑聚合在一起
  useEffect(() => {
    document.title = \`计数: \${count}\`;
    
    const handleResize = () => {
      // 处理窗口大小变化
    };
    
    window.addEventListener('resize', handleResize);
    
    // 清理函数
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [count]); // 依赖count，自动处理更新

  return (
    <div>
      <p>计数: {count}</p>
      <button onClick={() => setCount(count + 1)}>增加</button>
    </div>
  );
}`;

// 自定义Hook示例
const customHookExample = `// 自定义 Hook：复用逻辑
function useCounter(initialValue = 0) {
  const [count, setCount] = useState(initialValue);
  
  const increment = useCallback(() => {
    setCount(prev => prev + 1);
  }, []);
  
  const decrement = useCallback(() => {
    setCount(prev => prev - 1);
  }, []);
  
  const reset = useCallback(() => {
    setCount(initialValue);
  }, [initialValue]);
  
  return { count, increment, decrement, reset };
}

// 在多个组件中复用
function CounterA() {
  const { count, increment, decrement } = useCounter(0);
  return (
    <div>
      <p>计数A: {count}</p>
      <button onClick={increment}>+</button>
      <button onClick={decrement}>-</button>
    </div>
  );
}

function CounterB() {
  const { count, increment, decrement } = useCounter(10);
  return (
    <div>
      <p>计数B: {count}</p>
      <button onClick={increment}>+</button>
      <button onClick={decrement}>-</button>
    </div>
  );
}`;

// useState示例
const useStateExample = `// useState - 状态管理
function Counter() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState('React');
  
  // 函数式更新（推荐）
  const handleIncrement = () => {
    setCount(prev => prev + 1); // 使用函数获取最新值
  };
  
  return (
    <div>
      <p>{name}: {count}</p>
      <button onClick={handleIncrement}>+1</button>
      <button onClick={() => setCount(count - 1)}>-1</button>
      <input value={name} onChange={e => setName(e.target.value)} />
    </div>
  );
}`;

// useEffect示例
const useEffectExample = `// useEffect - 副作用处理
function UserProfile({ userId }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // 1. 挂载时执行（componentDidMount）
  useEffect(() => {
    console.log('组件挂载');
    fetchUser(userId).then(data => {
      setUser(data);
      setLoading(false);
    });
    
    // 清理函数（componentWillUnmount）
    return () => {
      console.log('组件卸载，清理资源');
    };
  }, []); // 空依赖数组，只执行一次

  // 2. 依赖变化时执行（componentDidUpdate）
  useEffect(() => {
    if (user) {
      document.title = \`用户: \${user.name}\`;
    }
  }, [user]); // 依赖user，user变化时执行

  // 3. 每次渲染都执行
  useEffect(() => {
    console.log('每次渲染都执行');
  }); // 没有依赖数组

  if (loading) return <div>加载中...</div>;
  return <div>{user?.name}</div>;
}`;

// useCallback和useMemo示例
const performanceExample = `// useCallback - 缓存函数
function Parent() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState('');

  // 使用useCallback缓存函数，避免子组件不必要的重渲染
  const handleClick = useCallback(() => {
    console.log('点击了', count);
  }, [count]); // 依赖count

  return (
    <div>
      <input value={name} onChange={e => setName(e.target.value)} />
      <button onClick={() => setCount(count + 1)}>Count: {count}</button>
      <ExpensiveChild onClick={handleClick} />
    </div>
  );
}

// useMemo - 缓存计算结果
function ExpensiveComponent({ a, b }) {
  // 只有a或b变化时才重新计算
  const result = useMemo(() => {
    console.log('执行昂贵计算');
    return a * b * 1000; // 假设这是复杂计算
  }, [a, b]);

  return <div>结果: {result}</div>;
}`;

// useRef示例
const useRefExample = `// useRef - 保存可变值，不触发重渲染
function TextInputWithFocusButton() {
  const inputEl = useRef(null);
  const renderCount = useRef(0);
  const prevCountRef = useRef();

  const [count, setCount] = useState(0);

  // 访问DOM
  const onButtonClick = () => {
    inputEl.current.focus();
  };

  // 保存上一轮的值
  useEffect(() => {
    prevCountRef.current = count;
  });

  // 记录渲染次数（不会触发重渲染）
  renderCount.current += 1;

  return (
    <div>
      <input ref={inputEl} type="text" />
      <button onClick={onButtonClick}>聚焦输入框</button>
      <p>当前计数: {count}</p>
      <p>上一轮计数: {prevCountRef.current}</p>
      <p>渲染次数: {renderCount.current}</p>
      <button onClick={() => setCount(count + 1)}>+1</button>
    </div>
  );
}`;

// useReducer示例
const useReducerExample = `// useReducer - 复杂状态管理
const initialState = { count: 0 };

function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 };
    case 'decrement':
      return { count: state.count - 1 };
    case 'reset':
      return initialState;
    default:
      throw new Error();
  }
}

function Counter() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div>
      <p>计数: {state.count}</p>
      <button onClick={() => dispatch({ type: 'increment' })}>+</button>
      <button onClick={() => dispatch({ type: 'decrement' })}>-</button>
      <button onClick={() => dispatch({ type: 'reset' })}>重置</button>
    </div>
  );
}`;

// 解决的问题列表
const problemsSolved = [
  {
    title: '代码复用困难',
    description: '类组件中逻辑复用需要通过HOC、Render Props等模式，导致组件树嵌套过深，代码难以理解。',
    solution: '通过自定义Hooks，可以在不改变组件结构的情况下复用状态逻辑。'
  },
  {
    title: '相关逻辑分散',
    description: '在类组件中，相关的逻辑（如数据获取和订阅）被拆分到不同的生命周期方法中（componentDidMount、componentDidUpdate、componentWillUnmount）。',
    solution: 'useEffect可以将相关逻辑聚合在一起，更容易理解和维护。'
  },
  {
    title: 'this绑定问题',
    description: '类组件中需要理解this的指向，需要手动绑定方法或使用箭头函数，增加了代码复杂度。',
    solution: '函数组件没有this，完全避免了this绑定问题。'
  },
  {
    title: '难以测试',
    description: '类组件需要实例化，测试相对复杂。高阶组件和Render Props的模式也增加了测试难度。',
    solution: '函数组件是纯函数，更容易测试。自定义Hooks可以独立测试。'
  },
  {
    title: '性能优化复杂',
    description: '类组件需要使用shouldComponentUpdate或PureComponent，需要手动比较props和state。',
    solution: 'React.memo、useMemo、useCallback提供了更细粒度的性能优化。'
  },
  {
    title: '学习成本高',
    description: '需要理解类、继承、生命周期、this绑定等JavaScript概念，对初学者不够友好。',
    solution: 'Hooks基于函数，更符合函数式编程思想，学习曲线更平缓。'
  }
];

// 常用Hooks列表
const commonHooks = [
  {
    name: 'useState',
    description: '用于在函数组件中添加状态管理',
    category: '状态管理'
  },
  {
    name: 'useEffect',
    description: '用于处理副作用，如数据获取、订阅、DOM操作等',
    category: '副作用'
  },
  {
    name: 'useContext',
    description: '用于在函数组件中消费Context',
    category: 'Context'
  },
  {
    name: 'useReducer',
    description: 'useState的替代方案，适用于复杂状态逻辑',
    category: '状态管理'
  },
  {
    name: 'useCallback',
    description: '缓存函数，避免不必要的重渲染',
    category: '性能优化'
  },
  {
    name: 'useMemo',
    description: '缓存计算结果，避免重复计算',
    category: '性能优化'
  },
  {
    name: 'useRef',
    description: '用于访问DOM或保存可变值，不触发重渲染',
    category: 'DOM操作'
  },
  {
    name: 'useLayoutEffect',
    description: '与useEffect类似，但同步执行，在浏览器绘制前执行',
    category: '副作用'
  }
];

// 演示组件：Counter
function CounterDemo() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    document.title = `计数: ${count}`;
    return () => {
      document.title = 'React Hooks';
    };
  }, [count]);

  return (
    <div className="demo-card">
      <h3>useState + useEffect 演示</h3>
      <div className="demo-content">
        <p className="demo-count">计数: {count}</p>
        <div className="demo-buttons">
          <button onClick={() => setCount(count - 1)}>-</button>
          <button onClick={() => setCount(0)}>重置</button>
          <button onClick={() => setCount(count + 1)}>+</button>
        </div>
        <p className="demo-note">💡 检查浏览器标签页标题，会随着计数变化</p>
      </div>
    </div>
  );
}

// 演示组件：自定义Hook
function useWindowSize() {
  const [size, setSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });

  useEffect(() => {
    const handleResize = () => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return size;
}

function WindowSizeDemo() {
  const { width, height } = useWindowSize();

  return (
    <div className="demo-card">
      <h3>自定义 Hook 演示：useWindowSize</h3>
      <div className="demo-content">
        <p className="demo-info">
          窗口宽度: <strong>{width}px</strong>
        </p>
        <p className="demo-info">
          窗口高度: <strong>{height}px</strong>
        </p>
        <p className="demo-note">💡 尝试调整浏览器窗口大小，数值会实时更新</p>
      </div>
    </div>
  );
}

// 演示组件：性能优化
const ExpensiveChild = memo(function ExpensiveChild({ onClick, name }) {
  console.log('ExpensiveChild 渲染了');
  return (
    <div className="child-demo">
      <p>子组件渲染次数会被记录在控制台</p>
      <p>名称: {name}</p>
      <button onClick={onClick}>点击我</button>
    </div>
  );
});

function PerformanceDemo() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState('React');

  // 使用useCallback缓存函数
  const handleClick = useCallback(() => {
    console.log('子组件被点击');
  }, []); // 空依赖，函数不会变化

  // 使用useMemo缓存计算结果
  const expensiveValue = useMemo(() => {
    console.log('执行昂贵计算');
    return count * 1000;
  }, [count]);

  return (
    <div className="demo-card">
      <h3>性能优化演示：useCallback + useMemo</h3>
      <div className="demo-content">
        <div className="input-group">
          <label>名称:</label>
          <input value={name} onChange={e => setName(e.target.value)} />
        </div>
        <div className="input-group">
          <label>计数:</label>
          <button onClick={() => setCount(count + 1)}>Count: {count}</button>
        </div>
        <p className="demo-info">计算结果: {expensiveValue}</p>
        <p className="demo-note">💡 修改名称不会触发子组件重渲染，修改计数才会触发昂贵计算</p>
        <ExpensiveChild onClick={handleClick} name={name} />
      </div>
    </div>
  );
}

function ReactHooks() {
  return (
    <div className="hooks-page">
      <button className="back-button" onClick={() => window.history.back()}>
        ← 返回首页
      </button>

      <header className="page-header">
        <h1>React Hooks 深度理解</h1>
        <p className="subtitle">
          深入理解 React Hooks 的设计理念、解决的问题以及在实际开发中的应用
        </p>
        <div className="badges">
          <span className="badge">函数式编程</span>
          <span className="badge">代码复用</span>
          <span className="badge">性能优化</span>
          <span className="badge">简化开发</span>
        </div>
      </header>

      <section className="section">
        <h2>📚 什么是 React Hooks？</h2>
        <p className="intro-text">
          React Hooks 是 React 16.8 引入的新特性，允许你在函数组件中使用状态和React的其他特性。
          Hooks 是一些特殊的函数，让你可以在函数组件中"钩入" React 的特性，如状态管理、生命周期等。
        </p>
        <div className="highlight-box">
          <h4>核心概念</h4>
          <ul className="bullet-list">
            <li><strong>函数组件优先</strong>：Hooks让函数组件具备了类组件的所有能力</li>
            <li><strong>逻辑复用</strong>：通过自定义Hooks，可以在不改变组件结构的情况下复用状态逻辑</li>
            <li><strong>声明式编程</strong>：Hooks让代码更加声明式，更容易理解和维护</li>
            <li><strong>规则限制</strong>：只能在函数组件顶层调用Hooks，不能在循环、条件或嵌套函数中调用</li>
          </ul>
        </div>
      </section>

      <section className="section">
        <h2>🎯 Hooks 解决了什么问题？</h2>
        <p className="intro-text">
          在Hooks出现之前，React主要使用类组件。类组件虽然功能强大，但也带来了一些问题。
          Hooks的设计就是为了解决这些问题，让React开发更加简单和高效。
        </p>
        <div className="problems-grid">
          {problemsSolved.map((problem, index) => (
            <div key={index} className="problem-card">
              <div className="problem-header">
                <span className="problem-number">{index + 1}</span>
                <h4>{problem.title}</h4>
              </div>
              <p className="problem-description">{problem.description}</p>
              <div className="solution-box">
                <strong>✅ 解决方案：</strong>
                <p>{problem.solution}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="section">
        <h2>⚖️ Class组件 vs Hooks对比</h2>
        <div className="comparison-container">
          <div className="comparison-column">
            <h3>❌ Class组件的问题</h3>
            <div className="code-card">
              <pre>{classComponentProblems}</pre>
            </div>
          </div>
          <div className="comparison-column">
            <h3>✅ Hooks解决方案</h3>
            <div className="code-card">
              <pre>{hooksSolution}</pre>
            </div>
          </div>
        </div>
        <div className="comparison-points">
          <div className="comparison-point">
            <h4>代码组织</h4>
            <p>Class：相关逻辑分散在不同生命周期方法中</p>
            <p>Hooks：相关逻辑聚合在一起，更容易理解</p>
          </div>
          <div className="comparison-point">
            <h4>代码复用</h4>
            <p>Class：需要HOC、Render Props等复杂模式</p>
            <p>Hooks：自定义Hook，简单直接</p>
          </div>
          <div className="comparison-point">
            <h4>this绑定</h4>
            <p>Class：需要理解this指向，需要手动绑定</p>
            <p>Hooks：没有this，完全避免绑定问题</p>
          </div>
        </div>
      </section>

      <section className="section">
        <h2>🔧 常用 Hooks 详解</h2>
        <div className="hooks-grid">
          {commonHooks.map((hook, index) => (
            <div key={index} className="hook-card">
              <div className="hook-header">
                <code className="hook-name">{hook.name}</code>
                <span className="hook-category">{hook.category}</span>
              </div>
              <p className="hook-description">{hook.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section">
        <h2>📖 Hooks API 示例</h2>
        
        <div className="api-section">
          <h3>useState - 状态管理</h3>
          <p>用于在函数组件中添加状态管理</p>
          <div className="code-card">
            <pre>{useStateExample}</pre>
          </div>
        </div>

        <div className="api-section">
          <h3>useEffect - 副作用处理</h3>
          <p>用于处理副作用，如数据获取、订阅、DOM操作等</p>
          <div className="code-card">
            <pre>{useEffectExample}</pre>
          </div>
        </div>

        <div className="api-section">
          <h3>useCallback & useMemo - 性能优化</h3>
          <p>用于缓存函数和计算结果，避免不必要的重渲染和重复计算</p>
          <div className="code-card">
            <pre>{performanceExample}</pre>
          </div>
        </div>

        <div className="api-section">
          <h3>useRef - DOM引用和可变值</h3>
          <p>用于访问DOM或保存可变值，不会触发组件重渲染</p>
          <div className="code-card">
            <pre>{useRefExample}</pre>
          </div>
        </div>

        <div className="api-section">
          <h3>useReducer - 复杂状态管理</h3>
          <p>useState的替代方案，适用于复杂的状态逻辑</p>
          <div className="code-card">
            <pre>{useReducerExample}</pre>
          </div>
        </div>
      </section>

      <section className="section">
        <h2>🔄 自定义 Hooks</h2>
        <p className="intro-text">
          自定义Hook是一个以"use"开头的JavaScript函数，可以在其中调用其他Hooks。
          自定义Hook让组件逻辑复用变得简单，是Hooks最强大的特性之一。
        </p>
        <div className="code-card">
          <pre>{customHookExample}</pre>
        </div>
        <div className="highlight-box">
          <h4>自定义Hook的优势</h4>
          <ul className="bullet-list">
            <li><strong>逻辑复用</strong>：将组件逻辑提取到可重用的函数中</li>
            <li><strong>代码组织</strong>：将复杂组件拆分为更小的函数</li>
            <li><strong>测试友好</strong>：自定义Hook可以独立测试</li>
            <li><strong>类型安全</strong>：在TypeScript中，自定义Hook可以保持类型推断</li>
          </ul>
        </div>
      </section>

      <section className="section">
        <h2>🧪 交互式演示</h2>
        <CounterDemo />
        <WindowSizeDemo />
        <PerformanceDemo />
      </section>

      <section className="section">
        <h2>✅ Hooks 使用规则</h2>
        <div className="rules-list">
          <div className="rule-item important">
            <h4>1. 只在顶层调用Hooks</h4>
            <p>不要在循环、条件或嵌套函数中调用Hooks。确保Hooks的调用顺序在每次渲染时都保持一致。</p>
            <div className="code-block-small">
              <pre>{`// ❌ 错误
if (condition) {
  const [state, setState] = useState(0);
}

// ✅ 正确
const [state, setState] = useState(0);
if (condition) {
  // 使用state
}`}</pre>
            </div>
          </div>
          <div className="rule-item important">
            <h4>2. 只在React函数中调用Hooks</h4>
            <p>在React函数组件中调用Hooks，或在自定义Hook中调用其他Hooks。</p>
            <div className="code-block-small">
              <pre>{`// ✅ React函数组件
function MyComponent() {
  const [state, setState] = useState(0);
}

// ✅ 自定义Hook
function useCustomHook() {
  const [state, setState] = useState(0);
  return state;
}`}</pre>
            </div>
          </div>
          <div className="rule-item">
            <h4>3. 使用ESLint插件</h4>
            <p>使用eslint-plugin-react-hooks插件可以帮助你发现Hooks使用规则的问题。</p>
          </div>
        </div>
      </section>

      <section className="section">
        <h2>📝 总结</h2>
        <div className="summary-grid">
          <div className="summary-card">
            <h4>解决的问题</h4>
            <ul>
              <li>代码复用困难</li>
              <li>相关逻辑分散</li>
              <li>this绑定问题</li>
              <li>难以测试</li>
              <li>性能优化复杂</li>
              <li>学习成本高</li>
            </ul>
          </div>
          <div className="summary-card">
            <h4>核心优势</h4>
            <ul>
              <li>逻辑聚合，易于理解</li>
              <li>自定义Hook，简单复用</li>
              <li>无this绑定问题</li>
              <li>纯函数，易于测试</li>
              <li>细粒度性能优化</li>
              <li>函数式编程，学习曲线平缓</li>
            </ul>
          </div>
          <div className="summary-card">
            <h4>最佳实践</h4>
            <ul>
              <li>优先使用函数组件和Hooks</li>
              <li>提取自定义Hook复用逻辑</li>
              <li>合理使用useMemo和useCallback</li>
              <li>遵循Hooks使用规则</li>
              <li>使用ESLint插件检查</li>
              <li>保持Hooks调用顺序一致</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ReactHooks;
