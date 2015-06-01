<%@ page language="java" pageEncoding="UTF-8" %>
<!doctype html>
<html>
<head>
    <meta charset="utf-8">
    <title>中心线彩票店</title>
    <META HTTP-EQUIV="Pragma" CONTENT="no-cache">
    <META HTTP-EQUIV="Cache-Control" CONTENT="no-cache">
    <META HTTP-EQUIV="Expires" CONTENT="0">
    <meta name="viewport"
          content="initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no, width=device-width">
    <link type="text/css" rel="stylesheet" href="css/reset.css"/>
    <link type="text/css" rel="stylesheet" href="css/idangerous.swiper.css"/>
    <link type="text/css" rel="stylesheet" href="css/start.css"/>
    <script type="text/javascript" src="js/jquery-1.8.2.min.js"></script>
    <script type="text/javascript" src="js/common.js"></script>
    <script type="text/javascript" src="js/jquery.cookie.js"></script>
    <script type="text/javascript" src="js/touchslider.dev.js"></script>
    <script type="text/javascript" src="js/banner.js"></script>
    <script type="text/javascript" src="js/fastclick.js"></script>

    <jsp:include page="include/login.jsp" flush="true"/>
    <style>
        #wrapper{width:100%;overflow:hidden;background:#fff}
        .swipe ul,.swipe li{margin:0;padding:0;list-style:none;overflow:hidden}
        .swipe img{width:100%;height:auto;display:block}
        .swipe{overflow:hidden;position:relative}
        .swipe ul{-webkit-transition:left 800ms ease-in 0;-moz-transition:left 800ms ease-in 0;-o-transition:left 800ms ease-in 0;-ms-transition:left 800ms ease-in 0;transition:left 800ms ease-in 0}
        .swipe #pagenavi{position:absolute;left:0;bottom:0;text-align:center;width:100%;height:30px;line-height:30px;background:rgba(0,0,0,0.2)}
        .swipe #pagenavi a{width:10px;height:10px;opacity:.8;line-height:99em;background:#fff;-webkit-border-radius:50%;-moz-border-radius:50%;border-radius:50%;margin:0 3px;overflow:hidden;cursor:pointer;display:inline-block;*display:inline;*zoom:1}
        .swipe #pagenavi a.active{background:#da251c}
    </style>
    <script type="text/javascript">
        //判断是否是ios客户端
        $(document).ready(function(e) {
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
            if (browser.versions.android){
                $('#wrapper').css("margin-top","10px");
            }
            $("#my-caipiao").click(function(){
                var login = sessionStorage.getItem("login");
                if(!login){
                    alert("您未登录，请登录",function(){
                        window.location.href="login.html";
                    })
                }else{
                    window.location.href="acount.html";
                }
            })
        });
    </script>
</head>
<body>
<div class="page-from-left index">
    <div class="top fix">
        <div class="top-relative clearfix">
            <!-- <a href="javascript:void(-1)" onClick='setWebitEvent("return", "LT01");' class="go-pre"></a>-->
            <a class="msyh-login" id="yes-denglu" href="login.html">登录</a>
            <span class="title"
                  style="float:none; display:block; width:220px; text-align:center; margin:0px auto;">中心线彩票店</span>
        </div>
    </div>
    <div class="cb"></div>
    <div style="height:40px;">&nbsp;</div>
    <!--顶部结束-->
    <!--正文内容开始-->
    <div id="wrapper" >
        <div class="swipe">
            <ul id="slider">
                <!--    <li><a href="dlt.jsp"><img src="img/newdltad.jpg" /></a></li>  -->
                <li><a href="activity.html"><img src="img/ssqad_1.jpg"  /></a></li>
                <li><a href="#"><img src="img/txad_1.jpg" /></a></li>
                <!--  <li><a href="xb_login.jsp"><img src="img/search.jpg"  /></a></li>-->

            </ul>
            <div id="pagenavi"></div>
        </div>
    </div>



    <div class="content start-ms clearfix" style="margin-top:0px" id="more">
        <!--    <a href="caiyuan.html" class="start-caiyuan"><img src="img/bangshangyouming.png"/></a>
        -->
        <ul id="caizhong-ul" class="clearfix">
            <li id="jczq"><a class="ico-box" href="jczq.jsp"><img src="img/ico_jczq.png"/>竞彩足球</a></li>
            <li id="dlt"><a class="ico-box" href="dlt.jsp"><img src="img/ico_dlt.png"/>大乐透</a></li>
            <li id="c11x5"><a class="ico-box" href="c11x5.jsp"><img src="img/ico_11xuan5.png"/>11选5</a></li>
            <li id="pl3"><a class="ico-box" href="pl3.jsp"><img src="img/ico_pl3.png"/>排列三</a></li>
            <li id="pl5"><a class="ico-box" href="pl5.jsp"><img src="img/ico_pl5.png"/>排列五</a></li>
            <li id="qxc"><a class="ico-box" href="qxc.jsp"><img src="img/ico_qxc.png"/>七星彩</a></li>
            <li><a class="ico-box" href="czadd.html"><img src="img/ico_add.png"/>添加</a></li>
        </ul>
        <ul id="more-ul" class="clearfix">
            <li><a class="ico-box" href="main.html"><img src="img/icoy_11.png"/>购彩大厅</a></li>
            <li><a class="ico-box" href="result.html"><img src="img/icoy_13.png"/>开奖公告</a></li>
            <li><a id="my-caipiao" class="ico-box" href="javascript:void(-1)"><img src="img/icoy_12.png"/>我的彩票</a></li>
            <!--<li><a class="ico-box" href="czdingzhi.html"><img src="img/icoy_14.png"  />彩票定制</a></li>-->
            <!-- <li><a class="ico-box" href="active.html"><img src="img/icoy_15.png" />活动中心</a></li>-->
            <li><a class="ico-box" href="gchelp.html"><img src="img/icoy_16.png"/>购彩帮助</a></li>
        </ul>
    </div>
    <!--正文内容结束-->
</div>
</body>



</html>
