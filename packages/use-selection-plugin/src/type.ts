import { TableNormalPlugin } from '@ahooksjs/use-table';

export interface IOptions {
  primaryKey?: string;
}

export interface IProps {
  tableProps: {
    rowSelection: {
      onSelect: (selected: boolean, record: any[], records: any[]) => void;
      onSelectAll: (selected: boolean, records: any[]) => void;
      selectedRowKeys: string[];
    };
    primaryKey: string;
  };
  getSelectedRowKeys: () => string[];
}

export type TUseTableSelection = (options?: IOptions) => TableNormalPlugin<IProps>;
