<template>
  <div class="dynamic-slot">
    <!-- 动态插槽名称 -->
    <slot :name="slotName">
      <p>默认内容</p>
    </slot>
  </div>
</template>

<script>
export default {
  name: "DynamicSlot",
  props: {
    slotName: {
      type: String,
      default: "default",
    },
  },
};
</script>

<style scoped>
.dynamic-slot {
  text-align: center;
}

.slot-display {
  margin: 20px 0;
  min-height: 100px;
}

.slot-content {
  padding: 20px;
  border-radius: 8px;
  margin: 10px 0;
}

.slot-content.header {
  background: #d4edda;
  border: 2px solid #c3e6cb;
  color: #155724;
}

.slot-content.content {
  background: #d1ecf1;
  border: 2px solid #bee5eb;
  color: #0c5460;
}

.slot-content.footer {
  background: #f8d7da;
  border: 2px solid #f5c6cb;
  color: #721c24;
}

.current-slot {
  margin-top: 15px;
  font-weight: 500;
  color: #6c757d;
}
</style>
