//调用客户端提示框-start
var res;
window.alert=function(msg){
    res=msg;
    if(browser.versions.android==true){
        window.MsgJs.setAlertInfo('{"title":"提示","msg":"'+res+'","ok_btn":"false","cancle_text":"确定","cancle_func":null}');
    }else if(browser.versions.iPhone==true||browser.versions.iPad==true||browser.versions.ios==true){
        setWebitEvent("iphonealert()","05");
    }
}
//iphone提示框
function iphonealert(){
    var s='{"title":"提示","msg":"'+res+'","ok_btn":"false","cancle_text":"确定","cancle_func":null}';
    return s;
}


Date.prototype.format = function(format){
    var o = {
        "M+" : this.getMonth()+1, //month
        "d+" : this.getDate(), //day
        "h+" : this.getHours(), //hour
        "m+" : this.getMinutes(), //minute
        "s+" : this.getSeconds(), //second
        "q+" : Math.floor((this.getMonth()+3)/3), //quarter
        "S" : this.getMilliseconds() //millisecond
    }

    if(/(y+)/.test(format)) {
        format = format.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));
    }

    for(var k in o) {
        if(new RegExp("("+ k +")").test(format)) {
            format = format.replace(RegExp.$1, RegExp.$1.length==1 ? o[k] : ("00"+ o[k]).substr((""+ o[k]).length));
        }
    }
    return format;
}

