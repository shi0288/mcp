var transitionType = "none";
function getCookie(a) {
    return document.cookie.length > 0 && (c_start = document.cookie.indexOf(a + "="), -1 != c_start) ? (c_start = c_start + a.length + 1, c_end = document.cookie.indexOf(";", c_start), -1 == c_end && (c_end = document.cookie.length), unescape(document.cookie.substring(c_start, c_end))) : ""
}
function setCookie(a, b, c) {
    var d = new Date;
    d.setDate(d.getDate() + c);
    document.cookie = a + "=" + escape(b) + (null == c ? "": ";expires=" + d.toGMTString());
}


/*function before() {
    $.blockUI(.5),
    $.ui.showMask("loading");
}
function after() {
    $.unblockUI(),
    $.ui.hideMask();
}*/


function setPanelHTML(a, b) {
    $.feat.nativeTouchScroll ? $("#" + a).html(b) : $("#" + a + " .jqmScrollPanel").html(b);
}
function selectMenu(divname){

	if(sessionStorage.getItem("UserId")!=null){
		onLogined();
	}
}
function toMyLotPanel(a) {
	//if(sessionStorage.getItem("UserId")==null){
	//	toLoadLoginPanel();
	//	return;
	//}
	
	if($(a).attr("data-loaded")){
		onLoginPageLoaded();
		$.ui.loadContent("myLotPanel", !1, !1, transitionType);
		selectMenu('accounttd');
		myLoty_type = 0;
		reloadMylotData();
	}
	else{
		before();
		 $.ajax({
		        url: "mylot.jsp",
		        type: "POST",
		        data: {},
		        success: function(b) {
		            setPanelHTML("myLotPanel", b),
		            $(a).attr("data-loaded", "true"),
		            after(),
		            $.ui.loadContent("myLotPanel", !1, !1, transitionType);
		        	selectMenu('accounttd');
		        	myLoty_type = 0;
		        	reloadMylotData();
		        },
		        timeout: "120000",
		        error: onError
		    });
	}
}
function toHelpPanel(a) {
	
	if($(a).attr("data-loaded")){
		onLoginPageLoaded();
		$.ui.loadContent("helpPanel", !1, !1, transitionType);
		selectMenu('helptd');
	}
	else{
		before();
		 $.ajax({
		        url: "help.jsp",
		        type: "POST",
		        data: {},
		        success: function(b) {
		            setPanelHTML("helpPanel", b),
		            $(a).attr("data-loaded", "true"),
		            after(),
		            $.ui.loadContent("helpPanel", !1, !1, transitionType);
		        	selectMenu('helptd');
		        },
		        timeout: "120000",
		        error: onError
		    });
	}
}
function onError(a){
	after();
    errorHandler(a.responseText);
}
function errorHandler(text) {
    if (window.abortXHR) return window.abortXHR = !1,
    void 0;
    if (!text) return alert("\u7f51\u7edc\u5f02\u5e38"),
    void 0;
    var ee = JSON.parse(text),
    em = ee.errorMessage;
    "true" == "" + em.execJS && eval("" + em.jsMethod),
    "true" == "" + em.execShow && (errMsg = "" + em.showMessage, alert(errMsg));
}
function returnHome() {
    before(),
    selectMenu('buylotterytd');
    $.ui.loadContent("main", !1, !1, transitionType),
    after();
}

