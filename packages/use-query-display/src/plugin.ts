/**
 * 插件管理
 */

import { isObject, isMiddlewares } from './checker';
import { Obj, Plugins } from './type';

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
    .filter(e => e)
    .reduce(
      (flatted, enhancer) => flatted.concat(Array.isArray(enhancer) ? flat(enhancer) : enhancer),
      [],
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
    enhancers.forEach($enhancer => {
      const isNative = !isObject($enhancer);
      const enhancer = isNative ? $enhancer(contextStore.get()) : $enhancer;

      Object.keys(enhancer).forEach(prop => {
        if (isMiddlewares(prop)) {
          const middlewares = enhancer[prop];
          if (isObject(middlewares)) {
            plugins.middlewares = combineMiddlewares(plugins.middlewares, middlewares);
          }
        } else if (plugins[prop]) {
          plugins[prop].push(enhancer[prop]);
        }
      });
    });
  };

  const pureUse = (...rawEnhancers: any[]) => {
    plugins.middlewares = {};
    plugins.props = [];
    use(rawEnhancers);
  };

  return { pureUse, use, getPlugins, contextStore, context: contextStore, get: getPlugins };
};

export default createPluginManager;
