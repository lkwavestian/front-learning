import React, { useState } from 'react';
import './HigherOrderComponent.css';

// ============ 场景1: withLogger HOC - 日志记录 ============
function withLogger(WrappedComponent) {
  return class extends React.Component {
    componentDidMount() {
      console.log(`组件 ${WrappedComponent.name} 已挂载`);
    }

    componentDidUpdate() {
      console.log(`组件 ${WrappedComponent.name} 已更新`);
    }

    componentWillUnmount() {
      console.log(`组件 ${WrappedComponent.name} 即将卸载`);
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  };
}

// 普通组件
class SimpleButton extends React.Component {
  render() {
    return (
      <div className="demo-item">
        <h5>SimpleButton (无 HOC)</h5>
        <button onClick={this.props.onClick}>点击我</button>
        <p className="tip">控制台：无生命周期日志</p>
      </div>
    );
  }
}

// 使用 HOC 增强的组件
const LoggedButton = withLogger(class ButtonWithLogger extends React.Component {
  render() {
    return (
      <div className="demo-item">
        <h5>LoggedButton (有 HOC)</h5>
        <button onClick={this.props.onClick}>点击我</button>
        <p className="tip">控制台：有生命周期日志</p>
      </div>
    );
  }
});

function LoggerDemo() {
  const [showWithoutHOC, setShowWithoutHOC] = useState(true);
  const [showWithHOC, setShowWithHOC] = useState(true);

  return (
    <div className="communication-demo">
      <h4>withLogger - 生命周期日志</h4>
      <div className="hoc-demo-container">
        <div className="hoc-demo-item">
          {showWithoutHOC && <SimpleButton onClick={() => alert('SimpleButton 被点击')} />}
          {!showWithoutHOC && <button onClick={() => setShowWithoutHOC(true)}>显示组件</button>}
          <button onClick={() => setShowWithoutHOC(false)} className="action-btn-small">
            卸载组件
          </button>
        </div>
        <div className="hoc-demo-item">
          {showWithHOC && <LoggedButton onClick={() => alert('LoggedButton 被点击')} />}
          {!showWithHOC && <button onClick={() => setShowWithHOC(true)}>显示组件</button>}
          <button onClick={() => setShowWithHOC(false)} className="action-btn-small">
            卸载组件
          </button>
        </div>
      </div>
      <p className="log-hint">打开浏览器控制台查看日志输出</p>
    </div>
  );
}

// ============ 场景2: withAuth HOC - 权限控制 ============
function withAuth(WrappedComponent, requiredRole) {
  return class extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        user: null,
        loading: true
      };
    }

    componentDidMount() {
      // 模拟获取用户信息
      setTimeout(() => {
        this.setState({
          user: { role: 'admin' }, // 可以改为 'guest' 测试
          loading: false
        });
      }, 500);
    }

    render() {
      const { loading, user } = this.state;

      if (loading) {
        return <div className="loading">加载中...</div>;
      }

      if (!user) {
        return <div className="error">请先登录</div>;
      }

      if (user.role !== requiredRole) {
        return (
          <div className="error">
            无权限访问，需要 {requiredRole} 角色
          </div>
        );
      }

      return <WrappedComponent {...this.props} user={user} />;
    }
  };
}

class AdminPanel extends React.Component {
  render() {
    return (
      <div className="demo-item">
        <h5>AdminPanel (需要 admin 权限)</h5>
        <div className="access-granted">
          <p>✅ 欢迎，管理员 {this.props.user.role}！</p>
          <button>管理用户</button>
          <button>系统设置</button>
        </div>
      </div>
    );
  }
}

const ProtectedAdminPanel = withAuth(AdminPanel, 'admin');

function AuthDemo() {
  return (
    <div className="communication-demo">
      <h4>withAuth - 权限控制</h4>
      <ProtectedAdminPanel />
      <p className="tip">尝试在 withAuth 中将 user.role 改为 'guest' 测试权限控制</p>
    </div>
  );
}

// ============ 场景3: withLoading HOC - 加载状态 ============
function withLoading(WrappedComponent) {
  return class extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        loading: false
      };
    }

    setLoading = (loading) => {
      this.setState({ loading });
    };

    render() {
      return (
        <WrappedComponent
          {...this.props}
          loading={this.state.loading}
          setLoading={this.setLoading}
        />
      );
    }
  };
}

