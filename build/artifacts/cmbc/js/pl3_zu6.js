/*排列三组选六*/
$(document).ready(function() {
    $(".more-tou").click(function(){
		var index=$(this).index(".more-tou");
		$(".meizhu").hide().eq(index).show();	
	});
	$("#pailei").find(".redball").click(function(){
		if($(this).hasClass("on")){
			$(this).removeClass("on");		
		}else{
			if($(this).parents(".onlyball").length>0){
				if($(this).siblings(".on").length<=0){
					$(this).addClass("on");		
				}else{alert("每位只能选择1个号码")}
			}else{
				$(this).addClass("on");	
			}
		}
		var red=$("#putong").attr("data-red");
		red=parseInt(red);
		pmathZhushu(this);
		return false;
	});
	//排列三组选六胆拖
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
		 zmathDantuo(this);
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
		 zmathDantuo(this);
		 return false;
	});
	//排列三组六复式
	$("#putong").find(".redball").click(function(){
		if($(this).hasClass("on")){
			$(this).removeClass("on");		
		}else{
			$(this).addClass("on");	
		}
		var mqiu=$("#putong").attr("data-red");
		mqiu=parseInt(mqiu);
		var sumzhu=$.base.comBination($("#putong").find(".on").length,mqiu);
		var i=$(this).parents(".tab-content").index(".tab-content");
		$(".meizhushu").eq(i).html(sumzhu);
		$(".meizhuqian").eq(i).html(sumzhu*2);
		return false;	
	});
	$("#hezhi").find(".redball").click(function(){
		var arr=$("#hezhi").attr("data-arr");
		arr=arr.split(",");
		var sumzhu=0;
		if($(this).hasClass("on")){
			$(this).removeClass("on");		
		}else{
			$(this).addClass("on");	
		}
		for(var j=0;j<$("#hezhi").find(".redball.on").length;j++){
			var inde=$("#hezhi").find(".redball.on").eq(j).index("#hezhi .redball");
			var su=arr[inde];
			su=parseInt(su);
			sumzhu+=su;		
		}
		var index=$(this).parent().find(".on").length;
		var i=$(this).parents(".tab-content").index(".tab-content");
		$(".meizhushu").eq(i).html(sumzhu);
		$(".meizhuqian").eq(i).html(sumzhu*2);
		return false;
	});
	$("#kuadu").find(".redball").click(function(){
		var arr=$("#kuadu").attr("data-arr");
		arr=arr.split(",");
		var sumzhu=0;
		if($(this).hasClass("on")){
			$(this).removeClass("on");		
		}else{
			$(this).addClass("on");	
		}
		for(var j=0;j<$("#kuadu").find(".redball.on").length;j++){
			var inde=$("#kuadu").find(".redball.on").eq(j).index("#kuadu .redball");
			var su=arr[inde];
			su=parseInt(su);
			sumzhu+=su;		
		}
		var index=$(this).parent().find(".on").length;
		var i=$(this).parents(".tab-content").index(".tab-content");
		$(".meizhushu").eq(i).html(sumzhu);
		$(".meizhuqian").eq(i).html(sumzhu*2);
		return false;
	});
	$(".step1").die().live("click",function(){
		gotSum();
		if($("#pailei").find(".on").length>0){
			resPailie();	
		}
		if($("#hezhi").find(".on").length>0){
			resHezhi();		
		}
		if($("#putong").find(".on").length>0){
			respFushi();
		}
		if($("#kuadu").find(".on").length>0){
			resKuadu();	
		}
		if($("#dantuo").find(".on").length>0){
			resDantuo();	
		}
		var iz=0;
		$("#meizhu .meizhuqian").each(function(index, element) {
            var izo=$(this).html();
			izo=parseInt(izo);
			iz+=izo;
        });
		if(iz==0){
			alert("请按规则选号");
			if($("#qianshu").html()==0){
				return false;	
			}
		}
		xqllShow();
		$(".meizhushu").html(0);
		$(".meizhuqian").html(0);
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
		var zhuHtml="[直选单式1注]";
		var thtml='<div class="clearfix p5 mlr5 qiulist" data-play="01" data-type="00" data-zs="'+1+'" data-res="'+html+'">'+
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
	/*$("#jxyz").click(function(){
		var red=$("#putong").attr("data-red");
		var zhushu=$("#zhushu").html();
		var qishu=$("#qishu").html();
		var beishu=$("#beishu").html();
		zhushu=parseInt(zhushu);
		qishu=parseInt(qishu);
		beishu=parseInt(beishu);
		red=parseInt(red);	
		zhushu=zhushu+1;
		selqiu($("#putong").find(".redball"),red);
		resFushi(true);
		$("#zhushu").html(zhushu);
		$("#qianshu").html(qishu*beishu*zhushu*2);	
	});	*/
});
//列出复式投注结果
function respFushi(){
	var redStr="";
	var index=$("#putong").index(".tab-content");
	var ezhushu=$(".meizhu").eq(index).find(".meizhushu").eq(0).html();
	ezhushu=parseInt(ezhushu);
	if(ezhushu>0){
		for(var i=0;i<$("#putong").find(".redball.on").length;i++){
			if(i==$("#putong").find(".redball.on").length-1){
				redStr+=$("#putong").find(".redball.on").eq(i).html()+"";	
			}else{
				redStr+=$("#putong").find(".redball.on").eq(i).html()+",";	
			}
		}
		zhuHtml="["+$('#putong').attr("data-des")+"复式"+ezhushu+"注]";
		var html='<div class="clearfix p5 mlr5 qiulist" data-type="01" data-zs="'+ezhushu+'" data-res="'+redStr+'">'+
				 '<a class="evclose" href="javascript:void(-1)" onClick="delEv(this)"></a>'+
				 '<div class="evhao gerytext"><span class="redtext">'+redStr+'</span>'+zhuHtml+'</div></div>';
		$("#xh-box").prepend(html);
	}	
}
//排列3组六机选一注
function pjxyzhu(){
	var narr=[];
	selqiu($('#putong').find('.redball'),3);
	$('#putong').find('.redball.on').each(function(){
		var qiuu=$(this).html();
		narr.push(qiuu);
	});
	var html=narr.join(",");
	var playtype="";
	if($("#putong").length>0){
		playtype=$("#putong").attr("data-des");	
	}
	var zhuHtml="["+playtype+"复式一注]";
	var thtml='<div class="clearfix p5 mlr5 qiulist" data-type="01" data-zs="'+2+'" data-res="'+html+'">'+
			 '<a class="evclose" href="javascript:void(-1)" onClick="delEv(this)"></a>'+
			 '<div class="evhao gerytext"><span class="redtext">'+html+'</span>'+zhuHtml+' </div></div>';
	$("#xh-box").prepend(thtml);
	var zhushu=$("#zhushu").html();
	var qishu=$("#qishu").html();
	var beishu=$("#beishu").html();
	qishu=parseInt(qishu);
	beishu=parseInt(beishu);
	zhushu=parseInt(zhushu)+2;
	$("#zhushu").html(zhushu);
	$("#qianshu").html(qishu*beishu*zhushu*2);
	checkCbb();	
}

