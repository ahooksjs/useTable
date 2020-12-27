import { methods } from '../config';
import { Processor } from '../type';

const usePaginationProps: Processor = (ctx) => {
  const { actions, app, options } = ctx;
  const { total, pageSize, current } = actions.getState();

  ctx.paginationProps = {
    total,
    pageSize,
    current,
    pageSizeSelector: 'filter',
    onChange: ($current: number) => {
      app.query(
        { current: $current },
        {
          queryFrom: methods.ON_PAGE_CHANGE,
        }
      );
    },
    onPageSizeChange: ($pageSize: number) => {
      app.query(
        { pageSize: $pageSize, current: options.current },
        {
          queryFrom: methods.ON_PAGE_SIZE_CHANGE,
        }
      );
    },
  };
};

const useTableProps: Processor = (ctx) => {
  const { props, actions, helper, paginationProps } = ctx;
  const state = actions.getState();
  const { pipeCompose } = helper;
  const tablePropsOfPlugin = Array.isArray(props.tableProps)
    ? props.tableProps
    : [props.tableProps];

  const paginationPluginProps = Array.isArray(props.paginationProps)
    ? props.paginationProps
    : [props.paginationProps];

  const nativeTableProps = {
    dataSource: state.dataSource,
    loading: state.loading,
    paginationProps,
  };

  const tableProps = {
    ...nativeTableProps,
    ...pipeCompose(tablePropsOfPlugin)(nativeTableProps),
    paginationProps: {
      ...paginationProps,
      ...pipeCompose(paginationPluginProps)(paginationProps),
    },
  };

  ctx.tableProps = tableProps;
};

export { useTableProps, usePaginationProps };
