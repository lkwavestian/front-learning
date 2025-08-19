<template>
  <div class="vuex-test">
    <h1>Vuex 状态管理测试</h1>

    <!-- 用户信息管理 -->
    <section class="test-section">
      <h2>用户信息管理</h2>
      <div class="user-info">
        <p><strong>当前用户：</strong>{{ userFullName }}</p>
        <p><strong>邮箱：</strong>{{ user.email }}</p>

        <div class="form-group">
          <label>姓名：</label>
          <input v-model="newUserInfo.name" type="text" placeholder="输入新姓名" />
        </div>

        <div class="form-group">
          <label>年龄：</label>
          <input v-model.number="newUserInfo.age" type="number" placeholder="输入新年龄" />
        </div>

        <button @click="updateUser" class="btn btn-primary">更新用户信息</button>
        <button @click="updateUserAsync" class="btn btn-secondary">异步更新用户信息</button>
      </div>
    </section>

    <!-- 计数器管理 -->
    <section class="test-section">
      <h2>计数器管理</h2>
      <div class="counter">
        <p><strong>当前计数：</strong>{{ count }}</p>
        <div class="counter-buttons">
          <button @click="increment" class="btn btn-success">+1</button>
          <button @click="decrement" class="btn btn-warning">-1</button>
          <button @click="resetCount" class="btn btn-danger">重置</button>
          <button @click="incrementAsyncClick" class="btn btn-info">异步+1</button>
        </div>
      </div>
    </section>

    <!-- 待办事项管理 -->
    <section class="test-section">
      <h2>待办事项管理</h2>
      <div class="todo-management">
        <div class="todo-stats">
          <p><strong>总任务：</strong>{{ totalTodos }}</p>
          <p><strong>已完成：</strong>{{ completedTodos.length }}</p>
          <p><strong>待完成：</strong>{{ pendingTodos.length }}</p>
        </div>

        <div class="add-todo">
          <input v-model="newTodo" type="text" placeholder="输入新的待办事项" />
          <button @click="addTodo" class="btn btn-primary">添加</button>
          <button @click="addMultipleTodos" class="btn btn-secondary">批量添加</button>
        </div>

        <div class="todo-list">
          <div
            v-for="todo in todos"
            :key="todo.id"
            class="todo-item"
            :class="{ completed: todo.completed }"
          >
            <input type="checkbox" :checked="todo.completed" @change="toggleTodo(todo.id)" />
            <span class="todo-text">{{ todo.text }}</span>
            <button @click="deleteTodo(todo.id)" class="btn btn-danger btn-sm">删除</button>
          </div>
        </div>
      </div>
    </section>

    <!-- 购物车管理 -->
    <section class="test-section">
      <h2>购物车管理</h2>
      <div class="cart-management">
        <div class="cart-stats">
          <p><strong>商品数量：</strong>{{ cartItemCount }}</p>
          <p><strong>总价：</strong>¥{{ cart.total.toFixed(2) }}</p>
          <p><strong>购物车状态：</strong>{{ isCartEmpty ? "空" : "有商品" }}</p>
        </div>

        <div class="add-product">
          <input v-model="newProduct.name" type="text" placeholder="商品名称" />
          <input v-model.number="newProduct.price" type="number" placeholder="商品价格" />
          <button @click="addToCart" class="btn btn-primary">添加到购物车</button>
        </div>

        <div class="cart-items">
          <div v-for="item in cart.items" :key="item.id" class="cart-item">
            <span class="item-name">{{ item.name }}</span>
            <span class="item-price">¥{{ item.price }}</span>
            <span class="item-quantity">x{{ item.quantity }}</span>
            <button @click="removeFromCart(item.id)" class="btn btn-danger btn-sm">移除</button>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";

