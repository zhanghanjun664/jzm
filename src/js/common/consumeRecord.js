var data = {
	type:1,//1=消费历史 2=阅读历史 3=书签列表
	userId:userId,
	pageSize: 999
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
				if(item.type == 1){
	//				demos.attr({
	//					"data-id":item.bookId,
	//					"data-chapterId":item.chapterId
	//				})
					demos.find(".p3_item_name").text(item.title);//小说名
					demos.find(".p3_item_bName").text("第"+item.chapterId+"章 "+item.chapterName);//第几章 章名
					
				}else{
					demos.find(".p3_item_d").text("签到获得书币：")
				}
				demos.find(".p3_item_b").text("["+item.balance+"]");//消费金额
				demos.find(".p3_item_c").text(formatDate(item.dateCreate));//消费时间
				$(".p3_box").append(demos)
				
			})
		}else{
//			$(".p3_box").html("<div style=text-align:center>暂无数据</div>")
		}
	}
})

var demo = $(".p3_item").clone();
$(".p3_item").remove();