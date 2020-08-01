---
title: useNextFormTable
order: 1
group:
  title: Next
  path: /next
  order: 10
legacy: /next/use-form-table
---

# useNextFormTable

## 何时使用

表单列表查询页，`Form` + `Table` 场景的 [Fusion Next](https://github.com/alibaba-fusion/next) 和 [formily](formilyjs.org) 实现

## 安装

```sh
npm install @ahooksjs/next-form-table --save
```

## 引用方式

```js
import useNextFormTable from '@ahooksjs/next-form-table';
```

## 代码演示

### 默认

<code src="./demo/default.tsx" />

### 重新请求

<code src="./demo/refreshDeps.tsx" />

### 默认 pageSize

<code src="./demo/pageSize.tsx" />

### 多插件

<code src="./demo/all.tsx" />

## API

```js
const { formProps, tableProps, paginationProps, query, getParams } = useNextFormTable(service, [
  options,
]);
```

## 参数

| 参数    | 说明                                               | 类型                             | 默认值 |
| ------- | -------------------------------------------------- | -------------------------------- | ------ |
| service | 必选，列表请求，返回值格式可以看下面的 `IResponse` | (params) => `Promise<IResponse>` | 无     |
| options | 可选，具体可以看下面 `Options`                     | Object                           | {}     |

#### Options

| 参数           | 说明                             | 类型    | 默认值 |
| -------------- | -------------------------------- | ------- | ------ |
| current        | 当前页码                         | Number  | 1      |
| pageSize       | 每一页显示条树                   | Number  | 20     |
| autoFirstQuery | 初始化是否自动请求               | Boolean | true   |
| refreshDeps    | refreshDeps 变化，会触发重新请求 | Array   | []     |
| plugins        | 插件集合                         | Array   | []     |

#### IResponse

```ts
interface IResponse {
  success: boolean;
  msg: string;
  data: {
    dataSource: any[]; // 数据
    total: number; // 总数
    current: number; // 当前页，没有返回会以前端计算为准
    pageSize: number; // 页大小，没有返回会以前端计算为准
  };
}
```

## 返回值

| 参数            | 说明                                     | 类型          |
| --------------- | ---------------------------------------- | ------------- |
| formProps       | formily props，分别是 actions 和 effects | Object        |
| tableProps      | fusion next table props                  | Object        |
| paginationProps | fusion pagination props                  | Object        |
| query           | 处理过的请求方法，可以在外界刷新 table   | () => Promise |
| getParams       | 获取请求参数，只会在请求成功才更新       | () => ({})    |
