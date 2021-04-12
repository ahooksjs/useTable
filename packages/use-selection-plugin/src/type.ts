import { TableNormalPlugin } from '@ahooksjs/use-table';

export interface IOptions {
  primaryKey?: string;
  defaultSelectedRowKeys?: string[];
  checkIsNeedReset?: (ctx) => boolean;
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
  setSelectedRowKeys: (selectedRowKeys: string[]) => void;
}

export type TUseTableSelection = (options?: IOptions) => TableNormalPlugin<IProps>;
