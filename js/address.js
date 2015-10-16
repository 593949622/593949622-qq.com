$(function(){
	//获取区域
	getarea();
	//设置选中值
	//$("select#city").val(1);
	//用户选择市区时添加
	$("#city").change(function(){
		var cityid=$("#city").val();
		$("#cityif").empty();
		if(cityid==0){
			$('#cityif').attr("disabled",true);
			$("#cityinfo").val("");
			$("#cityif").append( "<option value=0>请选择市</option>" );
		}else{
			$('#cityif').attr("disabled",false);
			var json=JSON.parse(datainfo);
			var citylist=json.area;
			for(var i=0;i<citylist.length;i++){
				if(cityid==citylist[i].id){
					var cityif = citylist[i].nodes;
					$("#cityif").empty();
					for(var n=0;n<citylist[i].nodes.length;n++){
						$("#cityif").append( "<option value="+cityif[n].id+">"+cityif[n].n+"</option>" );
					}
				}
			}
			var city = $("#city option:selected").text();
			var cityif = $("#cityif option:selected").text();
			$("#cityinfo").val("").focus().val(city+"-"+cityif+"-");
		}
	});
	//当用户选择区后
	$("#cityif").change(function(){
		var city = $("#city option:selected").text();
		var cityif = $("#cityif option:selected").text(); 
		$("#cityinfo").val("").focus().val(city+"-"+cityif+"-");
	});
	//点击提交按钮后
	$("#submit").click(function(){
		if(checkaddress()&&checkuser()&&checkphone()){
			submit();
		}else{
			parent.document.location.href = "#top";
		}
	});
});
var datainfo = "";
function getarea(){
	$.ajax({
		type : "POST",
		url : "getArea",
		async: true,//false同步true异步 默认true   
		success : function(data) {
			datainfo=data;
			var json=JSON.parse(data);
			var citylist=json.area;
			for(var i=0;i<citylist.length;i++){
				$("#city").append( "<option value="+citylist[i].id+">"+citylist[i].n+"</option>" );
			}
		},
		error : function(XMLHttpRequest, textStatus, thrownError) {
			window.location.href = "error.html?type=-2"; 
		}
	});
}
function submit(){
	var info =$("#cityinfo").val();
	var name =$("#username").val();
	var phone=$("#phone").val();
	$.ajax({
		type : "POST",
		url : "getPX1",
		data : {username:name,userphone:phone,cityinfo:info},
		async: true,//false同步true异步 默认true
		beforeSend:function(){ 
             $.blockUI({ message: '<img src="images/loadinganime.gif" style="width: 80px;height: 80px;background:#000;opacity:0.5;border-radius:5px;" />' });  
         },  
         complete: function() {  
             $.unblockUI();   
         } ,  
		success : function(data) {
			if(data==""){
				alert("创建订单失败，请重试");
			}else{
				var json=JSON.parse(data);
				if(json.result==0){
					window.location.href = json.url; 
				}else if(json.result==-19){
					alert("重复订单");
				}else{
					alert("创建订单失败，请重试");
				}
			}
			
		},
		error : function(XMLHttpRequest, textStatus, thrownError) {
			window.location.href = "error.html?type=-1"; 
		}
	});
}
function checkaddress(){
	var cityinfo=$("#cityinfo").val();
	var citylist=cityinfo.split("-");
	var cityid=$("#city").val();
	var cityif=$("#cityif").val();
	
	if(cityid==0){
		$("#msg").text("温馨提示：请选择省市！");
		showtip();
		return false;
	}
	if(cityif==0){
		$("#msg").text("温馨提示：请选择省市！");
		showtip();
		return false;
	}
	if(cityinfo==""){
		$("#msg").text("温馨提示：详细地址不能为空！");
		showtip();
		return false;
	}
	if(citylist[2]==""){
		$("#msg").text("温馨提示：详细地址不能为空！");
		showtip();
		return false;
	}
		return true;	
};
function checkuser(){
	var username=$("#username").val();
	if(username==""){
		$("#msg").text("温馨提示：姓名不能为空！");
		showtip();
		return false;
	}
	if(username.length<2){
		$("#msg").text("温馨提示：姓名不正确！");
		showtip();
		return false;
	}
	if(!/^[\u4e00-\u9fa5]+$/gi.test(username)){
		$("#msg").text("温馨提示：姓名必须为中文！");
		showtip();
		return false;
	}
		return true;	
};
function checkphone(){
	var mobile=$("#phone").val();
	if(mobile==""){
		$("#msg").text("温馨提示：手机号码不能为空！");
		showtip();
		return false;
	}
	if(isNaN(mobile)||(mobile.length!=11)){
		$("#msg").text("温馨提示：手机号码长度为11位数字！");
		showtip();
		return false;
	}
	var reg=/^[1][3,4,5,7,8][0-9]{9}$/;
	if(!reg.test(mobile)){
		$("#msg").text("温馨提示：手机号码格式不正确！");
		showtip();
		return false;
	}
		return true;	
};
function checkidCard(){
	var idCard=$("#idCard").val();
	var isCheck=checkIdcard(idCard);
	return isCheck;
};

function hide(){
	$("#inform_bar").hide();
}
function showtip(){
	$("#inform_bar").show();
	setTimeout("hide()",3000); 
}