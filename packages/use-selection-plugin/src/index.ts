import { useState } from 'react';
import { IOptions, TUseTableSelection } from './type';

export { IOptions, TUseTableSelection };

const useTableSelectionPlugin: TUseTableSelection = (options: IOptions = {}) => {
  const [state, setSelectedRowKeys] = useState({
    selectedRowKeys: options.defaultSelectedRowKeys || [],
  });

  const { primaryKey = 'id', checkIsNeedReset = () => true } = options;

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

  const $setSelectedRowKeys = (selectedRowKeys) => {
    setSelectedRowKeys({ selectedRowKeys });
  };

  return {
    middlewares: (ctx, next) => {
      const isNeedReset = checkIsNeedReset(ctx);
      const { meta, methods } = ctx;
      const { queryFrom } = meta;

      if (isNeedReset) {
        return next().then(() => {
          if (![methods.ON_MOUNT, methods.ON_FORM_MOUNT].includes(queryFrom)) {
            setSelectedRowKeys({ selectedRowKeys: [] });
          }
        });
      }

      return next();
    },
    props: () => {
      return {
        tableProps: {
          rowSelection: {
            onSelect,
            onSelectAll,
            selectedRowKeys: state.selectedRowKeys,
          },
          primaryKey,
        },
        getSelectedRowKeys,
        setSelectedRowKeys: $setSelectedRowKeys,
      };
    },
  };
};

export default useTableSelectionPlugin;
