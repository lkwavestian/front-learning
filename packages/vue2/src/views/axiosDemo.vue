<template>
  <div class="axios-demo">
    <!-- 页面头部 -->
    <div class="header-section">
      <h1>Vue2 Axios 详解</h1>
      <p class="subtitle">理解 Axios 的特性、与 Fetch 的对比以及二次封装的重要性</p>
    </div>

    <!-- 快速导航 -->
    <div class="quick-nav">
      <a href="#overview" class="nav-item">概述</a>
      <a href="#what-is-axios" class="nav-item">什么是 Axios</a>
      <a href="#axios-features" class="nav-item">Axios 特性</a>
      <a href="#axios-vs-fetch" class="nav-item">Axios vs Fetch</a>
      <a href="#why-encapsulate" class="nav-item">为什么二次封装</a>
      <a href="#encapsulation-demo" class="nav-item">封装演示</a>
      <a href="#summary" class="nav-item">总结</a>
    </div>

    <!-- 概述 -->
    <section id="overview" class="content-section">
      <h2>Axios 概述</h2>
      <p class="section-intro">
        在现代前端开发中，HTTP 请求是不可或缺的一部分。Axios 作为一个基于 Promise 的 HTTP 客户端，
        为浏览器和 Node.js 环境提供了强大而灵活的 HTTP 请求能力。在 Vue2 项目中， 合理使用和封装
        Axios 可以大大提高开发效率和代码质量。
      </p>

      <div class="concept-grid">
        <div class="concept-card">
          <h3>什么是 HTTP 客户端？</h3>
          <p>
            HTTP 客户端是用于向服务器发送 HTTP 请求并处理响应的工具或库。
            它封装了底层的网络通信细节，提供了简单易用的 API。
          </p>
        </div>
        <div class="concept-card">
          <h3>为什么需要 Axios？</h3>
          <ul>
            <li>简化 HTTP 请求操作</li>
            <li>提供统一的错误处理</li>
            <li>支持请求和响应拦截</li>
            <li>自动转换 JSON 数据</li>
          </ul>
        </div>
      </div>
    </section>

    <!-- 什么是 Axios -->
    <section id="what-is-axios" class="content-section">
      <h2>什么是 Axios？</h2>
      <p class="section-intro">
        Axios 是一个基于 Promise 的 HTTP 客户端，可以在浏览器和 Node.js 环境中使用。 它提供了简洁的
        API 和强大的功能，是现代前端开发中最受欢迎的 HTTP 请求库之一。
      </p>

      <div class="example-container">
        <h3>核心概念</h3>
        <div class="concept-explanation">
          <div class="concept-item">
            <h4>基于 Promise</h4>
            <p>
              Axios 基于 ES6 的 Promise 标准，支持 async/await 语法，使异步操作更加优雅。 所有的
              HTTP 请求都返回 Promise 对象，可以链式调用或使用 await 等待结果。
            </p>
          </div>

          <div class="concept-item">
            <h4>同构性</h4>
            <p>
              Axios 可以在浏览器和 Node.js 环境中使用，提供统一的 API。
              这意味着你可以在前后端使用相同的代码进行 HTTP 请求。
            </p>
          </div>

          <div class="concept-item">
            <h4>自动转换</h4>
            <p>
              Axios 会自动转换请求和响应数据，包括 JSON 数据的自动解析、
              请求数据的序列化等，减少了手动处理的工作量。
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Axios 特性 -->
    <section id="axios-features" class="content-section">
      <h2>Axios 主要特性</h2>
      <p class="section-intro">
        Axios 提供了丰富的功能特性，使其成为前端开发中不可或缺的工具。 从基本的 HTTP
        请求到高级的拦截器功能，Axios 都能满足各种需求。
      </p>

      <div class="features-grid">
        <div class="feature-card">
          <h3>🚀 核心功能</h3>
          <ul>
            <li><strong>HTTP 方法支持</strong>：GET、POST、PUT、DELETE、PATCH 等</li>
            <li><strong>请求配置</strong>：URL、参数、请求头、超时时间等</li>
            <li><strong>响应处理</strong>：状态码、响应头、响应数据等</li>
            <li><strong>错误处理</strong>：网络错误、HTTP 错误、超时等</li>
          </ul>
        </div>

        <div class="feature-card">
          <h3>🔧 高级特性</h3>
          <ul>
            <li><strong>请求拦截器</strong>：在请求发送前统一处理</li>
            <li><strong>响应拦截器</strong>：在响应接收后统一处理</li>
            <li><strong>请求取消</strong>：支持取消正在进行的请求</li>
            <li><strong>进度监控</strong>：上传和下载进度跟踪</li>
          </ul>
        </div>

        <div class="feature-card">
          <h3>⚡ 性能优化</h3>
          <ul>
            <li><strong>自动转换</strong>：JSON 数据自动解析</li>
            <li><strong>请求去重</strong>：避免重复请求</li>
            <li><strong>缓存支持</strong>：可配置的缓存策略</li>
            <li><strong>并发控制</strong>：限制同时进行的请求数量</li>
          </ul>
        </div>

        <div class="feature-card">
          <h3>🛡️ 安全特性</h3>
          <ul>
            <li><strong>XSRF 保护</strong>：防止跨站请求伪造</li>
            <li><strong>请求验证</strong>：请求参数和响应数据验证</li>
            <li><strong>HTTPS 支持</strong>：强制使用安全连接</li>
            <li><strong>证书验证</strong>：SSL 证书验证</li>
          </ul>
        </div>
      </div>
    </section>

    <!-- Axios vs Fetch -->
    <section id="axios-vs-fetch" class="content-section">
      <h2>Axios vs Fetch 对比</h2>
      <p class="section-intro">
        虽然浏览器原生提供了 Fetch API，但在实际开发中，Axios 往往更受欢迎。
        让我们来对比一下两者的差异，了解为什么选择 Axios。
      </p>

      <div class="comparison-container">
        <h3>功能特性对比</h3>
        <div class="comparison-table-wrapper">
          <table class="comparison-table">
            <thead>
              <tr>
                <th>特性</th>
                <th>Axios</th>
                <th>Fetch</th>
                <th>说明</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>浏览器支持</strong></td>
                <td>✅ 所有现代浏览器</td>
                <td>✅ 现代浏览器</td>
                <td>Axios 兼容性更好</td>
              </tr>
              <tr>
                <td><strong>自动 JSON 转换</strong></td>
                <td>✅ 自动</td>
                <td>❌ 手动</td>
                <td>Axios 更便捷</td>
              </tr>
              <tr>
                <td><strong>请求超时</strong></td>
                <td>✅ 内置支持</td>
                <td>❌ 需要 AbortController</td>
                <td>Axios 配置简单</td>
              </tr>
              <tr>
                <td><strong>请求拦截器</strong></td>
                <td>✅ 内置支持</td>
                <td>❌ 不支持</td>
                <td>Axios 功能强大</td>
              </tr>
              <tr>
                <td><strong>响应拦截器</strong></td>
                <td>✅ 内置支持</td>
                <td>❌ 不支持</td>
                <td>Axios 功能强大</td>
              </tr>
              <tr>
                <td><strong>错误处理</strong></td>
                <td>✅ 自动</td>
                <td>❌ 手动检查状态</td>
                <td>Axios 更友好</td>
              </tr>
              <tr>
                <td><strong>请求取消</strong></td>
                <td>✅ 内置支持</td>
                <td>✅ AbortController</td>
                <td>两者都支持</td>
              </tr>
              <tr>
                <td><strong>进度监控</strong></td>
                <td>✅ 内置支持</td>
                <td>❌ 不支持</td>
                <td>Axios 更完善</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="code-comparison">
          <h4>代码对比示例</h4>
          <div class="comparison-examples">
            <div class="example-item">
              <h5>Axios 请求</h5>
              <div class="code-block">
                <p>简洁的 API，自动处理 JSON 转换和错误处理</p>
              </div>
            </div>

            <div class="example-item">
              <h5>Fetch 请求</h5>
              <div class="code-block">
                <p>需要手动处理 JSON 转换、状态码检查和错误处理</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 为什么二次封装 -->
    <section id="why-encapsulate" class="content-section">
      <h2>为什么需要二次封装 Axios？</h2>
      <p class="section-intro">
        虽然 Axios 已经提供了强大的功能，但在实际项目中，我们通常需要进行二次封装。
        这样做的目的是为了统一管理、提高复用性、增强功能性和便于维护。
      </p>

      <div class="reasons-grid">
        <div class="reason-card">
          <h3>🎯 统一管理</h3>
          <p>
            通过封装，我们可以统一管理项目的所有 HTTP 请求配置， 包括基础
            URL、请求头、超时时间等，避免在每个请求中重复配置。
          </p>
        </div>

        <div class="reason-card">
          <h3>🔄 提高复用性</h3>
          <p>封装后的方法可以在项目的任何地方复用， 减少了重复代码的编写，提高了开发效率。</p>
        </div>

        <div class="reason-card">
          <h3>🚀 增强功能性</h3>
          <p>
            可以在封装中添加额外的功能，如请求重试、请求缓存、
            请求队列、错误重试等，满足特定的业务需求。
          </p>
        </div>

        <div class="reason-card">
          <h3>🛠️ 便于维护</h3>
          <p>
            当需要修改请求逻辑时，只需要在一个地方修改，
            所有使用该封装的地方都会自动更新，便于维护和调试。
          </p>
        </div>

        <div class="reason-card">
          <h3>📊 统一监控</h3>
          <p>可以在封装中添加统一的日志记录、性能监控、 错误上报等功能，便于项目的监控和分析。</p>
        </div>

        <div class="reason-card">
          <h3>🔒 安全增强</h3>
          <p>
            可以在封装中添加统一的安全处理，如 token 验证、
            请求签名、防重放攻击等，提高应用的安全性。
          </p>
        </div>
      </div>
    </section>

    <!-- 封装演示 -->
    <section id="encapsulation-demo" class="content-section">
      <h2>Axios 二次封装演示</h2>
      <p class="section-intro">
        下面展示了我们封装的 Axios 实例，包含了常用的配置和功能。
        这个封装提供了统一的接口和错误处理，可以在整个项目中使用。
      </p>

      <div class="demo-container">
        <h3>封装功能展示</h3>
        <div class="feature-demo">
          <div class="demo-item">
            <h4>🌐 基础配置</h4>
            <ul>
              <li>基础 URL 配置</li>
              <li>请求头设置</li>
              <li>超时时间配置</li>
              <li>响应类型设置</li>
            </ul>
          </div>

          <div class="demo-item">
            <h4>🔧 请求拦截器</h4>
            <ul>
              <li>自动添加 token</li>
              <li>请求参数处理</li>
              <li>请求日志记录</li>
              <li>请求去重处理</li>
            </ul>
          </div>

          <div class="demo-item">
            <h4>📡 响应拦截器</h4>
            <ul>
              <li>响应数据统一处理</li>
              <li>错误状态码处理</li>
              <li>token 过期处理</li>
              <li>响应日志记录</li>
            </ul>
          </div>

          <div class="demo-item">
            <h4>🚀 便捷方法</h4>
            <ul>
              <li>GET 请求封装</li>
              <li>POST 请求封装</li>
              <li>PUT 请求封装</li>
              <li>DELETE 请求封装</li>
            </ul>
          </div>
        </div>

        <div class="usage-example">
          <h4>使用示例</h4>
          <div class="example-description">
            <p>
              在我们的封装中，你可以直接使用 <code>http.get()</code>、<code>http.post()</code>
              等方法， 所有的配置和拦截器都会自动生效。例如：
            </p>
            <ul>
              <li>自动添加认证 token</li>
              <li>统一的错误处理</li>
              <li>请求和响应日志</li>
              <li>自动重试机制</li>
            </ul>
          </div>
        </div>

        <!-- 实际使用演示 -->
        <div class="practical-demo">
          <h4>实际使用演示</h4>
          <div class="demo-buttons">
            <button @click="testGetRequest" class="demo-btn get-btn">测试 GET 请求</button>
            <button @click="testPostRequest" class="demo-btn post-btn">测试 POST 请求</button>
            <button @click="testErrorHandling" class="demo-btn error-btn">测试错误处理</button>
            <button @click="testConcurrentRequests" class="demo-btn concurrent-btn">
              测试并发请求
            </button>
          </div>

          <div class="demo-results">
            <div class="results-header">
              <h5>请求结果：</h5>
              <button @click="clearResults" class="clear-btn" v-if="requestResults.length > 0">
                清空结果
              </button>
            </div>
            <div class="result-display">
              <pre v-if="requestResults.length > 0">{{
                JSON.stringify(requestResults, null, 2)
              }}</pre>
              <p v-else class="no-results">暂无请求结果，点击上方按钮开始测试</p>
            </div>
          </div>

          <div class="demo-features">
            <h5>演示功能：</h5>
            <div class="feature-list">
              <div class="feature-item">
                <span class="feature-icon">🔍</span>
                <span>请求拦截器：自动添加 token 和日志</span>
              </div>
              <div class="feature-item">
                <span class="feature-icon">📡</span>
                <span>响应拦截器：统一数据处理和错误处理</span>
              </div>
              <div class="feature-item">
                <span class="feature-icon">⚡</span>
                <span>便捷方法：get、post 等简化调用</span>
              </div>
              <div class="feature-item">
                <span class="feature-icon">🔄</span>
                <span>并发请求：同时发起多个请求</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 总结 -->
    <section id="summary" class="content-section">
      <h2>总结</h2>
      <div class="summary-content">
        <div class="summary-grid">
          <div class="summary-card">
            <h3>Axios 优势</h3>
            <ul>
              <li><strong>功能丰富</strong>：拦截器、超时、取消等</li>
              <li><strong>使用简单</strong>：Promise 基础，API 友好</li>
              <li><strong>兼容性好</strong>：支持多种环境和浏览器</li>
              <li><strong>生态完善</strong>：社区活跃，文档详细</li>
            </ul>
          </div>

          <div class="summary-card">
            <h3>封装的好处</h3>
            <ul>
              <li><strong>统一管理</strong>：配置、错误处理、日志等</li>
              <li><strong>提高效率</strong>：减少重复代码，统一接口</li>
              <li><strong>便于维护</strong>：集中修改，全局生效</li>
              <li><strong>功能增强</strong>：添加业务特定的功能</li>
            </ul>
          </div>

          <div class="summary-card">
            <h3>最佳实践</h3>
            <ul>
              <li>合理配置超时时间和重试次数</li>
              <li>统一处理错误和异常情况</li>
              <li>添加必要的日志和监控</li>
              <li>根据业务需求定制拦截器</li>
            </ul>
          </div>
        </div>

        <div class="key-points">
          <h3>关键要点</h3>
          <p>
            Axios 是现代前端开发中不可或缺的 HTTP 客户端库，它提供了强大而灵活的功能。
            通过合理的二次封装，我们可以充分发挥 Axios 的优势，构建出高效、可维护的 HTTP 请求系统。
            在实际项目中，应该根据具体需求选择合适的封装策略，并遵循最佳实践来确保代码质量。
          </p>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
