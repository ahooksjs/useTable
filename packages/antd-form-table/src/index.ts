import useFormTable, { Obj, IResponse, Options } from '@ahooksjs/use-form-table';
import { useAntdTablePlugin } from '@ahooksjs/antd-table';

const useAntdFormTable = (service: (params: Obj) => Promise<IResponse>, options?: Options) => {
  const antdTablePlugin = useAntdTablePlugin();
  const plugins = options?.plugins || [];
  const props = useFormTable(service, {
    ...options,
    plugins: [...plugins, antdTablePlugin],
  });

  return props;
};

export * from '@ahooksjs/use-form-table';
export default useAntdFormTable;
