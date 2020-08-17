import { Obj } from '@ahooksjs/use-table';

export const adaptParams = (params: Obj = {}, map = {}) => {
  return {
    ...Object.keys(params).reduce(
      (acc, key) => (map[key] ? acc : { ...acc, [key]: params[key] }),
      {}
    ),
    ...Object.keys(map).reduce(
      (acc, key) => {
        return ({
          ...acc,
          [map[key]]: params[map[key]] || params[key],
        })
      },
      {}
    ),
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

  return {
    middlewares: (ctx, next) => {
      // 请求的时候会带上去
      ctx.params = adaptParams(ctx.params, map);
      return next().then(() => {
        ctx.params = deAdaptParams(ctx.params, map);
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
