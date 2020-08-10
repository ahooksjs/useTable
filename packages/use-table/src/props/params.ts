import { Obj } from '../type';

const useParams = (ctx: Obj) => {
  ctx.getParams = ctx.props.getParams || ctx.store.paramMap.get;
};

export default useParams;
