import { Obj } from '@ahooksjs/use-table';
import { IResponse } from './type';

const adapt = (res: IResponse, primaryKey: string): IResponse => {
  const { data = { dataSource: [] } } = res || {};

  res.data.dataSource = (data.dataSource as Obj[]).map((d) => {
    if (d.lazyChildren || d.isLeaf === false) {
      return {
        ...d,
        children: [
          {
            [primaryKey]: `${d[primaryKey]}_children`,
          },
        ],
      };
    }
    return d;
  });

  return res;
};

export default adapt;
