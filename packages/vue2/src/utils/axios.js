import axios from "axios";
import { Message, Loading } from "element-ui";

/**
 * Axios 二次封装
 * 包含基础配置、拦截器、便捷方法等
 */

// 创建 axios 实例
const http = axios.create({
  // 基础配置
  baseURL: process.env.VUE_APP_API_BASE_URL || "/api", // 接口请求前缀
  timeout: 10000, // 请求超时时间
  headers: {
    "Content-Type": "application/json;charset=UTF-8",
    "X-Requested-With": "XMLHttpRequest",
  },
  // 响应类型
  responseType: "json",
  // 跨域请求时是否需要使用凭证
  withCredentials: true,
});

// 请求拦截器
http.interceptors.request.use(
  (config) => {
    // 显示加载动画
    if (config.showLoading !== false) {
      window.loadingInstance = Loading.service({
        lock: true,
        text: "加载中...",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
      });
    }

    // 自动添加 token
    const token = localStorage.getItem("token") || sessionStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // 请求参数处理
    if (config.method === "post" && config.data) {
      // 处理 FormData
      if (config.data instanceof FormData) {
        config.headers["Content-Type"] = "multipart/form-data";
      }
      // 处理普通对象
      else if (typeof config.data === "object") {
        config.data = JSON.stringify(config.data);
      }
    }

    // 请求日志记录
    console.log(`🚀 [${config.method?.toUpperCase()}] ${config.url}`, {
      params: config.params,
      data: config.data,
      headers: config.headers,
    });

    // 请求去重处理（可选）
    if (config.preventDuplicate) {
      const requestKey = `${config.method}_${config.url}_${JSON.stringify(config.params || {})}`;
      if (window.pendingRequests && window.pendingRequests[requestKey]) {
        return Promise.reject(new Error("重复请求已被阻止"));
      }
      if (!window.pendingRequests) window.pendingRequests = {};
      window.pendingRequests[requestKey] = true;
    }

    return config;
  },
  (error) => {
    // 隐藏加载动画
    if (window.loadingInstance) {
      window.loadingInstance.close();
    }

    console.error("❌ 请求拦截器错误:", error);
    return Promise.reject(error);
  }
);

// 响应拦截器
http.interceptors.response.use(
  (response) => {
    // 隐藏加载动画
    if (window.loadingInstance) {
      window.loadingInstance.close();
    }

    // 清除请求去重标记
    if (response.config.preventDuplicate) {
      const requestKey = `${response.config.method}_${response.config.url}_${JSON.stringify(
        response.config.params || {}
      )}`;
      if (window.pendingRequests && window.pendingRequests[requestKey]) {
        delete window.pendingRequests[requestKey];
      }
    }

    // 响应日志记录
    console.log(`✅ [${response.config.method?.toUpperCase()}] ${response.config.url}`, {
      status: response.status,
      data: response.data,
      headers: response.headers,
    });

    // 统一处理响应数据
    const { data, status, statusText } = response;

    // 处理业务状态码
    if (data && data.code !== undefined) {
      if (data.code === 200 || data.code === 0) {
        return data.data || data;
      } else {
        // 业务错误处理
        const errorMsg = data.message || data.msg || "请求失败";
        Message.error(errorMsg);
        return Promise.reject(new Error(errorMsg));
      }
    }

    // 处理 HTTP 状态码
    if (status >= 200 && status < 300) {
      return data;
    } else {
      const errorMsg = data?.message || data?.msg || statusText || "请求失败";
      Message.error(errorMsg);
      return Promise.reject(new Error(errorMsg));
    }
  },
  (error) => {
    // 隐藏加载动画
    if (window.loadingInstance) {
      window.loadingInstance.close();
    }

    // 清除请求去重标记
    if (error.config && error.config.preventDuplicate) {
      const requestKey = `${error.config.method}_${error.config.url}_${JSON.stringify(
        error.config.params || {}
      )}`;
      if (window.pendingRequests && window.pendingRequests[requestKey]) {
        delete window.pendingRequests[requestKey];
      }
    }

    // 错误日志记录
    console.error("❌ 响应拦截器错误:", {
      url: error.config?.url,
      method: error.config?.method,
      status: error.response?.status,
      message: error.message,
      response: error.response?.data,
    });

    // 统一错误处理
    let errorMsg = "网络错误";

    if (error.response) {
      // 服务器响应了错误状态码
      const { status, data } = error.response;

      switch (status) {
        case 400:
          errorMsg = data?.message || "请求参数错误";
          break;
        case 401:
          errorMsg = "未授权，请重新登录";
          // token 过期处理
          localStorage.removeItem("token");
          sessionStorage.removeItem("token");
          // 跳转到登录页
          if (window.location.pathname !== "/login") {
            window.location.href = "/login";
          }
          break;
        case 403:
          errorMsg = "拒绝访问";
          break;
        case 404:
          errorMsg = "请求的资源不存在";
          break;
        case 500:
          errorMsg = "服务器内部错误";
          break;
        case 502:
          errorMsg = "网关错误";
          break;
        case 503:
          errorMsg = "服务不可用";
          break;
        case 504:
          errorMsg = "网关超时";
          break;
        default:
          errorMsg = data?.message || `请求失败 (${status})`;
      }
    } else if (error.request) {
      // 请求已发出但没有收到响应
      if (error.code === "ECONNABORTED") {
        errorMsg = "请求超时，请检查网络连接";
      } else {
        errorMsg = "网络连接失败，请检查网络设置";
      }
    } else {
      // 其他错误
      errorMsg = error.message || "未知错误";
    }

    // 显示错误消息
    Message.error(errorMsg);

    return Promise.reject(error);
  }
);

