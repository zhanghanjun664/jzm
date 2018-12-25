var params = {
	sexType:"1",//传空全部 0=通用 1=男 2=女
	bookTypeId:"",//传空全部 分类ID
	bookStatusEnd:"0",//传空全部 0=连载中 1=已完结 2=限时免费
  current:0,//0=第一页 默认 0
  pageSize:20//页展示数量 不传默认10
}

var demo = $(".p3_item").clone();//书库列表demo
$(".p3_item").remove()
//获取分类列表
ajax({
	type:"post",
	url: REST_PRRFIX + '/weChatWeb/getBookType.json',
	dataType:"json",
	success:function(data){
		console.log(data)
		var html = "";
		data.data.forEach(function(item){
			html += '<div data-bookTypeId='+item.id+'>'+item.typeName+'</div>'
		})
		
		$(".styles").append(html);
	}
})

getData()





var loading = false;//加载中
var noMore = false;//是否还有数据

function getData(){
	if(params.current == 0){
		//切换类型，或者首次
		$(".p3_box").html("")
		
	}else{
		//加载更多数据
		if(loading){return}
		
	}
	
	if(noMore) return
	
	loading = true;//加载中
	ajax({
		type:"post",
		url: REST_PRRFIX + '/api/index/classify.json',
		data:params,
		dataType:"json",
		success:function(data){
			console.log(data)
			loading = false;//加载完
			
			if(data.data.list.length){
				$(".noData").hide();
				data.data.list.forEach(function(item){
					var demos = demo.clone();
					demos.attr("data-id", item.id)
					demos.find(".p3_item_a img").attr("src",URL_PREFIX + item.coverUrl)
					demos.find(".p3_item_c").text(item.title)
					demos.find(".p3_item_d").text(showSize(item.context,55))
					$(".p3_box").append(demos)
				})
			}else{
				noMore = true;//没有数据了
				console.log("没有数据")
				//没有数据
				if(params.current == 0){
					$(".noData").show();
				}else{
					$(".noData").hide()
					
				}
			}
			
			
		}
	})
	
}


function clearParams(){
	params.current = 0;
	loading = false;//加载中
	noMore = false;
}

//下拉加载
$(document).on("scroll",function(e){
	var bH = $(document).height();//总高度
	var vH = $(window).height();//视口高度
	if($(document).scrollTop() + vH >= bH && !loading){
		console.log("更新数据")
//		currentPages++
		params.current++
		getData()
	}
	
})


//类型：男女
$(".sex > div").on("touchend", function(){
	var sexType = $(this).attr("data-sexType");
  $(this).addClass("active").siblings().removeClass("active");
  params.sexType = sexType;
  //清除参数
  clearParams()
  getData()
})

//分类
$(".styles").on("touchend", "div", function(){
	var bookTypeId = $(this).attr("data-bookTypeId");
  $(this).addClass("active").siblings().removeClass("active");
  console.log(bookTypeId)
  params.bookTypeId = bookTypeId;
  //清除参数
  clearParams()
  getData()
})

//更新
$(".status > div").on("touchend", function(){
	var bookStatusEnd = $(this).attr("data-bookStatusEnd");
  $(this).addClass("active").siblings().removeClass("active");
  params.bookStatusEnd = bookStatusEnd;
  //清除参数
  clearParams()
  getData()
})

$(".p3_box").on("click", "li", function(){
  var id = $(this).attr("data-id");
  location.href = "../common/cover.html?id="+id
})