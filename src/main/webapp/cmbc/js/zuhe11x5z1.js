/*11选5前1直选*/
$(document).ready(function() {	
	$("#putong").find(".redball").click(function(){
		if($(this).hasClass("on")){
			$(this).removeClass("on");	
		}else{
			$(this).addClass("on");	
		}
		mathZhushu($(this).parent());
		return false;
	});
	$("#putong").find(".blueball").click(function(){
		if($(this).hasClass("on")){
			$(this).removeClass("on");	
		}else{
			$(this).addClass("on");	
		}
		mathZhushu($(this).parent());
		return false;
	});
	$("#jxyz").click(function(){
		var red=$("#putong").attr("data-red");
		var blue=$("#putong").attr("data-blue");
		red=parseInt(red);
		blue=parseInt(blue);
		var zhushu=$("#zhushu").html();
		var qishu=$("#qishu").html();
		var beishu=$("#beishu").html();
		zhushu=parseInt(zhushu);
		qishu=parseInt(qishu);
		beishu=parseInt(beishu);	
		zhushu=zhushu+1;
		$("#zhushu").html(zhushu);
		if($("#zhuijia").length>0 && $("#zhuijia").hasClass("now")){
			$("#qianshu").html(qishu*beishu*zhushu*3);
		}else{
			$("#qianshu").html(qishu*beishu*zhushu*2);	
		}
		checkCbb();
		selqiu($("#putong").find(".redball"),red);
		selqiu($("#putong").find(".blueball"),blue);	
		ptXqiu();	
	});
	//胆拖
	$("#dan").find(".redball").click(function(){
		var red=$("#putong").attr("data-red");
		//var blue=$("#putong").attr("data-blue");
		red=parseInt(red)-1;
		//blue=parseInt(blue)-1;
		if($(this).hasClass("on")){
			$(this).removeClass("on");	
		}else{
			if($("#dan").find(".redball.on").length<red){
				var res=dtDiff($("#tuo").find(".redball.on"),$(this));
				if(res){
					$(this).addClass("on");	
				}
			}else{
				alert("最多选"+red+"个胆码");		
			}
		}
		 mathDantuo();
		 return false;
	});
	$("#tuo").find(".redball").click(function(){
		if($(this).hasClass("on")){
			$(this).removeClass("on");	
		}else{
			var res=dtDiff($("#dan").find(".redball.on"),$(this));
			if(res){
				$(this).addClass("on");	
			}
		}
		 mathDantuo();
		 return false;
	});
	$("#lantuo").find(".blueball").click(function(){
		if($(this).hasClass("on")){
			$(this).removeClass("on");	
		}else{
			var res=dtDiff($("#landan").find(".blueball.on"),$(this));
			if(res){
				$(this).addClass("on");	
			}
		}
		 mathDantuo();
		 return false;
	});
	$("#landan").find(".blueball").click(function(){
		if($(this).hasClass("on")){
			$(this).removeClass("on");	
		}else{
			var res=dtDiff($("#lantuo").find(".blueball.on"),$(this));
			if(res){
				var blue=$("#putong").attr("data-blue");
				blue=parseInt(blue)-1;
				if($("#landan").find(".blueball.on").length<blue){
					$(this).addClass("on");	
				}else{
					alert("最多选"+blue+"个胆码");		
				}
			}
		}
		 mathDantuo();
		 return false;
	});
	$(".step1").die().live("click",function(){
		if($(".redball.on").length<2){
			alert("至少选择2个号码");
			return false;	
		}
		stepOne(this);	
	});
	/*机选一注恢复原始数量*/
	$(".tz-tit-right2.red").click(function(){
		var nuuu=2;
		$(this).prev(".tz-tit-right1").html(nuuu);	
	});
	$(".tz-tit-right2.blue").click(function(){
		var nuuu=2;
		$(this).prev(".tz-tit-right1").html(nuuu);	
	});
	
});
