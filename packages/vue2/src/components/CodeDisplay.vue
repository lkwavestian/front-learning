<template>
  <div class="code-display">
    <div class="code-header">
      <span class="language">{{ language }}</span>
      <button @click="copyCode" class="copy-btn">
        {{ copied ? "已复制" : "复制" }}
      </button>
    </div>
    <div class="code-content">
      <pre><code class="hljs" v-html="highlightedCode"></code></pre>
    </div>
  </div>
</template>

<script>
import hljs from "highlight.js/lib/core";
import xml from "highlight.js/lib/languages/xml";
import javascript from "highlight.js/lib/languages/javascript";
import "highlight.js/styles/github.css";

// 注册语言
hljs.registerLanguage("xml", xml);
hljs.registerLanguage("javascript", javascript);

export default {
  name: "CodeDisplay",
  props: {
    code: {
      type: String,
      required: true,
    },
    language: {
      type: String,
      default: "xml",
    },
  },
  data() {
    return {
      copied: false,
    };
  },
  computed: {
    highlightedCode() {
      try {
        return hljs.highlight(this.code, { language: this.language }).value;
      } catch (error) {
        // 如果高亮失败，返回原始代码
        return this.escapeHtml(this.code);
      }
    },
  },
  methods: {
    copyCode() {
      navigator.clipboard
        .writeText(this.code)
        .then(() => {
          this.copied = true;
          setTimeout(() => {
            this.copied = false;
          }, 2000);
        })
        .catch(() => {
          // 降级方案
          const textArea = document.createElement("textarea");
          textArea.value = this.code;
          document.body.appendChild(textArea);
          textArea.select();
          document.execCommand("copy");
          document.body.removeChild(textArea);

          this.copied = true;
          setTimeout(() => {
            this.copied = false;
          }, 2000);
        });
    },
    escapeHtml(text) {
      const div = document.createElement("div");
      div.textContent = text;
      return div.innerHTML;
    },
  },
};
</script>

<style scoped>
.code-display {
  background: #2d3748;
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 20px;
}

.code-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 16px;
  background: #1a202c;
  border-bottom: 1px solid #4a5568;
}

.language {
  color: #e2e8f0;
  font-size: 0.875rem;
  font-weight: 500;
  text-transform: uppercase;
}

.copy-btn {
  background: #4299e1;
  color: white;
  border: none;
  padding: 4px 12px;
  border-radius: 4px;
  font-size: 0.75rem;
  cursor: pointer;
  transition: background-color 0.2s;
}

.copy-btn:hover {
  background: #3182ce;
}

.copy-btn:active {
  background: #2b6cb0;
}

.code-content {
  padding: 16px;
  overflow-x: auto;
}

.code-content pre {
  margin: 0;
  font-family: "Fira Code", "Monaco", "Consolas", monospace;
  font-size: 0.875rem;
  line-height: 1.5;
}

.code-content code {
  color: inherit;
  background: none;
  padding: 0;
}

/* 代码高亮主题覆盖 */
:deep(.hljs) {
  background: transparent !important;
  color: #e2e8f0 !important;
}

:deep(.hljs-tag) {
  color: #81e6d9 !important;
}

:deep(.hljs-name) {
  color: #81e6d9 !important;
}

:deep(.hljs-attr) {
  color: #fbb6ce !important;
}

:deep(.hljs-string) {
  color: #9ae6b4 !important;
}

:deep(.hljs-comment) {
  color: #718096 !important;
  font-style: italic;
}

:deep(.hljs-keyword) {
  color: #f687b3 !important;
}

:deep(.hljs-function) {
  color: #90cdf4 !important;
}

:deep(.hljs-number) {
  color: #f6ad55 !important;
}
</style>
