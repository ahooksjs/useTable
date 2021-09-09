---
title: useTransformPlugin
order: 2
nav:
  title: Hooks
  path: /hooks
  order: 2
group:
  title: Plugin
  path: /plugin
  order: 10
legacy: /next/use-transform-plugin
---

# useTransformPlugin

## 何时使用

对于请求参数的特殊处理，比如过滤掉所有 undefined 的数据

## 安装

```sh
npm install @ahooksjs/use-transform-plugin --save
```

## 引用方式

```js
import useTransformPlugin from '@ahooksjs/use-transform-plugin';
```

## 代码演示

### 基本使用

<code desc="只使用一个转换处理，trim 查询数据" src="./demo/default.tsx" />

## API

```js
const plugin = useTransformPlugin({ filter });
```

## 参数

| 参数   | 说明     | 类型                               | 默认值 |
| ------ | -------- | ---------------------------------- | ------ |
| filter | 过滤条件 | `TFilterType` 或者 `TFilterType[]` | 无     |

### TFilterType

```ts
type TFilterType = 'empty' | 'undef' | 'null' | 'trim';
```
