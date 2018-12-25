//获取微信配置
ajax({
	type: "post",
	url: REST_PRRFIX + "/weChatWeb/getShareSign.json",
	data: {
		url: location.href
	},
	dataType: "json",
	success: function(data) {
		console.log(data)
		wx.config({
			debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
			appId: data.data.appid, // 必填，公众号的唯一标识
			timestamp: data.data.timestamp, // 必填，生成签名的时间戳
			nonceStr: data.data.nonceStr, // 必填，生成签名的随机串
			signature: data.data.signature, // 必填，签名，见附录1
			jsApiList: wxApiList // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
		});
	}
})

var wxApiList = ['onMenuShareTimeline', 'onMenuShareAppMessage'];

//wx.ready(function() {
//	share({
//		title: "分享标题2",
//		images: "http://dev.fa.weiduanxian.com/xsManage/resources/uploadImg/bookCover/20170913001405_047_48156627.jpg",
//		desc:"分享描述1",
//		shareLink: location.href,
//		success:function(){
//			console.log("分享成功@")
//			showToast("分享成功")
//		},
//		fail:function(){
//			console.log("分享失败@")
//		}
//	})
//
//})

//微信分享
var share = function(otherConfig) {
	//朋友圈
	wx.onMenuShareTimeline({
		title: otherConfig.title,
		link: otherConfig.shareLink,
		imgUrl: otherConfig.images,
		type: 'link',
		success: function() {
			otherConfig.success();
		},
		fail: function(res) {
			otherConfig.fail(res);
		}
	});
	//分享给朋友
	wx.onMenuShareAppMessage({
		title: otherConfig.title,
		link: otherConfig.shareLink,
		imgUrl: otherConfig.images,
		type: 'link',
		desc: otherConfig.desc,
		success: function() {
			otherConfig.success();
		},
		fail: function(res) {
			otherConfig.fail(res);
		}
	});
};