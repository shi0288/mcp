//11选5前三直选，前二直选
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
		var mqiu=$("#putong").attr("data-red");
		mqiu=parseInt(mqiu);
		var sumzhu=$.base.Arrangement($("#putong").find(".on").length,mqiu);
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
		resDingweis();
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
		jiXuanList();
		$("#zhushu").html(zhushu);
		$("#qianshu").html(qishu*beishu*zhushu*2);	
		checkCbb();
	});	
});
function jiXuanList(){
	var redStr="";
	var index=$("#putong").index(".tab-content");
	var ezhushu=$(".meizhu").eq(index).find(".meizhushu").eq(0).html();
	var zhuHtml="["+$('#putong').attr("data-des")+"单式1注]";
	var ttype="00";
	ezhushu=parseInt(ezhushu);
		for(var i=0;i<$("#putong").find(".redball.on").length;i++){
			if(i==$("#putong").find(".redball.on").length-1){
				redStr+=$("#putong").find(".redball.on").eq(i).html()+"";	
			}else{
				redStr+=$("#putong").find(".redball.on").eq(i).html()+"|";	
			}
		}
		if(ezhushu>1){
		 	 zhuHtml="["+$('#putong').attr("data-des")+"复式"+ezhushu+"注]";
			 ttype="01";
		}	
		var html='<div class="clearfix p5 mlr5 qiulist" data-type="'+ttype+'" data-zs="'+ezhushu+'" data-res="'+redStr+'">'+
				 '<a class="evclose" href="javascript:void(-1)" onClick="delEv(this)"></a>'+
				 '<div class="evhao gerytext"><span class="redtext">'+redStr+'</span>'+zhuHtml+'</div></div>';
		$("#xh-box").prepend(html);
	
}