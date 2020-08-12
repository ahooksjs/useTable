import { useMemo, useRef, useState, useEffect, useCallback } from 'react';
import { Obj } from './type';

export const useMutableState = (initalState: Obj = {}) => {
  const [state, setState] = useState(initalState);
  const mutableState = useMemo(() => ({}), []);
  Object.assign(mutableState, state);
  return [mutableState, setState];
};

export const useMount = (fn) => {
  useEffect(fn, []);
};

export const useStateIsInit = () => {
  const ref = useRef(true);
  if (ref.current) {
    ref.current = false;
    return true;
  }

  return ref.current;
};

export const useUpdateEffect = (fn, deps) => {
  const isInit = useStateIsInit();

  useEffect(() => {
    if (!isInit) {
      fn();
    }
  }, deps);
};

export const usePersistFn = (fn) => {
  const ref = useRef<any>(() => {
    throw new Error('Cannot call function while rendering.');
  });

  ref.current = fn;
  const persistFn = useCallback((...args) => ref.current(...args), [ref]);

  return persistFn;
};