// 导入我们封装的 axios 方法
import { get, post, all, retry } from "../utils/axios";

export default {
  name: "AxiosDemo",
  data() {
    return {
      requestResults: [], // 存储请求结果
      loading: false,
    };
  },
  methods: {
    // 测试 GET 请求
    async testGetRequest() {
      try {
        this.loading = true;
        // 使用封装的 get 方法
        const response = await get("https://jsonplaceholder.typicode.com/posts/1");

        this.addResult("GET 请求成功", {
          method: "GET",
          url: "https://jsonplaceholder.typicode.com/posts/1",
          response: response,
          timestamp: new Date().toLocaleTimeString(),
        });
      } catch (error) {
        this.addResult("GET 请求失败", {
          method: "GET",
          url: "https://jsonplaceholder.typicode.com/posts/1",
          error: error.message,
          timestamp: new Date().toLocaleTimeString(),
        });
      } finally {
        this.loading = false;
      }
    },

    // 测试 POST 请求
    async testPostRequest() {
      try {
        this.loading = true;
        const postData = {
          title: "测试标题",
          body: "这是测试内容",
          userId: 1,
        };

        // 使用封装的 post 方法
        const response = await post("https://jsonplaceholder.typicode.com/posts", postData);

        this.addResult("POST 请求成功", {
          method: "POST",
          url: "https://jsonplaceholder.typicode.com/posts",
          requestData: postData,
          response: response,
          timestamp: new Date().toLocaleTimeString(),
        });
      } catch (error) {
        this.addResult("POST 请求失败", {
          method: "POST",
          url: "https://jsonplaceholder.typicode.com/posts",
          error: error.message,
          timestamp: new Date().toLocaleTimeString(),
        });
      } finally {
        this.loading = false;
      }
    },

    // 测试错误处理
    async testErrorHandling() {
      try {
        this.loading = true;
        // 故意请求一个不存在的接口来测试错误处理
        const response = await get("https://jsonplaceholder.typicode.com/nonexistent");

        this.addResult("错误处理测试成功", {
          method: "GET",
          url: "https://jsonplaceholder.typicode.com/nonexistent",
          response: response,
          timestamp: new Date().toLocaleTimeString(),
        });
      } catch (error) {
        this.addResult("错误处理测试", {
          method: "GET",
          url: "https://jsonplaceholder.typicode.com/nonexistent",
          error: error.message,
          errorType: "预期错误",
          timestamp: new Date().toLocaleTimeString(),
        });
      } finally {
        this.loading = false;
      }
    },

    // 测试并发请求
    async testConcurrentRequests() {
      try {
        this.loading = true;

        // 创建多个并发请求
        const requests = [
          get("https://jsonplaceholder.typicode.com/posts/1"),
          get("https://jsonplaceholder.typicode.com/posts/2"),
          get("https://jsonplaceholder.typicode.com/posts/3"),
        ];

        // 使用封装的 all 方法进行并发请求
        const responses = await all(requests);

        this.addResult("并发请求成功", {
          method: "GET (并发)",
          urls: [
            "https://jsonplaceholder.typicode.com/posts/1",
            "https://jsonplaceholder.typicode.com/posts/2",
            "https://jsonplaceholder.typicode.com/posts/3",
          ],
          responseCount: responses.length,
          responses: responses,
          timestamp: new Date().toLocaleTimeString(),
        });
      } catch (error) {
        this.addResult("并发请求失败", {
          method: "GET (并发)",
          error: error.message,
          timestamp: new Date().toLocaleTimeString(),
        });
      } finally {
        this.loading = false;
      }
    },

    // 添加结果到结果列表
    addResult(title, data) {
      this.requestResults.unshift({
        title,
        data,
        id: Date.now(),
      });

      // 限制结果数量，避免页面过长
      if (this.requestResults.length > 10) {
        this.requestResults = this.requestResults.slice(0, 10);
      }
    },

    // 清空结果
    clearResults() {
      this.requestResults = [];
    },
  },
};
</script>

