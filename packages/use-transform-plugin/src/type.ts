import { TableNormalPlugin } from '@ahooksjs/use-form-table';

export type TFilterType = 'empty' | 'undef' | 'null' | 'trim';

export enum FilterType {
  EMPTY = 'empty',
  UNDEF = 'undef',
  NULL = 'null',
  TRIM = 'trim',
}

export interface IFilterFunction {
  (value: any, key: string, params: { [name: string]: any }): boolean;
}

export interface IOption {
  filter: TFilterType | TFilterType[] | IFilterFunction;
}

export type TUseTransformPlugin = (options: IOption) => TableNormalPlugin;
