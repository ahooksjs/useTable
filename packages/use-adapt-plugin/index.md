---
title: useAdaptPlugin
order: 6
group:
  title: Plugin
  path: /plugin
  order: 10
legacy: /next/use-adapt-plugin
---

# useAdaptPlugin

## 何时使用

参数需要自定义，比如 current 映射到 pageIndex

## 安装

```sh
npm install @ahooksjs/use-adapt-plugin --save
```

## 引用方式

```js
import useAdaptPlugin from '@ahooksjs/use-adapt-plugin';
```

## 代码演示

### 基本使用

<code src="./demo/default.tsx" />

## API

```js
const plugin = useAdaptPlugin(options);
```

## 参数

| 参数    | 说明                     | 类型   | 默认值 |
| ------- | ------------------------ | ------ | ------ |
| options | 具体看下 `IOptions` 定义 | Object | 无     |

#### IOptions

| 参数 | 说明                                                                | 类型   | 默认值 |
| ---- | ------------------------------------------------------------------- | ------ | ------ |
| map  | 两个属性 <ul><li>current: 当前页</li><li>pageSize: 页大小</li></ul> | Object | 无     |