<style scoped>
.axios-demo {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
}

.header-section {
  text-align: center;
  margin-bottom: 40px;
  padding: 40px 0;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-radius: 12px;
}

.header-section h1 {
  font-size: 2.5rem;
  margin-bottom: 10px;
  font-weight: 700;
}

.subtitle {
  font-size: 1.2rem;
  opacity: 0.9;
}

.quick-nav {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 15px;
  margin-bottom: 40px;
  padding: 20px;
  background: #f8f9fa;
  border-radius: 8px;
}

.nav-item {
  padding: 8px 16px;
  background: #007bff;
  color: white;
  text-decoration: none;
  border-radius: 20px;
  font-size: 0.9rem;
  transition: all 0.3s ease;
}

.nav-item:hover {
  background: #0056b3;
  transform: translateY(-2px);
}

.content-section {
  margin-bottom: 50px;
  padding: 30px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.content-section h2 {
  color: #2c3e50;
  font-size: 1.8rem;
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 3px solid #3498db;
}

.section-intro {
  font-size: 1.1rem;
  color: #555;
  margin-bottom: 25px;
  line-height: 1.6;
}

.concept-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  margin-top: 25px;
}

.concept-card {
  padding: 20px;
  background: #f8f9fa;
  border-radius: 8px;
  border-left: 4px solid #3498db;
}

