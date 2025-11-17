import React, { useMemo } from 'react';
import './RealDomVsVirtualDom.css';

const diffPoints = [
  {
    title: '数据结构',
    real: '浏览器提供的 DOM 节点对象，属性繁多，包含布局信息、渲染状态等。',
    virtual: 'JS 对象描述（Fiber/VDOM），只保留渲染所需的最小字段，可序列化、可 diff。'
  },
  {
    title: '更新方式',
    real: '直接调用 DOM API，操作即生效，频繁操作成本高。',
    virtual: '先在内存生成新树，diff 后批量 patch 真正变化的 DOM 节点，减少多余操作。'
  },
  {
    title: '性能瓶颈',
    real: '修改 DOM 会触发重排/重绘，频繁同步调用导致卡顿，和平台紧耦合。',
    virtual: 'diff 在 JS 层执行，可中断与调度，并且可以无缝输出到 DOM、Native、Canvas 等宿主。'
  },
  {
    title: '跨平台能力',
    real: '浏览器专属。',
    virtual: '同一套 VDOM → Renderer，可输出 DOM、React Native、SSR、WebGL。'
  },
  {
    title: '调试与快照',
    real: 'DOM 结构庞大，很难序列化做快照 diff。',
    virtual: 'VDOM/Fiber 可在内存中复制、比较、记录调试信息（如 Profiler）。'
  }
];

const prosCons = [
  {
    title: '使用 Real DOM 直接更新',
    pros: ['无需额外层，操作结果立刻可见', '适合极简单的静态页面或一次性脚本'],
    cons: ['频繁操作导致多次重排/重绘', '无法中断或调度，长任务阻塞 UI', '代码与宿主 API 紧耦合，不易跨平台']
  },
  {
    title: '使用 Virtual DOM（React Fiber）',
    pros: ['批量 diff + patch，减少真实 DOM 操作', '可根据优先级调度任务，支持并发模式', '同一渲染描述可输出到多端', '易于做快照、时间切片、错误边界等高级特性'],
    cons: ['需要额外的内存开销与 diff 成本', '极小型应用时与直接 DOM 相比存在微弱性能损耗', '调试需要理解额外抽象（Fiber、调度优先级）']
  }
];

const pipelineSteps = [
  {
    step: '触发更新',
    detail: 'setState、props、context、外部 store 等触发 Fiber 标记 Update。'
  },
  {
    step: '构建 Virtual DOM / Fiber',
    detail: '执行 render 函数得到新的 Fiber 树快照，可被命中缓存或跳过。'
  },
  {
    step: 'diff 树',
    detail: 'React Reconciler 比较 old fiber 与 new fiber，输出 effect list。'
  },
  {
    step: '提交到 Real DOM',
    detail: 'Commit 阶段执行 DOM patch、ref、生命周期、布局副作用。'
  }
];

const timeline = [
  { year: '1990s', event: '直接 DOM 操作，页面刷新或整页重绘' },
  { year: '2005', event: 'Ajax + 手写 DOM 更新，性能和复杂度开始爆炸' },
  { year: '2013', event: 'React 引入 Virtual DOM，先在内存 diff 再批量 patch' },
  { year: '2017', event: 'Fiber 重构，VDOM → Fiber，支持可中断渲染和优先级调度' },
  { year: '2022', event: 'Concurrent Features、Transitions，VDOM + Scheduler 协作进一步优化体验' }
];

const codeExample = `
// 直接操作 Real DOM
const el = document.getElementById('counter');
for (let i = 0; i < 1000; i++) {
  el.textContent = i; // 每次循环都写入 DOM → 重排
}

// React Virtual DOM
function Counter() {
  const [count, setCount] = useState(0);
  return <span>{count}</span>;
}
// React 在内存构建 Fiber 树，只在最终 commit 时更新真实 DOM
`;

