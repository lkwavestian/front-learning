import React, { useState, useRef, useEffect } from 'react';
import './ControlledVsUncontrolled.css';

function ControlledVsUncontrolled() {
  // ============ 场景1: 基础对比 ============
  const [controlledValue, setControlledValue] = useState('');
  const uncontrolledRef = useRef(null);
  const [controlledLogs, setControlledLogs] = useState([]);
  const [uncontrolledLogs, setUncontrolledLogs] = useState([]);

  // ============ 场景2: 表单验证 ============
  const [validatedValue, setValidatedValue] = useState('');
  const [validationError, setValidationError] = useState('');
  const uncontrolledValidationRef = useRef(null);
  const [uncontrolledValidationError, setUncontrolledValidationError] = useState('');

  // ============ 场景3: 多输入表单 ============
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });
  const uncontrolledFormRef = useRef({
    username: null,
    email: null,
    password: null
  });

  // ============ 场景4: 性能对比 ============
  const [renderCount, setRenderCount] = useState(0);
  const [perfControlledValue, setPerfControlledValue] = useState('');
  const perfUncontrolledRef = useRef(null);

  // 测试场景
  const [activeTest, setActiveTest] = useState('basic');
  const testScenarios = [
    { id: 'basic', name: '基础对比' },
    { id: 'validation', name: '表单验证' },
    { id: 'form', name: '多输入表单' },
    { id: 'performance', name: '性能对比' }
  ];

  // 计算渲染次数
  useEffect(() => {
    setRenderCount(prev => prev + 1);
  });

  // ============ 场景1: 基础对比处理函数 ============
  const handleControlledChange = (e) => {
    const value = e.target.value;
    setControlledValue(value);
    setControlledLogs(prev => [...prev, {
      type: 'change',
      message: `输入变化: "${value}" (state 已更新)`
    }]);
  };

  const handleControlledSubmit = () => {
    setControlledLogs(prev => [...prev, {
      type: 'submit',
      message: `提交值: "${controlledValue}"`
    }]);
  };

  const handleUncontrolledSubmit = () => {
    const value = uncontrolledRef.current.value;
    setUncontrolledLogs(prev => [...prev, {
      type: 'submit',
      message: `提交值: "${value}" (通过 ref 获取)`
    }]);
  };

  const getUncontrolledValue = () => {
    const value = uncontrolledRef.current.value;
    setUncontrolledLogs(prev => [...prev, {
      type: 'get',
      message: `获取值: "${value}"`
    }]);
  };

  const resetUncontrolledValue = () => {
    uncontrolledRef.current.value = '';
    setUncontrolledLogs(prev => [...prev, {
      type: 'reset',
      message: '已通过 ref.current.value 重置'
    }]);
  };

  // ============ 场景2: 表单验证处理函数 ============
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) return '邮箱不能为空';
    if (!emailRegex.test(email)) return '邮箱格式不正确';
    return '';
  };

  const handleValidatedChange = (e) => {
    const value = e.target.value;
    setValidatedValue(value);
    const error = validateEmail(value);
    setValidationError(error);
  };

  const handleUncontrolledValidation = () => {
    const value = uncontrolledValidationRef.current.value;
    const error = validateEmail(value);
    setUncontrolledValidationError(error);
  };

  // ============ 场景3: 多输入表单处理函数 ============
  const handleFormChange = (field) => (e) => {
    setFormData(prev => ({
      ...prev,
      [field]: e.target.value
    }));
  };

  const handleControlledFormSubmit = (e) => {
    e.preventDefault();
    alert(`受控表单提交:\n${JSON.stringify(formData, null, 2)}`);
  };

  const handleUncontrolledFormSubmit = (e) => {
    e.preventDefault();
    const data = {
      username: uncontrolledFormRef.current.username.value,
      email: uncontrolledFormRef.current.email.value,
      password: uncontrolledFormRef.current.password.value
    };
    alert(`非受控表单提交:\n${JSON.stringify(data, null, 2)}`);
  };

  // 代码示例
  const controlledExample = `// 受控组件：值由 React state 控制
function ControlledInput() {
  const [value, setValue] = useState('');
  
  return (
    <input 
      type="text"
      value={value}  // ✅ 值绑定到 state
      onChange={(e) => setValue(e.target.value)} 
    />
  );
}

// 特点：
// 1. 值存储在 state 中
// 2. 每次输入都会触发重新渲染
// 3. 可以实时验证、格式化
// 4. 单一数据源（state）`;

  const uncontrolledExample = `// 非受控组件：值由 DOM 自身管理
function UncontrolledInput() {
  const inputRef = useRef(null);
  
  const handleSubmit = () => {
    // ✅ 需要时通过 ref 获取值
    const value = inputRef.current.value;
    console.log(value);
  };
  
  return (
    <>
      <input 
        type="text"
        ref={inputRef}  // ✅ 使用 ref 引用
        defaultValue="" // 使用 defaultValue 而非 value
      />
      <button onClick={handleSubmit}>提交</button>
    </>
  );
}

// 特点：
// 1. 值存储在 DOM 中
// 2. 输入不会触发重新渲染
// 3. 需要时通过 ref 获取
// 4. 更接近传统 HTML 表单`;

  const validationExample = `// 受控组件：实时验证
function ControlledForm() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  
  const handleChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    
    // ✅ 实时验证
    if (!value.includes('@')) {
      setError('邮箱格式不正确');
    } else {
      setError('');
    }
  };
  
  return (
    <div>
      <input value={email} onChange={handleChange} />
      {error && <span className="error">{error}</span>}
    </div>
  );
}`;

  const mixedExample = `// 实际项目：混合使用
function MixedForm() {
  // 受控：需要实时验证的字段
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  
  // 非受控：不需要实时交互的字段
  const nameRef = useRef(null);
  const fileRef = useRef(null);
  
  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    
    if (value.length < 6) {
      setPasswordError('密码至少6位');
    } else {
      setPasswordError('');
    }
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    const data = {
      name: nameRef.current.value,        // 非受控
      password: password,                 // 受控
      file: fileRef.current.files[0]      // 非受控（文件必须用 ref）
    };
    
    console.log(data);
  };
  
  return (
    <form onSubmit={handleSubmit}>
      {/* 非受控：简单字段 */}
      <input ref={nameRef} defaultValue="" />
      
      {/* 受控：需要验证 */}
      <input 
        value={password} 
        onChange={handlePasswordChange}
        type="password" 
      />
      {passwordError && <span>{passwordError}</span>}
      
      {/* 非受控：文件上传 */}
      <input ref={fileRef} type="file" />
      
      <button type="submit">提交</button>
    </form>
  );
}`;

  return (
    <div className="controlled-demo-container">
      {/* 返回首页按钮 */}
      <button className="back-button" onClick={() => window.history.back()}>
        ← 返回首页
      </button>

      {/* 页面标题 */}
      <div className="page-header">
        <h1>React 受控组件 vs 非受控组件</h1>
        <p className="subtitle">通过交互式演示理解两种表单处理方式的区别与使用场景</p>
      </div>

      {/* 核心概念介绍 */}
      <section className="section">
        <h2>📚 核心概念</h2>
        <div className="concept-grid">
          <div className="concept-card">
            <h3>受控组件 (Controlled Components)</h3>
            <p>表单数据由 React 组件的 state 管理</p>
            <div className="feature-list">
              <span className="feature good">✅ 数据由 state 控制</span>
              <span className="feature good">✅ 可以实时验证</span>
              <span className="feature good">✅ 可以实时格式化</span>
              <span className="feature good">✅ 单一数据源</span>
              <span className="feature bad">⚠️ 每次输入触发渲染</span>
            </div>
          </div>
          <div className="concept-card">
            <h3>非受控组件 (Uncontrolled Components)</h3>
            <p>表单数据由 DOM 自身管理，通过 ref 访问</p>
            <div className="feature-list">
              <span className="feature good">✅ 数据由 DOM 管理</span>
              <span className="feature good">✅ 不触发重新渲染</span>
              <span className="feature good">✅ 更接近传统表单</span>
              <span className="feature good">✅ 性能开销小</span>
              <span className="feature bad">⚠️ 难以实时验证</span>
            </div>
          </div>
        </div>
      </section>

      {/* 交互式对比演示 */}
      <section className="section">
        <h2>🎯 交互式对比演示</h2>

        {/* 测试场景选择 */}
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
          {/* 场景1: 基础对比 */}
          {activeTest === 'basic' && (
            <div className="test-case">
              <h3>场景1: 基础对比</h3>
              <div className="test-panels">
                <div className="panel">
                  <h4>受控组件</h4>
                  <div className="code-block">
                    <pre>{controlledExample}</pre>
                  </div>
                  <div className="interactive-area">
                    <input
                      type="text"
                      className="demo-input"
                      value={controlledValue}
                      onChange={handleControlledChange}
                      placeholder="输入内容（受 state 控制）"
                    />
                    <button onClick={handleControlledSubmit}>提交</button>
                    <button onClick={() => {
                      setControlledValue('');
                      setControlledLogs(prev => [...prev, { type: 'reset', message: '已通过 setState 清空' }]);
                    }}>清空</button>
                  </div>
                  <div className="result-box">
                    <div className="result-label">当前 State 值:</div>
                    <div className="value-display">{controlledValue || '(空)'}</div>
                    <div className="result-label">操作日志:</div>
                    <div className="log-list">
                      {controlledLogs.map((log, i) => (
                        <div key={i} className={`log-item ${log.type}`}>
                          {log.message}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="panel">
                  <h4>非受控组件</h4>
                  <div className="code-block">
                    <pre>{uncontrolledExample}</pre>
                  </div>
                  <div className="interactive-area">
                    <input
                      type="text"
                      className="demo-input"
                      ref={uncontrolledRef}
                      defaultValue=""
                      placeholder="输入内容（DOM 自身管理）"
                    />
                    <button onClick={handleUncontrolledSubmit}>提交</button>
                    <button onClick={getUncontrolledValue}>获取值</button>
                    <button onClick={resetUncontrolledValue}>清空</button>
                  </div>
                  <div className="result-box">
                    <div className="result-label">DOM 值（需通过 ref 获取）:</div>
                    <div className="value-display">
                      {uncontrolledRef.current?.value || '(未获取)'}
                    </div>
                    <div className="result-label">操作日志:</div>
                    <div className="log-list">
                      {uncontrolledLogs.map((log, i) => (
                        <div key={i} className={`log-item ${log.type}`}>
                          {log.message}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div className="conclusion">
                <strong>结论:</strong> 受控组件的值始终与 state 同步，每次输入都会更新 state。
                非受控组件的值存储在 DOM 中，需要通过 ref 手动获取。
              </div>
            </div>
          )}

          {/* 场景2: 表单验证 */}
          {activeTest === 'validation' && (
            <div className="test-case">
              <h3>场景2: 表单验证</h3>
              <div className="test-panels">
                <div className="panel">
                  <h4>受控组件 - 实时验证</h4>
                  <div className="code-block">
                    <pre>{validationExample}</pre>
                  </div>
                  <div className="interactive-area">
                    <input
                      type="email"
                      className={`demo-input ${validationError ? 'error' : ''}`}
                      value={validatedValue}
                      onChange={handleValidatedChange}
                      placeholder="输入邮箱地址"
                    />
                    {validationError && (
                      <div className="error-message">❌ {validationError}</div>
                    )}
                    {!validationError && validatedValue && (
                      <div className="success-message">✅ 邮箱格式正确</div>
                    )}
                  </div>
                  <div className="result-box">
                    <div className="result-label">实时验证:</div>
                    <div className="validation-info">
                      <div>当前值: {validatedValue || '(空)'}</div>
                      <div>验证状态: {validationError ? '❌ 无效' : (validatedValue ? '✅ 有效' : '待输入')}</div>
                      <div>每次输入都会触发验证</div>
                    </div>
                  </div>
                </div>

                <div className="panel">
                  <h4>非受控组件 - 提交时验证</h4>
                  <div className="code-block">
                    <pre>{`// 非受控组件：提交时验证
function UncontrolledForm() {
  const emailRef = useRef(null);
  const [error, setError] = useState('');
  
  const handleSubmit = () => {
    const value = emailRef.current.value;
    
    // ⚠️ 只在提交时验证
    if (!value.includes('@')) {
      setError('邮箱格式不正确');
    } else {
      setError('');
    }
  };
  
  return (
    <>
      <input ref={emailRef} />
      <button onClick={handleSubmit}>验证</button>
      {error && <span>{error}</span>}
    </>
  );
}`}</pre>
                  </div>
                  <div className="interactive-area">
                    <input
                      type="email"
                      className={`demo-input ${uncontrolledValidationError ? 'error' : ''}`}
                      ref={uncontrolledValidationRef}
                      defaultValue=""
                      placeholder="输入邮箱地址"
                    />
                    <button onClick={handleUncontrolledValidation}>验证</button>
                    {uncontrolledValidationError && (
                      <div className="error-message">❌ {uncontrolledValidationError}</div>
                    )}
                    {!uncontrolledValidationError && uncontrolledValidationRef.current?.value && (
                      <div className="success-message">✅ 邮箱格式正确</div>
                    )}
                  </div>
                  <div className="result-box">
                    <div className="result-label">手动验证:</div>
                    <div className="validation-info">
                      <div>当前值: {uncontrolledValidationRef.current?.value || '(空)'}</div>
                      <div>验证状态: {uncontrolledValidationError ? '❌ 无效' : '待验证'}</div>
                      <div>需要点击"验证"按钮</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="conclusion">
                <strong>结论:</strong> 受控组件适合需要实时验证的场景。非受控组件适合提交时才验证的简单表单。
              </div>
            </div>
          )}

          {/* 场景3: 多输入表单 */}
          {activeTest === 'form' && (
            <div className="test-case">
              <h3>场景3: 多输入表单</h3>
              <div className="test-panels">
                <div className="panel">
                  <h4>受控组件 - 统一状态管理</h4>
                  <form onSubmit={handleControlledFormSubmit} className="demo-form">
                    <div className="form-group">
                      <label>用户名:</label>
                      <input
                        type="text"
                        value={formData.username}
                        onChange={handleFormChange('username')}
                        className="demo-input"
                      />
                    </div>
                    <div className="form-group">
                      <label>邮箱:</label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={handleFormChange('email')}
                        className="demo-input"
                      />
                    </div>
                    <div className="form-group">
                      <label>密码:</label>
                      <input
                        type="password"
                        value={formData.password}
                        onChange={handleFormChange('password')}
                        className="demo-input"
                      />
                    </div>
                    <button type="submit" className="submit-btn">提交表单</button>
                  </form>
                  <div className="result-box">
                    <div className="result-label">实时 State:</div>
                    <pre className="state-display">{JSON.stringify(formData, null, 2)}</pre>
                    <div className="info-text">✅ 所有字段值都在 state 中实时同步</div>
                  </div>
                </div>

                <div className="panel">
                  <h4>非受控组件 - Ref 引用</h4>
                  <form onSubmit={handleUncontrolledFormSubmit} className="demo-form">
                    <div className="form-group">
                      <label>用户名:</label>
                      <input
                        type="text"
                        ref={el => uncontrolledFormRef.current.username = el}
                        defaultValue=""
                        className="demo-input"
                      />
                    </div>
                    <div className="form-group">
                      <label>邮箱:</label>
                      <input
                        type="email"
                        ref={el => uncontrolledFormRef.current.email = el}
                        defaultValue=""
                        className="demo-input"
                      />
                    </div>
                    <div className="form-group">
                      <label>密码:</label>
                      <input
                        type="password"
                        ref={el => uncontrolledFormRef.current.password = el}
                        defaultValue=""
                        className="demo-input"
                      />
                    </div>
                    <button type="submit" className="submit-btn">提交表单</button>
                  </form>
                  <div className="result-box">
                    <div className="result-label">Ref 引用:</div>
                    <pre className="state-display">{`{
  username: <input ref />,
  email: <input ref />,
  password: <input ref />
}`}</pre>
                    <div className="info-text">⚠️ 提交时才通过 ref 获取所有值</div>
                  </div>
                </div>
              </div>
              <div className="conclusion">
                <strong>结论:</strong> 受控组件适合需要统一管理的复杂表单。非受控组件适合简单的一次性提交表单。
              </div>
            </div>
          )}

          {/* 场景4: 性能对比 */}
          {activeTest === 'performance' && (
            <div className="test-case">
              <h3>场景4: 性能对比</h3>
              <div className="performance-info">
                <div className="render-count">
                  <span className="count-label">组件渲染次数:</span>
                  <span className="count-value">{renderCount}</span>
                </div>
              </div>
              <div className="test-panels">
                <div className="panel">
                  <h4>受控组件</h4>
                  <div className="interactive-area">
                    <input
                      type="text"
                      className="demo-input"
                      value={perfControlledValue}
                      onChange={(e) => setPerfControlledValue(e.target.value)}
                      placeholder="每次输入都会触发渲染"
                    />
                  </div>
                  <div className="result-box">
                    <div className="perf-stat">
                      <div className="stat-item">
                        <span>当前值:</span>
                        <strong>{perfControlledValue || '(空)'}</strong>
                      </div>
                      <div className="stat-item">
                        <span>渲染触发:</span>
                        <strong className="highlight-danger">每次输入</strong>
                      </div>
                      <div className="stat-item">
                        <span>性能影响:</span>
                        <strong>较大（频繁渲染）</strong>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="panel">
                  <h4>非受控组件</h4>
                  <div className="interactive-area">
                    <input
                      type="text"
                      className="demo-input"
                      ref={perfUncontrolledRef}
                      defaultValue=""
                      placeholder="输入不会触发渲染"
                    />
                    <button onClick={() => {
                      alert(`当前值: ${perfUncontrolledRef.current.value}`);
                    }}>获取值</button>
                  </div>
                  <div className="result-box">
                    <div className="perf-stat">
                      <div className="stat-item">
                        <span>当前值:</span>
                        <strong>{perfUncontrolledRef.current?.value || '(空)'}</strong>
                      </div>
                      <div className="stat-item">
                        <span>渲染触发:</span>
                        <strong className="highlight-success">不触发</strong>
                      </div>
                      <div className="stat-item">
                        <span>性能影响:</span>
                        <strong>小（无额外渲染）</strong>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="conclusion">
                <strong>结论:</strong> 非受控组件在输入时不会触发组件重新渲染，性能开销更小，适合大型表单或性能敏感场景。
              </div>
            </div>
          )}
        </div>
      </section>

      {/* 使用场景 */}
      <section className="section">
        <h2>🎯 使用场景</h2>
        <div className="scenario-grid">
          <div className="scenario-card controlled">
            <h3>推荐使用受控组件</h3>
            <ul>
              <li>✅ 需要实时验证输入（邮箱、手机号等）</li>
              <li>✅ 需要实时格式化（大写转换、货币格式等）</li>
              <li>✅ 需要动态控制输入（字符限制、禁用等）</li>
              <li>✅ 需要根据输入联动其他组件</li>
              <li>✅ 需要撤销/重做功能</li>
              <li>✅ 复杂的表单逻辑</li>
            </ul>
          </div>
          <div className="scenario-card uncontrolled">
            <h3>推荐使用非受控组件</h3>
            <ul>
              <li>✅ 简单的表单提交（登录、注册等）</li>
              <li>✅ 文件上传（必须使用 ref）</li>
              <li>✅ 集成第三方 DOM 库</li>
              <li>✅ 性能敏感的大型表单</li>
              <li>✅ 不需要实时交互的字段</li>
              <li>✅ 快速原型开发</li>
            </ul>
          </div>
        </div>
      </section>

      {/* 混合使用示例 */}
      <section className="section">
        <h2>💡 实际项目：混合使用</h2>
        <div className="mixed-example">
          <div className="code-panel">
            <h3>推荐方案</h3>
            <div className="code-block large">
              <pre>{mixedExample}</pre>
            </div>
          </div>
          <div className="tips-panel">
            <h3>最佳实践</h3>
            <div className="tips-list">
              <div className="tip-item">
                <div className="tip-icon">💡</div>
                <div className="tip-content">
                  <strong>按需选择</strong>
                  <p>根据实际需求选择合适的方式，不要一刀切</p>
                </div>
              </div>
              <div className="tip-item">
                <div className="tip-icon">⚡</div>
                <div className="tip-content">
                  <strong>性能优先</strong>
                  <p>大型表单考虑使用非受控组件减少渲染</p>
                </div>
              </div>
              <div className="tip-item">
                <div className="tip-icon">✨</div>
                <div className="tip-content">
                  <strong>用户体验</strong>
                  <p>需要实时反馈的场景使用受控组件</p>
                </div>
              </div>
              <div className="tip-item">
                <div className="tip-icon">📦</div>
                <div className="tip-content">
                  <strong>文件上传</strong>
                  <p>文件输入必须使用非受控组件（ref）</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 总结对比表 */}
      <section className="section">
        <h2>📊 对比总结</h2>
        <div className="comparison-table">
          <table>
            <thead>
              <tr>
                <th>特性</th>
                <th>受控组件</th>
                <th>非受控组件</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>数据存储</td>
                <td>React state</td>
                <td>DOM 节点</td>
              </tr>
              <tr>
                <td>获取值方式</td>
                <td>直接读取 state</td>
                <td>通过 ref.current.value</td>
              </tr>
              <tr>
                <td>更新触发</td>
                <td>每次输入触发渲染</td>
                <td>不触发渲染</td>
              </tr>
              <tr>
                <td>实时验证</td>
                <td>✅ 容易实现</td>
                <td>❌ 较难实现</td>
              </tr>
              <tr>
                <td>性能开销</td>
                <td>较大</td>
                <td>较小</td>
              </tr>
              <tr>
                <td>代码复杂度</td>
                <td>中等</td>
                <td>简单</td>
              </tr>
              <tr>
                <td>使用场景</td>
                <td>复杂交互表单</td>
                <td>简单提交表单</td>
              </tr>
              <tr>
                <td>React 推荐</td>
                <td>✅ 大多数情况</td>
                <td>⚠️ 特殊场景</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 关键要点 */}
      <section className="section">
        <h2>🔑 关键要点</h2>
        <div className="key-points">
          <div className="point-card">
            <div className="point-number">1</div>
            <div className="point-content">
              <h4>受控组件的核心</h4>
              <p>使用 <code>value</code> + <code>onChange</code>，让 React state 成为"唯一数据源"</p>
            </div>
          </div>
          <div className="point-card">
            <div className="point-number">2</div>
            <div className="point-content">
              <h4>非受控组件的核心</h4>
              <p>使用 <code>ref</code> + <code>defaultValue</code>，让 DOM 管理自己的状态</p>
            </div>
          </div>
          <div className="point-card">
            <div className="point-number">3</div>
            <div className="point-content">
              <h4>选择标准</h4>
              <p>需要实时交互？用受控。简单提交？用非受控。性能敏感？优先非受控。</p>
            </div>
          </div>
          <div className="point-card">
            <div className="point-number">4</div>
            <div className="point-content">
              <h4>混合使用</h4>
              <p>实际项目中可以混合使用，发挥各自优势</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ControlledVsUncontrolled;

