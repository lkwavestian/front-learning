import React, { useState, createContext, useContext, useRef, useCallback } from 'react';
import './ComponentCommunication.css';

// ============ 场景1: Props 父子组件通信 ============
// 父组件
function ParentComponent() {
  const [name, setName] = useState('张三');

  return (
    <div className="communication-demo">
      <h4>父子组件通信</h4>
      <div className="parent-state">
        <p>父组件状态: {name}</p>
      </div>
      <ChildComponent name={name} onChange={setName} />
    </div>
  );
}

// 子组件
function ChildComponent({ name, onChange }) {
  return (
    <div className="child-box">
      <p>子组件接收 props:</p>
      <p className="props-display">name: {name}</p>
      <button onClick={() => onChange('李四')}>修改姓名</button>
    </div>
  );
}

// ============ 场景2: Context 跨组件通信 ============
const ThemeContext = createContext();

function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

function ContextDemo() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <div className="communication-demo">
      <h4>Context 跨组件通信</h4>
      <div className={`theme-box ${theme}`}>
        <p>当前主题: {theme}</p>
        <button onClick={toggleTheme}>切换主题</button>
        <DeeplyNestedComponent />
      </div>
    </div>
  );
}

function DeeplyNestedComponent() {
  const { theme } = useContext(ThemeContext);
  return (
    <div className="nested-component">
      <p>深层嵌套组件也能访问主题: {theme}</p>
    </div>
  );
}

// ============ 场景3: Props Drilling 问题演示 ============
function PropsDrillingDemo() {
  const [user, setUser] = useState({ name: '张三', theme: 'light' });

  return (
    <div className="communication-demo">
      <h4>Props Drilling 问题演示</h4>
      <div className="drilling-container">
        <div className="layer app">
          <p>App 层（数据源）</p>
          <p className="data-label">user: {user.name}</p>
          <button onClick={() => setUser({ ...user, name: user.name === '张三' ? '李四' : '张三' })}>
            切换用户
          </button>
        </div>
        <MiddleLayer1 user={user} />
      </div>
      <div className="drilling-note">
        <p className="warning">⚠️ 中间组件被迫传递不需要的 props</p>
      </div>
    </div>
  );
}

function MiddleLayer1({ user }) {
  return (
    <div className="layer middle">
      <p>中间层 1（不使用但必须传递）</p>
      <p className="data-label">props: {'{ '}user{' }'}</p>
      <MiddleLayer2 user={user} />
    </div>
  );
}

function MiddleLayer2({ user }) {
  return (
    <div className="layer middle">
      <p>中间层 2（不使用但必须传递）</p>
      <p className="data-label">props: {'{ '}user{' }'}</p>
      <DeepComponent user={user} />
    </div>
  );
}

function DeepComponent({ user }) {
  return (
    <div className="layer deep">
      <p>深层组件（终于使用）</p>
      <p className="data-label">显示: {user.name}</p>
    </div>
  );
}

// ============ 场景4: 回调函数通信 ============
function CallbackParent() {
  const [results, setResults] = useState([]);

  const handleSearch = (query) => {
    // 模拟搜索逻辑
    const mockResults = ['结果1', '结果2', '结果3'];
    setResults(mockResults);
  };

  return (
    <div className="communication-demo">
      <h4>回调函数通信</h4>
      <SearchBox onSearch={handleSearch} />
      {results.length > 0 && (
        <div className="parent-text">
          <p>搜索结果: {results.join(', ')}</p>
        </div>
      )}
    </div>
  );
}

function SearchBox({ onSearch }) {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={query}
        onChange={e => setQuery(e.target.value)}
        placeholder="输入搜索内容"
        className="demo-input"
      />
      <button type="submit">搜索</button>
    </form>
  );
}

// ============ 场景4: Ref 命令式通信 ============
function RefParent() {
  const inputRef = useRef(null);

  const handleFocus = () => {
    inputRef.current.focus();
  };

  const handleGetValue = () => {
    alert(`输入框值: ${inputRef.current.value}`);
  };

  return (
    <div className="communication-demo">
      <h4>Ref 命令式通信</h4>
      <MyInput ref={inputRef} />
      <div style={{ marginTop: '10px' }}>
        <button onClick={handleFocus} className="action-btn">聚焦</button>
        <button onClick={handleGetValue} className="action-btn">获取值</button>
      </div>
    </div>
  );
}

