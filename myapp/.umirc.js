import { resolve } from 'path'
// ref: https://umijs.org/config/
export default {
  // targets: {
  //   ie: 9,
  // },
  plugins: [
    // ref: https://umijs.org/plugin/umi-plugin-react.html
    ['umi-plugin-react', {
      antd: true,
      dva: true,
      dynamicImport: true,
      title: 'rocket',
      dll: false,
      pwa: false,
      routes: {
        exclude: [
          /model\.(j|t)sx?$/,
          /service\.(j|t)sx?$/,
          /config\//,
          /models\//,
          /components\//,
          /services\//,
          /chart\/Container\.js$/,
        ],
      },
      hardSource: false,
    }],
  ],
  hash: true,
  alias: {
    config: resolve(__dirname,"./src/config"),
    utils: resolve(__dirname,"./src/utils"),
    themes: resolve(__dirname, './src/themes'),
    services: resolve(__dirname, './src/services'),
    components: resolve(__dirname, './src/components'),
    assets: resolve(__dirname, './src/assets'),
  },
  chainWebpack(config, { webpack }) {
    config
      .plugin('env')
      .use(require.resolve('webpack/lib/DefinePlugin'), [{ HOST_ENV: JSON.stringify(process.env.HOST_ENV), }]);
  },
  theme: "./theme.config.js",
}
