<template>
  <div class="proxy-demo-container">
    <!-- 返回首页按钮 -->
    <div class="back-button" @click="$router.push('/')">
      <span>← 返回首页</span>
    </div>

    <!-- 页面标题 -->
    <div class="page-header">
      <h1>Vue3 为什么用 Proxy API 替代 Object.defineProperty？</h1>
      <p class="subtitle">通过交互式演示理解两者的区别与优劣</p>
    </div>

    <!-- 核心概念介绍 -->
    <section class="section">
      <h2>📚 核心概念</h2>
      <div class="concept-grid">
        <div class="concept-card">
          <h3>Object.defineProperty</h3>
          <p>Vue2 的响应式基础，通过 getter/setter 劫持对象属性</p>
          <div class="feature-list">
            <span class="feature bad">❌ 无法监听属性添加/删除</span>
            <span class="feature bad">❌ 无法直接监听数组索引和长度</span>
            <span class="feature bad">❌ 需要递归遍历对象</span>
            <span class="feature good">✅ 兼容性好（IE9+）</span>
          </div>
        </div>
        <div class="concept-card">
          <h3>Proxy</h3>
          <p>Vue3 的响应式基础，代理整个对象的所有操作</p>
          <div class="feature-list">
            <span class="feature good">✅ 可监听属性添加/删除</span>
            <span class="feature good">✅ 可直接监听数组变化</span>
            <span class="feature good">✅ 懒代理嵌套对象</span>
            <span class="feature bad">❌ 不支持 IE（无 polyfill）</span>
          </div>
        </div>
      </div>
    </section>

    <!-- 交互式对比演示 -->
    <section class="section">
      <h2>🎯 交互式对比演示</h2>

      <!-- 测试场景选择 -->
      <div class="test-selector">
        <button
          v-for="test in testScenarios"
          :key="test.id"
          :class="['test-btn', { active: activeTest === test.id }]"
          @click="activeTest = test.id"
        >
          {{ test.name }}
        </button>
      </div>

      <div class="demo-container">
        <!-- 场景1: 属性的添加和删除 -->
        <div v-if="activeTest === 'add-delete'" class="test-case">
          <h3>场景1: 属性的添加和删除</h3>
          <div class="test-panels">
            <div class="panel">
              <h4>Object.defineProperty</h4>
              <div class="code-block">
                <pre>{{ definePropertyCode1 }}</pre>
              </div>
              <div class="interactive-area">
                <input v-model="newProp1" placeholder="输入属性名" />
                <input v-model="newValue1" placeholder="输入属性值" />
                <button @click="addPropertyDefine">添加属性</button>
                <button @click="deletePropertyDefine">删除 age</button>
              </div>
              <div class="result-box">
                <div class="result-label">对象状态:</div>
                <pre>{{ JSON.stringify(defineObj, null, 2) }}</pre>
                <div class="result-label">更新日志:</div>
                <div class="log-list">
                  <div v-for="(log, i) in defineLogs" :key="i" :class="['log-item', log.type]">
                    {{ log.message }}
                  </div>
                </div>
              </div>
            </div>

            <div class="panel">
              <h4>Proxy</h4>
              <div class="code-block">
                <pre>{{ proxyCode1 }}</pre>
              </div>
              <div class="interactive-area">
                <input v-model="newProp2" placeholder="输入属性名" />
                <input v-model="newValue2" placeholder="输入属性值" />
                <button @click="addPropertyProxy">添加属性</button>
                <button @click="deletePropertyProxy">删除 age</button>
              </div>
              <div class="result-box">
                <div class="result-label">对象状态:</div>
                <pre>{{ JSON.stringify(proxyObj, null, 2) }}</pre>
                <div class="result-label">更新日志:</div>
                <div class="log-list">
                  <div v-for="(log, i) in proxyLogs" :key="i" :class="['log-item', log.type]">
                    {{ log.message }}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="conclusion">
            <strong>结论:</strong> defineProperty 无法监听新增/删除属性，Vue2 需要 $set/$delete
            方法。Proxy 可以直接监听所有操作。
          </div>
        </div>

        <!-- 场景2: 数组操作 -->
        <div v-if="activeTest === 'array'" class="test-case">
          <h3>场景2: 数组操作</h3>
          <div class="test-panels">
            <div class="panel">
              <h4>Object.defineProperty</h4>
              <div class="code-block">
                <pre>{{ definePropertyCode2 }}</pre>
              </div>
              <div class="interactive-area">
                <input v-model="arrayInput1" placeholder="输入值" />
                <button @click="arrayPushDefine">push</button>
                <button @click="arrayPopDefine">pop</button>
                <button @click="arrayIndexDefine">修改索引[0]</button>
                <button @click="arrayLengthDefine">设置 length = 1</button>
              </div>
              <div class="result-box">
                <div class="result-label">数组状态:</div>
                <pre>{{ JSON.stringify(defineArray, null, 2) }}</pre>
                <div class="result-label">更新日志:</div>
                <div class="log-list">
                  <div v-for="(log, i) in defineArrayLogs" :key="i" :class="['log-item', log.type]">
                    {{ log.message }}
                  </div>
                </div>
              </div>
            </div>

            <div class="panel">
              <h4>Proxy</h4>
              <div class="code-block">
                <pre>{{ proxyCode2 }}</pre>
              </div>
              <div class="interactive-area">
                <input v-model="arrayInput2" placeholder="输入值" />
                <button @click="arrayPushProxy">push</button>
                <button @click="arrayPopProxy">pop</button>
                <button @click="arrayIndexProxy">修改索引[0]</button>
                <button @click="arrayLengthProxy">设置 length = 1</button>
              </div>
              <div class="result-box">
                <div class="result-label">数组状态:</div>
                <pre>{{ JSON.stringify(proxyArray, null, 2) }}</pre>
                <div class="result-label">更新日志:</div>
                <div class="log-list">
                  <div v-for="(log, i) in proxyArrayLogs" :key="i" :class="['log-item', log.type]">
                    {{ log.message }}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="conclusion">
            <strong>结论:</strong> defineProperty 无法监听数组索引和 length 变化，Vue2
            需要重写数组方法。Proxy 可以直接监听所有数组操作。
          </div>
        </div>

        <!-- 场景3: 嵌套对象 -->
        <div v-if="activeTest === 'nested'" class="test-case">
          <h3>场景3: 嵌套对象</h3>
          <div class="test-panels">
            <div class="panel">
              <h4>Object.defineProperty</h4>
              <div class="code-block">
                <pre>{{ definePropertyCode3 }}</pre>
              </div>
              <div class="interactive-area">
                <button @click="updateNestedDefine">修改 user.profile.city</button>
                <button @click="addNestedDefine">添加 user.profile.age</button>
                <button @click="deepNestedDefine">设置新对象到 user.profile</button>
              </div>
              <div class="result-box">
                <div class="result-label">对象状态:</div>
                <pre>{{ JSON.stringify(defineNested, null, 2) }}</pre>
                <div class="result-label">性能统计:</div>
                <div class="performance">初始化递归次数: {{ defineNestedCount }}</div>
                <div class="result-label">更新日志:</div>
                <div class="log-list">
                  <div
                    v-for="(log, i) in defineNestedLogs"
                    :key="i"
                    :class="['log-item', log.type]"
                  >
                    {{ log.message }}
                  </div>
                </div>
              </div>
            </div>

            <div class="panel">
              <h4>Proxy</h4>
              <div class="code-block">
                <pre>{{ proxyCode3 }}</pre>
              </div>
              <div class="interactive-area">
                <button @click="updateNestedProxy">修改 user.profile.city</button>
                <button @click="addNestedProxy">添加 user.profile.age</button>
                <button @click="deepNestedProxy">设置新对象到 user.profile</button>
              </div>
              <div class="result-box">
                <div class="result-label">对象状态:</div>
                <pre>{{ JSON.stringify(proxyNested, null, 2) }}</pre>
                <div class="result-label">性能统计:</div>
                <div class="performance">懒代理，仅在访问时代理: {{ proxyNestedCount }} 次</div>
                <div class="result-label">更新日志:</div>
                <div class="log-list">
                  <div v-for="(log, i) in proxyNestedLogs" :key="i" :class="['log-item', log.type]">
                    {{ log.message }}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="conclusion">
            <strong>结论:</strong> defineProperty 需要递归遍历所有属性，性能开销大。Proxy
            采用懒代理，只在访问时才代理嵌套对象。
          </div>

          <!-- 深入阅读 -->
          <div class="deep-dive">
            <div
              class="deep-dive-header"
              @click="showLazyProxyExplanation = !showLazyProxyExplanation"
            >
              <span class="deep-dive-icon">📖</span>
              <span class="deep-dive-title">深入理解：懒代理（Lazy Proxy）机制</span>
              <span class="deep-dive-arrow" :class="{ expanded: showLazyProxyExplanation }">▼</span>
            </div>
            <transition name="expand">
              <div v-if="showLazyProxyExplanation" class="deep-dive-content">
                <p><strong>什么是懒代理？</strong></p>
                <p>
                  懒代理是指：<strong>只在真正访问到嵌套对象时，才为其创建 Proxy 代理</strong>。
                </p>

                <div class="comparison-box">
                  <div class="comparison-item">
                    <h4>立即代理（defineProperty）</h4>
                    <ul>
                      <li>初始化时递归遍历所有嵌套对象</li>
                      <li>即使永远不访问也会处理</li>
                      <li>深层对象初始化慢</li>
                      <li>内存占用多</li>
                    </ul>
                  </div>
                  <div class="comparison-item">
                    <h4>懒代理（Proxy）</h4>
                    <ul>
                      <li>初始化时只代理最外层对象</li>
                      <li>访问时才创建嵌套对象的代理</li>
                      <li>初始化速度快</li>
                      <li>按需分配内存</li>
                    </ul>
                  </div>
                </div>

                <p><strong>为什么需要 WeakMap 缓存？</strong></p>
                <ul>
                  <li>避免重复创建代理对象</li>
                  <li>保证同一对象返回同一代理</li>
                  <li>不会阻止垃圾回收</li>
                </ul>

                <p><strong>执行流程：</strong></p>
                <div class="flow-steps">
                  <div class="flow-step">1️⃣ 初始化：创建 obj 的代理</div>
                  <div class="flow-step">2️⃣ 访问 obj.user：触发 get，创建 user 代理</div>
                  <div class="flow-step">3️⃣ 访问 .profile：触发 get，创建 profile 代理</div>
                  <div class="flow-step">4️⃣ 修改 .city：触发 set，调用 update()</div>
                </div>

                <div class="tip-box">
                  💡 <strong>关键要点：</strong>懒代理 =
                  延迟创建代理，访问到哪一层就代理哪一层，大幅提升初始化性能！
                </div>
              </div>
            </transition>
          </div>
        </div>

        <!-- 场景4: 性能对比 -->
        <div v-if="activeTest === 'performance'" class="test-case">
          <h3>场景4: 性能对比</h3>
          <div class="performance-test">
            <div class="test-controls">
              <label>
                对象深度:
                <input v-model.number="perfDepth" type="number" min="1" max="5" />
              </label>
              <label>
                每层属性数:
                <input v-model.number="perfProps" type="number" min="1" max="20" />
              </label>
              <button @click="runPerformanceTest">运行性能测试</button>
            </div>
            <div class="perf-results">
              <div class="perf-card">
                <h4>Object.defineProperty</h4>
                <div class="metric">
                  <span>初始化耗时:</span>
                  <strong>{{ perfResults.defineProperty.initTime }} ms</strong>
                </div>
                <div class="metric">
                  <span>递归次数:</span>
                  <strong>{{ perfResults.defineProperty.recursionCount }}</strong>
                </div>
                <div class="metric">
                  <span>修改属性耗时:</span>
                  <strong>{{ perfResults.defineProperty.updateTime }} ms</strong>
                </div>
              </div>
              <div class="perf-card">
                <h4>Proxy</h4>
                <div class="metric">
                  <span>初始化耗时:</span>
                  <strong>{{ perfResults.proxy.initTime }} ms</strong>
                </div>
                <div class="metric">
                  <span>代理次数:</span>
                  <strong>{{ perfResults.proxy.proxyCount }}</strong>
                </div>
                <div class="metric">
                  <span>修改属性耗时:</span>
                  <strong>{{ perfResults.proxy.updateTime }} ms</strong>
                </div>
              </div>
            </div>
            <div class="perf-chart">
              <div class="chart-bar">
                <div class="bar-label">defineProperty 初始化</div>
                <div class="bar-container">
                  <div
                    class="bar bar-define"
                    :style="{
                      width: getBarWidth(perfResults.defineProperty.initTime, maxInitTime),
                    }"
                  ></div>
                  <span class="bar-value">{{ perfResults.defineProperty.initTime }}ms</span>
                </div>
              </div>
              <div class="chart-bar">
                <div class="bar-label">Proxy 初始化</div>
                <div class="bar-container">
                  <div
                    class="bar bar-proxy"
                    :style="{ width: getBarWidth(perfResults.proxy.initTime, maxInitTime) }"
                  ></div>
                  <span class="bar-value">{{ perfResults.proxy.initTime }}ms</span>
                </div>
              </div>
            </div>
          </div>
          <div class="conclusion">
            <strong>结论:</strong> 对于深层嵌套对象，Proxy 的初始化性能明显优于 defineProperty，因为
            Proxy 采用懒代理策略。
          </div>
        </div>
      </div>
    </section>

    <!-- 源码实现 -->
    <section class="section">
      <h2>💻 源码实现</h2>
      <div class="code-comparison">
        <div class="code-panel">
          <h3>Object.defineProperty 实现</h3>
          <div class="code-block large">
            <pre>{{ definePropertyImplementation }}</pre>
          </div>
        </div>
        <div class="code-panel">
          <h3>Proxy 实现</h3>
          <div class="code-block large">
            <pre>{{ proxyImplementation }}</pre>
          </div>
        </div>
      </div>
    </section>

    <!-- 总结 -->
    <section class="section">
      <h2>📝 总结</h2>
      <div class="summary-grid">
        <div class="summary-card">
          <h3>defineProperty 的局限性</h3>
          <ol>
            <li><strong>无法监听属性的添加和删除：</strong>需要 Vue.set/Vue.delete</li>
            <li><strong>无法监听数组索引和长度：</strong>需要重写数组方法</li>
            <li><strong>需要递归遍历：</strong>深层对象初始化性能差</li>
            <li><strong>需要特殊处理嵌套对象：</strong>代码复杂度高</li>
          </ol>
        </div>
        <div class="summary-card">
          <h3>为什么 Vue3 选择 Proxy？</h3>
          <ol>
            <li>
              <strong>更完整的拦截能力：</strong>13种拦截方法，可以监听属性添加/删除、数组索引变化等
            </li>
            <li><strong>更好的性能：</strong>懒代理机制，避免了初始化时的递归遍历</li>
            <li><strong>更简洁的代码：</strong>不需要特殊处理数组，不需要 $set/$delete API</li>
            <li><strong>更好的类型推导：</strong>TypeScript 支持更友好</li>
          </ol>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted } from "vue";

