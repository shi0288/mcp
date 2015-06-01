/*排列：四场进球、七星彩、排列5*/
$(document).ready(function() {
	$(".redball").click(function(){
		if($(this).hasClass("on")){
			$(this).removeClass("on");		
		}else{
			$(this).addClass("on");	
		}
		pmathZhushu(false);
		return false;
	});
	$("#jxyz").click(function(){
		var nn=$(".pailei").length;	
		var narr=[];
		for(var i=0;i<nn;i++){
			var me=Math.random()*100;
			me=parseInt(me);
			me=me%$(".pailei").eq(0).find(".redball").length;
			narr.push(me);
		}
		var html=narr.join("|");
		var zhuHtml="[单式1注]";
		var thtml='<div class="clearfix p5 mlr5 qiulist" data-zs="'+1+'" data-res="'+html+'" data-type="00">'+
				 '<a class="evclose" href="javascript:void(-1)" onClick="delEv(this)"></a>'+
				 '<div class="evhao gerytext"><span class="redtext">'+html+'</span>'+zhuHtml+' </div></div>';
		$("#xh-box").prepend(thtml);
		var zhushu=$("#zhushu").html();
		var qishu=$("#qishu").html();
		var beishu=$("#beishu").html();
		qishu=parseInt(qishu);
		beishu=parseInt(beishu);
		zhushu=parseInt(zhushu)+1;
		$("#zhushu").html(zhushu);
		$("#qianshu").html(qishu*beishu*zhushu*2);
		checkCbb();
	});
	$(".step1").die().live("click",function(){
		pstepOne(this);	
	});
});
