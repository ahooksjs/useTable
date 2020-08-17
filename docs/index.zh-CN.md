---
title: 介绍
order: 1
---

# useTable

## 简介

面向中后台`查询表格场景`并且具备插件能力的 Hook 解决方案，更多信息可看 [RFC](https://github.com/alibaba/hooks/issues/465) 和 [Github](https://github.com/ahooksjs/useTable)。

## 特性

- 🔗 `Plugins`: 提供多个场景的插件
- 🚀 `Extensible`: 可定制能力强，可以方便其他 Design 集成
- 💡 `Hook`: 全部基于 Hook 实现

## 整体概览

```jsx | inline
import React from 'react';

export default () => (
  <>
    <img src="https://img.alicdn.com/tfs/TB1kXIaP4v1gK0jSZFFXXb0sXXa-1088-701.png" width="500" />
  </>
);
```

下面简单描述各个实体之间的关系，顺序是自底向上：

- `useTable`：一个具备插件能力的 Table Hooks；
- `useFormTable`: useTable + useFormTablePlugin 定制出来的，form 主要用到了 [formily](https://github.com/alibaba/formily)；
- `Design`：主要是各种 Design 的适配，比如 Antd、Fusion 等；
- `Plugins`：不同功能的插件，不同的 Design 可以自己定制；
- `Solutions`：针对不同场景可以存在不同的解决方案，底层可以共用一套插件技术体系；

看完如果想了解为什么要有插件，可以点击查看[动机](./zh-CN/motivation)。