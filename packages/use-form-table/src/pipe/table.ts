// 点击 Table 区域的查询
import { PAYLOAD_SYMBOL, Pipe } from '@ahooksjs/use-table';

const tablePipe: Pipe = (ctx) => {
  const { store, [PAYLOAD_SYMBOL]: payload } = ctx;
  const { stateMap } = store;
  const memoState = stateMap.get();
  const { formState = {} } = memoState;
  const { values = {} } = formState;

  ctx.params = {
    ...ctx.params,
    ...values,
    ...payload,
  };

  return ctx;
};

export default tablePipe;
