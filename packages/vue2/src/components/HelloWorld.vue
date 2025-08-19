<template>
  <div class="hello">
    <h1>{{ msg }}</h1>

    <!-- 数据绑定示例 -->
    <div class="data-binding">
      <h3>数据绑定示例</h3>
      <input v-model="inputText" placeholder="输入一些文字" />
      <p>你输入的内容: {{ inputText }}</p>
    </div>

    <!-- 事件处理示例 -->
    <div class="event-handling">
      <h3>事件处理示例</h3>
      <button @click="incrementCount">点击次数: {{ count }}</button>
      <button @click="resetCount">重置</button>
    </div>

    <!-- 计算属性示例 -->
    <div class="computed-properties">
      <h3>计算属性示例</h3>
      <p>输入文字长度: {{ textLength }}</p>
      <p>点击次数是否为偶数: {{ isEvenCount }}</p>
    </div>

    <!-- 条件渲染示例 -->
    <div class="conditional-rendering">
      <h3>条件渲染示例</h3>
      <button @click="toggleShow">切换显示</button>
      <p v-if="showMessage">这是条件显示的消息！</p>
      <p v-else>消息已隐藏</p>
    </div>

    <!-- 列表渲染示例 -->
    <div class="list-rendering">
      <h3>列表渲染示例</h3>
      <ul>
        <li v-for="(item, index) in items" :key="index">
          {{ item.name }} - {{ item.description }}
        </li>
      </ul>
      <button @click="addItem">添加项目</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  props: {
    msg: String,
  },
  data() {
    return {
      inputText: "",
      count: 0,
      showMessage: true,
      items: [
        { name: "Vue.js", description: "渐进式JavaScript框架" },
        { name: "Vue Router", description: "官方路由管理器" },
        { name: "Vuex", description: "状态管理模式" },
      ],
    };
  },
  computed: {
    textLength() {
      return this.inputText.length;
    },
    isEvenCount() {
      return this.count % 2 === 0 ? "是" : "否";
    },
  },
  methods: {
    incrementCount() {
      this.count++;
    },
    resetCount() {
      this.count = 0;
    },
    toggleShow() {
      this.showMessage = !this.showMessage;
    },
    addItem() {
      const newItem = {
        name: `项目 ${this.items.length + 1}`,
        description: `这是第 ${this.items.length + 1} 个项目`,
      };
      this.items.push(newItem);
    },
  },
};
</script>

<style scoped>
.hello {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

h1 {
  color: #42b983;
  margin-bottom: 30px;
}

h3 {
  margin: 30px 0 15px;
  color: #2c3e50;
  border-bottom: 2px solid #42b983;
  padding-bottom: 5px;
}

.data-binding,
.event-handling,
.computed-properties,
.conditional-rendering,
.list-rendering {
  margin: 20px 0;
  padding: 20px;
  border: 1px solid #e1e1e1;
  border-radius: 8px;
  background-color: #f9f9f9;
}

input {
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-right: 10px;
  font-size: 14px;
}

button {
  background-color: #42b983;
  color: white;
  border: none;
  padding: 8px 16px;
  margin: 5px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
}

button:hover {
  background-color: #3aa876;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  background-color: white;
  margin: 5px 0;
  padding: 10px;
  border-radius: 4px;
  border-left: 3px solid #42b983;
}

p {
  margin: 10px 0;
  color: #666;
}
</style>
