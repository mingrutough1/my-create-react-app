const proxy = require("http-proxy-middleware");
 
module.exports = function(app) {
  app.use(
    proxy("/kyfadm-api/**", {
      target: "http://10.25.73.2/", // 开发环境
      changeOrigin: true
    })
  );
};