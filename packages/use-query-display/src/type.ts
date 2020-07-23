import { IChecker } from './checker';
import { IComposer } from './compose';
import { PAYLOAD_SYMBOL, REQUEST_SYMBOL } from './symbol';

export type Obj = { [name: string]: any };

export type Transformer = (params: any, options: any) => any;

export type PluginContext = {
  app: IApp;
};

export interface IMiddlewareContext {
  [REQUEST_SYMBOL]: IRequest;
  [PAYLOAD_SYMBOL]?: TPayload;
  [name: string]: any;
}

export type Middleware<Ctx = IMiddlewareContext> = (
  ctx: Ctx,
  next: () => Promise<any>,
) => Promise<any>;

// 底层的 Plugin，可以读取 NormalPlugin 的属性
export type NativePlugin = (ctx: PluginContext) => NormalPlugin;

export type NormalPlugin<Ctx = IMiddlewareContext> = {
  middlewares?:
    | Middleware<Ctx>
    | Middleware<Ctx>[]
    | {
        [name: string]: Middleware<Ctx> | Middleware<Ctx>[];
      };
  props?: ((props: Obj) => any) | Obj;
};

export type Plugin<Ctx = IMiddlewareContext> = NormalPlugin<Ctx> | NativePlugin;

// 没有加工过的插件
export type RawPlugins<Ctx = IMiddlewareContext> = Plugin<Ctx>[];

export interface IHelper extends IChecker, IComposer {}

export interface Plugins {
  middlewares: {};
  props: any[];
  [name: string]: any;
}

type TPayload = Obj | Transformer;

export interface IApp {
  query: (payload?: TPayload, meta?: Obj) => Promise<any>;
  helper: IHelper;
  ctx: IMiddlewareContext;
}

export interface IRequest {
  timelines: string[];
  service: (params: Obj, options: Obj) => Promise<any>;
  [name: string]: any;
}
