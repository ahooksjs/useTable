import { useRef } from 'react';
import { IOptions, TUseFilterPlugin } from './type';

export const FILTER_PLUGIN_SYMBOL = Symbol.for('FILTER_PLUGIN_SYMBOL');
const REFRESH_FILTER_METHOD = 'REFRESH_FILTER_METHOD';

const propsToParams = (props) => {
  return Object.keys(props).reduce((acc, key) => {
    return {
      ...acc,
      [key]: props[key].selectedKeys.join(','),
    };
  }, {});
};

const useFilterPlugin: TUseFilterPlugin = (options: IOptions = {}) => {
  const filterRef = useRef({});
  const { transformer = (res) => res, resetWhenQuery = true } = options;

  return {
    pluginType: FILTER_PLUGIN_SYMBOL,
    middlewares: (ctx, next) => {
      const { meta, methods } = ctx;
      const { queryFrom } = meta;

      if ([methods.ON_FORM_SUBMIT, methods.ON_FORM_RESET].includes(queryFrom) && resetWhenQuery) {
        filterRef.current = {};
      }

      const filterParams = propsToParams(filterRef.current);
      ctx.params = { ...ctx.params, ...transformer(filterParams, filterRef.current) };
      return next();
    },
    props: (ctx) => ({
      tableProps: {
        filterParams: filterRef.current,
        onFilter: (filterParams) => {
          const { query } = ctx;
          filterRef.current = filterParams;
          query({ current: 1 }, { queryFrom: REFRESH_FILTER_METHOD });
        },
      },
    }),
  };
};

export default useFilterPlugin;