.concept-card h3 {
  color: #2c3e50;
  margin-bottom: 15px;
}

.concept-card ul {
  padding-left: 20px;
}

.concept-card li {
  margin-bottom: 8px;
  color: #555;
}

.example-container {
  margin-top: 30px;
}

.example-container h3 {
  color: #2c3e50;
  margin-bottom: 20px;
  font-size: 1.3rem;
}

.concept-explanation {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-top: 20px;
}

.concept-item {
  padding: 20px;
  background: #f8f9fa;
  border-radius: 8px;
  border-left: 4px solid #28a745;
}

.concept-item h4 {
  color: #2c3e50;
  margin-bottom: 15px;
  font-size: 1.1rem;
}

.concept-item p {
  color: #555;
  line-height: 1.6;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 20px;
  margin-top: 25px;
}

.feature-card {
  padding: 20px;
  background: #f8f9fa;
  border-radius: 8px;
  border-left: 4px solid #ffc107;
}

.feature-card h3 {
  color: #2c3e50;
  margin-bottom: 15px;
  font-size: 1.2rem;
}

.feature-card ul {
  padding-left: 20px;
}

.feature-card li {
  margin-bottom: 10px;
  color: #555;
  line-height: 1.5;
}

.feature-card strong {
  color: #2c3e50;
}

