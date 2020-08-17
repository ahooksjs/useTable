import { renderHook, act } from '@testing-library/react-hooks';
import useTable from '@ahooksjs/use-table';
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
      result.current.query({ pageIndex: expectedParams.pageIndex });
    });

    await waitForNextUpdate();
    await waitForNextUpdate();
    expect(result.current.getParams()).toEqual({ ...expectedParams, pageIndex: 2 });
  });
});
