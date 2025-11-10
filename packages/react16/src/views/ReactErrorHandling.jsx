import React, { useState, useEffect, useCallback } from 'react';
import './ReactErrorHandling.css';

// ============ 场景1: Error Boundary - 类组件错误边界 ============
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      hasError: false, 
      error: null,
      errorInfo: null
    };
  }

  static getDerivedStateFromError(error) {
    // 更新 state，下一次渲染展示降级 UI
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // 记录错误到错误报告服务
    console.error('Error caught by boundary:', error);
    console.error('Error info:', errorInfo);
    this.setState({ error, errorInfo });
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="error-fallback">
          <h3>😢 出现了错误！</h3>
          <p>组件渲染时发生了错误</p>
          <button onClick={() => this.setState({ hasError: false, error: null })}>
            重试
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

// 会抛出错误的组件
class BuggyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = { throwError: false };
  }

  render() {
    if (this.state.throwError) {
      throw new Error('这是一个测试错误！');
    }

    return (
      <div className="buggy-component">
        <h5>BuggyComponent</h5>
        <button onClick={() => this.setState({ throwError: true })}>
          触发错误
        </button>
      </div>
    );
  }
}

function ErrorBoundaryDemo() {
  return (
    <div className="communication-demo">
      <h4>Error Boundary - 错误边界</h4>
      <ErrorBoundary>
        <BuggyComponent />
      </ErrorBoundary>
      <p className="tip">点击按钮触发错误，查看错误边界如何处理</p>
    </div>
  );
}

// ============ 场景2: 自定义错误边界 - 带重试功能 ============
class RetryErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, errorCount: 0 };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught:', error);
  }

  handleRetry = () => {
    this.setState(prev => ({ 
      hasError: false, 
      errorCount: prev.errorCount + 1 
    }));
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-fallback retry">
          <h3>⚠️ 出错了</h3>
          <p>重试次数: {this.state.errorCount}</p>
          <button onClick={this.handleRetry}>重试</button>
        </div>
      );
    }

    return this.props.children;
  }
}

function RetryBoundaryDemo() {
  const [key, setKey] = useState(0);

  const resetComponent = () => {
    setKey(prev => prev + 1);
  };

  return (
    <div className="communication-demo">
      <h4>自定义错误边界 - 重试功能</h4>
      <RetryErrorBoundary>
        <BuggyComponent key={key} />
      </RetryErrorBoundary>
      <button onClick={resetComponent} className="reset-btn">
        重置组件
      </button>
      <p className="tip">错误边界可以捕获子组件错误并提供重试机制</p>
    </div>
  );
}

