<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<!doctype html>
<html>
<head>
<meta charset="utf-8">
<title>竞彩足球</title>
<META HTTP-EQUIV="Pragma" CONTENT="no-cache">
<META HTTP-EQUIV="Cache-Control" CONTENT="no-cache">
<META HTTP-EQUIV="Expires" CONTENT="0"> 
<meta name="viewport" content="initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no, width=device-width">
<link type="text/css" rel="stylesheet" href="css/reset.css" />
<link type="text/css" rel="stylesheet" href="css/common.css" />
<style type="text/css">.jc-step2{ display:none;}.spf-dd{ display:none;}</style>
<script type="text/javascript" src="js/jquery-1.8.2.min.js"></script>
<script type="text/javascript" src="js/common.js"></script>
<script type="text/javascript" src="js/jczqcontect.js"></script>
<jsp:include page="include/login.jsp" flush="true"/>

</head>
<body class="jc-bg">
<div class="page-from-left index">
	<div class="top fix">
    	<div class="top-relative clearfix">
        	<a href="jczq.jsp" id="jc-one" class="go-pre"></a>
            <a href="javascript:jcone()" id="jc-two" class="go-pre" style="display:none"></a>
        	<span class="title" style="margin-left:-12px;">
                竞彩足球<a class="selmore" href="javascript:void(-1)" onClick="$('#jc-gg-pop').show();">让球胜平负<img src="img/down_wite.png"/></a>
            </span>
            <a href="javascript:void(-1)" class="go-more stopp" onClick="$('.cover').show();$('#jc-ss-pop').show();"></a>
        </div>
    </div>
    <div class="cb"></div>
<!--顶部结束-->
<!--正文内容开始-->
	<!--第一步页面-->
    <div class="content jc-step1" id="jc-match">
    	 <!--<ul class="jc-nav clearfix"><li class="now">购彩</li><li>定制跟单</li><li>合买大厅</li><li>玩法帮助</li></ul>  -->
         <img src="img/009.gif" id="login-img"/>                                     
    </div>
    <!--第一步页面结束-->
    <!--第二步页面-->
    <div class="content jc-step2">
    	<div class="jc-litt"></div>
    	<div class="jc-list clearfix"></div>
        <div class="jc-liss"></div>
        <a class="m-bigbtn-green" onClick="jcone()"><img src="img/jia_wite.png" style="vertical-align:middle; margin-right:5px;"/>继续选择添加赛事</a>
        <span class="jc-xchuan"><span><img src="img/up_grey.png"></span><span id="chuanguan" class="greentext"></span></span>
        <span class="jc-bei clearfix">
            <span class="jc-k-left">&nbsp;</span>
            <span class="jj-k-font" style="text-align:right;">投</span>
            <span class="jj-k-ss" style="width:20%;"><input id="beishu" type="text" value="1" class="no-boder greentext"></span>
            <span class="jj-k-font" style="text-align:left;">倍</span>
            <span class="jc-k-right">&nbsp;</span>
        </span>
        <div class="cb"></div>     
    </div>
    <div style="height:10px"></div>
    <!--第二步页面结束-->
    <script type="text/javascript" src="js/base.js"></script>
	<script type="text/javascript" src="js/commontz.js"></script>
     <script type="text/javascript" src="js/mcn.js"></script>
    <script type="text/javascript" src="js/jc.js"></script>
    <script type="text/javascript" src="js/jczq.js"></script> 
    <div id="game" data-play="01" data-game="T51" style="display:none"></div>
<!--正文内容结束-->   
</div>
<!--底部开始-->
<!--第一步底部-->
<div class="jc-footer bottomfix jc-step1">
	<div class="jc-footer-box">
		<div class="jc-del"></div>
        <div class="jc-ok"></div>
        <div class="jc-tz-tip" id="jc-cs">至少选2场比赛</div>
    </div>
</div>	
<!--第一步底部结束-->
<!--第二步底部-->
<div class="jc-footer2 bottomfix2 jc-step2">
    <span>共 <font class="orgtext" id="zhushu">0</font> 注</span>
    <span>投注金额 <font class="orgtext" id="qianshu">0</font> 元</span><span></span>
    <font id="beishu" class="redtext boq" style="display:none">1</font>
    <font id="qishu" class="redtext boq" style="display:none">1</font>
</div>
<div class="footer-tz green-footer jc-bg jc-step2" style="background-color:transparent;">
     <a href="javascript:void(-1)" id="tz-btn" class="green-footer-btn fr">立即购买</a>
     <div class="greentext"><span class="green-check" id="check-cb-jc">使用彩币支付</span></div>
</div>
<!--第二步底部结束-->
<!-- 弹出层开始-->
<div class="cover"></div>
<div class="mt-fix" id="jc-gg-pop">
    	<a href="jczq.jsp">胜平负</a><a href="jczq_rf.jsp">让球胜平负</a><!--<a href="jczq_ht.html">混合过关</a>-->
        <div class="cb"></div>
</div>
<div class="mmt-fix" id="jc-ss-pop">
    <div class="mt-xiang clearfix">
        <a href="javascript:void(-1)" onClick="$(this).parent().parent().find('span').addClass('on');">全选</a>
        <a href="javascript:void(-1)" class="fanxuan">反选</a><a href="javascript:void(-1)" id="jc-bigls">五大联赛</a>
    </div>
    <div id="jc-liansai"></div>
    <div class="cb"></div>
    <a class="mt-cancel" href="javascript:void(-1)" onClick="$('.cover').hide();$(this).parent().hide()">取消</a>
    <a id="jc-ls-ok" class="mt-cancel" href="javascript:void(-1)">确认</a>
</div>
<div class="chuanguan" id="xchuan">
	<div class="title">自由过关</div>
    <div id="zy-chuan" class="clearfix" style="display:inline-block;"></div>
    <div class="cb"></div>
    <div class="title">多串过关</div>
    <div id="duo-chuan" class="clearfix" style="display:inline-block;"></div>
    <div class="cb"></div>
    <a class="mt-cancel" onclick="$('.cover').hide();$(this).parent().hide()" href="javascript:void(-1)">取消</a>
	<a class="mt-ok" href="javascript:void(-1)">确认</a>
</div>
<!-- 弹出层结束-->
</body>
</html>