// 测试场景
const testScenarios = [
  { id: "add-delete", name: "属性添加/删除" },
  { id: "array", name: "数组操作" },
  { id: "nested", name: "嵌套对象" },
  { id: "performance", name: "性能对比" },
];

const activeTest = ref("add-delete");
const showLazyProxyExplanation = ref(false);

// ============ 场景1: 属性添加/删除 ============
const defineObj = reactive({ name: "Vue2", age: 14 });
const proxyObj = reactive({ name: "Vue3", age: 5 });
const defineLogs = ref<Array<{ message: string; type: string }>>([]);
const proxyLogs = ref<Array<{ message: string; type: string }>>([]);
const newProp1 = ref("");
const newValue1 = ref("");
const newProp2 = ref("");
const newValue2 = ref("");

// defineProperty 模拟（实际在 reactive 中无法完美模拟其局限性，这里用日志说明）
const addPropertyDefine = () => {
  const prop = newProp1.value || "gender";
  const val = newValue1.value || "unknown";
  (defineObj as any)[prop] = val;
  defineLogs.value.push({
    message: `⚠️ 添加属性 ${prop}=${val}，但 defineProperty 无法监听到！Vue2 需要使用 Vue.set()`,
    type: "warning",
  });
  newProp1.value = "";
  newValue1.value = "";
};

