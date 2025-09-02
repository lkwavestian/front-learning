<template>
  <div class="ssr-code-samples">
    <h3>SSR 代码示例（独立组件承载）</h3>
    <p class="desc">以下仅展示关键结构，便于理解整体实现。可根据需要迁移到真实工程。</p>

    <div class="sample">
      <h4>1) 服务器入口（Node/Koa 示例）</h4>
      <pre><code>// server/index.js（示意）
const Koa = require('koa')
const mount = require('@koa/mount')
const serve = require('koa-static')
const { createBundleRenderer } = require('vue-server-renderer')

const app = new Koa()
const renderer = createBundleRenderer(/* serverBundle, clientManifest, template */)

app.use(mount('/dist', serve('./dist')))

app.use(async (ctx) => {
  const context = { url: ctx.url }
  const html = await renderer.renderToString(context)
  ctx.type = 'html'
  ctx.body = html
})

app.listen(3000)</code></pre>
    </div>

    <div class="sample">
      <h4>2) 创建应用工厂（同构）</h4>
      <pre><code>// src/app.js（示意）
import Vue from 'vue'
import App from './App.vue'
import createRouter from './router'
import createStore from './store'

export function createApp () {
  const router = createRouter()
  const store = createStore()
  const app = new Vue({ router, store, render: h => h(App) })
  return { app, router, store }
}</code></pre>
    </div>

    <div class="sample">
      <h4>3) 服务端入口</h4>
      <pre><code>// src/entry-server.js（示意）
import { createApp } from './app'

export default context => new Promise((resolve, reject) => {
  const { app, router, store } = createApp()
  router.push(context.url)
  router.onReady(async () => {
    // 在此处预取数据并填充到 store
    context.state = store.state
    resolve(app)
  }, reject)
})</code></pre>
    </div>

    <div class="sample">
      <h4>4) 客户端入口（激活）</h4>
      <pre><code>// src/entry-client.js（示意）
import { createApp } from './app'

const { app, router, store } = createApp()
if (window.__INITIAL_STATE__) {
  store.replaceState(window.__INITIAL_STATE__)
}
router.onReady(() => {
  app.$mount('#app')
})</code></pre>
    </div>
  </div>
</template>

<script>
export default { name: "SSRCodeSamples" };
</script>

<style scoped>
.ssr-code-samples {
  background: #f8f9fa;
  padding: 16px;
  border-radius: 8px;
}
.desc {
  color: #555;
  margin-bottom: 12px;
}
.sample {
  background: #fff;
  border-radius: 6px;
  padding: 12px;
  margin-bottom: 12px;
}
pre {
  background: #2d3748;
  color: #e2e8f0;
  padding: 12px;
  border-radius: 6px;
  overflow-x: auto;
}
h4 {
  margin: 0 0 8px 0;
  color: #2c3e50;
}
</style>
