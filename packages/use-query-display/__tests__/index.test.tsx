import { renderHook } from '@testing-library/react-hooks';
import service from './fixtures/service';
import useQueryDisplay, { REQUEST_SYMBOL } from '../src/index';

describe('useQueryDisplay', () => {
  it('should be defined', () => {
    expect(useQueryDisplay).toBeDefined();
  });

  it('default', async () => {
    const { result } = renderHook(() => useQueryDisplay({ service, timelines: [] }));
    const { props, plugins } = result.current;

    expect(props).toStrictEqual({});
    expect(plugins).toStrictEqual({ middlewares: {}, props: [] });
  });

  it('middleware', async () => {
    const { result } = renderHook(() =>
      useQueryDisplay({ service, timelines: ['fetching'] }, [
        {
          middlewares: {
            fetching: ctx => {
              return ctx[REQUEST_SYMBOL].service({}, {});
            },
          },
        },
      ]),
    );

    const { query } = result.current;
    const { data } = await query();

    expect(data).toBe('data');
  });
});
