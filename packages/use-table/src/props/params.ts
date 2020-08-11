import { Obj } from '../type';

const useParams = (ctx: Obj) => {
  const getParams = ctx.props.getParams || ctx.store.paramMap.get;
  ctx.getParams = () => {
    try {
      return getParams();
    } catch (err) {
      return {};
    }
  };
};

export default useParams;
