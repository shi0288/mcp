<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<!doctype html>
<html>
<head>
<meta charset="utf-8">
<title>福彩3D</title>
<META HTTP-EQUIV="Pragma" CONTENT="no-cache">
<META HTTP-EQUIV="Cache-Control" CONTENT="no-cache">
<META HTTP-EQUIV="Expires" CONTENT="0"> 
<meta http-equiv="cache-control" content="no-cache">
<meta content="yes" name="apple-mobile-web-app-capable">
<meta content="black" name="apple-mobile-web-app-status-bar-style">
<meta name="format-detection" content="telephone=no">
<meta name="viewport" content="initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no, width=device-width">
<link type="text/css" rel="stylesheet" href="css/reset.css" />
<link type="text/css" rel="stylesheet" href="css/common.css" />
<script type="text/javascript" src="js/jquery-1.8.2.min.js"></script>
<script type="text/javascript" src="js/common.js"></script>
    <jsp:include page="include/login.jsp" flush="true"/>

    <style type="text/css">
.pop-renxuan-div.pop-pl3 .pop-red{ width:60px;}
.pop-renxuan-div.pop-pl3{ height:110px;}
</style>
</head>
<body>
<div class="page-from-left index">
	<div class="top fix">
    	<div class="top-relative clearfix">
        	<a href="fc3d.jsp" class="go-pre"></a>
            <a href="javascript:xuanqiuShow()" class="go-pre" style="display:none"></a>
        	<span class="title"><span class="pt2">福彩3D</span><a class="selmore" href="javascript:void(-1)">组选六<img src="img/down_yellow.png"/></a></span>
        </div>
    </div>
    <div class="cb"></div>
<!--顶部结束-->
<!--正文内容开始-->
	<div class="content">
    	<div class="bar-tip"><span>第<font id="termCode" class="redtext"></font>期</span><span>截止时间：<font class="redtext" id="lastime"></font></span></div>		
        <!--选球-->
        <div class="xuanqiu">
            <div class="bar-tip nav2 mb5 clearfix">
            	<a class="tab-nav more-tou now" style="width:100%;">复式投注</a>
               <!-- <a class="tab-nav more-tou" style="width:50%;">组选和值</a>-->
            </div>
  			<div class="tab-content p10" id="putong" data-red="3" data-blue="0" data-type="2" data-des="组选六" style="display:block;">
                <span class="tz-tit-left"><font class="redtext"></font>至少选4个号码</span>
                <div class="cb"></div>
                <span class="redball">0</span>
                <span class="redball">1</span><span class="redball">2</span><span class="redball">3</span><span class="redball">4</span>
                <span class="redball">5</span><span class="redball">6</span><span class="redball">7</span><span class="redball">8</span>
                <span class="redball">9</span>
            </div>
            <div id="pailei" style="display:none;" data-type="1">
            	<p class="gerytext pl10">玩法提示：每位至少选择1个号码。</p>
            	<div class="clearfix pailei">
                    <div class="fl wei">百位</div>
                    <div class="fl">
                        <span class="redball">0</span><span class="redball">1</span><span class="redball">2</span><span class="redball">3</span>
                        <span class="redball">4</span><span class="redball">5</span><span class="redball">6</span><span class="redball">7</span>
                        <span class="redball">8</span><span class="redball">9</span>
                    </div>
                 </div>  
                 <div class="clearfix pailei">
                    <div class="fl wei">十位</div>
                    <div class="fl">
                         <span class="redball">0</span><span class="redball">1</span><span class="redball">2</span><span class="redball">3</span>
                        <span class="redball">4</span><span class="redball">5</span><span class="redball">6</span><span class="redball">7</span>
                        <span class="redball">8</span><span class="redball">9</span>
                    </div>
                 </div>  
                 <div class="clearfix pailei">
                    <div class="fl wei">个位</div>
                    <div class="fl">
                         <span class="redball">0</span><span class="redball">1</span><span class="redball">2</span><span class="redball">3</span>
                        <span class="redball">4</span><span class="redball">5</span><span class="redball">6</span><span class="redball">7</span>
                        <span class="redball">8</span><span class="redball">9</span>
                    </div>
                 </div>    
            </div>
           <!-- <div class="tab-content p10" id="hezhi" data-arr="1,2,2,4,5,6,8,10,11,13,14,14,15,15,14,14,13,11,10,8,6,5,4,2,2,1" data-type="3">
            	<p class="gerytext pl10">玩法提示：所选和值与开奖号码前三位之和的值相同即中奖，奖金1，170元。</p>
                <span class="tz-tit-left">至少选择1个和值号码</span>
                <div class="cb"></div>
                <div class="clearfix">
                   <span class="redball">1</span><span class="redball">2</span>
                   <span class="redball">3</span><span class="redball">4</span><span class="redball">5</span>
                   <span class="redball">6</span><span class="redball">7</span><span class="redball">8</span>
                   <span class="redball">9</span><span class="redball">10</span><span class="redball">11</span>
                   <span class="redball">12</span><span class="redball">13</span><span class="redball">14</span>
                   <span class="redball">15</span><span class="redball">16</span><span class="redball">17</span>
                   <span class="redball">18</span><span class="redball">19</span><span class="redball">20</span>
                   <span class="redball">21</span><span class="redball">22</span><span class="redball">23</span>
                   <span class="redball">24</span><span class="redball">25</span><span class="redball">26</span>
                </div>
            </div>  -->
            
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
                        <div id="caibizhifu" class="fl"><span id="check-cb"></span>彩币支付</div>
                        <div class="cb"></div>
                        <div class="h5"></div>
                        <div class="jj-k clearfix fl">
                            <span class="jj-k-left"></span>
                            <span class="jj-k-font">买</span><span><input type="text" class="no-boder" value="1"/></span><span class="jj-k-font2">期</span>
                            <span class="jj-k-right"></span>
                        </div>
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
     <script type="text/javascript" src="js/fc3d_zu6.js"></script>
     <script type="text/javascript" src="js/contect.js"></script>
     <div id="game" style="display:none" data-game="F02" data-play="03"></div>
</div>
<!--弹出层-->
<div class="cover"></div>
<div class="pop pop-pay">
	<div class="title">请选择支付方式</div>
    <div class="div1"><span>银联卡在线支付</span><a href="#" class="litt-go"></a></div>
    <div class="div2"><span>支付宝在线支付</span><a href="#" class="litt-go"></a></div>
	<div class="div3"><span>投注站预存款</span><a href="#" class="litt-go"></a></div>
    <p class="p10"><a href="#" class="x-btn" onClick="$('.cover').hide();$(this).parents('.pop').hide()">取消</a></p>
</div>
<div class="pop pop-red-div clearfix">
	<span class="pop-red">5</span><span class="pop-red">6</span><span class="pop-red">7</span>
    <span class="pop-red">8</span><span class="pop-red">9</span>
    <span class="pop-red">10</span><span class="pop-red">11</span>
</div>
<div class="pop pop-renxuan-div pop-pl3 clearfix">
	<div class="text-center">请选择玩法</div>
    <div class="pop-renxuan-dd">
        <a href="fc3d.jsp" class="pop-red">直选</a>
        <a href="fc3d_zu3.jsp" class="pop-red">组选三</a><a href="fc3d_zu6.jsp" class="pop-red">组选六</a>
    </div>
</div>
<!--弹出层结束-->
</body>
</html>
