<template>
  <div class="user-list">
    <h3>👥 用户列表组件</h3>
    <p class="component-info">这个组件演示了 keep-alive 的状态保持功能</p>

    <div class="demo-controls">
      <div class="control-group">
        <label>搜索用户：</label>
        <input
          v-model="searchQuery"
          type="text"
          placeholder="输入用户名搜索..."
          class="search-input"
        />
      </div>

      <div class="control-group">
        <label>排序方式：</label>
        <select v-model="sortBy" class="sort-select">
          <option value="name">按姓名排序</option>
          <option value="age">按年龄排序</option>
          <option value="email">按邮箱排序</option>
        </select>
      </div>

      <div class="control-group">
        <label>每页显示：</label>
        <select v-model="pageSize" class="page-size-select">
          <option value="5">5条</option>
          <option value="10">10条</option>
          <option value="20">20条</option>
        </select>
      </div>
    </div>

    <div class="user-table">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>姓名</th>
            <th>年龄</th>
            <th>邮箱</th>
            <th>状态</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in filteredUsers" :key="user.id">
            <td>{{ user.id }}</td>
            <td>{{ user.name }}</td>
            <td>{{ user.age }}</td>
            <td>{{ user.email }}</td>
            <td>
              <span :class="['status', user.status]">
                {{ user.status === "active" ? "活跃" : "非活跃" }}
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="pagination">
      <button @click="prevPage" :disabled="currentPage === 1" class="page-btn">上一页</button>
      <span class="page-info">第 {{ currentPage }} 页，共 {{ totalPages }} 页</span>
      <button @click="nextPage" :disabled="currentPage === totalPages" class="page-btn">
        下一页
      </button>
    </div>

    <div class="component-stats">
      <h4>组件状态信息</h4>
      <div class="stats-grid">
        <div class="stat-item">
          <span class="stat-label">搜索关键词：</span>
          <span class="stat-value">{{ searchQuery || "无" }}</span>
        </div>
        <div class="stat-item">
          <span class="stat-label">排序方式：</span>
          <span class="stat-value">{{ sortBy }}</span>
        </div>
        <div class="stat-item">
          <span class="stat-label">每页条数：</span>
          <span class="stat-value">{{ pageSize }}</span>
        </div>
        <div class="stat-item">
          <span class="stat-label">当前页码：</span>
          <span class="stat-value">{{ currentPage }}</span>
        </div>
        <div class="stat-item">
          <span class="stat-label">显示用户数：</span>
          <span class="stat-value">{{ filteredUsers.length }}</span>
        </div>
        <div class="stat-item">
          <span class="stat-label">组件创建时间：</span>
          <span class="stat-value">{{ createdTime }}</span>
        </div>
      </div>
    </div>

    <div class="lifecycle-info">
      <p><strong>💡 提示：</strong>尝试切换组件后再回来，你会发现：</p>
      <ul>
        <li>搜索关键词、排序方式、分页状态都被保持了</li>
        <li>组件没有重新创建，而是从缓存中恢复</li>
        <li>这就是 keep-alive 的作用！</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "UserList",
  data() {
    return {
      searchQuery: "",
      sortBy: "name",
      pageSize: 10,
      currentPage: 1,
      createdTime: new Date().toLocaleTimeString(),
      users: [
        { id: 1, name: "张三", age: 25, email: "zhangsan@example.com", status: "active" },
        { id: 2, name: "李四", age: 30, email: "lisi@example.com", status: "active" },
        { id: 3, name: "王五", age: 28, email: "wangwu@example.com", status: "inactive" },
        { id: 4, name: "赵六", age: 35, email: "zhaoliu@example.com", status: "active" },
        { id: 5, name: "钱七", age: 22, email: "qianqi@example.com", status: "active" },
        { id: 6, name: "孙八", age: 27, email: "sunba@example.com", status: "inactive" },
        { id: 7, name: "周九", age: 32, email: "zhoujiu@example.com", status: "active" },
        { id: 8, name: "吴十", age: 29, email: "wushi@example.com", status: "active" },
        { id: 9, name: "郑十一", age: 26, email: "zhengshiyi@example.com", status: "active" },
        { id: 10, name: "王十二", age: 31, email: "wangshier@example.com", status: "inactive" },
      ],
    };
  },
  computed: {
    filteredUsers() {
      let result = this.users;

      // 搜索过滤
      if (this.searchQuery) {
        result = result.filter(
          (user) =>
            user.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
            user.email.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
      }

      // 排序
      result = [...result].sort((a, b) => {
        if (this.sortBy === "name") {
          return a.name.localeCompare(b.name);
        } else if (this.sortBy === "age") {
          return a.age - b.age;
        } else if (this.sortBy === "email") {
          return a.email.localeCompare(b.email);
        }
        return 0;
      });

      // 分页
      const start = (this.currentPage - 1) * this.pageSize;
      const end = start + this.pageSize;
      return result.slice(start, end);
    },
    totalPages() {
      const total = this.users.length;
      return Math.ceil(total / this.pageSize);
    },
  },
  methods: {
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
      }
    },
  },
  created() {
    console.log("UserList 组件被创建");
  },
  mounted() {
    console.log("UserList 组件被挂载");
  },
  activated() {
    console.log("UserList 组件被激活");
  },
  deactivated() {
    console.log("UserList 组件被停用");
  },
  destroyed() {
    console.log("UserList 组件被销毁");
  },
};
</script>

