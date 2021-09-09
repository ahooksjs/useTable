---
title: useRangePlugin
order: 3
nav:
  title: Hooks
  path: /hooks
  order: 2
group:
  title: Plugin
  path: /plugin
  order: 10
legacy: /next/use-range-plugin
---

# useRangePlugin

## 何时使用

在一个请求的时候重置之前的查询条件

## 安装

```sh
npm install @ahooksjs/use-range-plugin --save
```

## 引用方式

```js
import useRangePlugin from '@ahooksjs/use-range-plugin';
```

## 代码演示

### 基本使用

<code src="./demo/default.tsx" />

## API

```js
const plugin = useRangePlugin();
```

## 方法

⚠️ 需要结合 useTable 的上层 Design 实现才能获取到返回值，具体使用可以参考上面的例子。

| 参数          | 说明                   | 类型               |
| ------------- | ---------------------- | ------------------ |
| resetAndQuery | 重置请求条件并重新请求 | () => Promise<any> |
