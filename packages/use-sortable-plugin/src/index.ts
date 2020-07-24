import { useRef } from 'react';
import { IOptions, TUseSortablePlugin } from './type';

const needResetActions = ['onFormMount', 'onFormSubmit', 'onFormReset'];

const useSortablePlugin: TUseSortablePlugin = (options: IOptions = {}) => {
  const sort = useRef({});
  const {
    sortByKey = 'sortBy',
    sortOrderKey = 'sortOrder',
    multiple = false,
    transformer = res => res,
  } = options;

  const onSort = ctx => (dataIndex, order) => {
    const { query, params } = ctx;
    const { sortBy } = params;

    let sortParams;
    if (multiple) {
      sortParams = transformer({
        sortBy: {
          ...sortBy,
          [dataIndex]: order,
        },
      });
      sort.current = { ...sortBy, [dataIndex]: order };
    } else {
      sortParams = transformer({
        [sortByKey]: dataIndex,
        [sortOrderKey]: order,
      });
      sort.current = { [dataIndex]: order };
    }
    query({ ...sortParams, pageIndex: 1 });
  };

  const resetSort = ctx => {
    const { params, meta } = ctx;
    const { queryFrom } = meta;

    if (needResetActions.includes(queryFrom)) {
      if (multiple) {
        delete params.sortBy;
      } else {
        delete params[sortByKey];
        delete params[sortOrderKey];
      }
      sort.current = {};
    }
  };

  return {
    middlewares: (ctx, next) => {
      resetSort(ctx);
      return next();
    },
    props: ctx => ({
      tableProps: {
        sort: sort.current,
        onSort: onSort(ctx),
      },
    }),
  };
};

export default useSortablePlugin;
