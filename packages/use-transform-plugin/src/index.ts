import { TUseTransformPlugin, FilterType, TFilterType, IFilterFunction } from './type';

const isObject = (val) => ({}.toString.call(val) === '[object Object]');
const isFunction = (val) => ({}.toString.call(val) === '[object Function]');

export const createTransformer = (filter, mapper = (key, res) => res) => {
  const transformer = (params) =>
    Object.keys(params).reduce((acc, key) => {
      const value = params[key];
      if (filter(value, key, params)) {
        return acc;
      } else {
        return { ...acc, ...mapper(key, { [key]: isObject(value) ? transformer(value) : value }) };
      }
    }, {});

  return transformer;
};

export const removeUndefined = createTransformer((value) => value === undefined);
export const removeEmpty = createTransformer((value) => value === '');
export const removeNull = createTransformer((value) => value === null);
export const trim = createTransformer(
  () => false,
  (key, data) => {
    if (typeof data[key] === 'string') {
      return { [key]: data[key].trim() };
    } else {
      return data;
    }
  }
);

const transformers = {
  [FilterType.EMPTY]: removeEmpty,
  [FilterType.UNDEF]: removeUndefined,
  [FilterType.NULL]: removeNull,
  [FilterType.TRIM]: trim,
};

const compose = (fns) => {
  return (initialValues) =>
    fns.reduce((values, fn) => {
      return fn(values);
    }, initialValues);
};

const useTransfromPlugin: TUseTransformPlugin = ({ filter: name }) => ({
  middlewares: {
    willQuery: (ctx, next) => {
      const { params } = ctx;
      const nativeFilter = Array.isArray(name)
        ? compose(name.map((n) => transformers[n]))
        : transformers[name as TFilterType];

      const filter = isFunction(name) ? createTransformer(name as IFilterFunction) : nativeFilter;
      ctx.params = filter(params);

      return next();
    },
  },
});

export default useTransfromPlugin;
