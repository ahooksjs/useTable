---
title: useAsyncDefaultPlugin
order: 5
nav:
  title: Hooks
  path: /hooks
  order: 2
group:
  title: Plugin
  path: /plugin
  order: 10
legacy: /plugin/use-async-default-plugin
---

> ⚠️ English Translation In Progress

# useAsyncDefaultPlugin

## 何时使用

下拉框有异步默认值需求，你要获取下拉框数据然后设置默认值，请求的时候也要带过去。

## 安装

```sh
npm install @ahooksjs/use-async-default-plugin --save
```

## 引用方式

```js
import useAsyncDefaultPlugin from '@ahooksjs/use-async-default-plugin';
```

## 代码演示

### 默认请求

<code src="./demo/default.tsx" />

### 设置默认值

<code src="./demo/setDefaultValue.tsx" />

### 多个默认请求

<code src="./demo/multi.tsx" />

## API

```js
const plugin = useAsyncDefaultPlugin({ query, field, setDefaultValue });
```

## 参数

| 参数            | 说明                         | 类型                       | 默认值                     |
| --------------- | ---------------------------- | -------------------------- | -------------------------- |
| query           | 必选，下拉框数据源           | `() => Promise` \| `Array` | 无                         |
| field           | 哪个下拉框需要设置异步默认值 | `String` \| `Array`        | {}                         |
| setDefaultValue | 自定义默认值获取             | `(data, name) => string`   | 取下拉框数据第一个为默认值 |

⚠️ query 和 field 如果是数组的话，顺序需要保持一致