function ComparisonTable() {
  return (
    <section className="rdvd-section">
      <div className="rdvd-section__title">
        <h2>Real DOM vs Virtual DOM</h2>
        <p>核心差异：数据结构、更新策略、调度能力、跨平台和可观测性。</p>
      </div>
      <div className="rdvd-table">
        <div className="rdvd-table__head">
          <div>对比点</div>
          <div>Real DOM</div>
          <div>Virtual DOM / Fiber</div>
        </div>
        {diffPoints.map((item) => (
          <div key={item.title} className="rdvd-table__row">
            <div className="rdvd-table__cell title">{item.title}</div>
            <div className="rdvd-table__cell">{item.real}</div>
            <div className="rdvd-table__cell highlight">{item.virtual}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function ProsConsCards() {
  return (
    <section className="rdvd-section">
      <div className="rdvd-section__title">
        <h2>优缺点对比</h2>
        <p>Virtual DOM 并非魔法，而是以额外抽象换取可维护性和跨平台能力。</p>
      </div>
      <div className="rdvd-pros-cons">
        {prosCons.map((group) => (
          <article key={group.title} className="rdvd-card">
            <h3>{group.title}</h3>
            <div className="rdvd-card__body">
              <div>
                <strong>优势</strong>
                <ul>
                  {group.pros.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
              <div>
                <strong>劣势</strong>
                <ul>
                  {group.cons.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function Pipeline() {
  return (
    <section className="rdvd-section">
      <div className="rdvd-section__title">
        <h2>一次 React 更新的旅程</h2>
        <p>Virtual DOM 并不直接触碰真实 DOM，而是在 submit 阶段统一输出。</p>
      </div>
      <div className="rdvd-pipeline">
        {pipelineSteps.map((step, index) => (
          <div key={step.step} className="rdvd-pipeline__item">
            <div className="rdvd-pipeline__index">{index + 1}</div>
            <div>
              <h4>{step.step}</h4>
              <p>{step.detail}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Timeline() {
  return (
    <section className="rdvd-section">
      <div className="rdvd-section__title">
        <h2>演进时间线</h2>
        <p>Virtual DOM 的价值：在浏览器限制下，通过调度 + diff 让开发者以声明式方式思考 UI。</p>
      </div>
      <div className="rdvd-timeline">
        {timeline.map((item) => (
          <div key={item.year} className="rdvd-timeline__item">
            <div className="rdvd-timeline__year">{item.year}</div>
            <p>{item.event}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function CodeBlock() {
  const lines = useMemo(() => codeExample.trim().split('\n'), []);

  return (
    <section className="rdvd-section">
      <div className="rdvd-section__title">
        <h2>代码视角理解差异</h2>
      </div>
      <div className="rdvd-code-block">
        <pre>
          {lines.map((line, index) => (
            <span key={`${line}-${index}`}>
              <em>{index + 1}</em>
              {line}
            </span>
          ))}
        </pre>
      </div>
    </section>
  );
}

function RealDomVsVirtualDom() {
  return (
    <div className="rdvd-container">
      <button className="rdvd-back-button" onClick={() => window.history.back()}>
        ← 返回首页
      </button>

      <header className="rdvd-hero">
        <p className="rdvd-tag">@react16 专题</p>
        <h1>Real DOM vs Virtual DOM</h1>
        <p>
          Real DOM 是浏览器层真实节点；Virtual DOM 是 React/Fiber 在内存中的抽象描述。前者直接“动刀”但成本高，
          后者通过 diff + 批量提交带来性能、可维护性与跨平台能力。
        </p>
      </header>

      <ComparisonTable />
      <ProsConsCards />
      <Pipeline />
      <CodeBlock />
      <Timeline />

      <section className="rdvd-section">
        <div className="rdvd-section__title">
          <h2>结论速记</h2>
        </div>
        <ul className="rdvd-takeaways">
          <li>Virtual DOM 用 JS 对象描述 UI，借助 diff 降低直接 DOM 操作次数。</li>
          <li>Real DOM 更新不可中断，Virtual DOM + Fiber 可以分片渲染，提升交互流畅度。</li>
          <li>极简单场景直接 DOM 更快；中大型应用借助 VDOM 获得复杂特性与可维护性。</li>
          <li>VDOM 的价值不止性能，更在于抽象、跨平台、可观测和可调度能力。</li>
        </ul>
      </section>
    </div>
  );
}

export default RealDomVsVirtualDom;


