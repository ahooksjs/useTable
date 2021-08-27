---
title: useParamPlugin
order: 5
nav:
  title: Hooks
  path: /hooks
  order: 2
group:
  title: Plugin
  path: /plugin
  order: 10
legacy: /plugin/use-param-plugin
---

# useParamPlugin

## 何时使用

url 带上参数自动填入到对应查询项里面并且表格请求自动带上

## 安装

```sh
npm install @ahooksjs/use-param-plugin --save
```

## 引用方式

```js
import useParamPlugin from '@ahooksjs/use-param-plugin';
```

## 代码演示

### 默认请求

<code src="./demo/default.tsx" />

## API

```js
const plugin = useParamPlugin(options);
```

## 参数

| 参数      | 说明                       | 类型     | 默认值           |
| --------- | -------------------------- | -------- | ---------------- |
| transform | url 参数转换成表格请求参数 | Function | params => params |
