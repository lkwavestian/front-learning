<template>
  <div class="user-edit">
    <h3>✏️ 用户编辑组件</h3>
    <p class="component-info">这个组件演示了 keep-alive 的状态保持功能</p>

    <div class="edit-form">
      <h4>用户信息编辑</h4>

      <div class="form-row">
        <div class="form-group">
          <label>用户名：</label>
          <input
            v-model="userForm.name"
            type="text"
            placeholder="请输入用户名"
            class="form-input"
          />
        </div>
        <div class="form-group">
          <label>年龄：</label>
          <input v-model="userForm.age" type="number" placeholder="请输入年龄" class="form-input" />
        </div>
      </div>

      <div class="form-row">
        <div class="form-group">
          <label>邮箱：</label>
          <input
            v-model="userForm.email"
            type="email"
            placeholder="请输入邮箱"
            class="form-input"
          />
        </div>
        <div class="form-group">
          <label>手机号：</label>
          <input
            v-model="userForm.phone"
            type="tel"
            placeholder="请输入手机号"
            class="form-input"
          />
        </div>
      </div>

      <div class="form-row">
        <div class="form-group">
          <label>性别：</label>
          <select v-model="userForm.gender" class="form-select">
            <option value="">请选择性别</option>
            <option value="male">男</option>
            <option value="female">女</option>
            <option value="other">其他</option>
          </select>
        </div>
        <div class="form-group">
          <label>状态：</label>
          <select v-model="userForm.status" class="form-select">
            <option value="active">活跃</option>
            <option value="inactive">非活跃</option>
            <option value="suspended">已暂停</option>
          </select>
        </div>
      </div>

      <div class="form-group full-width">
        <label>地址：</label>
        <textarea
          v-model="userForm.address"
          placeholder="请输入详细地址"
          rows="3"
          class="form-textarea"
        ></textarea>
      </div>

      <div class="form-group full-width">
        <label>个人简介：</label>
        <textarea
          v-model="userForm.bio"
          placeholder="请输入个人简介"
          rows="4"
          class="form-textarea"
        ></textarea>
      </div>

      <div class="form-actions">
        <button @click="saveUser" class="btn btn-primary">💾 保存用户</button>
        <button @click="resetForm" class="btn btn-secondary">🔄 重置表单</button>
        <button @click="previewUser" class="btn btn-info">👁️ 预览用户</button>
      </div>
    </div>

    <div class="form-preview" v-if="showPreview">
      <h4>用户信息预览</h4>
      <div class="preview-content">
        <div class="preview-item">
          <span class="preview-label">用户名：</span>
          <span class="preview-value">{{ userForm.name }}</span>
        </div>
        <div class="preview-item">
          <span class="preview-label">年龄：</span>
          <span class="preview-value">{{ userForm.age }} 岁</span>
        </div>
        <div class="preview-item">
          <span class="preview-label">邮箱：</span>
          <span class="preview-value">{{ userForm.email }}</span>
        </div>
        <div class="preview-item">
          <span class="preview-label">手机号：</span>
          <span class="preview-value">{{ userForm.phone }}</span>
        </div>
        <div class="preview-item">
          <span class="preview-label">性别：</span>
          <span class="preview-value">{{ getGenderText(userForm.gender) }}</span>
        </div>
        <div class="preview-item">
          <span class="preview-label">状态：</span>
          <span class="preview-value">{{ getStatusText(userForm.status) }}</span>
        </div>
        <div class="preview-item">
          <span class="preview-label">地址：</span>
          <span class="preview-value">{{ userForm.address || "未填写" }}</span>
        </div>
        <div class="preview-item">
          <span class="preview-label">个人简介：</span>
          <span class="preview-value">{{ userForm.bio || "未填写" }}</span>
        </div>
      </div>
      <button @click="showPreview = false" class="btn btn-secondary">关闭预览</button>
    </div>

    <div class="edit-history">
      <h4>编辑历史</h4>
      <div class="history-list">
        <div class="history-item" v-for="(history, index) in editHistory" :key="index">
          <div class="history-header">
            <span class="history-time">{{ history.time }}</span>
            <span class="history-action">{{ history.action }}</span>
          </div>
          <div class="history-details">
            <span v-for="(change, field) in history.changes" :key="field" class="change-item">
              <strong>{{ getFieldLabel(field) }}：</strong>
              <span class="change-old">{{ change.old }}</span>
              <span class="change-arrow">→</span>
              <span class="change-new">{{ change.new }}</span>
            </span>
          </div>
        </div>
      </div>
    </div>

    <div class="component-stats">
      <h4>组件状态信息</h4>
      <div class="stats-grid">
        <div class="stat-item">
          <span class="stat-label">表单状态：</span>
          <span class="stat-value">{{ formStatus }}</span>
        </div>
        <div class="stat-item">
          <span class="stat-label">编辑次数：</span>
          <span class="stat-value">{{ editHistory.length }}</span>
        </div>
        <div class="stat-item">
          <span class="stat-label">最后编辑：</span>
          <span class="stat-value">{{ lastEditTime || "无" }}</span>
        </div>
        <div class="stat-item">
          <span class="stat-label">组件创建时间：</span>
          <span class="stat-value">{{ createdTime }}</span>
        </div>
        <div class="stat-item">
          <span class="stat-label">表单是否已修改：</span>
          <span class="stat-value">{{ isFormModified ? "是" : "否" }}</span>
        </div>
      </div>
    </div>

    <div class="lifecycle-info">
      <p><strong>💡 提示：</strong>尝试切换组件后再回来，你会发现：</p>
      <ul>
        <li>表单内容、编辑历史、预览状态都被保持了</li>
        <li>组件没有重新创建，而是从缓存中恢复</li>
        <li>这就是 keep-alive 的作用！</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "UserEdit",
  data() {
    return {
      userForm: {
        name: "张三",
        age: 25,
        email: "zhangsan@example.com",
        phone: "13800138000",
        gender: "male",
        status: "active",
        address: "北京市朝阳区某某街道123号",
        bio: "热爱生活，积极向上的年轻人",
      },
      originalForm: {},
      showPreview: false,
      editHistory: [],
      createdTime: new Date().toLocaleTimeString(),
      lastEditTime: null,
    };
  },
  computed: {
    formStatus() {
      if (this.isFormModified) {
        return "已修改";
      }
      return "未修改";
    },
    isFormModified() {
      return JSON.stringify(this.userForm) !== JSON.stringify(this.originalForm);
    },
  },
  methods: {
    saveUser() {
      // 记录编辑历史
      const changes = {};
      Object.keys(this.userForm).forEach((key) => {
        if (this.userForm[key] !== this.originalForm[key]) {
          changes[key] = {
            old: this.originalForm[key],
            new: this.userForm[key],
          };
        }
      });

      if (Object.keys(changes).length > 0) {
        this.editHistory.unshift({
          time: new Date().toLocaleString(),
          action: "保存用户信息",
          changes,
        });

        // 更新原始表单
        this.originalForm = JSON.parse(JSON.stringify(this.userForm));
        this.lastEditTime = new Date().toLocaleString();
      }
    },
    resetForm() {
      this.userForm = JSON.parse(JSON.stringify(this.originalForm));
      this.editHistory.unshift({
        time: new Date().toLocaleString(),
        action: "重置表单",
        changes: {},
      });
    },
    previewUser() {
      this.showPreview = true;
    },
    getGenderText(gender) {
      const genderMap = {
        male: "男",
        female: "女",
        other: "其他",
      };
      return genderMap[gender] || "未选择";
    },
    getStatusText(status) {
      const statusMap = {
        active: "活跃",
        inactive: "非活跃",
        suspended: "已暂停",
      };
      return statusMap[status] || "未知";
    },
    getFieldLabel(field) {
      const fieldMap = {
        name: "用户名",
        age: "年龄",
        email: "邮箱",
        phone: "手机号",
        gender: "性别",
        status: "状态",
        address: "地址",
        bio: "个人简介",
      };
      return fieldMap[field] || field;
    },
  },
  created() {
    // 保存原始表单数据
    this.originalForm = JSON.parse(JSON.stringify(this.userForm));
    console.log("UserEdit 组件被创建");
  },
  mounted() {
    console.log("UserEdit 组件被挂载");
  },
  activated() {
    console.log("UserEdit 组件被激活");
  },
  deactivated() {
    console.log("UserEdit 组件被停用");
  },
  destroyed() {
    console.log("UserEdit 组件被销毁");
  },
};
</script>

