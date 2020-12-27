import { useState } from 'react';
import { IOptions, TUseTableSelection } from './type';

const useTableSelectionPlugin: TUseTableSelection = (options: IOptions = {}) => {
  const [state, setSelectedRowKeys] = useState({
    selectedRowKeys: [],
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

  return {
    middlewares: (ctx, next) => {
      const isNeedReset = checkIsNeedReset(ctx);

      if (isNeedReset) {
        return next().then(() => {
          // antd 那边好像只能用 key 的方式来决定唯一值
          ctx.response.data.dataSource = (ctx.response.data.dataSource || []).map((d) => {
            return { ...d, key: d[primaryKey] };
          });
          setSelectedRowKeys({ selectedRowKeys: [] });
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
      };
    },
  };
};

export default useTableSelectionPlugin;
