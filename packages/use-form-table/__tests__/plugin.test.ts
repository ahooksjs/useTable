import { renderHook } from '@testing-library/react-hooks';
import service from './fixtures/service';
import useFormTable from '../src/index';

describe('useFormTable#plugin', () => {
  it('one plugin', async () => {
    const dataSource = [{ name: 'ahooks' }];
    const TOTAL = 25;

    const usePlugin = () => {
      return {
        props: () => ({
          formProps: {
            test: 1,
          },
        }),
      };
    };

    const { result } = renderHook(() =>
      useFormTable(
        (params) => {
          return service({ ...params, dataSource, total: TOTAL });
        },
        { plugins: [usePlugin()], autoFirstQuery: false }
      )
    );

    expect(result.current.formProps.test).toEqual(1);
  });

  it('multi plugin', async () => {
    const dataSource = [{ name: 'ahooks' }];
    const TOTAL = 25;

    const usePlugin = () => {
      return {
        props: () => ({
          formProps: {
            test: 1,
          },
        }),
      };
    };

    const usePlugin1 = () => {
      return {
        props: {
          formProps: {
            name: 'foo',
          },
        },
      };
    };

    const { result } = renderHook(() =>
      useFormTable(
        (params) => {
          return service({ ...params, dataSource, total: TOTAL });
        },
        { plugins: [usePlugin(), usePlugin1()], autoFirstQuery: false }
      )
    );

    expect(result.current.formProps.test).toEqual(1);
  });
});
