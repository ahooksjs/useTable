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

  const { current, pageSize, ...formPayload } = (payload as any) || {};
  /**
   * 为什么会有这个 IS_FORM_DATA_SUBMITTED 判断呢？
   * 主要是因为如果 reset 的时候，formState 数据还是老的数据，没有清空
   * 会导致下一个 query 出现问题。
   */
  stateMap.set({
    formState: !meta[IS_FORM_DATA_SUBMITTED] ? formState : { values: formPayload },
  });

  return ctx;
};

export default formPipe;
