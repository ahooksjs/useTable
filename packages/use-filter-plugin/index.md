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

> ⚠️ English Translation In Progress

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

## API

```js
const plugin = useFilterPlugin({ transformer });
```

## 参数

| 参数        | 说明                     | 类型                                          | 默认值           |
| ----------- | ------------------------ | --------------------------------------------- | ---------------- |
| transformer | 转换你需要的 filter 参数 | `(params, filterParams) => transformedParams` | params => params |
