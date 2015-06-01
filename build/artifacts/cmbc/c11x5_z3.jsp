<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<!doctype html>
<html>
<head>
<meta charset="utf-8">
<title>11选5投注</title>
<META HTTP-EQUIV="Pragma" CONTENT="no-cache">
<META HTTP-EQUIV="Cache-Control" CONTENT="no-cache">
<META HTTP-EQUIV="Expires" CONTENT="0"> 
<meta name="viewport" content="initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no, width=device-width">
<link type="text/css" rel="stylesheet" href="css/reset.css" />
<link type="text/css" rel="stylesheet" href="css/common.css" />
<script type="text/javascript" src="js/jquery-1.8.2.min.js"></script>
<script type="text/javascript" src="js/common.js"></script>
    <jsp:include page="include/login.jsp" flush="true"/>

</head>
<body>
<div class="page-from-left index">
	<div class="top fix">
    	<div class="top-relative clearfix">
        	<a href="c11x5.jsp" class="go-pre"></a>
            <a href="javascript:xuanqiuShow()" class="go-pre" style="display:none"></a>
        	<span class="title"><span class="pt2">11选5</span><a class="selmore" href="javascript:void(-1)">前三直选<img src="img/down_yellow.png"/></a></span>
        </div>
    </div>
    <div class="cb"></div>
<!--顶部结束-->
<!--正文内容开始-->
	<div class="content">
    	<div class="bar-tip"><span>第<font class="redtext" id="termCode"></font>期</span><span>截止时间：<font class="redtext"  id="lastime"></font></span><!--<span id="x115">距本期截止<font class="redtext minutes"></font>分<font class="redtext seconds"></font>秒</span>--></div>		
        <!--选球-->
        <div class="xuanqiu">
            <div class="bar-tip nav2 mb5 clearfix">
            	<a class="tab-nav more-tou now" style="width:50%;">定位投注</a>
                <a class="tab-nav more-tou" style="width:50%;">复式</a>
            </div>
            <div class="tab-content p10" id="dpailei" style="display:block;" data-type="1">
            	<p class="gerytext pl10">玩法提示：每位各选1个号码。1/990的中奖机会，奖金1，170元。</p>
            	<div class="clearfix pailei">
                    <div class="fl wei">一位</div>
                    <div class="weiright">
                        <span class="redball">1</span><span class="redball">2</span><span class="redball">3</span>
                        <span class="redball">4</span><span class="redball">5</span><span class="redball">6</span><span class="redball">7</span>
                        <span class="redball">8</span><span class="redball">9</span><span class="redball">10</span><span class="redball">11</span>
                    </div>
                 </div>  
                 <div class="clearfix pailei">
                    <div class="fl wei">二位</div>
                    <div class="weiright">
                        <span class="redball">1</span><span class="redball">2</span><span class="redball">3</span>
                        <span class="redball">4</span><span class="redball">5</span><span class="redball">6</span><span class="redball">7</span>
                        <span class="redball">8</span><span class="redball">9</span><span class="redball">10</span><span class="redball">11</span>
                    </div>
                 </div>  
                 <div class="clearfix pailei">
                    <div class="fl wei">三位</div>
                    <div class="weiright">
                        <span class="redball">1</span><span class="redball">2</span><span class="redball">3</span>
                        <span class="redball">4</span><span class="redball">5</span><span class="redball">6</span><span class="redball">7</span>
                        <span class="redball">8</span><span class="redball">9</span><span class="redball">10</span><span class="redball">11</span>
                    </div>
                 </div>    
            </div>
            <div class="tab-content p10" id="putong"  data-red="3" data-blue="0" data-type="2" data-des="前三直选">
            	<p class="gerytext pl10">玩法提示：所选号码与开奖号码前三位一致即中奖，奖金1，170元。</p>
                <span class="tz-tit-left"><font class="redtext"></font>至少选3个号码</span>
                <!--<span class="tz-tit-right1 red" id="jx-hq">2个</span>
                <span class="tz-tit-right2 red" onClick="selqiu($('#putong').find('.redball'),2)">机选号码</span>-->
                <div class="cb"></div>
                <span class="redball">1</span><span class="redball">2</span><span class="redball">3</span><span class="redball">4</span><span class="redball">5</span>
                <span class="redball">6</span><span class="redball">7</span><span class="redball">8</span><span class="redball">9</span><span class="redball">10</span>
                <span class="redball">11</span>
            </div>
        </div>
        <!--选球结束-->
        <!--选号列表-->
        <div class="xqll" style="display:none;">
            <span class="x-btn" onClick="xuanqiuShow()"><span class="clearfix"><img src="img/jia_bg.png" class="mr15"/>自选号码</span></span>
            <span class="x-btn" id="jxyz"><img src="img/jia_bg.png"/>机选一注</span>
            <div class="cb"></div>
            <p class="pl10">选号列表</p>
            <div id="xh-box"></div>
            <!--更多选项-->
            <div class="tz-more">
            	<div id="tz-more-btn" class="tz-more-btn"></div>
                <div id="tz-more-content" class="tz-more-content clearfix">
                	<div class="tz-more-content-box">
                        <div class="jj-k clearfix">
                            <span class="jj-k-left"></span>
                            <span class="jj-k-font">投</span><span><input type="text" class="no-boder" value="1"/></span><span class="jj-k-font2">倍</span>
                            <span class="jj-k-right"></span>
                        </div>
                        <div class="cb"></div>
                        <div class="h5"></div>
                        <div class="jj-k clearfix fl">
                            <span class="jj-k-left"></span>
                            <span class="jj-k-font">买</span><span><input type="text" class="no-boder" value="1"/></span><span class="jj-k-font2">期</span>
                            <span class="jj-k-right"></span>
                        </div>
                        <div id="caibizhifu" class="fl" style="display:none;"><span id="check-cb" class="now"></span>彩币支付</div>
                        <div class="jj-k-check"><span class="check-org" id="zjstop"></span><span class="fl">中奖后停止追号</span></div>
                        <div class="cb"></div>
                        <div class="h5"></div>
                   		<div class="tz-more-sel">
                    	<div class="sel-tzz clearfix">
                        	<span class="fl">投注站</span>
                            <a class="litt-go fr"></a>
                            <span class="redtext fr">查找投注站</span>
                        </div>
                        <div class="sel-zf clearfix" id="show-zfb">
                        	<span class="fl">支付方式</span>
                            <a class="litt-go fr"></a>
                            <span class="bluetext fr">支付宝在线支付</span>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
            <!--end更多选项-->
        </div>
        <!--选号列表结束-->
    </div>
   
    
