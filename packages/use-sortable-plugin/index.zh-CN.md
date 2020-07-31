---
title: useSortablePlugin
order: 2
group:
  title: Next
  path: /next
  order: 1
legacy: /next/use-sortable-plugin
---

# useSortablePlugin

## 何时使用

表格需要排序

⚠️ 需要跟 [next-form-table](./next-form-table) 结合一起使用才能有效。

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
