import { FormTableNormalPlugin, Copy } from '@ahooksjs/use-table';

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

declare global {
  export namespace UseTableCore {
    export interface PreReturnValue extends ReturnValue {
      [name: string]: any;
    }

    export interface ReturnValue extends Omit<UseTableCore.ReturnValue, 'tableProps'> {
      getSelectedRowKeys: IProps['getSelectedRowKeys'];
      tableProps: IProps['tableProps'] & PreReturnValue['tableProps'];
    }
  }
}

export type TUseTableSelection = (options?: IOptions) => FormTableNormalPlugin<IProps>;
