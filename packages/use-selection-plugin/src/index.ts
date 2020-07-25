import { useState } from 'react';
import { IOptions, TUseTableSelection } from './type';

const useTableSelectionPlugin: TUseTableSelection = (options: IOptions = {}) => {
  const [state, setSelectedRowKeys] = useState({
    selectedRowKeys: [],
  });

  const { primaryKey = 'id' } = options;

  const handleSelect = (records: []) => {
    setSelectedRowKeys({
      selectedRowKeys: records.map((record) => record[primaryKey]),
    });
  };

  const onSelect = (selected: boolean, record: [], records: []) => {
    handleSelect(records);
  };

  const onSelectAll = (selected: boolean, records: []) => {
    handleSelect(records);
  };

  const getSelectedRowKeys = () => {
    return state.selectedRowKeys;
  };

  return {
    middlewares: (ctx, next) => {
      return next().then(() => {
        setSelectedRowKeys({ selectedRowKeys: [] });
      });
    },
    props: () => ({
      tableProps: {
        rowSelection: {
          onSelect,
          onSelectAll,
          selectedRowKeys: state.selectedRowKeys,
        },
        primaryKey,
      },
      getSelectedRowKeys,
    }),
  };
};

export default useTableSelectionPlugin;
