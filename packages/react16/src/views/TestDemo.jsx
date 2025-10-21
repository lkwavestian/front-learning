import React, { useState } from 'react';
import './TestDemo.css';

function TestDemo() {
  const [count, setCount] = useState(0);
  const [text, setText] = useState('');
  const [items, setItems] = useState(['React', 'Vue', 'Angular']);

  const handleAddItem = () => {
    if (text.trim()) {
      setItems([...items, text]);
      setText('');
    }
  };

  const handleRemoveItem = (index) => {
    setItems(items.filter((_, i) => i !== index));
  };

  return (
    <div className="test-demo-container">
      {/* 返回首页按钮 */}
      <button className="back-button" onClick={() => window.history.back()}>
        ← 返回首页
      </button>

      {/* 页面标题 */}
      <div className="page-header">
        <h1>React 测试页面</h1>
        <p className="subtitle">测试 React 基础功能：状态管理、事件处理、列表渲染</p>
      </div>

      {/* 计数器测试 */}
      <section className="section">
        <h2>🔢 计数器测试</h2>
        <div className="counter-box">
          <div className="counter-display">{count}</div>
          <div className="counter-buttons">
            <button onClick={() => setCount(count - 1)} className="btn btn-danger">
              - 减少
            </button>
            <button onClick={() => setCount(0)} className="btn btn-secondary">
              🔄 重置
            </button>
            <button onClick={() => setCount(count + 1)} className="btn btn-success">
              + 增加
            </button>
          </div>
        </div>
      </section>

      {/* 列表管理测试 */}
      <section className="section">
        <h2>📝 列表管理测试</h2>
        <div className="list-box">
          <div className="input-group">
            <input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleAddItem()}
              placeholder="输入内容后按回车或点击添加"
              className="input-field"
            />
            <button onClick={handleAddItem} className="btn btn-primary">
              添加
            </button>
          </div>
          
          <div className="items-list">
            {items.length === 0 ? (
              <div className="empty-state">暂无数据，请添加内容</div>
            ) : (
              items.map((item, index) => (
                <div key={index} className="list-item">
                  <span className="item-index">{index + 1}</span>
                  <span className="item-text">{item}</span>
                  <button
                    onClick={() => handleRemoveItem(index)}
                    className="btn-remove"
                  >
                    删除
                  </button>
                </div>
              ))
            )}
          </div>

          <div className="list-stats">
            <span className="stat-badge">总计: {items.length} 项</span>
          </div>
        </div>
      </section>

      {/* React 核心概念展示 */}
      <section className="section">
        <h2>📚 React 核心概念</h2>
        <div className="concept-grid">
          <div className="concept-card">
            <div className="concept-icon">⚛️</div>
            <h3>组件化</h3>
            <p>将 UI 拆分为独立、可复用的组件</p>
          </div>
          <div className="concept-card">
            <div className="concept-icon">🔄</div>
            <h3>状态管理</h3>
            <p>使用 useState、useReducer 管理组件状态</p>
          </div>
          <div className="concept-card">
            <div className="concept-icon">🎣</div>
            <h3>Hooks</h3>
            <p>函数组件也能使用状态和生命周期</p>
          </div>
          <div className="concept-card">
            <div className="concept-icon">🌳</div>
            <h3>虚拟 DOM</h3>
            <p>高效的 DOM 更新机制</p>
          </div>
        </div>
      </section>

      {/* 状态信息 */}
      <section className="section">
        <h2>📊 当前状态</h2>
        <div className="state-display">
          <pre>{JSON.stringify({ count, items }, null, 2)}</pre>
        </div>
      </section>
    </div>
  );
}

export default TestDemo;

