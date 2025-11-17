import React from 'react';
import reactJxsToDom from '../assets/reactJxsToDom.png';
import './ReactJsxToDom.css';

const rawJsxSnippet = `<div>
  <img src="avatar.png" className="profile" />
  <Hello />
</div>`;

const compiledSnippet = `React.createElement(
  "div",
  null,
  React.createElement("img", {
    src: "avatar.png",
    className: "profile"
  }),
  React.createElement(Hello, null)
);`;

const combinedExample = `class ClassComponent extends Component {
  static defaultProps = {
    color: "pink"
  };

  render() {
    return (
      <div className="border">
        <h3>ClassComponent</h3>
        <p className={this.props.color}>{this.props.name}</p>
      </div>
    );
  }
}

function FunctionComponent(props) {
  return (
    <div className="border">
      FunctionComponent
      <p>{props.name}</p>
    </div>
  );
}

const jsx = (
  <div className="border">
    <p>xx</p>
    <a href="#">xxx</a>
    <FunctionComponent name="函数组件" />
    <ClassComponent name="类组件" color="red" />
  </div>
);`;

const createElementImpl = `function createElement(type, config, ...children) {
  if (config) {
    delete config.__self;
    delete config.__source;
  }
  const props = {
    ...config,
    children: children.map(child =>
      typeof child === "object" ? child : createTextNode(child)
    )
  };

  return { type, props };
}

function createTextNode(text) {
  return {
    type: TEXT,
    props: {
      children: [],
      nodeValue: text
    }
  };
}

export default {
  createElement
};`;

const renderImpl = `function render(vnode, container) {
  const node = createNode(vnode, container);
  container.appendChild(node);
}

function createNode(vnode, parentNode) {
  let node = null;
  const { type, props } = vnode;

  if (type === TEXT) {
    node = document.createTextNode("");
  } else if (typeof type === "string") {
    node = document.createElement(type);
  } else if (typeof type === "function") {
    node = type.isReactComponent
      ? updateClassComponent(vnode, parentNode)
      : updateFunctionComponent(vnode, parentNode);
  } else {
    node = document.createDocumentFragment();
  }

  reconcileChildren(props.children, node);
  updateNode(node, props);
  return node;
}

function reconcileChildren(children, node) {
  for (let i = 0; i < children.length; i++) {
    const child = children[i];
    if (Array.isArray(child)) {
      child.forEach((nested) => render(nested, node));
    } else {
      render(child, node);
    }
  }
}

function updateNode(node, nextVal) {
  Object.keys(nextVal)
    .filter((k) => k !== "children")
    .forEach((k) => {
      if (k.slice(0, 2) === "on") {
        const eventName = k.slice(2).toLowerCase();
        node.addEventListener(eventName, nextVal[k]);
      } else {
        node[k] = nextVal[k];
      }
    });
}

function updateFunctionComponent(vnode, parentNode) {
  const { type, props } = vnode;
  const vvnode = type(props);
  return createNode(vvnode, parentNode);
}

function updateClassComponent(vnode, parentNode) {
  const { type, props } = vnode;
  const cmp = new type(props);
  const vvnode = cmp.render();
  return createNode(vvnode, parentNode);
}

export default {
  render
};`;

const nodeCategories = [
  { title: '原生标签节点', desc: 'type 为字符串，如 "div"、"span"，对应真实 DOM 标签。' },
  { title: '文本节点', desc: 'type === TEXT，props 中保存 nodeValue，用来渲染纯文本。' },
  { title: '函数组件', desc: 'type 为函数，执行后返回新的虚拟节点。' },
  { title: '类组件', desc: 'type 为类，需先实例化再执行 render 获取虚拟节点。' }
];

const pipelineSteps = [
  {
    title: 'JSX / React.createElement',
    detail: '所有 JSX 最终都会被 Babel 转成 React.createElement(...)。'
  },
  {
    title: 'createElement 生成虚拟节点',
    detail: '负责处理 key/ref/defaultProps，并把所有 children 放到 props.children 中。'
  },
  {
    title: 'ReactDOM.render / root.render',
    detail: '首次挂载清空容器，后续依赖 diff/优先级实现增量更新，可选 callback 会在更新完成后触发。'
  },
  {
    title: 'render → createNode → DOM',
    detail: '递归区分文本、原生、函数、类组件，创建真实 DOM 并 append 至父节点。'
  }
];

const summaryPoints = [
  'JSX 是语法糖，全部交给 Babel 转成 React.createElement(...)，开发者只需关注声明式写法。',
  'createElement 统一处理 key/ref/defaultProps 和 children，是虚拟 DOM 生成的入口。',
  'ReactDOM.render 结合 diff、事务与批处理，把虚拟 DOM 映射到真实 DOM，并在更新时做到最小化变更。',
  '理解 render → createNode → reconcileChildren 可以帮助我们定位性能瓶颈与刷新逻辑。'
];