function onLogined(){
	$(".login_top_button").each(function(){
		 $(this).html("账户中心");
	 });
}
function onLogout(){
	before();
	$.ajax({
        url: '../WebServices/LotteryService/logOut?timestamp=' + new Date().getTime(),
        type: "POST",
        data: {},
        success: function(b) {
        	$(".login_top_button").each(function(){
	       		 $(this).html("账户中心");
	       	 });
	       	sessionStorage.clear();
	       	returnHome();
        },
        timeout: "120000",
        error: onError
    });
	
	
}
//登录
function toLoadPanel(a,c) {
	before();
	$.ajax({
        url: a,
        type: "POST",
        data: {},
        success: function(b) {
            setPanelHTML(c, b);
            after();
            
            $.ui.loadContent(c, !1, !1, transitionType);
        	onLoadAccountPage();
        },
        timeout: "120000",
        error: function(a) {
        	onError();
        }
    });
	
}
function toLastWinPanel(a){
	if($(a).attr("data-loaded")){
		onLoginPageLoaded();
		$.ui.loadContent("lastwinPanel", !1, !1, transitionType);
		selectMenu('openwintd');
	}
	else{
		before();
		 $.ajax({
		        url: "lastwin.jsp",
		        type: "POST",
		        data: {},
		        success: function(b) {
		            setPanelHTML("lastwinPanel", b),
		            $(a).attr("data-loaded", "true"),
		            after(),
		            $.ui.loadContent("lastwinPanel", !1, !1, transitionType);
		        	selectMenu('openwintd');
		        	loadLastWinData();
		        },
		        timeout: "120000",
		        error: onError
		    });
	}
}
function toLoadLoginPanel() {
		if(sessionStorage.getItem("UserId")!=null){
			before();
			$.ajax({
		        url: 'account.jsp',
		        type: "POST",
		        data: {},
		        success: function(b) {
		            setPanelHTML('accountPanel', b);
		            after();
		            $.ui.removeFooterMenu();
		            $.ui.loadContent('accountPanel', !1, !1, transitionType);
		        	onLoadAccountPage();
		        },
		        timeout: "120000",
		        error: onError
		    });
		}
		else{
			setWebitEvent(window.location.href, "LT02");
//			before();
//			$.ajax({
//		        url: 'login.jsp',
//		        type: "POST",
//		        data: {},
//		        success: function(b) {
//		            setPanelHTML('loginPanel', b);
//		            after();
//		            $.ui.removeFooterMenu();
//		            $.ui.loadContent('loginPanel', !1, !1, transitionType);
//		            onLoginPageLoaded();
//		        	
//		        },
//		        timeout: "120000",
//		        error: onError
//		    });
		}
		
}
function onLoginPageLoaded(){
	if(window.localStorage!=null){
		var temp_userId = localStorage.getItem("UserId");
		var remeberpas = localStorage.getItem("RemberPassword");
		var password = localStorage.getItem("Password");
		if(temp_userId!=null)
		{
			window.setTimeout(function(){
				$("#jizhumimadiv").css("display","block");
				$("#loginPanel #login_userId").val(""+temp_userId);
				if(remeberpas!=null&&remeberpas=="true")
				{
					$("#loginPanel #login_password").val(""+password);
					document.getElementById("jizhumima").checked = true;
				}
			},100);
			
		}
	}
}
function onRegisterButton(){
	var userId = $("#reg_userId").val();
	var password = $("#reg_password").val();
	var password2 = $("#reg_password2").val();
	if(userId=="")
	{
		alert("请输入手机号码！");
		return;
	}
	if(password=="")
	{
		alert("请输入密码！");
		return;
	}
	if(password2!=password)
	{
		alert("两次密码输入不一致！");
		return;
	}
	before();
	$.ajax({           
		type : "POST",          
		url  : "../WebServices/LotteryService/register?timestamp=" + new Date().getTime(),         
		cache : false,            
		data: {
            userId: userId,
            password: password,
            connChannel: 'CMBC',
        },          
		success : function(b) {
			after();
			var resultCode = $(b).find("ResultCode").text();
			if(resultCode==0)
			{
				var userId = $(b).find("User").find("UserId").text();
				var balance = $(b).find("User").find("Balance").text();
				sessionStorage.setItem("UserId", userId);
				sessionStorage.setItem("Balance", balance);
				sessionStorage.setItem("Bonus", 0);
				sessionStorage.setItem("Password", password);
				if(window.localStorage!=null){
					localStorage.setItem("UserId", userId);
				}
				onLogined();
				alert("注册成功，祝您好运！");
				returnHome();
			}
			else{
				var errorMsg = $(b).find("ErrorMsg").text();
				alert(errorMsg);
			}
        },            
		error : onError        
	});
}
function onLoginButton(){
	var userId = $("#login_userId").val();
	var password = $("#login_password").val();
	if(userId=="")
	{
		alert("请输入手机号码！");
		return;
	}
	if(password=="")
	{
		alert("请输入密码！");
		return;
	}
	before();
	$.ajax({           
		type : "POST",          
		url  : "../WebServices/LotteryService/userLogin?timestamp=" + new Date().getTime(),        
		cache : false,            
		data: {
            userId: userId,
            password: password,
            connChannel: 'CMBC',
        },          
		success : function(b) {
			after();
			var resultCode = $(b).find("ResultCode").text();
			if(resultCode==0)
			{
				var userId = $(b).find("User").find("UserId").text();
				var balance = $(b).find("User").find("Balance").text();
				var bonus = $(b).find("User").find("Bonus").text();
				var realname = $(b).find("User").find("Realname").text();
				var creditcard = $(b).find("User").find("Creditcard").text();
				var personalId = $(b).find("User").find("PersonalId").text();
				sessionStorage.setItem("UserId", userId);
				sessionStorage.setItem("Balance", balance);
				sessionStorage.setItem("RealName", realname);
				sessionStorage.setItem("Creditcard", creditcard);
				sessionStorage.setItem("PersonalId", personalId);
				sessionStorage.setItem("Balance", balance);
				sessionStorage.setItem("Bonus", bonus);
				sessionStorage.setItem("Password", password);
				if(window.localStorage!=null){
					localStorage.setItem("UserId", userId);
					localStorage.setItem("Password", password);
					var rem = document.getElementById("jizhumima").checked;
					localStorage.setItem("RemberPassword", rem);
				}
				onLogined();
				$.ui.goBack();
			}
			else{
				var errorMsg = $(b).find("ErrorMsg").text();
				alert(errorMsg);
			}
        },            
		error : onError        
	});
}

