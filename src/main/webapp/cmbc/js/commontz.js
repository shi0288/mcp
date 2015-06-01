/*登陆及投注公用函数*/

//用户登陆
function startLogin(name, password) {
    $.ajax({
        type: "POST",
        url: "/bankServices/LotteryService/commonTransA04?timestamp=" + new Date().getTime(),
        dataType: "json",
        cache: false,
        data: {
            cmd: 'A04',
            userId: name,
            password: password
        },
        success: function (result) {
            var repCode = result.repCode;
            if (repCode == '0000') {
                //登录成功，缓存客户登陆信息。
                saveSt(result.customer.name, result.customer.id, result.st);
                //登录成功，缓存客户信息。
            } else if (repCode == "1003") {
                //如果没注册，则自动注册
                startSign(name, password);
            }
        }
    });
}

function startSign(name, password) {
    var body = {
        'customer': {'name': name,
            'password': password
        }
    };
    $.ajax({
        type: "POST",
        url: "/bankServices/LotteryService/commonTrans?timestamp=" + new Date().getTime(),
        dataType: "json",
        cache: false,
        data: {
            cmd: 'A01',
            body: JSON.stringify(body)
        },
        success: function (result) {
            var repCode = result.repCode;
//            window.alert(JSON.stringify(result));
            if (repCode == '0000') {
                //注册成功
                var body = {
                    'name': name,
                    'password': password
                };
                $.ajax({
                    type: "POST",
                    url: "/bankServices/LotteryService/commonTrans?timestamp=" + new Date().getTime(),
                    dataType: "json",
                    cache: false,
                    data: {
                        cmd: 'A04',
                        body: JSON.stringify(body)
                    },
                    success: function (result) {
                        var repCode = result.repCode;
                        if (repCode == '0000') {
                            //登录成功
                            saveSt(result.customer.name, result.customer.id, result.st);
                            //isPresent();
                            //getUserData();
                        } else {
                            //登录不成功
                            window.alert("系统未知异常");
                        }
                    }
                });
            }
        }
    });

}

function saveSt(name, id, st) {
    sessionStorage.setItem("Name", name);
    sessionStorage.setItem("Id", id);
    sessionStorage.setItem("St", st);
}


