---
title: 快速上手
order: 3
nav:
  title: 指南
  order: 1
---

## 演示

先使用 [Fusion Next](https://fusion.design/pc/component/doc/102) 和 [formily](https://formilyjs.org/) 让大家熟悉下如何组合搭配使用，可以先看看 Codesandbox 这个例子。

<code src="./demo.tsx" inline />

下面逐步描述下如何使用。

## 安装

```sh
npm install @ahooksjs/next-form-table @alifd/next @formily/next @formily/next-components --save
```

## 使用

#### 定义请求源

需要注意两点，如下

- 必须返回一个 Promise 对象
- 遵循接口返回格式，格式如下

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

如果接口返回的格式不符合呢？可以通过 `Promise` 的 then 方法再转换一下

```js
const transform = (res) => {
  return { ...res, data: { ...res.data, current: res.data.pageIndex } };
};

const list = () => {
  return window
    .fetch(`<path-to-get-list>`)
    .then((res) => res.json())
    .then(transform);
};
```

如果找不到对应的请求源，可以先 mock 下

```js
const list = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        data: {
          dataSource: [{ name: 'foo' }],
          total: 1,
        },
      });
    }, 1000);
  });
};
```

#### 引用

引用 Next 组件和 formily

```js
import '@alifd/next/dist/next.css';
import useNextFormTable from '@ahooksjs/next-form-table';
import { Table, Pagination } from '@alifd/next';
import { SchemaForm, Field, Submit, Reset, FormButtonGroup } from '@formily/next';
import { Input } from '@formily/next-components';
```

#### 组合

```js
const Component = () => {
  const { formProps, tableProps, paginationProps } = useNextFormTable(list);

  return (
    <div>
      <SchemaForm {...formProps} components={{ Input }} style={{ marginBottom: 20 }} inline>
        <Field name="name" title="name" x-component={'Input'} />
        <FormButtonGroup>
          <Submit>查询</Submit>
          <Reset>重置</Reset>
        </FormButtonGroup>
      </SchemaForm>

      <Table {...tableProps}>
        <Table.Column title="name" dataIndex="name" width={200} />
      </Table>
      <Pagination style={{ marginTop: 16 }} {...paginationProps} />
    </div>
  );
};
```

#### 插件

如果需要加上多选的功能，只需要加两段代码即可，分别是

- 引入 `useSelectionPlugin`

```js
import useSelectionPlugin from '@ahooksjs/use-selection-plugin';
```

- 创建并注入

```js
const plugin = useSelectionPlugin();
const { formProps, tableProps, paginationProps } = useNextFormTable(list, {
  plugins: [plugin],
});
```

可以看看下面的可运行例子

<code src="./demo1.tsx" inline />

如果想了解 useNextFormTable 的更多能力的话，可以到 [useNextFormTable](../hooks/next/next-form-table) 查看。
