import { Pipe, IS_NORMAL_SYMBOL } from '@ahooksjs/use-table';
import refreshPipe from './refresh';
import normalPipe from './normal';

const createNormalPipe = (pipe: Pipe, $isNormal: boolean): Pipe => (ctx) => {
  const { meta } = ctx;
  return meta[IS_NORMAL_SYMBOL] === $isNormal ? pipe(ctx) : ctx;
};

const pipes = [createNormalPipe(refreshPipe, false), createNormalPipe(normalPipe, true)];

export default pipes;
