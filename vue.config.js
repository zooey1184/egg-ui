/* eslint-disable */
module.exports = {
  // 基本路径
  publicPath: '/pages/eggui/',
  pages: {
    index: {
      // entry for the page
      entry: './src/examples/index.js',
      // the source template
      template: 'public/index.html',
      // output as dist/index.html
      filename: 'index.html'
    }
    // when using the entry-only string format,
    // template is inferred to be `public/subpage.html`
    // and falls back to `public/index.html` if not found.
    // Output filename is inferred to be `subpage.html`.
    // subpage: 'src/subpage/main.js'
  },
  productionSourceMap: false,
  chainWebpack: config => { // webpack链接API，用于生成和修改webapck配置，https://github.com/vuejs/vue-cli/blob/dev/docs/webpack.md
    if (process.env.NODE_ENV === 'production') {
      // 生产开发配置
      // console.log(config)
    } else {
      // 本地开发配置
    }
  },
  configureWebpack: config => { // webpack配置，值位对象时会合并配置，为方法时会改写配置
    if (process.env.NODE_ENV === 'production') {
      // 生产开发配置
      // public: 'https://r.51gjj.com/business/assets/main/loan/hualishu/',
      console.log(config.output.publicPath)
    }
  },
  // 输出文件目录
  outputDir: 'dist',
  // eslint-loader 是否在保存的时候检查
  lintOnSave: false,
  // webpack-dev-server 相关配置
  devServer: {
    open: process.platform === 'darwin',
    // host: '0.0.0.0',
    port: 8081,
    proxy: 'http://127.0.0.1:8081'
    // https: false,
    // hotOnly: false,
    // before: app => {}
  }
}
