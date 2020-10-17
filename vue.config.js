module.exports = {
  devServer: {
    open: true, // open表示是否运行时就启动app
    port: 8081, // port表示我们当前vue页面的端口8080
    proxy: {
      '/api': { // 接口中以api开头的地址，都会通过代理服务器请求
        target: 'http://localhost:3000', // 请求的目标地址http://localhost
        ws: true, // proxy websockets
        changeOrigin: true, // 如果请求跨域就需要加上
        pathRewrite: { // 将api值重写成/
          // '/api': '/'
          '^/api': ''
        }
      }
    }
  }
}
