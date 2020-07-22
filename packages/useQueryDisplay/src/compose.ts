/**
 * 参考 koa 的中间件和 redux 中间件
 */
import { isPromise, isFunction } from './checker';
import msg from './msg';

export interface IComposer {
  onionCompose: (middlewares: any[]) => (context: any, next?: () => Promise<any>) => Promise<any>;
  pipeCompose: (pipes: any[]) => (arg: any) => any;
  reducedCompose: (props: any[]) => { [name: string]: any };
  processCompose: (processors: Function[]) => (context?: any) => { [name: string]: any };
  pipeMergedCompose: (
    props: any[],
    fn?: (res: any, prop?: {}, rawProp?: {}, initial?: boolean) => any,
  ) => {};

  mergedCompose: (
    props: { [name: string]: any },
    fn?: (res: any, prop?: {}, rawProp?: {}, initial?: boolean) => any,
  ) => any;

  timelineCompose: (
    timelines: string[],
    native: { [name: string]: any },
    extension?: { [name: string]: any },
  ) => any[];
}

// Koa 洋葱模型
export const onionCompose: IComposer['onionCompose'] = middlewares => (context, next) => {
  let index = -1;
  return dispatch(0);
  function dispatch(i: number) {
    if (i <= index) {
      return Promise.reject(new Error('next() 被调用多次'));
    }
    index = i;
    let fn = middlewares[i];
    if (i === middlewares.length) fn = next;
    if (!fn) return Promise.resolve();

    const called = fn(context, () => dispatch(i + 1));

    if (isPromise(called)) {
      return called;
    }
    throw msg.PROMISE_ERROR;
  }
};

// 类似 Redux 的 pipe 模型
export const pipeCompose: IComposer['pipeCompose'] = (pipes = []) => {
  if (pipes.length === 0) {
    return arg => arg;
  }

  if (pipes.length === 1) {
    return isFunction(pipes[0]) ? pipes[0] : ctx => ({ ...ctx, ...pipes[0] });
  }

  return pipes
    .map(pipe => {
      return isFunction(pipe) ? pipe : ctx => ({ ...ctx, ...pipe });
    })
    .reduceRight((next, current) => (ctx: any) => {
      return next(current(ctx));
    });
};

export const processCompose: IComposer['processCompose'] = (processors = []) => (context = {}) => {
  processors.forEach(processor => {
    processor(context);
  });

  return context;
};

// 合并 prop
export const reducedCompose: IComposer['reducedCompose'] = props =>
  props.reduce(
    (acc, prop) => ({
      ...acc,
      ...prop,
    }),
    {},
  );

export const mergedCompose: IComposer['mergedCompose'] = (props, fn = (key, res) => res) =>
  props.reduce((acc: { [name: string]: any }, prop: { [name: string]: any }) => {
    Object.keys(prop).forEach(key => {
      if (!acc[key]) {
        acc[key] = fn(key, prop[key], true);
      } else {
        // 出现冲突的话，也就是两个 key 一致的话，返回的是数组
        acc[key] = fn(
          key,
          Array.isArray(acc[key]) ? acc[key].concat(prop[key]) : [acc[key], prop[key]],
          false,
        );
      }
    });
    return acc;
  }, {});

export const pipeMergedCompose: IComposer['pipeMergedCompose'] = (
  props,
  fn = (key, res) => res,
) => {
  const { pipes, merged = [] } = props.reduce(
    (acc, prop) => {
      if (isFunction(prop)) {
        acc.pipes.push(prop);
      } else {
        acc.merged.push(prop);
      }
      return acc;
    },
    { pipes: [], merged: [] },
  );

  return pipeCompose(pipes)(mergedCompose(merged, fn));
};

export const timelineCompose: IComposer['timelineCompose'] = (timelines, native, extension = {}) =>
  timelines.reduce((acc, timeline) => {
    if (native[timeline] && extension[timeline]) {
      return acc.concat(native[timeline], extension[timeline]);
    }
    if (native[timeline]) {
      return acc.concat(native[timeline]);
    }
    if (extension[timeline]) {
      return acc.concat(extension[timeline]);
    }
    return acc;
  }, []);

export default {
  onionCompose,
  timelineCompose,
  pipeCompose,
  pipeMergedCompose,
  processCompose,
  mergedCompose,
  reducedCompose,
};
