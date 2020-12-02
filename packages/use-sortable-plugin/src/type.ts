import { TableNormalPlugin } from '@ahooksjs/use-table';

export interface IOptions {
  sortByKey?: string;
  sortOrderKey?: string;
  resetWhenQuery?: boolean;
}

export type TUseSortablePlugin = (options?: IOptions) => TableNormalPlugin;
