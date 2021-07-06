import { TableNormalPlugin, Obj, IResponse } from '@ahooksjs/use-table';

export * from '@ahooksjs/use-table';

export type IPayload = {
  openRowKeys: string[];
  currentRowKey: string;
  expanded: boolean;
  currentRecord: Obj;
};

export type TQuery = (payload: IPayload, params: Obj) => Promise<IResponse>;

export interface IOptions {
  isCache: boolean;
  primaryKey?: string;
  // TODO
  iterator?: any;
}

export type TUseTree = (query: TQuery, options?: IOptions) => TableNormalPlugin;

export interface ITraverse {
  (tree: Obj[], cb: (node: Obj, posPath: string | number) => boolean, pos?: string | number);
}
