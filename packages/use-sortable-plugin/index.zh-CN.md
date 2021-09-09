---
title: useSortablePlugin
order: 2
nav:
  title: Hooks
  path: /hooks
  order: 2
group:
  title: Plugin
  path: /plugin
  order: 10
legacy: /next/use-sortable-plugin
---

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

### 默认值

<code desc="设置排序默认值" src="./demo/initialSort.tsx" />

### 请求不重置

<code desc="点击查询的时候不会重置排序条件" src="./demo/resetWhenQuery.tsx" />

## API

```js
const plugin = useSortablePlugin({ sortByKey, sortOrderKey, resetWhenQuery, defaultValue });
```

## 参数

| 参数           | 说明                                  | 类型                              | 默认值    |
| -------------- | ------------------------------------- | --------------------------------- | --------- |
| sortByKey      | 可选，选中的 dataIndex 对应的 key     | `String`                          | sortBy    |
| sortOrderKey   | 可选，排序对应的 key                  | `String`                          | sortOrder |
| resetWhenQuery | 可选，点击查询/重置要不要重置排序条件 | `Boolean`                         | true      |
| defaultValue   | 可选，初始化默认值                    | { [字段名]: `'desc'` \| `'asc'` } | {}        |
