//竞彩足球
$(document).ready(function() {
	//筛选联赛
   $("#jc-ls-ok").click(function(){
		var arrJcl=[];
		if($("#jc-liansai span.on").length<$("#jc-liansai span").length){
			$("#jc-liansai span").each(function() {
                if(!$(this).hasClass("on")){
					var lshtml=$(this).html();
					arrJcl.push(lshtml);
				}
            });	
		} 
	   $(".jc-table").show();
	   $(".lsname").each(function(index, element) {
       		var bres=$.inArray($(this).html(),arrJcl);
			if(bres!=-1){
				$(this).parents(".jc-table").hide();	
			} 
			$("#jc-ss-pop").hide();
			$(".cover").hide();
   	   });	
   });
   //点击联赛
   $("#jc-liansai span").die().live("click",function(){
		togOn(this);	  
   });
   //五大联赛
   $("#jc-bigls").click(function(){
   		var arrBigls=["德甲","法甲","意甲","西甲","英超"];
		$("#jc-liansai span").removeClass("on");
		$("#jc-liansai span").each(function(index, element) {
           var bres=$.inArray($(this).html(),arrBigls);
			if(bres!=-1){
				$(this).addClass("on");	
			} 
        });
   });
   //显示隐藏当天比赛
	$(".jc-toggle").die().live("click",function(){
		var oTable=$(this).parent().siblings("table");
		if(oTable.hasClass("hide")){
			oTable.removeClass("hide");
			$(this).removeClass("candown");
		}else{
			oTable.addClass("hide");
			$(this).addClass("candown");
		}	
	});
	//设胆
	$(".jc-list-item-dan").die().live("click",function(){
		if($(this).hasClass("no")){
			return false;	
		}	
		var len=maxDan();
		if($(this).hasClass("on")){
			$(this).removeClass("on");	
			$(".jc-list-item-dan").removeClass("no");
		}else{
			$(this).addClass("on");	
			$("#duo-chuan").find(".chuan-item").hide();
			$("#duo-chuan").append("<p class='chuan-gtip'>胆拖不支持多串投注</p>");
			if($(".jc-list-item-dan.on").length==len){
				$(".jc-list-item-dan").each(function(index, element) {
                    if(!$(this).hasClass("on")){
						$(this).addClass("no");	
					}
                });
			}
		}
		jcSum();
	});
	//清空所选比赛
	$(".jc-del").click(function(){
		$("#jc-match").find("td").removeClass("on");
		$(".jc-list").eq(0).html("");
		$(".jc-table").removeClass("on");
		$("#zhushu").html(0);
		$("#qianshu").html(0);	
		$("#jc-cs").html("至少选2场比赛");
	});
	$(".green-check").click(function(){
		togOn(this);	
	});
	$(".mt-cancel").click(function(){
		$(".chuan-item").removeClass("on");	
		$("#xchuan").find(".chuan-item[data-class=on]").addClass("on");
	});
	//加减注数
	$(".jc-k-right").click(function(){
		var zhu=$("#zhushu").html();
		zhu=parseInt(zhu);
		var bei=$(this).parent().find("input").val();
		bei=parseInt(bei);
		bei=bei+1;
		$(this).parent().find("input").val(bei);
		$("#qianshu").html(bei*zhu*2);
	});
	$(".jc-k-left").click(function(){
		var zhu=$("#zhushu").html();
		zhu=parseInt(zhu);
		var bei=$(this).parent().find("input").val();
		bei=parseInt(bei);
		if(bei>1){
			bei=bei-1;
			$(this).parent().find("input").val(bei);
			$("#qianshu").html(bei*zhu*2);	
		}
	});
	$("#beishu").blur(function(){
		var zhu=$("#zhushu").html();
		zhu=parseInt(zhu);
		var bei=$(this).parent().find("input").val();
		bei=parseInt(bei);
		$(this).parent().find("input").val(bei);
		$("#qianshu").html(bei*zhu*2);	
	});
	$(".jc-ok").eq(0).click(function(){
		if($(".jc-table.on").length>=2){
			jcList();
			chuanChange();
			//算注数
			jcSum();
			jctwo();	
		}else{
			alert("请至少选择2场比赛");	
		}	
	});
	$(".jc-xchuan").click(function(e){
		$(".cover").eq(0).show();
		$("#xchuan").show();	
		e.stopPropagation();
	});
	$(".jc-list-item-close").die().live("click",function(){
		var datacc=$(this).parent().attr("data-cc");
		$(".jc-table[data-cc="+datacc+"]").eq(0).removeClass("on");
		$(".jc-table[data-cc="+datacc+"]").eq(0).find("td").removeClass("on");
		$(this).parent().remove();
		//算注数
		chuanChange();	
		jcSum();
		
	});
	$(".mt-ok").click(function(){
		var html="";
		var data="";
		if($(".chuan-item.on").length<1){
			alert("至少选择一种过关方式");
			return false;	
		}
		$("#xchuan").find(".on").each(function(index) {
			if(index==$("#xchuan").find(".on").length-1){
				html+=$(this).html();
				data+=$(this).attr("data-chuan");
			}else{
        	 	html+=$(this).html()+",";
				data+=$(this).attr("data-chuan")+",";
			}
        });	
		$("#chuanguan").attr("data-chuan",data);
		$("#chuanguan").html(html);
		jcSum();
		$(".chuanguan").hide();
		$(".cover").hide();	
		$(".chuan-item").removeAttr("data-class");
		$(".chuan-item.on").attr("data-class","on");
		var changs=$(".jc-list-item").length;
		var len=maxDan();
		if(changs<=len+1){		
			$(".jc-list-item-dan").addClass("no");	
		}else{
			$(".jc-list-item-dan").removeClass("no");		
		}
		if($("#duo-chuan .chuan-item").hasClass("on")){
			$(".jc-list-item-dan").addClass("no");		
		}
	});
	$(".jc-list-item-dw").die().live("click",function(){
		var datacc=$(this).parents(".jc-list-item").attr("data-cc");
		var cctable=$(".jc-step1").eq(0).find(".jc-table[data-cc="+datacc+"]");
		var datawf=$(this).parent().attr("data-wf");
		var datadit=$(this).attr("data-dit");
		var wf=cctable.find(".jc-table-b[data-wf="+datawf+"]").eq(0);
		var att=wf.find("td[data-dit="+datadit+"]").eq(0);
		att.removeClass("on");
		if($(this).parents(".jc-list-item-cot").find(".jc-list-item-dw.on").length<2){
			cctable.removeClass("on");
			$(this).parents(".jc-list-item").remove();	
			chuanChange();
		}else{
			$(this).remove();	
			chuanList();
		}
		//算注数		
		jcSum();	
	});	
});
function seleMatch(evel){
		if($(evel).hasClass("on")){
			$(evel).removeClass("on");
			if($(evel).parents("table").find(".on").length<1){
				$(evel).parents("table").removeClass("on");		
			}
		}else{
			$(evel).addClass("on");	
			$(evel).parents("table").addClass("on");	
		}
		var cs=getChangshu();
		if(cs>=2){
			$("#jc-cs").html("您选择了"+cs+"场比赛");
		}else{
			$("#jc-cs").html("至少选2场比赛");	
		}
	}
