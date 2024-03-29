import { methods } from '@ahooksjs/use-table';

const filterTransformer = (filters) => {
  return Object.keys(filters).reduce((acc, key) => {
    return {
      ...acc,
      [key]: {
        selectedKeys: filters[key] || [],
      },
    };
  }, {});
};

const tableActions = {
  sort: ({ sorter }, props) => {
    props.onSort(sorter.field, sorter.order);
  },
  filter: ({ filters }, props) => {
    props.onFilter(filterTransformer(filters));
  },
};

const useAntdTablePlugin = () => {
  return {
    props: (ctx) => {
      return {
        tableProps: ({ primaryKey, ...props }) => {
          return {
            ...props,
            rowKey: primaryKey,
            pagination: false,
            // 排序 & 过滤器需要用到
            onChange: (_, filters, sorter, { action }) => {
              const fn = tableActions[action] || (() => {});
              fn({ filters, sorter }, props);
            },
          };
        },
        paginationProps: ({ onChange, onPageSizeChange, ...props }) => {
          return {
            ...props,
            // antd 不能区分页码大小的触发还是页改变的触发
            onChange: (current, pageSize) => {
              const { params } = ctx;
              // 切换页码
              if (current === params.current) {
                ctx.query(
                  { pageSize, current: ctx.options.current },
                  {
                    queryFrom: methods.ON_PAGE_SIZE_CHANGE,
                  }
                );
              }

              // 切换页
              if (params.pageSize === pageSize) {
                ctx.query(
                  { pageSize, current },
                  {
                    queryFrom: methods.ON_PAGE_SIZE_CHANGE,
                  }
                );
              }
            },
          };
        },
      };
    },
  };
};

export default useAntdTablePlugin;
