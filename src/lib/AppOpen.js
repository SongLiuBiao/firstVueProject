import { mBrowser } from "jrmf-utils";
function Appopen() {
  var iframe = document.createElement("iframe");
  var body = document.body;
  iframe.style.display = "none";
  var timer = null;

  console.log(mBrowser.versions.ios);
  if (mBrowser.versions.ios && mBrowser.versions.wechat) {
    window.location.href =
      "https://itunes.apple.com/cn/app/%E5%BE%AE%E9%87%91%E7%9F%B3-%E9%93%B6%E8%A1%8C%E5%AD%98%E7%AE%A1%E9%AB%98%E6%94%B6%E7%9B%8A%E6%8A%95%E8%B5%84%E7%90%86%E8%B4%A2p2p%E5%B9%B3%E5%8F%B0/id1223915061?mt=8";
    return;
  }
  body.appendChild(iframe);
  iframe.src = "wjsschema://wjs?name=HOME";
  var t = Date.now();
  timer = setTimeout(function() {
    if (Date.now() - t > 1200) {
      clearTimeout(timer);
      return false;
    }
    if (document.webkitHidden || document.hidden) {
      return false;
    }
    window.location.href =
      "http://a.app.qq.com/o/simple.jsp?pkgname=com.hzjs.wjs#opened";
  }, 1000);
}

export default Appopen;
