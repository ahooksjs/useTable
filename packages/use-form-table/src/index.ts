import { useMemo } from 'react';
import useTable, { IResponse, Options, TableNormalPlugin, IReturnValue } from '@ahooksjs/use-table';
import { createFormActions, IFormEffect, ISchemaFormActions } from '@formily/react-schema-renderer';
import { IS_FORM_DATA_SUBMITTED } from './symbol';
import { methods } from './config';
import pipes from './pipe/index';

export * from '@ahooksjs/use-table';

const useFormTablePlugin: () => TableNormalPlugin = () => {
  const actions: ISchemaFormActions = useMemo(createFormActions, []);

  return {
    middlewares: (ctx, next) => {
      ctx.methods = { ...ctx.methods, ...methods };
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
              return ctx.query(
                { ...payload.values, current: ctx.options.current },
                { [IS_FORM_DATA_SUBMITTED]: true, queryFrom: methods.ON_FORM_SUBMIT }
              );
            });

            $(methods.ON_FORM_RESET).subscribe((payload) => {
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

export type Effects = IFormEffect<any, any>;

export interface IUseFormTableReturnValue extends IReturnValue {
  formProps: {
    effects: Effects;
    actions: ISchemaFormActions;
  };
}

const useFormTable = (
  service: (params) => Promise<IResponse>,
  options?: Options
): IUseFormTableReturnValue => {
  const formTablePlugin = useFormTablePlugin();
  const plugins = [formTablePlugin, ...(options?.plugins || [])];
  return useTable(service, { ...options, plugins }) as IUseFormTableReturnValue;
};

export default useFormTable;

export { methods };
