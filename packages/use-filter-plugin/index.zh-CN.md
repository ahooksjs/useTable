---
title: useFilterPlugin
order: 3
nav:
  title: Hooks
  path: /hooks
  order: 2
group:
  title: Plugin
  path: /plugin
  order: 10
legacy: /next/use-filter-plugin
---

# useFilterPlugin

## 何时使用

过滤器 Filter 功能 🕶

## 安装

```sh
npm install @ahooksjs/use-filter-plugin --save
```

## 引用方式

```js
import useFilterPlugin from '@ahooksjs/use-filter-plugin';
```

## 代码演示

### 基本使用

<code src="./demo/default.tsx" />

### 处理请求参数

<code src="./demo/transformer.tsx" />

### 查询不重置

<code src="./demo/resetWhenQuery.tsx" />

## API

```js
const plugin = useFilterPlugin({ transformer, resetWhenQuery });
```

## 参数

| 参数           | 说明                                  | 类型                                          | 默认值           |
| -------------- | ------------------------------------- | --------------------------------------------- | ---------------- |
| transformer    | 转换你需要的 filter 参数              | `(params, filterParams) => transformedParams` | params => params |
| resetWhenQuery | 可选，点击查询/重置要不要重置排序条件 | `Boolean`                                     | true             |
