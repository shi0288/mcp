jQuery.base = {   
	//C(n,m)=[n*(n-1)*(n-2)*(n-m+1)]/m! 每注有m个红球，选了n个红球
	comBination:function(n,m) {          
		var ia=n;
		var ib=m;
		for(var i=1;i<m;i++){
			ia=ia*(n-i);
			ib=ib*(m-i);	
		}       
		var result=ia/ib;
		return result;
	},  
	//A(n,m)=n*(n-1)*(n-2)*(n-m+1) 每注有m个红球，选了n个红球
	Arrangement:function(n,m) {          
		var ia=n;
		for(var i=1;i<m;i++){
			ia=ia*(n-i);	
		}       
		var result=ia;
		return result;
	},
	//机选，返回json格式;ired从多少个红球中选，每注有多少个红球,n机选多少注
	randChoose:function(ired,ered,iblue,eblue,n){
		var result={};
		var ared=[];
		var ablue=[];
		for(var i=1;i<=ired;i++){
			ared.push(i);	
		}
		if(iblue){
			for(var i=1;i<=iblue;i++){
				ablue.push(i);	
			}	
		}
		for(var i=0;i<n;i++){
			var bred=ared;
			var bblue=ablue;
			var inn=i;
			var oball={};
			var sred=[];
			var sblue=[];
			for(var j=0;j<ered;j++){
				var redball=Math.random()*100;
				redball=parseInt(redball)%bred.length;
				var redballval=bred[redball];
				sred.push(redballval);
				bred.splice(redball,1);
			}
			for(var k=0;k<eblue;k++){
				var blueball=Math.random()*100;
				blueball=parseInt(blueball)%bblue.length;
				var blueballval=bblue[blueball];
				sblue.push(blueballval);
				bblue.splice(blueball,1);
			}
			oball['red']=sred.join(',');
			oball['blue']=sblue.join(',');
			result[i]=oball;	
		}
		return result;
	},  
	
	//判断JSON中是否存在某个值，存在返回true，不存在返回false    
    inJson:function(value,obj){
		var result=false;
		for(i in obj){
			if(obj[i]==value){
				result=true;
			}	
		}
		return result;
	},
	//过滤html标签
	noHtml:function(str) {
            str = str.replace(/<\/?[^>]*>/g,''); //去除HTML tag
            str = str.replace(/[ | ]*\n/g,'\n'); //去除行尾空白
            //str = str.replace(/\n[\s| | ]*\r/g,'\n'); //去除多余空行
            str=str.replace(/ /ig,'');//去掉 
            return str;
    }   
		  	  
};  

