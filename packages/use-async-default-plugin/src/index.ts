import { useRef } from 'react'
import { FormPath, IFieldState } from '@formily/react';
import { methods } from '@ahooksjs/use-table';
import { TUseAsyncDefaultPlugin, IGetValue } from './type';

const getValue: IGetValue = (data) => {
  if (Array.isArray(data)) {
    if (data && data.length) {
      return data[0].value;
    }
    return '';
  }
  return data;
};

/**
 * 1. 等待筛选框相关异步请求返回
 * 2. 获取返回数据，并取第一个值
 * 3. 将入参带入 query
 */
const useAsyncDefaultPlugin: TUseAsyncDefaultPlugin = (options) => {
  const asyncDefaultRef = useRef({});

  return {
    middlewares: (ctx, next) => {
      const { query, field, isDefault = true, setDefaultValue = getValue } = options;
      const { actions, meta } = ctx;
      const { queryFrom } = meta;

      if (queryFrom === methods.ON_MOUNT) {
        let queries;
        let fields;

        if (!Array.isArray(query)) {
          queries = [query];
          fields = [field];
        } else {
          queries = query;
          fields = field;
        }

        return Promise.all(queries.map((q) => q()))
          .then((res: any[]) => {
            const initialValues = fields.reduce((values, name, $index) => {
              const data = res[$index].data;

              return {
                ...values,
                [name]: setDefaultValue(data, name),
                ...ctx.params,
              };
            }, {});

            if (isDefault) {
              ctx.params = {
                ...initialValues,
                ...ctx.params,
              };

              actions.setFormState((state) => {
                const { values } = actions.getFormState();
                state.initialValues = { ...values, ...initialValues };
                asyncDefaultRef.current = state.initialValues;
              });
            }

            return actions.setFieldState(
              FormPath.match(`*(${fields.join(',')})`),
              (state: IFieldState) => {
                const $res = res[fields.indexOf(state.name)];
                const { data } = $res;
                if (isDefault) {
                  state.value = initialValues[state.name];
                }
                state.value = initialValues[state.name];
                state.props.enum = data;
              }
            );
          })
          .then(next);
      }

      ctx.params = { ...asyncDefaultRef.current, ...ctx.params };

      return next();
    },
  };
};

export default useAsyncDefaultPlugin;
