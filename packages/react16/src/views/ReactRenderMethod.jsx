import React, { useMemo, useRef, useState } from 'react';
import './ReactRenderMethod.css';

const renderPhases = [
  {
    title: '1. 触发阶段（Trigger）',
    detail:
      '由 root.render、setState、props 变化、Context 订阅、store 更新或 forceUpdate 等入口触发，React 会为目标 Fiber 标记 Update。'
  },
  {
    title: '2. 调度阶段（Schedule）',
    detail:
      'Scheduler 根据优先级把更新放入任务队列，高优任务（如用户输入）优先进入渲染阶段，低优任务可被打断或延迟。'
  },
  {
    title: '3. 渲染阶段（Render）',
    detail:
      '遍历 Fiber 树，执行组件 render 函数/函数组件，生成新的 Fiber 树快照，比较旧 Fiber 形成 effect list；此阶段可被打断。'
  },
  {
    title: '4. 提交阶段（Commit）',
    detail:
      '一次性把 effect list 中的变更同步到 DOM，随后触发 useLayoutEffect → 浏览器绘制 → useEffect。render 函数本身只发生在渲染阶段。'
  }
];

const triggerSources = [
  {
    name: '首次挂载',
    desc: '调用 ReactDOM.createRoot(container).render(<App />) 时，根节点 Fiber 没有 current 树，因此会完整执行 render → commit。'
  },
  {
    name: '状态更新（setState/useState）',
    desc: '在组件内部调用 setState 会把 Update push 到当前 Fiber 的更新队列，触发针对该 Fiber 子树的 render。'
  },
  {
    name: '父组件 props 变化',
    desc: '父组件重新 render 后会把新的 props 继续向下传递，即使子组件内部没有 setState，也需要重新执行 render 以比较 props 差异。'
  },
  {
    name: 'Context / Store 订阅',
    desc: 'context value、useSyncExternalStore、Redux connect 等订阅来源变动时，会标记对应消费者 Fiber 进入 render。'
  },
  {
    name: 'forceUpdate / useReducer dispatch',
    desc: 'class forceUpdate 或 useReducer dispatch 会跳过 shouldComponentUpdate，直接触发 render，常用于无法通过 props/state 描述的更新。'
  },
  {
    name: 'StrictMode / 热更新',
    desc: '严格模式在开发环境会额外触发一次 render 来帮助发现副作用；热更新会为了替换模块而重新 render。'
  }
];

const renderCodeSnippet = [
  "import { createRoot } from 'react-dom/client';",
  '',
  'const root = createRoot(document.getElementById(\'root\'));',
  '',
  'root.render(<App />); // 触发根 Fiber 的首次 render',
  '',
  'function App() {',
  '  const [count, setCount] = useState(0);',
  '  return <button onClick={() => setCount(c => c + 1)}>{count}</button>;',
  '}',
  '',
  '// 每次 setCount → Scheduler → render 阶段 → commit 阶段'
].join('\n');

function RenderProbe() {
  const [parentCount, setParentCount] = useState(0);
  const [childMultiplier, setChildMultiplier] = useState(2);
  const [showChild, setShowChild] = useState(true);
  const parentRenders = useRef(0);
  parentRenders.current += 1;

  return (
    <div className="render-card">
      <div className="render-card__header">
        <h3>实战：观察 render 触发点</h3>
        <p>点击不同按钮，查看 parent / child 的 render 次数，区分 setState、props 变化与卸载的影响。</p>
      </div>
      <div className="render-card__actions">
        <button onClick={() => setParentCount((v) => v + 1)} className="primary">
          parent setState（count + 1）
        </button>
        <button onClick={() => setChildMultiplier((v) => (v === 2 ? 3 : 2))}>
          改变传给子组件的 props
        </button>
        <button onClick={() => setShowChild((v) => !v)} className="secondary">
          {showChild ? '卸载子组件' : '重新挂载'}
        </button>
      </div>
      <div className="render-card__metrics">
        <div>
          <span>parent render 次数</span>
          <strong>{parentRenders.current}</strong>
        </div>
        <div>
          <span>parent count</span>
          <strong>{parentCount}</strong>
        </div>
        <div>
          <span>child 是否挂载</span>
          <strong>{showChild ? 'Yes' : 'No'}</strong>
        </div>
      </div>
      {showChild ? <ChildProbe parentValue={parentCount} multiplier={childMultiplier} /> : (
        <div className="render-card__placeholder">子组件已卸载，render 结束。</div>
      )}
    </div>
  );
}

