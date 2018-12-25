var id = GetQueryString("id");
var length = 0;
ajax({
	type: "POST",
	url: REST_PRRFIX + '/api/index/chapter.json',
	data:{bookId: id},
	dataType: 'json',
	success:function(data){
		console.log(data)
		$(".part2_cover img").attr("src", URL_PREFIX+data.data.books.coverUrl);//封面图
		$(".part2_desc_a").text(data.data.books.title);//标题
		$(".part2_desc_b").text("字数："+data.data.books.wordNumber+" 字");//字数
		$(".p3_b").text(data.data.books.context);//简介
		
		//目录
		var html = "";
		data.data.list.forEach(function(item,index){
			if(index<4){
				var className = "";
				if(item.chapterStatus == 2){
					className = "hidden";
				}else{
					className = item.chapterPrice > 0 ? "show": "hidden"
				}
				html += '<li data-chapterId='+item.chapterId+'>第'+item.chapterId+'章 '+item.chapterName+'<span class='+className+'><span class="iconfont icon-zuanshi"></span> '+item.chapterPrice+'</span></li>'
			}
		})
		$(".part5_box").append(html)
		
		length = data.data.list.length
	}
})

//开始阅读
$(".go_detail").on("click", function(){
	if(!length){
		showToast("暂无章节")
		return
	}
	var chapterId = 1;
  location.href = "detail.html"+location.search+"&chapterId="+chapterId
})

//全部目录
$(".go_catalog").on("click", function(){
	if(!length){
		showToast("暂无章节")
		return
	}
  location.href = "catalog.html"+location.search
})

//章节进入
$(".part5_box").on("click", "li", function(){
	var chapterId = $(this).attr("data-chapterid");
	location.href = "detail.html"+location.search+"&chapterId="+chapterId
})
