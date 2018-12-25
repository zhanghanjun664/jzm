var id = GetQueryString("id");
var length = 0;
ajax({
	type: "POST",
	url: REST_PRRFIX + '/api/index/chapter.json',
	data:{bookId: id},
	dataType: 'json',
	success:function(data){
		console.log(data)
		$(".part2").text(data.data.books.title);//标题
		
		//目录
		length = data.data.list.length;
		var html = "";
		data.data.list.forEach(function(item,index){
			var className = "";
			if(item.chapterStatus == 2){
				className = "hidden";
			}else{
				className = item.chapterPrice > 0 ? "show": "hidden"
			}
			html += '<li data-chapterId='+item.chapterId+'>第'+item.chapterId+'章 '+item.chapterName+'<span class='+className+'><span class="iconfont icon-zuanshi"></span> '+item.chapterPrice+'</span></li>'

		})
		$(".p3_box").append(html)
		
	}
})

//跳转
$(".p3_box").on("click", "li", function(){
	var chapterId = $(this).attr("data-chapterId");
	location.href = "detail.html?id="+id+"&chapterId="+chapterId
})