const deletePropertyDefine = () => {
  delete (defineObj as any).age;
  defineLogs.value.push({
    message: "⚠️ 删除属性 age，但 defineProperty 无法监听到！Vue2 需要使用 Vue.delete()",
    type: "warning",
  });
};

// Proxy 实现
const addPropertyProxy = () => {
  const prop = newProp2.value || "gender";
  const val = newValue2.value || "unknown";
  (proxyObj as any)[prop] = val;
  proxyLogs.value.push({
    message: `✅ 添加属性 ${prop}=${val}，Proxy 成功监听到！`,
    type: "success",
  });
  newProp2.value = "";
  newValue2.value = "";
};

const deletePropertyProxy = () => {
  delete (proxyObj as any).age;
  proxyLogs.value.push({
    message: "✅ 删除属性 age，Proxy 成功监听到！",
    type: "success",
  });
};

// ============ 场景2: 数组操作 ============
const defineArray = reactive([1, 2, 3]);
const proxyArray = reactive([1, 2, 3]);
const defineArrayLogs = ref<Array<{ message: string; type: string }>>([]);
const proxyArrayLogs = ref<Array<{ message: string; type: string }>>([]);
const arrayInput1 = ref("");
const arrayInput2 = ref("");

const arrayPushDefine = () => {
  const val = arrayInput1.value || 4;
  (defineArray as any).push(Number(val));
  defineArrayLogs.value.push({
    message: `⚠️ push(${val}) - Vue2 需要重写数组方法才能监听`,
    type: "warning",
  });
  arrayInput1.value = "";
};

