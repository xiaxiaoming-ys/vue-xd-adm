module.exports = {
  lintOnSave: false,
  devServer: {
    host: '0.0.0.0',
    port: 3333,
    open: true
    // proxy: {}, // 设置代理
  },
  css: {
    loaderOptions: {
      sass: {
        // 新版本sass-loader， 将data改成prependData进行配置
        prependData: `@import "@/assets/scss/_variable.scss";`
      }
    }
  }
}