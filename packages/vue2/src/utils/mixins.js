// 基础 Mixin
export const baseMixin = {
  data() {
    return {
      mixinData: "来自基础 Mixin 的数据",
      mixinConflictingData: "Mixin 中的冲突数据",
    };
  },
  computed: {
    mixinComputed() {
      return `Mixin 计算属性: ${this.mixinData}`;
    },
  },
  methods: {
    mixinMethod() {
      return "Mixin 方法被调用";
    },
  },
  created() {
    this.addLifecycleLog("基础 Mixin created");
  },
  mounted() {
    this.addLifecycleLog("基础 Mixin mounted");
  },
};

// 日志 Mixin
export const loggerMixin = {
  data() {
    return {
      loggerEnabled: true,
    };
  },
  methods: {
    log(message) {
      if (this.loggerEnabled) {
        console.log(`[Logger Mixin] ${message}`);
        this.addLifecycleLog(`Logger: ${message}`);
      }
    },
    toggleLogger() {
      this.loggerEnabled = !this.loggerEnabled;
      this.log(`日志状态切换为: ${this.loggerEnabled ? "启用" : "禁用"}`);
    },
  },
  created() {
    this.addLifecycleLog("日志 Mixin created");
  },
};

// 计数器 Mixin
export const counterMixin = {
  data() {
    return {
      counter: 0,
    };
  },
  methods: {
    incrementCounter() {
      this.counter++;
      this.log(`计数器增加到: ${this.counter}`);
    },
  },
  created() {
    this.addLifecycleLog("计数器 Mixin created");
  },
};

// 导出所有 mixin 的数组，方便一次性导入
export const allMixins = [baseMixin, loggerMixin, counterMixin];
