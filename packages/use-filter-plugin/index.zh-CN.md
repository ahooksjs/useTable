---
title: useFilterPlugin
order: 3
group:
  title: Plugin
  path: /plugin
  order: 10
legacy: /next/use-filter-plugin
---

# useFilterPlugin

## 何时使用

表格需要 filter 功能

## 安装

```sh
npm install @ahooksjs/use-filter-plugin --save
```

## 引用方式

```js
import useFilterPlugin from '@ahooksjs/use-filter-plugin';
```

## 代码演示

### 默认请求

<code src="./demo/default.tsx" />

## API

```js
const plugin = useFilterPlugin({ transformer });
```

## 参数

| 参数        | 说明                     | 类型                                          | 默认值           |
| ----------- | ------------------------ | --------------------------------------------- | ---------------- |
| transformer | 转换你需要的 filter 参数 | `(params, filterParams) => transformedParams` | params => params |
