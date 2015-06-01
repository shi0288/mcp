/**
 * Created by yeeson on 14-6-5.
 */
//判断是否是ios客户端
$(document).ready(function (e) {
    /*position absolute*/
    var browser = {
        versions: function () {
            var u = navigator.userAgent, app = navigator.appVersion;
            return {
                trident: u.indexOf('Trident') > -1, //IE内核
                presto: u.indexOf('Presto') > -1, //opera内核
                webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
                gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
                mobile: !!u.match(/AppleWebKit.*Mobile.*/) || !!u.match(/AppleWebKit/), //是否为移动终端
                ios: !!u.match(/(i[^;]+\;(U;)? CPU.+Mac OS X)/), //ios终端
                android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或者uc浏览器
                iPhone: u.indexOf('iPhone') > -1 || u.indexOf('Mac') > -1, //是否为iPhone或者QQHD浏览器
                iPad: u.indexOf('iPad') > -1, //是否iPad
                webApp: u.indexOf('Safari') == -1 //是否web应该程序，没有头部与底部
            }
        }(),
        language: (navigator.browserLanguage || navigator.language).toLowerCase()
    }
//    if (browser.versions.android) {
//        var hh1 = $(".top").height();
//        var hh2 = $(".footer-tz").height();
//        var hh = $(window).height() - hh1 - hh2;
//        $(".content").css({"max-height": hh + "px", "overflow-y": "scroll", "margin-bottom": "0px"});
//        $(".top").css("position", "absolute");
//        $("body").css({"min-height": "100%"});
//    }
    if (browser.versions.ios || browser.versions.iPhone || browser.versions.iPad) {
        $("<link>").attr({ rel: "stylesheet",
            type: "text/css",
            href: "css/ios.css"
        }).appendTo("head");
    }
    if (browser.versions.iPad) {
        $("<link>").attr({ rel: "stylesheet",
            type: "text/css",
            href: "css/ipad.css"
        }).appendTo("head");
    }
    var u = navigator.userAgent, app = navigator.appVersion;
    var xit = u.split("OS");
    xit = xit[1];
    if (xit) {
        xit = xit.split("_");
        xit = xit[0];
    }
    if (xit == 7) {
        $("<link>").attr({ rel: "stylesheet",
            type: "text/css",
            href: "css/ios7.css"
        }).appendTo("head");
    }
});