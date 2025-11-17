import React from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { navMenu } from "./router";
import logo from "./logo.svg";
import "./App.css";

// 首页组件
function HomePage() {
  const navigate = useNavigate();

  const navigateTo = (path) => {
    navigate(path);
  };

  return (
    <div className="home-page">
      <div className="welcome-section">
        <h1>欢迎来到 React 学习项目</h1>
        <p>这是一个专门用于学习 React 的项目，包含了 React 的核心功能演示。</p>
      </div>

      <div
        className="route-grid"
        style={{
          gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
        }}
      >
        {navMenu.map((item) => (
          <div key={item.name} className="route-card" onClick={() => navigateTo(item.path)}>
            <div className="card-icon">
              <span className="icon-text">{item.label.charAt(0)}</span>
            </div>
            <div className="card-content">
              <h3>{item.label}</h3>
              <p>{item.desc}</p>
            </div>
            <div className="card-arrow">
              <span>→</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// 布局组件
function Layout({ children }) {
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  return (
    <div id="app">
      {/* 页面头部 */}
      <header className="header">
        <div className="header-container">
          <div className="brand">
            <img alt="React logo" src={logo} className="logo" />
            <span className="brand-text">React 学习项目</span>
          </div>
        </div>
      </header>

      {/* 主内容区域 */}
      <main className="main-content">
        {isHomePage ? <HomePage /> : <div className="route-view">{children}</div>}
      </main>

      {/* 页脚 */}
      <footer className="footer">
        <p>&copy; 2025 React 学习项目. 使用 React 19.2 构建</p>
      </footer>
    </div>
  );
}

// 懒加载组件包装器
function LazyComponent({ importFunc }) {
  const [Component, setComponent] = React.useState(null);

  React.useEffect(() => {
    importFunc().then((module) => {
      setComponent(() => module.default);
    });
  }, [importFunc]);

  if (!Component) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>加载中...</p>
      </div>
    );
  }

  return <Component />;
}

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={null} />
          {navMenu.map((item) => (
            <Route
              key={item.name}
              path={item.path}
              element={<LazyComponent importFunc={item.component} />}
            />
          ))}
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