.comparison-container {
  margin-top: 30px;
}

.comparison-container h3 {
  color: #2c3e50;
  margin-bottom: 20px;
  font-size: 1.3rem;
}

.comparison-table-wrapper {
  overflow-x: auto;
  margin-bottom: 30px;
}

.comparison-table {
  width: 100%;
  border-collapse: collapse;
  min-width: 600px;
}

.comparison-table th,
.comparison-table td {
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid #dee2e6;
}

.comparison-table th {
  background: #e9ecef;
  font-weight: 600;
  color: #2c3e50;
}

.comparison-table td {
  color: #555;
}

.comparison-table .comparison-table td:first-child {
  font-weight: 600;
  color: #2c3e50;
}

.code-comparison {
  margin-top: 30px;
}

.code-comparison h4 {
  color: #2c3e50;
  margin-bottom: 20px;
  font-size: 1.2rem;
}

.comparison-examples {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
}

.example-item {
  padding: 20px;
  background: #f8f9fa;
  border-radius: 8px;
  border: 2px solid #e9ecef;
}

.example-item h5 {
  color: #2c3e50;
  margin-bottom: 15px;
  font-size: 1.1rem;
}

.code-block {
  background: #e9ecef;
  padding: 15px;
  border-radius: 6px;
  color: #555;
  line-height: 1.5;
}

