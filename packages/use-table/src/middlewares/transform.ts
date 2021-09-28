/**
 * 参数转换
 */

import { Middleware } from '../type';
import { REQUEST_SYMBOL } from '../symbol';

const transformMiddleware: Middleware = (ctx, next) => {
  const { params, [REQUEST_SYMBOL]: request } = ctx;
  if (request.transformer) {
    ctx.params = request.transformer(params);
  }

  return next();
};

export default transformMiddleware;
