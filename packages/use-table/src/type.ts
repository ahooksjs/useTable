import { Obj, IApp, IHelper, IMiddlewareContext, NormalPlugin } from '@ahooksjs/use-query-display';

export * from '@ahooksjs/use-query-display';

export type Pipe = (ctx: IMiddlewareContext) => Obj;

export type Processor = (ctx: Obj) => any;

export type Copy<T> = {
  [P in keyof T]: Copy<T[P]>;
};

export interface PluginOptions {
  app: IApp;
}

export interface ITableProps {
  dataSource: any[];
  loading: boolean;
  paginationProps: {
    total: number;
    pageSize: number;
    current: number;
    onChange: (current: number, ...rest: any[]) => void;
    onPageSizeChange: (pageSize: number, ...rest: any[]) => void;
  };
}

export interface IReturnValue {
  tableProps: ITableProps;
  paginationProps: ITableProps['paginationProps'];
  query: IApp['query'];
  getParams: () => Obj;
  actions: Obj;
  [name: string]: any;
}

export interface IStore {
  paramMap: {
    get: () => any;
    set: (params: any) => void;
  };
  stateMap: {
    get: () => any;
    set: (state: any) => void;
  };
  optionsMap: {
    get: () => any;
    set: (options: any) => void;
  };
  ctxMap: {
    get: (key?: string) => any;
    set: (ctx: any) => void;
  };
}

export interface IResponse {
  data: {
    dataSource: Obj[];
    current?: number;
    pageSize?: number;
    total: number;
    [name: string]: any;
  };
  [name: string]: any;
}

export interface ITableHelper extends IHelper {
  checkQueryFrom: () => {
    isPageSizeChange: boolean;
    isPageChange: boolean;
  };
}

export interface IContext extends IMiddlewareContext {
  store: IStore;
  query: IApp['query'];
  helper: ITableHelper;
  params: Obj;
  meta: {
    queryFrom: string;
    [name: string]: any;
  };
  response: IResponse;
}

export type FormTableNormalPlugin<P = Obj> = NormalPlugin<IContext, P>;

export interface Options {
  current?: number;
  pageSize?: number;
  autoFirstQuery?: boolean;
  refreshDeps?: any[];
  plugins?: FormTableNormalPlugin[];
}

export type TUseTable = (
  service: (params?: Obj) => Promise<IResponse>,
  options?: Options
) => IReturnValue;
