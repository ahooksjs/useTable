export default {
  title: 'A Hook Solution for Table',
  logo: '/u/logo.svg',
  favicon: '/u/simple-logo.svg',
  publicPath: '/u/',
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
    { rel: 'stylesheet', href: '/u/style.css' },
  ],
  resolve: {
    includes: ['docs', 'packages']
  },
};
