<template>
  <div class="counter-wrong">
    <h3>{{ title }}</h3>
    <p>当前值：{{ count }}</p>
    <div class="counter-buttons">
      <button @click="increment" class="btn btn-primary">+1</button>
      <button @click="decrement" class="btn btn-warning">-1</button>
      <button @click="reset" class="btn btn-danger">重置</button>
    </div>
    <div class="instance-info">
      <p><strong>组件实例ID：</strong>{{ instanceId }}</p>
      <p><strong>Data引用：</strong>{{ dataReference }}</p>
    </div>
  </div>
</template>

<script>
// ❌ 错误用法：共享同一个数据对象（会导致所有实例状态联动）
const sharedState = {
  count: 0,
  instanceId: Date.now() + Math.random(),
};

export default {
  name: "CounterWrong",
  props: {
    title: {
      type: String,
      default: "计数器(错误用法)",
    },
  },
  // 用函数返回“同一个”对象，模拟错误用法但保持响应式
  data() {
    return sharedState;
  },
  computed: {
    dataReference() {
      return `0x${this.instanceId.toString(16).slice(-8)}`;
    },
  },
  methods: {
    increment() {
      this.count++;
    },
    decrement() {
      this.count--;
    },
    reset() {
      this.count = 0;
    },
  },
};
</script>

<style scoped>
.counter-wrong {
  background: #fff5f5;
  border: 2px solid #fed7d7;
  border-radius: 8px;
  padding: 20px;
  text-align: center;
  margin: 10px;
}

.counter-wrong h3 {
  color: #c53030;
  margin-bottom: 15px;
}

.counter-buttons {
  margin: 15px 0;
}

.btn {
  padding: 8px 16px;
  margin: 5px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.3s;
}

.btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.btn-primary {
  background: #007bff;
  color: white;
}
.btn-warning {
  background: #ffc107;
  color: #212529;
}
.btn-danger {
  background: #dc3545;
  color: white;
}

.instance-info {
  background: #fed7d7;
  border-radius: 4px;
  padding: 10px;
  margin-top: 15px;
  font-size: 12px;
}

.instance-info p {
  margin: 5px 0;
  color: #c53030;
}
</style>
