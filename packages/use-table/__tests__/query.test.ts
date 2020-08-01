import { renderHook, act } from '@testing-library/react-hooks';
import useTable from '../src/index';
import service from './fixtures/service';

describe('useTable#query', () => {
  it('default', async () => {
    const dataSource = [{ name: 'ahooks' }];
    const TOTAL = 25;
    const { result, waitForNextUpdate } = renderHook(() =>
      useTable((params) => {
        expect(params).toEqual({ current: 1, pageSize: 20 });
        return service({ dataSource, total: TOTAL });
      })
    );
    expect(result.current.tableProps.loading).toEqual(false);
    expect(result.current.tableProps.dataSource).toEqual([]);

    // Loading
    await waitForNextUpdate();
    expect(result.current.tableProps.loading).toEqual(true);
    expect(result.current.tableProps.dataSource).toEqual([]);

    // Response
    await waitForNextUpdate();
    expect(result.current.tableProps.loading).toEqual(false);
    expect(result.current.tableProps.dataSource).toEqual(dataSource);
    expect(result.current.paginationProps.current).toEqual(1);
    expect(result.current.paginationProps.pageSize).toEqual(20);
    expect(result.current.paginationProps.total).toEqual(TOTAL);

    // Query
    act(() => {
      result.current.query();
    });

    // Loading
    await waitForNextUpdate();
    expect(result.current.tableProps.loading).toEqual(true);

    await waitForNextUpdate();
    expect(result.current.tableProps.loading).toEqual(false);
    expect(result.current.tableProps.dataSource).toEqual(dataSource);
    expect(result.current.paginationProps.current).toEqual(1);
    expect(result.current.paginationProps.pageSize).toEqual(20);
    expect(result.current.paginationProps.total).toEqual(TOTAL);
  });

  it('with params', async () => {
    const dataSource = [{ name: 'ahooks' }];
    const TOTAL = 25;
    const normalParams = { current: 1, pageSize: 20 };
    let extraParams = {};
    const { result, waitForNextUpdate } = renderHook(() =>
      useTable((params) => {
        expect(params).toEqual({ ...normalParams, ...extraParams });
        return service({ dataSource, total: TOTAL });
      })
    );
    expect(result.current.tableProps.loading).toEqual(false);
    expect(result.current.tableProps.dataSource).toEqual([]);

    // Loading
    await waitForNextUpdate();
    expect(result.current.tableProps.loading).toEqual(true);
    expect(result.current.tableProps.dataSource).toEqual([]);

    // Response
    await waitForNextUpdate();
    expect(result.current.tableProps.loading).toEqual(false);
    expect(result.current.tableProps.dataSource).toEqual(dataSource);
    expect(result.current.paginationProps.current).toEqual(1);
    expect(result.current.paginationProps.pageSize).toEqual(20);
    expect(result.current.paginationProps.total).toEqual(TOTAL);

    // Query
    act(() => {
      extraParams = { name: 'foo' };
      result.current.query(extraParams);
    });

    // Loading
    await waitForNextUpdate();
    expect(result.current.tableProps.loading).toEqual(true);

    await waitForNextUpdate();
    expect(result.current.tableProps.loading).toEqual(false);
    expect(result.current.tableProps.dataSource).toEqual(dataSource);
    expect(result.current.paginationProps.current).toEqual(1);
    expect(result.current.paginationProps.pageSize).toEqual(20);
    expect(result.current.paginationProps.total).toEqual(TOTAL);

    // Second Query
    act(() => {
      // It will use prev params when query twice
      result.current.query({});
    });

    // Loading
    await waitForNextUpdate();
    expect(result.current.tableProps.loading).toEqual(true);

    await waitForNextUpdate();
    expect(result.current.tableProps.loading).toEqual(false);
    expect(result.current.tableProps.dataSource).toEqual(dataSource);
    expect(result.current.paginationProps.current).toEqual(1);
    expect(result.current.paginationProps.pageSize).toEqual(20);
    expect(result.current.paginationProps.total).toEqual(TOTAL);

    const { onChange } = result.current.paginationProps;
    normalParams.current = 2;
    // It will reset when the query is normal
    extraParams = {};
    act(() => {
      onChange(normalParams.current);
    });

    await waitForNextUpdate();
    await waitForNextUpdate();

    expect(result.current.tableProps.dataSource).toEqual(dataSource);
    expect(result.current.paginationProps.current).toEqual(2);
    expect(result.current.paginationProps.pageSize).toEqual(20);
    expect(result.current.paginationProps.total).toEqual(TOTAL);
  });
});