export default {
  name: "VuexTest",
  data() {
    return {
      newUserInfo: {
        name: "",
        age: "",
      },
      newTodo: "",
      newProduct: {
        name: "",
        price: 0,
      },
    };
  },
  computed: {
    ...mapState(["user", "count", "todos", "cart"]),
    ...mapGetters([
      "userFullName",
      "completedTodos",
      "pendingTodos",
      "totalTodos",
      "cartItemCount",
      "isCartEmpty",
    ]),
  },
  methods: {
    ...mapMutations([
      "UPDATE_USER",
      "INCREMENT",
      "DECREMENT",
      "RESET_COUNT",
      "ADD_TODO",
      "TOGGLE_TODO",
      "DELETE_TODO",
      "ADD_TO_CART",
      "REMOVE_FROM_CART",
    ]),

    ...mapActions(["updateUserInfo", "incrementAsync", "addMultipleTodos"]),

    updateUser() {
      if (this.newUserInfo.name || this.newUserInfo.age) {
        const userInfo = {};
        if (this.newUserInfo.name) userInfo.name = this.newUserInfo.name;
        if (this.newUserInfo.age) userInfo.age = this.newUserInfo.age;

        this.UPDATE_USER(userInfo);
        this.newUserInfo = { name: "", age: "" };
      }
    },

    async updateUserAsync() {
      if (this.newUserInfo.name || this.newUserInfo.age) {
        const userInfo = {};
        if (this.newUserInfo.name) userInfo.name = this.newUserInfo.name;
        if (this.newUserInfo.age) userInfo.age = this.newUserInfo.age;

        await this.updateUserInfo(userInfo);
        this.newUserInfo = { name: "", age: "" };
      }
    },

    increment() {
      this.INCREMENT();
    },

    decrement() {
      this.DECREMENT();
    },

    resetCount() {
      this.RESET_COUNT();
    },

    async incrementAsyncClick() {
      await this.incrementAsync();
    },

    addTodo() {
      if (this.newTodo.trim()) {
        this.ADD_TODO(this.newTodo.trim());
        this.newTodo = "";
      }
    },

    addMultipleTodos() {
      const todos = ["学习 Vue 组件通信", "学习 Vue 生命周期", "学习 Vue 指令使用"];
      this.addMultipleTodos(todos);
    },

    toggleTodo(id) {
      this.TOGGLE_TODO(id);
    },

    deleteTodo(id) {
      this.DELETE_TODO(id);
    },

    addToCart() {
      if (this.newProduct.name && this.newProduct.price > 0) {
        const product = {
          id: Date.now(),
          name: this.newProduct.name,
          price: this.newProduct.price,
        };
        this.ADD_TO_CART(product);
        this.newProduct = { name: "", price: 0 };
      }
    },

    removeFromCart(id) {
      this.REMOVE_FROM_CART(id);
    },
  },
};
</script>

<style scoped>
.vuex-test {
  max-width: 1000px;
  margin: 0 auto;
  padding: 20px;
}

h1 {
  color: #42b983;
  text-align: center;
  margin-bottom: 30px;
}

.test-section {
  background: white;
  border-radius: 8px;
  padding: 25px;
  margin-bottom: 25px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

h2 {
  color: #2c3e50;
  border-bottom: 2px solid #42b983;
  padding-bottom: 10px;
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  color: #2c3e50;
  font-weight: bold;
}

.form-group input {
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
}

.counter-buttons {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.todo-stats,
.cart-stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 15px;
  margin-bottom: 20px;
}

.add-todo,
.add-product {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
  flex-wrap: wrap;
}

.add-todo input,
.add-product input {
  flex: 1;
  min-width: 200px;
}

.todo-list,
.cart-items {
  border: 1px solid #eee;
  border-radius: 4px;
  padding: 10px;
}

.todo-item,
.cart-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px;
  border-bottom: 1px solid #eee;
}

.todo-item:last-child,
.cart-item:last-child {
  border-bottom: none;
}

.todo-item.completed .todo-text {
  text-decoration: line-through;
  color: #999;
}

.todo-text {
  flex: 1;
}

.item-name {
  flex: 1;
}

.item-price,
.item-quantity {
  color: #666;
  margin: 0 10px;
}

.btn {
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.3s ease;
}

.btn:hover {
  opacity: 0.8;
}

.btn-primary {
  background-color: #42b983;
  color: white;
}

.btn-secondary {
  background-color: #6c757d;
  color: white;
}

.btn-success {
  background-color: #28a745;
  color: white;
}

.btn-warning {
  background-color: #ffc107;
  color: #212529;
}

.btn-danger {
  background-color: #dc3545;
  color: white;
}

.btn-info {
  background-color: #17a2b8;
  color: white;
}

.btn-sm {
  padding: 4px 8px;
  font-size: 12px;
}

@media (max-width: 768px) {
  .add-todo,
  .add-product {
    flex-direction: column;
  }

  .add-todo input,
  .add-product input {
    min-width: auto;
  }

  .counter-buttons {
    justify-content: center;
  }
}
</style>
