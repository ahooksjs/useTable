import { FormTableNormalPlugin } from '@ahooksjs/use-table';

export interface IOptions {
  sortByKey?: string;
  sortOrderKey?: string;
  multiple?: boolean;
}

export type TUseSortablePlugin = (options?: IOptions) => FormTableNormalPlugin;