function ReactJsxToDom() {
  return (
    <div className="jsx-page">
      <button className="back-button" onClick={() => window.history.back()}>
        ← 返回首页
      </button>

      <header className="page-hero">
        <h1>React JSX 转换为真实 DOM 的流程</h1>
        <p className="subtitle">
          参考 React Lifecycle 专题的排版方式，带你梳理“JSX → createElement → 虚拟 DOM → ReactDOM.render → 真实 DOM”完整链路。
        </p>
      </header>

      <section className="section">
        <h2>19.1 JSX 是什么？</h2>
        <p>
          JSX 是 JavaScript 的语法扩展。Babel 会根据标签首字母判断是否为原生 DOM，
          并将其全部转换为 React.createElement（或 jsx/jsxDEV）调用。
        </p>
        <div className="code-columns">
          <div className="code-card">
            <div className="card-title">JSX 写法</div>
            <pre>{rawJsxSnippet}</pre>
          </div>
          <div className="code-card">
            <div className="card-title">Babel 编译结果</div>
            <pre>{compiledSnippet}</pre>
          </div>
        </div>
        <ul className="bullet-list">
          <li>小写标签 → 视作原生 DOM，createElement 第一个参数是字符串。</li>
          <li>大写标签 → 视作组件，createElement 第一个参数是函数或类对象。</li>
          <li>所有 JSX 都会走 ReactDOM.render / root.render 进入 DOM。</li>
        </ul>
        <div className="code-card single">
          <div className="card-title">混合节点示例</div>
          <pre>{combinedExample}</pre>
        </div>
      </section>

      <section className="section">
        <h2>节点分类</h2>
        <p>在 React 中，节点大致分为四类，它们最终都会转换成 React.createElement 调用。</p>
        <div className="card-grid">
          {nodeCategories.map((item) => (
            <div className="info-card" key={item.title}>
              <h4>{item.title}</h4>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section">
        <h2>19.2 JSX → DOM 过程</h2>
        <p>从语法糖到真实 DOM，核心环节如下：</p>
        <div className="step-grid">
          {pipelineSteps.map((item, index) => (
            <div className="step-card" key={item.title}>
              <div className="step-index">{index + 1}</div>
              <div>
                <h4>{item.title}</h4>
                <p>{item.detail}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="code-card single">
          <div className="card-title">ReactDOM.render</div>
          <pre>{`ReactDOM.render(<App />, document.getElementById("root"));`}</pre>
        </div>
        <div className="code-card single">
          <div className="card-title">创建函数组件 VNode</div>
          <pre>{`const element = React.createElement(FunctionComponent, { name: "函数组件" });`}</pre>
        </div>
        <div className="code-card single">
          <div className="card-title">render API</div>
          <pre>{`ReactDOM.render(element, container[, callback]);`}</pre>
        </div>
      </section>
      

      <section className="section">
        <h2>createElement 源码（简版）</h2>
        <p>createElement 会过滤掉 __self/__source，处理 defaultProps，并把所有 child 统一挂在 props.children 上。</p>
        <div className="code-card single">
          <pre>{createElementImpl}</pre>
        </div>
      </section>

      <section className="section">
        <h2>render → createNode → DOM</h2>
        <p>render 函数递归遍历虚拟 DOM，按节点类型分别创建真实 DOM。</p>
        <div className="code-card single">
          <pre>{renderImpl}</pre>
        </div>
      </section>

      <section className="section">
        <h2>19.3 总结</h2>
        <div className="render-flow">
          <img src={reactJxsToDom} alt="React render 流程示意图" />
          <div className="render-flow-text">
            <p>
              使用 React.createElement 或 JSX 编写组件，所有 JSX 最终都会被 Babel 转换成 React.createElement(...)，也就是说 JSX
              只是语法糖。
            </p>
            <p>
              createElement 函数会对 key、ref 等特殊 props 进行处理，并结合 defaultProps 补全默认值，再把传入的孩子节点统一收敛到
              props.children，最终生成虚拟 DOM 对象。
            </p>
            <p>
              ReactDOM.render 则把生成好的虚拟 DOM 渲染到指定容器，在过程中利用批处理、事务与针对特定浏览器的优化策略，把这些
              节点转换为真实 DOM。
            </p>
          </div>
        </div>
        <ul className="bullet-list">
          {summaryPoints.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>
    </div>
  );
}

export default ReactJsxToDom;