//添加/去除class=on
function togOn(evel) {
    if ($(evel).hasClass("on")) {
        $(evel).removeClass("on");
    } else {
        $(evel).addClass("on");
    }
}
//普通算注数
function mathZhushu(obj) {
    var xuanRed = obj.find(".redball.on").length;
    var iRed = $("#putong").attr("data-red");
    var xuanBlue = obj.find(".blueball.on").length;
    var iBlue = $("#putong").attr("data-blue");
    iRed = parseInt(iRed);
    iBlue = parseInt(iBlue);
    if (xuanRed >= iRed && xuanBlue >= iBlue) {
        if (iBlue > 0) {
            var ezhushu = $.base.comBination(xuanRed, iRed) * $.base.comBination(xuanBlue, iBlue);
        } else {
            var ezhushu = $.base.comBination(xuanRed, iRed);
        }
        $("#ptzhushu").html(ezhushu);
        $("#ptqianshu").html(ezhushu * 2);
        zhushu = zhushu + ezhushu;
    } else {
        $("#ptzhushu").html(0);
        $("#ptqianshu").html(0);
    }
}
//显示选球
function xuanqiuShow() {
    $(".redball").removeClass("on");
    $(".blueball").removeClass("on");
    $(".xqll").hide();
    $(".xuanqiu").show();
    $(".step2").remove();
    var hhml = '<a class="xuanhao-btn fr step1"  href="javascript:void(-1)">选好了</a>';
    $(".footer-tz").append(hhml);
    $(".go-pre").hide().eq(0).show();
    $("#qi-bei").hide();
    $("#meizhu").show();
    $("#ptzhushu").html(0);
    $("#ptqianshu").html(0);
    $("#dtzhushu").html(0);
    $("#dtqianshu").html(0);
}
//显示选球列表
function xqllShow() {
    $(".xuanqiu").hide();
    $(".xqll").show();
    $(".step1").remove();
    var hhml = '<a class="xuanhao-btn fr step2"  href="javascript:void(-1)">确认支付</a>';
    $(".footer-tz").append(hhml);
    $(".go-pre").hide().eq(1).show();
    $("#qi-bei").show();
    $("#meizhu").hide();
    $("#ptzhushu").html(0);
    $("#ptqianshu").html(0);
    $("#dtzhushu").html(0);
    $("#dtqianshu").html(0);
}
//m最少红球数，n最少篮球数
function stepOne(evel) {
    var m = $("#putong").attr("data-red");
    var n = $("#putong").attr("data-blue");
    m = parseInt(m);
    n = parseInt(n);
    if ($(evel).hasClass("step1")) {
        var iz = $("#ptzhushu").html();
        var izo = 0;
        if ($("#dtzhushu").length > 0) {
            izo = $("#dtzhushu").html();
        }
        iz = parseInt(iz) + parseInt(izo);
        var qianshu = $("#qianshu").html();
        qianshu = parseInt(qianshu);
        if (iz < 1 && izo < 1) {
            alert("请按规则选号");
            if (qianshu == 0) {
                return false;
            }
            xqllShow();
        } else if (iz > 10000 || izo > 10000) {
            alert("单注金额不能超过2万");
            if (qianshu == 0) {
                return false;
            }
            xqllShow();
        } else {
            dtXqiu();
            if ($("#putong").attr("data-ttpp") == "zhiy") {
                zhiyXqiu();
            } else {
                ptXqiu();
            }
            xqllShow();
            sumAll();
        }
    }
}
//第一步选好了
function pstepOne(evel) {
    var m = $("#putong").attr("data-red");
    var n = $("#putong").attr("data-blue");
    m = parseInt(m);
    n = parseInt(n);
    if ($(evel).hasClass("step1")) {
        var iz = $("#ptzhushu").html();
        var izo = 0;
        if ($("#dtzhushu").length > 0) {
            izo = $("#dtzhushu").html();
        }

        iz = parseInt(iz) + parseInt(izo);
        var qianshu = $("#qianshu").html();
        qianshu = parseInt(qianshu);
        if (iz < 1) {
            alert("请按规则选号");
            if (qianshu == 0) {
                return false;
            }
            xqllShow();
        } else if (iz > 10000 || izo > 10000) {
            alert("单注金额不能超过2万");
            if (qianshu == 0) {
                return false;
            }
            xqllShow();
        } else {
            plXqiu();
            xqllShow();
            sumAll();
        }
    }
}
//计算总注数
function sumAll() {
    var zhushu = 0;
    if ($(".qiulist").length > 0) {
        $(".qiulist").each(function () {
            var mn = $(this).attr("data-zs");
            zhushu += parseInt(mn);
        });
    }
    var qishu = $("#qishu").html();
    var beishu = $("#beishu").html();
    zhushu = parseInt(zhushu);
    qishu = parseInt(qishu);
    beishu = parseInt(beishu);
    $("#zhushu").html(zhushu);
    if ($("#zhuijia").length > 0 && $("#zhuijia").hasClass("now")) {
        $("#qianshu").html(qishu * beishu * zhushu * 3);
    } else {
        $("#qianshu").html(qishu * beishu * zhushu * 2);
    }
    checkCbb();
}
function checkCbbJc() {
    /*竞彩判断彩币支付是否勾选*/
    var recharge = sessionStorage.getItem("recharge");
    var charge = $("#qianshu").html();
    charge = parseInt(charge) * 100;
    if (recharge >= charge) {
        $("#check-cb-jc").addClass("now");
    } else {
        $("#check-cb-jc").removeClass("now");
    }
    /*判断彩币支付是否勾选end*/
}
function checkCbb() {
    /*判断彩币支付是否勾选*/
    var recharge = sessionStorage.getItem("recharge");
    var charge = $("#qianshu").html();
    charge = parseInt(charge) * 100;
    if (recharge >= charge) {
        $("#check-cb").addClass("now");
    } else {
        $("#check-cb").removeClass("now");
    }
    /*判断彩币支付是否勾选end*/
}
//胆拖选球
function dtXqiu() {
    var dts = $("#dtzhushu").html();
    dts = parseInt(dts);
    var ttype = "02";
    if ($("#dantuo").attr("data-type") == "zhdt") {
        ttype = "05";
    }
    if (dts > 0) {
        var dRed = [];
        var tRed = [];
        var dBlue = [];
        var tBlue = [];
        var stll = "";
        $("#dan").find(".redball.on").each(function () {
            dRed.push($(this).html());
        });
        $("#tuo").find(".redball.on").each(function () {
            tRed.push($(this).html());
        });
        $("#lantuo").find(".blueball.on").each(function () {
            tBlue.push($(this).html());
        });
        $("#landan").find(".blueball.on").each(function () {
            dBlue.push($(this).html());
        });
        var redStr = dRed.splice(",") + "$" + tRed.splice(",");
        var blueStr = "";
        if (dBlue.length > 0) {
            blueStr += dBlue.splice(",") + "$";
        }
        blueStr += tBlue.splice(",");
        if ($("#putong").attr("data-des")) {
            zhuHtml = "[" + $('#putong').attr('data-des') + "胆拖" + dts + "注]";
        } else {
            zhuHtml = "[胆拖" + dts + "注]";
        }
        if (blueStr.length > 0) {
            stll = "|";
        }
        var html = '<div class="clearfix p5 mlr5 qiulist" data-type="' + ttype + '" data-zs="' + dts + '" data-res="' + redStr + stll + blueStr + '">' +
            '<a class="evclose" href="javascript:void(-1)" onClick="delEv(this)"></a>' +
            '<div class="evhao gerytext"><span class="redtext">' + redStr + '</span>' + stll + '<span class="bluetext">' + blueStr + '</span> ' + zhuHtml + ' </div></div>';
        $("#xh-box").prepend(html);
    }
}
//胆码和拖码不能相同
function dtDiff(ballArr, ball) {
    var res = true;
    ballArr.each(function () {
        var iball = ball.html();
        iball = parseInt(iball);
        var ithis = $(this).html();
        ithis = parseInt(ithis);
        if (iball == ithis) {
            alert("胆码和拖码不能相同");
            res = false;
        }
    });
    return res;
}
//胆拖算注数
function mathDantuo() {
    var danRed = $("#dan").find(".redball.on").length;
    var tuoRed = $("#tuo").find(".redball.on").length;
    var danBlue = $("#landan").find(".blueball.on").length;
    var tuoBlue = $("#lantuo").find(".blueball.on").length;
    var red = $("#putong").attr("data-red");
    var blue = $("#putong").attr("data-blue");
    red = parseInt(red);
    blue = parseInt(blue);
    if (danRed == 0) {
        $("#dtzhushu").html(0);
        $("#dtqianshu").html(0);
        return false;
    }
    if (tuoRed < 2) {
        $("#dtzhushu").html(0);
        $("#dtqianshu").html(0);
        return false;
    }
    if (danBlue > 0 && tuoBlue < 2) {
        $("#dtzhushu").html(0);
        $("#dtqianshu").html(0);
        return false;
    }
    if (blue > 0) {
        if (danBlue > blue - 1) {
            var ezhushu = 0;
        }
        if (tuoBlue < blue) {
            var ezhushu = 0;
        }
    }
    if (red < danRed + tuoRed && blue <= danBlue + tuoBlue) {
        if (blue == 1) {
            var nblue = tuoBlue;
        } else {
            var nblue = $.base.comBination(tuoBlue, blue - danBlue);
        }
        if (blue > 0) {
            var ezhushu = $.base.comBination(tuoRed, red - danRed) * nblue;
        } else {
            var ezhushu = $.base.comBination(tuoRed, red - danRed);
        }

    } else {
        var ezhushu = 0;
    }
    $("#dtzhushu").html(ezhushu);
    $("#dtqianshu").html(ezhushu * 2);
}
//11选5前一直选机选
function zhiyJx() {
    red = 2;
    var zhushu = $("#zhushu").html();
    var qishu = $("#qishu").html();
    var beishu = $("#beishu").html();
    zhushu = parseInt(zhushu);
    qishu = parseInt(qishu);
    beishu = parseInt(beishu);
    zhushu = zhushu + 2;
    $("#zhushu").html(zhushu);
    if ($("#zhuijia").length > 0 && $("#zhuijia").hasClass("now")) {
        $("#qianshu").html(qishu * beishu * zhushu * 3);
    } else {
        $("#qianshu").html(qishu * beishu * zhushu * 2);
    }
    checkCbb();
    selqiu($("#putong").find(".redball"), red);
    ptXqiu();
}
//11选5前一直选
function zhiyXqiu() {
    var stll = "";
    var izhu = $("#ptzhushu").html();
    var redArr = [];
    var blueArr = [];
    izhu = parseInt(izhu);
    if (izhu >= 1) {
        $("#putong").find(".redball.on").each(function () {
            redArr.push($(this).html());
        });
        if ($("#putong").find(".blueball.on").length > 0) {
            $("#putong").find(".blueball.on").each(function () {
                blueArr.push($(this).html());
            });
        }
        if ($("#putong").attr("data-des")) {
            var stt = $("#putong").attr("data-des");
        } else {
            var stt = "";
        }
        var zhuHtml = "[" + stt + "单式1注]";
        var ttype = "00";
        if (izhu > 1) {
            zhuHtml = "[" + stt + "复式" + izhu + "注]";
            ttype = "01";
        }
        var redStr = redArr.splice(",");
        var blueStr = blueArr.splice(",");
        if (blueStr.length > 0) {
            stll = "|";
        }
        var vres = redStr + stll + blueStr;
        var html = '<div class="clearfix p5 mlr5 qiulist" data-type="' + ttype + '" data-zs="' + izhu + '" data-res="' + vres + '">' +
            '<a class="evclose" href="javascript:void(-1)" onClick="delEv(this)"></a>' +
            '<div class="evhao gerytext"><span class="redtext">' + redStr + '</span> ' + stll + ' <span class="bluetext">' + blueStr + '</span> ' + zhuHtml + ' </div></div>';
        $("#xh-box").prepend(html);
        $(".blueball").removeClass("on");
        $(".redball").removeClass("on");
    }
}
//普通选球
function ptXqiu() {
    var stll = "";
    var izhu = $("#ptzhushu").html();
    var redArr = [];
    var blueArr = [];
    izhu = parseInt(izhu);
    if (izhu > 0) {
        $("#putong").find(".redball.on").each(function () {
            redArr.push($(this).html());
        });
        if ($("#putong").find(".blueball.on").length > 0) {
            $("#putong").find(".blueball.on").each(function () {
                blueArr.push($(this).html());
            });
        }

        if ($("#putong").attr("data-des")) {
            var stt = $("#putong").attr("data-des");
        } else {
            var stt = "";
        }
        var zhuHtml = "[" + stt + "单式1注]";
        var ttype = "00";
        if (izhu > 1) {
            zhuHtml = "[" + stt + "复式" + izhu + "注]";
            ttype = "01";
        }
        var redStr = redArr.splice(",");
        var blueStr = blueArr.splice(",");
        if (blueStr.length > 0) {
            stll = "|";
        }
        var vres = redStr + stll + blueStr;
        var html = '<div class="clearfix p5 mlr5 qiulist" data-type="' + ttype + '" data-zs="' + izhu + '" data-res="' + vres + '">' +
            '<a class="evclose" href="javascript:void(-1)" onClick="delEv(this)"></a>' +
            '<div class="evhao gerytext"><span class="redtext">' + redStr + '</span> ' + stll + ' <span class="bluetext">' + blueStr + '</span> ' + zhuHtml + ' </div></div>';
        $("#xh-box").prepend(html);
        $(".blueball").removeClass("on");
        $(".redball").removeClass("on");
    }
}
//排列选球
function plXqiu() {
    var izhu = $("#ptzhushu").html();
    izhu = parseInt(izhu);
    var ttype = "00";
    if (izhu > 0) {
        var html = "";
        var zhuHtml = "[单式1注]";
        $(".pailei").each(function (index) {
            $(this).find(".redball.on").each(function (index, element) {
                html += $(this).html();
                if (index != $(this).parent().find(".redball.on").length - 1) {
                    html += ",";
                }
            });
            if ($(this).index(".pailei") != $(".pailei").length - 1) {
                html += "|";
            }
        });
    }
    if (izhu > 1) {
        zhuHtml = "[复式" + izhu + "注]"
        ttype = "01";
    }
    var thtml = '<div class="clearfix p5 mlr5 qiulist" data-type="' + ttype + '" data-zs="' + izhu + '" data-res="' + html + '">' +
        '<a class="evclose" href="javascript:void(-1)" onClick="delEv(this)"></a>' +
        '<div class="evhao gerytext"><span class="redtext">' + html + '</span>' + zhuHtml + ' </div></div>';
    $("#xh-box").prepend(thtml);
    $(".blueball").removeClass("on");
    $(".redball").removeClass("on");
}
//删除选中的这行投注
function delEv(evel) {
    var zhushu = $("#zhushu").html();
    var qishu = $("#qishu").html();
    var beishu = $("#beishu").html();
    var jzhu = $(evel).parent().attr("data-zs");
    zhushu = parseInt(zhushu);
    qishu = parseInt(qishu);
    beishu = parseInt(beishu);
    jzhu = parseInt(jzhu);
    zhushu = zhushu - jzhu;
    if ($("#zhuijia").length > 0 && $("#zhuijia").hasClass("now")) {
        $("#zhushu").html(zhushu);
        $("#qianshu").html(qishu * beishu * zhushu * 3);
    } else {
        $("#zhushu").html(zhushu);
        $("#qianshu").html(qishu * beishu * zhushu * 2);
    }
    checkCbb();
    $(evel).parent().remove();
}
//机选n个小球
function selqiu(objarr, n) {
    n = parseInt(n);
    objarr.removeClass("on");
    for (var i = 0; i < n; i++) {
        buchong(objarr);
    }
    mathZhushu($("#putong"));
}
//不能重复选
function buchong(objarr) {
    var m = Math.random() * 1000;
    m = m % objarr.length;
    if (objarr.eq(m).hasClass("on")) {
        buchong(objarr)
    } else {
        objarr.eq(m).addClass("on");
    }
}
//排列算注数（不能选重复的号）
function pmathZhushu(evel) {
    var sumzhu = 1;
    for (var i = 0; i < $(".pailei").length; i++) {
        var eel = $(".pailei").eq(i).find(".redball.on").length;
        sumzhu = sumzhu * eel;
    }
    if (evel) {
        var i = $(evel).parents(".tab-content").index(".tab-content");
        $(".meizhushu").eq(i).html(sumzhu);
        $(".meizhuqian").eq(i).html(sumzhu * 2)
    } else {
        $("#ptzhushu").html(sumzhu);
        $("#ptqianshu").html(sumzhu * 2);
    }
}
/*11选5*/
//列出跨度投注结果
function resKuadu() {
    var redStr = "";
    var index = $("#kuadu").index(".tab-content");
    var ezhushu = $(".meizhu").eq(index).find(".meizhushu").eq(0).html();
    var zhuHtml = "[" + $('#putong').attr("data-des") + "跨度1注]";
    ezhushu = parseInt(ezhushu);
    if (ezhushu > 0) {
        for (var i = 0; i < $("#kuadu").find(".redball.on").length; i++) {
            if (i == $("#kuadu").find(".redball.on").length - 1) {
                redStr += $("#kuadu").find(".redball.on").eq(i).html() + "";
            } else {
                redStr += $("#kuadu").find(".redball.on").eq(i).html() + ",";
            }
        }
        if (ezhushu > 1) {
            zhuHtml = "[" + $('#putong').attr("data-des") + "跨度" + ezhushu + "注]";
        }
        var html = '<div class="clearfix p5 mlr5 qiulist" data-type="06" data-zs="' + ezhushu + '" data-res="' + redStr + '">' +
            '<a class="evclose" href="javascript:void(-1)" onClick="delEv(this)"></a>' +
            '<div class="evhao gerytext"><span class="redtext">' + redStr + '</span>' + zhuHtml + '</div></div>';
        $("#xh-box").prepend(html);
    }
}
//列出和值投注结果
function resHezhi() {
    var redStr = "";
    var index = $("#hezhi").index(".tab-content");
    var ezhushu = $(".meizhu").eq(index).find(".meizhushu").eq(0).html();
    var zhuHtml = "[" + $('#putong').attr("data-des") + "和值1注]";
    ezhushu = parseInt(ezhushu);
    if (ezhushu > 0) {
        for (var i = 0; i < $("#hezhi").find(".redball.on").length; i++) {
            if (i == $("#hezhi").find(".redball.on").length - 1) {
                redStr += $("#hezhi").find(".redball.on").eq(i).html() + "";
            } else {
                redStr += $("#hezhi").find(".redball.on").eq(i).html() + ",";
            }
        }
        if (ezhushu > 1) {
            zhuHtml = "[" + $('#putong').attr("data-des") + "和值" + ezhushu + "注]";
        }
        var html = '<div class="clearfix p5 mlr5 qiulist" data-type="03" data-zs="' + ezhushu + '" data-res="' + redStr + '">' +
            '<a class="evclose" href="javascript:void(-1)" onClick="delEv(this)"></a>' +
            '<div class="evhao gerytext"><span class="redtext">' + redStr + '</span>' + zhuHtml + '</div></div>';
        $("#xh-box").prepend(html);
    }
}
//列出复式投注结果
function resFushi(jxuan, bettype) {
    var redStr = "";
    var index = $("#putong").index(".tab-content");
    var isfushi = "复式";
    if ($("#putong").attr("data-fushi")) {
        isfushi = $("#putong").attr("data-fushi");
    }
    var ezhushu = $(".meizhu").eq(index).find(".meizhushu").eq(0).html();
    var zhuHtml = "[" + $('#putong').attr("data-des") + "单式1注]";
    var ttype = "00";
    ezhushu = parseInt(ezhushu);
    if (jxuan) {
        ezhushu = 1;
    }
    if (ezhushu > 0 || jxuan) {
        for (var i = 0; i < $("#putong").find(".redball.on").length; i++) {
            if (i == $("#putong").find(".redball.on").length - 1) {
                redStr += $("#putong").find(".redball.on").eq(i).html() + "";
            } else {
                redStr += $("#putong").find(".redball.on").eq(i).html() + ",";
            }
        }

        if (ezhushu > 1) {
            zhuHtml = "[" + $('#putong').attr("data-des") + isfushi + ezhushu + "注]";
            ttype = "01";
        }
        if (bettype) {
            ttype = bettype;
        }
        var html = '<div class="clearfix p5 mlr5 qiulist" data-type="' + ttype + '" data-zs="' + ezhushu + '" data-res="' + redStr + '">' +
            '<a class="evclose" href="javascript:void(-1)" onClick="delEv(this)"></a>' +
            '<div class="evhao gerytext"><span class="redtext">' + redStr + '</span>' + zhuHtml + '</div></div>';
        $("#xh-box").prepend(html);
    }
}
//列出胆拖投注结果(只有红球)
function resDantuo() {
    var redStr = "";
    var index = $("#dantuo").index(".tab-content");
    var ezhushu = $(".meizhu").eq(index).find(".meizhushu").eq(0).html();
    var zhuHtml = "[" + $('#putong').attr("data-des") + "胆拖1注]";
    var ttype = "02";
    ezhushu = parseInt(ezhushu);
    if (ezhushu > 0) {
        if (ezhushu > 1) {
            zhuHtml = "[" + $('#putong').attr("data-des") + "胆拖" + ezhushu + "注]";
        }
        for (var i = 0; i < $("#dan").find(".redball.on").length; i++) {
            if (i == $("#dan").find(".redball.on").length - 1) {
                redStr += $("#dan").find(".redball.on").eq(i).html() + "";
            } else {
                redStr += $("#dan").find(".redball.on").eq(i).html() + ",";
            }
        }
        redStr += "$";
        for (var i = 0; i < $("#tuo").find(".redball.on").length; i++) {
            if (i == $("#tuo").find(".redball.on").length - 1) {
                redStr += $("#tuo").find(".redball.on").eq(i).html() + "";
            } else {
                redStr += $("#tuo").find(".redball.on").eq(i).html() + ",";
            }
        }
        if ($("#dantuo").attr("data-type") == "zhdt") {
            ttype = "05";
        }
        var html = '<div class="clearfix p5 mlr5 qiulist" data-type="' + ttype + '" data-zs="' + ezhushu + '" data-res="' + redStr + '">' +
            '<a class="evclose" href="javascript:void(-1)" onClick="delEv(this)"></a>' +
            '<div class="evhao gerytext"><span class="redtext">' + redStr + '</span>' + zhuHtml + '</div></div>';
        $("#xh-box").prepend(html);
    }
}
//列出定位投注结果(11选5直二直三)
function resDingweis() {
    var redStr = "";
    var index = $("#dpailei").index(".tab-content");
    var ezhushu = $(".meizhu").eq(index).find(".meizhushu").eq(0).html();
    var zhuHtml = "[" + $('#putong').attr("data-des") + "单式1注]";
    var ttype = "07";
    ezhushu = parseInt(ezhushu);
    if (ezhushu > 0) {
        var oPailei = $("#dpailei").find(".pailei");
        for (var j = 0; j < oPailei.length; j++) {
            var isredhtml = "";
            for (var i = 0; i < oPailei.eq(j).find('.redball.on').length; i++) {
                if (i == oPailei.eq(j).find('.redball.on').length - 1) {
                    isredhtml += oPailei.eq(j).find('.redball.on').eq(i).html() + "";
                } else {
                    isredhtml += oPailei.eq(j).find('.redball.on').eq(i).html() + ",";
                }
            }
            if (j == oPailei.length - 1) {
                redStr += isredhtml;
            } else {
                redStr += isredhtml + "|";
            }
        }
        if (ezhushu > 1) {
            zhuHtml = "[" + $('#putong').attr('data-des') + "定位" + ezhushu + "注]";
        }
        var html = '<div class="clearfix p5 mlr5 qiulist" data-type="' + ttype + '" data-zs="' + ezhushu + '" data-res="' + redStr + '">' +
            '<a class="evclose" href="javascript:void(-1)" onClick="delEv(this)"></a>' +
            '<div class="evhao gerytext"><span class="redtext">' + redStr + '</span>' + zhuHtml + '</div></div>';
        $("#xh-box").prepend(html);
    }
}
//列出定位投注结果
function resDingwei() {
    var redStr = "";
    var index = $("#dpailei").index(".tab-content");
    var ezhushu = $(".meizhu").eq(index).find(".meizhushu").eq(0).html();
    var zhuHtml = "[" + $('#putong').attr("data-des") + "单式1注]";
    var ttype = "00";
    ezhushu = parseInt(ezhushu);
    if (ezhushu > 0) {
        var oPailei = $("#dpailei").find(".pailei");
        for (var j = 0; j < oPailei.length; j++) {
            var isredhtml = "";
            for (var i = 0; i < oPailei.eq(j).find('.redball.on').length; i++) {
                if (i == oPailei.eq(j).find('.redball.on').length - 1) {
                    isredhtml += oPailei.eq(j).find('.redball.on').eq(i).html() + "";
                } else {
                    isredhtml += oPailei.eq(j).find('.redball.on').eq(i).html() + ",";
                }
            }
            if (j == oPailei.length - 1) {
                redStr += isredhtml;
            } else {
                redStr += isredhtml + "|";
            }
        }
        if (ezhushu > 1) {
            zhuHtml = "[" + $('#putong').attr("data-des") + "复式" + ezhushu + "注]";
            ttype = "01";
        }
        var html = '<div class="clearfix p5 mlr5 qiulist" data-type="' + ttype + '" data-zs="' + ezhushu + '" data-res="' + redStr + '">' +
            '<a class="evclose" href="javascript:void(-1)" onClick="delEv(this)"></a>' +
            '<div class="evhao gerytext"><span class="redtext">' + redStr + '</span>' + zhuHtml + '</div></div>';
        $("#xh-box").prepend(html);
    }
}
//列出排列普通投注结果
function resPailie() {
    var redStr = "";
    var index = $("#pailei").index(".tab-content");
    var ezhushu = $(".meizhu").eq(index).find(".meizhushu").eq(0).html();
    var zhuHtml = "[" + $('#putong').attr("data-des") + "单式1注]";
    var ttype = "00";
    ezhushu = parseInt(ezhushu);
    if (ezhushu > 0) {
        var oPailei = $("#pailei").find(".pailei");
        for (var j = 0; j < oPailei.length; j++) {
            var isredhtml = "";
            for (var i = 0; i < oPailei.eq(j).find('.redball.on').length; i++) {
                if (i == oPailei.eq(j).find('.redball.on').length - 1) {
                    isredhtml += oPailei.eq(j).find('.redball.on').eq(i).html() + "";
                } else {
                    isredhtml += oPailei.eq(j).find('.redball.on').eq(i).html() + ",";
                }
            }
            if (j == oPailei.length - 1) {
                redStr += isredhtml;
            } else {
                redStr += isredhtml + "|";
            }
        }
        if (ezhushu > 1) {
            zhuHtml = "[" + $('#putong').attr("data-des") + "复式" + ezhushu + "注]";
            ttype = "01";
        }
        var html = '<div class="clearfix p5 mlr5 qiulist" data-type="' + ttype + '" data-zs="' + ezhushu + '" data-res="' + redStr + '">' +
            '<a class="evclose" href="javascript:void(-1)" onClick="delEv(this)"></a>' +
            '<div class="evhao gerytext"><span class="redtext">' + redStr + '</span>' + zhuHtml + '</div></div>';
        $("#xh-box").prepend(html);

    }
}
//选好了计算注数
function gotSum() {
    var zhushu = $("#zhushu").html();
    var beishu = $("#beishu").html();
    var qishu = $("#qishu").html();
    zhushu = parseInt(zhushu);
    beishu = parseInt(beishu);
    qishu = parseInt(qishu);
    for (var i = 0; i < $(".meizhushu").length; i++) {
        var szs = $(".meizhushu").eq(i).html();
        zhushu += parseInt(szs);
    }
    $("#zhushu").html(zhushu);
    $("#qianshu").html(zhushu * 2 * qishu * beishu);
    checkCbb();
}
//11选5前二直选，前三直选算注数(可以选重复的号)
function dpmathZhushu(evel, red) {
    var sumzhu = 0;
    var geone = $(".pailei").eq(0).find(".on");
    if (red == 2) {
        for (var j = 0; j < geone.length; j++) {
            var su = 0;
            for (var k = 0; k < $(".pailei").eq(1).find(".on").length; k++) {
                if ($(".pailei").eq(1).find(".on").eq(k).html() != geone.eq(j).html()) {
                    su += 1;
                }
            }
            sumzhu += su;
        }
    }
    if (red == 3) {
        for (var j = 0; j < geone.length; j++) {
            var mu = 0;
            var su = 0;
            var sum3 = 0;
            for (var k = 0; k < $(".pailei").eq(1).find(".on").length; k++) {
                var kbull = $(".pailei").eq(1).find(".on").eq(k);
                if (kbull.html() != geone.eq(j).html()) {
                    su = +1;
                    for (var s = 0; s < $(".pailei").eq(2).find(".on").length; s++) {
                        var sbull = $(".pailei").eq(2).find(".on").eq(s);
                        if (kbull.html() != sbull.html() && sbull.html() != geone.eq(j).html()) {
                            sum3 += 1;
                        }
                    }
                }
            }
            sumzhu += su * sum3;
        }
    }
    var i = $(evel).parents(".tab-content").index(".tab-content");
    $(".meizhushu").eq(i).html(sumzhu);
    $(".meizhuqian").eq(i).html(sumzhu * 2)
}
/*排列三*/
//排列胆拖算注数（只有红球）
function pmathDantuo(evel) {
    var i = $(evel).parents(".tab-content").index(".tab-content");
    var danRed = $("#dan").find(".redball.on").length;
    var tuoRed = $("#tuo").find(".redball.on").length;
    var red = $("#putong").attr("data-red");
    var ezhushu = 0;
    red = parseInt(red);
    if (danRed == 0) {
        $(".meizhushu").eq(i).html(0);
        $(".meizhuqian").eq(i).html(0);
        return false;
    }
    if (red < danRed + tuoRed) {
        ezhushu = $.base.comBination(tuoRed, red - danRed) * $.base.Arrangement(red, red);
    } else {
        ezhushu = 0;
    }
    $(".meizhushu").eq(i).html(ezhushu);
    $(".meizhuqian").eq(i).html(ezhushu * 2);
}
//排列三组选六胆拖算注数（只有红球）
function zmathDantuo(evel) {
    var i = $(evel).parents(".tab-content").index(".tab-content");
    var danRed = $("#dan").find(".redball.on").length;
    var tuoRed = $("#tuo").find(".redball.on").length;
    var red = $("#putong").attr("data-red");
    var ezhushu = 0;
    red = parseInt(red);
    if (danRed == 0) {
        $(".meizhushu").eq(i).html(0);
        $(".meizhuqian").eq(i).html(0);
        return false;
    }
    if (red < danRed + tuoRed) {
        ezhushu = $.base.comBination(tuoRed, red - danRed);
    } else {
        ezhushu = 0;
    }
    $(".meizhushu").eq(i).html(ezhushu);
    $(".meizhuqian").eq(i).html(ezhushu * 2);
}
//调整收藏的游戏，调整头部按钮。
function ajustButton(Id) {
    /*彩种定制*/
    var delArr = localStorage.getItem("delArr");
    if (delArr) {
        delArr = delArr.split(",");
        $.each(delArr, function (i, val) {
            $("#" + val).hide();
        });
    } else {
        delArr = ['qxc', 'qlc'];
        localStorage.setItem("delArr", delArr);
        $("#qlc").hide();
        $("#qxc").hide();
    }
    /*彩种定制end*/
    //判断是否登录
     $("#may-caipiao").attr("href", "javascript:void(-1)");
     $("#may-caipiao").click(function () {
         /*登录  */
         var id = sessionStorage.getItem("Id");
         var name = sessionStorage.getItem("Name");
         if (id == null && name==null) {//尚未登陆，需要处理登陆.
          setWebitEvent("http://bank.mobilelottery.cn/cmbc", 'LT02');
         }else{
             window.location.href="account";
         }
    /*登录 end */
     });
}