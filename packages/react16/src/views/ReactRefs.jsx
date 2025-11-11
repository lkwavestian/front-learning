import React, { useState, useRef, useEffect, useLayoutEffect, forwardRef, useImperativeHandle, useCallback, memo } from 'react';
import './ReactRefs.css';

// ============ 场景1: 基础 DOM 引用与焦点控制 ============
function BasicRefDemo() {
  const inputRef = useRef(null);
  const countRef = useRef(0);
  const [logs, setLogs] = useState([]);

  const handleFocus = () => {
    countRef.current += 1;
    inputRef.current?.focus();
    setLogs(prev => [...prev, `第 ${countRef.current} 次调用 focus()`]);
  };

  const handleClear = () => {
    if (inputRef.current) {
      inputRef.current.value = '';
      inputRef.current.focus();
      setLogs(prev => [...prev, '输入框已清空']);
    }
  };

  return (
    <div className="ref-demo">
      <h4>基础 DOM 引用</h4>
      <div className="demo-row">
        <label>姓名：</label>
        <input ref={inputRef} placeholder="点击按钮聚焦输入" />
      </div>
      <div className="demo-actions">
        <button onClick={handleFocus}>focus()</button>
        <button onClick={handleClear}>clear()</button>
      </div>
      <div className="demo-log">
        <h5>操作日志</h5>
        {logs.length === 0 ? (
          <p className="no-log">暂无操作</p>
        ) : (
          logs.map((item, index) => (
            <div key={index} className="log-item">{item}</div>
          ))
        )}
      </div>
      <p className="tip">useRef 保存的 current 在整个组件生命周期内保持引用</p>
    </div>
  );
}

