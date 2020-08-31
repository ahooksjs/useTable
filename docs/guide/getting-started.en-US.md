---
order: 3
nav:
  title: Guide
  order: 1
---

# Getting Started

## Demo

Using [Fusion Next](https://fusion.design/pc/component/doc/102) and [formily](https://formilyjs.org/) in Codesandbox example to explain how to use it.

<code src="./demo.tsx" inline />

Here's how to use it step by step.

## Installation

```sh
npm install @ahooksjs/next-form-table @alifd/next @formily/next @formily/next-components --save
```

## Usage

#### Fetching

There are two points to note. One is that the request source must return a Promise interface, and the other interface returns in the format：

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

You can transform the response using the Promise then method if the response doesn't match.

```js
const list = () => {
  return window
    .fetch(`<path-to-get-list>`)
    .then((res) => res.json())
    .then(transform);
};
```

You can mock it if doesn't find the correct resource.

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

#### Import

```js
import '@alifd/next/dist/next.css';
import useNextFormTable from '@ahooksjs/next-form-table';
import { Table, Pagination } from '@alifd/next';
import { SchemaForm, Field, Submit, Reset, FormButtonGroup } from '@formily/next';
import { Input } from '@formily/next-components';
```

#### Compose

```js
const Component = () => {
  const { formProps, tableProps, paginationProps } = useNextFormTable(list);

  return (
    <div>
      <SchemaForm {...formProps} components={{ Input }} style={{ marginBottom: 20 }} inline>
        <Field name="name" title="name" x-component={'Input'} />
        <FormButtonGroup>
          <Submit>Submit</Submit>
          <Reset>Reset</Reset>
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

#### Plugin

If you need to add a selection feature, you only need to add two pieces of code.

- import `useSelectionPlugin`

```js
import useSelectionPlugin from '@ahooksjs/use-selection-plugin';
```

- create it

```js
const plugin = useSelectionPlugin();
const { formProps, tableProps, paginationProps } = useNextFormTable(list, {
  plugins: [plugin],
});
```

The codesandbox example with plugin

<code src="./demo1.tsx" inline />

Going to [useNextFormTable](../hooks/next/next-form-table) to learn more features about useNextFormTable.