<style scoped>
.user-list {
  padding: 20px;
  background: white;
  border-radius: 8px;
  border: 2px solid #e9ecef;
}

.component-info {
  color: #6c757d;
  margin-bottom: 20px;
  font-style: italic;
}

.demo-controls {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-bottom: 25px;
  padding: 20px;
  background: #f8f9fa;
  border-radius: 6px;
}

.control-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.control-group label {
  font-weight: 600;
  color: #495057;
  font-size: 0.9rem;
}

.search-input,
.sort-select,
.page-size-select {
  padding: 8px 12px;
  border: 2px solid #dee2e6;
  border-radius: 4px;
  font-size: 0.9rem;
  transition: border-color 0.3s ease;
}

.search-input:focus,
.sort-select:focus,
.page-size-select:focus {
  outline: none;
  border-color: #007bff;
}

.user-table {
  margin-bottom: 25px;
  overflow-x: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
  background: white;
}

th,
td {
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid #dee2e6;
}

th {
  background: #f8f9fa;
  font-weight: 600;
  color: #495057;
}

td {
  color: #212529;
}

.status {
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 0.8rem;
  font-weight: 500;
}

.status.active {
  background: #d4edda;
  color: #155724;
}

.status.inactive {
  background: #f8d7da;
  color: #721c24;
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  margin-bottom: 25px;
  padding: 20px;
  background: #f8f9fa;
  border-radius: 6px;
}

.page-btn {
  padding: 8px 16px;
  border: 2px solid #007bff;
  background: white;
  color: #007bff;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 0.9rem;
}

.page-btn:hover:not(:disabled) {
  background: #007bff;
  color: white;
}

.page-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.page-info {
  color: #6c757d;
  font-weight: 500;
}

.component-stats {
  margin-bottom: 25px;
  padding: 20px;
  background: #e3f2fd;
  border-radius: 6px;
  border-left: 4px solid #2196f3;
}

.component-stats h4 {
  color: #2c3e50;
  margin-bottom: 15px;
  font-size: 1.1rem;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 15px;
}

.stat-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 12px;
  background: white;
  border-radius: 4px;
  border-left: 3px solid #2196f3;
}

.stat-label {
  color: #495057;
  font-weight: 500;
}

.stat-value {
  color: #2196f3;
  font-weight: 600;
  font-family: monospace;
}

.lifecycle-info {
  padding: 20px;
  background: #fff3cd;
  border-radius: 6px;
  border-left: 4px solid #ffc107;
}

.lifecycle-info p {
  color: #856404;
  margin-bottom: 10px;
  font-weight: 500;
}

.lifecycle-info ul {
  color: #856404;
  padding-left: 20px;
  margin: 0;
}

.lifecycle-info li {
  margin-bottom: 5px;
}

@media (max-width: 768px) {
  .demo-controls {
    grid-template-columns: 1fr;
  }

  .stats-grid {
    grid-template-columns: 1fr;
  }

  .pagination {
    flex-direction: column;
    gap: 15px;
  }
}
</style>
