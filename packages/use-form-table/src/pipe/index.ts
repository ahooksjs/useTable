import { Pipe, IS_NORMAL_SYMBOL } from '@ahooksjs/use-table';
import { methods } from '../config';
import { PipeType } from '../type';
import refreshPipe from './refresh';
import formPipe from './form';
import tablePipe from './table';

const checkIsFormPipe = (meta) => {
  return [
    methods.ON_FORM_SUBMIT,
    methods.ON_FORM_MOUNT,
    methods.ON_FORM_SUBMIT,
    methods.TO_RESET_FORM,
    methods.ON_FORM_RESET,
    methods.ON_REFRESH_DEPS,
  ].includes(meta.queryFrom);
};

const pipeCheckerMap = {
  [PipeType.REFRESH]: (ctx) => {
    const { meta } = ctx;
    return meta[IS_NORMAL_SYMBOL] === false;
  },
  [PipeType.FORM]: (ctx) => {
    const { meta } = ctx;
    return meta[IS_NORMAL_SYMBOL] === true && checkIsFormPipe(meta);
  },
  [PipeType.TABLE]: (ctx) => {
    const { meta } = ctx;
    return meta[IS_NORMAL_SYMBOL] === true && !checkIsFormPipe(meta);
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
