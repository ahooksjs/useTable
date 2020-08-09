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

多选功能 ✅

## 安装

```sh
npm install @ahooksjs/use-selection-plugin --save
```

## 引用方式

```js
import useSelectionPlugin from '@ahooksjs/use-selection-plugin';
```

## 代码演示

### 基本使用

<code src="./demo/default.tsx" />

## API

```js
const plugin = useSelectionPlugin({ primaryKey });
```

## 参数

| 参数       | 说明                                                                                          | 类型     | 默认值 |
| ---------- | --------------------------------------------------------------------------------------------- | -------- | ------ |
| primaryKey | 可选，dataSource 当中数据的主键，如果给定的数据源中的属性不包含该主键，会造成选择状态全部选中 | `String` | id     |

## 返回值

⚠️ 需要结合 useTable 的上层 Design 实现才能获取到返回值，具体可以看上面的例子。

| 参数               | 说明                           | 类型        |
| ------------------ | ------------------------------ | ----------- |
| getSelectedRowKeys | 获取选中行指定的 primaryKey 值 | () => any[] |
