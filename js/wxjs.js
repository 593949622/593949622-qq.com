$(function(){
	weixin();
});
function weixin(){
	$.ajax({
		type : "POST",
		url : "checkuser",
		data:"url="+escape(window.location.href),
		success : function(data) {
			var json=JSON.parse(data);
			var appId=json.appId
			var timestamp=json.timestamp
			var nonceStr=json.nonceStr
			var signature=json.signature
			wx.config({
				debug: true,
				appId: appId,
				timestamp: timestamp,
				nonceStr: nonceStr,
				signature: signature,
				jsApiList: [
				            'checkJsApi',
				            'onMenuShareTimeline',
				            'onMenuShareAppMessage',
				            'onMenuShareQQ',
				            'onMenuShareWeibo',
				            'hideMenuItems',
				            'showMenuItems',
				            'addCard',
				            'openCard',
				            'hideOptionMenu'
				            ]
			});

		},
		error : function(XMLHttpRequest, textStatus, thrownError) {
			parent.document.location.href = "error.html"; 
			parent.tb_remove();
		}
	});
}
wx.ready(function () {
	//禁用分享
	wx.hideOptionMenu();
});

wx.error(function (res) {
});