// ============ 场景3: 事件处理器错误捕获 ============
function EventErrorDemo() {
  const [logs, setLogs] = useState([]);

  const handleAsyncError = async () => {
    try {
      // 模拟异步操作
      await new Promise(resolve => setTimeout(resolve, 500));
      throw new Error('异步操作失败');
    } catch (error) {
      setLogs(prev => [...prev, `捕获到错误: ${error.message}`]);
      console.error('Async error caught:', error);
    }
  };

  const handleSyncError = () => {
    try {
      throw new Error('同步操作失败');
    } catch (error) {
      setLogs(prev => [...prev, `捕获到错误: ${error.message}`]);
      console.error('Sync error caught:', error);
    }
  };

  const handleUnhandledError = () => {
    // 这个错误不会被捕获，需要全局错误处理
    setTimeout(() => {
      throw new Error('未处理的异步错误');
    }, 100);
  };

  return (
    <div className="communication-demo">
      <h4>事件处理器错误捕获</h4>
      <div className="button-group">
        <button onClick={handleSyncError}>同步错误</button>
        <button onClick={handleAsyncError}>异步错误</button>
        <button onClick={handleUnhandledError}>未处理错误</button>
      </div>
      <div className="logs-container">
        <h5>错误日志：</h5>
        {logs.length === 0 ? (
          <p className="no-logs">暂无错误</p>
        ) : (
          logs.map((log, index) => (
            <div key={index} className="log-item">
              {log}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

// ============ 场景4: useEffect 错误处理 ============
function EffectErrorDemo() {
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  useEffect(() => {
    // 模拟数据获取
    const fetchData = async () => {
      try {
        // 模拟可能失败的操作
        const shouldFail = Math.random() > 0.5;
        if (shouldFail) {
          throw new Error('数据获取失败');
        }
        setData({ message: '数据加载成功' });
        setError(null);
      } catch (err) {
        setError(err.message);
        setData(null);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="communication-demo">
      <h4>useEffect 错误处理</h4>
      {error ? (
        <div className="error-state">
          <p className="error-message">❌ {error}</p>
          <button onClick={() => window.location.reload()}>刷新重试</button>
        </div>
      ) : data ? (
        <div className="success-state">
          <p className="success-message">✅ {data.message}</p>
        </div>
      ) : (
        <div className="loading-state">
          <p>加载中...</p>
        </div>
      )}
      <p className="tip">useEffect 中的错误需要通过 try-catch 捕获</p>
    </div>
  );
}

// ============ 场景5: Promise 错误捕获 ============
function PromiseErrorDemo() {
  const [status, setStatus] = useState('pending');

  const handlePromiseError = () => {
    Promise.resolve()
      .then(() => {
        throw new Error('Promise 链中的错误');
      })
      .catch(error => {
        setStatus(`错误: ${error.message}`);
        console.error('Promise error:', error);
      });
  };

  const handleUnhandledPromise = () => {
    // 这个 Promise 错误不会被自动捕获
    Promise.reject(new Error('未处理的 Promise 错误'));
  };

  return (
    <div className="communication-demo">
      <h4>Promise 错误捕获</h4>
      <div className="button-group">
        <button onClick={handlePromiseError}>捕获 Promise 错误</button>
        <button onClick={handleUnhandledPromise}>未处理 Promise</button>
        <button onClick={() => setStatus('pending')}>重置</button>
      </div>
      <div className="status-display">
        <p>状态: <strong>{status}</strong></p>
      </div>
      <p className="tip">未处理的 Promise 需要全局错误监听器</p>
    </div>
  );
}

// ============ 场景6: 全局错误处理 ============
function GlobalErrorDemo() {
  const [globalError, setGlobalError] = useState(null);

  useEffect(() => {
    // 全局错误处理器
    const handleError = (event) => {
      console.error('Global error:', event.error);
      setGlobalError(event.error.message);
    };

    // 未处理的 Promise 错误
    const handleRejection = (event) => {
      console.error('Unhandled rejection:', event.reason);
      setGlobalError(`Promise 错误: ${event.reason.message || event.reason}`);
    };

    window.addEventListener('error', handleError);
    window.addEventListener('unhandledrejection', handleRejection);

    return () => {
      window.removeEventListener('error', handleError);
      window.removeEventListener('unhandledrejection', handleRejection);
    };
  }, []);

  return (
    <div className="communication-demo">
      <h4>全局错误处理</h4>
      <button onClick={() => {
        // 触发一个全局错误
        throw new Error('这是一个全局错误');
      }}>
        触发全局错误
      </button>
      {globalError && (
        <div className="global-error-display">
          <p className="error-message">捕获到全局错误:</p>
          <p>{globalError}</p>
          <button onClick={() => setGlobalError(null)}>清除</button>
        </div>
      )}
      <p className="tip">全局错误处理器捕获所有未处理的错误</p>
    </div>
  );
}

// 主组件
function ReactErrorHandling() {
  const [activeDemo, setActiveDemo] = useState('concept');

  const demos = [
    { id: 'concept', name: '概念理解' },
    { id: 'boundary', name: 'Error Boundary', component: <ErrorBoundaryDemo /> },
    { id: 'retry', name: '重试边界', component: <RetryBoundaryDemo /> },
    { id: 'event', name: '事件处理', component: <EventErrorDemo /> },
    { id: 'effect', name: 'useEffect', component: <EffectErrorDemo /> },
    { id: 'promise', name: 'Promise', component: <PromiseErrorDemo /> },
    { id: 'global', name: '全局处理', component: <GlobalErrorDemo /> }
  ];

  const demoSections = [
    { id: 'overview', name: '错误处理概述' },
    { id: 'demo', name: '实际应用' },
    { id: 'best-practices', name: '最佳实践' }
  ];

  const [activeSection, setActiveSection] = useState('overview');

  // 代码示例
  const errorHandlingConceptCode = `// React 错误捕获方法总览
// ======================================

// 1. Error Boundary（错误边界）
// 只能捕获子组件树的渲染错误

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // 更新 state，显示降级 UI
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // 记录错误
    console.error('Error:', error);
    console.error('Error Info:', errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <h1>出现错误了</h1>;
    }
    return this.props.children;
  }
}

// 使用
<ErrorBoundary>
  <MyComponent />
</ErrorBoundary>`;

  const boundaryCode = `// Error Boundary - 错误边界
// React 16+ 引入的错误捕获机制

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  // 在渲染前更新 state
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  // 记录错误信息
  componentDidCatch(error, errorInfo) {
    console.error('Error Boundary caught:', error);
    console.error('Component stack:', errorInfo.componentStack);
    
    // 发送错误到日志服务
    logErrorToService(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-fallback">
          <h2>出现了错误</h2>
          <button onClick={() => this.setState({ hasError: false })}>
            重试
          </button>
        </div>
      );
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
}

// 注意事项：
// - 只能捕获子组件树的渲染错误
// - 不能捕获事件处理器错误
// - 不能捕获异步代码错误
// - 不能捕获它自己的错误`;

  const retryCode = `// 错误边界 + 重试功能
class RetryErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, retryCount: 0 };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error:', error);
  }

  handleRetry = () => {
    this.setState(prev => ({ 
      hasError: false, 
      retryCount: prev.retryCount + 1 
    }));
  };

  render() {
    if (this.state.hasError) {
      return (
        <div>
          <p>重试次数: {this.state.retryCount}</p>
          <button onClick={this.handleRetry}>重试</button>
        </div>
      );
    }
    return this.props.children;
  }
}`;

  const eventCode = `// 事件处理器中的错误捕获

function MyComponent() {
  const handleClick = () => {
    try {
      // 同步代码错误
      throw new Error('同步错误');
    } catch (error) {
      console.error('Error in event:', error);
      // 处理错误
    }
  };

  const handleAsync = async () => {
    try {
      // 异步代码错误
      await fetch('/api/data');
      if (!response.ok) {
        throw new Error('API 请求失败');
      }
    } catch (error) {
      console.error('Async error:', error);
      // 处理错误
    }
  };

  return (
    <div>
      <button onClick={handleClick}>同步错误</button>
      <button onClick={handleAsync}>异步错误</button>
    </div>
  );
}

// ⚠️ Error Boundary 不能捕获这些错误！`;

  const effectCode = `// useEffect 中的错误处理
import { useState, useEffect } from 'react';

function DataComponent() {
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('/api/data');
        if (!response.ok) {
          throw new Error('获取数据失败');
        }
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err.message);
        console.error('Fetch error:', err);
      }
    }

    fetchData();
  }, []);

  if (error) {
    return <div>错误: {error}</div>;
  }

  if (!data) {
    return <div>加载中...</div>;
  }

  return <div>{data}</div>;
}`;

  const promiseCode = `// Promise 错误处理

// 1. 使用 .catch()
Promise.resolve()
  .then(() => {
    throw new Error('Promise 错误');
  })
  .catch(error => {
    console.error('Caught:', error);
  });

// 2. async/await + try-catch
async function fetchData() {
  try {
    const response = await fetch('/api/data');
    if (!response.ok) {
      throw new Error('请求失败');
    }
    return await response.json();
  } catch (error) {
    console.error('Error:', error);
    throw error; // 重新抛出
  }
}

// 3. 全局 Promise 错误处理
window.addEventListener('unhandledrejection', event => {
  console.error('Unhandled promise rejection:', event.reason);
  // 发送到日志服务
});

// ⚠️ 未处理的 Promise 会导致全局错误`;

  const globalCode = `// 全局错误处理

function setupGlobalErrorHandlers() {
  // 1. JavaScript 错误
  window.addEventListener('error', (event) => {
    console.error('Global error:', event.error);
    logToService({
      message: event.error.message,
      source: event.filename,
      lineno: event.lineno
    });
  });

  // 2. Promise 错误
  window.addEventListener('unhandledrejection', (event) => {
    console.error('Unhandled rejection:', event.reason);
    logToService({
      type: 'unhandledRejection',
      reason: event.reason
    });
  });
}

// 在应用启动时调用
setupGlobalErrorHandlers();

// React 18+ 在根组件中设置
function App() {
  useEffect(() => {
    const handleError = (event) => {
      console.error('App error:', event.error);
    };
    
    window.addEventListener('error', handleError);
    return () => window.removeEventListener('error', handleError);
  }, []);

  return <MyApp />;
}`;

  return (
    <div className="error-container">
      <button
        className="back-button"
        onClick={() => window.history.back()}
      >
        ← 返回
      </button>

      <div className="page-header">
        <h1>🛡️ React 错误处理</h1>
        <p className="subtitle">全面掌握 React 项目中捕获和处理错误的六种方法</p>
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

      {/* 错误处理概述 */}
      {activeSection === 'overview' && (
        <div className="section">
          <h2>📚 React 错误处理概述</h2>

          <div className="concept-grid">
            <div className="concept-card primary">
              <div className="concept-icon">🎯</div>
              <h3>为什么需要错误处理？</h3>
              <p>
                完善的错误处理机制可以防止整个应用崩溃，提供友好的降级 UI，
                并帮助开发者快速定位和修复问题。
              </p>
            </div>

            <div className="concept-card">
              <div className="concept-icon">⚡</div>
              <h3>错误类型</h3>
              <ul>
                <li>渲染错误</li>
                <li>事件处理器错误</li>
                <li>异步代码错误</li>
                <li>Promise 错误</li>
              </ul>
            </div>

            <div className="concept-card">
              <div className="concept-icon">🛡️</div>
              <h3>处理方法</h3>
              <ul>
                <li>Error Boundary</li>
                <li>try-catch</li>
                <li>Promise.catch</li>
                <li>全局错误监听</li>
              </ul>
            </div>
          </div>

          <div className="code-block large">
            <pre>{errorHandlingConceptCode}</pre>
          </div>

          <div className="error-types">
            <h3>🚨 六种错误处理方法</h3>
            <div className="types-grid">
              <div className="type-card">
                <h4>Error Boundary</h4>
                <p>捕获组件树渲染错误</p>
                <div className="type-features">
                  <span className="feature-tag">类组件</span>
                  <span className="feature-tag">降级 UI</span>
                  <span className="feature-tag">错误日志</span>
                </div>
              </div>

              <div className="type-card">
                <h4>try-catch</h4>
                <p>捕获同步和异步错误</p>
                <div className="type-features">
                  <span className="feature-tag">事件处理</span>
                  <span className="feature-tag">useEffect</span>
                  <span className="feature-tag">灵活</span>
                </div>
              </div>

              <div className="type-card">
                <h4>Promise.catch</h4>
                <p>处理 Promise 链错误</p>
                <div className="type-features">
                  <span className="feature-tag">异步</span>
                  <span className="feature-tag">链式</span>
                  <span className="feature-tag">简洁</span>
                </div>
              </div>

              <div className="type-card">
                <h4>全局错误</h4>
                <p>捕获未处理错误</p>
                <div className="type-features">
                  <span className="feature-tag">兜底方案</span>
                  <span className="feature-tag">监控</span>
                  <span className="feature-tag">上报</span>
                </div>
              </div>

              <div className="type-card">
                <h4>错误降级</h4>
                <p>提供友好的错误 UI</p>
                <div className="type-features">
                  <span className="feature-tag">用户体验</span>
                  <span className="feature-tag">重试</span>
                  <span className="feature-tag">恢复</span>
                </div>
              </div>

              <div className="type-card">
                <h4>错误上报</h4>
                <p>记录和分析错误</p>
                <div className="type-features">
                  <span className="feature-tag">日志</span>
                  <span className="feature-tag">监控</span>
                  <span className="feature-tag">分析</span>
                </div>
              </div>
            </div>
          </div>

          <div className="error-limitations">
            <h3>⚠️ Error Boundary 的限制</h3>
            <div className="limitations-grid">
              <div className="limitation-card">
                <h4>不能捕获</h4>
                <ul>
                  <li>❌ 事件处理器错误</li>
                  <li>❌ 异步代码错误</li>
                  <li>❌ 服务端渲染错误</li>
                  <li>❌ 自身的错误</li>
                </ul>
              </div>

              <div className="limitation-card">
                <h4>能够捕获</h4>
                <ul>
                  <li>✅ 子组件渲染错误</li>
                  <li>✅ 生命周期方法错误</li>
                  <li>✅ 构造函数错误</li>
                </ul>
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
              {activeDemo === 'boundary' && boundaryCode}
              {activeDemo === 'retry' && retryCode}
              {activeDemo === 'event' && eventCode}
              {activeDemo === 'effect' && effectCode}
              {activeDemo === 'promise' && promiseCode}
              {activeDemo === 'global' && globalCode}
            </pre>
          </div>
        </div>
      )}

      {/* 最佳实践 */}
      {activeSection === 'best-practices' && (
        <div className="section">
          <h2>💡 最佳实践</h2>

          <div className="practice-grid">
            <div className="practice-card">
              <h4>1. 在顶层设置 Error Boundary</h4>
              <p>在应用的顶层放置错误边界，防止整个应用崩溃。</p>
              <code>
                {`<ErrorBoundary>
  <App />
</ErrorBoundary>`}
              </code>
            </div>

            <div className="practice-card">
              <h4>2. 关键路由单独保护</h4>
              <p>为每个路由页面设置独立的错误边界，互不影响。</p>
              <code>
                {`<ErrorBoundary>
  <Route path="/page" component={Page} />
</ErrorBoundary>`}
              </code>
            </div>

            <div className="practice-card">
              <h4>3. 事件处理器始终使用 try-catch</h4>
              <p>所有事件处理器都应该包含错误处理逻辑。</p>
              <code>
                {`onClick = async () => {
  try {
    await dangerousOperation();
  } catch (error) {
    handleError(error);
  }
}`}
              </code>
            </div>

            <div className="practice-card">
              <h4>4. Promise 必须处理错误</h4>
              <p>每个 Promise 链都应该有 .catch()，或使用 try-catch。</p>
              <code>
                {`Promise.resolve()
  .then(operation)
  .catch(error => log(error));`}
              </code>
            </div>

            <div className="practice-card">
              <h4>5. 提供错误上报机制</h4>
              <p>集成错误监控服务（如 Sentry），方便定位问题。</p>
              <code>
                {`componentDidCatch(error, errorInfo) {
  logErrorToService(error, errorInfo);
}`}
              </code>
            </div>

            <div className="practice-card">
              <h4>6. 友好的错误 UI</h4>
              <p>提供清晰的错误信息和重试按钮，改善用户体验。</p>
              <code>
                {`<div className="error-ui">
  <h3>出错了</h3>
  <p>请稍后重试</p>
  <button onClick={retry}>重试</button>
</div>`}
              </code>
            </div>

            <div className="practice-card">
              <h4>7. 开发环境详细日志</h4>
              <p>在开发环境输出详细错误信息，生产环境简化。</p>
              <code>
                {`componentDidCatch(error, errorInfo) {
  if (process.env.NODE_ENV === 'development') {
    console.error(error, errorInfo);
  }
  logErrorToService(error, errorInfo);
}`}
              </code>
            </div>

            <div className="practice-card">
              <h4>8. 异步操作统一处理</h4>
              <p>创建统一的异步错误处理函数，避免重复代码。</p>
              <code>
                {`async function safeAsync(fn) {
  try {
    return await fn();
  } catch (error) {
    handleError(error);
    throw error;
  }
}`}
              </code>
            </div>
          </div>

          <div className="error-reporting">
            <h3>📊 错误监控方案</h3>
            <div className="reporting-grid">
              <div className="reporting-card">
                <h4>Sentry</h4>
                <p>强大的错误监控和性能分析平台</p>
                <code>npm install @sentry/react</code>
              </div>

              <div className="reporting-card">
                <h4>LogRocket</h4>
                <p>会话回放和错误追踪</p>
                <code>npm install logrocket</code>
              </div>

              <div className="reporting-card">
                <h4>自建服务</h4>
                <p>集成到自己的日志系统</p>
                 
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ReactErrorHandling;
