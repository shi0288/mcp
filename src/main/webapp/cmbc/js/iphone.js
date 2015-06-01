var browser={
	versions:function(){
		var u = navigator.userAgent, app = navigator.appVersion;
		return {
			trident: u.indexOf('Trident') > -1, //IE内核
			presto: u.indexOf('Presto') > -1, //opera内核
			webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
			gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
			mobile: !!u.match(/AppleWebKit.*Mobile.*/)||!!u.match(/AppleWebKit/), //是否为移动终端
			ios: !!u.match(/(i[^;]+\;(U;)? CPU.+Mac OS X)/), //ios终端
			android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或者uc浏览器
			iPhone: u.indexOf('iPhone') > -1 || u.indexOf('Mac') > -1, //是否为iPhone或者QQHD浏览器
			iPad: u.indexOf('iPad') > -1, //是否iPad
			webApp: u.indexOf('Safari') == -1 //是否web应该程序，没有头部与底部
		}
	}(),
	language:(navigator.browserLanguage || navigator.language).toLowerCase()
}

var eventName = "";
var eventCode = "0";
var session = {};
var _locked = false;
function lock() {
	if (_locked) {
		return true;
	}
	_locked = true;
	return false;
}
function unlock() {
	_locked = false;
}
function getWebkitEventCode() {
	return eventCode;
}
function getWebkitEvent() {
	return eventName;
}
function getWebkitValues() {
	return "";
}
function setWebkitValues(a) {
}
function clearEvent() {
	eventCode = "0";
	eventName = "";
}
function initWebkitTitleBar() {
	clearEvent();
	return {"title":"\u7cfb\u7edf\u6807\u9898", "leftButton":{"exist":false}, "rightButton":{"exist":true, "name":"", "func":"touchRightButton();"}};
}
function setWebkitSession(a) {
	session = a;
	clearEvent();
}
var _session_timeout = false;
function showTimeOut() {
	if (!_session_timeout) {
		_session_timeout = true;
		setWebitEvent("clearEvent()", "11");
	}
}
var _mevents = new Array();
function setWebitEvent(b, a) {

	if (b == "") {
		return;
	}
	if (browser.versions.ios || browser.versions.iPhone || browser.versions.iPad) {
		_mevents.push(JsonToStr({code:a, name:b}));
	} else if (browser.versions.android) {
		setAndroidWebitEvent(b,a);
	} else {// other client
	}
}
function getWebkitEventCode() {
	return _mevents.length > 0 ? _mevents.shift() : "0";
}
function getWebkitEvent() {
	return "";
}
function JsonToStr(o) {
    var arr = [];
    var fmt = function (s) {
        if (typeof s == 'object' && s != null) return JsonToStr(s);
        return /^(string|number)$/.test(typeof s) ? '"' + s + '"' : s;
    }
    for (var i in o)
        arr.push('"' + i + '":' + fmt(o[i]));
    return "{" + arr.join(',') + "}";
}
// ---------------android js调用------------------
function setAndroidWebitEvent(param, evtCode) {
//	if(evtName.indexOf("()")==-1){
//		evtName += "()";
//	}
	
	switch (evtCode) {
	  case "LT01":
		window.SysClientJs.goBack();
		break;
	  case "LT02":  //code : "HY01":调用客户端登录接口,HY03:返回9宫格接口
	  	window.SysClientJs.toLoginJGCP(param)
		break;
	  case "LT03":// 瀚银调支付接口
		window.SysClientJs.submitOrderJGCP(param)
		break;
	}
}