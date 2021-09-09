---
title: 动机
order: 2
nav:
  title: 指南
  order: 1
---

## 背景

在中后台业务上`查询表格场景`很多，基本上占了 60% 左右，如何梳理一个通用解决方案来提效是我们现在面临的问题。另外一个问题就是虽然场景类似但是中后台业务场景变化不可预测，所以还需要提供一个灵活的可扩展机制来让更多人沉淀能力。

我们需要一个方案可以方便用户扩展 Filter、排序、多选等能力，同时也方便上层建设对应的解决方案，比如配置化、数据驱动。所以我们把每一个功能抽离出对应的插件，插件核心的理念是 `Write Once Do Everything` 也就是只写一个地方就可以处理一个功能，并且每个插件都是可以组合的。

## 案例

下面我列举我们这边业务经常遇到的场景，比如 `异步默认值` 和 `多选`。

#### 异步默认值

我们要实现的功能是“发一个请求取下拉数据 --> 取第一个值设置默认值 --> 表格请求参数要加上对应的默认值 --> 表格的请求才能发送”，并且在重置的时候要保留默认值。

#### 多选

如果你要实现一个多选的功能的话，你需要做几件事情

- 设置 Table 组件的 props，比如 rowSelection；
- 监听事件，比如 onChange；
- query 请求之后要清除选中项；

你会发现我们要做很多事情才能实现某个功能，如果只做一次还好，但是如果你每次开发都涉及多个页面的话那工作就会变得很枯燥了。

## 期望

我们期望上面说的功能都是独立的，可以先沉淀，需要的时候直接引用。下面先以伪代码呈现

```js
const asyncDefaultPlugin = useAsyncDefaultPlugin({ query: select, field: 'name' });
const selectionPlugin = useSelectionPlugin({ primaryKey: 'phone' });

const { formProps, tableProps, paginationProps, getSelectedRowKeys } = useNextFormTable(list, {
  plugins: [asyncDefaultPlugin, selectionPlugin],
});
```

看完前因后果，如果有兴趣的话可以看看[快速上手](./getting-started)。