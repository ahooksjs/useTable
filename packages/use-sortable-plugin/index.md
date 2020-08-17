---
title: useSortablePlugin
order: 2
group:
  title: Plugin
  path: /plugin
  order: 10
legacy: /next/use-sortable-plugin
---

> ⚠️ English Translation In Progress

# useSortablePlugin

## 何时使用

排序功能 ⓢ

## 安装

```sh
npm install @ahooksjs/use-sortable-plugin --save
```

## 引用方式

```js
import useSortablePlugin from '@ahooksjs/use-sortable-plugin';
```

## 代码演示

### 基本使用

<code src="./demo/default.tsx" />

## API

```js
const plugin = useSortablePlugin({ sortByKey, sortOrderKey });
```

## 参数

| 参数         | 说明                              | 类型     | 默认值    |
| ------------ | --------------------------------- | -------- | --------- |
| sortByKey    | 可选，选中的 dataIndex 对应的 key | `String` | sortBy    |
| sortOrderKey | 可选，排序对应的 key              | `String` | sortOrder |
