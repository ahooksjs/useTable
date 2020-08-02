import { renderHook, act } from '@testing-library/react-hooks';
import useTable from '../src/index';
import service from './fixtures/service';

describe('useTable#getParams', () => {
  it('default', async () => {
    const dataSource = [{ name: 'ahooks' }];
    const TOTAL = 25;
    const { result, waitForNextUpdate } = renderHook(() =>
      useTable(() => {
        return service({ dataSource, total: TOTAL });
      })
    );

    await waitForNextUpdate();
    await waitForNextUpdate();
    expect(result.current.getParams()).toEqual({ current: 1, pageSize: 20 });

    const { onChange } = result.current.paginationProps;
    act(() => {
      onChange(2);
    });

    await waitForNextUpdate();
    await waitForNextUpdate();
    expect(result.current.getParams()).toEqual({ current: 2, pageSize: 20 });

    const { onPageSizeChange } = result.current.paginationProps;
    act(() => {
      onPageSizeChange(10);
    });

    await waitForNextUpdate();
    await waitForNextUpdate();
    expect(result.current.getParams()).toEqual({ current: 1, pageSize: 10 });

    act(() => {
      result.current.query({ name: 'test' });
    });

    await waitForNextUpdate();
    await waitForNextUpdate();
    expect(result.current.getParams()).toEqual({ name: 'test', current: 1, pageSize: 10 });

    act(() => {
      result.current.query();
    });

    await waitForNextUpdate();
    await waitForNextUpdate();
    expect(result.current.getParams()).toEqual({ current: 1, pageSize: 10 });
  });
});
