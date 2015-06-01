<%@ page language="java" pageEncoding="UTF-8" %>
<!doctype html>
<html>
<head>
    <meta charset="utf-8">
    <META HTTP-EQUIV="Pragma" CONTENT="no-cache">
    <META HTTP-EQUIV="Cache-Control" CONTENT="no-cache">
    <META HTTP-EQUIV="Expires" CONTENT="0">
    <title>账户信息</title>
    <meta name="viewport"
          content="initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no, width=device-width">
    <link type="text/css" rel="stylesheet" href="css/reset.css"/>
    <link type="text/css" rel="stylesheet" href="css/common.css"/>
    <script type="text/javascript" src="js/jquery-1.8.2.min.js"></script>
    <script type="text/javascript" src="js/common.js"></script>
    <script type="text/javascript" src="js/iphone.js"></script>
    <script type="text/javascript" src="/cmbc/js/platform.js"></script>
</head>
<body>
<%
    String flag = request.getParameter("flag");
    String info = "";
    if ("tzcg".equals(flag)) {
        info = "投注下单成功,请关注出票及开奖结果。";
    } else if ("tzsb".equals(flag)) {
        info = "投注下单失败。<br/>支付金额已经暂存，" +
                "您可以重新选择相同金额的彩票投注。";
    } else if ("czcg".equals(flag)) {
        info = "彩币充值成功。";
    } else if ("czsb".equals(flag)) {
        info = "充值失败，请联系客服人员。";
    } else if ("yzsb".equals(flag)) {
        info = "安全验证失败。请重试。";
    }
%>
<div class="page-from-left index">
    <div class="top fix">
        <div class="top-relative clearfix">
            <a href="main.html" class="go-pre"></a>
            <a href="javascript:xuanqiuShow()" class="go-pre" style="display:none"></a>
            <span class="title"><span class="pt2">操作结果</span></span>
        </div>
    </div>
    <div class="cb"></div>
    <!--顶部结束-->
    <!--正文内容开始-->
    <div class="content p10">
        <p class="text-center p10 tz-success"><span
                class="greentext"><%=info%></span></p>

        <a href="xb_search.jsp"  class="m-bigbtn-light mt10"><img class="zhuce-head" src="img/ico_head.png"/>去挖奖</a>
        <a href="acount.html" id="jrwdcp" class="m-bigbtn-light mt10"><img class="zhuce-head" src="img/ico_head.png"/>进入我的彩票</a>
        <a href="main.html" class="m-bigbtn-light mt10"><img class="zhuce-head" src="img/ico_head.png"/>返回购彩大厅</a>
    </div>
    <!--正文内容结束-->
</div>
</body>
</html>