class DataFetchComponent extends React.Component {
  async fetchData() {
    this.props.setLoading(true);
    
    // 模拟 API 调用
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    this.props.setLoading(false);
    alert('数据加载完成！');
  }

  render() {
    return (
      <div className="demo-item">
        <h5>DataFetchComponent (带加载状态)</h5>
        <button onClick={() => this.fetchData()}>
          {this.props.loading ? '加载中...' : '获取数据'}
        </button>
        {this.props.loading && (
          <div className="spinner">⏳</div>
        )}
      </div>
    );
  }
}

const LoadingDataComponent = withLoading(DataFetchComponent);

function LoadingDemo() {
  return (
    <div className="communication-demo">
      <h4>withLoading - 加载状态管理</h4>
      <LoadingDataComponent />
    </div>
  );
}

// ============ 场景4: withToggle HOC - 状态增强 ============
function withToggle(WrappedComponent) {
  return class extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        isOn: false
      };
    }

    toggle = () => {
      this.setState(prev => ({ isOn: !prev.isOn }));
    };

    render() {
      return (
        <WrappedComponent
          {...this.props}
          isOn={this.state.isOn}
          toggle={this.toggle}
        />
      );
    }
  };
}

class SwitchButton extends React.Component {
  render() {
    return (
      <div className="demo-item">
        <h5>SwitchButton (带开关状态)</h5>
        <button
          onClick={this.props.toggle}
          className={this.props.isOn ? 'btn-on' : 'btn-off'}
        >
          {this.props.isOn ? 'ON' : 'OFF'}
        </button>
      </div>
    );
  }
}

const ToggleSwitch = withToggle(SwitchButton);

function ToggleDemo() {
  return (
    <div className="communication-demo">
      <h4>withToggle - 状态增强</h4>
      <ToggleSwitch />
      <ToggleSwitch />
    </div>
  );
}

// ============ 场景5: withHover HOC - 鼠标悬停 ============
function withHover(WrappedComponent) {
  return class extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        isHovered: false
      };
    }

    handleMouseEnter = () => {
      this.setState({ isHovered: true });
    };

    handleMouseLeave = () => {
      this.setState({ isHovered: false });
    };

    render() {
      return (
        <div
          onMouseEnter={this.handleMouseEnter}
          onMouseLeave={this.handleMouseLeave}
        >
          <WrappedComponent
            {...this.props}
            isHovered={this.state.isHovered}
          />
        </div>
      );
    }
  };
}

class HoverableCard extends React.Component {
  render() {
    return (
      <div className={`hover-card ${this.props.isHovered ? 'hovered' : ''}`}>
        <h5>{this.props.isHovered ? '🎯 悬停中' : '📄 普通状态'}</h5>
        <p>鼠标移上来试试</p>
      </div>
    );
  }
}

const HoverCard = withHover(HoverableCard);

function HoverDemo() {
  return (
    <div className="communication-demo">
      <h4>withHover - 鼠标悬停</h4>
      <div className="cards-grid">
        <HoverCard />
        <HoverCard />
      </div>
    </div>
  );
}