//账户中心
function onLoadAccountPage(){
	$.ajax({           
		type : "POST",          
		url  : "../WebServices/LotteryService/getUser?timestamp=" + new Date().getTime(),         
		cache : false,            
		data: {
			password: sessionStorage.getItem("Password"),
			userId: sessionStorage.getItem("UserId"),
            connChannel: 'CMBC'
        },             
		success : function(b) {
			var resultCode = $(b).find("ResultCode").text();
			if(resultCode==0)
			{
				var userId = $(b).find("User").find("UserId").text();
				var balance = $(b).find("User").find("Balance").text();
				var bonus = $(b).find("User").find("Bonus").text();
				var realname = $(b).find("User").find("Realname").text();
				var creditcard = $(b).find("User").find("Creditcard").text();
				var personalId = $(b).find("User").find("PersonalId").text();
				sessionStorage.setItem("UserId", userId);
				sessionStorage.setItem("Balance", balance);
				sessionStorage.setItem("RealName", realname);
				sessionStorage.setItem("Creditcard", creditcard);
				sessionStorage.setItem("PersonalId", personalId);
				sessionStorage.setItem("Balance", balance);
				sessionStorage.setItem("Bonus", bonus);
				$("#account_userId").html(sessionStorage.getItem("UserId"));
				$("#account_bonus").html("￥"+sessionStorage.getItem("Bonus")/100+" ");
				$("#account_balance").html("￥"+sessionStorage.getItem("Balance")/100+" ");
			}
        },            
		error : onError        
	});
	$("#account_userId").html(sessionStorage.getItem("UserId"));
	$("#account_bonus").html("￥"+sessionStorage.getItem("Bonus")/100+" ");
	$("#account_balance").html("￥"+sessionStorage.getItem("Balance")/100+" ");
}

//玩法

function onLoadDltGame(){
	

	before();
	$.ajax({
        url: 'dlt.jsp',
        type: "POST",
        data: {},
        success: function(b) {
            setPanelHTML('gamePanel', b);
            after();
            $.ui.loadContent('gamePanel', !1, !1, transitionType);
            onDltGameLoaded();
        },
        timeout: "120000",
        error: onError
    });
}
function onLotteryStake(){
		onStakeButton();
}


//我的彩票
var myLoty_type = 0;

var mylot_pageIndex = 0;
var mylot_pageSize = 10;
var mylot_loading = false;
function reloadMylotData(){
	mylot_pageIndex = 0;
	$("#mylot_data_list_options").css("display","none");
	$("#mylot_bonus_data_list").html("");
	$("#mylot_data_list_options_button").css("display","block");
	if(myLoty_type==0){
		mylot_loadData();
	}
	if(myLoty_type==1){
		mylot_loadData1();
	}
	if(myLoty_type==2){
		mylot_loadData2();
	}
	 $("#myLotPanel").scroller({}).scrollTo({x:0,y:0});
}