<!--正文内容结束-->   
<!--投注底部开始-->
	<div class="footer-tz">
    	<span id="meizhu">
        	<span class="meizhu" style="display:block;">
    			<a class="del-red" href="javascript:void(-1)"></a>
        		<span class="fl">共<font class="redtext meizhushu" >0</font>注
           		<font class="redtext meizhuqian">0</font>元</span>  
             </span>
             <span class="meizhu">
    			<a class="del-red" href="javascript:void(-1)"></a>
        		<span class="fl">共<font class="redtext meizhushu" >0</font>注
           		<font class="redtext meizhuqian">0</font>元</span>  
             </span>
        </span>
        <span id="qi-bei">
        	<span class="fl">共<font class="redtext" id="zhushu" >0</font>注
            <font class="redtext boq" id="beishu">1</font>倍
             <font class="redtext boq" id="qishu">1</font>期，
            <font class="redtext" id="qianshu">0</font>元</span>    
        </span>
       		
        <a class="xuanhao-btn step1 fr" href="javascript:void(-1)">选好了</a>
    </div>
     <script type="text/javascript" src="js/base.js"></script>
	 <script type="text/javascript" src="js/commontz.js"></script>
     <script type="text/javascript" src="js/c11x5z2z3.js"></script>
     <script type="text/javascript" src="js/contect11x5.js"></script>
    <div id="game" style="display:none" data-game="T05" data-play="32"></div>
</div>
<!--弹出层-->
<div class="cover"></div>
<div class="pop pop-red-div clearfix">
	<span class="pop-red">5</span><span class="pop-red">6</span><span class="pop-red">7</span>
    <span class="pop-red">8</span><span class="pop-red">9</span>
    <span class="pop-red">10</span><span class="pop-red">11</span>
</div>
<div class="pop pop-renxuan-div clearfix">
	<div class="text-center">请选择玩法</div>
    <div class="pop-renxuan-dd">
        <a href="c11x5_2.jsp" class="pop-red">任选二</a><a href="c11x5_3.jsp" class="pop-red">任选三</a><a href="c11x5_4.jsp" class="pop-red">任选四</a>
        <a href="c11x5.jsp" class="pop-red">任选五</a><a href="c11x5_6.jsp" class="pop-red">任选六</a><a href="c11x5_7.jsp" class="pop-red">任选七</a>
        <a href="c11x5_8.jsp" class="pop-red">任选八</a><a href="c11x5_z1.jsp" class="pop-red">前一直选</a><a href="c11x5_z2.jsp" class="pop-red">前二直选</a>
       <a href="c11x5_zu2.jsp" class="pop-red">前二组选</a><a href="c11x5_z3.jsp" class="pop-red">前三直选</a><a href="c11x5_zu3.jsp" class="pop-red">前三组选</a>
    </div>
</div>
<!--弹出层结束-->
</body>
</html>
