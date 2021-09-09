---
title: useAntdTable
order: 1
nav:
  title: Hooks
  path: /hooks
  order: 2
group:
  title: Antd
  path: /antd
  order: 10
legacy: /antd/antd-table
---

# useAntdTable

## 何时使用

基于 [Antd 4.x](https://github.com/ant-design/ant-design/) 实现的`查询表格场景`

## 安装

```sh
npm install @ahooksjs/antd-table --save
```

## 引用方式

```js
import useAntdTable from '@ahooksjs/antd-table';
```

## 代码演示

### 简单使用

<code src="./demo/default.tsx" />

### 多插件

<code src="./demo/all.tsx" />

## API

```js
const { tableProps, paginationProps, query, getParams } = useAntdTable(service, [options]);
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
| pageSize       | 每一页显示条数                   | Number  | 20     |
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

| 参数            | 说明                                                                                   | 类型                                      |
| --------------- | -------------------------------------------------------------------------------------- | ----------------------------------------- |
| tableProps      | Antd Table props，更多定义可以看下面 `ITableProps`                                     | `Object`                                  |
| paginationProps | Antd Pagination props，更多定义可以看下面 `IPaginationProps`                           | `Object`                                  |
| query           | 处理过的请求方法，可以在外界刷新 table，默认会带上上一次请求的参数，传入对象会自动合并 | `(params?: Object) => Promise<IResponse>` |
| getParams       | 获取请求参数，只会在请求成功才更新                                                     | `() => Object`                            |

#### ITableProps

| 参数       | 说明             | 类型    | 默认值 |
| ---------- | ---------------- | ------- | ------ |
| dataSource | 数据源           | any[]   | []     |
| loading    | 是否出现 loading | Boolean | false  |

#### IPaginationProps

| 参数     | 说明                 | 类型                                          | 默认值   |
| -------- | -------------------- | --------------------------------------------- | -------- |
| total    | 总数                 | `Number`                                      | 0        |
| current  | 当前页               | `Number`                                      | 1        |
| pageSize | 页大小               | `Number`                                      | 20       |
| onChange | 监听当前页改变的事件 | `(current: number, pageSize: number) => void` | 触发请求 |
