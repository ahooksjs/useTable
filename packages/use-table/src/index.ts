import { useMemo, useCallback } from 'react';
import useQueryDisplay from '@ahooksjs/use-query-display';
import { timelines, defaults, methods, PREPARE, WILL_QUERY } from './config';
import createStore from './store';
import middlewares from './middlewares/index';
import propProcessors from './props/index';
import { RawPlugins, Plugin, IContext, TUseTable } from './type';
import { addYourMiddlewares } from './shared';
import { IS_NORMAL_SYMBOL } from './symbol';
import { checkQueryFrom } from './helper';
import { useMutableState, useMount, useUpdateEffect, usePersistFn } from './use';

export * from './type';

export { PREPARE, WILL_QUERY, IS_NORMAL_SYMBOL, methods };

const useTablePlugin = (options): Plugin => {
  const [state, setState] = useMutableState({
    loading: false,
    dataSource: [],
    total: 0,
    pageSize: options.pageSize,
    current: options.current,
  });

  const store = useMemo(createStore, []);
  const getState = useCallback(() => state, [state]);
  const actions = { getState, setState };

  return ({ app }) => {
    return {
      middlewares: {
        [PREPARE]: (ctx, next) => {
          const { helper, query } = app;
          const isNormal = !!ctx.meta.queryFrom;

          ctx.store = store;
          ctx.query = query;
          ctx.actions = actions;
          ctx.options = options;
          ctx.methods = methods;
          ctx.meta = { ...ctx.meta, [IS_NORMAL_SYMBOL]: isNormal };
          ctx.helper = {
            ...helper,
            checkQueryFrom: () => checkQueryFrom(ctx as IContext),
          };

          return next();
        },
        ...middlewares,
      },

      // 返回 props
      props: (props) => {
        const { helper } = app;
        return helper.processCompose(propProcessors)({
          options,
          props,
          store,
          actions,
          helper,
          app,
        });
      },
    };
  };
};

const useTable: TUseTable = (service, options) => {
  const {
    plugins = [],
    current = defaults.current,
    pageSize = defaults.pageSize,
    refreshDeps = [],
  } = options || {};

  const plugin: RawPlugins = [useTablePlugin({ ...options, current, pageSize })];
  const persistedService = usePersistFn(service);
  const { props: tableQueryProps = {}, query } = useQueryDisplay(
    { timelines: [PREPARE].concat(timelines), ...options, service: persistedService },
    plugin.concat(addYourMiddlewares(plugins))
  );

  useMount(() => {
    query({}, { queryFrom: methods.ON_MOUNT });
  });

  useUpdateEffect(() => {
    query({}, { queryFrom: methods.ON_REFRESH_DEPS });
  }, refreshDeps);

  const { tableProps: $tableProps, getParams, actions, props } = tableQueryProps;
  const { paginationProps, ...tableProps } = $tableProps;

  return { actions, ...props, tableProps, paginationProps, query, getParams };
};

export default useTable;
