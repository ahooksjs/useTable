import { useRef } from 'react';
import { IOptions, TUseFilterPlugin } from './type';

export const FILTER_PLUGIN_SYMBOL = Symbol.for('FILTER_PLUGIN_SYMBOL');

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
  const transformer = options.transformer || ((res) => res);

  return {
    pluginType: FILTER_PLUGIN_SYMBOL,
    middlewares: (ctx, next) => {
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
          query({ current: 1 });
        },
      },
    }),
  };
};

export default useFilterPlugin;
