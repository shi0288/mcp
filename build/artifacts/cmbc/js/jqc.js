/*四场进球*/
$(document).ready(function() {
	$(".redball").click(function(){
		if($(this).hasClass("on")){
			$(this).removeClass("on");	
			if($(this).parent().find(".on").length<=0){
				$(this).parent().removeClass("on");	
			}	
		}else{
			$(this).addClass("on");	
			$(this).parent().addClass("on");
		}
		jqcMath();
		return false;
	});
	$(".step1").die().live("click",function(){
		jqcstepOne(this);	
	});
	
});
//第一步选好了
function jqcstepOne(evel){
	if($(evel).hasClass("step1")){
		var iz=$("#ptzhushu").html();
		var izo=$("#dtzhushu").html();
		iz=parseInt(iz)+parseInt(izo);
		if(iz<1 && izo<1){
			alert("请按规则选号");	
			xqllShow();
		}else if(iz>10000 || izo>10000){
			alert("单注金额不能超过2万");	
			xqllShow();
		}else{			
			jqcXqiu();
			xqllShow();
			sumAll();
		}
	}
}
function jqcXqiu(){
	var izhu=$("#ptzhushu").html();
	izhu=parseInt(izhu);
	var ttype="00";
	if(izhu>0){
		var html="";
		var zhuHtml="[单式1注]";
		$(".evchang.on").each(function(index) {
			if($(this).find(".redball.on").length>1){
				html+="(";	
			}
            $(this).find(".redball.on").each(function(index,element) {
				var xuandq=$(this).html();
				xuandq=xuandq.replace(/\D/g,'');
				html+=xuandq;
				if(index>0 &&index==$(this).parent().find(".redball.on").length-1){
					html+=")";	
				}
            });
        });
	}
	if(izhu>1){
		zhuHtml="[复式"+izhu+"注]"	
		ttype="01";
	}
	var thtml='<div class="clearfix p5 mlr5 qiulist" data-type="'+ttype+'" data-zs="'+izhu+'" data-res="'+html+'">'+
				 '<a class="evclose" href="javascript:void(-1)" onClick="delEv(this)"></a>'+
				 '<div class="evhao gerytext"><span class="redtext">'+html+'</span>'+zhuHtml+' </div></div>';
	$("#xh-box").prepend(thtml);
	$(".blueball").removeClass("on");
	$(".redball").removeClass("on");	
}
//算注数
function jqcMath(){
	if($(".evchang.on").length==8){
		var sum=1;
		$(".evchang.on").each(function(index, element) {
            sum*=$(this).find(".on").length;
        });
		$("#ptzhushu").html(sum);
		$("#ptqianshu").html(sum*2);
	}
}
