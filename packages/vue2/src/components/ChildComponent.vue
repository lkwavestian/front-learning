<template>
  <div class="child-component">
    <h3>子组件标题</h3>
    <!-- 默认插槽 -->
    <slot>
      <p>这是默认内容，当父组件没有传递内容时显示</p>
    </slot>
    <p>子组件底部内容</p>
  </div>
</template>

<script>
export default {
  name: "ChildComponent",
};
</script>

<style scoped>
.child-component {
  background: white;
  padding: 20px;
  border-radius: 8px;
  border: 2px solid #dee2e6;
}

.child-component h3 {
  color: #495057;
  margin-bottom: 15px;
}

.slot-content {
  padding: 15px;
  background: #e3f2fd;
  border-radius: 6px;
  margin: 15px 0;
}
</style>
