import { useMemo } from 'react';
import { createFormActions, IFormActions } from '@formily/react';
import useTable from '@ecojs/use-table';
import { IS_FORM_DATA_SUBMITTED } from './symbol';
import { methods } from './config';
import pipes from './pipe/index';

const useFormTablePlugin = () => {
  const actions: IFormActions = useMemo(createFormActions, []);

  return {
    middlewares: (ctx, next) => {
      ctx.actions = { ...ctx.actions, ...actions };
      const { helper } = ctx;
      const { pipeCompose } = helper;
      const { params } = pipeCompose(pipes)({ ...ctx });

      ctx.params = params;
      return next();
    },
    props: (ctx) => {
      return {
        formProps: {
          actions,
          effects: ($) => {
            $(methods.ON_FORM_SUBMIT).subscribe((payload) => {
              actions.setFormState(payload.values);
              return ctx.query(
                { ...payload.values, current: ctx.options.current },
                { [IS_FORM_DATA_SUBMITTED]: true, queryFrom: methods.ON_FORM_SUBMIT }
              );
            });

            $(methods.ON_FORM_RESET).subscribe((payload) => {
              actions.setFormState(payload.values);
              return ctx.query(
                { ...payload.values, current: ctx.options.current },
                { [IS_FORM_DATA_SUBMITTED]: true, queryFrom: methods.ON_FORM_RESET }
              );
            });
          },
        },
      };
    },
  };
};

const useFormTable = (service, options) => {
  const formTablePlugin = useFormTablePlugin();
  const plugins = [formTablePlugin].concat(options.plugins || []);
  return useTable(service, { ...options, plugins });
};

export default useFormTable;