//侧滑时顶部跟着动
$(document).ready(function(e) {
    /*position absolute*/
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
});
$(document).ready(function() {
    $('body').bind("selectstart", function() { return false; });
    $("#check-cb").click(function(){
        if($(this).hasClass("now")){
            $(this).removeClass("now");
        }else{
            $(this).addClass("now");
        }
    });
    $(".selmore").click(function(e){
        $('.cover').show();
        $('.pop-renxuan-div').show();
        e.stopPropagation();
    });
    var timer=null;
    $("input[type=text]").focus(function(){
        clearTimeout(timer);
        if($(".footer").length>0){
            $(".footer").hide();
        }

    });
    $("input[type=password]").focus(function(){
        clearTimeout(timer);
        if($(".footer").length>0){
            $(".footer").hide();
        }
    });
    $("input[type=text]").blur(function(){
        timer=setTimeout(function(){$(".footer").show();},500);
    });
    $("input[type=password]").blur(function(){
        timer=setTimeout(function(){$(".footer").show();},500);
    });
    $("#top-lahuan").click(function(){
        if($(".top-add").eq(0).eq(0).hasClass('slid-down')){
            $(".top-add").eq(0).removeClass('slid-down');
            $(".content").css("margin-top","-="+height);
        }else{
            $(".top-add").eq(0).addClass('slid-down');
            height=$(".top-add").eq(0).height();
            $(".content").css("margin-top","+="+height);
        }
    });
    $(".tab-nav").click(function(){
        if(!$(this).hasClass("now")){
            var i=$(this).index(".tab-nav");
            $(".tab-nav").removeClass("now").eq(i).addClass("now");
            $(".tab-content").hide().eq(i).show();
            if($(".tab-dot").length>0){
                $(".tab-dot").removeClass("now").eq(i).addClass("now");
            }
        }
    });
    /*$(".check-org").die().live("click",function(){
     if($(this).hasClass("now")){
     $(this).removeClass("now");
     }else{
     $(this).addClass("now");
     }
     });*/
    $(".check-org").click(function(){
        if($(this).hasClass("now")){
            $(this).removeClass("now");
        }else{
            $(this).addClass("now");
        }
    });
    /*机选一注恢复原始数量*/
    $(".tz-tit-right2.red").click(function(){
        var nuuu=$("#putong").attr("data-red");
        nuuu=nuuu+"个";
        $(this).prev(".tz-tit-right1").html(nuuu);
    });
    $(".tz-tit-right2.blue").click(function(){
        var nuuu=$("#putong").attr("data-blue");
        nuuu=nuuu+"个";
        $(this).prev(".tz-tit-right1").html(nuuu);
    });
    /*弹出层*/
    $("#jx-hq").click(function(e){
        $('.cover').show();
        $('.pop-red-div').show();
        e.stopPropagation();
    });
    $("#jx-lq").click(function(e){
        $('.cover').show();
        $('.pop-blue-div').show();
        e.stopPropagation();
    });
    $(".pop-red").click(function(e){
        var n=$(this).html();
        n=parseInt(n);
        objarr=$("#putong").find(".redball");
        selqiu(objarr,n)
        $(".pop").hide();
        $(".cover").hide();
        n=n+"个";
        $(".tz-tit-right1.red").html(n);
        e.stopPropagation();
    });
    $(".pop-blue").click(function(e){
        var n=$(this).html();
        n=parseInt(n);
        objarr=$("#putong").find(".blueball");
        selqiu(objarr,n)
        $(this).parent().hide();
        $(".cover").hide();
        n=n+"个";
        $(".tz-tit-right1.blue").html(n);
        e.stopPropagation();
    });
    $(".pop").click(function(e){
        e.stopPropagation();
    });
    $(".mt-fix").click(function(e){
        e.stopPropagation();
    });
    $(".chuanguan").click(function(e){
        e.stopPropagation();
    });
    $("#show-zfb").click(function(e){
        $('.cover').show();
        $('.pop-pay').show();
        e.stopPropagation();
    });
    $(".stopp").click(function(e){
        e.stopPropagation();
    });
    $("#jc-ss-pop").find(".fanxuan").click(function(){
        $("#jc-ss-pop").find("span").each(function() {
            if($(this).hasClass("on")){
                $(this).removeClass("on");
            }else{
                $(this).addClass("on");
            }
        });
    });
    $("#jc-ss-pop").find("span").click(function() {
        if($(this).hasClass("on")){
            $(this).removeClass("on");
        }else{
            $(this).addClass("on");
        }
    });
    $(document).click(function(){
        if($(".pop").length>0){
            $(".pop").hide();
        }
        if($(".cover").length>0){
            $(".cover").hide();
        }
        if($(".mt-fix").length>0){
            $(".mt-fix").hide();
        }
        if($(".chuanguan").length>0){
            $(".chuanguan").hide();
        }
        if($("#jc-ss-pop").length>0){
            $("#jc-ss-pop").hide();
        }
    });
    $("#jc-ss-pop").click(function(e){
        e.stopPropagation();
    });
    /*end弹出层*/
    //投注相关
    if($(".cover").length>0){
        var iheight=$(document).height();
        if($(window).height()>$(document).height()){
            iheight=$(window).height();
        }
        $(".cover").height(iheight);
    }
    if($(".cover2").length>0){
        var iheight=$(document).height();
        if($(window).height()>$(document).height()){
            iheight=$(window).height();
        }
        $(".cover2").height(iheight);
    }
    if($(".cover3").length>0){
        var iheight=$(document).height();
        if($(window).height()>$(document).height()){
            iheight=$(window).height();
        }
        $(".cover3").height(iheight);
    }
    $("#tz-more-btn").click(function(){
        if($(this).hasClass("on")){
            $(this).removeClass("on");
            $("#tz-more-content").eq(0).height(0);
        }else{
            $(this).addClass("on");
            $("#tz-more-content").eq(0).height(185);
        }
    });
    $(".jj-k-left").click(function(){
        var i=$(this).index(".jj-k-left");
        var oInput=$(this).parent().find("input");
        var iInput=oInput.val();
        iInput=parseInt(iInput);
        if(iInput>=2){
            oInput.val(iInput-1);
            $(".boq").eq(i).html(iInput-1);
            //算金额
            var zhushu=$("#zhushu").html();
            var qishu=$("#qishu").html();
            var beishu=$("#beishu").html();
            zhushu=parseInt(zhushu);
            qishu=parseInt(qishu);
            beishu=parseInt(beishu);
            if($("#zhuijia").length>0 && $("#zhuijia").hasClass("now")){
                $("#qianshu").html(qishu*beishu*zhushu*3);
            }else{
                $("#qianshu").html(qishu*beishu*zhushu*2);
            }
            checkCbb();
        }
    });
    $(".jj-k-right").click(function(){
        var i=$(this).index(".jj-k-right");
        var oInput=$(this).parent().find("input");
        var iInput=oInput.val();
        iInput=parseInt(iInput);
        if(iInput>=10000){
            alert("倍数或期数不能大于1万");
            return false;
        }
        oInput.val(iInput+1);
        $(".boq").eq(i).html(iInput+1);
        //算金额
        var zhushu=$("#zhushu").html();
        var qishu=$("#qishu").html();
        var beishu=$("#beishu").html();
        zhushu=parseInt(zhushu);
        qishu=parseInt(qishu);
        beishu=parseInt(beishu);
        if($("#zhuijia").length>0 && $("#zhuijia").hasClass("now")){
            $("#qianshu").html(qishu*beishu*zhushu*3);
        }else{
            $("#qianshu").html(qishu*beishu*zhushu*2);
        }
        checkCbb();
    });
    $("#tz-more-content input").blur(function(){
        var i=$(this).index("#tz-more-content input");
        var iInput=$(this).val();
        iInput=iInput.replace(/\D/g,'');
        if(!iInput || iInput==0){
            iInput=1;
            //alert("输入数值范围不正确");
        }
        if(iInput>10000){
            alert("倍数或期数不能大于1万");
            iInput=1;
        }
        $(this).val(iInput);
        $(".boq").eq(i).html(iInput);
        //算金额
        var zhushu=$("#zhushu").html();
        var qishu=$("#qishu").html();
        var beishu=$("#beishu").html();
        zhushu=parseInt(zhushu);
        qishu=parseInt(qishu);
        beishu=parseInt(beishu);
        if($("#zhuijia").length>0 && $("#zhuijia").hasClass("now")){
            $("#qianshu").html(qishu*beishu*zhushu*3);
        }else{
            $("#qianshu").html(qishu*beishu*zhushu*2);
        }
        checkCbb();
    });
    /*$("#del-ball-pt").click(function(){
     $("#putong").find(".redball").removeClass("on");
     $("#putong").find(".blueball").removeClass("on");
     });
     $("#del-ball-dt").click(function(){
     $("#dantuo").find(".redball").removeClass("on");
     $("#dantuo").find(".blueball").removeClass("on");
     });*/
    $(".del-red").click(function(){
        var i=$(this).index(".del-red");
        $(".tab-content").eq(i).find(".redball").removeClass("on");
        $(".tab-content").eq(i).find(".blueball").removeClass("on");
        $(this).parent().find(".redtext").html(0);
    });
});
//开奖号码解析
function getKJnum(schar,type){
    if(type==1){
        //组合
        schar=schar.split("|");
        var ared=schar[0];
        var ablue=schar[1];
        if(ared){
            ared=ared.split(",");
            var redHtml="";
            $.each(ared,function(i,vl){
                redHtml+='<span class="redball-m">'+vl+'</span>';
            });
        }
        if(ablue){
            ablue=ablue.split(",");
            var blueHtml="";
            $.each(ablue,function(i,vl){
                blueHtml+='<span class="blueball-m">'+vl+'</span>';
            });
            redHtml+=blueHtml;
        }
        return redHtml;
    }
    if(type==2){
        //排列
        if(schar){
            var ared=schar.split("|");
            if(ared.length>0){
                var redHtml="";
                $.each(ared,function(i,vl){
                    redHtml+='<span class="redball-m">'+vl+'</span>';
                });
                return redHtml;
            }
        }
    }
    if(type==3){
        //竞彩，胜负彩等
        if(schar){
            var html='<span class="redtext">'+schar+'</span>';
            return html;
        }
    }
}
//不跳转显示登陆页面
function showLogin(){
    $.ajax({
        type : "POST",
        url  : "innerlogin.html",
        dataType:"html",
        success : function(result){
            $(".index").hide();
            $("body").append(result);
        }
    });
}
//不跳转显示注册页面
function showSign(){
    $.ajax({
        type : "POST",
        url  : "innersign.html",
        dataType:"html",
        success : function(result){
            $(".index").hide();
            if($("#login").length>0){
                $("#login").hide();
            }
            $("body").append(result);
        }
    });
}
//不跳转显示找回密码
function showRepass(){
    $.ajax({
        type : "POST",
        url  : "innerepass.html",
        dataType:"html",
        success : function(result){
            $(".index").hide();
            if($("#login").length>0){
                $("#login").hide();
            }
            if($("#sign").length>0){
                $("#sign").hide();
            }
            $("body").append(result);
        }
    });
}
//不跳转，当前页面显示实名认证
function showBid(){
    if($("#innerbid").length>0){
        $(".index").hide();
        $("#innerbid").show();
        return false;
    }
    $.ajax({
        type : "POST",
        url  : "innerbid.html",
        dataType:"html",
        success : function(result){
            $(".index").hide();
            if($("#login").length>0){
                $("#login").hide();
            }
            if($("#sign").length>0){
                $("#sign").hide();
            }
            $("body").append(result);
        }
    });
}
//不跳转，当前页面显示绑定银行卡
function showBank(){
    if($("#innerbbank").length>0){
        $(".index").hide();
        $("#innerbbank").show();
        return false;
    }
    $.ajax({
        type : "POST",
        url  : "innerbbank.html",
        dataType:"html",
        success : function(result){
            $(".index").hide();
            if($("#login").length>0){
                $("#login").hide();
            }
            if($("#sign").length>0){
                $("#sign").hide();
            }
            $("body").append(result);
        }
    });
}
function fanhui(evel){
    $(".index").eq(0).show();
    $(evel).parents(".index").hide();
}
//不跳转，当前页面注册或者登录成功
function reMls(){
    if($("#login").length>0){
        $("#login").remove();
    }
    if($("#sign").length>0){
        $("#sign").remove();
    }
    $(".content").show();
}
function onError(){
    alert("请求失败");
}
//制保留2位小数，如：2，会在2后面补上00.即2.00
function toDecimalMoney(x) {
    var f = parseFloat(x);
    if (isNaN(f)) {
        return false;
    }
    var f = Math.round(x*100)/100;
    var s = f.toString();
    var rs = s.indexOf('.');
    if (rs < 0) {
        rs = s.length;
        s += '.';
    }
    while (s.length <= rs + 2) {
        s += '0';
    }
    return s;
}
//获取投注方式
function getBetType(betTypeCode){
    var type="";
    switch(betTypeCode){
        case "00":
            type="单式";
            break;
        case "01":
            type="复式";
            break;
        case "02":
            type="胆拖";
            break;
        case "03":
            type="和值";
            break;
        case "04":
            type="组合复式";
            break;
        case "05":
            type="组合胆拖";
            break;
        case "06":
            type="跨度复式";
            break;
        case "07":
            type="定位";
            break;
    }
    return type;
}
function getZhuhaoStatus(status){
    switch (status) {
        case 1010:
            return "等待支付";
            break;
        case 1110:
            return "进行中";
            break;
        case 1210:
            return "已取消";
            break;
        case 1310:
            return "已退款";
            break;
        case 1410:
            return "已完成";
            break;
        case 1510:
            return "已结算";
            break;
        case 1610:
            return "已完结";
            break;
    }

}
//获取彩票状态
function getOrderStatus(status) {
    switch (status) {
        case 1000:
            return "等待支付";
            break;
        case 2000:
            return "订单完成";
            break;
        case 3000:
            return "订单完成";
            break;
        case 4000:
            return "出票完成";
            break;
        case 1210:
            return "出票失败";
            break;
        case 1220:
            return "已退款";
            break;
        case 1300:
            return "出票部分成功";
            break;
        case 1400:
            return "交易失败";
            break;
        case 1500:
            return "交易取消";
            break;
        case 1800:
            return "未中奖";
            break;
        case 1810:
            return "已中奖";
            break;
        case 1900:
            return "已返奖";
            break;
        case 2100:
            return "等待返奖";
            break;
    }
}

