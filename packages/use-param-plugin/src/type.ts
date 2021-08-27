import { TableNormalPlugin, Obj } from '@ahooksjs/use-table';

export interface IUseParamPlugin {
  (transform?: (params: Obj) => any): TableNormalPlugin;
}
