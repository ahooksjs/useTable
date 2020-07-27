import { FormTableNormalPlugin } from '@ahooksjs/use-table';

export interface IOptions {
  transformer?: (params: any, filterParams: any) => any;
}

export type TUseFilterPlugin = (options?: IOptions) => FormTableNormalPlugin;
