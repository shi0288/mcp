/*竞彩公用函数 
*sumZhu(arr,type)
*arr=[2,1,1,3,2,1,1,1];数组中的元素表示选择的场次所选择的场数
*sumZhu(arr,"r4c5");
*/
function hunSum(dan,tuo,arr,type){
	var m=type.charAt(1);
	var chaiArr=[];//场次数组
	var evlArr=[];
	var marr=[];
	var arr_C=mcnArr();
	var chuan=arr_C[type];	
	m=m-dan.length;
	if(tuo.length>m){
		var chaid=getZh(tuo,m);
		$.each(chaid,function(i,val){
			var arrchaid=chaid[i];
			var ccarr=[];
			$.each(arrchaid,function(key,itt){
				ccarr.push(tuo[itt]);
			});	
			ccarr=ccarr.concat(dan);
			chaiArr.push(ccarr);
		});	
	}else{
		for(var i=0;i<arr.length;i++){
			marr.push(i);
		}
		chaiArr.push(marr);
	}
	var allrr=[];
	$.each(chaiArr,function(i,val){
		$.each(chaiArr[i],function(key,res){
			allrr.push(arr[res]);
		});		
	});
	var i=allrr.length;
	var sttrr=""
	function arrl(allrr,k,str){
		if(k>=i){
			return false;
		}else{
			var a=arr[k];
			if(k==i-1){
				for(var l=0;l<a.length;l++){
					sttrr+=str+a[l]+"|";
				}
			}else{
				for(var l=0;l<a.length;l++){
					if(k==0){str=","};
					str+=a[l];
					var b=k+1;
					arrl(allrr,b,str);
				}
			}
		}
	}
	arrl(allrr,0,"");
	var chuangzz=sttrr.split("|");
	var allsum=0;
	for(var i=0;i<chuangzz.length-1;i++){
		var thisarr=chuangzz[i];//第一次拆分之后每个组合
		alert(thisarr.length);
		for(var j=0;j<chuan.length;j++){
			if(chuan.charAt(j)=="1"){
				var tarr=getZh(thisarr,j+1);
			
			}	
		}
	}
	//alert(sttrr);
	/*var allsum=0;	
	for(var i=0;i<chaiArr.length;i++){
		var thisarr=chaiArr[i];//第一次拆分之后每个组合
		for(var j=0;j<chuan.length;j++){
			if(chuan.charAt(j)=="1"){				
				var tarr=getZh(thisarr,j+1);
				allsum+=allSum(arr,tarr,thisarr);
			}	
		}
	}*/
	return allsum;
}
//非混投
function sumAll(dan,tuo,arr,type){
	if(dan.length<=0){
		var allsum=sumZhu(arr,type);
		return allsum;
		return false;
	}
	var m=type.charAt(1);
	var chaiArr=[];
	var evlArr=[];
	var marr=[];
	var arr_C=mcnArr();
	var chuan=arr_C[type];	
	m=m-dan.length;
	if(tuo.length>m){
		var chaid=getZh(tuo,m);
		$.each(chaid,function(i,val){
			var arrchaid=chaid[i];
			var ccarr=[];
			$.each(arrchaid,function(key,itt){
				ccarr.push(tuo[itt]);
			});	
			ccarr=ccarr.concat(dan);
			chaiArr.push(ccarr);
		});	
	}else{
		for(var i=0;i<arr.length;i++){
			marr.push(i);
		}
		chaiArr.push(marr);
	}
	var allsum=0;	
	for(var i=0;i<chaiArr.length;i++){
		var thisarr=chaiArr[i];//第一次拆分之后每个组合
		for(var j=0;j<chuan.length;j++){
			if(chuan.charAt(j)=="1"){				
				var tarr=getZh(thisarr,j+1);
				allsum+=allSum(arr,tarr,thisarr);
			}	
		}
	}
	return allsum;
}
//没有胆的情况算注数
function sumZhu(arr,type){
	var m=type.charAt(1);
	var chaiArr=[];
	var evlArr=[];
	var marr=[];
	var arr_C=mcnArr();
	var chuan=arr_C[type];	
	if(arr.length>m){
		chaiArr=getZh(arr,m);
	}else{
		for(var i=0;i<arr.length;i++){
			marr.push(i);
		}
		chaiArr.push(marr);
	}
	var allsum=0;	
	for(var i=0;i<chaiArr.length;i++){
		var thisarr=chaiArr[i];//第一次拆分之后每个组合
		for(var j=0;j<chuan.length;j++){
			if(chuan.charAt(j)=="1"){				
				var tarr=getZh(thisarr,j+1);
				allsum+=allSum(arr,tarr,thisarr);
			}	
		}
	}
	return allsum;
}
/*tarr每个组合第二次拆分之后返回的组合（二维数组）
  arr[第1场选项选中个数，第2场选项选中个数，第3场选项选中个数..]
  返回每个组合第二次拆分之后的注数；
*/
function allSum(arr,tarr,thisarr){
	var itemsum=0;
	for(var j=0;j<tarr.length;j++){
		itemsum+=elSum(arr,tarr[j],thisarr);		
	}
	return itemsum;		
}
/*arr[第1场选项选中个数，第2场选项选中个数，第3场选项选中个数..]
  karr[0,1,2...]获取一组组合对应karr中的下标
  返回一组组合中选择的注数；
*/
function elSum(arr,karr,thisarr){
	var elsum=1;
	for(var i=0;i<karr.length;i++){
		var index=karr[i];
		index=thisarr[index];
		elsum=elsum*arr[index];	
    }	
	return elsum;
}

//拆分数组，返回组合下标
function getZh(arr,m){
	var arr_zh=wzCom(arr,m);
	var arr_r=[];
	var charone=arr_zh[0];
	for(var j=0;j<arr_zh.length;j++){
		var arr_er=[];
		for(var i=0;i<charone.length;i++){
			if(arr_zh[j].charAt(i)=="1"){
				arr_er.push(i);
			}
		}
		arr_r.push(arr_er);
	}
	return arr_r;
}
//得出移位字符串
function wzCom(arr,m){
	var arr_b=[];
	var str=getWstr(arr,m);
	var reg=new RegExp("10");
	var cmn=$.base.comBination(arr.length,m);
	arr_b.push(str);
	var newstr=str;
	for(var i=1;i<cmn;i++){
		var index=newstr.indexOf("10");
		var sum=0;
		newstr=rpl(newstr);
		var left=newstr.substr(0,index);
		var left2="";
		var right=newstr.substr(index,arr.length-index);
		for(var j=0;j<index;j++){
			if(left.charAt(j)=="1"){
				sum+=1;
			}	
		}
		for(var k=0;k<index;k++){
			if(k<sum){
				left2+="1";	
			}else{
				left2+="0";	
			}
		}
		newstr=left2.concat(right);
		arr_b.push(newstr);
	}
	return arr_b;
}
//10换成01
function rpl(str){
	var reg=new RegExp("10");
	var strr=str.replace(reg,"01");
	return strr
}
//获取初始位置字符串arr需要组合的数组
function getWstr(arr,m){
	var str="";
	for(var i=0;i<arr.length;i++){
		if(i<m){
			str+="1";	
		}else{
			str+="0";	
		}
	}	
	return str;
}