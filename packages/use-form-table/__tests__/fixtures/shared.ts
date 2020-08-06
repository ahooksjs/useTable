import { Subject } from 'rxjs';

export const createSubscribes = () => {
  const subscribes = {};
  const $ = (type) => {
    if (!subscribes[type]) {
      subscribes[type] = new Subject();
    }
    return subscribes[type];
  };

  return { subscribes, $ };
};