const ChildProbe = React.memo(function ChildProbe({ parentValue, multiplier }) {
  const childRenders = useRef(0);
  childRenders.current += 1;

  const computed = useMemo(() => parentValue * multiplier, [parentValue, multiplier]);

  return (
    <div className="child-probe">
      <div>
        <span>child render 次数</span>
        <strong>{childRenders.current}</strong>
      </div>
      <div>
        <span>接收到的 props</span>
        <strong>{`value=${parentValue}, multiplier=${multiplier}`}</strong>
      </div>
      <div>
        <span>计算结果</span>
        <strong>{computed}</strong>
      </div>
      <p className="child-probe__tip">
        当 parent setState 或传入 props 变化时，React 会让子组件重新 render；React.memo 仅在 props 无变化时跳过 render。
      </p>
    </div>
  );
});

function ReactRenderMethod() {
  return (
    <div className="render-method-container">
      <button className="render-back-button" onClick={() => window.history.back()}>
        ← 返回首页
      </button>

      <header className="render-page-header">
        <p className="render-tag">@react16 专题</p>
        <h1>React render 方法：执行原理与触发时机</h1>
        <p>
          render 函数发生在 Fiber 渲染阶段，它不会直接操作 DOM，而是生成下一棵 Fiber 树和 effect list，
          等待提交阶段一次性落地。
        </p>
      </header>

      <section className="render-section">
        <div className="render-section__title">
          <h2>render 执行流程</h2>
          <p>流程与 lifecycle 三阶段一致：触发 → 调度 → 渲染 → 提交。</p>
        </div>
        <div className="render-phase-cards">
          {renderPhases.map((item) => (
            <div key={item.title} className="render-phase-card">
              <h3>{item.title}</h3>
              <p>{item.detail}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="render-section">
        <div className="render-section__title">
          <h2>render 触发入口</h2>
          <p>任何能够改变 Fiber 数据的入口都会进入调度队列，触发下一次 render。</p>
        </div>
        <div className="render-trigger-grid">
          {triggerSources.map((item) => (
            <div key={item.name} className="render-trigger-card">
              <h4>{item.name}</h4>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="render-section">
        <div className="render-section__title">
          <h2>典型调用链</h2>
          <p>root.render → Scheduler → render 阶段 → commit 阶段，render 始终保持纯函数性质。</p>
        </div>
        <div className="render-code-block">
          <pre>{renderCodeSnippet}</pre>
        </div>
      </section>

      <section className="render-section">
        <div className="render-section__title">
          <h2>互动实验：Render Probe</h2>
          <p>通过 setState、props、卸载来观察 parent / child render 次数的变化。</p>
        </div>
        <RenderProbe />
      </section>

      <section className="render-section">
        <div className="render-section__title">
          <h2>结论速记</h2>
        </div>
        <ul className="render-takeaway-list">
          <li>render ≠ DOM 操作；它只是在渲染阶段计算 Fiber，commit 才同步 DOM。</li>
          <li>setState、props、context、store、forceUpdate、StrictMode 等入口都会触发 render。</li>
          <li>Concurrent 模式下 render 可被打断与重跑，但 commit 始终同步且不可中断。</li>
          <li>React.memo、useMemo/useCallback、列表分片等策略能减少不必要的 render。</li>
        </ul>
      </section>
    </div>
  );
}

export default ReactRenderMethod;


