// myPlugin.js - 真实的Vue2插件
export default {
  install(Vue, options = {}) {
    const { debug = false, prefix = "MyPlugin" } = options;

    // 1. 添加全局方法
    Vue.prototype.$formatDate = function (date, format = "zh-CN") {
      if (!date) return "";
      if (typeof date === "string") {
        date = new Date(date);
      }

      switch (format) {
        case "zh-CN":
          return date.toLocaleDateString("zh-CN");
        case "en-US":
          return date.toLocaleDateString("en-US");
        case "iso":
          return date.toISOString();
        default:
          return date.toLocaleDateString();
      }
    };

    Vue.prototype.$showToast = function (message, type = "info", duration = 3000) {
      try {
        console.log(`[MyPlugin] 显示 Toast: ${message}, 类型: ${type}`);

        // 创建toast元素
        const toast = document.createElement("div");
        toast.className = `my-plugin-toast my-plugin-toast-${type}`;
        toast.textContent = message;

        // 设置初始状态
        toast.style.transform = "translateX(100%)";

        // 添加到页面
        document.body.appendChild(toast);

        // 强制重绘
        toast.offsetHeight;

        // 显示动画 - 使用 requestAnimationFrame 确保DOM更新
        requestAnimationFrame(() => {
          toast.classList.add("show");
          console.log(`[MyPlugin] Toast 显示动画开始`);
        });

        // 自动移除
        setTimeout(() => {
          console.log(`[MyPlugin] Toast 开始隐藏动画`);
          toast.classList.remove("show");

          // 等待动画完成后移除元素
          setTimeout(() => {
            if (document.body.contains(toast)) {
              document.body.removeChild(toast);
              console.log(`[MyPlugin] Toast 元素已移除`);
            }
          }, 300);
        }, duration);

        console.log(`[MyPlugin] Toast 创建成功，将在 ${duration}ms 后自动隐藏`);
      } catch (error) {
        console.error(`[MyPlugin] Toast 显示失败:`, error);
        // 降级处理：使用 alert
        alert(`${type.toUpperCase()}: ${message}`);
      }
    };

    // 2. 添加全局指令
    Vue.directive("focus", {
      inserted: function (el) {
        el.focus();
      },
      update: function (el) {
        if (el.value) {
          el.focus();
        }
      },
    });

    Vue.directive("highlight", {
      bind(el, binding) {
        const color = binding.value || "#ffeb3b";
        el.style.backgroundColor = color;
        el.style.transition = "background-color 0.3s";
      },
      update(el, binding) {
        const color = binding.value || "#ffeb3b";
        el.style.backgroundColor = color;
      },
    });

    // 3. 添加全局混入
    Vue.mixin({
      created() {
        if (debug) {
          console.log(`[${prefix}] 组件 ${this.$options.name || "Anonymous"} 被创建`);
        }
      },
      mounted() {
        if (debug) {
          console.log(`[${prefix}] 组件 ${this.$options.name || "Anonymous"} 已挂载`);
        }
      },
    });

    // 4. 添加全局过滤器
    Vue.filter("currency", function (value, currency = "CNY") {
      if (!value && value !== 0) return "";

      const formatter = new Intl.NumberFormat("zh-CN", {
        style: "currency",
        currency: currency,
      });

      return formatter.format(value);
    });

    Vue.filter("capitalize", function (value) {
      if (!value) return "";
      return value.charAt(0).toUpperCase() + value.slice(1);
    });

    // 5. 添加全局属性
    Vue.prototype.$pluginConfig = {
      debug,
      prefix,
      version: "1.0.0",
    };

    if (debug) {
      console.log(`[${prefix}] 插件已安装，版本: 1.0.0`);
    }
  },
};
