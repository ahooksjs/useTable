---
title: 快速上手
order: 2
---

## 安装

```sh
npm install @ahooksjs/next-form-table @alifd/next @formily/next @formily/next-components --save
```

## 使用

#### 请求源

```js
const list = () => {
  return window.fetch(`页面 list 的url`).then((res) => res.json());
};
```

#### 引用

```js
import useNextFormTable from '@ahooksjs/next-form-table';
import { Table, Pagination } from '@alifd/next';
import { SchemaForm, Field, Submit, Reset, FormButtonGroup } from '@formily/next';
import { Input } from '@formily/next-components';
```

#### 运行

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
        <Table.Column title="name" dataIndex="name.last" width={200} />
      </Table>
      <Pagination style={{ marginTop: 16 }} {...paginationProps} />
    </Fragment>
  );
};
```
