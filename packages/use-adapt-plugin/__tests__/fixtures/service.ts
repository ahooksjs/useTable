import { IResponse } from '@ahooksjs/use-table';

const service = (data, options?): Promise<IResponse> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ data, ...options });
    }, 500);
  });
};

export default service;
