import React, { useState, useEffect, useRef } from 'react';
import './ComponentTypes.css';

// ============ 1. 函数式组件示例 ============
function FunctionCounter() {
  const [count, setCount] = useState(0);
  const [message, setMessage] = useState('函数组件已挂载');

  useEffect(() => {
    console.log('函数组件：useEffect 挂载');
    return () => {
      console.log('函数组件：useEffect 卸载');
    };
  }, []);

  useEffect(() => {
    console.log('函数组件：count 变化', count);
  }, [count]);

  return (
    <div className="component-demo">
      <h3>函数式组件</h3>
      <div className="count-display">{count}</div>
      <div className="button-group">
        <button onClick={() => setCount(count - 1)}>-</button>
        <button onClick={() => setCount(count + 1)}>+</button>
      </div>
      <input 
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="输入消息"
      />
      <p className="message">{message}</p>
    </div>
  );
}

// ============ 2. React.Component 类组件示例 ============
class ClassCounter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
      message: '类组件已挂载'
    };
    
    // 方法绑定
    this.handleIncrement = this.handleIncrement.bind(this);
    this.handleDecrement = this.handleDecrement.bind(this);
    
    console.log('类组件：constructor');
  }

  componentDidMount() {
    console.log('类组件：componentDidMount');
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.count !== this.state.count) {
      console.log('类组件：count 变化', this.state.count);
    }
  }

  componentWillUnmount() {
    console.log('类组件：componentWillUnmount');
  }

  handleIncrement() {
    this.setState({ count: this.state.count + 1 });
  }

  handleDecrement() {
    this.setState({ count: this.state.count - 1 });
  }

  handleMessageChange = (e) => {
    // 箭头函数自动绑定 this
    this.setState({ message: e.target.value });
  }

  render() {
    return (
      <div className="component-demo">
        <h3>类组件 (Component)</h3>
        <div className="count-display">{this.state.count}</div>
        <div className="button-group">
          <button onClick={this.handleDecrement}>-</button>
          <button onClick={this.handleIncrement}>+</button>
        </div>
        <input 
          value={this.state.message}
          onChange={this.handleMessageChange}
          placeholder="输入消息"
        />
        <p className="message">{this.state.message}</p>
      </div>
    );
  }
}

