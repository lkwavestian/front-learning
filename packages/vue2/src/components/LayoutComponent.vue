<template>
  <div class="layout-component">
    <header class="header">
      <slot name="header">默认头部</slot>
    </header>

    <main class="main">
      <slot name="main">默认主内容</slot>
    </main>

    <aside class="sidebar">
      <slot name="sidebar">默认侧边栏</slot>
    </aside>

    <footer class="footer">
      <slot name="footer">默认底部</slot>
    </footer>
  </div>
</template>

<script>
export default {
  name: "LayoutComponent",
};
</script>

<style scoped>
.layout-component {
  display: grid;
  grid-template-columns: 1fr 200px;
  grid-template-rows: auto 1fr auto;
  gap: 15px;
  background: white;
  padding: 20px;
  border-radius: 8px;
  border: 2px solid #dee2e6;
}

.layout-component .header {
  grid-column: 1 / -1;
  background: #007bff;
  color: white;
  padding: 15px;
  border-radius: 6px;
  text-align: center;
}

.layout-component .main {
  background: #f8f9fa;
  padding: 20px;
  border-radius: 6px;
}

.layout-component .sidebar {
  background: #e9ecef;
  padding: 20px;
  border-radius: 6px;
}

.layout-component .footer {
  grid-column: 1 / -1;
  background: #6c757d;
  color: white;
  padding: 15px;
  border-radius: 6px;
  text-align: center;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .layout-component {
    grid-template-columns: 1fr;
    grid-template-rows: auto auto auto auto;
  }

  .layout-component .sidebar {
    grid-column: 1;
  }
}
</style>
