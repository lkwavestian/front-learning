<template>
  <div class="user-detail">
    <h3>👤 用户详情组件</h3>
    <p class="component-info">这个组件演示了 keep-alive 的状态保持功能</p>

    <div class="user-profile">
      <div class="profile-header">
        <div class="avatar">
          <span class="avatar-text">{{ selectedUser.name.charAt(0) }}</span>
        </div>
        <div class="profile-info">
          <h4>{{ selectedUser.name }}</h4>
          <p class="user-email">{{ selectedUser.email }}</p>
          <span :class="['status-badge', selectedUser.status]">
            {{ selectedUser.status === "active" ? "活跃用户" : "非活跃用户" }}
          </span>
        </div>
      </div>

      <div class="profile-details">
        <div class="detail-item">
          <span class="detail-label">用户ID：</span>
          <span class="detail-value">{{ selectedUser.id }}</span>
        </div>
        <div class="detail-item">
          <span class="detail-label">年龄：</span>
          <span class="detail-value">{{ selectedUser.age }} 岁</span>
        </div>
        <div class="detail-item">
          <span class="detail-label">注册时间：</span>
          <span class="detail-value">{{ selectedUser.registerDate }}</span>
        </div>
        <div class="detail-item">
          <span class="detail-label">最后登录：</span>
          <span class="detail-value">{{ selectedUser.lastLogin }}</span>
        </div>
      </div>
    </div>

    <div class="user-actions">
      <h4>用户操作</h4>
      <div class="action-buttons">
        <button @click="editUser" class="action-btn edit-btn">✏️ 编辑用户</button>
        <button @click="deleteUser" class="action-btn delete-btn">🗑️ 删除用户</button>
        <button @click="resetPassword" class="action-btn reset-btn">🔑 重置密码</button>
        <button @click="toggleStatus" class="action-btn toggle-btn">
          {{ selectedUser.status === "active" ? "🚫 禁用用户" : "✅ 启用用户" }}
        </button>
      </div>
    </div>

    <div class="user-notes">
      <h4>用户备注</h4>
      <div class="notes-input">
        <textarea
          v-model="userNotes"
          placeholder="输入用户备注信息..."
          rows="4"
          class="notes-textarea"
        ></textarea>
        <button @click="saveNotes" class="save-btn">💾 保存备注</button>
      </div>
      <div class="notes-history">
        <h5>备注历史</h5>
        <div class="note-item" v-for="(note, index) in notesHistory" :key="index">
          <div class="note-header">
            <span class="note-time">{{ note.time }}</span>
            <span class="note-author">{{ note.author }}</span>
          </div>
          <div class="note-content">{{ note.content }}</div>
        </div>
      </div>
    </div>

    <div class="component-stats">
      <h4>组件状态信息</h4>
      <div class="stats-grid">
        <div class="stat-item">
          <span class="stat-label">当前用户：</span>
          <span class="stat-value">{{ selectedUser.name }}</span>
        </div>
        <div class="stat-item">
          <span class="stat-label">用户状态：</span>
          <span class="stat-value">{{ selectedUser.status === "active" ? "活跃" : "非活跃" }}</span>
        </div>
        <div class="stat-item">
          <span class="stat-label">备注数量：</span>
          <span class="stat-value">{{ notesHistory.length }}</span>
        </div>
        <div class="stat-item">
          <span class="stat-label">组件创建时间：</span>
          <span class="stat-value">{{ createdTime }}</span>
        </div>
        <div class="stat-item">
          <span class="stat-label">最后操作：</span>
          <span class="stat-value">{{ lastAction || "无" }}</span>
        </div>
      </div>
    </div>

    <div class="lifecycle-info">
      <p><strong>💡 提示：</strong>尝试切换组件后再回来，你会发现：</p>
      <ul>
        <li>选择的用户、备注内容、操作历史都被保持了</li>
        <li>组件没有重新创建，而是从缓存中恢复</li>
        <li>这就是 keep-alive 的作用！</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "UserDetail",
  data() {
    return {
      selectedUser: {
        id: 1,
        name: "张三",
        age: 25,
        email: "zhangsan@example.com",
        status: "active",
        registerDate: "2023-01-15",
        lastLogin: "2024-01-20 14:30:00",
      },
      userNotes: "",
      notesHistory: [
        {
          time: "2024-01-20 14:30:00",
          author: "管理员",
          content: "用户登录系统，状态正常",
        },
        {
          time: "2024-01-19 09:15:00",
          author: "客服",
          content: "用户咨询产品功能，已解答",
        },
      ],
      createdTime: new Date().toLocaleTimeString(),
      lastAction: null,
    };
  },
  methods: {
    editUser() {
      this.lastAction = "编辑用户";
      this.addNote("管理员", "编辑用户信息");
    },
    deleteUser() {
      this.lastAction = "删除用户";
      this.addNote("管理员", "删除用户操作");
    },
    resetPassword() {
      this.lastAction = "重置密码";
      this.addNote("管理员", "重置用户密码");
    },
    toggleStatus() {
      this.selectedUser.status = this.selectedUser.status === "active" ? "inactive" : "active";
      this.lastAction = `切换状态为${this.selectedUser.status === "active" ? "活跃" : "非活跃"}`;
      this.addNote(
        "管理员",
        `用户状态切换为${this.selectedUser.status === "active" ? "活跃" : "非活跃"}`
      );
    },
    saveNotes() {
      if (this.userNotes.trim()) {
        this.addNote("管理员", this.userNotes);
        this.userNotes = "";
        this.lastAction = "保存备注";
      }
    },
    addNote(author, content) {
      this.notesHistory.unshift({
        time: new Date().toLocaleString(),
        author,
        content,
      });
    },
  },
  created() {
    console.log("UserDetail 组件被创建");
  },
  mounted() {
    console.log("UserDetail 组件被挂载");
  },
  activated() {
    console.log("UserDetail 组件被激活");
  },
  deactivated() {
    console.log("UserDetail 组件被停用");
  },
  destroyed() {
    console.log("UserDetail 组件被销毁");
  },
};
</script>

