import { Pipe } from '@ahooksjs/use-table';

const refreshPipe: Pipe = (ctx) => {
  const { store } = ctx;
  const memoState = store.stateMap.get();
  const { formState } = memoState;
  const { values = {} } = formState;

  ctx.params = {
    ...ctx.params,
    ...values,
  };

  return ctx;
};

export default refreshPipe;
