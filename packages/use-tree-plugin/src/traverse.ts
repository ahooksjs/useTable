import { ITraverse } from './type';

const traverse: ITraverse = (tree, cb, pos) => {
  try {
    if (!Array.isArray(tree)) {
      return;
    }
    for (let idx = 0; idx < tree.length; idx++) {
      const posPath = pos !== undefined ? `${pos}-${idx}` : idx;
      const node = tree[idx];
      const ret = cb(node, posPath);
      if (ret === false) {
        // eslint-disable-next-line no-throw-literal
        throw {
          STOP_FURTHER_DOWN: true,
        };
      }
      if (node.children && node.children.length) {
        traverse(node.children, cb, posPath);
      }
    }
  } catch (e) {
    if (!e.STOP_FURTHER_DOWN) {
      throw new Error(e);
    }
  }
};

export default traverse;