const arrayPopDefine = () => {
  (defineArray as any).pop();
  defineArrayLogs.value.push({
    message: "⚠️ pop() - Vue2 需要重写数组方法才能监听",
    type: "warning",
  });
};

const arrayIndexDefine = () => {
  defineArray[0] = 999;
  defineArrayLogs.value.push({
    message: "⚠️ 直接修改索引 [0]=999，defineProperty 无法监听！",
    type: "warning",
  });
};

const arrayLengthDefine = () => {
  (defineArray as any).length = 1;
  defineArrayLogs.value.push({
    message: "⚠️ 修改 length=1，defineProperty 无法监听！",
    type: "warning",
  });
};

const arrayPushProxy = () => {
  const val = arrayInput2.value || 4;
  (proxyArray as any).push(Number(val));
  proxyArrayLogs.value.push({
    message: `✅ push(${val}) - Proxy 直接监听！`,
    type: "success",
  });
  arrayInput2.value = "";
};

const arrayPopProxy = () => {
  (proxyArray as any).pop();
  proxyArrayLogs.value.push({
    message: "✅ pop() - Proxy 直接监听！",
    type: "success",
  });
};

const arrayIndexProxy = () => {
  proxyArray[0] = 999;
  proxyArrayLogs.value.push({
    message: "✅ 直接修改索引 [0]=999，Proxy 成功监听！",
    type: "success",
  });
};

const arrayLengthProxy = () => {
  (proxyArray as any).length = 1;
  proxyArrayLogs.value.push({
    message: "✅ 修改 length=1，Proxy 成功监听！",
    type: "success",
  });
};

// ============ 场景3: 嵌套对象 ============
const defineNested = reactive({
  user: {
    name: "Vue2",
    profile: {
      city: "Beijing",
    },
  },
});

const proxyNested = reactive({
  user: {
    name: "Vue3",
    profile: {
      city: "Shanghai",
    },
  },
});

const defineNestedLogs = ref<Array<{ message: string; type: string }>>([]);
const proxyNestedLogs = ref<Array<{ message: string; type: string }>>([]);
const defineNestedCount = ref(3); // 模拟递归次数
const proxyNestedCount = ref(0);

const updateNestedDefine = () => {
  defineNested.user.profile.city = "Shenzhen";
  defineNestedLogs.value.push({
    message: '✅ 修改 user.profile.city = "Shenzhen" (已存在的属性可以监听)',
    type: "success",
  });
};

const addNestedDefine = () => {
  (defineNested.user.profile as any).age = 25;
  defineNestedLogs.value.push({
    message: "⚠️ 添加 user.profile.age = 25，但 defineProperty 无法监听深层新增属性！",
    type: "warning",
  });
};

const deepNestedDefine = () => {
  defineNested.user.profile = { city: "Guangzhou", country: "China" } as any;
  defineNestedCount.value += 2; // 新对象需要重新递归
  defineNestedLogs.value.push({
    message: "⚠️ 设置新对象需要在 setter 中递归处理，性能开销大",
    type: "warning",
  });
};

const updateNestedProxy = () => {
  proxyNested.user.profile.city = "Shenzhen";
  proxyNestedCount.value += 1;
  proxyNestedLogs.value.push({
    message: '✅ 修改 user.profile.city = "Shenzhen"，懒代理自动处理',
    type: "success",
  });
};

const addNestedProxy = () => {
  (proxyNested.user.profile as any).age = 25;
  proxyNestedCount.value += 1;
  proxyNestedLogs.value.push({
    message: "✅ 添加 user.profile.age = 25，Proxy 完美支持！",
    type: "success",
  });
};

const deepNestedProxy = () => {
  proxyNested.user.profile = { city: "Guangzhou", country: "China" } as any;
  proxyNestedLogs.value.push({
    message: "✅ 设置新对象，Proxy 懒代理，仅在访问时才代理",
    type: "success",
  });
};

// ============ 场景4: 性能测试 ============
const perfDepth = ref(3);
const perfProps = ref(5);
const perfResults = reactive({
  defineProperty: {
    initTime: 0,
    recursionCount: 0,
    updateTime: 0,
  },
  proxy: {
    initTime: 0,
    proxyCount: 0,
    updateTime: 0,
  },
});

const maxInitTime = computed(() =>
  Math.max(perfResults.defineProperty.initTime, perfResults.proxy.initTime)
);

const getBarWidth = (value: number, max: number) => {
  if (max === 0) return "0%";
  return `${(value / max) * 100}%`;
};

// 创建深层对象
const createDeepObject = (depth: number, propsPerLevel: number): any => {
  if (depth === 0) return "leaf";
  const obj: any = {};
  for (let i = 0; i < propsPerLevel; i++) {
    obj[`prop${i}`] = depth > 1 ? createDeepObject(depth - 1, propsPerLevel) : `value${i}`;
  }
  return obj;
};

