import { Pipe } from '../type';

const refreshPipe: Pipe = (ctx) => {
  const { options = {}, store } = ctx;
  const memoState = store.stateMap.get();
  const { pagination } = memoState;
  const current = pagination.current || options.current;
  const pageSize = pagination.pageSize || options.pageSize;

  ctx.params = {
    ...ctx.params,
    current,
    pageSize,
  };

  return ctx;
};

export default refreshPipe;