//获取彩种名称
function getGame(obj){
    var caizhong="";
    switch(obj['gameCode']){
        case "F01":
            caizhong="双色球";
            return caizhong;
            break;
        case "F02":
            caizhong="福彩3D";
            return caizhong;
            break;
        case "F03":
            caizhong="七乐彩";
            return caizhong;
            break;
        case "T01":
            caizhong="大乐透";
            return caizhong;
            break;
        case "T02":
            caizhong="七星彩";
            return caizhong;
            break;
        case "T03":
            caizhong="排列三";
            return caizhong;
            break;
        case "T04":
            caizhong="排列五";
            return caizhong;
            break;
        case "T05":
            caizhong="11选5";
            return caizhong;
            break;
        case "T51":
            caizhong="竞彩足球";
            return caizhong;
            break;

    }
}
//base64加密
function encode64(input) {
    var keyStr = "ABCDEFGHIJKLMNOP" +
        "QRSTUVWXYZabcdef" +
        "ghijklmnopqrstuv" +
        "wxyz0123456789+/" +
        "=";
    input = escape(input);
    var output = "";
    var chr1, chr2, chr3 = "";
    var enc1, enc2, enc3, enc4 = "";
    var i = 0;

    do {
        chr1 = input.charCodeAt(i++);
        chr2 = input.charCodeAt(i++);
        chr3 = input.charCodeAt(i++);

        enc1 = chr1 >> 2;
        enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
        enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
        enc4 = chr3 & 63;

        if (isNaN(chr2)) {
            enc3 = enc4 = 64;
        } else if (isNaN(chr3)) {
            enc4 = 64;
        }

        output = output +
            keyStr.charAt(enc1) +
            keyStr.charAt(enc2) +
            keyStr.charAt(enc3) +
            keyStr.charAt(enc4);
        chr1 = chr2 = chr3 = "";
        enc1 = enc2 = enc3 = enc4 = "";
    } while (i < input.length);

    return output;
}
//base64解密
function decode64(input) {
    var keyStr = "ABCDEFGHIJKLMNOP" +
        "QRSTUVWXYZabcdef" +
        "ghijklmnopqrstuv" +
        "wxyz0123456789+/" +
        "=";
    var output = "";
    var chr1, chr2, chr3 = "";
    var enc1, enc2, enc3, enc4 = "";
    var i = 0;

    // remove all characters that are not A-Z, a-z, 0-9, +, /, or =
    var base64test = /[^A-Za-z0-9\+\/\=]/g;
    if (base64test.exec(input)) {
        alert("There were invalid base64 characters in the input text.\n" +
            "Valid base64 characters are A-Z, a-z, 0-9, '+', '/', and '='\n" +
            "Expect errors in decoding.");
    }
    input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

    do {
        enc1 = keyStr.indexOf(input.charAt(i++));
        enc2 = keyStr.indexOf(input.charAt(i++));
        enc3 = keyStr.indexOf(input.charAt(i++));
        enc4 = keyStr.indexOf(input.charAt(i++));

        chr1 = (enc1 << 2) | (enc2 >> 4);
        chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
        chr3 = ((enc3 & 3) << 6) | enc4;

        output = output + String.fromCharCode(chr1);

        if (enc3 != 64) {
            output = output + String.fromCharCode(chr2);
        }
        if (enc4 != 64) {
            output = output + String.fromCharCode(chr3);
        }

        chr1 = chr2 = chr3 = "";
        enc1 = enc2 = enc3 = enc4 = "";

    } while (i < input.length);

    return unescape(output);
}
//时间转换成时间戳
function stampTime(endTime){
    endTime=endTime.substring(0,19);
    endTime=endTime.replace("T"," ");
    endTime=endTime.replace(new RegExp("-","gm"),"/");
    endTime = (new Date(endTime)).getTime();
    return endTime;
}
function message(mes){
    var html='<div id="alert"><img src="img/ump_icon_right.png" />'+mes+'</div>';
    $("body").eq(0).append(html);
    var iheight=$(document).height();
    if($(window).height()>$(document).height()){
        iheight=$(window).height();
    }
    $(".cover3").height(iheight);
    setTimeout(function(){
        $("#alert").remove();
    },2500);
}
//数组去重
function unique(ary) {
    var i = 0,
        gid='_'+(+new Date)+Math.random(),
        objs = [],
        hash = {
            'string': {},
            'boolean': {},
            'number': {}
        }, p, l = ary.length,
        ret = [];
    for (; i < l; i++) {
        p = ary[i];
        if (p == null) continue;
        tp = typeof p;
        if (tp in hash) {
            if (!(p in hash[tp])) {
                hash[tp][p] = 1;
                ret.push(p);
            }
        } else {
            if (p[gid]) continue;
            p[gid]=1;
            objs.push(p);
            ret.push(p);
        }
    }
    for(i=0,l=objs.length;i<l;i++) {
        p=objs[i];
        p[gid]=undefined;
        delete p[gid];
    }
    return ret;
}
function before(){
    $("body").append('<div class="cover3" id="before-cover" style="display:block"></div><img id="login-img" src="img/009.gif">');
    var height=$(window).height();
    if(height<$(document).height()){
        height=	$(document).height();
    }
    $("#before-cover").height(height);
}
function after(){
    if($("#login-img").length>0&&$("#before-cover").length>0){
        $("#login-img").remove();
        $("#before-cover").remove();
    }
}
function getType(playType,betType){
    var otype1={"00":"","01":"直选","02":"组选三","03":"组选六","04":"组选","05":"追加","21":"任选一","22":"任选二","23":"任选三","24":"任选四","25":"任选五","26":"任选六","27":"任选七","28":"任选八","29":"前二组选","30":"前二直选","31":"前三组选","32":"前三直选"};
    var otype2={"00":"单式","01":"复式","02":"胆拖","03":"和值","04":"组合复式","05":"组合胆拖","06":"跨度","07":"定位"};
    var type="["+otype1[playType]+otype2[betType]+"]";
    return type;
}


