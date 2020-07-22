export interface IChecker {
  isFunction: (func: any) => boolean;
  isMiddlewares: (props: string) => boolean;
  isString: (str: any) => boolean;
  isObject: (obj: any) => boolean;
  isPromise: (obj: any) => boolean;
  isUndefined: (obj: any) => boolean;
  isASCPResponse: (obj: any) => boolean;
}

export const isUndefined: IChecker['isUndefined'] = obj => typeof obj === 'undefined';

export const isFunction: IChecker['isFunction'] = func => typeof func === 'function';

export const isMiddlewares: IChecker['isMiddlewares'] = prop => prop === 'middlewares';

export const isObject: IChecker['isObject'] = obj => ({}.toString.call(obj) === '[object Object]');

export const isString: IChecker['isString'] = obj => ({}.toString.call(obj) === '[object String]');

export const isPromise: IChecker['isPromise'] = obj => {
  return (
    !!obj &&
    (typeof obj === 'object' || typeof obj === 'function') &&
    typeof obj.then === 'function'
  );
};

export const isASCPResponse: IChecker['isASCPResponse'] = (res = { data: [] }) => {
  const { data } = res;
  return Array.isArray(data) || (isObject(data) && Array.isArray(data.dataSource));
};

export default {
  isFunction,
  isMiddlewares,
  isPromise,
  isObject,
  isUndefined,
  isASCPResponse,
  isString,
};