function mylot_buttonClick(){
	if(mylot_loading) return;
	mylot_pageIndex = mylot_pageIndex+1;
	if(myLoty_type==0){
		mylot_loadData();
	}
	if(myLoty_type==1){
		mylot_loadData1();
	}
	if(myLoty_type==2){
		mylot_loadData2();
	}
}
function mylot_loadData(){
	mylot_loading  = true;
	$("#mylot_bonus_data_button").html("正在加载数据...");
	$.ajax({           
		type : "POST",          
		url  : "../WebServices/LotteryService/getCurrentTermStake?timestamp=" + new Date().getTime(),     
		cache : false,            
		data: {
			userId: sessionStorage.getItem("UserId"),
            connChannel: 'CCB',
            startIndex: mylot_pageIndex*mylot_pageSize,
            endIndex: (mylot_pageIndex+1)*mylot_pageSize
        },             
		success : function(b) {
			mylot_loading = false;
			var resultCode = $(b).find("ResultCode").text();
			if(resultCode==0)
			{
				if($(b).find("Count").text()==0){
					$("#mylot_bonus_data_button").html("没有查到当期投注数据");
				}
				else{
					if(mylot_pageIndex==0) $("#mylot_bonus_data_list").html("");
					if($(b).find('Ticket').length==0){
						$("#mylot_data_list_options_button").css("display","none");
					}
					else{
						if($(b).find("Count").text()<=mylot_pageSize){
							$("#mylot_data_list_options_button").css("display","none");
						}
						$("#mylot_bonus_data_button").html("点击加载更多数据");
						$("#mylot_data_list_options").css("display","block");
						$(b).find('Ticket').each( function (index)  {
							var  game = $( this ).children('Game').text();
							var  gameName = $( this ).children('GameName').text();
							var gameAdapterId = $( this ).children('GameAdapterId').text();
							var GameAdapterName = $( this ).children('GameAdapter').text();
							var  termId = $( this ).children('TermId').text();
							var  times = $( this ).children('Times').text();
							var  money = $( this ).children('Money').text();
							var  stakeTime = $( this ).children('StakeTime').text();
							var  stake1 = $( this ).children('Stake1').text();
							var  stake2 = $( this ).children('Stake2').text();
							var  stake3 = $( this ).children('Stake3').text();
							var  stake4 = $( this ).children('Stake4').text();
							var  stake5 = $( this ).children('Stake5').text();
							 if(index!=0||mylot_pageIndex!=0){
			                	  $("#mylot_bonus_data_list").append("<div class='spliter' style='margin-top:5px;'></div>");  
			                  }
							$("#mylot_bonus_data_list").append("<div class='list_con_item'><div  style='margin-top:8px;'>"+gameName+"&nbsp;&nbsp;&nbsp;"+GameAdapterName+"&nbsp;&nbsp;&nbsp;"+stakeTime+"</div><div style='padding-top: 5px;'>"+termId+"期&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;倍数："+times+"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;金额："+money+"元</div><div style='padding-top: 5px;'>投注号码："+con_stakeNumber(game,stake1)+"&nbsp;&nbsp;"+con_stakeNumber(game,stake2)+"&nbsp;&nbsp;"+con_stakeNumber(game,stake3)+"&nbsp;&nbsp;"+con_stakeNumber(game,stake4)+"&nbsp;&nbsp;"+con_stakeNumber(game,stake5)+"</div><div><a class='graybutton' onclick='kuaisu_stake(\""+gameAdapterId+"\",\""+gameName+"\",\""+times+"\",\""+stake1+"\",\""+stake2+"\",\""+stake3+"\",\""+stake4+"\",\""+stake5+"\");'>快速投注</a></div></div>");
						});
					}
				}
			}
			else{
				var errorMsg = $(b).find("ErrorMsg").text();
				alert(errorMsg);
			}
        },            
		error : onError        
	}); 
}
function mylot_loadData1(){
	mylot_loading  = true;
	$("#mylot_bonus_data_button").html("正在加载数据...");
	$.ajax({           
		type : "POST",          
		url  : "../WebServices/LotteryService/getHistoryStake?timestamp=" + new Date().getTime(),    
		cache : false,            
		data: {
			userId: sessionStorage.getItem("UserId"),
            connChannel: 'CCB',
            startIndex: mylot_pageIndex*mylot_pageSize,
            endIndex: (mylot_pageIndex+1)*mylot_pageSize
        },             
		success : function(b) {
			mylot_loading = false;
			var resultCode = $(b).find("ResultCode").text();
			if(resultCode==0)
			{
				if($(b).find("Count").text()==0){
					$("#mylot_bonus_data_button").html("没有查到历史投注数据");
				}
				else{
					if(mylot_pageIndex==0) $("#mylot_bonus_data_list").html("");
					if($(b).find('Ticket').length==0){
						$("#mylot_data_list_options_button").css("display","none");
					}
					else{
						if($(b).find("Count").text()<=mylot_pageSize){
							$("#mylot_data_list_options_button").css("display","none");
						}
						$("#mylot_bonus_data_button").html("点击加载更多数据");
						$("#mylot_data_list_options").css("display","block");
						$(b).find('Ticket').each( function (index)  {
							var  game = $( this ).children('Game').text();
							var  gameName = $( this ).children('GameName').text();
							var gameAdapterId = $( this ).children('GameAdapterId').text();
							var GameAdapterName = $( this ).children('GameAdapter').text();
							var  termId = $( this ).children('TermId').text();
							var  times = $( this ).children('Times').text();
							var  money = $( this ).children('Money').text();
							var winNumber = $( this ).children('WinNumber').text();
							var  stakeTime = $( this ).children('StakeTime').text();
							var  stake1 = $( this ).children('Stake1').text();
							var  stake2 = $( this ).children('Stake2').text();
							var  stake3 = $( this ).children('Stake3').text();
							var  stake4 = $( this ).children('Stake4').text();
							var  stake5 = $( this ).children('Stake5').text();
							var ballhtml = "";
							var winArray = new Array();
							var winArray2 = new Array();
							if(game=='00-0'||game=='00-Z'){ 
			                	  var len = winNumber.length/2;
			                	  var class_name= "red_text";
			                	  for(var i=0;i<len;i++){
			                		  if(i>=5) class_name= "blue_text";
			                		  var numbert = winNumber.substring(i*2,i*2+2);
			                		  ballhtml+="<span class='"+class_name+"'>"+numbert+"</span>&nbsp;";
			                		  if(i>=5){
			                			  winArray2[i-5] = numbert;
			                		  }
			                		  else{
			                			  winArray[i] = numbert;
			                		  }
			                	  }
			                  }
			                  if(game=='00-1'){
			                	  for(var i=0;i<winNumber.length;i++){
			                		  ballhtml+="<span class='red_text'>"+winNumber.substring(i,i+1)+"</span>&nbsp;";
			                	  }
			                  }
			                  if(game=='00-2'){
			                	  for(var i=0;i<winNumber.length;i++){
			                		  ballhtml+="<span class='red_text'>"+winNumber.substring(i,i+1)+"</span>&nbsp;";
			                	  }
			                  }
			                  if(game=='00-3'){
			                	  for(var i=0;i<winNumber.length;i++){
			                		  ballhtml+="<span class='red_text'>"+winNumber.substring(i,i+1)+"</span>&nbsp;";
			                	  }
			                  }
			                  if(game=='00-7'){
			                	  var class_name= "red_text";
			                	  var len = winNumber.length/2;
			                	  for(var i=0;i<len;i++){
			                		  if(i>=6) class_name= "blue_text";
			                		  var numbert = winNumber.substring(i*2,i*2+2);
			                		  ballhtml+="<span class='"+class_name+"'>"+numbert+"</span>&nbsp;";
			                		  if(i>=6){
			                			  winArray2[i-6] = numbert;
			                		  }
			                		  else{
			                			  winArray[i] = numbert;
			                		  }
			                	  }
			                  }
			                  if(game=='00-8'){
			                	  for(var i=0;i<winNumber.length;i++){
			                		  ballhtml+="<span class='red_text'>"+winNumber.substring(i,i+1)+"</span>&nbsp;";
			                	  }
			                  }
			                  if(game=='00-9'){
			                	  var len = winNumber.length/2;
			                	  for(var i=0;i<len;i++){
			                		  var numbert = winNumber.substring(i*2,i*2+2);
			                		  ballhtml+="<span class='red_text'>"+winNumber.substring(i*2,i*2+2)+"</span>&nbsp;";
			                		  winArray[i] = winNumber.substring(i*2,i*2+2);
			                	  }
			                  }
			                  if(game=='00-4'){
			                	  for(var i=0;i<winNumber.length;i++){
			                		  ballhtml+="<span class='red_text'>"+winNumber.substring(i,i+1)+"</span>&nbsp;";
			                	  }
			                  }
			                  if(game=='00-A'){
			                	  for(var i=0;i<winNumber.length;i++){
			                		  ballhtml+="<span class='red_text'>"+winNumber.substring(i,i+1)+"</span>&nbsp;";
			                	  }
			                  }
							 if(index!=0||mylot_pageIndex!=0){
			                	  $("#mylot_bonus_data_list").append("<div class='spliter' style='margin-top:5px;'></div>");  
			                  }
			                  
							$("#mylot_bonus_data_list").append("<div class='list_con_item'><div  style='margin-top:8px;'>"+gameName+"&nbsp;&nbsp;&nbsp;"+GameAdapterName+"&nbsp;&nbsp;&nbsp;"+stakeTime+"</div><div style='padding-top: 5px;'>"+termId+"期&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;倍数："+times+"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;金额："+money+"元</div><div style='padding-top: 5px;'>开奖号码："+ballhtml+"</div><div style='padding-top: 5px;'>投注号码："+con_stakeNumber(game,stake1,winArray,winArray2)+con_stakeNumber(game,stake2,winArray,winArray2)+con_stakeNumber(game,stake3,winArray,winArray2)+con_stakeNumber(game,stake4,winArray,winArray2)+con_stakeNumber(game,stake5,winArray,winArray2)+"</div><div><a class='graybutton' onclick='kuaisu_stake(\""+gameAdapterId+"\",\""+gameName+"\",\""+times+"\",\""+stake1+"\",\""+stake2+"\",\""+stake3+"\",\""+stake4+"\",\""+stake5+"\");'>快速投注</a></div></div>");
						});
					}
				}
			}
			else{
				var errorMsg = $(b).find("ErrorMsg").text();
				alert(errorMsg);
			}
        },            
		error : onError        
	}); 
}
function kuaisu_stake(gameAdapterId,gameName,times,stake1,stake2,stake3,stake4,stake5){
	before();
	$.ajax({           
		type : "POST",          
		url  : "../WebServices/LotteryService/createOrder?timestamp=" + new Date().getTime(),
		cache : false,               
		data: {
			connChannel: 'CMBC',
			userId: sessionStorage.getItem("UserId"),
			gameAdapterId: gameAdapterId,
			times: times,
			iphone:'IPHONE',
			chargeType: "NOLINE",
			password: sessionStorage.getItem("Password"),
			stake1: stake1,
			stake2: stake2,
			stake3: stake3,
			stake4: stake4,
			stake5: stake5
        },             
		success : function(b) {
			after();
			var resultCode = $(b).find("ResultCode").text();
			if(resultCode==0)
			{
				var envolopData = $(b).find("EnvolopData").text();
				setWebitEvent(envolopData, "LT03");
			}
			else{
				var errorMsg = $(b).find("ErrorMsg").text();
				alert(errorMsg);
			}
        },            
		error : onError        
		}); 
}
function mylot_loadData2(){
	mylot_loading  = true;
	$("#mylot_bonus_data_button").html("正在加载数据...");
	$.ajax({           
		type : "POST",          
		url  : "../WebServices/LotteryService/getHistoryWin?timestamp=" + new Date().getTime(),         
		cache : false,            
		data: {
			userId: sessionStorage.getItem("UserId"),
            connChannel: 'CCB',
            startIndex: mylot_pageIndex*mylot_pageSize,
            endIndex: (mylot_pageIndex+1)*mylot_pageSize
        },             
		success : function(b) {
			mylot_loading = false;
			var resultCode = $(b).find("ResultCode").text();
			if(resultCode==0)
			{
				if($(b).find("Count").text()==0){
					$("#mylot_bonus_data_button").html("没有查到历史中奖数据");
				}
				else{
					if(mylot_pageIndex==0) $("#mylot_bonus_data_list").html("");
					if($(b).find('Prize').length==0){
						$("#mylot_data_list_options_button").css("display","none");
					}
					else{
						if($(b).find("Count").text()<=mylot_pageSize){
							$("#mylot_data_list_options_button").css("display","none");
						}
						$("#mylot_bonus_data_button").html("点击加载更多数据");
						$("#mylot_data_list_options").css("display","block");
						$(b).find('Prize').each( function (index)  {
							var  game = $( this ).children('Game').text();
							var  gameName = $( this ).children('GameName').text();
							var  termId = $( this ).children('TermId').text();
							var  bonus = $( this ).children('Bonus').text();
							var  returnTime = $( this ).children('ReturnTime').text();
							var  winNumber = $( this ).children('WinNumber').text();
							var ballhtml = "";
							if(game=='00-0'||game=='00-Z'){ 
			                	  var len = winNumber.length/2;
			                	  var class_name= "red_text";
			                	  for(var i=0;i<len;i++){
			                		  if(i>=5) class_name= "blue_text";
			                		  ballhtml+="<span class='"+class_name+"'>"+winNumber.substring(i*2,i*2+2)+"</span>&nbsp;";
			                	  }
			                  }
			                  if(game=='00-1'){
			                	  for(var i=0;i<winNumber.length;i++){
			                		  ballhtml+="<span class='red_text'>"+winNumber.substring(i,i+1)+"</span>&nbsp;";
			                	  }
			                  }
			                  if(game=='00-2'){
			                	  for(var i=0;i<winNumber.length;i++){
			                		  ballhtml+="<span class='red_text'>"+winNumber.substring(i,i+1)+"</span>&nbsp;";
			                	  }
			                  }
			                  if(game=='00-3'){
			                	  for(var i=0;i<winNumber.length;i++){
			                		  ballhtml+="<span class='red_text'>"+winNumber.substring(i,i+1)+"</span>&nbsp;";
			                	  }
			                  }
			                  if(game=='00-7'){
			                	  var class_name= "red_text";
			                	  var len = winNumber.length/2;
			                	  for(var i=0;i<len;i++){
			                		  if(i>=6) class_name= "blue_text";
			                		  ballhtml+="<span class='"+class_name+"'>"+winNumber.substring(i*2,i*2+2)+"</span>&nbsp;";
			                	  }
			                  }
			                  if(game=='00-8'){
			                	  for(var i=0;i<winNumber.length;i++){
			                		  ballhtml+="<span class='red_text'>"+winNumber.substring(i,i+1)+"</span>&nbsp;";
			                	  }
			                  }
			                  if(game=='00-9'){
			                	  var len = winNumber.length/2;
			                	  for(var i=0;i<len;i++){
			                		  ballhtml+="<span class='red_text'>"+winNumber.substring(i*2,i*2+2)+"</span>&nbsp;";
			                	  }
			                  }
			                  if(game=='00-4'){
			                	  for(var i=0;i<winNumber.length;i++){
			                		  ballhtml+="<span class='red_text'>"+winNumber.substring(i,i+1)+"</span>&nbsp;";
			                	  }
			                  }
			                  if(game=='00-A'){
			                	  for(var i=0;i<winNumber.length;i++){
			                		  ballhtml+="<span class='red_text'>"+winNumber.substring(i,i+1)+"</span>&nbsp;";
			                	  }
			                  }
			                  if(index!=0||mylot_pageIndex!=0){
			                	  $("#mylot_bonus_data_list").append("<div class='spliter' style='margin-top:5px;'></div>");  
			                  }
			                  
							$("#mylot_bonus_data_list").append("<div class='list_con_item'><div  style='margin-top:8px;'>"+gameName+"&nbsp;&nbsp;&nbsp;"+termId+"期&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;中奖金额："+bonus+"元<div style='padding-top: 5px;'>返奖日期："+returnTime+"</div><div style='padding-top: 5px;'>开奖号码："+ballhtml+"</div></div></div>");
						});
					}
				}
			}
			else{
				var errorMsg = $(b).find("ErrorMsg").text();
				alert(errorMsg);
			}
        },            
		error : onError        
	}); 
}
function change_Query(optselect){
	myLoty_type = $(optselect).val();
	if(myLoty_type==0){
		$('#mylot_type_text').html("当期投注>>");
	}
	if(myLoty_type==1){
		$('#mylot_type_text').html("历史投注>>");
	}
	if(myLoty_type==2){
		$('#mylot_type_text').html("历史中奖>>");
	}
	reloadMylotData();
}
function con_stakeNumber(game,number,winarry,winarry2){
	if(number==null||number==""){
		return "";
	}
	var ballhtml = "";
	if(game=='00-0'||game=='00-7'||game=='00-9'||game=='00-Z'){
		var nums = number.split("-");
		if(nums.length>1){
			ballhtml = split_number(game,nums[0],1,winarry)+"-"+split_number(game,nums[1],1,winarry2);
		}
		else{
			ballhtml = split_number(game,number,0,winarry,winarry2);
		}
	}
	else{
		return number;
	}
	return ballhtml;
}
function split_number(game,number,type,winarry,winarry2){
	var ballhtml = "";
	var len = number.length/2;
	  for(var i=0;i<len;i++){
		  if(i!=0){
			  if(game=="00-0"&&type==0&&i==5) ballhtml+="+";
			  else if(game=="00-7"&&type==0&&i==6) ballhtml+="+";
			  else ballhtml+=",";
		  }
		  if(winarry!=null){
			  var nu = number.substring(i*2,i*2+2);
			  var isIn = false;
			  var color = 'red_text';
			  if((game=="00-0"&&type==0&&i>=5)||(game=="00-7"&&type==0&&i>=6)){
				  isIn = isNumberInArray(nu,winarry2);
				  color = 'blue_text';
			  }
			  else{
				  isIn = isNumberInArray(nu,winarry);
			  }
			  if(isIn){
				  ballhtml += "<span  class='"+color+"'>"+number.substring(i*2,i*2+2)+"</span>";
			  }
			  else{
				  ballhtml += number.substring(i*2,i*2+2); 
			  }
		  }
		  else{
			  ballhtml += number.substring(i*2,i*2+2);
		  }
		 
	  }
	  return ballhtml;
}
function isNumberInArray(num,arr){
	var isIn = false;
	for(var i=0;i<arr.length;i++){
		if(num==arr[i]) isIn = true;
	}
	return isIn;
}

