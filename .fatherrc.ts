import * as fs from 'fs';

const isPlugin = (pkg) => {
  const names = pkg.split('-');
  return names[names.length - 1] === 'plugin';
};

const packages = fs.readdirSync('./packages').filter(isPlugin);

export default {
  esm: 'babel',
  cjs: 'babel',
  disableTypeCheck: true,
  // 这个非常重要，升级到 build 的时候顺序
  pkgs: ['use-query-display', 'use-table', 'use-form-table', 'next-form-table'].concat(packages),
};