// 模拟 defineProperty 实现
const definePropertyReactive = (obj: any, callback: () => void): number => {
  let count = 0;
  const observe = (target: any) => {
    if (typeof target !== "object" || target === null) return;
    Object.keys(target).forEach((key) => {
      count++;
      let value = target[key];
      observe(value); // 递归
      Object.defineProperty(target, key, {
        get() {
          return value;
        },
        set(newVal) {
          if (newVal !== value) {
            value = newVal;
            observe(newVal); // 新值也要递归
            callback();
          }
        },
      });
    });
  };
  observe(obj);
  return count;
};

// 模拟 Proxy 实现
const proxyReactive = (obj: any, callback: () => void): number => {
  let count = 0;
  const reactiveMap = new WeakMap();

  const toReactive = (target: any): any => {
    if (typeof target !== "object" || target === null) return target;
    if (reactiveMap.has(target)) return reactiveMap.get(target);

    count++;
    const proxy = new Proxy(target, {
      get(obj, key) {
        const res = Reflect.get(obj, key);
        // 懒代理：只在访问时才代理嵌套对象
        return typeof res === "object" && res !== null ? toReactive(res) : res;
      },
      set(obj, key, value) {
        const result = Reflect.set(obj, key, value);
        callback();
        return result;
      },
    });

    reactiveMap.set(target, proxy);
    return proxy;
  };

  toReactive(obj); // 创建初始代理
  return count;
};

const runPerformanceTest = () => {
  const testObj1 = createDeepObject(perfDepth.value, perfProps.value);
  const testObj2 = createDeepObject(perfDepth.value, perfProps.value);

  // 测试 defineProperty
  const defineStart = performance.now();
  const defineCount = definePropertyReactive(testObj1, () => {});
  const defineEnd = performance.now();
  perfResults.defineProperty.initTime = Number((defineEnd - defineStart).toFixed(2));
  perfResults.defineProperty.recursionCount = defineCount;

  // 测试 Proxy
  const proxyStart = performance.now();
  const proxyCount = proxyReactive(testObj2, () => {});
  const proxyEnd = performance.now();
  perfResults.proxy.initTime = Number((proxyEnd - proxyStart).toFixed(2));
  perfResults.proxy.proxyCount = proxyCount;

  // 测试修改性能（简化）
  const defineUpdateStart = performance.now();
  testObj1.prop0 = "updated";
  const defineUpdateEnd = performance.now();
  perfResults.defineProperty.updateTime = Number((defineUpdateEnd - defineUpdateStart).toFixed(4));

  const proxyUpdateStart = performance.now();
  testObj2.prop0 = "updated";
  const proxyUpdateEnd = performance.now();
  perfResults.proxy.updateTime = Number((proxyUpdateEnd - proxyUpdateStart).toFixed(4));
};

// ============ 代码示例 ============
const definePropertyCode1 = `const obj = { name: 'Vue2', age: 14 }
function update() {
  console.log('数据更新')
}

Object.keys(obj).forEach(key => {
  let value = obj[key]
  Object.defineProperty(obj, key, {
    get() { return value },
    set(newVal) {
      value = newVal
      update()
    }
  })
})

// 已有属性可以监听
obj.name = 'Vue' // ✅ 触发更新

// 新增属性无法监听
obj.gender = 'unknown' // ❌ 不触发更新

// 删除属性无法监听
delete obj.age // ❌ 不触发更新`;

const proxyCode1 = `const obj = { name: 'Vue3', age: 5 }
function update() {
  console.log('数据更新')
}

const proxyObj = new Proxy(obj, {
  get(target, key) {
    return Reflect.get(target, key)
  },
  set(target, key, value) {
    const result = Reflect.set(target, key, value)
    update()
    return result
  },
  deleteProperty(target, key) {
    const result = Reflect.deleteProperty(target, key)
    update()
    return result
  }
})

// 所有操作都可以监听
proxyObj.name = 'Vue' // ✅ 触发更新
proxyObj.gender = 'unknown' // ✅ 触发更新
delete proxyObj.age // ✅ 触发更新`;

const definePropertyCode2 = `const arr = [1, 2, 3]

// 可以为已存在的索引定义 defineProperty
arr.forEach((val, index) => {
  Object.defineProperty(arr, index, {
    get() { return val },
    set(newVal) {
      val = newVal
      console.log('索引', index, '更新为:', newVal)
    }
  })
})

arr[0] = 10 // ✅ 可以监听（如果提前定义了）

// 但是问题来了：
arr.push(4) // ❌ 新增的索引没有 getter/setter
arr[3] = 5  // ❌ 新索引无法监听

// length 属性无法正常监听
arr.length = 1 // ❌ 会改变数组，但监听不到

// Vue2 的困境：
// 1. 为所有索引定义 defineProperty？性能差
// 2. 数组长度是动态的，无法预知
// 3. 每次 push/splice 后要重新定义？太复杂

// Vue2 的解决方案：重写数组方法
const arrayProto = Array.prototype
const arrayMethods = Object.create(arrayProto)

['push', 'pop', 'shift', 'unshift', 
 'splice', 'sort', 'reverse'].forEach(method => {
  arrayMethods[method] = function(...args) {
    const result = arrayProto[method].apply(this, args)
    console.log('数组变更:', method)
    return result
  }
})

arr.__proto__ = arrayMethods
arr.push(6) // ✅ 通过重写方法可以监听`;

const proxyCode2 = `const arr = [1, 2, 3]

const proxyArr = new Proxy(arr, {
  get(target, key) {
    return Reflect.get(target, key)
  },
  set(target, key, value) {
    const result = Reflect.set(target, key, value)
    console.log(\`数组更新: [\${key}] = \${value}\`)
    return result
  }
})

// 所有操作都可以直接监听
proxyArr[0] = 10 // ✅ 触发更新
proxyArr.length = 1 // ✅ 触发更新
proxyArr.push(4) // ✅ 触发更新
proxyArr.pop() // ✅ 触发更新`;

