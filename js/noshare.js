$(function(){
	//禁用分享
	document.addEventListener('WeixinJSBridgeReady', function onBridgeReady() {
		WeixinJSBridge.call('hideOptionMenu');
	});
});