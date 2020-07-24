// 一些常规操作
import { PAYLOAD_SYMBOL, Pipe } from '@ecojs/use-table';
import { IS_FORM_DATA_SUBMITTED } from '../symbol';

const normalPipe: Pipe = (ctx) => {
  const { actions, meta, [PAYLOAD_SYMBOL]: payload, store } = ctx;
  const { stateMap } = store;

  const formState = actions.getFormState() || {};
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

export default normalPipe;
