module.exports = {
  baseUrl: process.env.NODE_ENV === "production" ? "/mystatic/" : "/",
  devServer: {
    // proxy: "http://localhost:9007"
    proxy: "http://twjs.weijinshi.com"
    // proxy:'http://192.168.11.52:9007'  // 小明阿
    // proxy: "http://192.168.11.14:9007" // 庆韵
    // proxy: "http://192.168.11.16:9007" // 吕伟
    // proxy: "http://192.168.11.25:9007" // 圣剑
  },
  chainWebpack: config => {
    config.plugin("html").tap(args => {
      args[0].chunksSortMode = "none";
      return args;
    });
  }
};
