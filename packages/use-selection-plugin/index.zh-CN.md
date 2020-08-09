---
title: useSelectionPlugin
order: 2
group:
  title: Plugin
  path: /plugin
  order: 10
legacy: /next/use-selection-plugin
---

# useSelectionPlugin

## 何时使用

表格需要多选

## 安装

```sh
npm install @ahooksjs/use-selection-plugin --save
```

## 引用方式

```js
import useSelectionPlugin from '@ahooksjs/use-selection-plugin';
```

## 代码演示

### 默认请求

<code src="./demo/default.tsx" />

## API

```js
const plugin = useSelectionPlugin({ primaryKey });
```

## 参数

| 参数       | 说明                      | 类型     | 默认值 |
| ---------- | ------------------------- | -------- | ------ |
| primaryKey | 可选，dataSource当中数据的主键，如果给定的数据源中的属性不包含该主键，会造成选择状态全部选中 | `String` | id     |
