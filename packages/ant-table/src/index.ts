import useTable, { Obj, IResponse, Options } from '@ahooksjs/use-table';
import useAntdTablePlugin from './plugin';

const useAntdTable = (service: (params: Obj) => Promise<IResponse>, options?: Options) => {
  const antdTablePlugin = useAntdTablePlugin();
  const plugins = options?.plugins || [];

  const props = useTable(service, {
    ...options,
    plugins: [antdTablePlugin, ...plugins],
  });

  return props;
};

export * from '@ahooksjs/use-table';

export default useAntdTable;