// ============ 场景2: 回调 Ref 监听真实节点 ============
function CallbackRefDemo() {
  const [nodeSize, setNodeSize] = useState({ width: 0, height: 0 });
  const [color, setColor] = useState('#2ecc71');

  const boxRef = useCallback(node => {
    if (node) {
      const { width, height } = node.getBoundingClientRect();
      setNodeSize({ width: Math.round(width), height: Math.round(height) });
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setColor(prev => (prev === '#2ecc71' ? '#3498db' : '#2ecc71'));
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="ref-demo">
      <h4>回调 ref</h4>
      <div
        className="callback-box"
        ref={boxRef}
        style={{ backgroundColor: color }}
      >
        <span>观察容器尺寸</span>
      </div>
      <div className="stats">
        <p>当前宽度：{nodeSize.width}px</p>
        <p>当前高度：{nodeSize.height}px</p>
      </div>
      <p className="tip">回调 ref 可以拿到最新 DOM 节点，并处理动态变化</p>
    </div>
  );
}

// ============ 场景3: forwardRef 透传引用 ============
const FancyInput = forwardRef(({ label, placeholder }, ref) => {
  return (
    <div className="fancy-input">
      <label>{label}</label>
      <input ref={ref} placeholder={placeholder} />
    </div>
  );
});

function ForwardRefDemo() {
  const inputRef = useRef(null);
  const [message, setMessage] = useState('');

  const handleFocus = () => {
    inputRef.current?.focus();
    setMessage('父组件通过 ref 聚焦了子输入框');
  };

  return (
    <div className="ref-demo">
      <h4>forwardRef - 透传引用</h4>
      <FancyInput ref={inputRef} label="邮箱" placeholder="父组件控制焦点" />
      <button onClick={handleFocus} className="primary">
        获取焦点
      </button>
      {message && <p className="tip">{message}</p>}
    </div>
  );
}

// ============ 场景4: useImperativeHandle 暴露自定义方法 ============
const ImperativeForm = forwardRef((props, ref) => {
  const [value, setValue] = useState('');
  const [submitMessage, setSubmitMessage] = useState('');
  const inputRef = useRef(null);

  useImperativeHandle(ref, () => ({
    focus: () => {
      inputRef.current?.focus();
    },
    reset: () => {
      setValue('');
      setSubmitMessage('');
      inputRef.current?.focus();
    },
    submit: () => {
      if (!value.trim()) {
        setSubmitMessage('请填写内容再提交');
        return false;
      }
      setSubmitMessage(`已提交: ${value}`);
      return true;
    }
  }), [value]);

  return (
    <div className="imperative-form">
      <input
        ref={inputRef}
        value={value}
        onChange={e => setValue(e.target.value)}
        placeholder="父组件可调用 focus/reset/submit"
      />
      <p className="submit-message">{submitMessage}</p>
    </div>
  );
});

function ImperativeHandleDemo() {
  const formRef = useRef(null);
  const [logs, setLogs] = useState([]);

  const appendLog = (text) => setLogs(prev => [...prev, text]);

  return (
    <div className="ref-demo">
      <h4>useImperativeHandle - 暴露实例方法</h4>
      <ImperativeForm ref={formRef} />
      <div className="demo-actions">
        <button onClick={() => { formRef.current?.focus(); appendLog('调用 focus()'); }}>focus()</button>
        <button onClick={() => { formRef.current?.reset(); appendLog('调用 reset()'); }}>reset()</button>
        <button onClick={() => {
          const ok = formRef.current?.submit();
          appendLog(ok ? 'submit() 成功' : 'submit() 失败');
        }}>submit()</button>
      </div>
      <div className="demo-log">
        <h5>父组件调用记录</h5>
        {logs.length === 0 ? <p className="no-log">暂无操作</p> : logs.map((log, index) => (
          <div key={index} className="log-item">{log}</div>
        ))}
      </div>
    </div>
  );
}

// ============ 场景5: useRef 保存数据而不触发渲染 ============
function StableValueDemo() {
  const [count, setCount] = useState(0);
  const prevCount = useRef(count);
  const renderCount = useRef(1);

  useEffect(() => {
    renderCount.current += 1;
    prevCount.current = count;
  });

  return (
    <div className="ref-demo">
      <h4>useRef 保存上一帧数据</h4>
      <p>当前值：{count}</p>
      <p>上一帧：{prevCount.current}</p>
      <p>渲染次数：{renderCount.current}</p>
      <button onClick={() => setCount(prev => prev + 1)} className="primary">
        递增
      </button>
      <p className="tip">useRef 更新 current 不会触发重新渲染</p>
    </div>
  );
}

// ============ 场景6: useRef 与 useLayoutEffect 获取 DOM 布局 ============
function LayoutMeasurementDemo() {
  const boxRef = useRef(null);
  const [size, setSize] = useState({ width: 0, height: 0, top: 0 });

  useLayoutEffect(() => {
    if (boxRef.current) {
      const rect = boxRef.current.getBoundingClientRect();
      setSize({
        width: Math.round(rect.width),
        height: Math.round(rect.height),
        top: Math.round(rect.top)
      });
    }
  }, []);

  return (
    <div className="ref-demo">
      <h4>useLayoutEffect + ref 测量布局</h4>
      <div className="layout-box" ref={boxRef}>
        <span>测量我</span>
      </div>
      <div className="stats">
        <p>宽度：{size.width}px</p>
        <p>高度：{size.height}px</p>
        <p>距顶部：{size.top}px</p>
      </div>
      <p className="tip">useLayoutEffect 确保读取 DOM 布局时尚未绘制</p>
    </div>
  );
}

// ============ 场景7: memo + ref 优化性能 ============
const ExpensiveListItem = memo(
  ({ item, isActive }) => {
    return (
      <li className={isActive ? 'active' : ''}>
        <span>{item.title}</span>
        {isActive && <span className="badge">命中</span>}
      </li>
    );
  },
  (prevProps, nextProps) => prevProps.item === nextProps.item && prevProps.isActive === nextProps.isActive
);

function RefOptimizationDemo() {
  const highlightRef = useRef(1);
  const [items] = useState(() => (
    Array.from({ length: 6 }, (_, i) => ({ id: i + 1, title: `列表项 ${i + 1}` }))
  ));
  const [activeId, setActiveId] = useState(1);

  useEffect(() => {
    highlightRef.current = activeId;
  }, [activeId]);

  return (
    <div className="ref-demo">
      <h4>useRef 保存共享状态</h4>
      <div className="demo-actions">
        {items.map(item => (
          <button
            key={item.id}
            className={item.id === activeId ? 'primary' : ''}
            onClick={() => setActiveId(item.id)}
          >
            高亮 {item.id}
          </button>
        ))}
      </div>
      <ul className="ref-list">
        {items.map(item => (
          <ExpensiveListItem key={item.id} item={item} isActive={item.id === activeId} />
        ))}
      </ul>
      <p className="tip">ref 维护共享命中 ID，memo + isActive 仅让状态变化的列表项重新渲染</p>
    </div>
  );
}

// ===================== 主专题组件 =====================
function ReactRefs() {
  const [activeSection, setActiveSection] = useState('overview');
  const [activeDemo, setActiveDemo] = useState('basic');

  const sections = [
    { id: 'overview', name: '概念概览' },
    { id: 'demo', name: '实战演示' },
    { id: 'best', name: '最佳实践' }
  ];

  const demos = [
    { id: 'basic', name: '基础 DOM 引用', component: <BasicRefDemo /> },
    { id: 'callback', name: '回调 Ref', component: <CallbackRefDemo /> },
    { id: 'forward', name: 'forwardRef', component: <ForwardRefDemo /> },
    { id: 'imperative', name: 'useImperativeHandle', component: <ImperativeHandleDemo /> },
    { id: 'stable', name: '状态持久化', component: <StableValueDemo /> },
    { id: 'layout', name: '布局测量', component: <LayoutMeasurementDemo /> },
    { id: 'optimization', name: '性能优化', component: <RefOptimizationDemo /> }
  ];

  // 代码片段
  const refConceptCode = `// 1. 创建 ref
const inputRef = useRef(null);

// 2. 绑定到 DOM
<input ref={inputRef} />

// 3. 访问真实 DOM
inputRef.current.focus();

// 4. 保存任意可变值（不会触发渲染）
const prevValue = useRef(0);
prevValue.current = value;`;

  const refTypeCode = `// ref 类型

// 1. 字符串 ref (不推荐)
// <input ref="myRef" />

// 2. 回调 ref
<input ref={node => { this.inputNode = node; }} />

// 3. createRef (类组件)
class Demo extends React.Component {
  constructor(props) {
    super(props);
    this.inputRef = React.createRef();
  }

  focusInput = () => {
    this.inputRef.current.focus();
  }

  render() {
    return <input ref={this.inputRef} />;
  }
}

// 4. useRef (函数组件)
function Demo() {
  const inputRef = useRef();
  return <input ref={inputRef} />;
}`;

  const forwardRefCode = `// forwardRef 结合 useImperativeHandle
const CustomInput = forwardRef((props, ref) => {
  const inputRef = useRef(null);

  useImperativeHandle(ref, () => ({
    focus: () => inputRef.current?.focus(),
    value: () => inputRef.current?.value
  }));

  return <input ref={inputRef} {...props} />;
});

function Parent() {
  const inputRef = useRef(null);

  const handleClick = () => {
    inputRef.current.focus();
    console.log('当前值', inputRef.current.value());
  };

  return (
    <div>
      <CustomInput ref={inputRef} />
      <button onClick={handleClick}>聚焦并打印值</button>
    </div>
  );
}`;

  const useRefCaseCode = `// useRef 的三种典型用法
function Demo() {
  // 1. 获取 DOM
  const inputRef = useRef(null);

  // 2. 保存可变值
  const timerRef = useRef();

  // 3. 存储上一帧数据
  const prevValue = useRef();

  useEffect(() => {
    prevValue.current = value;
  }, [value]);

  return (
    <div>
      <input ref={inputRef} />
      <button onClick={() => {
        timerRef.current = setTimeout(() => {
          inputRef.current?.focus();
        }, 500);
      }}>延迟聚焦</button>
    </div>
  );
}`;

  return (
    <div className="refs-container">
      <button className="back-button" onClick={() => window.history.back()}>
        ← 返回
      </button>

      <header className="page-header">
        <h1>🔗 React Refs 指南</h1>
        <p className="subtitle">掌握 useRef、forwardRef、useImperativeHandle 等引用技术，构建可控的 UI 交互</p>
      </header>

      <nav className="section-nav">
        {sections.map(section => (
          <button
            key={section.id}
            className={`nav-btn ${activeSection === section.id ? 'active' : ''}`}
            onClick={() => setActiveSection(section.id)}
          >
            {section.name}
          </button>
        ))}
      </nav>

      {activeSection === 'overview' && (
        <section className="section">
          <h2>📚 概念概览</h2>

          <div className="concept-grid">
            <div className="concept-card primary">
              <div className="concept-icon">🎯</div>
              <h3>Refs 是什么？</h3>
              <p>
                Refs 是 React 提供的引用系统，用于直接访问 DOM 节点或在组件间共享可变值。
                它绕过声明式 UI，与受控状态配合，实现更精细的控制。
              </p>
            </div>

            <div className="concept-card">
              <div className="concept-icon">🧰</div>
              <h3>三类常见场景</h3>
              <ul>
                <li>访问或控制 DOM 元素</li>
                <li>保存可变数据，避免重新渲染</li>
                <li>在组件间暴露命令式 API</li>
              </ul>
            </div>

            <div className="concept-card">
              <div className="concept-icon">⚠️</div>
              <h3>使用注意</h3>
              <ul>
                <li>避免滥用，首选 state</li>
                <li>不要在渲染期间修改 DOM</li>
                <li>保持 ref API 稳定，避免破坏抽象</li>
              </ul>
            </div>
          </div>

          <div className="code-block large">
            <pre>{refConceptCode}</pre>
          </div>

          <div className="type-grid">
            <div className="type-card">
              <h4>类组件 ref</h4>
              <p>通过 React.createRef() 创建，常用于 class component</p>
            </div>
            <div className="type-card">
              <h4>函数组件 useRef</h4>
              <p>hooks 环境下的推荐方式，可存储任意可变值</p>
            </div>
            <div className="type-card">
              <h4>回调 ref</h4>
              <p>使用函数获取 DOM 节点，可适配动态节点</p>
            </div>
            <div className="type-card">
              <h4>forwardRef</h4>
              <p>封装组件时透传 ref，构建命令式 API</p>
            </div>
          </div>

          <div className="code-block">
            <pre>{refTypeCode}</pre>
          </div>
        </section>
      )}

      {activeSection === 'demo' && (
        <section className="section">
          <h2>🎮 实战演示</h2>

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

          <div className="demo-area">
            {demos.find(demo => demo.id === activeDemo)?.component}
          </div>

          <div className="code-block large">
            <pre>
              {activeDemo === 'basic' && refConceptCode}
              {activeDemo === 'callback' && `// 回调 ref
function useCallbackRef() {
  const sizeRef = useRef({ width: 0, height: 0 });
  const callbackRef = useCallback(node => {
    if (node) {
      sizeRef.current = node.getBoundingClientRect();
    }
  }, []);

  return { callbackRef, sizeRef };
}`}
              {activeDemo === 'forward' && forwardRefCode}
              {activeDemo === 'imperative' && `// useImperativeHandle 暴露自定义方法
const ImperativeChild = forwardRef((props, ref) => {
  const inputRef = useRef();

  useImperativeHandle(ref, () => ({
    focus: () => inputRef.current?.focus(),
    reset: () => inputRef.current && (inputRef.current.value = '')
  }));

  return <input ref={inputRef} />;
});`}
              {activeDemo === 'stable' && `// useRef 保存可变值
function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref.current;
}`}
              {activeDemo === 'layout' && `// useLayoutEffect 读取布局
function useMeasure() {
  const ref = useRef(null);
  const [rect, setRect] = useState({});

  useLayoutEffect(() => {
    if (!ref.current) return;
    const observer = new ResizeObserver(entries => {
      entries.forEach(entry => setRect(entry.contentRect));
    });
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return [ref, rect];
}`}
              {activeDemo === 'optimization' && `// ref + memo 缓存共享状态
const Item = memo(({ id, highlightRef }) => {
  const isActive = highlightRef.current === id;
  return <li className={isActive ? 'active' : ''}>项 {id}</li>;
});`}
            </pre>
          </div>
        </section>
      )}

      {activeSection === 'best' && (
        <section className="section">
          <h2>💡 最佳实践</h2>

          <div className="practice-grid">
            <div className="practice-card">
              <h4>1. 先考虑 state</h4>
              <p>只有在需要直接操作 DOM 或跨渲染保存可变值时才使用 ref。</p>
            </div>
            <div className="practice-card">
              <h4>2. 保持 ref 稳定</h4>
              <p>forwardRef 暴露的 API 应保持向后兼容，防止破坏封装。</p>
            </div>
            <div className="practice-card">
              <h4>3. 清理副作用</h4>
              <p>使用 ref 保存定时器、WebSocket 等外部实例时需要在卸载时清理。</p>
            </div>
            <div className="practice-card">
              <h4>4. 与 useLayoutEffect 搭配</h4>
              <p>在需要读取或修改布局前使用 useLayoutEffect 确保同步执行。</p>
            </div>
            <div className="practice-card">
              <h4>5. 配合 custom hook</h4>
              <p>提取 useRef 逻辑封装成自定义 Hook，提升可复用性。</p>
            </div>
            <div className="practice-card">
              <h4>6. 避免滥用</h4>
              <p>ref 是逃生门，不应用于通信或数据流控制，仍需以 props/state 为主。</p>
            </div>
          </div>

          <div className="code-block">
            <pre>{useRefCaseCode}</pre>
          </div>

          <div className="scenario-grid">
            <div className="scenario-card">
              <h4>表单聚焦与校验</h4>
              <p>登录框、搜索框需要自动聚焦或滚动时使用 ref 访问 DOM。</p>
            </div>
            <div className="scenario-card">
              <h4>动画与第三方库</h4>
              <p>与动画库（GSAP、Anime.js）或第三方组件交互时需要获取真实节点。</p>
            </div>
            <div className="scenario-card">
              <h4>保存可变对象</h4>
              <p>存储缓存、上一次请求结果、setTimeout 等引用，避免重复创建。</p>
            </div>
            <div className="scenario-card">
              <h4>命令式 API</h4>
              <p>forwardRef 暴露方法给父组件，实现弹窗 open/close、表单 submit 等。</p>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

export default ReactRefs;
