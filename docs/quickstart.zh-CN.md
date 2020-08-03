---
title: 快速上手
order: 3
---

先使用 [Fusion Next](https://fusion.design/pc/component/doc/102) 和 [formily](formilyjs.org) 让大家熟悉下如何组合搭配使用。

## 安装

```sh
npm install @ahooksjs/next-form-table @alifd/next @formily/next @formily/next-components --save
```

## 使用

#### 请求源

需要注意两点，一个是请求源必须返回一个 Promise 接口，另外一个接口返回的格式为：

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

如果接口返回的格式不符合呢？可以通过 `Promise` 的 then 接口再转换一下。

```js
const list = () => {
  return window.fetch(`<path-to-get-list>`).then((res) => res.json()).then(transform);
};
```

如果找不到对应的接口，可以先 mock 下。

```js
const list = () => {
  return Promise.resolve({
    success: true,
    data: {
      dataSource: [{ name: 'foo' }],
      total: 1,
    }
  });
};
```

#### 引用

```js
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
    <Fragment>
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
    </Fragment>
  );
};
```
