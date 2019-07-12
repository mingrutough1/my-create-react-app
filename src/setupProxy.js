const proxy = require("http-proxy-middleware");
 
module.exports = function(app) {
  app.use(
    proxy("/kyfadm-api/**", {
      target: "http://10.25.73.2/", // 开发环境
    //   target: "http://csms-polaris-app-stg4.paic.com.cn/", // 测试环境
    //   target: "http://csms-polaris-app.paic.com.cn/", // 生产环境
      changeOrigin: true
    })
  );
};