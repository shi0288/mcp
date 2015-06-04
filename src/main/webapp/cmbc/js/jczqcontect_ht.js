/*订单提交，如果选择彩币支付，则投注数据payType为1，第三方投注支付，payType为0.*/
/*彩币支付提交以后，走正常流程。第三方支付提交以后，走支付接口，调用setWebitEvent("11111111", "LT03");
 */
var thisUrl = window.location.href;

$(document).ready(function () {
    var thisUrl = window.location.href;
    before();
    getJcData();//获取竞彩数据
    //getJcDatatest();
   // getUserData();
    //筛选联赛
    $("#jc-ls-ok").click(function () {
        var arrJcl = [];
        if ($("#jc-liansai span.on").length < $("#jc-liansai span").length) {
            $("#jc-liansai span").each(function () {
                if (!$(this).hasClass("on")) {
                    var lshtml = $(this).html();
                    arrJcl.push(lshtml);
                }
            });
        }
        $(".jc-table").show();
        $(".lsname").each(function (index, element) {
            var bres = $.inArray($(this).html(), arrJcl);
            if (bres != -1) {
                $(this).parents(".jc-table").hide();
            }
            $("#jc-ss-pop").hide();
            $(".cover").hide();
        });
    });
    //五大联赛
    $("#jc-bigls").click(function () {
        var arrBigls = ["德甲", "法甲", "意甲", "西甲", "英超"];
        $("#jc-liansai span").removeClass("on");
        $("#jc-liansai span").each(function (index, element) {
            var bres = $.inArray($(this).html(), arrBigls);
            if (bres != -1) {
                $(this).addClass("on");
            }
        });
    });
    $("#tz-btn").click(function () {
        var qqshu = $("#qianshu").html();
        qqshu = parseInt(qqshu);
        var cs=$("table.on").length;
        if (cs > 8) {
            alert("最多只能选择8场比赛");
            return false;
        }
        if($("#beishu").val()>99){
            alert("不能大于99倍");
            return false;
        }

        if (qqshu > 20000) {
            alert("每单不能超过2万元");
            return false;
        }
        before();
        submitJc(); //提交订单
    });
});
//提交竞彩订单
function submitJc() {
    var payType = 0;
    if ($("#check-cb-jc").hasClass("now")) {
        payType = 1;
    }
    var amount = $("#qianshu").html();
    amount = parseInt(amount) * 100;
    var betType = $("#chuanguan").attr("data-chuan");
	console.log(betType);
	if(betType==undefined){
		betType='11';
		amount=200;
	}else{
		betType = betType.replace(/[a-z]/g, "");
	}
    
	console.log(betType);
    var numbers = getJcNums();
	console.log(numbers);
	
	var playType = $("#game").attr("data-play");
	
	var tickets = [];
	var ticket = {
            'amount': amount,
            'bType': betType,
            'pType': playType,
            'number': numbers,
            'multiple': $("#beishu").val(),
            'outerId':Math.random().toString(36).substr(2),
            'gameCode': $("#game").attr("data-game")
        }
    tickets.push(ticket);
	
	 var order = {
        'outerId':Math.random().toString(36).substr(2),
        'amount': amount,
        'tickets': tickets
    };
	
    var body = {
        'order':order
        };
		console.log(body);
    $.ajax({
        type: "POST",
        url: "/bankServices/LotteryService/commonTrans?timestamp=" + new Date().getTime(),
        dataType: "json",
        cache: false,
        data: {
            cmd: 'CT03',
            body: JSON.stringify(body)
        },
        success: function (result) {
            var repCode = result.repCode;
            if (repCode == '0000') {
				after();
                var vmout = amount / 100;
                jcTzSuccess(result['order'], vmout);
            } else if (repCode == '1013') {
                //未登录则跳去登录
                //window.SysClientJs.toLoginJGCP("http://mobilelottery.cn:8090/ezmcp/cmbc/index.jsp?type=1");
                after();
                setWebitEvent(thisUrl, "LT02");
            } else if (repCode == '1007') {
                alert("彩币余额不足，投注竞彩请先充值彩币。");
            }
            else {
                after();
                alert(result.description);
            }
        },
        error: onError
    });
}
function jcTzSuccess(order, amount) {
    $.ajax({
        type: "POST",
        url: "jczqsucess.html",
        dataType: "html",
        success: function (result) {
            var href = "fanganjc.html#" + order['id'];
            $(".jc-bg").eq(0).find("div").hide();
            $(".jc-bg").append(result);
            $(".succ-amount").html(amount);
            $(".succ-link").attr("href", href);
            
        }
    });
}
//获取投注号码
function getJcNums() {
    var playType = $("#game").attr("data-play");
    var arrNum = [];
    $(".jc-list-item").each(function (index, element) {
        var str = "";
        if ($(this).find(".jc-list-item-dan").hasClass("on")) {
            str += "$";
        }
        str += playType + "|" + $(this).attr("data-cc") + "|";
        var strNum = "";
        $(this).find(".jc-list-item-dw.on").each(function (i, val) {
            if (i == $(this).parent().find(".jc-list-item-dw.on").length - 1) {
                strNum += $(this).attr("data-dit").substring(1, 2);
            } else {
                strNum += $(this).attr("data-dit").substring(1, 2) + ",";
            }

        });
        str += strNum;
        arrNum.push(str);
    });
    arrNum = arrNum.join(";");
    return arrNum;
}

