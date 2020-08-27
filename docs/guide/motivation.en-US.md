---
order: 2
nav:
  title: Guide
  order: 1
---

# Motivation

## Background

There are many scenarios for querying tables in the management system businesses, basically accounting for about 60%. How to find out a general solution to improve efficiency is a problem we are facing now. Another problem is that although the scenes are similar, the changes in the management system business scenes are unpredictable. We need to provide a flexible and extensible mechanism to allow more people to accumulate capabilities.

We need a solution that can facilitate users to expand filter, sort, selection and other capabilities, and also facilitate the construction of corresponding solutions at the upper level, such as configuration and data-driven. So we separate each function from the corresponding plugin. The core concept of the plugin is `Write One Do Everything`, that is, only a place can be written to resolve a feature, and you can compose each plugin.

## Examples

Below I list the scenarios that our business often encounters, such as `async default value` and `selection`.

#### Async Default Value

The feature we achieve is

- Fetching the dropdown dataSource
- Taking then first value and set the default value
- The params should be added with default value
- When reset, keep the default value

#### Selection

If you want to add a selection feature, you need to do several things

- Add Table props，for example `rowSelection`
- Add listener, for example `onChange`
- After the query to clear the selected item

You will find that we have to do a lot of things to add a feature,
it will become very boring to repeat it.

## Expectation

We expect the features mentioned above are independent, then we can implement, and import when needed. 

Something like that:

```js
const asyncDefaultPlugin = useAsyncDefaultPlugin({ query: select, field: 'name' });
const selectionPlugin = useSelectionPlugin({ primaryKey: 'phone' });

const { formProps, tableProps, paginationProps, getSelectedRowKeys } = useNextFormTable(list, {
  plugins: [asyncDefaultPlugin, selectionPlugin],
});
```

After reading it, you can take a look if you are interested in [Getting Started](./getting-started)。
