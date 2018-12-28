//var REST_PRRFIX = "/rest";
//var REST_PRRFIX = "http://dev.fa.weiduanxian.com/xsManage";
//156服务器
//var REST_PRRFIX = location.hostname == "dev.fa.weiduanxian.com" ? "http://dev.fa.weiduanxian.com/xsManage" : "/rest"

var REST_PRRFIX = location.hostname == "www.czoxx.com" ? "http://www.czoxx.com/xsManage" : "/rest"
console.log(REST_PRRFIX)

var userId = GetQueryString("openid")||localStorage.getItem("xsUserId");
//图片路径
//var URL_PREFIX = "http://dev.fa.weiduanxian.com/xsManage";
var URL_PREFIX = REST_PRRFIX


if(!userId){
	console.log("无openid")
}else{
	localStorage.setItem("xsUserId",userId)
}

//var userId = "oFUUyv1nGcx48vKkZxy4NrLG4DR8";

var QRCodeId = "";
//获取用户信息
// getUserInfo()
function getUserInfo(){
	ajax({
		type:"post",
		url: REST_PRRFIX + "/weChatWeb/getWxUserInfo.json",
		data:{openId:userId},
		dataType:"json",
		success:function(data){
			console.log(data)
			if(data.data){
				//二维码id
				QRCodeId = data.data.c;
				
				$(".p1_personalInfo > .p1_a > img").attr("src", data.data.image)
				$(".p1_personalInfo > .p1_a > span").text(data.data.nickName)
				$(".pi_balance").text(data.data.balance)
				$(".pi_nickName").text(data.data.nickName)
				$(".pi_img").attr("src", data.data.image)
				$(".pi_id").text(data.data.code)
				localStorage.setItem("xsUserId",data.data.openId)
				
				//年费会员
				if(data.data.vipEndTime){
					var day = parseInt((data.data.vipEndTime - new Date().getTime())/(1000*60*60*24));
					if(day <= 0){
						return
					}
					$(".noYearVip").hide();//书币隐藏
					$(".yearVip").show();//年费出现
					
					$(".yearVip > .p2_deadline").text(formatDate(data.data.vipEndTime,2))
					$(".yearVip > .expDate").text(day)
					
				}
				
			}
		}
	})

}



//toast
function showToast(value) {
  var html = '<div class="toast">' +
    '<div class="toast_value">' + value + '</div>' +
    '</div>'
  $("body").append(html)
  $(".toast").fadeIn(300);
  setTimeout(function() {
    $(".toast").fadeOut(300, function() {
      $(this).remove()
    });
  }, 1500)
}

//提示框
function showModal(config) {
  var title = config.title ? config.title : "提示";
  var html =
    '<div class="modal_container">' +
    '<div class="modal_box">' +
    '<div>' +
    '<p class="modal_title">' + title + '</p>' +
    '<p class="modal_content">' + config.content + '</p>' +
    '</div>' +
    '<div class="modal_footer">' +
    '<div class="modal_cancel">取消</div>' +
    '<div class="modal_submit">确认</div>' +
    '</div>' +
    '</div>' +
    '</div>'
  $("body").append(html)
  $(".modal_container").fadeIn(300);
  if(config.type == 1) {
    $(".modal_cancel").hide();
    $(".modal_title").hide();
//    $(".modal_submit").text("知道了")
    
  }else{
    $(".modal_cancel").on("click", function(){
      $(".modal_container").fadeOut(300, function(){

        $(this).remove()
      });
    })
  }

  $(".modal_submit").on("click", function(){
    config.success()
    $(".modal_container").fadeOut(300, function() {
      $(this).remove()
    });
  })

}