.reasons-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  margin-top: 25px;
}

.reason-card {
  padding: 20px;
  background: #f8f9fa;
  border-radius: 8px;
  border-left: 4px solid #17a2b8;
}

.reason-card h3 {
  color: #2c3e50;
  margin-bottom: 15px;
  font-size: 1.2rem;
}

.reason-card p {
  color: #555;
  line-height: 1.6;
}

.demo-container {
  margin-top: 30px;
}

.demo-container h3 {
  color: #2c3e50;
  margin-bottom: 20px;
  font-size: 1.3rem;
}

.feature-demo {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
}

.demo-item {
  padding: 20px;
  background: #f8f9fa;
  border-radius: 8px;
  border-left: 4px solid #6f42c1;
}

.demo-item h4 {
  color: #2c3e50;
  margin-bottom: 15px;
  font-size: 1.1rem;
}

.demo-item ul {
  padding-left: 20px;
}

.demo-item li {
  margin-bottom: 8px;
  color: #555;
}

.usage-example {
  background: #e3f2fd;
  padding: 20px;
  border-radius: 8px;
  border-left: 4px solid #2196f3;
}

.usage-example h4 {
  color: #2c3e50;
  margin-bottom: 15px;
  font-size: 1.2rem;
}

.example-description p {
  color: #555;
  margin-bottom: 15px;
  line-height: 1.6;
}

.example-description ul {
  padding-left: 20px;
  color: #555;
}

.example-description li {
  margin-bottom: 8px;
}

.example-description code {
  background: #e9ecef;
  padding: 2px 6px;
  border-radius: 4px;
  font-family: "Courier New", monospace;
}

