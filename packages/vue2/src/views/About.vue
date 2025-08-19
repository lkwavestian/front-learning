<template>
  <div class="about">
    <h1>关于我们</h1>
    <div class="content">
      <h2>Vue2 学习项目</h2>
      <p>这是一个专门用于学习 Vue.js 2.x 的项目，包含了 Vue2 的核心功能演示。</p>

      <h3>主要特性</h3>
      <ul>
        <li>响应式数据绑定</li>
        <li>组件化开发</li>
        <li>路由管理</li>
        <li>事件处理</li>
        <li>计算属性</li>
      </ul>

      <h3>技术栈</h3>
      <ul>
        <li>Vue.js 2.7.16</li>
        <li>Vue Router 3</li>
        <li>Vue CLI 5</li>
        <li>ESLint + Babel</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "About",
};
</script>

<style scoped>
.about {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

h1 {
  color: #42b983;
  text-align: center;
  margin-bottom: 30px;
}

.content {
  background-color: #f9f9f9;
  padding: 30px;
  border-radius: 8px;
  border: 1px solid #e1e1e1;
}

h2,
h3 {
  color: #2c3e50;
  border-bottom: 2px solid #42b983;
  padding-bottom: 10px;
  margin-top: 25px;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  background-color: white;
  margin: 8px 0;
  padding: 12px;
  border-radius: 4px;
  border-left: 3px solid #42b983;
}

p {
  line-height: 1.6;
  color: #666;
}
</style>
