<template>
  <button class="demo-btn" @click="$emit('click')">
    <slot>按钮</slot>
  </button>
</template>

<script>
export default {
  name: "DemoButton",
  emits: ["click"],
};
</script>

<style scoped>
.demo-btn {
  background: #007bff;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  margin: 5px;
  transition: background-color 0.3s ease;
}

.demo-btn:hover {
  background: #0056b3;
}
</style>
