import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    // 用户信息
    user: {
      name: "Vue 学习者",
      age: 25,
      email: "learner@vue.com",
    },
    // 计数器
    count: 0,
    // 待办事项列表
    todos: [
      { id: 1, text: "学习 Vue.js 基础", completed: false },
      { id: 2, text: "学习 Vuex 状态管理", completed: false },
      { id: 3, text: "学习 Vue Router", completed: false },
    ],
    // 购物车
    cart: {
      items: [],
      total: 0,
    },
  },

  mutations: {
    // 更新用户信息
    UPDATE_USER(state, userInfo) {
      state.user = { ...state.user, ...userInfo };
    },

    // 增加计数器
    INCREMENT(state) {
      state.count++;
    },

    // 减少计数器
    DECREMENT(state) {
      state.count--;
    },

    // 重置计数器
    RESET_COUNT(state) {
      state.count = 0;
    },

    // 添加待办事项
    ADD_TODO(state, text) {
      const newTodo = {
        id: Date.now(),
        text,
        completed: false,
      };
      state.todos.push(newTodo);
    },

    // 切换待办事项状态
    TOGGLE_TODO(state, id) {
      const todo = state.todos.find((todo) => todo.id === id);
      if (todo) {
        todo.completed = !todo.completed;
      }
    },

    // 删除待办事项
    DELETE_TODO(state, id) {
      state.todos = state.todos.filter((todo) => todo.id !== id);
    },

    // 添加商品到购物车
    ADD_TO_CART(state, item) {
      const existingItem = state.cart.items.find((cartItem) => cartItem.id === item.id);
      if (existingItem) {
        existingItem.quantity++;
      } else {
        state.cart.items.push({ ...item, quantity: 1 });
      }
      state.cart.total = state.cart.items.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );
    },

    // 从购物车移除商品
    REMOVE_FROM_CART(state, id) {
      state.cart.items = state.cart.items.filter((item) => item.id !== id);
      state.cart.total = state.cart.items.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );
    },
  },

  actions: {
    // 异步更新用户信息
    async updateUserInfo({ commit }, userInfo) {
      // 模拟异步操作
      await new Promise((resolve) => setTimeout(resolve, 1000));
      commit("UPDATE_USER", userInfo);
    },

    // 异步增加计数器
    async incrementAsync({ commit }) {
      await new Promise((resolve) => setTimeout(resolve, 500));
      commit("INCREMENT");
    },

    // 批量添加待办事项
    addMultipleTodos({ commit }, texts) {
      texts.forEach((text) => {
        commit("ADD_TODO", text);
      });
    },
  },

  getters: {
    // 获取用户全名
    userFullName: (state) => `${state.user.name} (${state.user.age}岁)`,

    // 获取已完成的待办事项
    completedTodos: (state) => state.todos.filter((todo) => todo.completed),

    // 获取未完成的待办事项
    pendingTodos: (state) => state.todos.filter((todo) => !todo.completed),

    // 获取待办事项总数
    totalTodos: (state) => state.todos.length,

    // 获取购物车商品总数
    cartItemCount: (state) => state.cart.items.reduce((total, item) => total + item.quantity, 0),

    // 获取购物车是否为空
    isCartEmpty: (state) => state.cart.items.length === 0,
  },
});
