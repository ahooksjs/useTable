import { methods } from '@ahooksjs/use-table';

const useAntdTablePlugin = () => {
  return {
    props: (ctx) => {
      return {
        tableProps: {
          pagination: false,
        },
        paginationProps: ({ onChange, onPageSizeChange, ...props }) => {
          return {
            ...props,
            // Antd 不能区分【页码大小】的触发还是【页改变】的触发
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
