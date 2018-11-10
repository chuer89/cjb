export default {
  "extraBabelPlugins": [
    [
      "import",
      {
        "libraryName": "antd",
        "libraryDirectory": "es",
        "style": "css"
      }
    ]
  ],

  entry: 'src/index.js',
  env: {
    development: {
      extraBabelPlugins: ['dva-hmr'],
    },
  },
  ignoreMomentLocale: true,
  // theme: './src/theme.js',
  html: {
    template: './src/index.ejs',
  },
  // disableDynamicImport: true,
  publicPath: '/',
  hash: true,
}