function loadLastWinData(){
	loading  = true;
	$("#lastwin_bonus_data_button").html("正在加载数据...");
	$.ajax({           
		type : "POST",          
		url  : "../WebServices/LotteryService/getLastTermOpenWinList?timestamp=" + new Date().getTime(),      
		cache : false,            
		data: {
            connChannel: 'CCB'
        },             
		success : function(b) {
			loading = false;
			var resultCode = $(b).find("ResultCode").text();
			if(resultCode==0)
			{
						$("#lastwin_data_list_options_button").css("display","none");
						$("#lastwin_data_list_options").css("display","block");
						$(b).find('Term').each( function (index)  {
							var  game = $( this ).children('Game').text();
			                  var  winNumber = $( this ).children('WinNumber').text();
			                  var gameName = "";
			                  var ballhtml = "";
			                  if(game=='00-0'){ 
			                	  gameName="大乐透";
			                	  var len = winNumber.length/2;
			                	  var class_name= "red_text";
			                	  for(var i=0;i<len;i++){
			                		  if(i>=5) class_name= "blue_text";
			                		  ballhtml+="<span class='"+class_name+"'>"+winNumber.substring(i*2,i*2+2)+"</span>";
			                	  }
			                  }
			                  if(game=='00-1'){
			                	  gameName="七星彩";
			                	  for(var i=0;i<winNumber.length;i++){
			                		  ballhtml+="<span class='red_text'>"+winNumber.substring(i,i+1)+"</span>";
			                	  }
			                  }
			                  if(game=='00-2'){
			                	  gameName="排列三";
			                	  for(var i=0;i<winNumber.length;i++){
			                		  ballhtml+="<span class='red_text'>"+winNumber.substring(i,i+1)+"</span>";
			                	  }
			                  }
			                  if(game=='00-3'){
			                	  gameName="排列五";
			                	  for(var i=0;i<winNumber.length;i++){
			                		  ballhtml+="<span class='red_text'>"+winNumber.substring(i,i+1)+"</span>";
			                	  }
			                  }
			                  if(game=='00-7'){
			                	  gameName="双色球";
			                	  var class_name= "red_text";
			                	  var len = winNumber.length/2;
			                	  for(var i=0;i<len;i++){
			                		  if(i>=6) class_name= "blue_text";
			                		  ballhtml+="<span class='"+class_name+"'>"+winNumber.substring(i*2,i*2+2)+"</span>";
			                	  }
			                  }
			                  if(game=='00-8'){
			                	  gameName="福彩3D";
			                	  for(var i=0;i<winNumber.length;i++){
			                		  ballhtml+="<span class='red_text'>"+winNumber.substring(i,i+1)+"</span>";
			                	  }
			                  }
			                  if(game=='00-9'){
			                	  gameName="七乐彩";
			                	  var len = winNumber.length/2;
			                	  for(var i=0;i<len;i++){
			                		  ballhtml+="<span class='red_text'>"+winNumber.substring(i*2,i*2+2)+"</span>";
			                	  }
			                  }
			                  if(game=='00-4'){
			                	  gameName="胜负彩";
			                	  for(var i=0;i<winNumber.length;i++){
			                		  ballhtml+="<span class='szc'>"+winNumber.substring(i,i+1)+"</span>";
			                	  }
			                  }
			                  if(game=='00-A'){
			                	  gameName="四场进球";
			                	  for(var i=0;i<winNumber.length;i++){
			                		  ballhtml+="<span class='szc'>"+winNumber.substring(i,i+1)+"</span>";
			                	  }
			                  }
			                  var  termId = $( this ).children('TermId').text();
			                  var  openDate = $( this ).children('OpenDate').text();
							  var htmls = "<div  style='padding-top:10px;'>"+gameName+"&nbsp;<span class='smalllast_win'>"+termId+"期&nbsp;"+openDate+"</span><div class='padbooo'>"+ballhtml+"</div></div>";
							  $('#lastwin_'+game).html(htmls);
						});
			}
			else{
				var errorMsg = $(b).find("ErrorMsg").text();
				alert(errorMsg);
			}
        },            
		error : onError        
	}); 
}

