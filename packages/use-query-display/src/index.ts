/**
 * 能力
 * 1. 请求链路上：`参数管理` --> `发起请求` --> `请求完成` --> `页面渲染`
 * 2. 合并插件能力 (middlewares & props)
 * 3. 暴露哪些 props
 */
import { useMemo, useRef } from 'react';
import createPluginManager from './plugin';
import composer, { pipeMergedCompose, onionCompose, timelineCompose } from './compose';
import checker, { isFunction } from './checker';
import { PAYLOAD_SYMBOL, REQUEST_SYMBOL } from './symbol';
import { Obj, IApp, IRequest, RawPlugins, Plugins } from './type';
import { IS_NATIVE_SYMBOL } from './symbol';

export * from './type';

export * from './checker';

export { PAYLOAD_SYMBOL, REQUEST_SYMBOL };

const useInit = (fn) => {
  const ref = useRef(true);
  if (ref.current) {
    ref.current = false;
    fn();
  }
};

// 请求中间件化
const createQuery = (ctx: IApp['ctx'], plugins: Plugins): IApp['query'] => (payload, meta = {}) => {
  ctx[PAYLOAD_SYMBOL] = payload;
  ctx.meta = meta;

  return onionCompose(timelineCompose(ctx[REQUEST_SYMBOL].timelines, plugins.middlewares || []))(
    ctx
  );
};

const usePlugin = (pluginManagerContext: {
  app: IApp;
  rawPlugins?: RawPlugins;
  props?: Obj;
  plugins?: Plugins;
}): Obj => {
  const pluginManager = useMemo(createPluginManager, []);

  useInit(() => {
    pluginManager.context.set(pluginManagerContext);
  });
  // 每次执行都重新计算插件
  pluginManager.pureUse(pluginManagerContext.rawPlugins);
  const plugins = useMemo(pluginManager.get, []);

  const pluginsProps = plugins.props
    .filter((prop) => {
      return prop[IS_NATIVE_SYMBOL];
    })
    .reverse()
    .concat(
      plugins.props.reduce((acc, prop) => {
        if (prop[IS_NATIVE_SYMBOL]) {
          return acc;
        } else {
          return acc.concat(isFunction(prop) ? prop(pluginManagerContext.app.ctx) : prop);
        }
      }, [])
    );

  const props = pipeMergedCompose(pluginsProps);

  pluginManagerContext.plugins = plugins;
  pluginManagerContext.props = props;

  return pluginManagerContext;
};

const useQueryDisplay = (request: IRequest, rawPlugins?: RawPlugins) => {
  const app: IApp = useMemo(
    () => ({
      query: () => Promise.resolve(),
      ctx: { [REQUEST_SYMBOL]: request },
      helper: {
        ...checker,
        ...composer,
      },
    }),
    []
  );

  const { props, plugins } = usePlugin({ rawPlugins, app });
  const query = useMemo(() => createQuery(app.ctx, plugins), [plugins, request]);
  app.query = query;
  app.ctx.query = query;

  return { props, plugins, query };
};

export default useQueryDisplay;
