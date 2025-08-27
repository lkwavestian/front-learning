<template>
  <div class="data-list">
    <ul>
      <li v-for="(item, index) in items" :key="item.id">
        <!-- 作用域插槽，向父组件传递 item 数据 -->
        <slot :item="item" :index="index">
          <span>子组件内容</span>
        </slot>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "DataList",
  props: {
    items: {
      type: Array,
      default: () => [
        { id: 1, name: "张三", age: 25 },
        { id: 2, name: "李四", age: 30 },
        { id: 3, name: "王五", age: 28 },
      ],
    },
  },
};
</script>

<style scoped>
.data-list ul {
  list-style: none;
  padding: 0;
}

.data-list li {
  padding: 10px;
  border-bottom: 1px solid #dee2e6;
}

.custom-item {
  display: flex;
  gap: 15px;
  align-items: center;
}

.custom-item .index {
  font-weight: bold;
  color: #007bff;
  min-width: 30px;
}

.custom-item .name {
  font-weight: 500;
  color: #2c3e50;
}

.custom-item .age {
  color: #6c757d;
  font-size: 0.9rem;
}
</style>
