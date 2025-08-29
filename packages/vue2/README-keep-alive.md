# Vue2 路由级 Keep-Alive 缓存管理

## 概述

本项目实现了 Vue2 中路由级别的 `keep-alive` 缓存管理，通过路由元信息配置和统一的缓存策略管理，实现更精细的组件缓存控制。

## 核心特性

### 1. 三种缓存策略

- **Always 策略**: 组件总是被缓存
- **Conditional 策略**: 根据条件决定是否缓存
- **Never 策略**: 组件从不被缓存

### 2. 路由配置

在 `src/router/index.js` 中为每个路由添加 meta 字段：

```javascript
{
  path: "/keep-alive-demo",
  name: "KeepAliveDemo",
  component: () => import("../views/keepAliveDemo.vue"),
  meta: {
    keepAlive: true,
    title: "Keep-Alive 详解",
    cacheStrategy: "always" // always, conditional, never
  }
}
```

### 3. App.vue 实现

在 `src/App.vue` 中实现路由级缓存管理：

```vue
<router-view v-slot="{ Component, route }">
  <keep-alive :include="cachedComponents" :exclude="excludedComponents">
    <component :is="Component" :key="route.path" />
  </keep-alive>
</router-view>
```

### 4. 缓存管理逻辑

- 自动根据路由元信息更新缓存策略
- 支持手动控制组件缓存
- 提供缓存状态监控和调试功能
- 支持动态调整缓存策略

## 使用方法

### 1. 配置路由缓存策略

```javascript
// 总是缓存
meta: { keepAlive: true, cacheStrategy: "always" }

// 条件缓存
meta: { keepAlive: true, cacheStrategy: "conditional" }

// 不缓存
meta: { keepAlive: false, cacheStrategy: "never" }
```

### 2. 手动控制缓存

```javascript
// 启用组件缓存
this.$root.$cacheManager.toggle("ComponentName", true);

// 禁用组件缓存
this.$root.$cacheManager.toggle("ComponentName", false);

// 清空所有缓存
this.$root.$cacheManager.clear();

// 获取缓存状态
const status = this.$root.$cacheManager.status();
```

### 3. 条件缓存逻辑

在 `App.vue` 中的 `shouldCacheComponent` 方法可以自定义条件缓存逻辑：

```javascript
shouldCacheComponent(route, componentName) {
  // 根据路由参数判断
  if (route.params && route.params.id) {
    return true;
  }

  // 根据查询参数判断
  if (route.query && route.query.cache === 'true') {
    return true;
  }

  // 根据用户权限判断
  const userRole = localStorage.getItem('userRole');
  if (userRole === 'admin') {
    return true;
  }

  return false;
}
```

## 项目结构

```
src/
├── App.vue                    # 主应用组件，实现路由级缓存管理
├── router/
│   └── index.js              # 路由配置，包含缓存策略元信息
├── views/
│   └── keepAliveDemo.vue     # Keep-Alive 演示页面
└── components/
    ├── UserList.vue          # 演示组件
    ├── UserDetail.vue        # 演示组件
    └── UserEdit.vue          # 演示组件
```

## 缓存策略示例

### Always 策略（总是缓存）

- MixinTest: 保持用户配置和状态
- ComponentVsPlugin: 保持页面状态
- AxiosDemo: 保持演示数据
- KeepAliveDemo: 保持演示状态

### Conditional 策略（条件缓存）

- VuexTest: 根据用户权限决定
- DynamicData: 根据路由参数决定
- NextTickDemo: 根据查询参数决定
- SlotDemo: 根据用户操作决定
- PermissionDemo: 根据用户角色决定

### Never 策略（不缓存）

- DataTest: 每次都需要重新渲染
- ModifiersDemo: 状态不重要

## 性能优化建议

1. **合理使用缓存**: 避免过度缓存导致内存占用过高
2. **精确控制**: 使用 include/exclude 精确控制缓存范围
3. **动态调整**: 根据业务需求动态调整缓存策略
4. **监控状态**: 实时监控缓存状态，及时清理无用缓存
5. **条件判断**: 利用条件缓存减少不必要的缓存

## 调试功能

项目提供了完整的缓存调试功能：

- 缓存状态查看
- 手动缓存控制
- 缓存策略切换
- 路由快速导航
- 生命周期监控

## 注意事项

1. 确保组件有唯一的 `name` 属性
2. 缓存策略变更后需要重新访问路由才能生效
3. 条件缓存逻辑需要根据实际业务需求调整
4. 大量缓存可能影响内存使用，需要合理控制

## 扩展功能

可以进一步扩展的功能：

- 缓存过期时间设置
- 缓存优先级管理
- 缓存统计和分析
- 自动缓存清理
- 缓存预热策略