function chargeMoney(){
	var userId = sessionStorage.getItem("UserId");

	$("#in_bonusch_balance").html("￥"+sessionStorage.getItem("Balance")/100+" ");
	$("#charge_button").bind( "click", function(event, ui) {
		var money = $("#charge_money").val();
		if(money=="")
		{
			alert("请输入要充值的金额！");
			return;
		}
		before();
		$.ajax({           
			type : "POST",          
			url  : "../WebServices/LotteryService/chargeOrder?timestamp=" + new Date().getTime(),
			cache : false,            
			data: {
				userId: userId,
				password: sessionStorage.getItem("Password"),
	            connChannel: 'CMBC',
	            money: money
	        },             
			success : function(b) {
				after();
				var resultCode = $(b).find("ResultCode").text();
				if(resultCode==0)
				{
					var envolopData = $(b).find("EnvolopData").text();
					setWebitEvent(envolopData, "LT03");
				}
				else{
					var errorMsg = $(b).find("ErrorMsg").text();
					alert(errorMsg);
				}
	        },            
			error : onError        
		}); 
	});
	$.ui.loadContent("blancecharge", !1, !1, transitionType);
}

function combin_sum(m,n)
{
    var temp_sum;
    var temp_i;
    temp_sum=1;
    if(n==0 || m>n) temp_sum=0;
    if ((m!=0) && (m<n) && (n!=0))
    {
        if(2*m<n) m=n-m;
        temp_i=m+1;
        while(temp_i<=n)
        {
            temp_sum=temp_i*temp_sum;
            temp_i=temp_i+1;
        }
        temp_i=n-m;
        while(temp_i>1)
        {
            temp_sum=temp_sum / temp_i;
            temp_i=temp_i-1;
        }
    }
    return temp_sum;
}
Array.prototype.clear=function(){ 
	this.length=0; 
};
Array.prototype.insertAt=function(index,obj){ 
	this.splice(index,0,obj); 
};
Array.prototype.removeAt=function(index){ 
	this.splice(index,1); 
};
Array.prototype.remove=function(obj){ 
	var index=this.indexOf(obj); 
	if (index>=0){ 
		this.removeAt(index); 
	} 
};
