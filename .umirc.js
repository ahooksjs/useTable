const json = require('./version.json');
const isDev = process.env.NODE_ENV === 'development';
const CDN_URL = isDev ? '' : `//unpkg.zhimg.com/usetable-ahooks-asset@${json.version}`;

export default {
  title: ' • useTable',
  logo: `${CDN_URL}/logo.svg`,
  favicon: `${CDN_URL}/simple-logo.svg`,
  base: '/',
  mode: 'site',
  publicPath: `${CDN_URL}/`,
  locales: [
    ['zh-CN', '中文'],
    ['en-US', 'English'],
  ],
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
        libraryName: '@formily/antd-components',
        libraryDirectory: 'lib',
        style: true,
      },
      '@formily/antd-components',
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
      href: 'https://unpkg.com/@alifd/theme-design-pro@0.6.2/dist/next-noreset.min.css',
    },
    // https://github.com/umijs/dumi/issues/138
    { rel: 'stylesheet', href: `${CDN_URL}/style.css` },
  ],
  resolve: {
    includes: ['docs', 'packages'],
  },
  navs: {
    'zh-CN': [
      null,
      { title: 'GitHub', path: 'https://github.com/ahooksjs/useTable' },
      { title: '知乎', path: 'https://zhuanlan.zhihu.com/useReact' },
      { title: '更新日志', path: 'https://github.com/ahooksjs/useTable/releases' },
    ],
    'en-US': [
      null,
      { title: 'GitHub', path: 'https://github.com/ahooksjs/useTable' },
      { title: 'Zhihu', path: 'https://zhuanlan.zhihu.com/useReact' },
      { title: 'Changelog', path: 'https://github.com/ahooksjs/useTable/releases' },
    ],
  },
  headScripts: ['https://v1.cnzz.com/z_stat.php?id=1279207986&web_id=1279207986'],
};
