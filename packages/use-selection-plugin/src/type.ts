import { FormTableNormalPlugin } from '@ahooksjs/use-table';

export interface IOptions {
  primaryKey?: string;
}

export type Copy<T> = {
  [P in keyof T]: T[P];
};

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

declare global {
  type TReturnValue = Copy<UseTableCore.ReturnValue>;
  export namespace UseTableCore {
    export interface ReturnValue extends TReturnValue {
      getSelectedRowKeys: IProps['getSelectedRowKeys'];
    }
  }
}

export type TUseTableSelection = (options?: IOptions) => FormTableNormalPlugin<IProps>;