// 主组件
function ComponentTypes() {
  const [showFunction, setShowFunction] = useState(true);
  const [showClass, setShowClass] = useState(true);
  const [activeTest, setActiveTest] = useState('comparison');

  const testScenarios = [
    { id: 'comparison', name: '组件对比' },
    { id: 'lifecycle', name: '生命周期' },
    { id: 'state', name: '状态管理' },
    { id: 'performance', name: '性能对比' }
  ];

  // 代码示例
  const functionComponentCode = `// 1. 函数式组件（推荐）
import { useState, useEffect } from 'react';

function Counter() {
  // 状态管理
  const [count, setCount] = useState(0);
  
  // 生命周期
  useEffect(() => {
    console.log('组件挂载');
    
    return () => {
      console.log('组件卸载');
    };
  }, []);
  
  // 事件处理
  const handleClick = () => {
    setCount(count + 1);
  };
  
  return (
    <div>
      <p>{count}</p>
      <button onClick={handleClick}>+</button>
    </div>
  );
}

// 特点：
// ✅ 代码简洁
// ✅ 使用 Hooks 管理状态和副作用
// ✅ 无需绑定 this
// ✅ 性能更好（无类实例开销）
// ✅ 更易于代码复用（自定义 Hooks）`;

  const createClassCode = `// 2. React.createClass（已废弃）
const Counter = React.createClass({
  // 初始状态
  getInitialState() {
    return {
      count: 0
    };
  },
  
  // 默认 props
  getDefaultProps() {
    return {
      title: 'Counter'
    };
  },
  
  // 生命周期
  componentDidMount() {
    console.log('组件挂载');
  },
  
  componentWillUnmount() {
    console.log('组件卸载');
  },
  
  // 方法（自动绑定 this）
  handleClick() {
    this.setState({ 
      count: this.state.count + 1 
    });
  },
  
  render() {
    return (
      <div>
        <p>{this.state.count}</p>
        <button onClick={this.handleClick}>+</button>
      </div>
    );
  }
});

// 特点：
// ❌ 已在 React 16+ 废弃
// ❌ 需要引入额外的 mixin 支持
// ✅ 自动绑定 this
// ⚠️ 仅用于维护老项目`;

  const componentClassCode = `// 3. ES6 类组件
class Counter extends React.Component {
  // 构造函数
  constructor(props) {
    super(props);
    
    // 初始状态
    this.state = {
      count: 0
    };
    
    // 绑定 this（必须）
    this.handleClick = this.handleClick.bind(this);
  }
  
  // 生命周期
  componentDidMount() {
    console.log('组件挂载');
  }
  
  componentDidUpdate(prevProps, prevState) {
    console.log('组件更新');
  }
  
  componentWillUnmount() {
    console.log('组件卸载');
  }
  
  // 方法
  handleClick() {
    this.setState({ 
      count: this.state.count + 1 
    });
  }
  
  // 箭头函数（自动绑定）
  handleReset = () => {
    this.setState({ count: 0 });
  }
  
  render() {
    return (
      <div>
        <p>{this.state.count}</p>
        <button onClick={this.handleClick}>+</button>
        <button onClick={this.handleReset}>重置</button>
      </div>
    );
  }
}

// 特点：
// ✅ ES6 标准语法
// ✅ 完整的生命周期方法
// ⚠️ 需要手动绑定 this
// ⚠️ 代码相对冗长
// ⚠️ 不能使用 Hooks`;

  const lifecycleComparisonCode = `// 生命周期对比

// 函数组件 - 使用 Hooks
function Component() {
  // 挂载 + 卸载
  useEffect(() => {
    console.log('componentDidMount');
    return () => console.log('componentWillUnmount');
  }, []);
  
  // 更新（依赖项变化时）
  useEffect(() => {
    console.log('componentDidUpdate');
  }, [count]);
  
  // 每次渲染都执行
  useEffect(() => {
    console.log('每次渲染');
  });
}

// 类组件 - 生命周期方法
class Component extends React.Component {
  componentDidMount() {
    console.log('挂载完成');
  }
  
  componentDidUpdate(prevProps, prevState) {
    if (prevState.count !== this.state.count) {
      console.log('count 更新');
    }
  }
  
  componentWillUnmount() {
    console.log('即将卸载');
  }
  
  shouldComponentUpdate(nextProps, nextState) {
    // 性能优化：决定是否重新渲染
    return nextState.count !== this.state.count;
  }
}`;

  const stateComparisonCode = `// 状态管理对比

// 函数组件
function FunctionComponent() {
  const [count, setCount] = useState(0);
  const [user, setUser] = useState({ name: 'React' });
  
  // 更新状态
  setCount(1);  // 直接设置新值
  setCount(prev => prev + 1);  // 基于上一个值
  
  // 更新对象（需要合并）
  setUser({ ...user, age: 5 });  // 手动合并
}

// 类组件
class ClassComponent extends React.Component {
  state = {
    count: 0,
    user: { name: 'React' }
  };
  
  // 更新状态
  this.setState({ count: 1 });  // 自动合并
  this.setState(prev => ({ count: prev.count + 1 }));
  
  // 更新对象（自动合并）
  this.setState({ user: { ...this.state.user, age: 5 } });
}

// 关键区别：
// - useState: 替换整个值
// - setState: 自动合并对象`;

  return (
    <div className="component-types-container">
      {/* 返回首页按钮 */}
      <button className="back-button" onClick={() => window.history.back()}>
        ← 返回首页
      </button>

      {/* 页面标题 */}
      <div className="page-header">
        <h1>React 组件创建方式详解</h1>
        <p className="subtitle">深入理解函数组件、createClass 和 Class Component 的区别与演进</p>
      </div>

      {/* 核心概念 */}
      <section className="section">
        <h2>📚 三种组件创建方式</h2>
        <div className="concept-grid-three">
          <div className="concept-card">
            <div className="concept-badge modern">现代推荐</div>
            <h3>函数式组件</h3>
            <p>使用函数定义组件，配合 Hooks 管理状态</p>
            <div className="feature-list">
              <span className="feature good">✅ 代码简洁</span>
              <span className="feature good">✅ 支持 Hooks</span>
              <span className="feature good">✅ 无 this 困扰</span>
              <span className="feature good">✅ 性能更好</span>
              <span className="feature good">✅ 易于测试</span>
            </div>
          </div>

          <div className="concept-card">
            <div className="concept-badge deprecated">已废弃</div>
            <h3>React.createClass</h3>
            <p>React 早期的组件创建方式（ES5）</p>
            <div className="feature-list">
              <span className="feature bad">❌ React 16+ 已废弃</span>
              <span className="feature bad">❌ 需要额外库支持</span>
              <span className="feature good">✅ 自动绑定 this</span>
              <span className="feature good">✅ 支持 mixins</span>
              <span className="feature info">ℹ️ 仅用于维护老代码</span>
            </div>
          </div>

          <div className="concept-card">
            <div className="concept-badge legacy">传统方式</div>
            <h3>ES6 类组件</h3>
            <p>使用 ES6 class 继承 React.Component</p>
            <div className="feature-list">
              <span className="feature good">✅ ES6 标准语法</span>
              <span className="feature good">✅ 完整生命周期</span>
              <span className="feature bad">⚠️ 需要绑定 this</span>
              <span className="feature bad">⚠️ 不支持 Hooks</span>
              <span className="feature bad">⚠️ 代码较冗长</span>
            </div>
          </div>
        </div>
      </section>

      {/* 交互式演示 */}
      <section className="section">
        <h2>🎯 交互式演示</h2>

        {/* 场景选择 */}
        <div className="test-selector">
          {testScenarios.map(test => (
            <button
              key={test.id}
              className={`test-btn ${activeTest === test.id ? 'active' : ''}`}
              onClick={() => setActiveTest(test.id)}
            >
              {test.name}
            </button>
          ))}
        </div>

        <div className="demo-container">
          {/* 场景1: 组件对比 */}
          {activeTest === 'comparison' && (
            <div className="test-case">
              <h3>场景1: 三种方式对比</h3>
              
              <div className="components-showcase">
                <div className="showcase-controls">
                  <label>
                    <input 
                      type="checkbox" 
                      checked={showFunction}
                      onChange={(e) => setShowFunction(e.target.checked)}
                    />
                    显示函数组件
                  </label>
                  <label>
                    <input 
                      type="checkbox" 
                      checked={showClass}
                      onChange={(e) => setShowClass(e.target.checked)}
                    />
                    显示类组件
                  </label>
                </div>

                <div className="components-grid">
                  {showFunction && (
                    <div className="component-wrapper">
                      <FunctionCounter />
                    </div>
                  )}
                  {showClass && (
                    <div className="component-wrapper">
                      <ClassCounter />
                    </div>
                  )}
                </div>
              </div>

              <div className="code-comparison-grid">
                <div className="code-panel">
                  <h4>函数式组件</h4>
                  <div className="code-block">
                    <pre>{functionComponentCode}</pre>
                  </div>
                </div>

                <div className="code-panel">
                  <h4>ES6 类组件</h4>
                  <div className="code-block">
                    <pre>{componentClassCode}</pre>
                  </div>
                </div>
              </div>

              <div className="conclusion">
                <strong>结论:</strong> 函数组件配合 Hooks 是现代 React 的推荐方式，代码更简洁，功能更强大。
                类组件仍然支持，但新项目建议使用函数组件。
              </div>
            </div>
          )}

          {/* 场景2: 生命周期 */}
          {activeTest === 'lifecycle' && (
            <div className="test-case">
              <h3>场景2: 生命周期对比</h3>
              
              <div className="lifecycle-comparison">
                <div className="lifecycle-panel">
                  <h4>函数组件生命周期（Hooks）</h4>
                  <div className="lifecycle-diagram">
                    <div className="lifecycle-phase">
                      <div className="phase-title">挂载阶段</div>
                      <div className="lifecycle-item">
                        <code>useEffect(() =&gt; &#123; /* ... */ &#125;, [])</code>
                        <span className="lifecycle-desc">相当于 componentDidMount</span>
                      </div>
                    </div>
                    <div className="lifecycle-phase">
                      <div className="phase-title">更新阶段</div>
                      <div className="lifecycle-item">
                        <code>useEffect(() =&gt; &#123; /* ... */ &#125;, [deps])</code>
                        <span className="lifecycle-desc">相当于 componentDidUpdate（依赖项变化）</span>
                      </div>
                    </div>
                    <div className="lifecycle-phase">
                      <div className="phase-title">卸载阶段</div>
                      <div className="lifecycle-item">
                        <code>return () =&gt; &#123; /* cleanup */ &#125;</code>
                        <span className="lifecycle-desc">相当于 componentWillUnmount</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="lifecycle-panel">
                  <h4>类组件生命周期</h4>
                  <div className="lifecycle-diagram">
                    <div className="lifecycle-phase">
                      <div className="phase-title">挂载阶段</div>
                      <div className="lifecycle-item">
                        <code>constructor()</code>
                      </div>
                      <div className="lifecycle-item">
                        <code>componentDidMount()</code>
                      </div>
                    </div>
                    <div className="lifecycle-phase">
                      <div className="phase-title">更新阶段</div>
                      <div className="lifecycle-item">
                        <code>shouldComponentUpdate()</code>
                      </div>
                      <div className="lifecycle-item">
                        <code>componentDidUpdate()</code>
                      </div>
                    </div>
                    <div className="lifecycle-phase">
                      <div className="phase-title">卸载阶段</div>
                      <div className="lifecycle-item">
                        <code>componentWillUnmount()</code>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="code-block large">
                <pre>{lifecycleComparisonCode}</pre>
              </div>

              <div className="conclusion">
                <strong>结论:</strong> 函数组件使用 useEffect 统一处理所有生命周期，更简洁。
                类组件有明确的生命周期方法，但相对复杂。
              </div>
            </div>
          )}

          {/* 场景3: 状态管理 */}
          {activeTest === 'state' && (
            <div className="test-case">
              <h3>场景3: 状态管理对比</h3>
              
              <div className="code-block large">
                <pre>{stateComparisonCode}</pre>
              </div>

              <div className="state-comparison-grid">
                <div className="state-panel">
                  <h4>函数组件 - useState</h4>
                  <div className="state-features">
                    <div className="state-feature">
                      <div className="feature-icon">📦</div>
                      <div className="feature-text">
                        <strong>多个状态分离</strong>
                        <p>每个状态独立管理，不会互相影响</p>
                        <code>useState(0), useState('')...</code>
                      </div>
                    </div>
                    <div className="state-feature">
                      <div className="feature-icon">🔄</div>
                      <div className="feature-text">
                        <strong>更新方式</strong>
                        <p>直接替换，不会合并</p>
                        <code>setState(newValue)</code>
                      </div>
                    </div>
                    <div className="state-feature">
                      <div className="feature-icon">⚡</div>
                      <div className="feature-text">
                        <strong>函数式更新</strong>
                        <p>基于前一个状态更新</p>
                        <code>setState(prev =&gt; prev + 1)</code>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="state-panel">
                  <h4>类组件 - this.setState</h4>
                  <div className="state-features">
                    <div className="state-feature">
                      <div className="feature-icon">📦</div>
                      <div className="feature-text">
                        <strong>集中管理</strong>
                        <p>所有状态在一个对象中</p>
                        <code>this.state = &#123; ... &#125;</code>
                      </div>
                    </div>
                    <div className="state-feature">
                      <div className="feature-icon">🔄</div>
                      <div className="feature-text">
                        <strong>更新方式</strong>
                        <p>自动合并到现有状态</p>
                        <code>this.setState(&#123; count: 1 &#125;)</code>
                      </div>
                    </div>
                    <div className="state-feature">
                      <div className="feature-icon">⚡</div>
                      <div className="feature-text">
                        <strong>异步更新</strong>
                        <p>setState 是异步的</p>
                        <code>setState(&#123; &#125;, callback)</code>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="conclusion">
                <strong>结论:</strong> useState 更灵活，每个状态独立。setState 自动合并，适合复杂对象。
              </div>
            </div>
          )}

          {/* 场景4: 性能对比 */}
          {activeTest === 'performance' && (
            <div className="test-case">
              <h3>场景4: 性能与优化</h3>
              
              <div className="performance-grid">
                <div className="perf-card">
                  <h4>函数组件优化</h4>
                  <div className="code-block">
                    <pre>{`// React.memo - 防止不必要的渲染
const MemoComponent = React.memo(function Component({ value }) {
  return <div>{value}</div>;
});

// useCallback - 缓存函数
const handleClick = useCallback(() => {
  console.log('点击');
}, []);

// useMemo - 缓存计算值
const expensiveValue = useMemo(() => {
  return computeExpensiveValue(a, b);
}, [a, b]);

// 优势：
// ✅ 更细粒度的优化
// ✅ 可以针对性优化
// ✅ Hooks 组合能力强`}</pre>
                  </div>
                </div>

                <div className="perf-card">
                  <h4>类组件优化</h4>
                  <div className="code-block">
                    <pre>{`// shouldComponentUpdate - 控制渲染
class Component extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.value !== this.props.value;
  }
}

// PureComponent - 自动浅比较
class Component extends React.PureComponent {
  // 自动进行 props 和 state 的浅比较
}

// 优势：
// ✅ 清晰的优化点
// ✅ PureComponent 开箱即用
// ⚠️ 浅比较可能不够用`}</pre>
                  </div>
                </div>
              </div>

              <div className="perf-summary">
                <h4>性能对比总结</h4>
                <table className="perf-table">
                  <thead>
                    <tr>
                      <th>方面</th>
                      <th>函数组件</th>
                      <th>类组件</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>初始化开销</td>
                      <td className="good">✅ 更小（无类实例）</td>
                      <td className="bad">⚠️ 较大（类实例）</td>
                    </tr>
                    <tr>
                      <td>内存占用</td>
                      <td className="good">✅ 更少</td>
                      <td className="bad">⚠️ 较多</td>
                    </tr>
                    <tr>
                      <td>渲染性能</td>
                      <td className="neutral">相当</td>
                      <td className="neutral">相当</td>
                    </tr>
                    <tr>
                      <td>优化手段</td>
                      <td className="good">memo, useMemo, useCallback</td>
                      <td className="neutral">shouldComponentUpdate, PureComponent</td>
                    </tr>
                    <tr>
                      <td>代码复用</td>
                      <td className="good">✅ 自定义 Hooks</td>
                      <td className="bad">⚠️ HOC, Render Props</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="conclusion">
                <strong>结论:</strong> 函数组件在初始化和内存方面有优势，且通过 Hooks 提供了更灵活的优化方式。
              </div>
            </div>
          )}
        </div>
      </section>

      {/* createClass 详解 */}
      <section className="section">
        <h2>🕰️ React.createClass（历史回顾）</h2>
        <div className="createclass-info">
          <div className="info-panel">
            <h4>为什么被废弃？</h4>
            <ul>
              <li>ES6 class 语法更标准</li>
              <li>需要额外的 create-react-class 包</li>
              <li>不符合现代 JavaScript 趋势</li>
              <li>函数组件 + Hooks 更强大</li>
            </ul>
          </div>
          <div className="code-panel-full">
            <div className="code-block">
              <pre>{createClassCode}</pre>
            </div>
          </div>
        </div>
        <div className="warning-box">
          <div className="warning-icon">⚠️</div>
          <div className="warning-content">
            <strong>注意：</strong>React.createClass 在 React 15.5 中被废弃，React 16+ 需要安装 
            <code>create-react-class</code> 包才能使用。新项目不应该使用这种方式。
          </div>
        </div>
      </section>

      {/* 详细对比表 */}
      <section className="section">
        <h2>📊 详细对比表</h2>
        <div className="comparison-table-wrapper">
          <table className="comparison-table">
            <thead>
              <tr>
                <th>特性</th>
                <th>函数组件</th>
                <th>createClass</th>
                <th>Class Component</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>定义方式</td>
                <td><code>function Comp() &#123;&#125;</code></td>
                <td><code>React.createClass(&#123;&#125;)</code></td>
                <td><code>class Comp extends React.Component</code></td>
              </tr>
              <tr>
                <td>状态管理</td>
                <td><code>useState</code></td>
                <td><code>getInitialState()</code></td>
                <td><code>this.state</code></td>
              </tr>
              <tr>
                <td>更新状态</td>
                <td><code>setState(newValue)</code></td>
                <td><code>this.setState(&#123;&#125;)</code></td>
                <td><code>this.setState(&#123;&#125;)</code></td>
              </tr>
              <tr>
                <td>Props 默认值</td>
                <td><code>defaultProps</code></td>
                <td><code>getDefaultProps()</code></td>
                <td><code>defaultProps</code></td>
              </tr>
              <tr>
                <td>this 绑定</td>
                <td>❌ 无需（无 this）</td>
                <td>✅ 自动绑定</td>
                <td>⚠️ 需手动绑定</td>
              </tr>
              <tr>
                <td>生命周期</td>
                <td><code>useEffect</code></td>
                <td>生命周期方法</td>
                <td>生命周期方法</td>
              </tr>
              <tr>
                <td>支持 Hooks</td>
                <td>✅ 完全支持</td>
                <td>❌ 不支持</td>
                <td>❌ 不支持</td>
              </tr>
              <tr>
                <td>代码复用</td>
                <td>✅ 自定义 Hooks</td>
                <td>✅ Mixins</td>
                <td>⚠️ HOC/Render Props</td>
              </tr>
              <tr>
                <td>性能优化</td>
                <td><code>React.memo, useMemo</code></td>
                <td>shouldComponentUpdate</td>
                <td><code>shouldComponentUpdate</code></td>
              </tr>
              <tr>
                <td>TypeScript</td>
                <td>✅ 友好</td>
                <td>❌ 较差</td>
                <td>✅ 友好</td>
              </tr>
              <tr>
                <td>当前状态</td>
                <td className="good">✅ 推荐使用</td>
                <td className="bad">❌ 已废弃</td>
                <td className="neutral">⚠️ 仍支持</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* this 绑定问题 */}
      <section className="section">
        <h2>🔗 this 绑定问题</h2>
        <div className="this-binding-grid">
          <div className="binding-card">
            <h4>函数组件 - 无 this</h4>
            <div className="code-block">
              <pre>{`function Component() {
  const [count, setCount] = useState(0);
  
  // ✅ 无需关心 this
  const handleClick = () => {
    setCount(count + 1);
  };
  
  return <button onClick={handleClick}>+</button>;
}`}</pre>
            </div>
            <div className="binding-note good">
              ✅ 完全没有 this 困扰
            </div>
          </div>

          <div className="binding-card">
            <h4>createClass - 自动绑定</h4>
            <div className="code-block">
              <pre>{`const Component = React.createClass({
  handleClick() {
    // ✅ this 自动绑定到组件实例
    this.setState({ count: this.state.count + 1 });
  },
  
  render() {
    return <button onClick={this.handleClick}>+</button>;
  }
});`}</pre>
            </div>
            <div className="binding-note good">
              ✅ 自动绑定 this（但已废弃）
            </div>
          </div>

          <div className="binding-card">
            <h4>类组件 - 需要手动绑定</h4>
            <div className="code-block">
              <pre>{`class Component extends React.Component {
  constructor(props) {
    super(props);
    // 方式1: 在 constructor 中绑定
    this.handleClick1 = this.handleClick1.bind(this);
  }
  
  handleClick1() {
    this.setState({ count: this.state.count + 1 });
  }
  
  // 方式2: 使用箭头函数（推荐）
  handleClick2 = () => {
    this.setState({ count: this.state.count + 1 });
  }
  
  render() {
    return (
      <>
        <button onClick={this.handleClick1}>+</button>
        <button onClick={this.handleClick2}>+</button>
        {/* 方式3: 在 JSX 中绑定（不推荐） */}
        <button onClick={this.handleClick1.bind(this)}>+</button>
        <button onClick={() => this.handleClick1()}>+</button>
      </>
    );
  }
}`}</pre>
            </div>
            <div className="binding-note warning">
              ⚠️ 需要手动绑定，否则 this 为 undefined
            </div>
          </div>
        </div>
      </section>

      {/* 使用建议 */}
      <section className="section">
        <h2>💡 使用建议</h2>
        <div className="recommendations">
          <div className="recommendation-card priority-1">
            <div className="priority-badge">首选</div>
            <h3>函数组件 + Hooks</h3>
            <div className="recommendation-content">
              <div className="when-use">
                <strong>适用场景：</strong>
                <ul>
                  <li>✅ 所有新项目</li>
                  <li>✅ 需要状态和副作用的组件</li>
                  <li>✅ 需要复用逻辑（自定义 Hooks）</li>
                  <li>✅ 性能敏感的场景</li>
                </ul>
              </div>
              <div className="code-example-small">
                <code>React 16.8+ 推荐方式</code>
              </div>
            </div>
          </div>

          <div className="recommendation-card priority-2">
            <div className="priority-badge">次选</div>
            <h3>ES6 类组件</h3>
            <div className="recommendation-content">
              <div className="when-use">
                <strong>适用场景：</strong>
                <ul>
                  <li>⚠️ 维护老项目</li>
                  <li>⚠️ 需要错误边界（Error Boundary）</li>
                  <li>⚠️ 团队不熟悉 Hooks</li>
                  <li>⚠️ 需要完整生命周期控制</li>
                </ul>
              </div>
              <div className="code-example-small">
                <code>仍然支持，但不推荐新项目使用</code>
              </div>
            </div>
          </div>

          <div className="recommendation-card priority-3">
            <div className="priority-badge">废弃</div>
            <h3>React.createClass</h3>
            <div className="recommendation-content">
              <div className="when-use">
                <strong>适用场景：</strong>
                <ul>
                  <li>❌ 不应用于新项目</li>
                  <li>⚠️ 仅用于维护 React 15- 的老项目</li>
                  <li>⚠️ 需要迁移到函数组件或类组件</li>
                </ul>
              </div>
              <div className="code-example-small">
                <code>React 16+ 已完全移除</code>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 迁移指南 */}
      <section className="section">
        <h2>🔄 迁移指南</h2>
        <div className="migration-guide">
          <div className="migration-path">
            <div className="migration-step">
              <div className="step-number">1</div>
              <div className="step-content">
                <h4>createClass → Class Component</h4>
                <div className="migration-example">
                  <div className="before">
                    <strong>迁移前：</strong>
                    <div className="code-block small">
                      <pre>{`const Counter = React.createClass({
  getInitialState() {
    return { count: 0 };
  },
  handleClick() {
    this.setState({ count: this.state.count + 1 });
  },
  render() {
    return <button onClick={this.handleClick}>
      {this.state.count}
    </button>;
  }
});`}</pre>
                    </div>
                  </div>
                  <div className="arrow">→</div>
                  <div className="after">
                    <strong>迁移后：</strong>
                    <div className="code-block small">
                      <pre>{`class Counter extends React.Component {
  state = { count: 0 };
  
  handleClick = () => {
    this.setState({ count: this.state.count + 1 });
  }
  
  render() {
    return <button onClick={this.handleClick}>
      {this.state.count}
    </button>;
  }
}`}</pre>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="migration-step">
              <div className="step-number">2</div>
              <div className="step-content">
                <h4>Class Component → Function Component</h4>
                <div className="migration-example">
                  <div className="before">
                    <strong>迁移前：</strong>
                    <div className="code-block small">
                      <pre>{`class Counter extends React.Component {
  state = { count: 0 };
  
  componentDidMount() {
    console.log('挂载');
  }
  
  handleClick = () => {
    this.setState({ count: this.state.count + 1 });
  }
  
  render() {
    return <button onClick={this.handleClick}>
      {this.state.count}
    </button>;
  }
}`}</pre>
                    </div>
                  </div>
                  <div className="arrow">→</div>
                  <div className="after">
                    <strong>迁移后：</strong>
                    <div className="code-block small">
                      <pre>{`function Counter() {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    console.log('挂载');
  }, []);
  
  const handleClick = () => {
    setCount(count + 1);
  };
  
  return <button onClick={handleClick}>
    {count}
  </button>;
}`}</pre>
                    </div>
                  </div>
                </div>
              </div>
            </div>
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
              <h4>优先使用函数组件</h4>
              <p>React 16.8+ 引入 Hooks 后，函数组件可以完全替代类组件，且更简洁、性能更好</p>
            </div>
          </div>
          <div className="point-card">
            <div className="point-number">2</div>
            <div className="point-content">
              <h4>createClass 已成历史</h4>
              <p>React.createClass 在 React 16+ 完全移除，仅在维护老项目时会遇到</p>
            </div>
          </div>
          <div className="point-card">
            <div className="point-number">3</div>
            <div className="point-content">
              <h4>类组件仍然有效</h4>
              <p>类组件仍被支持，且是唯一能实现错误边界（Error Boundary）的方式</p>
            </div>
          </div>
          <div className="point-card">
            <div className="point-number">4</div>
            <div className="point-content">
              <h4>Hooks 是未来趋势</h4>
              <p>React 官方推荐使用 Hooks，未来的新特性会优先支持函数组件</p>
            </div>
          </div>
        </div>
      </section>

      {/* 错误边界说明 */}
      <section className="section">
        <h2>🛡️ 错误边界（仅类组件支持）</h2>
        <div className="error-boundary-info">
          <div className="info-text">
            <p>
              <strong>注意：</strong>目前只有类组件可以定义错误边界。
              函数组件暂时无法捕获子组件的错误。
            </p>
          </div>
          <div className="code-block large">
            <pre>{`// 错误边界必须使用类组件
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    // 更新 state 使下一次渲染能够显示降级后的 UI
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // 可以将错误日志上报给服务器
    console.error('捕获到错误:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <h1>出错了: {this.state.error.message}</h1>;
    }

    return this.props.children;
  }
}

// 使用
function App() {
  return (
    <ErrorBoundary>
      <MyComponent />
    </ErrorBoundary>
  );
}`}</pre>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ComponentTypes;

