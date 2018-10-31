export function getUrlParams(key) {
  var url = location.search;
  var theRequest = new Object();
  if (url.indexOf("?") != -1) {
    var str = url.substr(1);
    var strs = str.split("&");
    for (var i = 0; i < strs.length; i++) {
      theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
    }
  }
  return theRequest[key];
}

export function getUrlArrayObj() {
  var url = location.search;
  var theRequest = new Object();
  if (url.indexOf("?") != -1) {
    var str = url.substr(1);
    var strs = str.split("&");
    for (var i = 0; i < strs.length; i++) {
      theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
    }
  }
  return theRequest;
}

export function Toast(config) {
    var el = document.createElement('span');
    var Pd = config.padding ;
    el.innerHTML = config.message;
    el.className = 'zyjToast';
    if(Pd){
      el.style.padding =Pd;
    }
    document.body.appendChild(el);
    setTimeout(function () {
        document.body.removeChild(el);
    },config.delay||1500);
}