/**
 * 便捷的请求方法
 */

// GET 请求
const get = (url, params, config = {}) => {
  return http.get(url, { params, ...config });
};

// POST 请求
const post = (url, data, config = {}) => {
  return http.post(url, data, config);
};

// PUT 请求
const put = (url, data, config = {}) => {
  return http.put(url, data, config);
};

// DELETE 请求
const del = (url, config = {}) => {
  return http.delete(url, config);
};

// PATCH 请求
const patch = (url, data, config = {}) => {
  return http.patch(url, data, config);
};

/**
 * 高级功能
 */

// 并发请求
const all = (requests) => {
  return axios.all(requests);
};

// 请求重试
const retry = (fn, retries = 3, delay = 1000) => {
  return new Promise((resolve, reject) => {
    const attempt = (attemptsLeft) => {
      fn()
        .then(resolve)
        .catch((error) => {
          if (attemptsLeft === 1) {
            reject(error);
          } else {
            setTimeout(() => attempt(attemptsLeft - 1), delay);
          }
        });
    };
    attempt(retries);
  });
};

// 请求缓存
const cache = new Map();
const cachedRequest = (key, requestFn, ttl = 5 * 60 * 1000) => {
  const cached = cache.get(key);
  if (cached && Date.now() - cached.timestamp < ttl) {
    return Promise.resolve(cached.data);
  }

  return requestFn().then((data) => {
    cache.set(key, { data, timestamp: Date.now() });
    return data;
  });
};

// 请求队列
class RequestQueue {
  constructor(maxConcurrent = 5) {
    this.maxConcurrent = maxConcurrent;
    this.running = 0;
    this.queue = [];
  }

  add(requestFn) {
    return new Promise((resolve, reject) => {
      this.queue.push({ requestFn, resolve, reject });
      this.process();
    });
  }

  async process() {
    if (this.running >= this.maxConcurrent || this.queue.length === 0) {
      return;
    }

    this.running++;
    const { requestFn, resolve, reject } = this.queue.shift();

    try {
      const result = await requestFn();
      resolve(result);
    } catch (error) {
      reject(error);
    } finally {
      this.running--;
      this.process();
    }
  }
}

const requestQueue = new RequestQueue();

/**
 * 工具方法
 */

// 取消请求
const createCancelToken = () => {
  return axios.CancelToken.source();
};

// 设置默认配置
const setDefaults = (config) => {
  Object.assign(http.defaults, config);
};

// 设置请求头
const setHeaders = (headers) => {
  Object.assign(http.defaults.headers.common, headers);
};

// 设置认证 token
const setToken = (token) => {
  if (token) {
    localStorage.setItem("token", token);
    http.defaults.headers.common.Authorization = `Bearer ${token}`;
  } else {
    localStorage.removeItem("token");
    delete http.defaults.headers.common.Authorization;
  }
};

// 清除认证信息
const clearAuth = () => {
  localStorage.removeItem("token");
  sessionStorage.removeItem("token");
  delete http.defaults.headers.common.Authorization;
};

// 导出 axios 实例
export default http;

// 导出所有方法
export {
  http as axios,
  get,
  post,
  put,
  del,
  patch,
  all,
  retry,
  cachedRequest,
  requestQueue,
  createCancelToken,
  setDefaults,
  setHeaders,
  setToken,
  clearAuth,
};
