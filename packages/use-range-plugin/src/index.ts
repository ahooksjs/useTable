import { methods } from '@ahooksjs/use-form-table';
import { TUseRangePlugin } from './type';

const useRangePlugin: TUseRangePlugin = () => {
  return {
    middlewares: (ctx, next) => {
      const { actions } = ctx;
      if (ctx.meta.queryFrom === methods.TO_RESET_FORM) {
        const { initialValues, values } = actions.getFormState();
        ctx.actions.setFormState((state) => {
          state.values = initialValues;
        });

        ctx.params = Object.keys(ctx.params).reduce((acc, key) => {
          const isNotInInitialValues = values[key] && !initialValues[key];
          return isNotInInitialValues
            ? acc
            : { ...acc, [key]: initialValues[key] || ctx.params[key] };
        }, {});
      } else {
        ctx.params = {
          ...ctx.store.paramMap.get(),
          ...ctx.params,
        };
      }
      return next();
    },
    props: (ctx) => {
      return {
        resetAndQuery: (params) => {
          return ctx.query({ ...params, current: 1 }, { queryFrom: methods.TO_RESET_FORM });
        },
      };
    },
  };
};

export default useRangePlugin;
