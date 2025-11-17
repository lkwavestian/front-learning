import React, { useEffect, useRef, useState } from 'react';
import { flushSync } from 'react-dom';
import './ReactSetStateMechanism.css';

const eventBatchingSnippet = [
  '// 同步事件中的批处理',
  'function handleClick() {',
  '  setCount(prev => prev + 1);',
  '  setCount(prev => prev + 1);',
  '  console.log(count); // 仍然是旧值',
  '}',
  '',
  'useEffect(() => {',
  '  console.log(count); // 提交后获取新值',
  '}, [count]);'
].join('\n');

const flushSyncSnippet = [
  '// flushSync 可以打断批处理，让更新立即提交',
  'flushSync(() => {',
  '  setValue(prev => prev + 1);',
  '});',
  'setValue(prev => prev + 1);'
].join('\n');

const queueFlow = [
  {
    title: '调度阶段（Scheduling）',
    detail: 'setState 会把更新描述成 Update 对象推入 Fiber 对应的更新队列，React Scheduler 根据优先级决定何时执行。'
  },
  {
    title: '渲染阶段（Render）',
    detail: '在下一帧或空闲时机，React 会遍历 Fiber 树计算新的 UI，合并多次 setState 的结果。此阶段可被打断。'
  },
  {
    title: '提交阶段（Commit）',
    detail: '计算完成后才会批量提交 DOM 变更，并依次触发 useLayoutEffect → 浏览器绘制 → useEffect。'
  },
  {
    title: '批处理（Batching）',
    detail: '同一批次内的 setState 会合并，React 18+ 默认对 Promise / setTimeout 等异步来源也开启自动批处理。'
  }
];

function EventBatchingDemo() {
  const [count, setCount] = useState(0);
  const [logs, setLogs] = useState([]);
  const latestCount = useRef(count);
  const renderCount = useRef(0);
  const clickIndex = useRef(1);

  useEffect(() => {
    renderCount.current += 1;
    latestCount.current = count;
  });

  useEffect(() => {
    setLogs(prev => [
      ...prev,
      `👉 提交完成：最新 count = ${count}`
    ]);
  }, [count]);

  const handleClick = () => {
    const id = clickIndex.current++;
    setLogs(prev => [
      ...prev,
      `--- 第 ${id} 次点击开始 ---`,
      `事件开头读取 count = ${count}`
    ]);

    setCount(prev => prev + 1);
    setCount(prev => prev + 1);

    setLogs(prev => [
      ...prev,
      '调用 setCount(prev => prev + 1) 两次（同批次）',
      `事件末尾读取 count = ${count}（仍是旧值）`
    ]);

    Promise.resolve().then(() => {
      setLogs(prev => [
        ...prev,
        `Promise 微任务中读取 count = ${count}（提交前，仍是旧值）`
      ]);
    });

    setTimeout(() => {
      setLogs(prev => [
        ...prev,
        `setTimeout 中读取 count = ${latestCount.current}（提交后，新值）`
      ]);
    }, 0);
  };

  const handleReset = () => {
    clickIndex.current = 1;
    renderCount.current = 0;
    latestCount.current = 0;
    setCount(0);
    setLogs(['✅ 已重置示例，请重新触发更新']);
  };

  return (
    <div className="demo-card">
      <div className="demo-header">
        <h3>1. 同步事件中的批处理</h3>
        <p>多次 setState 会被合并进同一批更新，直到事件执行结束才提交。</p>
      </div>
      <div className="demo-actions">
        <button onClick={handleClick} className="primary">点击触发 2 次 setState</button>
        <button onClick={handleReset} className="secondary">重置示例</button>
      </div>
      <div className="live-metrics">
        <div className="metric">
          <span>当前 count</span>
          <strong>{count}</strong>
        </div>
        <div className="metric">
          <span>渲染次数</span>
          <strong>{renderCount.current}</strong>
        </div>
      </div>
      <div className="log-panel">
        {logs.length === 0 ? (
          <p className="log-empty">暂无日志，点击按钮观察批处理过程。</p>
        ) : (
          logs.map((item, index) => (
            <div key={`${item}-${index}`} className="log-item">{item}</div>
          ))
        )}
      </div>
      <div className="code-block">
        <pre>{eventBatchingSnippet}</pre>
      </div>
    </div>
  );
}

