import { useRef } from 'react';
import { IOptions, TUseSortablePlugin } from './type';

const useSortablePlugin: TUseSortablePlugin = (options: IOptions = {}) => {
  const sort = useRef({});
  const { sortByKey = 'sortBy', sortOrderKey = 'sortOrder' } = options;

  const propsToParams = (props) => {
    return Object.entries(props).reduce((acc, val) => {
      const [dataIndex, order] = val;
      return { ...acc, [sortByKey]: dataIndex, [sortOrderKey]: order };
    }, {});
  };

  return {
    middlewares: (ctx, next) => {
      const { meta, methods } = ctx;
      const { queryFrom } = meta;
      if (
        [
          methods.ON_MOUNT,
          methods.ON_FORM_MOUNT,
          methods.ON_FORM_SUBMIT,
          methods.ON_FORM_RESET,
        ].includes(queryFrom)
      ) {
        sort.current = {};
      } else {
        ctx.params = { ...ctx.params, ...propsToParams(sort.current) };
      }
      return next();
    },
    props: (ctx) => ({
      tableProps: {
        sort: sort.current,
        onSort: (dataIndex, order) => {
          const { query } = ctx;

          sort.current = { [dataIndex]: order };
          const sortParams = propsToParams(sort.current);
          query({ ...sortParams, current: 1 });
        },
      },
    }),
  };
};

export default useSortablePlugin;
