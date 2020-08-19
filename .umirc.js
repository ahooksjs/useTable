export default {
  title: 'useTable • A Hook Solution for Table',
  logo: '/logo.svg',
  favicon: '/simple-logo.svg',
  base: '/useTable',
  mode: 'site',
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
      href: 'https://unpkg.com/@alifd/theme-design-pro@0.6.2/dist/next-noreset.min.css',
    },
    // https://github.com/umijs/dumi/issues/138
    { rel: 'stylesheet', href: '/style.css' },
  ],
  resolve: {
    includes: ['docs', 'packages'],
  },
  navs: {
    'zh-CN': [
      null,
      { title: 'GitHub', path: 'https://github.com/ahooksjs/useTable' },
      { title: '更新日志', path: 'https://github.com/ahooksjs/useTable/releases' },
    ],
    'en-US': [
      null,
      { title: 'GitHub', path: 'https://github.com/ahooksjs/useTable' },
      { title: 'Changelog', path: 'https://github.com/ahooksjs/useTable/releases' },
    ],
  },
};
