<template>
  <div class="custom-item">
    <span class="index">{{ index + 1 }}.</span>
    <span class="name">{{ item.name }}</span>
    <span class="age">({{ item.age }}岁)</span>
  </div>
</template>

<script>
export default {
  name: "CustomListItem",
  props: {
    item: {
      type: Object,
      required: true,
    },
    index: {
      type: Number,
      required: true,
    },
  },
};
</script>

<style scoped>
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
