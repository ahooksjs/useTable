// 点击 Table 区域的查询
import { PAYLOAD_SYMBOL, Pipe } from '@ahooksjs/use-table';
import { IS_FORM_DATA_SUBMITTED } from '../symbol';

const tablePipe: Pipe = (ctx) => {
  const { meta, store, [PAYLOAD_SYMBOL]: payload } = ctx;
  const { stateMap } = store;
  const memoState = stateMap.get();
  const { formState = {} } = memoState;
  const { values = {} } = formState;

  ctx.params = {
    ...ctx.params,
    ...values,
    ...payload,
  };

  stateMap.set({
    formState: !meta[IS_FORM_DATA_SUBMITTED] ? formState : { values: payload },
  });

  return ctx;
};

export default tablePipe;
