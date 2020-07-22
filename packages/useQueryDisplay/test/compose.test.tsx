import { pipeMergedCompose, mergedCompose, pipeCompose } from '../src/compose';

describe('useQueryDisplay#Compose', () => {
  it('pipeCompose#Basic', () => {
    const pipes = [
      props => {
        return { ...props, name: 'foo' };
      },
      props => {
        return {
          ...props,
          height: 120,
        };
      },
    ];

    const composed = pipeCompose(pipes)({});

    expect(composed).toEqual({
      name: 'foo',
      height: 120,
    });
  });

  it('pipeCompose#Mix', () => {
    const pipes = [
      props => {
        return { ...props, name: 'foo' };
      },
      { size: '📱' },
      props => {
        return {
          ...props,
          height: 120,
        };
      },
    ];

    const composed = pipeCompose(pipes)({});

    expect(composed).toEqual({
      name: 'foo',
      size: '📱',
      height: 120,
    });
  });

  it('pipeCompose#Order', () => {
    const pipes = [
      props => {
        return { ...props, arr: props.arr.concat(['foo']) };
      },
      props => {
        return { ...props, arr: props.arr.concat(['bar']) };
      },
    ];

    const composed = pipeCompose(pipes)({ arr: [] });
    expect(composed).toEqual({ arr: ['foo', 'bar'] });
  });

  it('mergedCompose#Basic', () => {
    const props = [{ name: 'foo' }, { height: 120 }];

    const composed = mergedCompose(props);
    expect(composed).toEqual({
      name: 'foo',
      height: 120,
    });
  });

  it('mergedCompose#Conflict', () => {
    const props = [{ table: { name: 'foo' } }, { table: { height: 120 } }];

    const composed = mergedCompose(props);
    expect(composed).toEqual({
      table: [
        {
          name: 'foo',
        },
        {
          height: 120,
        },
      ],
    });
  });

  it('pipeMergedCompose#Merge', () => {
    const props = [{ table: { name: 'foo' } }, { table: { height: 120 } }];
    const composed = pipeMergedCompose(props);

    expect(composed).toEqual({
      table: [
        {
          name: 'foo',
        },
        {
          height: 120,
        },
      ],
    });
  });

  it('pipeMergedCompose#Pipe', () => {
    const props = [
      $props => {
        return { ...$props, name: 'foo' };
      },
      $props => {
        return { ...$props, height: 120 };
      },
    ];
    const composed = pipeMergedCompose(props);

    expect(composed).toEqual({
      name: 'foo',
      height: 120,
    });
  });

  it('pipeMergedCompose#pipe & merge', () => {
    const props = [
      $props => {
        return { ...$props, name: 'foo' };
      },
      {
        height: 120,
      },
    ];
    const composed = pipeMergedCompose(props);

    expect(composed).toEqual({
      name: 'foo',
      height: 120,
    });
  });
});
