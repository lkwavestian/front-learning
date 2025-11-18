import React from 'react';
import './ReactFiberArchitecture.css';

const painPoints = [
  {
    title: '递归遍历不可中断',
    detail: 'Stack Reconciler 以递归方式遍历虚拟 DOM，一旦开始就必须走完整棵树，长任务会阻塞主线程。'
  },
  {
    title: '同步渲染带来卡顿',
    detail: '大型组件树更新需要一次性完成 diff 与渲染，导致输入抖动、动画掉帧。'
  },
  {
    title: '优先级无法灵活处理',
    detail: '所有更新同优先级，用户输入和低优背景任务无法区分，无法实现更精细的调度。'
  },
  {
    title: '平台扩展困难',
    detail: 'Stack Reconciler 与浏览器 DOM 绑定紧密，扩展到不同宿主环境成本高。'
  }
];

const fiberBenefits = [
  { title: '可中断、可恢复的渲染', desc: 'Fiber 使用链表结构代替递归，允许在渲染阶段被打断，稍后继续执行。' },
  { title: '优先级调度', desc: 'Fiber Scheduler 为每次更新赋予优先级，高优任务（如输入）先执行。' },
  { title: '粒度控制', desc: '每个 Fiber 节点代表一个组件单元，方便在节点层级重新调度或重试。' },
  { title: '跨平台 Renderer', desc: 'Fiber 将调和过程与宿主操作解耦，ReactDOM、React Native 等 Renderer 共享同一调和逻辑。' },
  { title: 'Concurrent Features 基石', desc: 'startTransition、Suspense、Selective Hydration 等能力都建立在 Fiber + Scheduler 之上。' }
];

const fiberFields = [
  { name: 'tag / type', desc: '记录节点类型（函数组件、类组件、HostComponent 等）与对应的组件定义。' },
  { name: 'pendingProps / memoizedProps', desc: '新旧 props，帮助 diff 时判断是否需要更新。' },
  { name: 'child / sibling / return', desc: '以链表形式串起整颗树，代替递归遍历。' },
  { name: 'lanes / priority', desc: '优先级字段，用于调度策略。' },
  { name: 'flags (effectTag)', desc: '标记需要执行的副作用，如 Placement、Update、Deletion。' }
];

const comparison = [
  {
    item: '结构实现',
    stack: '递归调用栈，依赖 JS 引擎堆栈帧。',
    fiber: '显式 Fiber 节点（链表），React 自己管理调用栈，可以随时暂停/继续。'
  },
  {
    item: '调度能力',
    stack: '不可中断，所有更新同优先级。',
    fiber: '引入 Scheduler，支持优先级、时间切片、延迟任务。'
  },
  {
    item: '渲染阶段',
    stack: '一次完成渲染与提交。',
    fiber: 'render(可中断) + commit(同步) 两阶段，render 阶段可被打断、重做。'
  },
  {
    item: '平台扩展',
    stack: '与 DOM 耦合，跨平台困难。',
    fiber: '调和与宿主 API 分离，多 Renderer 共享调和逻辑。'
  }
];

const summary = [
  'Fiber 是 React 16 之后的核心架构，用链表代替递归，支持可中断渲染和优先级调度。',
  '它解决了长任务阻塞、无法调度、难扩展等 Stack Reconciler 的痛点。',
  'Fiber + Scheduler 为 Concurrent Mode、Suspense、Transitions 等高阶能力铺路。'
];

function IntroSection() {
  return (
    <section className="fiber-section">
      <div className="section-header">
        <h2>Fiber 架构是什么？</h2>
        <p>
          Fiber 可以看作“虚拟 DOM 的进化版”。它用链表和优先级系统重新实现了调和过程，让渲染可以被打断、重试、指定优先级，
          解决 Stack Reconciler 带来的同步卡顿问题。
        </p>
      </div>
      <div className="pain-grid">
        {painPoints.map((card) => (
          <article key={card.title} className="pain-card">
            <h3>{card.title}</h3>
            <p>{card.detail}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function FiberBenefits() {
  return (
    <section className="fiber-section">
      <div className="section-header">
        <h2>Fiber 解决了什么问题？</h2>
      </div>
      <div className="benefit-grid">
        {fiberBenefits.map((item) => (
          <article key={item.title} className="benefit-card">
            <h3>{item.title}</h3>
            <p>{item.desc}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function FiberFields() {
  return (
    <section className="fiber-section">
      <div className="section-header">
        <h2>Fiber 节点包含哪些信息？</h2>
      </div>
      <div className="fields-table">
        <div className="fields-head">
          <div>字段</div>
          <div>作用</div>
        </div>
        {fiberFields.map((field) => (
          <div key={field.name} className="fields-row">
            <div>{field.name}</div>
            <div>{field.desc}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function StackVsFiber() {
  return (
    <section className="fiber-section">
      <div className="section-header">
        <h2>Stack Reconciler vs Fiber</h2>
        <p>React Fiber 的引入本质上是对调和引擎的一次重写。下表总结两者的主要差异。</p>
      </div>
      <div className="compare-table">
        <div className="compare-head">
          <div>比较项</div>
          <div>Stack Reconciler</div>
          <div>Fiber</div>
        </div>
        {comparison.map((row) => (
          <div key={row.item} className="compare-row">
            <div>{row.item}</div>
            <div>{row.stack}</div>
            <div>{row.fiber}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function FiberSummary() {
  return (
    <section className="fiber-section">
      <div className="section-header">
        <h2>结论速记</h2>
      </div>
      <ul className="bullet-list">
        {summary.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </section>
  );
}

function ReactFiberArchitecture() {
  return (
    <div className="fiber-page">
      <button className="back-button" onClick={() => window.history.back()}>
        ← 返回首页
      </button>

      <header className="page-hero">
        <h1>React Fiber 架构：可中断渲染与调度体系</h1>
        <p className="subtitle">
          Fiber 是 React 16 引入的新调和引擎，它解决了 Stack Reconciler 同步渲染的性能瓶颈，
          为并发特性、Suspense 和跨平台 Renderer 打下基础。
        </p>
      </header>

      <IntroSection />
      <FiberBenefits />
      <FiberFields />
      <StackVsFiber />
      <FiberSummary />
    </div>
  );
}

export default ReactFiberArchitecture;



