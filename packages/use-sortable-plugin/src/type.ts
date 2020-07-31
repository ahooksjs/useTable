import { FormTableNormalPlugin } from '@ahooksjs/use-table';

export interface IOptions {
  sortByKey?: string;
  sortOrderKey?: string;
}

export type TUseSortablePlugin = (options?: IOptions) => FormTableNormalPlugin;
