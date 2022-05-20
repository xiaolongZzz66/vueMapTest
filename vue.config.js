// module.exports = {

//     devServer: { 
//         proxy: { //配置跨域
//             '/api': {
//                 target: 'http://localhost:8090/', //这里后台的地址模拟的;应该填写你们真实的后台接口
//                 changOrigin: true, //允许跨域
//                 pathRewrite: {
//                     /* 重写路径，当我们在浏览器中看到请求的地址为：http://localhost:8080/api/core/getData/userInfo 时
//                       实际上访问的地址是：http://localhost:8090/core/getData/userInfo,因为重写了 /api
//                      */
//                     '^/api': ''
//                 }
//             },
//         }
//     },
// }


// module.exports = {
//     outputDir: 'dist',  //build输出目录
//     assetsDir: 'assets', //静态资源目录（js, css, img）
//     lintOnSave: false, //是否开启eslint
//     devServer: {
//       open: true, //是否自动弹出浏览器页面
//       host: "localhost", 
//       port: '8081', 
//       https: false,  //是否使用https协议
//       hotOnly: false, //是否开启热更新
//       proxy: {
//         '/api': {
//           target: 'http://localhost:5000', //API服务器的地址
//           ws: true, //代理websockets
//           changeOrigin: true, // 虚拟的站点需要更管origin
//           pathRewrite: {  //重写路径 比如'/api/aaa/ccc'重写为'/aaa/ccc'
//             '^/api': ''
//           }
//         }
//       },
//     }
//   }