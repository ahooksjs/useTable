import { IUseParamPlugin } from './type';

const getSearchParams = (transform = res => res) => {
  const obj = {};
  new URL(window.location.href).searchParams.forEach((v, key) => {
    obj[key] = v;
  });
  return transform(obj);
};

const useParamPlugin: IUseParamPlugin = transform => {
  return {
    middlewares: (ctx, next) => {
      const { actions, methods, meta } = ctx;
      const { queryFrom } = meta;

      if ([methods.ON_MOUNT, methods.ON_FORM_MOUNT].includes(queryFrom)) {
        const params = getSearchParams(transform);

        if (actions && actions.setFormState) {
          actions.setFormState(state => {
            const { values } = actions.getFormState();
            state.values = { ...params, ...values };
          });
        }
      }

      return next();
    },
  };
};

export default useParamPlugin;
