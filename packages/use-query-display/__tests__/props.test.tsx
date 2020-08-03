import { renderHook } from '@testing-library/react-hooks';
import service from './fixtures/service';
import useQueryDisplay from '../src/index';

describe('useQueryDisplay#Props', () => {
  it('default', () => {
    const plugins = [
      {
        props: {
          name: 'I am the props',
        },
      },
    ];

    const { result } = renderHook(() =>
      useQueryDisplay({ service, timelines: [] }, plugins),
    );

    const { props } = result.current;
    expect(props).toEqual({
      name: 'I am the props',
    });
  });

  it('function', () => {
    const plugins = [
      {
        props: () => ({
          name: 'I am the function props',
        }),
      },
    ];

    const { result } = renderHook(() =>
      useQueryDisplay({ service, timelines: [] }, plugins),
    );
    const { props } = result.current;
    expect(props).toEqual({
      name: 'I am the function props',
    });
  });

  it('function in props', () => {
    const getName = () => ({});

    const plugins = [
      {
        props: {
          getName,
        },
      },
    ];

    const { result } = renderHook(() =>
      useQueryDisplay({ service, timelines: [] }, plugins),
    );
    const { props } = result.current;
    expect(props).toEqual({
      getName,
    });
  });

  it('mix', () => {
    const plugins = [
      {
        props: props => {
          return {
            ...props,
            name: 'I am the function props',
          };
        },
      },
      {
        props: {
          foo: true,
        },
      },
      {
        props: () => {
          return {
            baz: '🐒',
          };
        },
      },
    ];

    const { result } = renderHook(() =>
      useQueryDisplay({ service, timelines: [] }, plugins),
    );
    const { props } = result.current;
    expect(props).toEqual({
      foo: true,
      name: 'I am the function props',
      baz: '🐒',
    });
  });

  it('conflict', () => {
    const plugins = [
      {
        props: {
          table: {
            name: '张🐒',
          },
        },
      },
      {
        props: {
          table: {
            height: '👯‍♀️',
          },
        },
      },
    ];

    const { result } = renderHook(() =>
      useQueryDisplay({ service, timelines: [] }, plugins),
    );
    const { props } = result.current;
    expect(props).toEqual({
      table: [
        {
          name: '张🐒',
        },
        {
          height: '👯‍♀️',
        },
      ],
    });
  });
});
