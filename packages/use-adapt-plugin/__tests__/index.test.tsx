import { renderHook, act } from '@testing-library/react-hooks';
import useTable, { Obj } from '@ahooksjs/use-table';
import useAdaptPlugin from '../src';
import service from './fixtures/service';

describe('useAdaptPlugin', () => {
  it('default', async () => {
    const dataSource = [{ name: 'ahooks' }];
    const TOTAL = 25;
    const expectedParams = { pageIndex: 1, pageSize: 20 };

    const { waitForNextUpdate, result } = renderHook(() =>
      useTable(
        (params) => {
          expect(params).toEqual(expectedParams);
          return service({ dataSource, total: TOTAL });
        },
        {
          plugins: [
            useAdaptPlugin({
              map: { current: 'pageIndex' },
            }),
          ],
        }
      )
    );

    await waitForNextUpdate();
    await waitForNextUpdate();

    expect(result.current.getParams()).toEqual(expectedParams);

    const { onChange } = result.current.paginationProps;
    expectedParams.pageIndex = 2;
    act(() => {
      onChange(expectedParams.pageIndex);
    });
    await waitForNextUpdate();
    await waitForNextUpdate();

    expect(result.current.getParams()).toEqual(expectedParams);
    expect(result.current.paginationProps.current).toEqual(expectedParams.pageIndex);
  });

  it('response', async () => {
    const dataSource = [{ name: 'ahooks' }];
    const TOTAL = 25;
    const expectedParams = { pageIndex: 1, pageSize: 20 };

    const { waitForNextUpdate, result } = renderHook(() =>
      useTable(
        (params) => {
          expect(params).toEqual(expectedParams);
          return service({ dataSource, total: TOTAL, pageIndex: 2 });
        },
        {
          plugins: [
            useAdaptPlugin({
              map: { current: 'pageIndex' },
            }),
          ],
        }
      )
    );

    await waitForNextUpdate();
    await waitForNextUpdate();
    expect(result.current.getParams()).toEqual({ ...expectedParams, pageIndex: 2 });
  });

  it('query', async () => {
    const dataSource = [{ name: 'ahooks' }];
    const TOTAL = 25;
    const expectedParams = { pageIndex: 1, pageSize: 20 };

    const { waitForNextUpdate, result } = renderHook(() =>
      useTable(
        (params) => {
          expect(params).toEqual(expectedParams);
          return service({ dataSource, total: TOTAL });
        },
        {
          plugins: [
            useAdaptPlugin({
              map: { current: 'pageIndex' },
            }),
          ],
        }
      )
    );

    await waitForNextUpdate();
    await waitForNextUpdate();

    act(() => {
      expectedParams.pageIndex = 2;
      result.current.query({ current: expectedParams.pageIndex });
    });

    await waitForNextUpdate();
    await waitForNextUpdate();
    expect(result.current.getParams()).toEqual({ ...expectedParams, pageIndex: 2 });

    act(() => {
      expectedParams.pageIndex = 1;
      result.current.query({ pageIndex: expectedParams.pageIndex });
    });

    await waitForNextUpdate();
    await waitForNextUpdate();
    expect(result.current.getParams()).toEqual({ ...expectedParams, pageIndex: 1 });
  });

  it.only('plugin', async () => {
    const dataSource = [{ name: 'ahooks' }];
    const TOTAL = 25;
    const expectedParams: Obj = { pageIndex: 1, pageSize: 20 };

    const usePlugin = () => ({
      middlewares: (ctx, next) => {
        ctx.params = {
          ...ctx.store.paramMap.get(),
          ...ctx.params,
        };
        return next();
      },
    });

    const { waitForNextUpdate, result } = renderHook(() =>
      useTable(
        (params) => {
          expect(params).toEqual(expectedParams);
          return service({ dataSource, total: TOTAL });
        },
        {
          plugins: [
            usePlugin(),
            useAdaptPlugin({
              map: { current: 'pageIndex' },
            }),
          ],
        }
      )
    );

    await waitForNextUpdate();
    await waitForNextUpdate();

    expect(result.current.getParams()).toEqual({ ...expectedParams, pageIndex: 1 });

    // 比如点击左侧内容请求需要加上 test 参数
    act(() => {
      expectedParams.pageIndex = 1;
      expectedParams.test = 'test';
      result.current.query({ pageIndex: expectedParams.pageIndex, test: expectedParams.test });
    });

    await waitForNextUpdate();
    await waitForNextUpdate();
    expect(result.current.getParams()).toEqual({ ...expectedParams, pageIndex: 1 });

    // 点击第二页
    act(() => {
      expectedParams.pageIndex = 2;
      result.current.query({ current: expectedParams.pageIndex }, { queryFrom: 'test' });
    });

    await waitForNextUpdate();
    await waitForNextUpdate();
    // 会把上面 test 参数带过去
    expect(result.current.getParams()).toEqual({ ...expectedParams, pageIndex: 2 });

    // 点击第三页
    act(() => {
      expectedParams.pageIndex = 3;
      result.current.query({ current: expectedParams.pageIndex }, { queryFrom: 'test' });
    });

    await waitForNextUpdate();
    await waitForNextUpdate();
    // 会把上面 test 参数带过去
    expect(result.current.getParams()).toEqual({ ...expectedParams, pageIndex: 3 });
  });
});