const definePropertyCode3 = `const obj = {
  user: {
    name: 'Vue2',
    profile: { 
      city: 'Beijing' 
      // 注意：初始化时没有 age 属性
    }
  }
}

const update = () => {
  console.log('对象属性或嵌套属性发生了变化');
}

// 需要递归遍历所有属性
function observe(obj) {
  if (typeof obj !== 'object') return
  
  Object.keys(obj).forEach(key => {
    let value = obj[key]
    observe(value) // 递归处理嵌套对象
    
    Object.defineProperty(obj, key, {
      get() { return value },
      set(newVal) {
        value = newVal
        observe(newVal) // 新值也要递归
        update()
      }
    })
  })
}

observe(obj) // 初始化：为 user、name、profile、city 添加响应式

// 问题演示：
obj.user.profile.city = 'Shanghai' // ✅ 可以监听（已存在的属性）
obj.user.profile.age = 25 // ❌ 无法监听（新增的属性没有 getter/setter）

// 为什么？因为 observe 只处理了初始化时存在的属性
// age 是后来添加的，从未被 defineProperty 处理过！`;

const proxyCode3 = `const obj = {
  user: {
    name: 'Vue3',
    profile: { city: 'Shanghai' }
  }
}
const update = () => {
  console.log('对象属性或嵌套属性发生了变化');
}

// 懒代理的正确实现：需要缓存已代理的对象
const proxyMap = new WeakMap() // 缓存代理对象

function reactive(obj) {
  // 如果已经代理过，直接返回缓存的代理
  if (proxyMap.has(obj)) {
    return proxyMap.get(obj)
  }
  
  const proxy = new Proxy(obj, {
    get(target, key) {
      const res = Reflect.get(target, key)
      // 懒代理：只在访问时才代理嵌套对象
      if (typeof res === 'object' && res !== null) {
        return reactive(res) // 递归代理
      }
      return res
    },
    set(target, key, value) {
      const result = Reflect.set(target, key, value)
      update() // 任何层级的修改都会触发更新
      return result
    }
  })
  
  // 缓存代理对象
  proxyMap.set(obj, proxy)
  return proxy
}

const proxyObj = reactive(obj) // 初始化很快，只代理最外层

// 懒代理的含义：
// 1. 初始化时只代理 obj 本身（1次 Proxy）
// 2. 访问 proxyObj.user 时，才代理 user 对象（第2次 Proxy）
// 3. 访问 proxyObj.user.profile 时，才代理 profile（第3次 Proxy）
// 4. 修改 proxyObj.user.profile.city 时，触发 profile 的 set ✅

// 测试：
proxyObj.user.profile.city = 'Beijing' // ✅ 调用 update()
proxyObj.user.newProp = 'value' // ✅ 调用 update()（新属性也能监听！）`;

const definePropertyImplementation = `// Vue2 响应式简化实现
function defineReactive(obj, key, val) {
  // 递归处理嵌套对象
  observe(val)
  
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get() {
      // 依赖收集
      console.log(\`获取 \${key}: \${val}\`)
      return val
    },
    set(newVal) {
      if (newVal === val) return
      
      // 新值如果是对象，也要递归处理
      observe(newVal)
      
      console.log(\`设置 \${key}: \${newVal}\`)
      val = newVal
      
      // 触发更新
      notify()
    }
  })
}

function observe(obj) {
  if (typeof obj !== 'object' || obj === null) {
    return
  }
  
  // 遍历对象的所有属性
  Object.keys(obj).forEach(key => {
    defineReactive(obj, key, obj[key])
  })
}

// 使用
const data = { 
  name: 'Vue2',
  nested: { count: 0 }
}
observe(data)

// 局限性详解：
// 1. 无法监听新增属性
data.age = 18 // ❌ 无法监听
// 原因：observe 只在初始化时为已存在的属性添加 getter/setter
// age 是后来添加的，从未被 defineProperty 处理过
// 解决：需要使用 Vue.set(data, 'age', 18)

// 2. 无法监听删除属性
delete data.name // ❌ 无法监听
// 原因：defineProperty 只能拦截属性的读取和设置，无法拦截删除操作
// 解决：需要使用 Vue.delete(data, 'name')

// 3. 嵌套对象的新增属性也无法监听
data.nested.newProp = 'value' // ❌ 无法监听
// 原因：虽然 nested 对象本身是响应式的，但 newProp 是新增的属性
// observe 初始化时并没有处理 newProp

// 4. 数组问题
const arr = [1, 2, 3]
observe(arr)
arr[0] = 10 // ❌ 无法监听（Vue2 不为数组索引添加 getter/setter）
arr.length = 0 // ❌ 无法监听（length 属性无法正常拦截）
arr.push(4) // ❌ 无法监听（需要重写数组方法）`;

const proxyImplementation = `// Vue3 响应式简化实现
function reactive(obj) {
  if (typeof obj !== 'object' || obj === null) {
    return obj
  }
  
  return new Proxy(obj, {
    // 拦截属性读取
    get(target, key, receiver) {
      console.log(\`获取属性: \${String(key)}\`)
      
      const res = Reflect.get(target, key, receiver)
      
      // 懒代理：只在访问时才代理嵌套对象
      if (typeof res === 'object' && res !== null) {
        return reactive(res)
      }
      
      // 依赖收集
      track(target, key)
      
      return res
    },
    
    // 拦截属性设置
    set(target, key, value, receiver) {
      const oldValue = target[key]
      const result = Reflect.set(target, key, value, receiver)
      
      // 触发更新
      if (oldValue !== value) {
        console.log(\`设置属性: \${String(key)} = \${value}\`)
        trigger(target, key)
      }
      
      return result
    },
    
    // 拦截属性删除
    deleteProperty(target, key) {
      const hadKey = Object.prototype.hasOwnProperty.call(target, key)
      const result = Reflect.deleteProperty(target, key)
      
      if (hadKey && result) {
        console.log(\`删除属性: \${String(key)}\`)
        trigger(target, key)
      }
      
      return result
    },
    
    // 还支持更多拦截操作：
    // has, ownKeys, getPrototypeOf, setPrototypeOf 等
  })
}

// 使用
const state = reactive({
  name: 'Vue3',
  nested: { count: 0 }
})

// 所有操作都可以监听
state.age = 5 // ✅ 可以监听
delete state.name // ✅ 可以监听
state.nested.count++ // ✅ 可以监听

// 数组操作
const arr = reactive([1, 2, 3])
arr[0] = 10 // ✅ 可以监听
arr.length = 0 // ✅ 可以监听
arr.push(4) // ✅ 可以监听

function track(target, key) {
  // 依赖收集逻辑
}

function trigger(target, key) {
  // 触发更新逻辑
}`;