<style scoped>
.user-detail {
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

.user-profile {
  margin-bottom: 25px;
  padding: 20px;
  background: #f8f9fa;
  border-radius: 8px;
  border-left: 4px solid #17a2b8;
}

.profile-header {
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 20px;
}

.avatar {
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.avatar-text {
  color: white;
  font-size: 2rem;
  font-weight: bold;
}

.profile-info h4 {
  margin: 0 0 8px 0;
  color: #2c3e50;
  font-size: 1.5rem;
}

.user-email {
  margin: 0 0 12px 0;
  color: #6c757d;
  font-size: 1rem;
}

.status-badge {
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 500;
}

.status-badge.active {
  background: #d4edda;
  color: #155724;
}

.status-badge.inactive {
  background: #f8d7da;
  color: #721c24;
}

.profile-details {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 15px;
}

.detail-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px;
  background: white;
  border-radius: 6px;
  border-left: 3px solid #17a2b8;
}

.detail-label {
  color: #495057;
  font-weight: 500;
}

.detail-value {
  color: #17a2b8;
  font-weight: 600;
}

.user-actions {
  margin-bottom: 25px;
  padding: 20px;
  background: #f8f9fa;
  border-radius: 8px;
  border-left: 4px solid #ffc107;
}

.user-actions h4 {
  color: #2c3e50;
  margin-bottom: 15px;
  font-size: 1.1rem;
}

.action-buttons {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 15px;
}

.action-btn {
  padding: 12px 16px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 500;
  transition: all 0.3s ease;
}

.edit-btn {
  background: #17a2b8;
  color: white;
}

.edit-btn:hover {
  background: #138496;
}

.delete-btn {
  background: #dc3545;
  color: white;
}

.delete-btn:hover {
  background: #c82333;
}

.reset-btn {
  background: #6f42c1;
  color: white;
}

.reset-btn:hover {
  background: #5a2d91;
}

.toggle-btn {
  background: #28a745;
  color: white;
}

.toggle-btn:hover {
  background: #218838;
}

.user-notes {
  margin-bottom: 25px;
  padding: 20px;
  background: #f8f9fa;
  border-radius: 8px;
  border-left: 4px solid #28a745;
}

.user-notes h4 {
  color: #2c3e50;
  margin-bottom: 15px;
  font-size: 1.1rem;
}

.notes-input {
  margin-bottom: 20px;
}

.notes-textarea {
  width: 100%;
  padding: 12px;
  border: 2px solid #dee2e6;
  border-radius: 6px;
  font-size: 0.9rem;
  resize: vertical;
  margin-bottom: 10px;
  transition: border-color 0.3s ease;
}

.notes-textarea:focus {
  outline: none;
  border-color: #28a745;
}

.save-btn {
  padding: 8px 16px;
  background: #28a745;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: background 0.3s ease;
}

.save-btn:hover {
  background: #218838;
}

.notes-history h5 {
  color: #2c3e50;
  margin-bottom: 15px;
  font-size: 1rem;
}

.note-item {
  background: white;
  padding: 15px;
  border-radius: 6px;
  margin-bottom: 10px;
  border-left: 3px solid #28a745;
}

.note-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
  font-size: 0.8rem;
}

.note-time {
  color: #6c757d;
}

.note-author {
  color: #28a745;
  font-weight: 500;
}

.note-content {
  color: #495057;
  line-height: 1.4;
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
  .profile-header {
    flex-direction: column;
    text-align: center;
  }

  .action-buttons {
    grid-template-columns: 1fr;
  }

  .stats-grid {
    grid-template-columns: 1fr;
  }

  .profile-details {
    grid-template-columns: 1fr;
  }
}
</style>