/* 实际使用演示样式 */
.practical-demo {
  margin-top: 30px;
  padding: 25px;
  background: #f8f9fa;
  border-radius: 10px;
  border: 2px solid #e9ecef;
}

.practical-demo h4 {
  color: #2c3e50;
  margin-bottom: 20px;
  font-size: 1.3rem;
  text-align: center;
}

.demo-buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  justify-content: center;
  margin-bottom: 25px;
}

.demo-btn {
  padding: 12px 20px;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  min-width: 140px;
}

.demo-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.get-btn {
  background: #28a745;
  color: white;
}

.get-btn:hover {
  background: #218838;
}

.post-btn {
  background: #007bff;
  color: white;
}

.post-btn:hover {
  background: #0056b3;
}

.error-btn {
  background: #dc3545;
  color: white;
}

.error-btn:hover {
  background: #c82333;
}

.concurrent-btn {
  background: #6f42c1;
  color: white;
}

.concurrent-btn:hover {
  background: #5a2d91;
}

.demo-results {
  margin-bottom: 25px;
}

.results-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}

.results-header h5 {
  color: #2c3e50;
  margin: 0;
  font-size: 1.1rem;
}

.clear-btn {
  padding: 6px 12px;
  background: #6c757d;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.clear-btn:hover {
  background: #5a6268;
}

.result-display {
  background: #2d3748;
  color: #e2e8f0;
  padding: 20px;
  border-radius: 8px;
  max-height: 400px;
  overflow-y: auto;
}

.result-display pre {
  margin: 0;
  font-family: "Courier New", monospace;
  font-size: 0.9rem;
  line-height: 1.4;
  white-space: pre-wrap;
  word-wrap: break-word;
}

.no-results {
  text-align: center;
  color: #6c757d;
  font-style: italic;
  margin: 0;
}

.demo-features {
  background: white;
  padding: 20px;
  border-radius: 8px;
  border-left: 4px solid #17a2b8;
}

.demo-features h5 {
  color: #2c3e50;
  margin-bottom: 15px;
  font-size: 1.1rem;
}

.feature-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 15px;
}

.feature-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px;
  background: #f8f9fa;
  border-radius: 6px;
  border-left: 3px solid #17a2b8;
}

.feature-icon {
  font-size: 1.2rem;
}

.feature-item span:last-child {
  color: #555;
  font-size: 0.9rem;
}

.summary-content {
  margin-top: 25px;
}

.summary-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 25px;
  margin-bottom: 30px;
}

.summary-card {
  padding: 25px;
  background: #f8f9fa;
  border-radius: 10px;
  border-left: 4px solid #ffc107;
}

.summary-card h3 {
  color: #2c3e50;
  margin-bottom: 20px;
  font-size: 1.3rem;
}

.summary-card ul {
  padding-left: 20px;
}

.summary-card li {
  margin-bottom: 10px;
  color: #555;
  line-height: 1.5;
}

.summary-card strong {
  color: #2c3e50;
}

.key-points {
  padding: 25px;
  background: #e3f2fd;
  border-radius: 10px;
  border-left: 4px solid #2196f3;
}

.key-points h3 {
  color: #2c3e50;
  margin-bottom: 15px;
  font-size: 1.3rem;
}

.key-points p {
  color: #555;
  line-height: 1.6;
  font-size: 1.1rem;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .axios-demo {
    padding: 15px;
  }

  .header-section h1 {
    font-size: 2rem;
  }

  .quick-nav {
    flex-direction: column;
    align-items: center;
  }

  .concept-grid,
  .features-grid,
  .reasons-grid,
  .summary-grid {
    grid-template-columns: 1fr;
  }

  .concept-explanation,
  .comparison-examples,
  .feature-demo {
    grid-template-columns: 1fr;
  }

  .demo-buttons {
    flex-direction: column;
    align-items: center;
  }

  .demo-btn {
    min-width: 200px;
  }

  .feature-list {
    grid-template-columns: 1fr;
  }

  .results-header {
    flex-direction: column;
    gap: 10px;
    align-items: flex-start;
  }

  .comparison-table {
    font-size: 0.9rem;
  }

  .comparison-table th,
  .comparison-table td {
    padding: 8px;
  }
}
</style>
