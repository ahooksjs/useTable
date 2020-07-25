import { FormTableNormalPlugin } from '@ahooksjs/use-table';

export interface IOptions {
  primaryKey?: string;
}

export type TUseTableSelection = (options?: IOptions) => FormTableNormalPlugin;
