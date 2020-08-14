export const PREPARE = 'prepare';
export const DID_RENDER = 'didRender';
export const WILL_QUERY = 'willQuery';
export const YOUR_TURN = 'yourTurn';
export const QUERYING = 'querying';
export const DID_QUERY = 'didQuery';

export const timelines = [DID_RENDER, WILL_QUERY, YOUR_TURN, QUERYING, DID_QUERY];
export const defaults = { current: 1, pageSize: 20 };
export const methods = {
  ON_MOUNT: 'onMount',
  ON_PAGE_SIZE_CHANGE: 'onPageSizeChange',
  ON_PAGE_CHANGE: 'onPageChange',
};
