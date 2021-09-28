import lazyMiddleware from './lazy';
import paramsMiddleware from './params';
import transformMiddleware from './transform';
import fetchMiddleware from './fetch';
import renderMiddleware from './render';

export default {
  didRender: [lazyMiddleware, renderMiddleware],
  willQuery: [paramsMiddleware],
  willTransform: [transformMiddleware],
  querying: [fetchMiddleware],
};
