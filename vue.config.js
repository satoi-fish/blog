module.exports = {
  devServer: {
    port: 8001,     // 端口号
    disableHostCheck:true,
  },  
  configureWebpack: {
    resolve: {
      alias: {
        'assets': '@/assets',
        'common': '@/common',
        'components': '@/components',
        'network': '@/network',
        'views': '@/views',
        'utils':'@/utils'
      }
    }
  }
}