function AutomaticBatchingDemo() {
  const [value, setValue] = useState(0);
  const [logs, setLogs] = useState([]);

  const triggerUpdate = (source) => {
    const titleMap = {
      promise: 'Promise.then',
      timeout: 'setTimeout',
      raf: 'requestAnimationFrame'
    };

    setLogs(prev => [
      ...prev,
      `--- 在 ${titleMap[source]} 中触发两次 setState ---`
    ]);

    const run = () => {
      setValue(prev => prev + 1);
      setValue(prev => prev + 1);
    };

    if (source === 'promise') {
      Promise.resolve().then(run);
    } else if (source === 'timeout') {
      setTimeout(run, 0);
    } else {
      requestAnimationFrame(run);
    }
  };

  useEffect(() => {
    if (logs.length === 0) return;
    setLogs(prev => [
      ...prev,
      `✅ 提交完成：value = ${value}（一次提交合并了两次更新）`
    ]);
  }, [value]);

  const handleReset = () => {
    setValue(0);
    setLogs([]);
  };

  return (
    <div className="demo-card">
      <div className="demo-header">
        <h3>2. 异步来源中的自动批处理（React 18+）</h3>
        <p>React 18 之后 Promise、setTimeout、rAF 等异步任务也会自动批处理，减少额外渲染。</p>
      </div>
      <div className="demo-actions">
        <button onClick={() => triggerUpdate('promise')}>Promise.then</button>
        <button onClick={() => triggerUpdate('timeout')}>setTimeout</button>
        <button onClick={() => triggerUpdate('raf')}>requestAnimationFrame</button>
        <button onClick={handleReset} className="secondary">清空日志</button>
      </div>
      <div className="live-metrics">
        <div className="metric">
          <span>当前 value</span>
          <strong>{value}</strong>
        </div>
      </div>
      <div className="log-panel compact">
        {logs.length === 0 ? (
          <p className="log-empty">点击任一异步来源，观察一次提交处理两次更新。</p>
        ) : (
          logs.map((item, index) => (
            <div key={`${item}-${index}`} className="log-item">{item}</div>
          ))
        )}
      </div>
    </div>
  );
}

function FlushSyncDemo() {
  const [immediate, setImmediate] = useState(0);
  const [batched, setBatched] = useState(0);
  const [logs, setLogs] = useState([]);

  const handleFlushSync = () => {
    setLogs(prev => [
      ...prev,
      '--- flushSync 示例 ---'
    ]);
    flushSync(() => {
      setImmediate(prev => prev + 1);
    });
    setImmediate(prev => prev + 1);
    setLogs(prev => [
      ...prev,
      '✅ 第一次 flushSync 立即提交，第二次仍参与后续批处理'
    ]);
  };

  const handleBatched = () => {
    setLogs(prev => [
      ...prev,
      '--- 普通批处理示例 ---'
    ]);
    setBatched(prev => prev + 1);
    setBatched(prev => prev + 1);
    setLogs(prev => [
      ...prev,
      '✅ 两次 setState 合并为一次提交'
    ]);
  };

  const handleReset = () => {
    setImmediate(0);
    setBatched(0);
    setLogs([]);
  };

  return (
    <div className="demo-card">
      <div className="demo-header">
        <h3>3. 控制批处理边界：flushSync</h3>
        <p>当需要立即读取最新 DOM/状态时，可以用 flushSync 打断批处理。</p>
      </div>
      <div className="demo-actions">
        <button onClick={handleFlushSync}>执行 flushSync</button>
        <button onClick={handleBatched}>普通批处理</button>
        <button onClick={handleReset} className="secondary">重置</button>
      </div>
      <div className="live-metrics dual">
        <div className="metric">
          <span>flushSync 计数</span>
          <strong>{immediate}</strong>
        </div>
        <div className="metric">
          <span>普通批处理</span>
          <strong>{batched}</strong>
        </div>
      </div>
      <div className="log-panel compact">
        {logs.length === 0 ? (
          <p className="log-empty">触发示例，观察 flushSync 如何立即刷新。</p>
        ) : (
          logs.map((item, index) => (
            <div key={`${item}-${index}`} className="log-item">{item}</div>
          ))
        )}
      </div>
      <div className="code-block">
        <pre>{flushSyncSnippet}</pre>
      </div>
    </div>
  );
}

function ReactSetStateMechanism() {
  return (
    <div className="setstate-page">
      <button className="back-button" onClick={() => window.history.back()}>
        ← 返回首页
      </button>

      <div className="page-header">
        <h1>React setState 执行机制深度解析</h1>
        <p className="subtitle">理解 setState 在 Fiber 中的调度、批处理与提交流程，写出可预测的状态更新逻辑。</p>
        <div className="badges">
          <span className="badge">Fiber 架构</span>
          <span className="badge">批处理策略</span>
          <span className="badge">更新优先级</span>
        </div>
      </div>

      <section className="section">
        <h2>📚 setState 是如何执行的？</h2>
        <div className="timeline">
          {queueFlow.map(step => (
            <div key={step.title} className="timeline-item">
              <div className="timeline-dot" />
              <div className="timeline-content">
                <h4>{step.title}</h4>
                <p>{step.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="section">
        <h2>🧪 实验：亲眼看到批处理</h2>
        <EventBatchingDemo />
        <AutomaticBatchingDemo />
        <FlushSyncDemo />
      </section>

      <section className="section">
        <h2>✅ 最佳实践清单</h2>
        <ul className="best-practice">
          <li><strong>使用函数式更新</strong>：在同批次多次 setState 时，依赖 prev 值可以确保结果正确。</li>
          <li><strong>避免事件中直接读取旧 state</strong>：需要最新值时迁移到 useEffect 或 setTimeout 后读取。</li>
          <li><strong>谨慎使用 flushSync</strong>：只在必须同步读取 DOM/状态时使用，过度会损失性能。</li>
          <li><strong>区分渲染与提交</strong>：渲染阶段可能被重复执行（如 StrictMode），副作用请放到 useEffect/useLayoutEffect。</li>
          <li><strong>了解优先级</strong>：React 会根据更新类型（用户交互、过期任务、过渡）决定何时调度该批更新。</li>
        </ul>
      </section>
    </div>
  );
}

export default ReactSetStateMechanism;