// 初始化时运行一次性能测试
onMounted(() => {
  runPerformanceTest();
});
</script>

<style scoped>
.proxy-demo-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 20px;
  background: #f5f7fa;
  min-height: 100vh;
}

.back-button {
  display: inline-flex;
  align-items: center;
  padding: 10px 20px;
  background: white;
  border-radius: 8px;
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
  transition: all 0.3s;
}

.back-button:hover {
  background: #42b983;
  color: white;
  transform: translateX(-5px);
}

.page-header {
  text-align: center;
  margin-bottom: 50px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 40px 20px;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
}

.page-header h1 {
  font-size: 2.5rem;
  margin-bottom: 10px;
}

.subtitle {
  font-size: 1.1rem;
  opacity: 0.9;
}

.section {
  background: white;
  border-radius: 12px;
  padding: 30px;
  margin-bottom: 30px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.section h2 {
  font-size: 1.8rem;
  color: #2c3e50;
  margin-bottom: 25px;
  padding-bottom: 10px;
  border-bottom: 3px solid #42b983;
}

/* 概念卡片 */
.concept-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
}

.concept-card {
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  padding: 25px;
  border-radius: 10px;
  border-left: 5px solid #42b983;
}

.concept-card h3 {
  color: #2c3e50;
  margin-bottom: 10px;
  font-size: 1.4rem;
}

.concept-card p {
  color: #666;
  margin-bottom: 15px;
  line-height: 1.6;
}

.feature-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.feature {
  padding: 8px 12px;
  border-radius: 6px;
  font-size: 0.9rem;
}

.feature.good {
  background: #d4edda;
  color: #155724;
}

.feature.bad {
  background: #fff3cd;
  color: #856404;
}

/* 测试选择器 */
.test-selector {
  display: flex;
  gap: 10px;
  margin-bottom: 25px;
  flex-wrap: wrap;
}

.test-btn {
  padding: 12px 24px;
  border: 2px solid #ddd;
  background: white;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s;
  font-size: 1rem;
  font-weight: 500;
}

.test-btn:hover {
  border-color: #42b983;
  transform: translateY(-2px);
}

.test-btn.active {
  background: #42b983;
  color: white;
  border-color: #42b983;
}

/* 测试面板 */
.test-case {
  margin-top: 20px;
}

.test-case h3 {
  color: #2c3e50;
  margin-bottom: 20px;
  font-size: 1.5rem;
}

.test-panels {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  margin-bottom: 20px;
}

.panel {
  background: #f8f9fa;
  padding: 20px;
  border-radius: 10px;
  border: 2px solid #e9ecef;
}

.panel h4 {
  color: #495057;
  margin-bottom: 15px;
  font-size: 1.2rem;
  padding-bottom: 10px;
  border-bottom: 2px solid #dee2e6;
}

.code-block {
  background: #282c34;
  color: #abb2bf;
  padding: 15px;
  border-radius: 8px;
  margin-bottom: 15px;
  overflow-x: auto;
  font-family: "Consolas", "Monaco", monospace;
  font-size: 0.85rem;
  line-height: 1.5;
}

.code-block.large {
  font-size: 0.9rem;
  padding: 20px;
}

.code-block pre {
  margin: 0;
  white-space: pre-wrap;
  word-break: break-word;
}

.interactive-area {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 15px;
}

.interactive-area input {
  flex: 1;
  min-width: 100px;
  padding: 8px 12px;
  border: 2px solid #ddd;
  border-radius: 6px;
  font-size: 0.9rem;
}

.interactive-area button {
  padding: 8px 16px;
  background: #42b983;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: all 0.3s;
}

.interactive-area button:hover {
  background: #369970;
  transform: scale(1.05);
}

.result-box {
  background: white;
  padding: 15px;
  border-radius: 8px;
  border: 2px solid #e9ecef;
}

.result-label {
  font-weight: 600;
  color: #495057;
  margin-bottom: 8px;
  margin-top: 10px;
}

.result-label:first-child {
  margin-top: 0;
}

.result-box pre {
  background: #f8f9fa;
  padding: 10px;
  border-radius: 6px;
  font-size: 0.85rem;
  overflow-x: auto;
  font-family: "Consolas", "Monaco", monospace;
}

.log-list {
  max-height: 200px;
  overflow-y: auto;
}

.log-item {
  padding: 8px 12px;
  margin-bottom: 6px;
  border-radius: 6px;
  font-size: 0.85rem;
  line-height: 1.4;
}

.log-item.success {
  background: #d4edda;
  color: #155724;
  border-left: 4px solid #28a745;
}

.log-item.warning {
  background: #fff3cd;
  color: #856404;
  border-left: 4px solid #ffc107;
}

.conclusion {
  background: #e7f3ff;
  padding: 15px 20px;
  border-radius: 8px;
  border-left: 5px solid #2196f3;
  font-size: 0.95rem;
  line-height: 1.6;
}

