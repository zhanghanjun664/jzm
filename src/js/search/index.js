var demo = $(".p3_item").clone();
$(".p3_item").remove();
//精彩推荐
ajax({
	type:"POST",
	url: REST_PRRFIX + "/api/index/highlights.json",
	dataType:'json',
	success:function(data){
		console.log(data)
		if(data.data.list.length){
			data.data.list.forEach(function(item){
				var demos = demo.clone();
				demos.attr("data-id", item.id)
				demos.find(".p3_item_a img").attr("src", URL_PREFIX+item.coverUrl)
				demos.find(".p3_item_c").text(item.title)
				demos.find(".p3_item_d").text(showSize(item.context, 55))
				$(".p3_box").append(demos)
			})
		}else{
			$(".part3").hide();
		}
	}
})

//热门搜索
ajax({
	type:"POST",
	url: REST_PRRFIX + "/api/index/hot/search.json",
	dataType:'json',
	success:function(data){
		console.log(data)
		if(data.data.list.length){
			var html = "";
			data.data.list.forEach(function(item){
				html += "<li data-id="+item.id+">"+item.title+"</li>"
			})
			$(".part2_1_box").html(html);
			
		}
	}
})

function loadData(str){
	ajax({
		type:"POST",
		url: REST_PRRFIX + "/api/index/search.json",
		data:{searchContext: str},
		dataType:'json',
		success:function(data){
			console.log(data)
			if(data.data.list.length){
				$(".part3").hide();//有记录，推荐就消失
				$(".part4 .p3_title").text('搜索"'+$(".p2_inp").val()+'"共'+data.data.list.length+'条结果')
				$(".part4 .p3_box").html("")
				data.data.list.forEach(function(item){
					var demos = demo.clone();
					demos.attr("data-id", item.id);
					demos.find(".p3_item_a img").attr("src",URL_PREFIX+item.coverUrl);
					demos.find(".p3_item_c").text(item.title);
					demos.find(".p3_item_d").text(showSize(item.context, 55));
					$(".part4 .p3_box").append(demos);
				})
			}else{
				$(".part3").show();
				$(".part4 .p3_title").text('搜索"'+$(".p2_inp").val()+'"共'+0+'条结果')
    		$(".part4 .p3_box").html("<li class='p3_item' style='text-align:center;'>查无数据，换个条件试试看吧</li>")
			}
		}
	})
}

//输入框
$(".p2_inp").on("input", function(){
  if($(this).val()){
    $(".p2_cancel").show()
  }else{
    $(".p2_cancel").hide()
  }
})

//取消输入
$(".p2_cancel").on("touchstart", function(){
  $(".p2_inp").val("")
  $(this).hide();
})

//热门搜索
$(".part2_1_box").on("touchstart", "li", function(){
  console.log("跳去目录页")
})

//跳转
$(".p3_box").on("click", "li", function(){
  var id = $(this).attr("data-id");
  location.href = "../common/cover.html?id="+id
})

//搜索
$(".p2_btn").on("touchstart", function(){
  console.log("请求数据")
  if($(".p2_inp").val().trim()){
  	loadData($(".p2_inp").val())
  	$(".part2_1").hide();//热门搜索消失
  	$(".part4").show();
  }else{
  	showToast("查询条件不能为空")
  }
  
  
  
})

//热门搜索
$(".part2_1_box").on("click", 'li', function(){
	var id = $(this).attr('data-id');
	location.href = "../common/catalog.html?id="+id
})