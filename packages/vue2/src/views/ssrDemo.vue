<template>
  <div class="ssr-demo">
    <div class="header-section">
      <h1>SSR 服务端渲染详解</h1>
      <p class="subtitle">是什么 | 解决了什么问题 | 如何实现</p>
    </div>

    <section class="content-section">
      <h2>什么是 SSR（Server-Side Rendering）？</h2>
      <p>
        SSR（服务端渲染）是指在服务器端将应用页面渲染为完整的 HTML 字符串并返回给浏览器，
        浏览器接收后直接展示可见内容，再通过客户端脚本进行事件绑定和激活（Hydration）。
        与纯客户端渲染（CSR）不同，SSR 将首屏 HTML 的生成前移到服务器端完成。
      </p>
      <ul class="key-points">
        <li>在服务器生成完整 HTML，再下发至浏览器</li>
        <li>客户端执行激活过程，使静态 HTML 变为可交互页面</li>
        <li>常与同构/同构化（Isomorphic/Universal）应用一同提及</li>
      </ul>
    </section>

    <section class="content-section">
      <h2>SSR 解决了哪些问题？</h2>
      <div class="grid">
        <div class="card">
          <h3>更快的首屏渲染</h3>
          <p>
            首屏 HTML 由服务器直接输出，用户无需等待完整的 JS 下载与执行即可看到页面骨架/内容，
            明显降低白屏时间（TTFB、FCP、LCP 指标更佳）。
          </p>
        </div>
        <div class="card">
          <h3>更友好的 SEO</h3>
          <p>
            搜索引擎抓取 HTML
            内容更加稳定，无需额外等待客户端渲染，降低爬取成本，提高收录与排名稳定性。
          </p>
        </div>
        <div class="card">
          <h3>更好的分享预览</h3>
          <p>
            通过服务器输出完整的 Meta/OG
            标签，让社交媒体与消息预览可以展示更准确的标题、描述和预览图。
          </p>
        </div>
      </div>
      <div class="note">
        注意：SSR
        并不等于更快的整体性能。它提升的是「首屏可见」体验，但也会引入服务器压力与实现复杂度。
      </div>
    </section>

    <section class="content-section">
      <h2>如何实现 SSR（概览）</h2>
      <div class="steps">
        <div class="step">
          <h3>1. 同构代码设计</h3>
          <p>将应用分为「通用层（可在 Node 与浏览器运行）」与「平台相关层（仅浏览器）」：</p>
          <ul>
            <li>避免在通用代码中直接使用 window、document、localStorage 等浏览器专属 API</li>
            <li>抽象出「环境判断」与「平台适配」层（如在 @utils/ 中封装）</li>
          </ul>
        </div>
        <div class="step">
          <h3>2. 服务端渲染入口</h3>
          <p>
            在服务器环境（通常是 Node.js）中，创建应用实例，匹配路由、获取数据，
            使用渲染器将应用转换为 HTML 字符串并返回给客户端。
          </p>
        </div>
        <div class="step">
          <h3>3. 客户端激活（Hydration）</h3>
          <p>
            浏览器端加载同一套前端代码，对服务端输出的 HTML 进行事件绑定与状态合并，
            让页面从“静态可见”变为“可交互”。
          </p>
        </div>
        <div class="step">
          <h3>4. 数据预取与状态同步</h3>
          <p>
            渲染前在服务端完成数据拉取，将初始状态注入到 HTML 中；
            客户端启动时读取该初始状态，避免二次请求与闪烁。
          </p>
        </div>
        <div class="step">
          <h3>5. 缓存与边缘计算</h3>
          <p>
            对稳定页面进行缓存（Page Cache、Partial Fragment Cache），或下沉到边缘（CDN/Edge
            Functions）以降低延迟。
          </p>
        </div>
      </div>
    </section>

    <section class="content-section">
      <h2>在本项目中如何落地（建议路径）</h2>
      <ul class="checklist">
        <li>在 @components/ 抽离一个 <strong>SSRCodeSamples</strong> 组件，集中展示示例代码</li>
        <li>在 @utils/ 抽象「运行环境检测」与「数据预取」的通用方法</li>
        <li>视业务选择 Nuxt（Vue2/3）或自建 Node 渲染服务（Koa/Express + vue-server-renderer）</li>
        <li>结合路由与数据层，完善“服务端预取 + 客户端激活”的同构流程</li>
      </ul>
      <div class="tip">
        页面中不直接展示代码，若需要查看实现细节，可在导航处进入「代码示例」组件。
      </div>
    </section>

    <section class="content-section">
      <h2>代码示例</h2>
      <SSRCodeSamples />
    </section>

    <section class="content-section">
      <h2>SSR 的权衡与适用场景</h2>
      <div class="pros-cons">
        <div class="pros">
          <h3>适用</h3>
          <ul>
            <li>内容型站点、营销页、需要良好 SEO 的页面</li>
            <li>首屏复杂、对首屏时间敏感的页面</li>
            <li>分享/预览信息需要精准控制的页面</li>
          </ul>
        </div>
        <div class="cons">
          <h3>不适用/谨慎</h3>
          <ul>
            <li>强交互应用但首屏内容很轻</li>
            <li>计算密集型首屏（会把压力推给服务器）</li>
            <li>团队缺少 Node/同构经验，或发布环境受限</li>
          </ul>
        </div>
      </div>
    </section>

    <section class="content-section">
      <h2>小结</h2>
      <p>
        SSR 本质是把「首屏 HTML 的生成」放在服务器完成，以换取更好的首屏体验与 SEO，
        同时引入渲染链路、部署与运维的复杂度。是否采用
        SSR，应结合业务场景、团队能力与成本评估后决定。
      </p>
    </section>
  </div>
</template>

<script>
import SSRCodeSamples from "../components/SSRCodeSamples.vue";

export default {
  name: "SSRDemo",
  components: { SSRCodeSamples },
};
</script>

<style scoped>
.ssr-demo {
  max-width: 1100px;
  margin: 0 auto;
  padding: 20px;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
}

.header-section {
  text-align: center;
  margin-bottom: 32px;
  padding: 36px 0;
  background: linear-gradient(135deg, #00c6ff 0%, #0072ff 100%);
  color: white;
  border-radius: 12px;
}

.header-section h1 {
  margin: 0 0 8px 0;
  font-size: 2.2rem;
}

.subtitle {
  margin: 0;
  opacity: 0.9;
}

.content-section {
  margin-bottom: 28px;
  padding: 24px;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
}

.content-section h2 {
  margin: 0 0 12px 0;
  color: #2c3e50;
}

.key-points {
  padding-left: 20px;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 16px;
}

.card {
  padding: 16px;
  background: #f8f9fa;
  border-radius: 8px;
  border-left: 4px solid #0072ff;
}

.note {
  margin-top: 12px;
  padding: 12px;
  background: #fff3cd;
  border: 1px solid #ffeeba;
  border-radius: 6px;
  color: #856404;
}

.steps .step {
  margin-bottom: 14px;
  padding: 14px;
  background: #f8f9fa;
  border-radius: 8px;
  border-left: 4px solid #00c6ff;
}

.checklist {
  padding-left: 20px;
}

.tip {
  margin-top: 12px;
  color: #555;
}

.pros-cons {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

.pros,
.cons {
  background: #f8f9fa;
  padding: 16px;
  border-radius: 8px;
}
.pros {
  border-left: 4px solid #28a745;
}
.cons {
  border-left: 4px solid #dc3545;
}

@media (max-width: 768px) {
  .pros-cons {
    grid-template-columns: 1fr;
  }
}
</style>
