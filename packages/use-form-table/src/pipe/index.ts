import { Pipe, IS_NORMAL_SYMBOL } from '@ahooksjs/use-table';
import { methods } from '../config';
import { PipeType } from '../type';
import refreshPipe from './refresh';
import formPipe from './form';
import tablePipe from './table';

const pipeCheckerMap = {
  [PipeType.REFRESH]: (ctx) => {
    const { meta } = ctx;
    return meta[IS_NORMAL_SYMBOL] === false;
  },
  [PipeType.FORM]: (ctx) => {
    const { meta } = ctx;
    return (
      meta[IS_NORMAL_SYMBOL] === true &&
      [methods.ON_FORM_SUBMIT, methods.ON_FORM_SUBMIT].includes(meta.queryFrom)
    );
  },
  [PipeType.TABLE]: (ctx) => {
    const { meta } = ctx;
    return (
      meta[IS_NORMAL_SYMBOL] === true 
      &&
      ![methods.ON_FORM_SUBMIT, methods.ON_FORM_SUBMIT].includes(meta.queryFrom)
    );
  },
};

const createPipe = (pipe: Pipe, type: PipeType): Pipe => (ctx) => {
  const checker = pipeCheckerMap[type];
  return checker(ctx) ? pipe(ctx) : ctx;
};

const pipes = [
  createPipe(refreshPipe, PipeType.REFRESH),
  createPipe(formPipe, PipeType.FORM),
  createPipe(tablePipe, PipeType.TABLE),
];

export default pipes;
