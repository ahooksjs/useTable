import { renderHook } from '@testing-library/react-hooks';
import service from './fixtures/service';
import useQueryDisplay from '../src/index';

const willQuery = () => Promise.resolve();
const willQuery1 = () => Promise.resolve();

describe('useQueryDisplay#Plugins', () => {
  it('default', () => {
    const rawplugins = [
      {
        middlewares: {
          willQuery,
        },
        props: {
          name: 'I am the props',
        },
      },
      {
        middlewares: {
          willQuery: willQuery1,
        },
        props: {
          name: 'I am the props1',
        },
      },
    ];

    const { result } = renderHook(() => useQueryDisplay({ service, timelines: [] }, rawplugins));

    const { plugins } = result.current;
    expect(plugins).toEqual({
      middlewares: {
        willQuery: [willQuery, willQuery1],
      },
      props: [
        {
          name: 'I am the props',
        },
        {
          name: 'I am the props1',
        },
      ],
    });
  });

  it('pure use', () => {
    const plugin1 = {
      middlewares: {
        willQuery,
      },
      props: {
        name: 'I am the props',
      },
    };

    const plugin2 = {
      middlewares: {
        willQuery: willQuery1,
      },
      props: {
        name: 'I am the props1',
      },
    };

    let rawplugins = [plugin1];
    const { result, rerender } = renderHook(() =>
      useQueryDisplay({ service, timelines: [] }, rawplugins),
    );
    const { plugins } = result.current;

    expect(plugins).toEqual({
      middlewares: {
        willQuery: [willQuery],
      },
      props: [
        {
          name: 'I am the props',
        },
      ],
    });

    rawplugins = [plugin2];
    rerender();

    expect(plugins).toEqual({
      middlewares: {
        willQuery: [willQuery1],
      },
      props: [
        {
          name: 'I am the props1',
        },
      ],
    });
  });
});
