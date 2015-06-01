<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<!doctype html>
<html>
<head>
<meta charset="utf-8">
<title>七星彩投注</title>
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

</head>
<body>
<div class="page-from-left index">
	<div class="top fix">
    	<div class="top-relative clearfix">
        	<a href="index.jsp" class="go-pre"></a>
            <a href="javascript:xuanqiuShow()" class="go-pre" style="display:none"></a>
        	<span class="title">七星彩</span>
        </div>
    </div>
    <div class="cb"></div>
<!--顶部结束-->
<!--正文内容开始-->
	
	<div class="content">
    	<div class="bar-tip"><span>第<font class="redtext" id="termCode">14197</font>期</span><span>截止时间：<font class="redtext" id="lastime">12-29 16:00</font></span></div>	
        <!--选球-->
        <div class="xuanqiu">
            <div class="tab-content p10" id="putong" style="display:block" data-red="7" data-blue="0">
            	<p class="tz-tit-left">每位都要至少选择1个号码</p>
                <div class="cb"></div>
                <div class="clearfix pailei">
                    <div class="fl wei">一位</div>
                    <div class="weiright">
                        <span class="redball">0</span><span class="redball">1</span><span class="redball">2</span><span class="redball">3</span><span class="redball">4</span>
                        <span class="redball">5</span><span class="redball">6</span><span class="redball">7</span><span class="redball">8</span><span class="redball">9</span>
                    </div>
                 </div>  
                 <div class="clearfix pailei">
                    <div class="fl wei">二位</div>
                    <div class="weiright">
                        <span class="redball">0</span><span class="redball">1</span><span class="redball">2</span><span class="redball">3</span><span class="redball">4</span>
                        <span class="redball">5</span><span class="redball">6</span><span class="redball">7</span><span class="redball">8</span><span class="redball">9</span>
                    </div>
                 </div>  
                 <div class="clearfix pailei">
                    <div class="fl wei">三位</div>
                    <div class="weiright">
                        <span class="redball">0</span><span class="redball">1</span><span class="redball">2</span><span class="redball">3</span><span class="redball">4</span>
                        <span class="redball">5</span><span class="redball">6</span><span class="redball">7</span><span class="redball">8</span><span class="redball">9</span>
                    </div>
                 </div>  
                 <div class="clearfix pailei">
                    <div class="fl wei">四位</div>
                    <div class="weiright">
                        <span class="redball">0</span><span class="redball">1</span><span class="redball">2</span><span class="redball">3</span><span class="redball">4</span>
                        <span class="redball">5</span><span class="redball">6</span><span class="redball">7</span><span class="redball">8</span><span class="redball">9</span>
                    </div>
                 </div>  
                 <div class="clearfix pailei">
                    <div class="fl wei">五位</div>
                    <div class="weiright">
                        <span class="redball">0</span><span class="redball">1</span><span class="redball">2</span><span class="redball">3</span><span class="redball">4</span>
                        <span class="redball">5</span><span class="redball">6</span><span class="redball">7</span><span class="redball">8</span><span class="redball">9</span>
                    </div>
                 </div>  
                  <div class="clearfix pailei">
                    <div class="fl wei">六位</div>
                    <div class="weiright">
                        <span class="redball">0</span><span class="redball">1</span><span class="redball">2</span><span class="redball">3</span><span class="redball">4</span>
                        <span class="redball">5</span><span class="redball">6</span><span class="redball">7</span><span class="redball">8</span><span class="redball">9</span>
                    </div>
                 </div>  
                  <div class="clearfix pailei">
                    <div class="fl wei">七位</div>
                    <div class="weiright">
                        <span class="redball">0</span><span class="redball">1</span><span class="redball">2</span><span class="redball">3</span><span class="redball">4</span>
                        <span class="redball">5</span><span class="redball">6</span><span class="redball">7</span><span class="redball">8</span><span class="redball">9</span>
                    </div>
                 </div>
                <div class="cbClear"></div>
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
        	<span id="ptmeizhu">
    			<a class="del-red" href="javascript:void(-1)" id="del-ball-pt"></a>
        		<span class="fl">共<font class="redtext" id="ptzhushu" >0</font>注
           		<font class="redtext"  id="ptqianshu">0</font>元</span>  
             </span>
             <span id="dtmeizhu" style="display:none;">
    			<a class="del-red" href="javascript:void(-1)" id="del-ball-dt"></a>
        		<span class="fl">共<font class="redtext" id="dtzhushu" >0</font>注
           		<font class="redtext"  id="dtqianshu">0</font>元</span>  
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
	<script type="text/javascript" src="js/pl.js"></script>
    <script type="text/javascript" src="js/contect.js"></script>
    <div id="game" style="display:none" data-game="T02" data-play="00"></div>
</div>
</body>
</html>
