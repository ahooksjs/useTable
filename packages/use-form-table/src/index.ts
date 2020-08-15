import { useMemo } from 'react';
import useTable, {
  IResponse,
  Options,
  TableNormalPlugin,
  IReturnValue,
  WILL_QUERY,
} from '@ahooksjs/use-table';
import { createFormActions, IFormEffect, ISchemaFormActions } from '@formily/react-schema-renderer';
import { IS_FORM_DATA_SUBMITTED } from './symbol';
import { methods } from './config';
import pipes from './pipe/index';

export * from '@ahooksjs/use-table';

const useFormTablePlugin: () => TableNormalPlugin = () => {
  const actions: ISchemaFormActions = useMemo(createFormActions, []);

  return ({ app }) => ({
    middlewares: {
      [WILL_QUERY]: (ctx, next) => {
        ctx.methods = { ...ctx.methods, ...methods };
        ctx.actions = { ...ctx.actions, ...actions };
        const { helper } = ctx;
        const { pipeCompose } = helper;
        const { params } = pipeCompose(pipes)({ ...ctx });

        ctx.params = params;
        return next();
      },
    },
    props: (pluginProps) => {
      const { formProps = {} } = pluginProps || {};
      const { helper } = app;
      const theFormProps = Array.isArray(formProps) ? formProps : [formProps];
      const { effects = () => ({}), ...formPropsOfPlugins } = helper.pipeCompose(theFormProps)({});

      return {
        ...pluginProps,
        formProps: {
          actions,
          effects: ($, ...args) => {
            $(methods.ON_FORM_SUBMIT).subscribe((payload) => {
              return app.query(
                { ...payload.values, current: app.ctx.options.current },
                { [IS_FORM_DATA_SUBMITTED]: true, queryFrom: methods.ON_FORM_SUBMIT }
              );
            });

            $(methods.ON_FORM_RESET).subscribe((payload) => {
              return app.query(
                { ...payload.values, current: app.ctx.options.current },
                { [IS_FORM_DATA_SUBMITTED]: true, queryFrom: methods.ON_FORM_RESET }
              );
            });

            effects($, ...args);
          },
          ...formPropsOfPlugins,
        },
      };
    },
  });
};

export type Effects = IFormEffect<any, any>;

export interface IUseFormTableReturnValue extends IReturnValue {
  formProps: {
    effects: Effects;
    actions: ISchemaFormActions;
    [name: string]: any;
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
