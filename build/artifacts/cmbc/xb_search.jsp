<%@ page language="java" pageEncoding="UTF-8" %>
<!doctype html>
<html>
<head>
    <meta charset="utf-8">
    <title>九歌彩票</title>
    <META HTTP-EQUIV="Pragma" CONTENT="no-cache">
    <META HTTP-EQUIV="Cache-Control" CONTENT="no-cache">
    <META HTTP-EQUIV="Expires" CONTENT="0">
    <meta name="viewport"
          content="initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no, width=device-width">
    <link type="text/css" rel="stylesheet" href="css/reset.css"/>
    <link type="text/css" rel="stylesheet" href="css/idangerous.swiper.css"/>
    <link type="text/css" rel="stylesheet" href="css/start.css"/>
    <link type="text/css" rel="stylesheet" href="css/xb_base.css">
    <link type="text/css" rel="stylesheet" href="css/xb_chest_game.css">
    <script type="text/javascript" src="js/jquery-1.8.2.min.js"></script>
    <script type="text/javascript" src="/cmbc/js/common.js"></script>
    <script type="text/javascript" src="js/jquery.cookie.js"></script>
    <script type="text/javascript" src="js/iphone.js"></script>
    <jsp:include page="include/login.jsp" flush="true"/>
</head>
<body style=" background-image:url(img/start_bg_01.png); background-repeat:repeat-x repeat-y;">

<div class="page-from-left index">
    <div class="top fix">
        <div class="top-relative clearfix">
            <a href="javascript:history.go(-1)"  class="go-pre"></a>
            <a class="msyh-login" id="yes-denglu"
               onClick='setWebitEvent(window.location.href,"LT02");'
               style="display:none;">登录</a>
            <!--<a class="msyh-login" id="yes-user" href="acount.html" style="display:none;padding:0px 16px;">我的彩票</a>-->
            <span class="title"
                  style="float:none; display:block; width:220px; text-align:center; margin:0px auto;">九歌彩票</span>
        </div>
    </div>
    <div class="cb"></div>
    <div style="height:40px;">&nbsp;</div>
    <!--顶部结束-->
    <!--正文内容开始-->
	
	
<header class="top">

<div class="banner"><span>挖开宝箱，好运降临</span></div>

<div class="clear"></div>

<div class="count-time"><span>您还有<span id="cotime"> 0 </span>次挖宝机会</span></div>

</header>

<div class="main">

<table width="100%" border="0" cellspacing="0" cellpadding="0" class="game-Scratchable">

  <tr>

    <td class="close01" num="1">&nbsp;</td>

    <td class="close01" num="2">&nbsp;</td>

    <td class="close01" num="3">&nbsp;</td>

  </tr>

  <tr>

    <td class="close01" num="4">&nbsp;</td>

    <td class="close01" num="5">&nbsp;</td>

    <td class="close01" num="6">&nbsp;</td>

  </tr>

  <tr>

    <td class="close01" num="7">&nbsp;</td>

    <td class="close01" num="8">&nbsp;</td>

    <td class="close01" num="9">&nbsp;</td>

  </tr>

</table>

<div class="OpenBox"></div>

</div>

<div class="clear"></div>

<footer class="foot">

<ul class="Btn-Game">

  <li><a href="/cmbc/acount.jsp">查看所得彩金</a></li>



  <li><a href="index.jsp">立即购彩获取挖宝机会</a></li>



</ul>

</footer>

<script type="text/javascript">


$(function(){

    /*sessionStorage.setItem("userId","10000");

    sessionStorage.setItem("name","chenpeng");

    sessionStorage.setItem("Id", "10000");

    sessionStorage.setItem("orderId", "10000");*/

    //如果用户登录获取可寻宝次数

    checkCS(sessionStorage.getItem("Id"),sessionStorage.getItem("St"),sessionStorage.getItem("orderId"));

	$(".close01").click(function(){

        //判断用户是否登录

        if(checkLogin()){

            $(this).removeClass("close01");

            $(this).addClass("open01");

            var _this = this;

            var num =  $(this).attr("num");

            var count = $("#cotime").html();

            if(isNaN(count)){

               count = 0;

            }else{

                count = parseInt(count);

            }

            if(count < 1){

                alert("您没有挖宝机会了，立即购彩获得挖宝机会？买的越多挖宝机会越大噢，亲",function(){
                    showIndex();
                });
                return;		
            }

            //判断是否中奖

            $.ajax({

                type: "POST",

                url: "/openchest/main/winMethod.htm?timestamp=?timestamp=" + new Date().getTime(),

                dataType: "json",

                cache: false,

                data: {

                    userId: sessionStorage.getItem("Id"),

                    userSt: sessionStorage.getItem("St"),

                    orderId:sessionStorage.getItem("orderId"),

                    userName:sessionStorage.getItem("Name"),

                    Num: num

                },

                success: function (result) {

                    var repCode = result.repCode;

                    if("0000" == result.repCode){

                        var ticketCount = result.ticketCount;

                        var resultMoney = result.winAmount;

                        $("#cotime").html(ticketCount);

                        openNum = "Openfu"+resultMoney;

                        $(".OpenBox").addClass(openNum);

                        $(".OpenBox").show(1000);

                        if($(".OpenBox")){

                            $(".OpenBox").click(function(){

                                $(_this).removeClass("open01");

                                $(_this).addClass("close01")

                                $(".OpenBox").hide(200);

                                $(".OpenBox").removeClass(openNum);

                            });

                        }

                    }

                }

            });

            /*$(".OpenBox").show();

            setTimeout(function(){

                $(".OpenBox").hide(5000);})*/

        }/*else{

            sessionStorage.setItem("userId","10000");

            sessionStorage.setItem("name","chenpeng");

        }*/

    });

});



function checkLogin(){

    var Id = sessionStorage.getItem("Id");

    var clientUserId = null;

    if (Id == null && clientUserId == null) {//尚未登陆，需要处理登陆.
        history.back();
        setWebitEvent("http://bank.mobilelottery.cn/cmbc/xb_login.jsp", 'LT02');
    }else{

        return true;

    }

    return false

}



function showIndex(){

    window.location.href="/cmbc/index.jsp";

}



function checkCS(id, st, orderid){


    $.ajax({

        type: "POST",

        url: "/openchest/main/getCount.htm?timestamp=?timestamp=" + new Date().getTime(),

        dataType: "json",

        cache: false,

        data: {

            userId: id,

            userSt: st,

            orderId:orderid

        },

        success: function (result) {

            var repCode = result.repCode;

            $("#cotime").html(result.ticketCount);

        }

    });

}





</script>

    <!--正文内容结束-->
</div>
</body>
</html>
