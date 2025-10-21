import React, { useState, useRef, useEffect } from 'react';
import './ReactEventSystem.css';

function ReactEventSystem() {
  // ============ 场景1: 合成事件 vs 原生事件 ============
  const [syntheticLogs, setSyntheticLogs] = useState([]);
  const [nativeLogs, setNativeLogs] = useState([]);
  const syntheticBtnRef = useRef(null);
  const nativeBtnRef = useRef(null);

  useEffect(() => {
    // 原生事件监听
    const nativeBtn = nativeBtnRef.current;
    const handleNativeClick = (e) => {
      setNativeLogs(prev => [...prev, {
        type: 'native',
        message: `原生事件触发 - 类型: ${e.constructor.name}`
      }]);
    };
    
    nativeBtn?.addEventListener('click', handleNativeClick);
    
    return () => {
      nativeBtn?.removeEventListener('click', handleNativeClick);
    };
  }, []);

  const handleSyntheticClick = (e) => {
    setSyntheticLogs(prev => [...prev, {
      type: 'synthetic',
      message: `合成事件触发 - 类型: ${e.constructor.name}, nativeEvent: ${e.nativeEvent.constructor.name}`
    }]);
  };

  // ============ 场景2: 事件委托 ============
  const [delegationLogs, setDelegationLogs] = useState([]);
  const listRef = useRef(null);

  useEffect(() => {
    // 原生事件委托演示
    const list = listRef.current;
    const handleDelegatedClick = (e) => {
      if (e.target.tagName === 'BUTTON') {
        setDelegationLogs(prev => [...prev, {
          message: `点击了: ${e.target.textContent} (原生事件委托)`
        }]);
      }
    };
    
    list?.addEventListener('click', handleDelegatedClick);
    
    return () => {
      list?.removeEventListener('click', handleDelegatedClick);
    };
  }, []);

  const handleReactDelegation = (value) => {
    setDelegationLogs(prev => [...prev, {
      message: `点击了: ${value} (React 自动委托)`
    }]);
  };

  // ============ 场景3: 事件冒泡与捕获 ============
  const [bubbleLogs, setBubbleLogs] = useState([]);

  const handleOuterClick = (phase) => {
    setBubbleLogs(prev => [...prev, {
      type: 'outer',
      message: `外层 DIV - ${phase}阶段`
    }]);
  };

  const handleMiddleClick = (phase) => {
    setBubbleLogs(prev => [...prev, {
      type: 'middle',
      message: `中层 DIV - ${phase}阶段`
    }]);
  };

  const handleInnerClick = (e, phase) => {
    if (phase === '冒泡') {
      e.stopPropagation(); // 演示阻止冒泡
    }
    setBubbleLogs(prev => [...prev, {
      type: 'inner',
      message: `内层按钮 - ${phase}阶段${phase === '冒泡' ? ' (已阻止冒泡)' : ''}`
    }]);
  };

  // ============ 场景4: 事件对象 ============
  const [eventDetails, setEventDetails] = useState(null);

  const handleEventAnalysis = (e) => {
    setEventDetails({
      type: e.type,
      target: e.target.tagName,
      currentTarget: e.currentTarget.tagName,
      bubbles: e.bubbles,
      cancelable: e.cancelable,
      defaultPrevented: e.defaultPrevented,
      eventPhase: e.eventPhase,
      isTrusted: e.isTrusted,
      timeStamp: e.timeStamp.toFixed(2),
      clientX: e.clientX || 'N/A',
      clientY: e.clientY || 'N/A',
    });
  };

  // ============ 场景5: 阻止默认行为 ============
  const [preventLogs, setPreventLogs] = useState([]);

  const handleLinkClick = (e, shouldPrevent) => {
    if (shouldPrevent) {
      e.preventDefault();
      setPreventLogs(prev => [...prev, {
        type: 'prevented',
        message: '✅ 调用了 e.preventDefault()，链接跳转被阻止'
      }]);
    } else {
      setPreventLogs(prev => [...prev, {
        type: 'allowed',
        message: '⚠️ 未阻止默认行为，链接会跳转（实际被拦截了）'
      }]);
      e.preventDefault(); // 实际还是阻止，避免真的跳转
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setPreventLogs(prev => [...prev, {
      type: 'prevented',
      message: '✅ 表单提交被阻止，通过 AJAX 提交'
    }]);
  };

  // 测试场景
  const [activeTest, setActiveTest] = useState('synthetic');
  const testScenarios = [
    { id: 'synthetic', name: '合成事件' },
    { id: 'delegation', name: '事件委托' },
    { id: 'bubbling', name: '冒泡与捕获' },
    { id: 'event-object', name: '事件对象' },
    { id: 'prevent', name: '阻止默认行为' }
  ];

  // 代码示例
  const syntheticEventCode = `// React 合成事件
function App() {
  const handleClick = (e) => {
    console.log(e) // SyntheticBaseEvent (React 包装的事件)
    console.log(e.nativeEvent) // MouseEvent (原生 DOM 事件)
    
    // 合成事件的优势：
    // 1. 跨浏览器兼容性
    // 2. 统一的事件接口
    // 3. 性能优化（事件委托）
  }
  
  return <button onClick={handleClick}>点击</button>
}

// 原生事件
function App() {
  const btnRef = useRef(null)
  
  useEffect(() => {
    const handleClick = (e) => {
      console.log(e) // MouseEvent (原生 DOM 事件)
    }
    
    btnRef.current.addEventListener('click', handleClick)
    
    return () => {
      btnRef.current.removeEventListener('click', handleClick)
    }
  }, [])
  
  return <button ref={btnRef}>点击</button>
}`;

  const delegationCode = `// React 自动使用事件委托
function List() {
  const handleClick = (id) => {
    console.log('点击了:', id)
  }
  
  // React 会将所有 onClick 委托到根节点
  // 而不是为每个按钮单独绑定事件
  return (
    <div>
      {items.map(item => (
        <button 
          key={item.id}
          onClick={() => handleClick(item.id)}
        >
          {item.name}
        </button>
      ))}
    </div>
  )
}

// 原理：
// React 17之前：事件委托到 document
// React 17+：事件委托到根容器 (root)

// 好处：
// 1. 减少内存占用（不为每个元素绑定）
// 2. 动态元素自动支持
// 3. 性能优化`;

  const bubblingCode = `// 事件冒泡
function App() {
  return (
    <div onClick={() => console.log('外层')}>
      <div onClick={() => console.log('中层')}>
        <button onClick={(e) => {
          console.log('内层')
          e.stopPropagation() // 阻止冒泡
        }}>
          点击
        </button>
      </div>
    </div>
  )
}
// 执行顺序（冒泡）: 内层 → 中层 → 外层
// 如果调用 stopPropagation()，则只输出：内层

// 事件捕获
function App() {
  return (
    <div onClickCapture={() => console.log('外层捕获')}>
      <div onClickCapture={() => console.log('中层捕获')}>
        <button onClickCapture={() => console.log('内层捕获')}>
          点击
        </button>
      </div>
    </div>
  )
}
// 执行顺序（捕获）: 外层 → 中层 → 内层`;

  const preventDefaultCode = `// 阻止默认行为
function App() {
  const handleLinkClick = (e) => {
    e.preventDefault() // 阻止链接跳转
    console.log('链接被点击，但不会跳转')
    // 可以在这里使用 React Router 导航
  }
  
  const handleFormSubmit = (e) => {
    e.preventDefault() // 阻止表单提交
    console.log('表单提交被阻止')
    // 通过 AJAX 提交数据
  }
  
  return (
    <>
      <a href="https://google.com" onClick={handleLinkClick}>
        点击链接
      </a>
      
      <form onSubmit={handleFormSubmit}>
        <input name="username" />
        <button type="submit">提交</button>
      </form>
    </>
  )
}`;

  const eventPoolCode = `// ⚠️ React 16 的事件池（已废弃）
function App() {
  const handleClick = (e) => {
    console.log(e.type) // 'click'
    
    setTimeout(() => {
      console.log(e.type) // null (事件对象被清空)
    }, 100)
  }
  
  return <button onClick={handleClick}>点击</button>
}

// React 17+ 已移除事件池
// 异步访问事件对象不再有问题
function App() {
  const handleClick = (e) => {
    setTimeout(() => {
      console.log(e.type) // ✅ 'click' (正常工作)
    }, 100)
  }
  
  return <button onClick={handleClick}>点击</button>
}`;

  return (
    <div className="event-demo-container">
      {/* 返回首页按钮 */}
      <button className="back-button" onClick={() => window.history.back()}>
        ← 返回首页
      </button>

      {/* 页面标题 */}
      <div className="page-header">
        <h1>React 事件机制详解</h1>
        <p className="subtitle">深入理解 React 合成事件、事件委托、冒泡捕获与最佳实践</p>
      </div>

      {/* 核心概念 */}
      <section className="section">
        <h2>📚 核心概念</h2>
        <div className="concept-grid">
          <div className="concept-card">
            <h3>合成事件 (SyntheticEvent)</h3>
            <p>合成事件是 React 模拟原⽣ DOM 事件所有能⼒的⼀个事件对象，即浏览器原⽣事件的跨浏览器包装。根据 W3C 规范来定义合成事件，兼容所有浏览器，拥有与浏览器原⽣事件相同的接⼝，</p>
            <div className="feature-list">
              <span className="feature good">✅ 跨浏览器兼容</span>
              <span className="feature good">✅ 统一的 API</span>
              <span className="feature good">✅ 性能优化</span>
              <span className="feature good">✅ 自动内存管理</span>
            </div>
          </div>
          <div className="concept-card">
            <h3>事件委托 (Event Delegation)</h3>
            <p>虽然事件看似绑定到 DOM 元素上，但实际并不会把事件代理函数直接绑定到真实的节点上，⽽
            是把所有的事件绑定到结构的最外层，使⽤⼀个统⼀的事件去监听</p>
            <div className="feature-list">
              <span className="feature good">✅ 减少内存占用</span>
              <span className="feature good">✅ 动态元素支持</span>
              <span className="feature good">✅ 性能优化</span>
              <span className="feature info">ℹ️ React 17+ 委托到 root</span>
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
          {/* 场景1: 合成事件 vs 原生事件 */}
          {activeTest === 'synthetic' && (
            <div className="test-case">
              <h3>场景1: 合成事件 vs 原生事件</h3>
              <div className="test-panels">
                <div className="panel">
                  <h4>React 合成事件</h4>
                  <div className="code-block">
                    <pre>{syntheticEventCode}</pre>
                  </div>
                  <div className="interactive-area">
                    <button
                      ref={syntheticBtnRef}
                      onClick={handleSyntheticClick}
                      className="demo-btn"
                    >
                      点击触发合成事件
                    </button>
                  </div>
                  <div className="result-box">
                    <div className="result-label">事件日志:</div>
                    <div className="log-list">
                      {syntheticLogs.map((log, i) => (
                        <div key={i} className="log-item synthetic">
                          {log.message}
                        </div>
                      ))}
                      {syntheticLogs.length === 0 && (
                        <div className="empty-log">点击按钮查看事件信息</div>
                      )}
                    </div>
                    <div className="info-box">
                      <strong>合成事件特点:</strong>
                      <ul>
                        <li>React 封装的事件对象</li>
                        <li>提供 nativeEvent 访问原生事件</li>
                        <li>跨浏览器兼容（IE9+）</li>
                        <li>事件对象会被复用（React 17前）</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="panel">
                  <h4>原生 DOM 事件</h4>
                  <div className="code-block">
                    <pre>{`// 原生事件监听
const btnRef = useRef(null)

useEffect(() => {
  const btn = btnRef.current
  
  const handleClick = (e) => {
    console.log(e) // MouseEvent
  }
  
  btn.addEventListener('click', handleClick)
  
  return () => {
    btn.removeEventListener('click', handleClick)
  }
}, [])`}</pre>
                  </div>
                  <div className="interactive-area">
                    <button
                      ref={nativeBtnRef}
                      className="demo-btn"
                    >
                      点击触发原生事件
                    </button>
                  </div>
                  <div className="result-box">
                    <div className="result-label">事件日志:</div>
                    <div className="log-list">
                      {nativeLogs.map((log, i) => (
                        <div key={i} className="log-item native">
                          {log.message}
                        </div>
                      ))}
                      {nativeLogs.length === 0 && (
                        <div className="empty-log">点击按钮查看事件信息</div>
                      )}
                    </div>
                    <div className="info-box">
                      <strong>原生事件特点:</strong>
                      <ul>
                        <li>浏览器原生的事件对象</li>
                        <li>需要手动管理监听器</li>
                        <li>需要处理浏览器兼容性</li>
                        <li>直接操作 DOM</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div className="conclusion">
                <strong>结论:</strong> React 使用合成事件统一处理所有浏览器的事件差异，
                提供一致的 API。合成事件是对原生事件的封装和增强。
              </div>
            </div>
          )}

          {/* 场景2: 事件委托 */}
          {activeTest === 'delegation' && (
            <div className="test-case">
              <h3>场景2: 事件委托机制</h3>
              <div className="code-block large">
                <pre>{delegationCode}</pre>
              </div>
              
              <div className="delegation-demo">
                <div className="demo-section">
                  <h4>React 事件委托（自动）</h4>
                  <p className="demo-desc">React 会自动将事件委托到根容器，无需手动处理</p>
                  <div className="button-group">
                    {['按钮1', '按钮2', '按钮3', '按钮4', '按钮5'].map((label, i) => (
                      <button
                        key={i}
                        onClick={() => handleReactDelegation(label)}
                        className="delegation-btn"
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="demo-section">
                  <h4>原生事件委托（手动）</h4>
                  <p className="demo-desc">需要在父元素上监听事件，然后判断 target</p>
                  <div className="button-group" ref={listRef}>
                    {['按钮A', '按钮B', '按钮C', '按钮D', '按钮E'].map((label, i) => (
                      <button key={i} className="delegation-btn">
                        {label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="result-box">
                  <div className="result-label">事件日志:</div>
                  <div className="log-list">
                    {delegationLogs.map((log, i) => (
                      <div key={i} className="log-item">
                        {log.message}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="delegation-explain">
                <h4>🔍 事件委托原理</h4>
                <div className="explain-grid">
                  <div className="explain-card">
                    <div className="explain-title">传统方式</div>
                    <div className="explain-content">
                      <p>为每个元素单独绑定事件</p>
                      <code>{'button1.addEventListener(...)'}<br/>
                      {'button2.addEventListener(...)'}<br/>
                      {'button3.addEventListener(...)'}</code>
                      <p className="explain-problem">❌ 内存占用大，性能差</p>
                    </div>
                  </div>
                  <div className="explain-card">
                    <div className="explain-title">事件委托</div>
                    <div className="explain-content">
                      <p>在父元素上绑定一个事件</p>
                      <code>{'container.addEventListener(...)'}</code>
                      <p className="explain-benefit">✅ 只绑定一次，性能好</p>
                    </div>
                  </div>
                  <div className="explain-card">
                    <div className="explain-title">React 优化</div>
                    <div className="explain-content">
                      <p>自动委托到根容器</p>
                      <code>{'root.addEventListener(...)'}</code>
                      <p className="explain-benefit">✅ 自动优化，无需关心</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="conclusion">
                <strong>结论:</strong> React 自动使用事件委托，开发者只需正常编写 onClick 等事件处理器，
                React 会在底层优化性能。
              </div>
            </div>
          )}

          {/* 场景3: 冒泡与捕获 */}
          {activeTest === 'bubbling' && (
            <div className="test-case">
              <h3>场景3: 事件冒泡与捕获</h3>
              <div className="code-block large">
                <pre>{bubblingCode}</pre>
              </div>

              <div className="bubbling-demo">
                <div className="demo-row">
                  <div className="demo-col">
                    <h4>冒泡阶段（从内到外）</h4>
                    <div 
                      className="bubble-outer"
                      onClick={() => handleOuterClick('冒泡')}
                    >
                      <div className="layer-label">外层 DIV</div>
                      <div 
                        className="bubble-middle"
                        onClick={() => handleMiddleClick('冒泡')}
                      >
                        <div className="layer-label">中层 DIV</div>
                        <button 
                          className="bubble-inner"
                          onClick={(e) => handleInnerClick(e, '冒泡')}
                        >
                          内层按钮<br/>(阻止冒泡)
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="demo-col">
                    <h4>捕获阶段（从外到内）</h4>
                    <div 
                      className="bubble-outer"
                      onClickCapture={() => handleOuterClick('捕获')}
                    >
                      <div className="layer-label">外层 DIV</div>
                      <div 
                        className="bubble-middle"
                        onClickCapture={() => handleMiddleClick('捕获')}
                      >
                        <div className="layer-label">中层 DIV</div>
                        <button 
                          className="bubble-inner"
                          onClickCapture={(e) => handleInnerClick(e, '捕获')}
                        >
                          内层按钮
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="result-box">
                  <div className="result-label">事件执行日志:</div>
                  <button 
                    onClick={() => setBubbleLogs([])}
                    className="clear-btn"
                  >
                    清空日志
                  </button>
                  <div className="log-list">
                    {bubbleLogs.map((log, i) => (
                      <div key={i} className={`log-item ${log.type}`}>
                        {i + 1}. {log.message}
                      </div>
                    ))}
                    {bubbleLogs.length === 0 && (
                      <div className="empty-log">点击上方按钮查看事件传播顺序</div>
                    )}
                  </div>
                </div>
              </div>

              <div className="conclusion">
                <strong>结论:</strong> React 支持冒泡（onClick）和捕获（onClickCapture）两种事件阶段。
                使用 stopPropagation() 可以阻止事件继续传播。
              </div>
            </div>
          )}

          {/* 场景4: 事件对象 */}
          {activeTest === 'event-object' && (
            <div className="test-case">
              <h3>场景4: 事件对象属性</h3>
              
              <div className="event-object-demo">
                <div className="demo-area">
                  <h4>点击下方区域触发事件</h4>
                  <div 
                    className="event-trigger-area"
                    onClick={handleEventAnalysis}
                    onMouseMove={handleEventAnalysis}
                  >
                    <p>点击或移动鼠标</p>
                    <button className="trigger-btn">点击这个按钮</button>
                  </div>
                </div>

                {eventDetails && (
                  <div className="event-details">
                    <h4>事件对象属性</h4>
                    <div className="details-grid">
                      <div className="detail-item">
                        <span className="detail-key">type:</span>
                        <span className="detail-value">{eventDetails.type}</span>
                      </div>
                      <div className="detail-item">
                        <span className="detail-key">target:</span>
                        <span className="detail-value">{eventDetails.target}</span>
                      </div>
                      <div className="detail-item">
                        <span className="detail-key">currentTarget:</span>
                        <span className="detail-value">{eventDetails.currentTarget}</span>
                      </div>
                      <div className="detail-item">
                        <span className="detail-key">bubbles:</span>
                        <span className="detail-value">{eventDetails.bubbles ? 'true' : 'false'}</span>
                      </div>
                      <div className="detail-item">
                        <span className="detail-key">cancelable:</span>
                        <span className="detail-value">{eventDetails.cancelable ? 'true' : 'false'}</span>
                      </div>
                      <div className="detail-item">
                        <span className="detail-key">defaultPrevented:</span>
                        <span className="detail-value">{eventDetails.defaultPrevented ? 'true' : 'false'}</span>
                      </div>
                      <div className="detail-item">
                        <span className="detail-key">eventPhase:</span>
                        <span className="detail-value">
                          {eventDetails.eventPhase === 1 ? '捕获' : eventDetails.eventPhase === 2 ? '目标' : '冒泡'}
                        </span>
                      </div>
                      <div className="detail-item">
                        <span className="detail-key">isTrusted:</span>
                        <span className="detail-value">{eventDetails.isTrusted ? 'true' : 'false'}</span>
                      </div>
                      <div className="detail-item">
                        <span className="detail-key">timeStamp:</span>
                        <span className="detail-value">{eventDetails.timeStamp}ms</span>
                      </div>
                      <div className="detail-item">
                        <span className="detail-key">clientX:</span>
                        <span className="detail-value">{eventDetails.clientX}</span>
                      </div>
                      <div className="detail-item">
                        <span className="detail-key">clientY:</span>
                        <span className="detail-value">{eventDetails.clientY}</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="conclusion">
                <strong>结论:</strong> React 合成事件对象提供了丰富的属性，
                兼容所有浏览器，并提供 nativeEvent 访问原生事件对象。
              </div>
            </div>
          )}

          {/* 场景5: 阻止默认行为 */}
          {activeTest === 'prevent' && (
            <div className="test-case">
              <h3>场景5: 阻止默认行为</h3>
              <div className="code-block large">
                <pre>{preventDefaultCode}</pre>
              </div>

              <div className="prevent-demo">
                <div className="demo-section">
                  <h4>阻止链接跳转</h4>
                  <div className="demo-box">
                    <a 
                      href="https://www.google.com" 
                      onClick={(e) => handleLinkClick(e, true)}
                      className="demo-link"
                    >
                      点击链接（已阻止跳转）
                    </a>
                    <a 
                      href="https://www.google.com" 
                      onClick={(e) => handleLinkClick(e, false)}
                      className="demo-link"
                    >
                      点击链接（未阻止，会跳转）
                    </a>
                  </div>
                </div>

                <div className="demo-section">
                  <h4>阻止表单提交</h4>
                  <form onSubmit={handleFormSubmit} className="demo-form-prevent">
                    <input 
                      type="text" 
                      placeholder="输入用户名"
                      className="demo-input-prevent"
                    />
                    <button type="submit" className="submit-btn-prevent">
                      提交表单
                    </button>
                  </form>
                </div>

                <div className="result-box">
                  <div className="result-label">操作日志:</div>
                  <div className="log-list">
                    {preventLogs.map((log, i) => (
                      <div key={i} className={`log-item ${log.type}`}>
                        {log.message}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="conclusion">
                <strong>结论:</strong> 使用 e.preventDefault() 阻止默认行为是 React 开发中的常见操作，
                例如阻止链接跳转、表单提交，然后用自定义逻辑处理。
              </div>
            </div>
          )}
        </div>
      </section>

      {/* React 事件特性 */}
      <section className="section">
        <h2>⚛️ React 事件系统特性</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">🎯</div>
            <h3>1. 合成事件包装</h3>
            <p>React 将所有原生事件包装成合成事件，提供统一的跨浏览器接口</p>
            <div className="feature-example">
              <code>onClick, onChange, onSubmit...</code>
            </div>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🎪</div>
            <h3>2. 自动事件委托</h3>
            <p>所有事件都委托到根容器，减少内存占用，提升性能</p>
            <div className="feature-example">
              <code>React 17前: document<br/>React 17+: root</code>
            </div>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🔄</div>
            <h3>3. 事件池优化</h3>
            <p>React 16 使用事件池复用事件对象（React 17+ 已移除）</p>
            <div className="feature-example">
              <code>React 17+ 不再需要 e.persist()</code>
            </div>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🌐</div>
            <h3>4. 跨浏览器兼容</h3>
            <p>统一处理浏览器差异，开发者无需担心兼容性问题</p>
            <div className="feature-example">
              <code>IE9+ 完全支持</code>
            </div>
          </div>
        </div>
      </section>

      {/* 最佳实践 */}
      <section className="section">
        <h2>💡 最佳实践</h2>
        <div className="best-practices">
          <div className="practice-card">
            <div className="practice-number">1</div>
            <div className="practice-content">
              <h4>使用箭头函数或 bind 传递参数</h4>
              <div className="code-block small">
                <pre>{`// ✅ 推荐：箭头函数
<button onClick={() => handleClick(id)}>删除</button>

// ✅ 推荐：bind
<button onClick={handleClick.bind(this, id)}>删除</button>

// ❌ 不推荐：会立即执行
<button onClick={handleClick(id)}>删除</button>`}</pre>
              </div>
            </div>
          </div>

          <div className="practice-card">
            <div className="practice-number">2</div>
            <div className="practice-content">
              <h4>使用 useCallback 优化事件处理器</h4>
              <div className="code-block small">
                <pre>{`const handleClick = useCallback(() => {
  console.log('点击')
}, []) // 依赖项为空，函数不会重新创建

<button onClick={handleClick}>点击</button>`}</pre>
              </div>
            </div>
          </div>

          <div className="practice-card">
            <div className="practice-number">3</div>
            <div className="practice-content">
              <h4>React 17+ 无需担心事件池</h4>
              <div className="code-block small">
                <pre>{`// React 17+ 可以直接异步访问事件对象
const handleClick = (e) => {
  setTimeout(() => {
    console.log(e.type) // ✅ 正常工作
  }, 1000)
}

// React 16 需要 persist
const handleClick = (e) => {
  e.persist() // 保留事件对象
  setTimeout(() => {
    console.log(e.type)
  }, 1000)
}`}</pre>
              </div>
            </div>
          </div>

          <div className="practice-card">
            <div className="practice-number">4</div>
            <div className="practice-content">
              <h4>避免在渲染时绑定新函数</h4>
              <div className="code-block small">
                <pre>{`// ❌ 不推荐：每次渲染都创建新函数
{items.map(item => (
  <div onClick={() => handleClick(item.id)} />
))}

// ✅ 推荐：使用 data 属性
{items.map(item => (
  <div onClick={handleClick} data-id={item.id} />
))}

const handleClick = (e) => {
  const id = e.currentTarget.dataset.id
}`}</pre>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 对比总结 */}
      <section className="section">
        <h2>📊 React 事件 vs 原生事件</h2>
        <div className="comparison-table">
          <table>
            <thead>
              <tr>
                <th>特性</th>
                <th>React 合成事件</th>
                <th>原生 DOM 事件</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>事件命名</td>
                <td>驼峰式 (onClick, onChange)</td>
                <td>小写 (onclick, onchange)</td>
              </tr>
              <tr>
                <td>事件处理器</td>
                <td>传递函数</td>
                <td>传递字符串或函数</td>
              </tr>
              <tr>
                <td>阻止默认</td>
                <td>e.preventDefault()</td>
                <td>return false 或 e.preventDefault()</td>
              </tr>
              <tr>
                <td>事件委托</td>
                <td>自动委托到 root</td>
                <td>需要手动实现</td>
              </tr>
              <tr>
                <td>跨浏览器</td>
                <td>✅ 自动兼容</td>
                <td>❌ 需要手动处理</td>
              </tr>
              <tr>
                <td>this 绑定</td>
                <td>需要手动绑定或使用箭头函数</td>
                <td>自动绑定到元素</td>
              </tr>
              <tr>
                <td>性能</td>
                <td>优化后的事件委托</td>
                <td>每个元素单独绑定</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 注意事项 */}
      <section className="section">
        <h2>⚠️ 注意事项</h2>
        <div className="warnings-grid">
          <div className="warning-card">
            <div className="warning-icon">⚠️</div>
            <div className="warning-content">
              <h4>混合使用原生事件要小心</h4>
              <p>如果同时使用 React 事件和原生事件，可能会遇到执行顺序问题。</p>
              <div className="code-block small">
                <pre>{`// ⚠️ 执行顺序可能出乎意料
useEffect(() => {
  document.addEventListener('click', () => {
    console.log('原生事件')
  })
}, [])

<div onClick={() => console.log('React 事件')}>
  点击
</div>

// React 17+: 原生 → React
// React 16: React → 原生`}</pre>
              </div>
            </div>
          </div>

          <div className="warning-card">
            <div className="warning-icon">⚠️</div>
            <div className="warning-content">
              <h4>不要在循环中创建新函数</h4>
              <p>每次渲染都会创建新函数，影响性能和子组件优化。</p>
              <div className="code-block small">
                <pre>{`// ❌ 不好
{items.map(item => (
  <Item onClick={() => handle(item.id)} />
))}

// ✅ 好
const handleClick = useCallback((e) => {
  const id = e.currentTarget.dataset.id
  handle(id)
}, [])

{items.map(item => (
  <Item onClick={handleClick} data-id={item.id} />
))}`}</pre>
              </div>
            </div>
          </div>

          <div className="warning-card">
            <div className="warning-icon">💡</div>
            <div className="warning-content">
              <h4>React 17 的重要变化</h4>
              <p>React 17 将事件委托从 document 改为 root 容器。</p>
              <ul>
                <li>更容易嵌入到其他框架</li>
                <li>避免与原生事件冲突</li>
                <li>移除了事件池机制</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 事件池说明 */}
      <section className="section">
        <h2>🔄 事件池机制（React 16）</h2>
        <div className="event-pool-explanation">
          <div className="pool-info">
            <h3>React 16 及之前版本</h3>
            <div className="code-block">
              <pre>{eventPoolCode}</pre>
            </div>
            <div className="pool-note">
              <strong>问题：</strong>事件对象会被复用，异步访问时属性会被清空
              <br/>
              <strong>解决：</strong>调用 <code>e.persist()</code> 或提前保存需要的值
            </div>
          </div>
          <div className="pool-info">
            <h3>React 17+ 的改进</h3>
            <div className="improvement-list">
              <div className="improvement-item">
                <span className="improvement-icon">✅</span>
                <span>移除了事件池</span>
              </div>
              <div className="improvement-item">
                <span className="improvement-icon">✅</span>
                <span>可以安全地异步访问事件对象</span>
              </div>
              <div className="improvement-item">
                <span className="improvement-icon">✅</span>
                <span>不再需要 e.persist()</span>
              </div>
              <div className="improvement-item">
                <span className="improvement-icon">✅</span>
                <span>更符合直觉的使用方式</span>
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
              <h4>合成事件是 React 的封装</h4>
              <p>提供跨浏览器兼容的统一 API，底层使用事件委托优化性能</p>
            </div>
          </div>
          <div className="point-card">
            <div className="point-number">2</div>
            <div className="point-content">
              <h4>事件命名使用驼峰式</h4>
              <p>onClick, onChange, onSubmit 等，与原生事件的小写形式不同</p>
            </div>
          </div>
          <div className="point-card">
            <div className="point-number">3</div>
            <div className="point-content">
              <h4>阻止默认行为必须显式调用</h4>
              <p>不能像原生事件那样 return false，必须调用 e.preventDefault()</p>
            </div>
          </div>
          <div className="point-card">
            <div className="point-number">4</div>
            <div className="point-content">
              <h4>React 17+ 移除事件池</h4>
              <p>可以安全地在异步代码中访问事件对象，无需调用 e.persist()</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ReactEventSystem;