.conclusion strong {
  color: #0d47a1;
}

/* 深入阅读 */
.deep-dive {
  margin-top: 20px;
  border: 2px solid #667eea;
  border-radius: 12px;
  overflow: hidden;
  background: white;
}

.deep-dive-header {
  display: flex;
  align-items: center;
  padding: 15px 20px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  cursor: pointer;
  transition: all 0.3s;
  user-select: none;
}

.deep-dive-header:hover {
  background: linear-gradient(135deg, #5568d3 0%, #653a8a 100%);
}

.deep-dive-icon {
  font-size: 1.5rem;
  margin-right: 12px;
}

.deep-dive-title {
  flex: 1;
  font-size: 1.1rem;
  font-weight: 600;
}

.deep-dive-arrow {
  font-size: 0.8rem;
  transition: transform 0.3s;
}

.deep-dive-arrow.expanded {
  transform: rotate(180deg);
}

.deep-dive-content {
  padding: 25px;
  background: #f8f9fa;
  line-height: 1.8;
}

.deep-dive-content p {
  margin-bottom: 15px;
  color: #2c3e50;
}

.deep-dive-content ul {
  margin: 10px 0 20px 20px;
  color: #495057;
}

.deep-dive-content li {
  margin-bottom: 8px;
}

.comparison-box {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 15px;
  margin: 20px 0;
}

.comparison-item {
  background: white;
  padding: 15px;
  border-radius: 8px;
  border-left: 4px solid #667eea;
}

.comparison-item h4 {
  color: #667eea;
  margin-bottom: 12px;
  font-size: 1rem;
}

.comparison-item ul {
  margin: 0;
  padding-left: 20px;
}

.comparison-item li {
  font-size: 0.9rem;
  margin-bottom: 6px;
}

.flow-steps {
  background: white;
  padding: 20px;
  border-radius: 8px;
  margin: 15px 0;
}

.flow-step {
  padding: 10px 15px;
  margin-bottom: 10px;
  background: linear-gradient(90deg, #e3f2fd 0%, #bbdefb 100%);
  border-left: 4px solid #2196f3;
  border-radius: 6px;
  font-size: 0.95rem;
  color: #0d47a1;
}

.flow-step:last-child {
  margin-bottom: 0;
}

.tip-box {
  background: linear-gradient(135deg, #fff3cd 0%, #ffeaa7 100%);
  padding: 15px 20px;
  border-radius: 8px;
  border-left: 5px solid #ffc107;
  margin-top: 20px;
  color: #856404;
  font-size: 0.95rem;
}

/* 展开动画 */
.expand-enter-active,
.expand-leave-active {
  transition: all 0.3s ease;
  max-height: 2000px;
  overflow: hidden;
}

.expand-enter-from,
.expand-leave-to {
  max-height: 0;
  opacity: 0;
}

/* 性能测试 */
.performance-test {
  margin-top: 20px;
}

.test-controls {
  display: flex;
  gap: 20px;
  align-items: center;
  margin-bottom: 25px;
  padding: 20px;
  background: #f8f9fa;
  border-radius: 8px;
}

.test-controls label {
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 500;
}

.test-controls input[type="number"] {
  width: 80px;
  padding: 8px;
  border: 2px solid #ddd;
  border-radius: 6px;
}

.test-controls button {
  padding: 10px 24px;
  background: #667eea;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s;
}

.test-controls button:hover {
  background: #5568d3;
  transform: translateY(-2px);
}

.perf-results {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  margin-bottom: 30px;
}

.perf-card {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 25px;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
}

.perf-card h4 {
  font-size: 1.3rem;
  margin-bottom: 20px;
  border-bottom: 2px solid rgba(255, 255, 255, 0.3);
  padding-bottom: 10px;
}

.metric {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
}

.metric:last-child {
  border-bottom: none;
}

.metric strong {
  font-size: 1.2rem;
}

.perf-chart {
  background: white;
  padding: 25px;
  border-radius: 12px;
  border: 2px solid #e9ecef;
}

.chart-bar {
  margin-bottom: 20px;
}

.bar-label {
  font-weight: 600;
  color: #495057;
  margin-bottom: 8px;
}

.bar-container {
  display: flex;
  align-items: center;
  gap: 10px;
}

.bar {
  height: 30px;
  border-radius: 6px;
  transition: width 0.5s ease;
  min-width: 2px;
}

.bar-define {
  background: linear-gradient(90deg, #ff6b6b, #ee5a6f);
}

.bar-proxy {
  background: linear-gradient(90deg, #42b983, #2ecc71);
}

.bar-value {
  font-weight: 600;
  color: #495057;
  min-width: 60px;
}

.performance {
  background: #f8f9fa;
  padding: 10px;
  border-radius: 6px;
  font-size: 0.9rem;
  color: #495057;
}

/* 代码对比 */
.code-comparison {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
}

.code-panel h3 {
  color: #2c3e50;
  margin-bottom: 15px;
  font-size: 1.2rem;
}

/* 总结 */
.summary-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 25px;
}

.summary-card {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
}

.summary-card h3 {
  font-size: 1.4rem;
  margin-bottom: 20px;
  border-bottom: 2px solid rgba(255, 255, 255, 0.5);
  padding-bottom: 10px;
}

.summary-card ol {
  padding-left: 20px;
}

.summary-card li {
  margin-bottom: 15px;
  line-height: 1.6;
}

.summary-card strong {
  font-weight: 700;
}

/* 响应式 */
@media (max-width: 1200px) {
  .test-panels,
  .concept-grid,
  .code-comparison,
  .summary-grid,
  .comparison-box {
    grid-template-columns: 1fr;
  }

  .perf-results {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .proxy-demo-container {
    padding: 10px;
  }

  .page-header h1 {
    font-size: 1.8rem;
  }

  .section {
    padding: 20px;
  }
}
</style>
