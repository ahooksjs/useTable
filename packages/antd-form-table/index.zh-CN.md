---
title: useAntdFormTable
order: 1
nav:
  title: Hooks
  path: /hooks
  order: 2
group:
  title: Antd
  path: /antd
  order: 10
legacy: /antd/antd-form-table
---

# useAntdFormTable

## 何时使用

`Form` + `Table` 表单查询表格场景的 [Antd 4.x](https://github.com/ant-design/ant-design/) 和 [formily 1.x](https://formilyjs.org) 实现

## 安装

```sh
npm install @ahooksjs/antd-form-table --save
```

## 引用方式

```js
import useAntdFormTable from '@ahooksjs/antd-form-table';
```

## 代码演示

### 简单使用

<code src="./demo/default.tsx" />

## API

```js
const { formProps, tableProps, paginationProps, query, getParams } = useAntdFormTable(service, [
  options,
]);
```

### 参数

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

### 返回值

| 参数            | 说明                                                                      | 类型                                      |
| --------------- | ------------------------------------------------------------------------- | ----------------------------------------- |
| formProps       | formily props，更多定义可以看下面 `IFormProps`                            | `Object`                                  |
| tableProps      | Antd Table props，更多定义可以看下面 `ITableProps`                        | `Object`                                  |
| paginationProps | Antd Pagination props，更多定义可以看下面 `IPaginationProps`              | `Object`                                  |
| query           | 可以在外界刷新 table 数据，默认会带上上一次请求的参数，传入对象会自动合并 | `(params?: Object) => Promise<IResponse>` |
| getParams       | 获取请求参数，只会在请求成功后才更新                                      | `() => Object`                            |

#### IFormProps

| 参数    | 说明                           | 类型               | 默认值                           |
| ------- | ------------------------------ | ------------------ | -------------------------------- |
| actions | formily schema form 的 actions | ISchemaFormActions | ISchemaFormActions               |
| effects | formily effects                | Effects            | 监听了 onFormSubmit，onFormReset |

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
