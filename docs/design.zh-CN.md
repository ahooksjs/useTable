---
title: 结合 Design
order: 2
group:
  title: 进阶
  path: /advance
  order: 100
legacy: /advance/design
---

## 背景

不同端或者不同部门都会有不同 Design 的实现，现在 alibaba 对外输出有两个 Design 能力，一个是 [Fusion Next](https://fusion.design/)，另外一个是 [Antd](https://ant.design/)。他们组件体系面向技术人员的设计会存在一定的不同。

但是我们面向的场景都是一样的，中后台的场景还是充斥着查询表格的场景，如果你既想用到查询表格的插件能力又得用定制的 Design 的话，那么下面就介绍下如何为你的 Design 定制一套具备插件能力的查询表格。

## 协议

因为我们没法适配很多 Design 层，所以我们制定一些协议，分别是 `请求 Response 协议` 和 `Props 协议`。

### 请求 Response 协议

每一次请求的 Response 规范，useTable 会获取对应的值填充对应组件的 Props。

```ts
interface IResponse {
  success: boolean;
  msg: string;
  data: {
    dataSource: any[]; // 数据
    total: number; // 总数
    current: number; // 当前页
    pageSize: number; // 页大小
  };
}
```

### Props 协议

useTable 会返回一些组件的 Props，方便用户直接设置到对应组件。

##### Table

```ts
interface ITableProps {
  dataSource: any[]; // 数据展示
  loading: boolean; // 是否显示数据加载中
}
```

##### Pagination

```ts
interface IPaginationProps {
  pageSizeSelector: 'filter';
  total: number; // 总共
  pageSize: number; // 每页条数
  current: number; // 当前页
  onChange: (current: number) => void; // 页跳转事件
  onPageSizeChange: (pageSize: number) => void; // 页大小切换事件
}
```

## 实现

有了上面的协议之后，我们就知道需要做什么转换才能符合 useTable 的定义了。下面演示下如何自定义一个具备查询能力的 table。

### 引入

```js
import useTable from '@ahooksjs/use-table';
```

### 自定义

假如跟规范上有两个差异点，分别是

- current 需要转换成 pageIndex；
- 对应的 table 会接收 openPagination 和 paginationProps 来作为 props，决定是否显示 pagination；

#### 简单版

```js
const useMyTable = (service, options) => {
  const { tableProps, paginationProps, getParams, ...returnValue } = useTable(
    ({ current, ...params } = {}) =>
      service({ pageIndex: current, ...params }).then((res) => {
        return {
          ...res,
          data: {
            ...res.data,
            current: res.data.pageIndex,
          },
        };
      }),
    { ...options, current: options.pageIndex }
  );

  return {
    ...returnValue,
    getParams: () => {
      const { current, ...params } = getParams();
      return {
        ...params,
        pageIndex: current,
      };
    },
    tableProps: {
      ...tableProps,
      openPagination: true,
      paginationProps,
    },
  };
};
```

看起来好像写起来还是有点繁琐，下面我们提供了一个适配的插件 `use-adapt-plugin`，快速适配 current 变成 pageIndex。

#### 高阶版

```js
const useMyTable = (service, options) => {
  const plugin = useAdaptPlugin({ map: { current: 'pageIndex' } });
  const plugins = options.plugins || [];
  const { tableProps, paginationProps, ...returnValue } = useTable(service, {
    ...options,
    current: options.pageIndex,
    plugins: [plugin, ...plugins],
  });

  return {
    ...returnValue,
    tableProps: {
      ...tableProps,
      openPagination: true,
      paginationProps,
    },
  };
};
```

### 扩展插件

如果插件返回的 props 跟你 table 定义的 props 不一致的话，假设 filter 插件返回的 `filterParams` 不符合，应该是 `filters` 的话，可以这样子处理。

```js
const useMyFilterPlugin = (options) => {
  const plugin = useFilterPlugin(options);
  return {
    middlewares: plugin.middlewares,
    props: (ctx) => {
      const props = plugin.props(ctx);
      return {
        ...props,
        tableProps: {
          ...props.tableProps,
          filters: tableProps.filterParams,
        },
      };
    },
  };
};
```

这样子你就可以为你的 Design 定制一套具备插件能力的 Table。
