<template>
  <div class="data-test">
    <h1>Vue2 Data 属性测试</h1>

    <!-- 理论说明 -->
    <section class="theory-section">
      <h2>为什么 Vue2 建议 data 属性是一个函数？</h2>
      <div class="explanation">
        <p>
          <strong>问题：</strong>当 data 是一个对象时，所有组件实例会共享同一个 data 对象的引用。
        </p>
        <p>
          <strong>后果：</strong>一个组件修改了 data，其他组件也会受到影响，违反组件数据隔离原则。
        </p>
        <p>
          <strong>解决方案：</strong>当 data
          是一个函数时，每次创建组件实例都会调用这个函数，返回新的数据对象。
        </p>
      </div>
    </section>

    <!-- 测试用例1：data 是对象的问题演示 -->
    <section class="test-section">
      <h2>测试用例1：Data 是对象的问题演示</h2>
      <div class="problem-demo">
        <p>
          <strong>问题描述：</strong>使用错误的 data 对象方式，所有组件实例会共享同一个 data 对象
        </p>
        <p><strong>预期结果：</strong>点击任意一个实例的按钮，所有实例的计数都会同步变化！</p>

        <div class="counter-instances">
          <CounterWrong title="计数器实例 A" />
          <CounterWrong title="计数器实例 B" />
          <CounterWrong title="计数器实例 C" />
        </div>

        <div class="observation">
          <p><strong>观察结果：</strong>点击任意一个实例的按钮，所有实例的计数都会同步变化！</p>
          <p><strong>原因：</strong>这三个组件实例共享同一个 data 对象引用</p>
          <p><strong>注意：</strong>每个实例的ID都相同，并且count数据是共享的</p>
        </div>
      </div>
    </section>

    <!-- 测试用例2：data 是函数的正确用法 -->
    <section class="test-section">
      <h2>测试用例2：Data 是函数的正确用法</h2>
      <div class="solution-demo">
        <p><strong>解决方案：</strong>使用正确的 data 函数方式，每个组件实例获得独立的数据副本</p>
        <p><strong>预期结果：</strong>每个实例的计数都是独立的，互不影响</p>

        <div class="counter-instances">
          <CounterCorrect title="计数器实例 X" />
          <CounterCorrect title="计数器实例 Y" />
          <CounterCorrect title="计数器实例 Z" />
        </div>

        <div class="observation">
          <p><strong>观察结果：</strong>每个实例的计数都是独立的，互不影响！</p>
          <p><strong>原因：</strong>每个实例都有自己独立的数据副本</p>
          <p><strong>注意：</strong>每个实例的ID和count数据都是独立的</p>
        </div>
      </div>
    </section>

    <!-- 测试用例3：动态创建组件实例 -->
    <section class="test-section">
      <h2>测试用例3：动态创建组件实例</h2>
      <div class="dynamic-demo">
        <div class="control-buttons">
          <button @click="addWrongInstance" class="btn btn-danger">添加错误组件实例</button>
          <button @click="addCorrectInstance" class="btn btn-success">添加正确组件实例</button>
          <button @click="clearInstances" class="btn btn-warning">清空所有实例</button>
        </div>

        <div class="dynamic-instances">
          <div class="instance-group">
            <h3>错误用法组件实例（Data 是对象）</h3>
            <div class="instances-grid">
              <CounterWrong
                v-for="(instance, index) in wrongInstances"
                :key="`wrong-${index}`"
                :title="`动态实例 ${index + 1}`"
              />
            </div>
          </div>

          <div class="instance-group">
            <h3>正确用法组件实例（Data 是函数）</h3>
            <div class="instances-grid">
              <CounterCorrect
                v-for="(instance, index) in correctInstances"
                :key="`correct-${index}`"
                :title="`动态实例 ${index + 1}`"
              />
            </div>
          </div>
        </div>

        <div class="observation">
          <p><strong>测试说明：</strong></p>
          <ul>
            <li>点击"添加错误组件实例"按钮，会创建使用错误data方式的组件</li>
            <li>点击"添加正确组件实例"按钮，会创建使用正确data方式的组件</li>
            <li>观察两种方式的区别：错误方式会共享数据，正确方式数据独立</li>
          </ul>
        </div>
      </div>
    </section>

    <!-- 代码示例 -->
    <section class="test-section">
      <h2>代码对比</h2>
      <div class="code-comparison">
        <div class="code-block">
          <h3>❌ 错误用法（Data 是对象）</h3>
          <pre><code>export default {
  name: 'CounterWrong',
  data: {
    count: 0,  // 所有实例共享这个对象
    instanceId: Date.now() + Math.random()
  }
}</code></pre>
          <p class="code-note">问题：所有组件实例共享同一个data对象引用</p>
        </div>

        <div class="code-block">
          <h3>✅ 正确用法（Data 是函数）</h3>
          <pre><code>export default {
  name: 'CounterCorrect',
  data() {
    return {
      count: 0,  // 每个实例获得独立副本
      instanceId: Date.now() + Math.random()
    }
  }
}</code></pre>
          <p class="code-note">优势：每个组件实例都有独立的数据副本</p>
        </div>
      </div>
    </section>

    <!-- 总结 -->
    <section class="test-section">
      <h2>总结</h2>
      <div class="summary">
        <h3>关键差异</h3>
        <ul>
          <li>
            <strong>Data 是对象：</strong>所有组件实例共享同一个数据对象，修改一个会影响所有实例
          </li>
          <li>
            <strong>Data 是函数：</strong>每个组件实例调用函数获得独立的数据副本，实例间数据完全隔离
          </li>
        </ul>

        <h3>实际应用场景</h3>
        <ul>
          <li><strong>错误用法场景：</strong>会导致组件间数据污染，难以调试和维护</li>
          <li><strong>正确用法场景：</strong>确保组件数据隔离，符合Vue组件化设计原则</li>
        </ul>

        <h3>Vue3 的变化</h3>
        <p>
          在Vue3中，data属性仍然建议使用函数形式，但引入了Composition
          API，提供了更灵活的状态管理方式。
        </p>
      </div>
    </section>
  </div>
