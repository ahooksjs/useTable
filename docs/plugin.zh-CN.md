---
title: 插件开发
order: 1
group:
  title: 进阶
  path: /advance
  order: 100
legacy: /advance/plugin
---

## 背景

具体的背景可以看[缘由](../why)

## 概念

插件其实是对于一个功能的垂直解决方案，插件具备下面几个能力

| 能力         | 备注                                                                                                         | 方案                |
| ------------ | ------------------------------------------------------------------------------------------------------------ | ------------------- |
| 管理状态     | 比如多选需要管理 selectedKey                                                                                 | Hook                |
| 管理请求链路 | 比如多选的时候请求之后需要取消 selectedKey，还有设置异步默认值的时候可以控制请求什么时候触发，还有设置参数。 | Koa Middleware      |
| 注入 Props   | 比如多选的时候需要监听事件还有其他属性注入到 table 组件上                                                    | Object Pipe/Compose |

具体可以举一个例子来讲解：

## 场景

服务端驱动的场景，Table 的 `primaryKey`、`columns` 数据是根据后端吐出来的。我们需要做的事情有下面三步

- 解析返回值；
- 获取需要的 Props；
- 设置到对应 TableProps 或者让用户自定义；

这几个操作其实是一个功能，我们可以抽离出一个插件 `useResponsePlugin`。下面我们逐步实现自定义插件：

#### 解析返回值

我们可以通过中间件的方式获取到 response

```js
const useResponsePlugin = () => {
  return {
    middlewares: async (ctx, next) => {
      await next();
      // 这里获取到 response，并且解析
      console.log(ctx.response);
    },
  };
};
```

#### 获取 props

因为插件整体是一个 hook，所以你可以使用 useRef 的方式存储解析后的 response。

```js
const useResponsePlugin = {
  const response = useRef();

  return {
    middlewares: async (ctx, next) => {
      await next();
      // 这里获取到 response
      response.current = ctx.response;
    }
  }
}
```

#### 暴露 props

useTable 提供了可以自动合并 table props 的能力还有暴露方法给外界。

```js
const useResponsePlugin = {
  const response = useRef({});

  return {
    middlewares: async (ctx, next) => {
      await next();
      // 这里获取到 response
      response.current = ctx.response;
    },
    props: {
      tableProps: {
        primaryKey: response.current.primaryKey,
      },
      getColumns: () => response.current.columns,
    }
  }
}
```

#### 使用

```js
const Component = () => {
  const { tableProps, getColumns } = useTable(list, { plugins: [useResponsePlugin()] });
  return (
    <Fragment>
      <Table {...tableProps}>
        {getColumns().map((col) => {
          return <Table.Column {...col} />;
        })}
      </Table>
    </Fragment>
  );
};
```

整体的例子可以看下面的 codesandbox。

<code src="./demo2.tsx" inline />

通过一个例子简单了解了如何自定义插件，下面我们看看插件整体设计细节。

## 设计细节

下面伪代码展示一下

```js
const usePlugin = () => {
  const [state, setState] = useState();
  return {
    middlewares: (ctx, next) => {},
    props: (ctx) => {},
  };
};
```

#### 概览

插件整体是一个 Hook，只是你需要返回一些特定的接口来作为集成。你可以在插件里面使用任何 Hook，比如 useState 等。两个重要的概念 `Middlewares` 和 `Props` 需要重点了解。

#### Middlewares

这个是 Koa 的洋葱模型，可以方便你设置参数，也可以方便你在请求前做一些处理，请求后做一些处理，写法跟你在写 Koa Middleware 一样。可以通过 ctx 来修改参数和返回值，具体定义可看 [Ctx](#ctx)。

```js
// 请求之前
const useWillQueryPlugin = () => {
  return {
    middlewares: (ctx, next) => {
      // 可以获取参数
      // 这里处理请求前的处理
      ctx.params = { ...ctx.params };
      return next();
    },
  };
};

// 请求之后
const useDidQueryPlugin = () => {
  return {
    middlewares: (ctx, next) => {
      return next().then(() => {
        // 请求之后做的处理，比如处理一些状态设置或者返回数据处理
        ctx.response = { ...ctx.response };
      });
    },
  };
};
```

#### Props

props 有两个功能，分别是

- 自动合并 table、 form、pagination 的 props；
- 暴露功能到外界，可以让外界使用，比如一些获取的数据；

```js
const usePlugin = {
  props: (ctx) => {
    return {
      tableProps: {},
      formProps: {},
      paginationProps: {},
      // 其他的，名字随意
      foo: {},
    };
  },
};
```

tableProps、formProps、paginationProps 这三个是特殊的属性，useTable 会检测并且合并到对应的 props 上。下面举一个例子

```js
const usePlugin = () => {
  return {
    props: () => ({
      tableProps: {
        test: 1,
      },
      name: 'ahooks',
    }),
  };
};

const { tableProps, name } = useTable(service, { plugins: [usePlugin()] });

// 这个时候 tableProps 的 test 属性为 1，还有 name 就是 usePlugin 暴露的 ahooks
```

formProps、paginationProps 以此类推。

#### Ctx

这个是 middlewares 和 props 的 ctx interface 定义

```js
interface ICtx {
  // 元信息
  meta: {
    // 请求的来源，有可能是点击查询，有可能是重置等等
    queryFrom: string,
  };
  // 设置状态 & 重新渲染
  actions: object;
  // 每一次请求要缓存的数据
  store: object;
  // 可以手动触发请求
  query: (params?: object) => Promise<IResponse>;
  // 请求参数
  params: object;
  // 响应数据
  response: IResponse;
}
```

**queryFrom**

| queryFrom          | 说明                           | 提供者                    |
| ------------------ | ------------------------------ | ------------------------- |
| `onMount`          | 表示是 Table mount 的时候触发  | `useTable`                |
| `onPageSizeChange` | 表示是切换 pageSize 的时候触发 | `useTable & useFormTable` |
| `onPageChange`     | 表示是切换当前页的时候触发     | `useTable & useFormTable` |
| `onFormSubmit`     | 表示是点击查询的时候触发       | `useFormTable`            |
| `onFormReset`      | 表示是点击重置的时候触发       | `useFormTable`            |
| `onFormMount`      | 表示是点击重置的时候触发       | `useFormTable`            |

**store**

| 属性       | 说明                                                  | 提供者                    |
| ---------- | ----------------------------------------------------- | ------------------------- |
| `stateMap` | 提供 set & get 方法，set 的时候会自动合并上一次 state | `useTable & useFormTable` |
| `paramMap` | 提供 set & get 方法，set 会直接覆盖                   | `useTable & useFormTable` |
