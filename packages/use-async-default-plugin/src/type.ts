import { FormTableNormalPlugin } from '@ahooksjs/use-table';

type TQuery = () => Promise<any>;

export interface IOptions {
  query: TQuery | TQuery[];
  field: string | string[];
  isDefault?: boolean;
  setDefaultValue?: (data: IEnum[], name: string) => any;
}

export type TUseAsyncDefaultPlugin = (params: IOptions) => FormTableNormalPlugin;

interface IEnum {
  label: string;
  value: any;
}

export type IGetValue = (data: IEnum[], name: string) => string;
