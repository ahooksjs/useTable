---
title: useAsyncDefaultPlugin
order: 1000
group:
  title: Next
  path: /next
  order: 1
legacy: /next/use-async-default-plugin
---

# useAsyncDefaultPlugin

## 何时使用

下拉框有异步默认值需求，你要获取下拉框数据然后设置默认值，请求的时候也要带过去

## 引用方式

```js
import useAsyncDefaultPlugin from '@ahooksjs/use-async-default-plugin';
```

## 代码演示

### 默认请求

<code src="./demo/default.tsx" />

## API

```js
const plugin = useAsyncDefaultPlugin({ query, field, isDefault, setDefaultValue });
```