// 主组件
function HigherOrderComponent() {
  const [activeDemo, setActiveDemo] = useState('concept');

  const demos = [
    { id: 'concept', name: '概念理解' },
    { id: 'logger', name: 'withLogger', component: <LoggerDemo /> },
    { id: 'auth', name: 'withAuth', component: <AuthDemo /> },
    { id: 'loading', name: 'withLoading', component: <LoadingDemo /> },
    { id: 'toggle', name: 'withToggle', component: <ToggleDemo /> },
    { id: 'hover', name: 'withHover', component: <HoverDemo /> }
  ];

  const demoSections = [
    { id: 'overview', name: 'HOC 概述' },
    { id: 'demo', name: '实际应用' },
    { id: 'comparison', name: 'HOC vs Hooks' }
  ];

  const [activeSection, setActiveSection] = useState('overview');

  // 代码示例
  const hocConceptCode = `// 高阶组件 (Higher-Order Component, HOC)
// HOC 是一个函数，接受一个组件作为参数，返回一个新组件

// 最简单的 HOC 示例
function withLogger(WrappedComponent) {
  return class extends React.Component {
    componentDidMount() {
      console.log('组件已挂载');
    }

    render() {
      // 必须返回传入的组件，并传递所有 props
      return <WrappedComponent {...this.props} />;
    }
  };
}

// 使用 HOC
class MyComponent extends React.Component {
  render() {
    return <div>Hello World</div>;
  }
}

const EnhancedComponent = withLogger(MyComponent);

// EnhancedComponent 具有 MyComponent 的所有功能，
// 还额外增加了日志记录功能

// ═══════════════════════════════════════

// HOC 的核心思想
// 1. 不修改原组件，不继承原组件
// 2. 通过组合的方式，为组件添加新功能
// 3. 返回的新组件具有原组件的所有 props
// 4. 可以传递额外的 props 给被包装的组件`;

  const withLoggerCode = `// withLogger - 生命周期日志记录
function withLogger(WrappedComponent) {
  return class extends React.Component {
    componentDidMount() {
      console.log(\`组件 \${WrappedComponent.name} 已挂载\`);
    }

    componentDidUpdate() {
      console.log(\`组件 \${WrappedComponent.name} 已更新\`);
    }

    componentWillUnmount() {
      console.log(\`组件 \${WrappedComponent.name} 即将卸载\`);
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  };
}

// 使用
class MyButton extends React.Component {
  render() {
    return <button onClick={this.props.onClick}>点击我</button>;
  }
}

const LoggedButton = withLogger(MyButton);

// LoggedButton 现在会自动记录生命周期日志`;

  const withAuthCode = `// withAuth - 权限控制
function withAuth(WrappedComponent, requiredRole) {
  return class extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        user: null,
        loading: true
      };
    }

    componentDidMount() {
      // 获取用户信息
      fetch('/api/user')
        .then(res => res.json())
        .then(user => {
          this.setState({ user, loading: false });
        });
    }

    render() {
      const { loading, user } = this.state;

      if (loading) {
        return <div>加载中...</div>;
      }

      if (!user) {
        return <div>请先登录</div>;
      }

      // 权限检查
      if (user.role !== requiredRole) {
        return <div>无权限访问</div>;
      }

      // 有权限，渲染原组件
      return <WrappedComponent {...this.props} user={user} />;
    }
  };
}

// 使用
class AdminPanel extends React.Component {
  render() {
    return <div>管理员面板</div>;
  }
}

// 需要 admin 权限才能访问
const ProtectedAdminPanel = withAuth(AdminPanel, 'admin');`;

  const withLoadingCode = `// withLoading - 加载状态管理
function withLoading(WrappedComponent) {
  return class extends React.Component {
    constructor(props) {
      super(props);
      this.state = { loading: false };
    }

    setLoading = (loading) => {
      this.setState({ loading });
    };

    render() {
      return (
        <WrappedComponent
          {...this.props}
          loading={this.state.loading}
          setLoading={this.setLoading}
        />
      );
    }
  };
}

// 使用
class DataFetchComponent extends React.Component {
  async fetchData() {
    this.props.setLoading(true);
    await fetch('/api/data');
    this.props.setLoading(false);
  }

  render() {
    return (
      <div>
        <button onClick={() => this.fetchData()}>
          {this.props.loading ? '加载中...' : '获取数据'}
        </button>
      </div>
    );
  }
}

const LoadingComponent = withLoading(DataFetchComponent);`;

  const withToggleCode = `// withToggle - 开关状态增强
function withToggle(WrappedComponent) {
  return class extends React.Component {
    constructor(props) {
      super(props);
      this.state = { isOn: false };
    }

    toggle = () => {
      this.setState(prev => ({ isOn: !prev.isOn }));
    };

    render() {
      return (
        <WrappedComponent
          {...this.props}
          isOn={this.state.isOn}
          toggle={this.toggle}
        />
      );
    }
  };
}

// 使用
class SwitchButton extends React.Component {
  render() {
    return (
      <button onClick={this.props.toggle}>
        {this.props.isOn ? 'ON' : 'OFF'}
      </button>
    );
  }
}

const ToggleSwitch = withToggle(SwitchButton);`;

  const withHoverCode = `// withHover - 鼠标悬停状态
function withHover(WrappedComponent) {
  return class extends React.Component {
    constructor(props) {
      super(props);
      this.state = { isHovered: false };
    }

    handleMouseEnter = () => {
      this.setState({ isHovered: true });
    };

    handleMouseLeave = () => {
      this.setState({ isHovered: false });
    };

    render() {
      return (
        <div
          onMouseEnter={this.handleMouseEnter}
          onMouseLeave={this.handleMouseLeave}
        >
          <WrappedComponent
            {...this.props}
            isHovered={this.state.isHovered}
          />
        </div>
      );
    }
  };
}

// 使用
class HoverableCard extends React.Component {
  render() {
    return (
      <div className={this.props.isHovered ? 'hovered' : ''}>
        <h3>卡片</h3>
      </div>
    );
  }
}

const HoverCard = withHover(HoverableCard);`;

  return (
    <div className="hoc-container">
      <button
        className="back-button"
        onClick={() => window.history.back()}
      >
        ← 返回
      </button>

      <div className="page-header">
        <h1>🔧 React 高阶组件 (HOC)</h1>
        <p className="subtitle">深入理解高阶组件的概念、实现与实际应用场景</p>
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

      {/* HOC 概述 */}
      {activeSection === 'overview' && (
        <div className="section">
          <h2>📚 什么是高阶组件？</h2>

          <div className="concept-grid">
            <div className="concept-card primary">
              <div className="concept-icon">🎯</div>
              <h3>定义</h3>
              <p>
                高阶组件（HOC）是 React 中用于复用组件逻辑的高级技术。
                HOC 是一个函数，接受一个组件作为参数，返回一个新的增强组件。
              </p>
            </div>

            <div className="concept-card">
              <div className="concept-icon">⚡</div>
              <h3>特点</h3>
              <ul>
                <li>✅ 不修改原组件</li>
                <li>✅ 通过组合添加功能</li>
                <li>✅ 返回新的增强组件</li>
                <li>✅ 可以多层嵌套</li>
              </ul>
            </div>

            <div className="concept-card">
              <div className="concept-icon">🎨</div>
              <h3>优势</h3>
              <ul>
                <li>代码复用性强</li>
                <li>逻辑分离清晰</li>
                <li>组件职责单一</li>
                <li>易于测试维护</li>
              </ul>
            </div>
          </div>

          <div className="code-block large">
            <pre>{hocConceptCode}</pre>
          </div>

          <div className="use-cases">
            <h3>🚀 常见使用场景</h3>
            <div className="use-case-grid">
              <div className="use-case-card">
                <h4>权限控制</h4>
                <p>根据用户角色控制组件渲染</p>
                <code>withAuth(Component, 'admin')</code>
              </div>
              
              <div className="use-case-card">
                <h4>数据加载</h4>
                <p>统一管理加载状态</p>
                <code>withLoading(Component)</code>
              </div>
              
              <div className="use-case-card">
                <h4>日志记录</h4>
                <p>自动记录组件生命周期</p>
                <code>withLogger(Component)</code>
              </div>
              
              <div className="use-case-card">
                <h4>状态增强</h4>
                <p>为组件添加通用状态</p>
                <code>withToggle(Component)</code>
              </div>
              
              <div className="use-case-card">
                <h4>事件处理</h4>
                <p>统一处理鼠标事件</p>
                <code>withHover(Component)</code>
              </div>
              
              <div className="use-case-card">
                <h4>样式注入</h4>
                <p>动态注入样式</p>
                <code>withStyles(Component)</code>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 实际应用 */}
      {activeSection === 'demo' && (
        <div className="section">
          <h2>🎮 实际应用演示</h2>

          {/* 演示切换按钮 */}
          <div className="demo-switch">
            {demos.slice(1).map(demo => (
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
              {activeDemo === 'logger' && withLoggerCode}
              {activeDemo === 'auth' && withAuthCode}
              {activeDemo === 'loading' && withLoadingCode}
              {activeDemo === 'toggle' && withToggleCode}
              {activeDemo === 'hover' && withHoverCode}
            </pre>
          </div>
        </div>
      )}

      {/* HOC vs Hooks */}
      {activeSection === 'comparison' && (
        <div className="section">
          <h2>⚖️ HOC vs Hooks</h2>

          <div className="comparison-grid">
            <div className="comparison-card">
              <h3>🔧 高阶组件 (HOC)</h3>
              <div className="pros-cons">
                <div className="pros">
                  <h4>✅ 优势</h4>
                  <ul>
                    <li>在 Hooks 之前的标准方案</li>
                    <li>逻辑复用性强</li>
                    <li>适用于类组件</li>
                    <li>易于理解概念</li>
                  </ul>
                </div>
                <div className="cons">
                  <h4>❌ 劣势</h4>
                  <ul>
                    <li>嵌套地狱 (HOC Hell)</li>
                    <li>只能作用于类组件</li>
                    <li>Props 冲突问题</li>
                    <li>调试困难</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="comparison-card">
              <h3>🪝 Hooks</h3>
              <div className="pros-cons">
                <div className="pros">
                  <h4>✅ 优势</h4>
                  <ul>
                    <li>无嵌套问题</li>
                    <li>适用于函数组件</li>
                    <li>逻辑更清晰</li>
                    <li>易于调试测试</li>
                  </ul>
                </div>
                <div className="cons">
                  <h4>❌ 劣势</h4>
                  <ul>
                    <li>需要理解 Hooks 规则</li>
                    <li>函数组件限制</li>
                    <li>学习曲线陡峭</li>
                    <li>错误处理复杂</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="migration-guide">
            <h3>📖 HOC 迁移到 Hooks</h3>
            <div className="migration-example">
              <div className="migration-before">
                <h4>HOC 方式</h4>
                <pre>{`// withToggle HOC
function withToggle(Component) {
  return class extends React.Component {
    state = { isOn: false };
    toggle = () => this.setState(prev => ({ isOn: !prev.isOn }));
    render() {
      return (
        <Component
          {...this.props}
          isOn={this.state.isOn}
          toggle={this.toggle}
        />
      );
    }
  };
}

const EnhancedButton = withToggle(Button);`}</pre>
              </div>
              
              <div className="migration-arrow">➡️</div>
              
              <div className="migration-after">
                <h4>Hooks 方式</h4>
                <pre>{`// useToggle Hook
function useToggle(initialValue = false) {
  const [isOn, setIsOn] = useState(initialValue);
  const toggle = useCallback(() => setIsOn(prev => !prev), []);
  return [isOn, toggle];
}

// 使用
function Button() {
  const [isOn, toggle] = useToggle();
  return <button onClick={toggle}>{isOn ? 'ON' : 'OFF'}</button>;
}`}</pre>
              </div>
            </div>
          </div>

          <div className="best-practices">
            <h3>💡 最佳实践</h3>
            <div className="practice-grid">
              <div className="practice-card">
                <h4>1. HOC 命名规范</h4>
                <p>HOC 函数名使用 `with` 前缀，如 `withAuth`、`withLoading`。</p>
              </div>

              <div className="practice-card">
                <h4>2. 传递所有 Props</h4>
                <p>使用展开运算符传递所有 props：`<WrappedComponent {...this.props} />`。</p>
              </div>

              <div className="practice-card">
                <h4>3. 保留 Display Name</h4>
                <p>设置 HOC 的 displayName 便于调试：`EnhancedComponent.displayName = 'withAuth(Component)'`。</p>
              </div>

              <div className="practice-card">
                <h4>4. 新项目优先 Hooks</h4>
                <p>新项目推荐使用 Hooks，旧项目 HOC 可逐步迁移到 Hooks。</p>
              </div>

              <div className="practice-card">
                <h4>5. 避免 Props 冲突</h4>
                <p>注意 props 命名，避免与原组件 props 冲突。</p>
              </div>

              <div className="practice-card">
                <h4>6. 不要滥用 HOC</h4>
                <p>只在真正需要复用逻辑时使用 HOC，简单场景用 props 即可。</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default HigherOrderComponent;