const MyInput = React.forwardRef((props, ref) => {
  return (
    <input 
      ref={ref} 
      type="text" 
      placeholder="使用 forwardRef 暴露 DOM 引用"
      className="demo-input"
      {...props} 
    />
  );
});

// ============ 场景5: 状态提升 ============
function StateLiftingParent() {
  const [sharedData, setSharedData] = useState('');

  return (
    <div className="communication-demo">
      <h4>状态提升 (State Lifting)</h4>
      <div className="siblings-container">
        <ComponentA value={sharedData} onChange={setSharedData} />
        <ComponentB value={sharedData} onChange={setSharedData} />
      </div>
    </div>
  );
}

function ComponentA({ value, onChange }) {
  return (
    <div className="sibling-box sibling-a">
      <h5>组件 A（输入框）</h5>
      <input 
        value={value} 
        onChange={e => onChange(e.target.value)} 
        placeholder="输入内容"
        className="demo-input"
      />
    </div>
  );
}

function ComponentB({ value, onChange }) {
  return (
    <div className="sibling-box sibling-b">
      <h5>组件 B（清空按钮）</h5>
      <button onClick={() => onChange('')}>清空</button>
      {value && <p>当前值: {value}</p>}
    </div>
  );
}

// ============ 场景6: 自定义 Hooks 复用逻辑 ============
function useCounter(initialValue = 0) {
  const [count, setCount] = useState(initialValue);

  const increment = useCallback(() => setCount(prev => prev + 1), []);
  const decrement = useCallback(() => setCount(prev => prev - 1), []);
  const reset = useCallback(() => setCount(initialValue), [initialValue]);

  return { count, increment, decrement, reset };
}

function CustomHookParent() {
  const counter1 = useCounter(0);
  const counter2 = useCounter(100);

  return (
    <div className="communication-demo">
      <h4>自定义 Hooks 复用逻辑</h4>
      <div className="hooks-container">
        <div className="hook-demo">
          <h5>计数器 1</h5>
          <p>计数: {counter1.count}</p>
          <button onClick={counter1.increment}>+</button>
          <button onClick={counter1.decrement}>-</button>
          <button onClick={counter1.reset}>重置</button>
        </div>
        <div className="hook-demo">
          <h5>计数器 2 (初始值 100)</h5>
          <p>计数: {counter2.count}</p>
          <button onClick={counter2.increment}>+</button>
          <button onClick={counter2.decrement}>-</button>
          <button onClick={counter2.reset}>重置</button>
        </div>
      </div>
    </div>
  );
}

