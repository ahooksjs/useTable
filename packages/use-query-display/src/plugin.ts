/**
 * 插件管理
 */

import { isObject, isMiddlewares, isFunction } from './checker';
import { Obj, Plugins } from './type';
import { IS_NATIVE_SYMBOL } from './symbol';

const combineMiddlewares = (a: Obj, b: Obj) => {
  return Object.keys(b).reduce((acc: Obj, timeline) => {
    if (a[timeline]) {
      acc[timeline] = a[timeline].concat(b[timeline]);
    } else {
      acc[timeline] = Array.isArray(b[timeline]) ? b[timeline] : [b[timeline]];
    }
    return acc;
  }, a);
};

/**
 * [1, [2, 4]] ==> [1, 2, 4]
 */
function flat(enhancers: any[]): any[] {
  return enhancers
    .filter((e) => e)
    .reduce(
      (flatted, enhancer) => flatted.concat(Array.isArray(enhancer) ? flat(enhancer) : enhancer),
      []
    );
}

const createStore = () => {
  let $store: Obj = {};

  return {
    get: () => $store,
    set: (store: any) => {
      $store = store;
    },
  };
};

const createPluginManager = () => {
  const plugins: Plugins = {
    middlewares: {},
    props: [],
  };

  const getPlugins = () => plugins;
  const contextStore = createStore();

  const use = (...rawEnhancers: any[]) => {
    const enhancers = flat(rawEnhancers) || [];

    // 插件能力聚合
    enhancers.forEach(($enhancer) => {
      const isNative = !isObject($enhancer);
      const enhancer = isNative ? $enhancer(contextStore.get()) : $enhancer;

      Object.keys(enhancer).forEach((key) => {
        if (isMiddlewares(key)) {
          const middlewares = enhancer[key];
          if (isObject(middlewares)) {
            plugins.middlewares = combineMiddlewares(plugins.middlewares, middlewares);
          }
        } else if (plugins[key]) {
          // native plugin 的 props 字段一定是一个函数
          if (isFunction(enhancer[key])) {
            // 先打一个标
            enhancer[key][IS_NATIVE_SYMBOL] = isNative;
          }
          plugins[key].push(enhancer[key]);
        }
      });
    });
  };

  const pureUse = (...rawEnhancers: any[]) => {
    plugins.middlewares = {};
    plugins.props = [];
    use(rawEnhancers);
  };

  return { pureUse, use, getPlugins, get: getPlugins, contextStore, context: contextStore };
};

export default createPluginManager;
