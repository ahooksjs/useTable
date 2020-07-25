import { useMemo, useRef, useState, useEffect } from 'react';
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
