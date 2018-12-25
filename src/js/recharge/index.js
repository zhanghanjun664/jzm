var demo = $(".p3_item").clone();
$(".p3_item").remove();

//充值列表
ajax({
	type:"POST",
	url: REST_PRRFIX + "/weChatWeb/getProdType.json",
	dataType:'json',
	success:function(data){
		console.log(data)
		if(data.data.length){
			data.data.forEach(function(item){
				var demos = demo.clone();
				demos.attr("data-id", item.id)
				demos.find(".p3_box_a").text(item.pdName)
				demos.find(".p3_box_b").text(item.ppa)
				demos.find(".p3_box_c").text(item.ppb)
				$(".p3_box").append(demos)
			})
		}
	}
})

$(".p3_box").on("touchstart", ".p3_item", function(){
	var price = $(this).attr("data-id");
	$(this).addClass("active").siblings().removeClass("active");
	console.log(price)
})

//充值
$(".btn_recharge").on("click", function(){
	var id = $(".p3_box > .active").attr("data-id");
	ajax({
		type:"POST",
		url: REST_PRRFIX + "/api/weChat/pay/order.json",
		dataType:'json',
		data:{userId:userId, productId: id, openId: payopenid},
		success:function(data){
			console.log(data)
			console.log("==")
			//微信支付
			function onBridgeReady(){
				console.log("onBridgeReady")
			   WeixinJSBridge.invoke(
			       'getBrandWCPayRequest', {
			           "appId":data.data.appId,     //公众号名称，由商户传入     
			           "timeStamp":data.data.timeStamp,         //时间戳，自1970年以来的秒数     
			           "nonceStr":data.data.nonceStr, //随机串     
			           "package":data.data.package,     
			           "signType":data.data.signType,         //微信签名方式：     
			           "paySign":data.data.paySign //微信签名 
			       },
			       function(res){     
			           if(res.err_msg == "get_brand_wcpay_request:ok" ) {
			           	console.log("支付成功")
			           	getUserInfo()
			           }     // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。
			           console.log("支付完成")
			       }
			   ); 
			}
			if (typeof WeixinJSBridge == "undefined"){
			   if( document.addEventListener ){
			       document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
			   }else if (document.attachEvent){
			       document.attachEvent('WeixinJSBridgeReady', onBridgeReady); 
			       document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
			   }
			}else{
			   onBridgeReady();
			}
		}
	})
})
