import { IResponse } from '../../src/index';

const service = (data): Promise<IResponse> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ data });
    }, 500);
  });
};

export default service;
