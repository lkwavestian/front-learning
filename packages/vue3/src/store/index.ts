import { defineStore } from "pinia";

// 示例 Store - Counter
export const useCounterStore = defineStore("counter", {
  state: () => ({
    count: 0,
  }),
  getters: {
    doubleCount: (state) => state.count * 2,
  },
  actions: {
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
});

// 示例 Store - User
export const useUserStore = defineStore("user", {
  state: () => ({
    username: "",
    email: "",
    role: "guest" as "guest" | "user" | "admin",
  }),
  getters: {
    isAuthenticated: (state) => !!state.username,
    isAdmin: (state) => state.role === "admin",
  },
  actions: {
    setUser(username: string, email: string, role: "guest" | "user" | "admin") {
      this.username = username;
      this.email = email;
      this.role = role;
    },
    logout() {
      this.username = "";
      this.email = "";
      this.role = "guest";
    },
  },
});
