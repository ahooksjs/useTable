import { TableNormalPlugin } from '@ahooksjs/use-table';

export interface IOptions {
  sortByKey?: string;
  sortOrderKey?: string;
  resetWhenQuery?: boolean;
  defaultValue?: { [name: string]: 'desc' | 'asc' };
}

export type TUseSortablePlugin = (options?: IOptions) => TableNormalPlugin;