</template>

<script>
import CounterWrong from "@/components/CounterWrong.vue";
import CounterCorrect from "@/components/CounterCorrect.vue";

export default {
  name: "DataTest",
  components: {
    CounterWrong,
    CounterCorrect,
  },
  data() {
    return {
      // 动态创建的组件实例
      wrongInstances: [],
      correctInstances: [],
    };
  },
  methods: {
    addWrongInstance() {
      this.wrongInstances.push({ id: Date.now() });
    },

    addCorrectInstance() {
      this.correctInstances.push({ id: Date.now() });
    },

    clearInstances() {
      this.wrongInstances = [];
      this.correctInstances = [];
    },
  },
};
</script>

<style scoped>
.data-test {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

h1 {
  color: #42b983;
  text-align: center;
  margin-bottom: 30px;
}

.theory-section {
  background: #f8f9fa;
  border-left: 4px solid #42b983;
  padding: 20px;
  margin-bottom: 30px;
  border-radius: 4px;
}

.explanation p {
  margin: 10px 0;
  line-height: 1.6;
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

h3 {
  color: #34495e;
  margin-bottom: 15px;
}

.counter-instances {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  margin: 20px 0;
}

.control-buttons {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
  flex-wrap: wrap;
}

.btn {
  padding: 10px 20px;
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

.btn-danger {
  background: #dc3545;
  color: white;
}
.btn-success {
  background: #28a745;
  color: white;
}
.btn-warning {
  background: #ffc107;
  color: #212529;
}

.instance-group {
  margin-bottom: 30px;
}

.instance-group h3 {
  color: #2c3e50;
  border-bottom: 1px solid #ddd;
  padding-bottom: 10px;
  margin-bottom: 20px;
}

.instances-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 15px;
}

.observation {
  background: #fff3cd;
  border: 1px solid #ffeaa7;
  border-radius: 4px;
  padding: 15px;
  margin-top: 20px;
}

.observation p {
  margin: 5px 0;
  color: #856404;
}

.observation ul {
  margin: 10px 0;
  padding-left: 20px;
}

.observation li {
  margin: 5px 0;
  color: #856404;
}

.code-comparison {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

.code-block {
  background: #f8f9fa;
  border-radius: 4px;
  padding: 15px;
}

.code-block h3 {
  margin-top: 0;
  color: #dc3545;
}

.code-block:last-child h3 {
  color: #28a745;
}

.code-note {
  background: #e9ecef;
  padding: 10px;
  border-radius: 4px;
  margin-top: 10px;
  font-size: 14px;
  color: #495057;
}

pre {
  background: #2d3748;
  color: #e2e8f0;
  padding: 15px;
  border-radius: 4px;
  overflow-x: auto;
  margin: 0;
}

code {
  font-family: "Courier New", monospace;
  font-size: 14px;
}

.summary {
  background: #f8f9fa;
  border-radius: 4px;
  padding: 20px;
}

.summary h3 {
  color: #2c3e50;
  margin-top: 20px;
  margin-bottom: 10px;
}

.summary ul {
  margin: 10px 0;
  padding-left: 20px;
}

.summary li {
  margin: 8px 0;
  line-height: 1.6;
}

.summary p {
  line-height: 1.6;
  color: #495057;
}

@media (max-width: 768px) {
  .code-comparison {
    grid-template-columns: 1fr;
  }

  .counter-instances {
    grid-template-columns: 1fr;
  }

  .instances-grid {
    grid-template-columns: 1fr;
  }

  .control-buttons {
    flex-direction: column;
  }
}
</style>
