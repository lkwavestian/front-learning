<template>
  <div class="dynamic-data">
    <h1>动态添加 data 属性测试（Vue2）</h1>

    <section class="card">
      <h2>对象动态属性</h2>
      <p><strong>user:</strong> {{ user }}</p>
      <p><strong>user.city:</strong> {{ user.city }}</p>
      <p class="hint">提示：直接新增根级属性不会触发响应式更新</p>
      <p>
        <strong>变更计数 changes:</strong> <span class="badge">{{ renderCount }}</span>
      </p>
      <div class="btns">
        <button class="btn" @click="addCityPlain">
          1) 直接赋值 user.city = 'Beijing'（不会响应）
        </button>
        <button class="btn primary" @click="addCityBySet">
          2) this.$set(user, 'city', 'Shanghai')（会响应）
        </button>
        <button class="btn primary" @click="addCityByVueSet">
          2) Vue.set(user, 'city', 'hangzhou')（会响应）
        </button>
        <button class="btn success" @click="replaceUser">
          3) user = { ...user, city: 'Guangzhou' }（会响应）
        </button>

        <button class="btn warn" @click="changeExisting">
          4) 修改已存在的 user.name（会响应）
        </button>
        <button class="btn" @click="forceUpdateCity">1) this.$forceUpdate()（会响应）</button>

        <div class="callout">
          当新增属性时，使用 this.$set / Vue.set / object.assign / 重新结构赋值 / forceUpdate
          会触发响应式更新，其他不会
        </div>
      </div>
    </section>

    <section class="card">
      <h2>数组索引变更</h2>
      <p><strong>list:</strong> {{ list }}</p>
      <p class="hint">提示：直接通过下标赋值不会触发响应式更新</p>
      <div class="btns">
        <button class="btn" @click="setByIndexPlain">5) 直接 list[1] = 'X'（不会响应）</button>
        <button class="btn primary" @click="setByVueSet">
          6) this.$set(list, 1, 'Y')（会响应）
        </button>
        <button class="btn success" @click="replaceBySplice">
          7) list.splice(1, 1, 'Z')（会响应）
        </button>
      </div>
    </section>
  </div>
</template>

<script>
import Vue from "vue";

export default {
  name: "DynamicData",
  data() {
    return {
      user: { name: "Alice" }, // 未声明 city
      list: ["a", "b", "c"],
      renderCount: 0,
    };
  },
  // 避免在 updated 中修改数据导致的无限更新循环
  watch: {
    user: {
      deep: true,
      handler() {
        this.renderCount++;
      },
    },
    list: {
      deep: true,
      handler() {
        this.renderCount++;
      },
    },
  },
  methods: {
    addCityPlain() {
      this.user.city = "Beijing";
    },
    addCityBySet() {
      this.$set(this.user, "city", "Shanghai");
    },
    addCityByVueSet() {
      Vue.set(this.user, "city", "hangzhou");
    },

    replaceUser() {
      this.user = { ...this.user, city: "Guangzhou" };
    },
    changeExisting() {
      this.user.name = "Bob";
    },
    forceUpdateCity() {
      this.user.city = "nanjing";
      this.$forceUpdate();
    },
    setByIndexPlain() {
      this.list[1] = "X";
    },
    setByVueSet() {
      this.$set(this.list, 1, "Y");
    },
    replaceBySplice() {
      this.list.splice(1, 1, "Z");
    },
  },
};
</script>

<style scoped>
.dynamic-data {
  --primary: #42b983;
  --primary-weak: #e6f7f1;
  --text: #2c3e50;
  --muted: #8c8c8c;
  --border: #eaeaea;
  --card-shadow: 0 6px 18px rgba(0, 0, 0, 0.06);
  --hover-shadow: 0 10px 24px rgba(0, 0, 0, 0.08);

  max-width: 1200px;
  margin: 0 auto;
  padding: 22px 20px 28px;
}

h1 {
  color: var(--primary);
  margin-bottom: 18px;
  font-weight: 700;
  letter-spacing: 0.2px;
}

h2 {
  margin: 0 0 12px;
  color: var(--text);
  font-size: 18px;
  font-weight: 600;
}

.card {
  background: #fff;
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 18px 20px;
  margin-bottom: 20px;
  box-shadow: var(--card-shadow);
  transition: box-shadow 0.25s ease, transform 0.25s ease, border-color 0.25s ease;
}

.card:hover {
  border-color: #dcdcdc;
  transform: translateY(-2px);
  box-shadow: var(--hover-shadow);
}

.hint {
  color: var(--muted);
  font-size: 13px;
  margin: 6px 0 12px;
}

.badge {
  display: inline-block;
  min-width: 26px;
  padding: 3px 10px;
  background: linear-gradient(135deg, #f0f5ff, #f6ffed);
  color: #2f54eb;
  border: 1px solid #d6e4ff;
  border-radius: 999px;
  font-size: 12px;
  text-align: center;
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.5);
}

.btns {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 12px;
  margin-top: 14px;
}

/* 让说明块在按钮网格中占满整行 */
.btns .callout {
  grid-column: 1 / -1;
}

.btn {
  padding: 10px 14px;
  border: 1px solid #d9d9d9;
  background: #fafafa;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  text-align: left;
  color: #1f1f1f;
}

.btn:hover {
  background: #f5f5f5;
  transform: translateY(-1px);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
}

.btn:active {
  transform: translateY(0);
  box-shadow: none;
}

.btn:focus-visible {
  outline: none;
  box-shadow: 0 0 0 3px rgba(66, 185, 131, 0.25);
  border-color: var(--primary);
}

.btn.primary {
  background: #e6f4ff;
  border-color: #91caff;
}

.btn.success {
  background: #e8f5e8;
  border-color: #95de64;
}

.btn.warn {
  background: #fff7e6;
  border-color: #ffd591;
}

/* 说明性文案强调样式（重设计） */
.callout {
  position: relative;
  display: flex;
  align-items: flex-start;
  gap: 10px;
  background: linear-gradient(180deg, #f7fffb 0%, #f4f8ff 100%);
  border: 1px solid #e6f0ff;
  border-radius: 12px;
  padding: 12px 14px;
  line-height: 1.65;
  color: #334155;
  box-shadow: 0 4px 14px rgba(31, 41, 55, 0.06);
}

.callout::before {
  content: "💡";
  font-size: 18px;
  line-height: 1;
  margin-top: 2px;
}

.callout::after {
  content: "";
  position: absolute;
  left: 0;
  top: 10px;
  bottom: 10px;
  width: 4px;
  border-radius: 2px;
  background: var(--primary);
  opacity: 0.6;
}

/* 辅助文案与高亮 */
strong {
  color: var(--text);
}

@media (max-width: 640px) {
  .dynamic-data {
    padding: 16px 14px 22px;
  }
  .btns {
    grid-template-columns: 1fr;
  }
}
</style>
