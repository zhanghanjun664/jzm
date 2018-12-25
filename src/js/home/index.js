//阅读历史
ajax({
	url: REST_PRRFIX + '/api/index/list/history.json',
	type:"POST",
	dataType:"json",
	data:{type:2, userId: userId,current:0, pageSize:1},
	success: function(data){
		console.log(data)
		if(data.data.list.length){
			$(".p2_history .p2_history_c").text(data.data.list[0].title)
			$(".p2_history").attr({
				"data-id": data.data.list[0].bookId,
				"data-chapterId": data.data.list[0].chapterId
			})
		}else{
				$(".p2_history").hide();
		}
	}
})

//首页接口
ajax({
	url: REST_PRRFIX + '/api/index/do.json',
	type:"POST",
	dataType:"json",
	success: function(data){
		console.log(data)
		var bannerArr = [],recommendArr = [],girlArr = [],girl2Arr = [],boyArr = [],boy2Arr = [];
		data.data.list.forEach(function(item){
			if(item.indexSpread == 1){
				bannerArr.push(item)
			}
			if(item.indexSpread == 2){
				recommendArr.push(item)
			}
			if(item.indexSpread == 3){
				girlArr.push(item)
			}
			if(item.indexSpread == 4){
				girl2Arr.push(item)
			}
			if(item.indexSpread == 5){
				boyArr.push(item)
			}
			if(item.indexSpread == 6){
				boy2Arr.push(item)
			}
			
		})
		console.log(bannerArr,recommendArr,girlArr,girl2Arr,boyArr,boy2Arr)
		bannerRender(bannerArr)
		recommendRender(recommendArr)
		girlRender(girlArr)
		girl2Render(girl2Arr)
		boyRender(boyArr)
		boy2Render(boy2Arr)
	}
})

var freeDemo = $(".p8_item").clone();
$(".p8_item").remove()
var countdown = 0;//倒计时

//限免接口
ajax({
	url: REST_PRRFIX + '/api/index/classify.json',
	type:"POST",
	dataType:"json",
	data:{bookTypeId:"",pageSize:6,sexType:"",bookStatusEnd:2,current:0},
	success: function(data){
		console.log(data)
		if(!data.data.list.length){
			$(".part8").hide();
		}else{
			countdown = data.data.list[0].freeTimeEnd
			setInterval(show, 1000)
			freeRender(data.data.list)			
		}
	}
})

//倒计时
function leftTimer(year, month, day, hour, minute, second) { 
  var leftTime = (new Date(year, month - 1, day, hour, minute, second)) - (new Date()); //计算剩余的毫秒数 
   
  var days = parseInt(leftTime / 1000 / 60 / 60 / 24, 10); //计算剩余的天数 
   
  var hours = parseInt(leftTime / 1000 / 60 / 60 % 24, 10); //计算剩余的小时 
   
  var minutes = parseInt(leftTime / 1000 / 60 % 60, 10); //计算剩余的分钟 
   
  var seconds = parseInt(leftTime / 1000 % 60, 10); //计算剩余的秒数 
   
  days = checkTime(days); 
  hours = checkTime(hours); 
  minutes = checkTime(minutes); 
  seconds = checkTime(seconds); 
//var timer = setInterval("leftTimer(2017,11,11,11,11,11)", 1000); 
}

function checkTime(i) { //将0-9的数字前面加上0，例1变为01 
   
  if(i < 10)  {  
    i = "0" + i; 
  } 
  return i;
}

function show() {
	console.log(111111)
	var currentDate = new Date();
	var EndTime = new Date(countdown);

	var days = EndTime - currentDate;
	EndTimeMsg = parseInt(days / 1000); //精确到秒
	
  var h = Math.floor(EndTimeMsg / 60 / 60);
  var m = Math.floor((EndTimeMsg - h * 60 * 60) / 60);
  var s = Math.floor((EndTimeMsg - h * 60 * 60 - m * 60));
  var str = checkTime(parseInt(h / 24))+" 天 "+checkTime(h%24)+" 时 "+checkTime(m)+" 分 "+checkTime(s)+" 秒"
  $(".countDown").text("还剩: "+str)
  EndTimeMsg--;
  if(EndTimeMsg <= 0) {
      $(".countDown").text("还剩: 00 天 00 时 00 分 00 秒")
  }
  console.log()
}




