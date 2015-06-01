//11选5前三组选，前二组选
$(document).ready(function() {
    $(".more-tou").click(function(){
		var index=$(this).index(".more-tou");
		$(".meizhu").hide().eq(index).show();	
	});
	$("#dpailei").find(".redball").click(function(){
		if($(this).hasClass("on")){
			$(this).removeClass("on");		
		}else{
			$(this).addClass("on");	
		}
		var red=$("#putong").attr("data-red");
		red=parseInt(red);
		dpmathZhushu(this,red);
		return false;
	});
	$("#putong").find(".redball").click(function(){
		if($(this).hasClass("on")){
			$(this).removeClass("on");	
		}else{
			$(this).addClass("on");	
		}
		mathZhushu($(this).parent());
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
		resDantuo();
		resFushi(false);
		if($("#hezhi").length>0){
			resHezhi();	
		}
		if($("#kuadu").length>0){
			resKuadu();	
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
		checkCbb();
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
	});
});