/*window.alert = function(mes){
 var html='<div class="cover3"></div><div id="alert"><div class="alert-title">提示</div><div class="alert-message">'+mes+'</div><div onClick="closeAlert()" class="alert-ok">确定</div></div>';
 $("body").eq(0).append(html);
 var iheight=$(document).height();
 if($(window).height()>$(document).height()){
 iheight=$(window).height();
 }
 $(".cover3").height(iheight);
 }*/
window.alert = function(mes, onClick){
    var html='<div class="cover3"></div><div id="alert"><div class="alert-title">提示</div><div class="alert-message">'+mes+'</div><div class="alert-ok">确定</div></div>';
    $("body").eq(0).append(html);
    var iheight=$(document).height();
    if($(window).height()>$(document).height()){
        iheight=$(window).height();
    }
    $(".cover3").height(iheight);
    var height = $("#alert").height();

    $("#alert").css({'margin-top': -height/2});
    $("#alert .alert-ok").die().click(function() {
        closeAlert();
        if (onClick) {
            onClick();
        }
    });
}
function closeAlert(){
    $(".cover3").remove();
    $("#alert").remove();
}
/*微信接口 */
//隐藏微信中网页右上角按钮
/*document.addEventListener('WeixinJSBridgeReady', function onBridgeReady() {
 WeixinJSBridge.call('hideOptionMenu');
 });*/
//隐藏微信中网页底部导航栏
document.addEventListener('WeixinJSBridgeReady', function onBridgeReady() {
    WeixinJSBridge.call('hideToolbar');
});

