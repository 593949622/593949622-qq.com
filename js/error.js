$(document).ready(function() {
	var Request = new Object();
	Request = GetRequest();
	if(Request["type"]=="-1"){
		$("#error").html("页面出错了(-1-p1)");
	}else if(Request["type"]=="-2"){
		$("#error").html("页面出错了 (-2-p1)");
	}else if(Request["type"]=="-3"){
		$("#error").html("页面出错了 (-3-p1)");
	}else if(Request["type"]=="-4"){
		$("#error").html("页面出错了 (-4-p1)");
	}else if(Request["type"]=="-5"){
		$("#error").html("页面出错了 (-5-p1)");
	}else if(Request["type"]=="-6"){
		$("#error").html("页面出错了 (-6-p1)");
	}

});
function GetRequest() {
	var url = location.search;

	var theRequest = new Object();

	if (url.indexOf("?") != -1) {

		var str = url.substr(1);

		strs = str.split("&");

		for(var i = 0; i < strs.length; i ++) {

			theRequest[strs[i].split("=")[0]]=unescape(strs[i].split("=")[1]);
		}
	}
	return theRequest;
}