//header
if($("#headNav").length){
  var html = '<div class="headNav_left">'+
          '<img src="../../img/icon_home.png"/>'+
          '<span>首页</span>'+
        '</div>'+
        '<div class="hn_box">'+
          '<div class="go_stackRoom">书库</div>'+
          '<div class="go_search">搜索</div>'+
          '<div class="go_free">限免</div>'+
        '</div>'+
        '<div class="headNav_right">'+
          '<img src="../../img/icon_recharge_white.png"/>'+
          '<span>充值</span>'+
        '</div>'
  $("#headNav").append(html)
}
//首页
$("#headNav").on("touchend", ".headNav_left", function(){
  var a = location.href,b = a.match("/html/");
  var urls = a.slice(0, b.index) + "/html/home/index.html";
  location.href = urls;
})
//书库
$("#headNav").on("touchend", ".go_stackRoom", function(){
  var a = location.href,b = a.match("/html/");
  var urls = a.slice(0, b.index) + "/html/stackRoom/index.html";
  location.href = urls;
})
//搜索
$("#headNav").on("touchend", ".go_search", function(){
  var a = location.href,b = a.match("/html/");
  var urls = a.slice(0, b.index) + "/html/search/index.html";
  location.href = urls;
})
//限免
$("#headNav").on("touchend", ".go_free", function(){
  var a = location.href,b = a.match("/html/");
  var urls = a.slice(0, b.index) + "/html/free/index.html";
  location.href = urls;
})
//充值
$("#headNav").on("touchend", ".headNav_right", function(){
  var a = location.href,b = a.match("/html/");
  var urls = a.slice(0, b.index) + "/html/recharge/index.html";
  location.href = urls;
})



function ajax(config) {
	$.ajax({
		type: config.type,
		url: config.url,
		data: config.data,
		dataType: config.dataType,
		async: config.async,
		success: function(data) {
			//登录失效
			if(data.code == 1) {
				showToast(data.errMsg)
			} else if(data.code == 405) {
//				showToast("请先关注公众号")
				var id = GetQueryString("url");
				
				$.ajax({
					type:"post",
					url: REST_PRRFIX + "/api/index/qrcode/url.json",
					data:{id: Number(id)},
					dataType: "json",
					success: function(data){
						console.log(data)
						showQRCode(data.data.url);
					}
				})
				
				
			}else{
				config.success(data);
			}
		},
		error: function(data) {
			typeof config.error == 'function' ? config.error(data) : ""
		}
	});

}


//多余字数省略号
function showSize(str,num){
	return str.slice(0,num)+"..."
}

function GetQueryString(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg);
	if(r != null) return unescape(r[2]);
	return null;
}


//toast
function showToast(value) {
	var html = '<div class="toast">' +
		'<div class="toast_value">' + value + '</div>' +
		'</div>'
	$("body").append(html)
	$(".toast").fadeIn(300);
	setTimeout(function() {
		$(".toast").fadeOut(300, function() {
			$(this).remove()
		});
	}, 1500)
}

//时间转换
function formatDate(str,type){
	var sDate = new Date(str);
	var y = sDate.getFullYear();
	var m = sDate.getMonth()+1 < 10 ? "0"+(sDate.getMonth()+1) : sDate.getMonth()+1;
	var d = sDate.getDate() < 10 ? "0"+sDate.getDate() : sDate.getDate();
	var H = sDate.getHours() < 10 ? "0"+sDate.getHours() : sDate.getHours();
	var M = sDate.getMinutes() < 10 ? "0"+sDate.getMinutes() : sDate.getMinutes();
	var S = sDate.getSeconds() < 10 ? "0"+sDate.getSeconds() : sDate.getSeconds();
	var nTime = "";
	switch (String(type)){
		case "1":
			nTime = m+"月"+d+"日"
			break;
		case "2":
			nTime = y+"-"+m+"月"+d+"日"
			break;
		default:
			nTime = y+"-"+m+"-"+d+" "+H+":"+M+":"+S
			break;
	}
	console.log(sDate.getHours(),sDate.getMinutes(),sDate.getMonth())
	return nTime
}


// 定义全局资源
var TASK_ICON = {
  0: '../img/icon_other.png',
  1: '../img/icon_zhuce.png',
  2: '../img/icon_caiji.png',
  3: '../img/icon_xinyongka.png',

}

// 获取步骤icon
function getStepIcon(num){
  if(!num) return
  return '../img/icon_step'+ num +'.png'
}


// 图片预览所需
// 获取图片列表
function getImgListByClass(cls) {
  var imgList = []
  $(cls + ' img').each(function (index, item) {
    imgList.push(item.src)
  })
  return imgList
}
// 初始化图片预览组件
function initPreviewComp(items, index) {
  return $.photoBrowser({
    items: items,
    initIndex: index,
    onClose: function(){
      $('.weui-photo-browser-modal').remove()
    }
  });
}


// 设置选中
function setActive(el){
  el.addClass('active').siblings().removeClass('active')
}