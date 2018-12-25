var data = {
	type:2,//1=消费历史 2=阅读历史 3=书签列表
	userId:userId,
	pageSize:999
}
ajax({
	type:"post",
	url: REST_PRRFIX + "/api/index/list/history.json",
	data:data,
	dataType: "json",
	success: function(data){
		console.log(data)
		if(data.data.list.length){
			data.data.list.forEach(function(item){
				var demos = demo.clone();
				demos.attr({
					"data-id":item.bookId,
					"data-chapterId":item.chapterId,
					"data-deleteId": item.id
				})
				demos.find(".p3_title").text(item.title);//小说名
				demos.find(".p3_num").text("第"+item.chapterId+"章 ");//第几章
				$(".part3_box").append(demos)
				
			})
		}
	}
})

var demo = $(".p3_item").clone();
$(".p3_item").remove();

//删除
$(".part3_box").on("click", ".p3_delete", function(){
	var id = $(this).parent().attr("data-deleteId");
	var data = {
		userId:userId,
		id: id,
		type:2
	}
	var $this = $(this);
	ajax({
		type:"post",
		url: REST_PRRFIX + "/api/index/del/history.json",
		data:data,
		dataType: "json",
		success: function(data){
			console.log(data);
			showToast("删除成功")
			$this.parent().remove()
		}
	})
	return false;
})

//跳到对应章节
$(".part3_box").on("click", "li", function(){
	var id = $(this).attr("data-id"),
			chapterId = $(this).attr("data-chapterId");
	location.href = "detail.html?&id="+id+"&chapterId="+chapterId
})