//获取竞彩数据
function getJcData() {
	var pathName= window.location.pathname;
	console.log(pathName);
	var st=1;
	if('/cmbc/jczq_ht.jsp'==pathName){
		st="HHGG";
	}

    var head = {
        "st":st
    };
    var body = {
        "gameCode":"T51",
        "pType":"05",
        "passType":"1"
    };
    $.ajax({
        type: "POST",
        //url: "/bankServices/LotteryService/getInfo?timestamp=" + new Date().getTime(),
        url: "/bankServices/LotteryService/getJcInfo?timestamp=" + new Date().getTime(),
        dataType: "json",
        cache: false,
        data: {
            head: JSON.stringify(head),
            body: JSON.stringify(body)
        },
        success: function (result) {
            var repCode = result.head.repCode;
            if (repCode == '0000') {
                var obj = eval(result.body);
                //alert(obj[0].matchInfo[0]._id);
                getMatchHhggInfo(obj,st);
            } else {
                after();
            }
        },
        error: onError
    });
}
function getMatchHhggInfo(obj,st){
    $.each(obj, function(index,item){
        var team = item[0].toString();
        team = team.split(",");
        var rqspf =  item[1].toString();
        rqspf = rqspf.split(",");
        var bf =  item[2].toString();
        bf = bf.split(",");
        var zjqs =  item[3].toString();
        zjqs = zjqs.split(",");
        var bqc =  item[4].toString();
        bqc = bqc.split(",");
        var spf =  item[5].toString();
        spf = spf.split(",");

        //["周五001","俱乐部友谊赛","阿德莱德联$+1$比利亚雷亚尔","15-05-29 18:00","67783","#00A8A8"]
        var saishi = team[0];
        var lsname = team[1];
        var teamname = team[2];
        var teamtime = team[3];
        var code = team[4];

        var teamname1 = teamname.split("$");
        var rq = teamname1[1];
        var teamname2 = teamname1[2];
            teamname1 = teamname1[0];

        var oodsTag1,oodsTag2,oodsTag3,oodsTag4,oodsTag5,changciHtml;

        var screenHtml = '<div class="jc-tz-item" id="s_' + code + '" >' +
            '<div class="jc-title">编号' +
            '<span class="week">' + code + '</span>' +
            '<span class="screen-num"></span>场次比赛<a class="jc-toggle" href="javascript:void(-1)"></a>'
        '</div>';
        $("#jc-match").append(screenHtml);

        var rqspfdata_spf,rqspfdata_one,rqspfdata_two,rqspfdata_two,rqspfdata_three,rqspfdata_four,rqspfdata_five,rqspfdata_six,open1,open2,open3;
        open1 = "bqc"+code;
        open2 = "zjqs"+code;
        open3 = "bf"+code;
        if(spf){
            rqspfdata_spf = '<td width="10%" data-dit="v2" >让球0</td>';
            rqspfdata_one = '<td width="10.2%" data-dit="v3" onclick="seleMatch(this)">胜' + spf[0] + '</td>';
            rqspfdata_two = '<td width="10.2%" data-dit="v1" onclick="seleMatch(this)">平' + spf[1] + '</td>';
            rqspfdata_three = '<td width="10.2%" data-dit="v0" onclick="seleMatch(this)">负' + spf[2] + '</td>';

            rqspfdata_four = '<td rowspan="2" width="10.2%" data-dit="v4" onclick="selOpenClose(\''+open1+'\')">弹出半全场</td>';
            rqspfdata_five = '<td rowspan="2" width="10.2%" data-dit="v5" onclick="selOpenClose(\''+open2+'\')">弹出总进球</td>';
            rqspfdata_six = '<td rowspan="2" width="10.2%" data-dit="v6" onclick="selOpenClose(\''+open3+'\')">弹出比分</td>';
        }
        oodsTag1='<tr data-wf="ht" class="jc-table-b rf-dd">' + rqspfdata_spf + rqspfdata_one + rqspfdata_two + rqspfdata_three + rqspfdata_four + rqspfdata_five + rqspfdata_six +'</tr>';
        var rqspfdata_rqspf,rqspf_one,rqspf_two,rqspf_two,rqspf_three;

        if(rqspf){
            rqspfdata_rqspf = '<td width="10%" data-dit="v2" >让球'+ rq +'</td>';
            rqspf_one = '<td width="10.2%" data-dit="v3" onclick="seleMatch(this)">胜' + rqspf[0] + '</td>';
            rqspf_two = '<td width="10.2%" data-dit="v1" onclick="seleMatch(this)">平' + rqspf[1] + '</td>';
            rqspf_three = '<td width="10.2%" data-dit="v0" onclick="seleMatch(this)">负' + rqspf[2] + '</td>';

        }
        oodsTag2='<tr data-wf="ht" class="jc-table-b rf-dd">' + rqspfdata_rqspf + rqspf_one + rqspf_two + rqspf_three  +'</tr>';

        if(bqc){
            var spfdata_one = '<td data-dit="v2" width="11.1%" onclick="seleMatch(this)"><p>胜胜</p><p>' + bqc[0] + '</p></td>';
            var spfdata_two = '<td data-dit="v3" width="11.1%" onclick="seleMatch(this)"><p>胜平</p><p>' + bqc[1] + '</p></td>';
            var spfdata_three = '<td data-dit="v4" width="11.1%" onclick="seleMatch(this)"><p>胜负</p><p>' + bqc[2] + '</p></td>';
            var spfdata_four = '<td data-dit="v5" width="11.1%" onclick="seleMatch(this)"><p>平胜</p><p>' + bqc[3] + '</p></td>';
            var spfdata_five = '<td data-dit="v6" width="11.1%" onclick="seleMatch(this)"><p>平平</p><p>' + bqc[4] + '</p></td>';
            var spfdata_six = '<td data-dit="v7" width="11.1%" onclick="seleMatch(this)"><p>平负</p><p>' + bqc[5] + '</p></td>';
            var spfdata_seven = '<td data-dit="v8" width="11.1%" onclick="seleMatch(this)"><p>负胜</p><p>' + bqc[6] + '</p></td>';
            var spfdata_eight = '<td data-dit="v9" width="11.1%" onclick="seleMatch(this)"><p>负平</p><p>' + bqc[7] + '</p></td>';
            var spfdata_nine = '<td data-dit="v10" width="11.1%" onclick="seleMatch(this)"><p>负负</p><p>' + bqc[8] + '</p></td>';
            oodsTag3='<tr data-wf="ht" class="jc-table-b spf-dd">' + spfdata_one + spfdata_two + spfdata_three + spfdata_four + spfdata_five + spfdata_six + spfdata_seven + spfdata_eight + spfdata_nine + '</tr>' ;
        }
        if(zjqs){
            var spfdata_one = '<td data-dit="v2" width="12.5%" onclick="seleMatch(this)"><p>0球</p><p>' + zjqs[0] + '</p></td>';
            var spfdata_two = '<td data-dit="v3" width="12.5%" onclick="seleMatch(this)"><p>1球</p><p>' + zjqs[1] + '</p></td>';
            var spfdata_three = '<td data-dit="v4" width="12.5%" onclick="seleMatch(this)"><p>2球</p><p>' + zjqs[2] + '</p></td>';
            var spfdata_four = '<td data-dit="v5" width="12.5%" onclick="seleMatch(this)"><p>3球</p><p>' + zjqs[3] + '</p></td>';
            var spfdata_five = '<td data-dit="v6" width="12.5%" onclick="seleMatch(this)"><p>4球</p><p>' + zjqs[4] + '</p></td>';
            var spfdata_six = '<td data-dit="v7" width="12.5%" onclick="seleMatch(this)"><p>5球</p><p>' + zjqs[5] + '</p></td>';
            var spfdata_seven = '<td data-dit="v8" width="12.59%" onclick="seleMatch(this)">6球<p></p><p>' + zjqs[6] + '</p></td>';
            var spfdata_eight = '<td data-dit="v9" width="12.5%" onclick="seleMatch(this)">7+球<p></p><p>' + zjqs[7] + '</p></td>';

            oodsTag4='<tr data-wf="ht" class="jc-table-b spf-dd">' + spfdata_one + spfdata_two + spfdata_three + spfdata_four + spfdata_five + spfdata_six + spfdata_seven + spfdata_eight + '</tr>' ;

        }
        if(bf){
            var spfdata_zero = '<td data-dit="v01" width="5.14%" >胜</td>';
            var spfdata_one = '<td data-dit="v02" width="5.1%" onclick="seleMatch(this)"><p>1:0</p><p>' + bf[0] + '</p></td>';
            var spfdata_two = '<td data-dit="v03" width="5.1%" onclick="seleMatch(this)"><p>2:0</p><p>' + bf[1] + '</p></td>';
            var spfdata_three = '<td data-dit="v04" width="5.1%" onclick="seleMatch(this)"><p>2:1</p><p>' + bf[2] + '</p></td>';
            var spfdata_four = '<td data-dit="v05" width="5.1%" onclick="seleMatch(this)"><p>3:0</p><p>' + bf[3] + '</p></td>';
            var spfdata_five = '<td data-dit="v06" width="5.1%" onclick="seleMatch(this)"><p>3:1</p><p>' + bf[4] + '</p></td>';
            var spfdata_six = '<td data-dit="v07" width="5.1%" onclick="seleMatch(this)"><p>3:2</p><p>' + bf[5] + '</td>';
            var spfdata_seven = '<td data-dit="v08" width="5.1%" onclick="seleMatch(this)"><p>4:0</p><p>' + bf[6] + '</p></td>';
            var spfdata_eight = '<td data-dit="v09" width="5.1%" onclick="seleMatch(this)"><p>4:1</p><p>' + bf[7] + '</p></td>';
            var spfdata_nine = '<td data-dit="v010" width="5.1%" onclick="seleMatch(this)"><p>4:2</p><p>' + bf[8] + '</p></td>';
            var spfdata_ten = '<td data-dit="v011" width="5.1%" onclick="seleMatch(this)"><p>5:0</p><p>' + bf[9] + '</p></td>';
            var spfdata_eleven = '<td data-dit="v012" width="5.1%" onclick="seleMatch(this)"><p>5:1</p><p>' + bf[10] + '</p></td>';
            var spfdata_twelve = '<td data-dit="v013" width="5.1%" onclick="seleMatch(this)"><p>5:2</p><p>' + bf[11] + '</p></td>';
            var spfdata_thirteen = '<td data-dit="v014" width="5.1%" onclick="seleMatch(this)">胜其他<p></p><p>' + bf[12] + '</p></td>';



            oodsTag5='<tr data-wf="ht" class="jc-table-b spf-dd">' + spfdata_zero + spfdata_one + spfdata_two + spfdata_three + spfdata_four + spfdata_five + spfdata_six + spfdata_seven + spfdata_eight + spfdata_nine + spfdata_ten + spfdata_eleven + spfdata_twelve + spfdata_thirteen +'</tr>' ;
            var spfdata_zero2 = '<td data-dit="v11" width="5.14%" >平</td>';
            var spfdata_one2 = '<td data-dit="v12" width="5.1%" onclick="seleMatch(this)"><p>0:0</p><p>' + bf[13] + '</p></td>';
            var spfdata_two2 = '<td data-dit="v13" width="5.1%" onclick="seleMatch(this)"><p>1:1</p><p>' + bf[14] + '</p></td>';
            var spfdata_three2 = '<td data-dit="v14" width="5.1%" onclick="seleMatch(this)"><p>2:2</p><p>' + bf[15] + '</p></td>';
            var spfdata_four2 = '<td data-dit="v15" width="5.1%" onclick="seleMatch(this)"><p>3:3</p><p>' + bf[16] + '</p></td>';
            var spfdata_five2 = '<td data-dit="v16" width="5.1%" onclick="seleMatch(this)"><p>平其他</p><p>' + bf[17] + '</p></td>';

            var oddTag5_2 = '<tr data-wf="ht" class="jc-table-b spf-dd">'+spfdata_zero2 +spfdata_one2+spfdata_one2+spfdata_two2+spfdata_three2+spfdata_four2+spfdata_five2+'</tr>' ;

            var spfdata_zero3 = '<td data-dit="v21" width="5.14%" >负</td>';
            var spfdata_one3 = '<td data-dit="v22" width="5.1%" onclick="seleMatch(this)"><p>0:1</p><p>' + bf[18] + '</p></td>';
            var spfdata_two3 = '<td data-dit="v23" width="5.1%" onclick="seleMatch(this)"><p>0:2</p><p>' + bf[19] + '</p></td>';
            var spfdata_three3 = '<td data-dit="v24" width="5.1%" onclick="seleMatch(this)"><p>1:2</p><p>' + bf[20] + '</p></td>';
            var spfdata_four3 = '<td data-dit="v25" width="5.1%" onclick="seleMatch(this)"><p>0:3</p><p>' + bf[21] + '</p></td>';
            var spfdata_five3 = '<td data-dit="v26" width="5.1%" onclick="seleMatch(this)"><p>1:3</p><p>' + bf[22] + '</p></td>';
            var spfdata_six3 = '<td data-dit="v27" width="5.1%" onclick="seleMatch(this)"><p>2:3</p><p>' + bf[23] + '</p></td>';
            var spfdata_seven3 = '<td data-dit="v28" width="5.1%" onclick="seleMatch(this)"><p>0:4</p><p>' + bf[24] + '</p></td>';
            var spfdata_eight3 = '<td data-dit="v29" width="5.1%" onclick="seleMatch(this)"><p>1:4</p><p>' + bf[25] + '</p></td>';
            var spfdata_nine3 = '<td data-dit="v210" width="5.1%" onclick="seleMatch(this)"><p>2:4</p><p>' + bf[26] + '</p></td>';
            var spfdata_ten3 = '<td data-dit="v211" width="5.1%" onclick="seleMatch(this)"><p>0:5</p><p>' + bf[27] + '</p></td>';
            var spfdata_eleven3 = '<td data-dit="v212" width="5.1%" onclick="seleMatch(this)"><p>1:5</p><p>' + bf[28] + '</p></td>';
            var spfdata_twelve3 = '<td data-dit="v213" width="5.1%" onclick="seleMatch(this)"><p>2:5</p><p>' + bf[29] + '</p></td>';
            var spfdata_thirteen3 = '<td data-dit="v214" width="5.1%" onclick="seleMatch(this)"><p>负其他</p><p>' + bf[30] + '</p></td>';

            var oddTag5_3 = '<tr data-wf="ht" class="jc-table-b rf-dd">' + spfdata_zero3 + spfdata_one3 + spfdata_two3 + spfdata_three3 + spfdata_four3 + spfdata_five3 + spfdata_six3 + spfdata_seven3 + spfdata_eight3 + spfdata_nine3 + spfdata_ten3 + spfdata_eleven3 + spfdata_twelve3 + spfdata_thirteen3 +'</tr>' ;

            oodsTag5 = oodsTag5 + oddTag5_2 + oddTag5_3;
        }



        changciHtml =
            '<table width="100%" data-des="' + teamname1 + '&nbsp;&nbsp;VS&nbsp;&nbsp;' +teamname2 + '" data-cc="' + code + '" class="jc-table">' +
            '<tbody>' +
            '<tr class="jc-table-tbb">' +
              '<td width="28%" class="jc-table-rb" rowspan="7"><p>' + saishi + '</p><p>' + lsname + '</p><p class="time"><img src="img/sclock.png">' + teamtime + '</p></td>' +
              '<td width="72%" colspan="7"><span class="teamname">' + teamname1 + '</span>V S<span class="teamname">' + teamname2 + '</span></td>' +
            '</tr>' +
            oodsTag1 +
            oodsTag2 +
            '</tbody>' +
            '</table>' +
            '<table width="100%" data-des="' + teamname1 + '&nbsp;&nbsp;VS&nbsp;&nbsp;' +teamname2 + '" data-cc="' + code + '" class="jc-table" id="bqc' + code + '" style="display: none;">' +
            '<tbody>' +
            oodsTag3 +
            '</tbody>' +
            '</table>' +
            '<table width="100%" data-des="' + teamname1 + '&nbsp;&nbsp;VS&nbsp;&nbsp;' +teamname2 + '" data-cc="' + code + '" class="jc-table" id="zjqs' + code + '" style="display: none;">' +
            '<tbody>' +
            oodsTag4 +
            '</tbody>' +
            '</table>'+
            '<table width="100%" data-des="' + teamname1 + '&nbsp;&nbsp;VS&nbsp;&nbsp;' +teamname2 + '" data-cc="' + code + '" class="jc-table" id="bf' + code + '" style="display: none;">' +
            '<tbody>' +
            oodsTag5 +
            '</tbody>' +
            '</table>';

        $("#s_" + code).append(changciHtml);
    });
    after();
}

function selOpenClose(id){
    var tableObj=$("#"+id);
    if(tableObj.is(":hidden")){
        tableObj.show();
        return;
    }
    tableObj.hide();
}


//生成3位字符串如022
function formNumber(num) {
    if (num < 10) {
        num = "00" + num;
    } else if (num >= 10 && num < 100) {
        num = "0" + num;
    }
    return num;
}
function toogle(evel) {
    if ($(evel).hasClass("on")) {
        $(evel).removeClass("on");
    } else {
        $(evel).addClass("on");
    }
}

function loginA04(name, password) {
    var body = {
        name: name,
        password: password
    };
    $.ajax({
        type: "POST",
        url: "/bankServices/LotteryService/commonTrans?timestamp=?timestamp=" + new Date().getTime(),
        dataType: "json",
        cache: false,
        data: {
            cmd: 'A04',
            body: JSON.stringify(body)
        },
        success: function (result) {

        }
    });
}