var bannerDemo = $(".swiper-slide").clone();
$(".swiper-slide").remove();
//banner
function bannerRender(data){
	data.forEach(function(item,index){
	  var demo = bannerDemo.clone();
	  demo.attr("data-id",item.id);
	  demo.find(".banner_a").attr("src",URL_PREFIX+item.coverUrl);
	  demo.find(".banner_c").text(item.title);
	  demo.find(".banner_d").text(showSize(item.context,50)) ;
	  $(".swiper-wrapper").append(demo)
	})
	
	
	new Swiper('#banner', {
	  autoplay: 4000,
	  speed: 600,
	  // 如果需要分页器
	  pagination: '.swiper-pagination',
	
	})
}
//主编力荐
function recommendRender(data){
	data.forEach(function(item,index){
		if(index<3){
			$(".p3_item").eq(index).attr("data-id", item.id);
			$(".p3_item").eq(index).find("img").attr("src",URL_PREFIX+item.coverUrl);
			$(".p3_item").eq(index).find("div").text(item.title);
		}else{
			$(".p3_list li").eq(index-3).text(item.title).attr("data-id", item.id);
		}
		
	})
}

//女1
function girlRender(data){
	data.forEach(function(item,index){
		if(index<1){
			$(".part4 .p4_box").attr("data-id", item.id);
			$(".part4 .p4_box_a img").attr("src", URL_PREFIX+item.coverUrl);
			$(".part4 .p4_box_c").text(item.title);
			$(".part4 .p4_box_d").text(showSize(item.context,55));
		}else{
			$(".part4 .p3_list li").eq(index-1).text(item.title).attr("data-id", item.id);
		}
		
	})
}

//女2
function girl2Render(data){
	data.forEach(function(item,index){
		if(index<1){
			$(".part5 .p4_box").attr("data-id", item.id);
			$(".part5 .p4_box_a img").attr("src", URL_PREFIX+item.coverUrl);
			$(".part5 .p4_box_c").text(item.title);
			$(".part5 .p4_box_d").text(showSize(item.context,55));
		}else{
			$(".part5 .p3_list li").eq(index-1).text(item.title).attr("data-id", item.id);
		}
		
	})
}

//男1
function boyRender(data){
	data.forEach(function(item,index){
		if(index<1){
			$(".part6 .p4_box").attr("data-id", item.id);
			$(".part6 .p4_box_a img").attr("src", URL_PREFIX+item.coverUrl);
			$(".part6 .p4_box_c").text(item.title);
			$(".part6 .p4_box_d").text(showSize(item.context,55));
		}else{
			$(".part6 .p3_list li").eq(index-1).text(item.title).attr("data-id", item.id);
		}
		
	})
}

//男2
function boy2Render(data){
	data.forEach(function(item,index){
		if(index<1){
			$(".part7 .p4_box").attr("data-id", item.id);
			$(".part7 .p4_box_a img").attr("src", URL_PREFIX+item.coverUrl);
			$(".part7 .p4_box_c").text(item.title);
			$(".part7 .p4_box_d").text(showSize(item.context,55));
		}else{
			$(".part7 .p3_list li").eq(index-1).text(item.title).attr("data-id", item.id);
		}
		
	})
}

//限免
function freeRender(data){
	data.forEach(function(item,index){
//		$(".p8_item").eq(index).attr("data-id", item.id)
//		$(".p8_item").eq(index).find(".p8_item_b").attr("src", URL_PREFIX+item.coverUrl)
//		$(".p8_item").eq(index).find(".p8_item_b").text(item.title)
		var demos = freeDemo.clone();
		demos.attr("data-id", item.id)
		demos.find(".p8_item_b").attr("src", URL_PREFIX+item.coverUrl)
		demos.find(".p8_item_d").text(item.title)
		$(".p8_box").append(demos)
	})
}










//banner跳转
$("#banner").on("click", ".swiper-slide", function(){
  var id = $(this).attr("data-id");
  location.href = "../common/cover.html?id="+id
})

//列表跳转
$(".p3_list li,.p4_box,.p3_item,.p8_item").on("click", function(){
	var id = $(this).attr("data-id");
  location.href = "../common/cover.html?id="+id
})

//阅读历史
$(".p2_history").on("click", function(){
	var id = $(this).attr("data-id"),
			chapterId = $(this).attr("data-chapterId");
	location.href = "../common/detail.html?id="+id+"&chapterId="+chapterId
})