// 主组件
function ComponentCommunication() {
  const [activeDemo, setActiveDemo] = useState('props');

  const demos = [
    { id: 'props', name: 'Props 通信', component: <ParentComponent /> },
    { id: 'drilling', name: 'Props Drilling', component: <PropsDrillingDemo /> },
    { id: 'context', name: 'Context 通信', component: <ContextDemoWrapper /> },
    { id: 'callback', name: '回调函数', component: <CallbackParent /> },
    { id: 'ref', name: 'Ref 命令式', component: <RefParent /> },
    { id: 'lifting', name: '状态提升', component: <StateLiftingParent /> },
    { id: 'hooks', name: '自定义 Hooks', component: <CustomHookParent /> }
  ];

  const demoSections = [
    { id: 'overview', name: '通信方式概览' },
    { id: 'demo', name: '交互演示' },
    { id: 'comparison', name: '对比分析' }
  ];

  const [activeSection, setActiveSection] = useState('overview');

  // 代码示例
  const propsCode = `// 1. Props 父子组件通信
function Parent() {
  const [name, setName] = useState('张三');
  
  // 向子组件传递数据和方法
  return <Child name={name} onChange={setName} />;
}

function Child({ name, onChange }) {
  // 接收并使用父组件传递的数据
  return (
    <div>
      <p>姓名: {name}</p>
      <button onClick={() => onChange('李四')}>
        修改姓名
      </button>
    </div>
  );
}

// 特点：
// ✅ 简单直观，单向数据流
// ✅ 类型检查 (PropTypes/TypeScript)
// ✅ 父子组件通信的最佳方式
// ❌ 只适合父子关系
// ❌ 跨多层传递时存在 props drilling 问题
// 
// 提示：查看 "Props Drilling" 演示了解跨层级传递的问题`;

  const contextCode = `// 2. Context 跨组件通信
const ThemeContext = createContext();

// 提供者：顶层组件
function App() {
  const [theme, setTheme] = useState('light');
  
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <Header />
      <Content />
    </ThemeContext.Provider>
  );
}

// 消费者：任意深层组件
function Header() {
  const { theme, setTheme } = useContext(ThemeContext);
  
  return (
    <div className={theme}>
      <button onClick={() => setTheme('dark')}>
        切换主题
      </button>
    </div>
  );
}

// 特点：
// ✅ 避免 props drilling
// ✅ 跨层级传递
// ❌ 降低组件复用性
// ❌ 过度使用会导致状态管理混乱`;

  const drillingCode = `// Props Drilling 问题详解
// ======================================
// 问题：当需要跨多层组件传递数据时，
// 中间组件被迫接收并传递不需要的 props

function App() {
  const [user, setUser] = useState({ name: '张三' });
  
  // user 需要传递到 DeepComponent，中间层不需要
  return <MiddleLayer1 user={user} />;
}

// 中间层 1：不使用 user，但必须传递
function MiddleLayer1({ user }) {
  return <MiddleLayer2 user={user} />;
}

// 中间层 2：同样不需要，但必须传递
function MiddleLayer2({ user }) {
  return <DeepComponent user={user} />;
}

// 深层组件：终于使用 user
function DeepComponent({ user }) {
  return <div>{user.name}</div>;
}

// ======================================
// 问题总结：
// 1. 中间组件被迫接收不需要的 props（代码冗余）
// 2. 组件层级深时，维护成本高
// 3. 修改 props 结构需要修改所有中间层
// 4. 降低组件复用性
// 5. 可读性差，难以追踪数据流

// ======================================
// 解决方案：
// 1. 使用 Context API（适合主题、用户信息等全局状态）
// 2. 状态提升（适合兄弟组件通信）
// 3. 状态管理库（Redux、Zustand、MobX 等）
// 4. 组合组件模式（Compound Components）
// 5. 自定义 Hooks

// 示例：使用 Context 解决
const UserContext = createContext();

function App() {
  const [user, setUser] = useState({ name: '张三' });
  
  return (
    <UserContext.Provider value={user}>
      <MiddleLayer1 />
    </UserContext.Provider>
  );
}

function MiddleLayer1() {
  // 不再需要传递 user
  return <MiddleLayer2 />;
}

function MiddleLayer2() {
  return <DeepComponent />;
}

function DeepComponent() {
  const user = useContext(UserContext); // 直接从 Context 获取
  return <div>{user.name}</div>;
}`;

  const callbackCode = `// 回调函数通信
function SearchBox({ onSearch }) {
  const [query, setQuery] = useState('');
  
  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query); // 回调父组件
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <input value={query} onChange={e => setQuery(e.target.value)} />
      <button type="submit">搜索</button>
    </form>
  );
}

function App() {
  const [results, setResults] = useState([]);
  
  const handleSearch = (query) => {
    // 处理搜索逻辑
    fetchResults(query).then(setResults);
  };
  
  return (
    <div>
      <SearchBox onSearch={handleSearch} />
      <Results data={results} />
    </div>
  );
}

// 特点：
// ✅ 数据流清晰
// ✅ 组件解耦
// ❌ 深层嵌套导致回调地狱`;

  const refCode = `// Ref 命令式通信
const MyInput = forwardRef((props, ref) => {
  return <input ref={ref} {...props} />;
});

function Form() {
  const inputRef = useRef(null);
  
  const handleFocus = () => {
    inputRef.current.focus(); // 命令式调用
  };
  
  const handleGetValue = () => {
    console.log(inputRef.current.value);
  };
  
  return (
    <div>
      <MyInput ref={inputRef} />
      <button onClick={handleFocus}>聚焦</button>
      <button onClick={handleGetValue}>获取值</button>
    </div>
  );
}

// 特点：
// ✅ 直接访问 DOM
// ✅ 避免重新渲染
// ❌ 破坏声明式编程
// ❌ 难以追踪状态变化`;

  const liftingCode = `// 状态提升 (State Lifting)
// 兄弟组件通信需要将状态提升到共同父组件

function App() {
  const [sharedData, setSharedData] = useState('');
  
  return (
    <div>
      <ComponentA value={sharedData} onChange={setSharedData} />
      <ComponentB value={sharedData} onChange={setSharedData} />
    </div>
  );
}

function ComponentA({ value, onChange }) {
  return (
    <input value={value} onChange={e => onChange(e.target.value)} />
  );
}

function ComponentB({ value, onChange }) {
  return <button onClick={() => onChange('')}>清空</button>;
}

// 特点：
// ✅ 解决兄弟组件通信
// ✅ 遵循单向数据流
// ❌ 状态层级提升过高
// ❌ 增加组件复杂度`;

  const hooksCode = `// 自定义 Hooks 复用逻辑
function useCounter(initialValue = 0) {
  const [count, setCount] = useState(initialValue);
  
  const increment = useCallback(() => 
    setCount(prev => prev + 1), []
  );
  const decrement = useCallback(() => 
    setCount(prev => prev - 1), []
  );
  const reset = useCallback(() => 
    setCount(initialValue), [initialValue]
  );
  
  return { count, increment, decrement, reset };
}

// 使用自定义 Hook
function CounterA() {
  const { count, increment } = useCounter(0);
  return <button onClick={increment}>{count}</button>;
}

function CounterB() {
  const { count, increment } = useCounter(100);
  return <button onClick={increment}>{count}</button>;
}

// 特点：
// ✅ 逻辑复用
// ✅ 关注点分离
// ✅ 易于测试
// ❌ 需要理解 Hooks 规则`;

  function ContextDemoWrapper() {
    return (
      <ThemeProvider>
        <ContextDemo />
      </ThemeProvider>
    );
  }

  return (
    <div className="communication-container">
      <button 
        className="back-button"
        onClick={() => window.history.back()}
      >
        ← 返回
      </button>

      <div className="page-header">
        <h1>🔗 React 组件通信</h1>
        <p className="subtitle">深入理解 React 组件间六种通信方式，掌握数据传递的最佳实践</p>
      </div>

      {/* 导航标签 */}
      <div className="section-nav">
        {demoSections.map(section => (
          <button
            key={section.id}
            className={`nav-btn ${activeSection === section.id ? 'active' : ''}`}
            onClick={() => setActiveSection(section.id)}
          >
            {section.name}
          </button>
        ))}
      </div>

      {/* 通信方式概览 */}
      {activeSection === 'overview' && (
        <div className="section">
          <h2>📋 六种组件通信方式</h2>
          
          <div className="overview-grid">
            <div className="method-card">
              <div className="method-icon">📤</div>
              <h3>1. Props</h3>
              <p>父子组件之间传递数据和回调函数</p>
              <div className="use-case">
                <strong>适用场景：</strong>
                <ul>
                  <li>父子组件通信</li>
                  <li>简单数据传递</li>
                  <li>表单输入控件</li>
                </ul>
              </div>
            </div>

            <div className="method-card">
              <div className="method-icon">🌐</div>
              <h3>2. Context</h3>
              <p>跨组件层级共享全局状态</p>
              <div className="use-case">
                <strong>适用场景：</strong>
                <ul>
                  <li>主题切换</li>
                  <li>用户认证状态</li>
                  <li>避免 props drilling</li>
                </ul>
              </div>
            </div>

            <div className="method-card">
              <div className="method-icon">📞</div>
              <h3>3. 回调函数</h3>
              <p>子组件通知父组件状态变化</p>
              <div className="use-case">
                <strong>适用场景：</strong>
                <ul>
                  <li>表单提交</li>
                  <li>事件处理</li>
                  <li>数据验证</li>
                </ul>
              </div>
            </div>

            <div className="method-card">
              <div className="method-icon">🎯</div>
              <h3>4. Ref</h3>
              <p>命令式访问子组件实例或 DOM</p>
              <div className="use-case">
                <strong>适用场景：</strong>
                <ul>
                  <li>DOM 操作</li>
                  <li>输入框聚焦</li>
                  <li>媒体播放控制</li>
                </ul>
              </div>
            </div>

            <div className="method-card">
              <div className="method-icon">⬆️</div>
              <h3>5. 状态提升</h3>
              <p>将共享状态提升到共同父组件</p>
              <div className="use-case">
                <strong>适用场景：</strong>
                <ul>
                  <li>兄弟组件通信</li>
                  <li>多个组件共享状态</li>
                  <li>表单联动</li>
                </ul>
              </div>
            </div>

            <div className="method-card">
              <div className="method-icon">🪝</div>
              <h3>6. 自定义 Hooks</h3>
              <p>封装和复用组件逻辑</p>
              <div className="use-case">
                <strong>适用场景：</strong>
                <ul>
                  <li>逻辑复用</li>
                  <li>关注点分离</li>
                  <li>复杂状态管理</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 交互演示 */}
      {activeSection === 'demo' && (
        <div className="section">
          <h2>🎮 交互演示</h2>
          
          {/* 演示切换按钮 */}
          <div className="demo-switch">
            {demos.map(demo => (
              <button
                key={demo.id}
                className={`switch-btn ${activeDemo === demo.id ? 'active' : ''}`}
                onClick={() => setActiveDemo(demo.id)}
              >
                {demo.name}
              </button>
            ))}
          </div>

          {/* 当前演示 */}
          <div className="demo-area">
            {demos.find(d => d.id === activeDemo)?.component}
          </div>

          {/* 对应代码 */}
          <div className="code-block large">
            <pre>
              {activeDemo === 'props' && propsCode}
              {activeDemo === 'drilling' && drillingCode}
              {activeDemo === 'context' && contextCode}
              {activeDemo === 'callback' && callbackCode}
              {activeDemo === 'ref' && refCode}
              {activeDemo === 'lifting' && liftingCode}
              {activeDemo === 'hooks' && hooksCode}
            </pre>
          </div>
        </div>
      )}

      {/* 对比分析 */}
      {activeSection === 'comparison' && (
        <div className="section">
          <h2>⚖️ 对比分析</h2>
          
          <div className="comparison-table">
            <table>
              <thead>
                <tr>
                  <th>通信方式</th>
                  <th>复杂度</th>
                  <th>性能</th>
                  <th>可维护性</th>
                  <th>使用场景</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>Props</strong></td>
                  <td>⭐⭐</td>
                  <td>⭐⭐⭐⭐</td>
                  <td>⭐⭐⭐⭐⭐</td>
                  <td>父子组件简单通信</td>
                </tr>
                <tr>
                  <td><strong>Context</strong></td>
                  <td>⭐⭐⭐</td>
                  <td>⭐⭐⭐</td>
                  <td>⭐⭐⭐</td>
                  <td>跨层级全局状态</td>
                </tr>
                <tr>
                  <td><strong>回调函数</strong></td>
                  <td>⭐⭐</td>
                  <td>⭐⭐⭐⭐</td>
                  <td>⭐⭐⭐⭐</td>
                  <td>子组件通知父组件</td>
                </tr>
                <tr>
                  <td><strong>Ref</strong></td>
                  <td>⭐⭐⭐</td>
                  <td>⭐⭐⭐⭐⭐</td>
                  <td>⭐⭐⭐</td>
                  <td>命令式 DOM 操作</td>
                </tr>
                <tr>
                  <td><strong>状态提升</strong></td>
                  <td>⭐⭐⭐</td>
                  <td>⭐⭐⭐</td>
                  <td>⭐⭐⭐</td>
                  <td>兄弟组件共享状态</td>
                </tr>
                <tr>
                  <td><strong>自定义 Hooks</strong></td>
                  <td>⭐⭐⭐⭐</td>
                  <td>⭐⭐⭐⭐</td>
                  <td>⭐⭐⭐⭐⭐</td>
                  <td>逻辑复用封装</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="best-practices">
            <h3>💡 最佳实践</h3>
            <div className="practice-grid">
              <div className="practice-card">
                <h4>1. 优先使用 Props</h4>
                <p>Props 是最简单直接的通信方式，优先考虑使用它来解决父子组件通信问题。</p>
              </div>
              
              <div className="practice-card">
                <h4>2. 适度使用 Context</h4>
                <p>Context 适合全局状态（主题、用户信息），避免过度使用导致状态管理混乱。</p>
              </div>
              
              <div className="practice-card">
                <h4>3. 避免 Props Drilling</h4>
                <p>如果 props 需要跨多层传递，考虑使用 Context 或状态管理库。</p>
              </div>
              
              <div className="practice-card">
                <h4>4. 谨慎使用 Ref</h4>
                <p>Ref 会破坏声明式编程，只在需要 DOM 操作或命令式调用时使用。</p>
              </div>
              
              <div className="practice-card">
                <h4>5. 状态提升不要过度</h4>
                <p>不要将状态提升得太高，保持在最近的公共祖先组件即可。</p>
              </div>
              
              <div className="practice-card">
                <h4>6. 封装自定义 Hooks</h4>
                <p>对于重复的逻辑，提取为自定义 Hooks，提高代码复用性。</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ComponentCommunication;
