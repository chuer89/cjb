import { resolve } from 'path'
// ref: https://umijs.org/config/
export default {
  plugins: [
    // ref: https://umijs.org/plugin/umi-plugin-react.html
    ['umi-plugin-react', {
      antd: true,
      dva: true,
      dynamicImport: true,
      title: '餐匠帮',
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
  targets: {
    ie: 9,
  },
  hash: true,
  alias: {
    '@config': resolve(__dirname,"./src/config"),
    '@common': resolve(__dirname,"./src/common"),
    '@utils': resolve(__dirname,"./src/utils"),
    '@themes': resolve(__dirname, './src/themes'),
    '@services': resolve(__dirname, './src/services'),
    '@components': resolve(__dirname, './src/components'),
    '@assets': resolve(__dirname, './src/assets'),
  },
}
