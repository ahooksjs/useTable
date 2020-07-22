/**
 * 能力
 * 1. 请求链路上：`参数管理` --> `发起请求` --> `请求完成` --> `页面渲染`
 * 2. 合并插件能力 (middlewares & props)
 * 3. 暴露哪些 props
 */
import { useMemo, useRef } from 'react';
import createPluginManager from './plugin';
import composer, {
  pipeMergedCompose,
  onionCompose,
  timelineCompose,
} from './compose';
import checker, { isFunction } from './checker';
import { PAYLOAD_SYMBOL, REQUEST_SYMBOL } from './symbol';
import { Obj, IApp, IRequest, RawPlugins, Plugins } from './type';

export * from './type';

export { PAYLOAD_SYMBOL, REQUEST_SYMBOL };

const useInit = fn => {
  const ref = useRef(true);
  if (ref.current) {
    ref.current = false;
    fn();
  }
};

// 请求中间件化
const createQuery = (ctx: IApp['ctx'], plugins: Plugins): IApp['query'] => (
  payload,
  meta = {},
) => {
  ctx[PAYLOAD_SYMBOL] = payload;
  ctx.meta = meta;

  return onionCompose(
    timelineCompose(ctx[REQUEST_SYMBOL].timelines, plugins.middlewares || []),
  )(ctx);
};

const usePlugin = (pluginContext: {
  app: IApp;
  rawPlugins?: RawPlugins;
  props?: Obj;
  plugins?: Plugins;
}): Obj => {
  const plugin = useMemo(createPluginManager, []);

  useInit(() => {
    plugin.context.set(pluginContext);
  });
  plugin.pureUse(pluginContext.rawPlugins);

  const plugins = useMemo(plugin.get, []);
  // 只有第一个 props 优先级最高，因为它是 Native plugin props
  const pluginsProps = plugins.props.slice(0, 1).concat(
    plugins.props.slice(1).map(p => {
      return isFunction(p) ? p(pluginContext.app.ctx) : p;
    }),
  );
  const props = pipeMergedCompose(pluginsProps);

  pluginContext.plugins = plugins;
  pluginContext.props = props;

  return pluginContext;
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
    [],
  );

  const { props, plugins } = usePlugin({ rawPlugins, app });
  const query = useMemo(() => createQuery(app.ctx, plugins), [
    plugins,
    request,
  ]);
  app.query = query;

  return { props, plugins, query };
};

export default useQueryDisplay;
