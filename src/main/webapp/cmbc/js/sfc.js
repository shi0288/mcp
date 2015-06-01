/*胜负彩/任9场*/
$(document).ready(function() {
	$(".redball").click(function(){
		if($(this).hasClass("on")){
			$(this).removeClass("on");		
			if($(this).siblings(".on").length<=0){
				$(this).parent().removeClass("on");	
			}
		}else{
			$(this).addClass("on");	
			$(this).parent().addClass("on");
		}
		jqcmathZhushu($(".pailei.on"));
		return false;
	});
	$(".step1").die().live("click",function(){
		sfstepOne(this);	
	});
});
function jqcmathZhushu(obj){
	if(obj.length==9){
		var arr=makeArr(obj);
		var arrxb=getZh(arr,9);
		var sumzhu=0;
		for(var j=0;j<arrxb.length;j++){
			var su=1;
			for(var i=0;i<arrxb[j].length;i++){
				var inde=arrxb[j][i];
				su=su*arr[inde];
			}	
			sumzhu+=su;
		}	
		$("#ptzhushu").html(sumzhu);
		$("#ptqianshu").html(sumzhu*2)	
	}else if(obj.length==14){
		var arr=makeArr(obj);
		var arrxb=getZh(arr,14);
		var sumzhu=0;
		for(var j=0;j<arrxb.length;j++){
			var su=1;
			for(var i=0;i<arrxb[j].length;i++){
				var inde=arrxb[j][i];
				su=su*arr[inde];
			}	
			sumzhu+=su;
		}	
		$("#ptzhushu").html(sumzhu);
		$("#ptqianshu").html(sumzhu*2)		
	}else{
		$("#ptzhushu").html(0);
		$("#ptqianshu").html(0)		
	}
	
}
//将每场比赛投注选项的数量组成数组
function makeArr(obj){
	var arr=[];
	for(var j=0;j<obj.length;j++){
		var iitem=obj.eq(j).find(".on").length;
		arr.push(iitem);	
	}
	return arr;
}
//第一步选好了
function sfstepOne(evel){
	var m=$("#putong").attr("data-red");
	var n=$("#putong").attr("data-blue");
	m=parseInt(m);
	n=parseInt(n);
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
			sfXqiu();
			xqllShow();
			sumAll();
		}
	}
}

//胜负彩选球
function sfXqiu(){
	var izhu=$("#ptzhushu").html();
	izhu=parseInt(izhu);
	var ttype="00";
	if(izhu>0){
		var html="";
		var zhuHtml="[单式1注]";
		$(".pailei").each(function(index) {
            $(this).find(".redball.on").each(function(index,element) {
				if($(this).parent().find(".redball.on").length>1&&index==0){
					html+="(";	
				}
                html+=$(this).html();
				if($(this).parent().find(".redball.on").length>1&&index==$(this).parent().find(".redball.on").length-1){
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