//最多可以设胆的数量
function maxDan(){
	var srr=[];
	var crr=$("#chuanguan").attr("data-chuan");
	if(!crr){
		return false;	
	}
	crr=crr.split(",");
	$.each(crr,function(i,val){
		var iit=val.charAt(1);	
		iit=parseInt(iit);
		srr.push(iit);
	});
	var len= Math.max.apply(Math,srr)-1;	
	return len;
}
//列出选择列表
function jcList(){
	$(".jc-table.on").each(function(index) {
		var cc=$(this).attr("data-cc");
		var sfc=$(this).find(".jc-table-b[data-wf=spf]").eq(0);
		var rf=$(this).find(".jc-table-b[data-wf=rf]").eq(0);
		if($("#id_"+cc).length<1){
			var html='<div class="jc-list-item" id="id_'+cc+'" data-cc="'+cc+'">'+
						'<div class="jc-list-item-close"></div>'+
						'<div class="jc-list-item-dan"></div>'+
						'<div class="jc-list-item-cot clearfix">'+
							'<div class="jc-list-item-ss">'+$(this).attr("data-des")+'</div>'+
							'<div class="spf jc-list-xxx" data-wf="spf">'+
								'<span class="jc-list-item-dw"></span><span class="jc-list-item-dw"></span><span class="jc-list-item-dw"></span>'+
							'</div>'+
							'<div class="cb"></div>'+
							'<div class="rf jc-list-xxx" data-wf="rf">'+
								'<span class="jc-list-item-dw"></span><span class="jc-list-item-dw"></span><span class="jc-list-item-dw"></span>'+
							'</div>'+
						'</div>'+
					'</div>';	
			$(".jc-list").eq(0).append(html);
		}else{
			var htmls='<div class="jc-list-item-ss">'+$(this).attr("data-des")+'</div>'+
							'<div class="spf jc-list-xxx" data-wf="spf">'+
								'<span class="jc-list-item-dw"></span><span class="jc-list-item-dw"></span><span class="jc-list-item-dw"></span>'+
							'</div>'+
							'<div class="cb"></div>'+
							'<div class="rf jc-list-xxx" data-wf="rf">'+
								'<span class="jc-list-item-dw"></span><span class="jc-list-item-dw"></span><span class="jc-list-item-dw"></span>'+
							'</div>';
			$("#id_"+cc).find(".jc-list-item-cot").eq(0).html(htmls);	
		}
	    if(sfc.find(".on").length>0){
			sfc.find(".on").each(function(aa){
				var datadit=$(this).attr("data-dit");
				$("#id_"+cc).find(".spf").eq(0).find(".jc-list-item-dw").eq(aa).addClass("on");
				$("#id_"+cc).find(".spf").eq(0).find(".jc-list-item-dw").eq(aa).html($(this).html());
				$("#id_"+cc).find(".spf").eq(0).find(".jc-list-item-dw").eq(aa).attr("data-dit",datadit);
			});
		}
		if(rf.find(".on").length>0){
			rf.find(".on").each(function(aa){
				var datadit=$(this).attr("data-dit");
				$("#id_"+cc).find(".rf").eq(0).find(".jc-list-item-dw").eq(aa).addClass("on");
				$("#id_"+cc).find(".rf").eq(0).find(".jc-list-item-dw").eq(aa).html($(this).html());
				$("#id_"+cc).find(".rf").eq(0).find(".jc-list-item-dw").eq(aa).attr("data-dit",datadit);
			});
		}
    });	
}
//更新选串信息
function chuanChange(){
	var changs=$(".jc-list-item-cot").length;
	if(changs>8){
		changs=8;	
	}
	if(changs>=2){
		chuanList();	
		var datachuan="r"+changs+"c1";	
		var htmlchuan=changs+"串1";
		$("#chuanguan").attr("data-chuan",datachuan);
		$("#chuanguan").html(htmlchuan);
		var thischuan=$("#xchuan").find(".chuan-item[data-chuan="+datachuan+"]");
		$("#xchuan").find(".chuan-item").removeClass("on");
		$("#xchuan").find(".chuan-item").removeAttr("data-class");
		thischuan.addClass("on");
		thischuan.attr("data-class","on");	
	}else{
		$("#chuanguan").html("过关方式");
		$("#chuanguan").removeAttr("data-chuan");
	}	
	var len=maxDan();
	if(changs<=len+1){		
		$(".jc-list-item-dan").addClass("no");	
		$(".jc-list-item-dan").removeClass("on");
	}else{
		$(".jc-list-item-dan").removeClass("no");		
	}
}
//列出对应的串关
function chuanList(){
	var arrT=typeArr();
	var n=$(".jc-list-item").length;
	$("#zy-chuan").html("");
	$("#duo-chuan").html("");
	$.each(arrT,function(i,item){
		if(item.charAt(1)<=n){
			var len=item.length;
			var chuanm=item.split(/[a-z]/);
			var chuanstr=chuanm[1]+"串"+chuanm[2];
			var chuanHtml='<span class="chuan-item" data-chuan="'+item+'" onClick="togOn(this)">'+chuanstr+'</span>';
			if(chuanm[2]=="1"){
				//自由过关
				$("#zy-chuan").append(chuanHtml);
			}else{
				//多串过关
				$("#duo-chuan").append(chuanHtml);	
			}
		}	
	});	
	
}
//获取选择的场数
function getChangshu(){
	var cs=$("table.on").length;
	return cs;
}
//显示第一步
function jcone(){
	$("#jc-two").hide();
	$("#jc-one").show();
	$(".jc-step2").hide();
	$(".jc-step1").show();	
}
//显示第二步
function jctwo(){
	$("#jc-one").hide();
	$("#jc-two").show();
	$(".jc-step1").hide();
	$(".jc-step2").show();	
}
//竞彩算注数
function jcSum(){
	var beishu=$("#beishu").val();
	beishu=parseInt(beishu);
	var sumzhu=0;
	var type=$("#chuanguan").attr("data-chuan");
	if(!type){
		$("#zhushu").html(0);
		$("#qianshu").html(0);
		return false;	
	}
	if($(".jc-list-item").length<2){
		$("#zhushu").html(0);
		$("#qianshu").html(0);
		return false;		
	}
	type=type.split(",");
	for(var j=0;j<type.length;j++){
		var chuan=type[j];
		var evzhu=0;
		var arr=[];
		var arrdan=[];
		var arrtuo=[];
		$(".jc-list-item").each(function() {
			var this_o=$(this);
			var ssm=[];
			var sarrdan=[];
			var sarrtuo=[];
			$(this).find(".jc-list-xxx").each(function(){
				var slen=$(this).find(".jc-list-item-dw.on").length;
				if(slen>0){
					ssm.push(slen);		
				}
				if(this_o.find(".jc-list-item-dan.on").length>0){
					var danlen=$(this).find(".jc-list-item-dw.on").length;
					sarrdan.push(danlen);	
				}else{
					var tuolen=$(this).find(".jc-list-item-dw.on").length;
					sarrtuo.push(tuolen);	
				}
			});
			if(ssm.length>0){
				arr.push(ssm);
			}
			if(sarrdan.length>0){
				arrdan.push(sarrdan);	
			}
			if(sarrtuo.length>0){
				arrtuo.push(sarrtuo);
			}
        });
		evzhu=hunSumAll(arrdan,arrtuo,arr,chuan);
		sumzhu+=evzhu;
	}
	$("#zhushu").html(sumzhu);
	$("#qianshu").html(sumzhu*2*beishu);	
}
