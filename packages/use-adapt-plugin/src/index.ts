import { Obj, PAYLOAD_SYMBOL } from '@ahooksjs/use-table';

export const adaptParams = (params: Obj = {}, map = {}) => {
  return {
    ...Object.keys(params).reduce(
      (acc, key) => (map[key] ? acc : { ...acc, [key]: params[key] }),
      {}
    ),
    ...Object.keys(map).reduce((acc, key) => {
      return {
        ...acc,
        [map[key]]: params[key] || params[map[key]],
      };
    }, {}),
  };
};

export const deAdaptParams = (params: Obj = {}, map = {}) => {
  const deMap = Object.keys(map).reduce((acc, key) => ({ ...acc, [map[key]]: key }), {});
  return adaptParams(params, deMap);
};

export const deAdaptResponse = (response, map) => {
  return deAdaptParams(response, map);
};

export interface IUseAdaptOptions {
  map: {
    current?: string;
    pageSize?: string;
  };
}

const useAdaptPlugin = (options?: IUseAdaptOptions) => {
  const { map = {} } = options || {};
  const deMap = Object.keys(map).reduce((acc, key) => ({ ...acc, [map[key]]: key }), {});

  return {
    middlewares: (ctx, next) => {
      // 请求的时候会带上去
      /**
       * query({ current: 1 }) current 优先
       * query({ pageIndex: 1 }) pageIndex 优先
       */
      const params = Object.keys(ctx.params).reduce((acc, key) => {
        if (deMap[key]) {
          acc[deMap[key]] = ctx[PAYLOAD_SYMBOL][key];
        }
        return acc;
      }, ctx.params);

      ctx.params = adaptParams(params, map);
      return next().then(() => {
        ctx.params = deAdaptParams(params, map);
        ctx.response = {
          ...ctx.response,
          data: deAdaptResponse(ctx.response.data, map),
        };
      });
    },

    props: (ctx) => {
      return {
        getParams: () => {
          return adaptParams(ctx.store.paramMap.get(), map);
        },
      };
    },
  };
};

export default useAdaptPlugin;
