import * as fs from 'fs';

const includes = fs.readdirSync('./packages').map((pkg) => `packages/${pkg}`);

export default {
  title: '@ahooksjs/use-table',
  logo: '/logo.svg',
  extraBabelPlugins: [
    [
      'babel-plugin-import',
      {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: true,
      },
      'antd',
    ],
    [
      'babel-plugin-import',
      {
        libraryName: '@alifd/next',
        style: false,
      },
      'fusion',
    ],
  ],
  links: [
    {
      rel: 'stylesheet',
      href: 'https://unpkg.com/@alifd/theme-design-pro@0.6.2/dist/next.min.css',
    },
  ],
  resolve: {
    includes: ['docs'].concat(includes),
  },
};
