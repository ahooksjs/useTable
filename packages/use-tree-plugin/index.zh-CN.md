---
title: useTreePlugin
order: 4
group:
  title: Plugin
  path: /plugin
  order: 10
legacy: /next/use-tree-plugin
---

# useTreePlugin

## 何时使用

懒加载树的功能 🌲

## 安装

```sh
npm install @ahooksjs/use-tree-plugin --save
```

## 引用方式

```js
import useTreePlugin from '@ahooksjs/use-tree-plugin';
```

## 代码演示

### 默认请求

<code src="./demo/default.tsx" />

## API

```js
const plugin = useTreePlugin(query, { primaryKey });
```

## 参数

| 参数       | 说明                | 类型                       | 默认值                                                       |
| ---------- | ------------------- | -------------------------- | ------------------------------------------------------------ |
| query      | 点击父节点的请求    | `() => Promise<IResponse>` | `() => Promise.resolve({ data: { dataSource: [], total: 0 }` |
| primaryKey | table 的 primaryKey | String                     | id                                                           |
