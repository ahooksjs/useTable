// 点击 Form 区域的查询
import { PAYLOAD_SYMBOL, Pipe } from '@ahooksjs/use-table';
import { IS_FORM_DATA_SUBMITTED } from '../symbol';

const formPipe: Pipe = (ctx) => {
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

export default formPipe;
