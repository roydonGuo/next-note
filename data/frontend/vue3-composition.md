# Vue 3 Composition API

## 简介

Vue 3 引入了 Composition API，提供了更灵活的组合逻辑的方式。

## setup 函数

`setup` 是 Composition API 的入口点。

```javascript
import { ref, computed } from 'vue'

export default {
  setup() {
    const count = ref(0)
    const doubleCount = computed(() => count.value * 2)
    
    return { count, doubleCount }
  }
}
```

## 响应式引用

使用 `ref` 和 `reactive` 创建响应式数据。

## 组合式函数

将逻辑提取到可重用的函数中。

