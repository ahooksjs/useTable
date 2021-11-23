import { useState } from 'react';
import { renderHook, act } from '@testing-library/react-hooks';
import useTable, { Obj } from '../src/index';
import service from './fixtures/service';

describe('useTable#plugin', () => {
  it('middlewares', async () => {
    const dataSource = [{ name: 'ahooks' }];
    const updatedDataSource = [{ name: 'updated' }];
    const TOTAL = 25;
    const plugin = {
      middlewares: (ctx, next) => {
        expect(ctx.params).toEqual({ current: 1, pageSize: 20 });
        return next().then(() => {
          ctx.response.data.dataSource = updatedDataSource;
        });
      },
    };
    const { waitForNextUpdate, result } = renderHook(() =>
      useTable(() => service({ dataSource, total: TOTAL }), { plugins: [plugin] })
    );

    await waitForNextUpdate();
    await waitForNextUpdate();

    expect(result.current.tableProps.dataSource).not.toEqual(dataSource);
    expect(result.current.tableProps.dataSource).toEqual(updatedDataSource);
  });

  it('tableProps', async () => {
    const dataSource = [{ name: 'ahooks' }];
    const TOTAL = 25;
    const plugin = {
      props: {
        tableProps: { isTree: true },
      },
    };
    const plugin1 = {
      props: {
        tableProps: { isZebra: true },
      },
    };
    const { waitForNextUpdate, result } = renderHook(() =>
      useTable(() => service({ dataSource, total: TOTAL }), { plugins: [plugin, plugin1] })
    );

    await waitForNextUpdate();
    await waitForNextUpdate();

    expect((result.current.tableProps as Obj).isTree).toEqual(true);
    expect((result.current.tableProps as Obj).isZebra).toEqual(true);
  });

  it('paginationProps', async () => {
    const dataSource = [{ name: 'ahooks' }];
    const TOTAL = 25;
    const plugin = {
      props: {
        paginationProps: { pageSizeSelector: 'dropdown' },
      },
    };
    const { waitForNextUpdate, result } = renderHook(() =>
      useTable(() => service({ dataSource, total: TOTAL }), { plugins: [plugin] })
    );

    await waitForNextUpdate();
    await waitForNextUpdate();

    expect((result.current.paginationProps as Obj).pageSizeSelector).toEqual('dropdown');
  });

  it('external props', async () => {
    const dataSource = [{ name: 'ahooks' }];
    const TOTAL = 25;
    const plugin = {
      props: {
        test: true,
      },
    };
    const { waitForNextUpdate, result } = renderHook(() =>
      useTable(() => service({ dataSource, total: TOTAL }), { plugins: [plugin] })
    );

    await waitForNextUpdate();
    await waitForNextUpdate();

    expect(result.current.test).toEqual(true);
  });

  it('function props', async () => {
    const dataSource = [{ name: 'ahooks' }];
    const TOTAL = 25;
    const plugin = {
      props: () => ({
        test: true,
      }),
    };
    const { waitForNextUpdate, result } = renderHook(() =>
      useTable(() => service({ dataSource, total: TOTAL }), { plugins: [plugin] })
    );

    await waitForNextUpdate();
    await waitForNextUpdate();

    expect(result.current.test).toEqual(true);
  });

  it('getParams', async () => {
    const dataSource = [{ name: 'ahooks' }];
    const TOTAL = 25;
    const plugin = {
      props: () => ({
        getParams: () => true,
      }),
    };
    const { waitForNextUpdate, result } = renderHook(() =>
      useTable(() => service({ dataSource, total: TOTAL }), { plugins: [plugin] })
    );

    await waitForNextUpdate();
    await waitForNextUpdate();

    expect(result.current.getParams()).toEqual(true);
  });

  it('all', async () => {
    const dataSource = [{ name: 'ahooks' }];
    const TOTAL = 25;
    const usePlugin = () => {
      const [state, setState] = useState(true);
      return {
        props: {
          state,
          setState,
        },
      };
    };
    const { waitForNextUpdate, result } = renderHook(() => {
      const plugin = usePlugin();
      return useTable(() => service({ dataSource, total: TOTAL }), { plugins: [plugin] });
    });

    await waitForNextUpdate();
    await waitForNextUpdate();

    expect(result.current.state).toEqual(true);
    act(() => {
      result.current.setState(false);
    });
    expect(result.current.state).toEqual(false);
  });

  it('dynamic', async () => {
    const dataSource = [{ name: 'ahooks' }];
    const TOTAL = 25;
    const usePlugin = () => {
      return {
        props: () => ({
          name: 'foo',
        }),
      };
    };

    const usePlugin1 = () => {
      return {
        props: () => ({
          title: 'bar',
        }),
      };
    };
    const { waitForNextUpdate, result } = renderHook(() => {
      const [isAll, setState] = useState(true);
      const plugin = usePlugin();
      const plugin1 = usePlugin1();
      const returnValue = useTable(() => service({ dataSource, total: TOTAL }), {
        plugins: isAll ? [plugin, plugin1] : [plugin],
      });

      return {
        ...returnValue,
        setState,
        isAll,
      };
    });

    await waitForNextUpdate();
    await waitForNextUpdate();

    expect(result.current.isAll).toEqual(true);
    expect((result.current as any).name).toEqual('foo');
    expect((result.current as any).title).toEqual('bar');

    act(() => {
      result.current.setState(false);
    });
    expect(result.current.isAll).toEqual(false);
    expect((result.current as any).name).toEqual('foo');
    expect((result.current as any).title).toEqual(undefined);
  });

  it('transformer', async () => {
    const dataSource = [{ name: 'ahooks' }];
    const TOTAL = 25;
    const usePlugin = () => {
      return {
        middlewares: (ctx, next) => {
          ctx.params.test = 1;
          return next();
        },
        props: () => ({
          name: 'foo',
        }),
      };
    };

    const { waitForNextUpdate } = renderHook(() => {
      const plugin = usePlugin();
      return useTable(() => service({ dataSource, total: TOTAL }), {
        transformer: (p) => {
          expect(p).toEqual({ current: 1, pageSize: 20, test: 1 });
          return { ...p };
        },
        plugins: [plugin],
      });
    });

    await waitForNextUpdate();
    await waitForNextUpdate();
  });
});
