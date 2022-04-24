module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ?'./' : '/', // 默认'/'，部署应用包时的基本 URL
  productionSourceMap:false,
  outputDir:process.env.VUE_APP_tokenSymbol,
  integrity:true, //
  css: {
    loaderOptions: {
      postcss: {
        plugins: [require('tailwindcss'), require('autoprefixer')]
      }
    }
  }
}
