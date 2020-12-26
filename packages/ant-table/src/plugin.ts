import { methods } from '@ahooksjs/use-table';

const useAntdTablePlugin = () => {
  return {
    props: (ctx) => {
      return {
        tableProps: {
          pagination: false,
        },
        paginationProps: {
          // Antd 不能区分页码大小的触发还是页改变的触发
          onChange: (current, pageSize) => {
            const { params } = ctx;
            if (current === params.current) {
              // 切换页码大小
              ctx.query(
                { pageSize, current: ctx.options.current },
                {
                  queryFrom: methods.ON_PAGE_SIZE_CHANGE,
                }
              );
            } else if (params.pageSize === pageSize) {
              // 切换页
              ctx.query(
                { pageSize, current },
                {
                  queryFrom: methods.ON_PAGE_SIZE_CHANGE,
                }
              );
            }
          },
        },
      };
    },
  };
};

export default useAntdTablePlugin;
