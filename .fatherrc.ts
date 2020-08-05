import * as fs from 'fs';

const basicPkgs = ['use-query-display', 'use-table', 'use-form-table'];
const packages = fs.readdirSync('./packages').filter((pkg) => !basicPkgs.includes(pkg));

export default {
  esm: 'babel',
  cjs: 'babel',
  disableTypeCheck: true,
  // 这个重要，涉及到 build 的时候顺序
  pkgs: basicPkgs.concat(packages),
};
