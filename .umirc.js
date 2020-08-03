export default {
  title: 'A Solution for Table',
  logo: '/logo.svg',
  favicon: '/simple-logo.svg',
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
    // https://github.com/umijs/dumi/issues/138
    { rel: 'stylesheet', href: '/style.css' },
  ],
  resolve: {
    includes: ['docs', 'packages']
  },
};