<style scoped>
.user-edit {
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

.edit-form {
  margin-bottom: 25px;
  padding: 20px;
  background: #f8f9fa;
  border-radius: 8px;
  border-left: 4px solid #17a2b8;
}

.edit-form h4 {
  color: #2c3e50;
  margin-bottom: 20px;
  font-size: 1.1rem;
}

.form-row {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-bottom: 20px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.form-group.full-width {
  grid-column: 1 / -1;
}

.form-group label {
  font-weight: 600;
  color: #495057;
  font-size: 0.9rem;
}

.form-input,
.form-select,
.form-textarea {
  padding: 10px 12px;
  border: 2px solid #dee2e6;
  border-radius: 6px;
  font-size: 0.9rem;
  transition: border-color 0.3s ease;
}

.form-input:focus,
.form-select:focus,
.form-textarea:focus {
  outline: none;
  border-color: #17a2b8;
}

.form-textarea {
  resize: vertical;
  min-height: 80px;
}

.form-actions {
  display: flex;
  gap: 15px;
  margin-top: 20px;
  flex-wrap: wrap;
}

.btn {
  padding: 10px 20px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 500;
  transition: all 0.3s ease;
}

.btn-primary {
  background: #17a2b8;
  color: white;
}

.btn-primary:hover {
  background: #138496;
}

.btn-secondary {
  background: #6c757d;
  color: white;
}

.btn-secondary:hover {
  background: #5a6268;
}

.btn-info {
  background: #6f42c1;
  color: white;
}

.btn-info:hover {
  background: #5a2d91;
}

.form-preview {
  margin-bottom: 25px;
  padding: 20px;
  background: #e3f2fd;
  border-radius: 8px;
  border-left: 4px solid #2196f3;
}

.form-preview h4 {
  color: #2c3e50;
  margin-bottom: 20px;
  font-size: 1.1rem;
}

.preview-content {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 15px;
  margin-bottom: 20px;
}

.preview-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background: white;
  border-radius: 4px;
  border-left: 3px solid #2196f3;
}

.preview-label {
  color: #495057;
  font-weight: 500;
}

.preview-value {
  color: #2196f3;
  font-weight: 600;
}

.edit-history {
  margin-bottom: 25px;
  padding: 20px;
  background: #f8f9fa;
  border-radius: 8px;
  border-left: 4px solid #ffc107;
}

.edit-history h4 {
  color: #2c3e50;
  margin-bottom: 20px;
  font-size: 1.1rem;
}

.history-list {
  max-height: 300px;
  overflow-y: auto;
}

.history-item {
  background: white;
  padding: 15px;
  border-radius: 6px;
  margin-bottom: 15px;
  border-left: 3px solid #ffc107;
}

.history-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  font-size: 0.9rem;
}

.history-time {
  color: #6c757d;
}

.history-action {
  color: #ffc107;
  font-weight: 600;
}

.history-details {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.change-item {
  font-size: 0.9rem;
  color: #495057;
}

.change-old {
  color: #dc3545;
  text-decoration: line-through;
  margin: 0 5px;
}

.change-arrow {
  color: #6c757d;
  margin: 0 5px;
}

.change-new {
  color: #28a745;
  font-weight: 600;
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
  .form-row {
    grid-template-columns: 1fr;
  }

  .form-actions {
    flex-direction: column;
  }

  .preview-content {
    grid-template-columns: 1fr;
  }

  .stats-grid {
    grid-template-columns: 1fr;
  }
}
</style>
