var id = GetQueryString("id");
var chapterId = GetQueryString("chapterId");
var length = 0;
var xsStyle = "";
if(!localStorage.getItem("xsStyle")){
	xsStyle = {
		fontSize: "0.4rem",
		backgroundColor: "initial"
	}
}else{
	xsStyle = JSON.parse(localStorage.getItem("xsStyle"));
}
console.log(xsStyle)
//$(".wrap").css("background-color",xsStyle.backgroundColor);
//setTimeout(function(){
//	$(".p3_box p").css("font-size",xsStyle.fontSize);
//},100)

//检查是否签到
ajax({
	type:"post",
	url: REST_PRRFIX + "/api/index/sign/get.json",
	data:{userId: userId},
	dataType:"json",
	success:function(data){
		if(data.code == 0){
			console.log(data)
			//未签到
			ajax({
				type:"post",
				url: REST_PRRFIX + "/api/index/sign.json",
				data:{userId: userId},
				dataType:"json",
				success:function(data){
					console.log(data)
					showToast("签到成功，赠送30书币")
				}
			})
			
		}
	}
})

console.log(URL_PREFIX)
//拿阅读内容
ajax({
	type: 'POST',
	url: REST_PRRFIX + '/api/index/chapter/context.json',
	data:{userId: userId||" ", bookId: id, chapterId: chapterId},
	dataType:"json",
	success:function(data){
		//code 888跳转充值
		if(data.code == 888){
			location.href = "../recharge/index.html"
		}
		
		
		console.log(data)
		$("title").text(data.data.chapter.chapterName)
		$(".part1").text("第"+data.data.chapter.chapterId+"章："+data.data.chapter.chapterName)
		$(".p3_box").html(data.data.chapter.context)
		setStyle();//清除多余样式
		//设置本地样式
		$(".wrap").css("background-color",xsStyle.backgroundColor);
		$(".p3_box p").css("font-size",xsStyle.fontSize);
		
		length = data.data.maxChapterId;
		
		$(".p2_img").attr("src", URL_PREFIX+data.data.img);//小说封面
		$(".p2_name").text(data.data.title);//小说名
		
		if(chapterId == 1){
			$(".p4_prev").addClass("hidden");
		}else if(chapterId == length){
			$(".p4_next").addClass("hidden");
		}
		console.log(URL_PREFIX + "/resources/uploadImg/bookShare/" + data.data.shareImg)
		wx.ready(function() {
			var shareUrl = location.href.split("#")[0]+"&url="+QRCodeId;
			var title = data.data.shareTitle||data.data.chapter.chapterName;
			var desc = data.data.shareContext||" ";
			
			console.log(shareUrl,shareUrl,title,desc)
			//朋友圈
			wx.onMenuShareTimeline({
				title: data.data.chapter.chapterName||data.data.shareTitle,
				link: shareUrl,
				imgUrl: URL_PREFIX + "/resources/uploadImg/bookShare/" + data.data.shareImg,
				type: 'link',
				success: function() {
					console.log("分享成功@")
					showToast("分享成功")
				},
				fail: function(res) {
					console.log("分享失败@")
				}
			});
			//分享给朋友
			wx.onMenuShareAppMessage({
				title: title,
				link: shareUrl,
				imgUrl: URL_PREFIX + "/resources/uploadImg/bookShare/" + data.data.shareImg,
				type: 'link',
				desc: desc,
				success: function() {
					console.log("分享成功@")
					showToast("分享成功")
				},
				fail: function(res) {
					console.log("分享失败@")
				}
			});
		
		})
		
	}
})

//上一章
$(".p4_prev").on("click", function(){
	location.href = 'detail.html?id='+id+"&chapterId="+(Number(chapterId)-1)+"&url="+GetQueryString("url")
})

//下一章
$(".p4_next").on("click", function(){
	location.href = 'detail.html?id='+id+"&chapterId="+(Number(chapterId)+1)+"&url="+GetQueryString("url")
})



//设置背景色
$(".p5_modal_background .p5_modal_b > div").on("touchend", function(){
  var color = $(this).attr("data-color");
  $(".wrap").css("background-color",color)
  xsStyle.backgroundColor = color;
  localStorage.setItem("xsStyle", JSON.stringify(xsStyle));
})

//设置字体大小
$(".p5_modal_fontSize .p5_modal_b > div").on("touchend", function(){
  var size = $(this).attr("data-size");
  $(".p3_box p").css("font-size",size)
  xsStyle.fontSize = size;
  localStorage.setItem("xsStyle", JSON.stringify(xsStyle));
})

//确定
$(".p5_modal_c").click(function(){
  $(".p5_modal > div").hide()
  $(".part5").hide()
})

//显示底部导航
$(".p4_nav").on("click", function(e){
  showNav()
  e.preventDefault();
})

//取消按钮
$(".p5_cancel").click(function(){
  hideNav()
})

//显示设置字体大小
$(".show_fontsize").click(function(){
  $(".p5_modal").hide();
  $(".p5_box").slideUp(100,function(){
    setTimeout(function(){
      showFontsize()
    },0)
  });
  
})

//显示设置背景色
$(".show_background").click(function(){
  $(".p5_modal").hide();
  $(".p5_box").slideUp(100,function(){
    setTimeout(function(){
      showBackground()
    },0)
  });
})

//添加书签
$(".btn_addMark").click(function(){
	var data = {
		userId:userId,
		bookId: id,
		chapterId: chapterId,
		context: ""
	}
	ajax({
		type:"post",
		url: REST_PRRFIX + "/api/index/bookmark/set.json",
		data:data,
		dataType:"json",
		success:function(data){
			console.log(data)
			showToast("添加成功")
			$(".p5_box").slideUp(100,function(){
			  hideNav()
			});
		}
	})
	
	
	
  
})

//返回目录
$(".go_catalog").click(function(){
  location.href = "catalog.html"+location.search
})

//返回首页
$(".go_home").click(function(){
  location.href = "../home/index.html"
})

function showBackground(){
  $(".part5").show();//大盒子
  $(".p5_box").hide();//底部导航
  $(".p5_modal").show();//弹框
  $(".p5_modal_fontSize").hide();//文字
  $(".p5_modal_background").show();//背景色
}

function showFontsize(){
  $(".part5").show();//大盒子
  $(".p5_box").hide();//底部导航
  $(".p5_modal").show();//弹框
  $(".p5_modal_fontSize").show();//文字
  $(".p5_modal_background").hide();//背景色
}

function showNav(){
  $(".part5").show();
  $(".p5_modal").hide();
  $(".p5_box").slideDown(100);
}

function hideNav(){
  $(".p5_box").slideUp(100);
  $(".part5").fadeOut(100);
}

//设置文本样式
function setStyle(){
	$(".p3_box > p").attr("style","")
}
