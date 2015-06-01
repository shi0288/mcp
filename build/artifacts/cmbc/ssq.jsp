<%@ page language="java" pageEncoding="UTF-8" %>
<!doctype html>
<html>
<head>
    <meta charset="utf-8">
    <title>双色球投注</title>
    <META HTTP-EQUIV="Pragma" CONTENT="no-cache">
    <META HTTP-EQUIV="Cache-Control" CONTENT="no-cache">
    <META HTTP-EQUIV="Expires" CONTENT="0">
    <meta http-equiv="cache-control" content="no-cache">
    <meta content="yes" name="apple-mobile-web-app-capable">
    <meta content="black" name="apple-mobile-web-app-status-bar-style">
    <meta name="viewport"
          content="initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no, width=device-width">
    <link type="text/css" rel="stylesheet" href="css/reset.css"/>
    <link type="text/css" rel="stylesheet" href="css/common.css"/>
    <script type="text/javascript" src="js/jquery-1.8.2.min.js"></script>
    <script type="text/javascript" src="js/common.js"></script>
    <script type="text/javascript" src="js/iphone.js"></script>
    <jsp:include page="include/login.jsp" flush="true"/>
</head>
<body>
<div class="page-from-left index">
    <div class="top fix">
        <div class="top-relative clearfix">
            <a href="index.jsp" class="go-pre"></a>
            <a href="javascript:xuanqiuShow()" class="go-pre" style="display:none"></a>
            <span class="title">双色球</span>
        </div>
    </div>
    <div class="cb"></div>
    <!--顶部结束-->
    <!--正文内容开始-->
    <div class="content">
        <div class="bar-tip"><span>第<font class="redtext" id="termCode"></font>期</span>
            <span style="margin-right:0px;">截止时间：<font class="redtext" id="lastime"></font></span>
        </div>
        <!--选球-->
        <div class="xuanqiu">
            <div class="bar-tip nav2 mb5 clearfix">
                <a class="tab-nav now" onClick='$("#dtmeizhu").hide();$("#ptmeizhu").show();'>普通投注</a>
                <a class="tab-nav" onClick='$("#ptmeizhu").hide();$("#dtmeizhu").show();'>胆拖投注</a>
            </div>
            <div class="tab-content p10" id="putong" style="display:block" data-red="6" data-blue="1">
                <span class="tz-tit-left"><font class="redtext">红球</font>至少选6个</span>
                <span class="tz-tit-right1 red" id="jx-hq">6个</span>
                <span class="tz-tit-right2 red" onClick="selqiu($('#putong').find('.redball'),6)">机选红球</span>

                <div class="cb"></div>
                <span class="redball">01</span><span class="redball">02</span><span class="redball">03</span><span
                    class="redball">04</span><span class="redball">05</span>
                <span class="redball">06</span><span class="redball">07</span><span class="redball">08</span><span
                    class="redball">09</span><span class="redball">10</span>
                <span class="redball">11</span><span class="redball">12</span><span class="redball">13</span><span
                    class="redball">14</span><span class="redball">15</span>
                <span class="redball">16</span><span class="redball">17</span><span class="redball">18</span><span
                    class="redball">19</span><span class="redball">20</span>
                <span class="redball">21</span><span class="redball">22</span><span class="redball">23</span><span
                    class="redball">24</span><span class="redball">25</span>
                <span class="redball">26</span><span class="redball">27</span><span class="redball">28</span><span
                    class="redball">29</span><span class="redball">30</span>
                <span class="redball">31</span><span class="redball">32</span><span class="redball">33</span>

                <div class="cb p10"></div>
                <span class="tz-tit-left"><font class="bluetext">蓝球</font>至少选1个</span>
                <span class="tz-tit-right1 blue" id="jx-lq">1个</span>
                <span class="tz-tit-right2 blue" onClick="selqiu($('#putong').find('.blueball'),1)">机选蓝球</span>

                <div class="cb"></div>
                <span class="blueball">01</span><span class="blueball">02</span><span class="blueball">03</span><span
                    class="blueball">04</span><span class="blueball">05</span>
                <span class="blueball">06</span><span class="blueball">07</span><span class="blueball">08</span><span
                    class="blueball">09</span><span class="blueball">10</span>
                <span class="blueball">11</span><span class="blueball">12</span><span class="blueball">13</span><span
                    class="blueball">14</span><span class="blueball">15</span>
                <span class="blueball">16</span>

                <div class="cbClear"></div>
            </div>
            <div class="tab-content p10" id="dantuo">
                <span class="tz-tit-left"><font class="redtext">红球胆码</font>至少选择1个，最多选择5个</span>

                <div class="cb"></div>
                <div class="clearfix" id="dan">
                    <span class="redball">01</span><span class="redball">02</span><span class="redball">03</span><span
                        class="redball">04</span><span class="redball">05</span>
                    <span class="redball">06</span><span class="redball">07</span><span class="redball">08</span><span
                        class="redball">09</span><span class="redball">10</span>
                    <span class="redball">11</span><span class="redball">12</span><span class="redball">13</span><span
                        class="redball">14</span><span class="redball">15</span>
                    <span class="redball">16</span><span class="redball">17</span><span class="redball">18</span><span
                        class="redball">19</span><span class="redball">20</span>
                    <span class="redball">21</span><span class="redball">22</span><span class="redball">23</span><span
                        class="redball">24</span><span class="redball">25</span>
                    <span class="redball">26</span><span class="redball">27</span><span class="redball">28</span><span
                        class="redball">29</span><span class="redball">30</span>
                    <span class="redball">31</span><span class="redball">32</span><span class="redball">33</span>
                </div>
                <span class="tz-tit-left mt10"><font class="redtext">红球拖码</font>至少选择2个</span>

                <div class="cb"></div>
                <div class="clearfix" id="tuo">
                    <span class="redball">01</span><span class="redball">02</span><span class="redball">03</span><span
                        class="redball">04</span><span class="redball">05</span>
                    <span class="redball">06</span><span class="redball">07</span><span class="redball">08</span><span
                        class="redball">09</span><span class="redball">10</span>
                    <span class="redball">11</span><span class="redball">12</span><span class="redball">13</span><span
                        class="redball">14</span><span class="redball">15</span>
                    <span class="redball">16</span><span class="redball">17</span><span class="redball">18</span><span
                        class="redball">19</span><span class="redball">20</span>
                    <span class="redball">21</span><span class="redball">22</span><span class="redball">23</span><span
                        class="redball">24</span><span class="redball">25</span>
                    <span class="redball">26</span><span class="redball">27</span><span class="redball">28</span><span
                        class="redball">29</span><span class="redball">30</span>
                    <span class="redball">31</span><span class="redball">32</span><span class="redball">33</span>
                </div>
                <span class="tz-tit-left mt10"><font class="bluetext">蓝球</font>至少选1个</span>

                <div class="cb"></div>
                <div class="clearfix" id="lantuo">
                    <span class="blueball">01</span><span class="blueball">02</span><span
                        class="blueball">03</span><span class="blueball">04</span><span class="blueball">05</span>
                    <span class="blueball">06</span><span class="blueball">07</span><span
                        class="blueball">08</span><span class="blueball">09</span><span class="blueball">10</span>
                    <span class="blueball">11</span><span class="blueball">12</span><span
                        class="blueball">13</span><span class="blueball">14</span><span class="blueball">15</span>
                    <span class="blueball">16</span>
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
                            <span class="jj-k-font">投</span><span><input type="text" class="no-boder" value="1"/></span><span
                                class="jj-k-font2">倍</span>
                            <span class="jj-k-right"></span>
                        </div>
                        <div id="caibizhifu" class="fl"><span id="check-cb"></span>彩币支付</div>
                        <div class="cb"></div>
                        <div class="h5"></div>
                        <div class="jj-k clearfix fl">
                            <span class="jj-k-left"></span>
                            <span class="jj-k-font">买</span><span><input type="text" class="no-boder" value="1"/></span><span
                                class="jj-k-font2">期</span>
                            <span class="jj-k-right"></span>
                        </div>
                        <div class="jj-k-check"><span class="check-org" id="zjstop"></span><span
                                class="fl">中奖后停止追号</span></div>
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
        		<span class="fl">共<font class="redtext" id="ptzhushu">0</font>注
           		<font class="redtext" id="ptqianshu">0</font>元</span>
             </span>
             <span id="dtmeizhu" style="display:none;">
    			<a class="del-red" href="javascript:void(-1)" id="del-ball-dt"></a>
        		<span class="fl">共<font class="redtext" id="dtzhushu">0</font>注
           		<font class="redtext" id="dtqianshu">0</font>元</span>
             </span>
         </span>
        <span id="qi-bei">
        	<span class="fl">共<font class="redtext" id="zhushu">0</font>注
            <font class="redtext boq" id="beishu">1</font>倍
             <font class="redtext boq" id="qishu">1</font>期，
            <font class="redtext" id="qianshu">0</font>元</span>    
        </span>

        <a class="xuanhao-btn step1 fr" href="javascript:void(-1)">选好了</a>
    </div>
    <script type="text/javascript" src="js/base.js"></script>
    <script type="text/javascript" src="js/commontz.js"></script>
    <script type="text/javascript" src="js/zuhe.js"></script>
    <script type="text/javascript" src="js/contect.js"></script>
    <div id="game" style="display:none" data-game="F01" data-play="00"></div>
</div>
</body>
</html>
