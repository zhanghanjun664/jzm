// 顶部导航
// 返回
$('.back').click(function(){
  history.back()
})
// 我的任务
$('.myTask').click(function(){
  // location.href = ''
})


// 分类，排序
$('.loc_box').on('click', '.slt',function(){
  setActive($(this))

  var index = $(this).index()
  showOptions(index)
})

// 分类，排序click
$('.fenlei,.paixu').on('click', 'li', function(){
  var type = $(this).prop('type')
  var parentType = $(this).parent().prop('type')
  var parentIndex = $(this).parent().index()
  var txt = $(this).find('span').text()

  $('.loc_box .slt_txt').eq(parentIndex).text(txt)
  
  setActive($(this))
  hideOptions()
  
})

// 蒙层click
$('.m-loc_fixed').click(function(){
  hideOptions()
})

// 设置选中
function setActive(el){
  el.addClass('active').siblings().removeClass('active')
}

// 显示选项
function showOptions(index){
  $('.m-loc_fixed').show()
  setActive($('.f-cb').eq(index))
}

// 显示选项
function hideOptions(){
  $('.m-loc_fixed').hide()
  $('.f-cb,.slt').removeClass('active')
  // setActive($('.f-cb').eq(index))
  
}


$(document.body).infinite(100);
var loading = false;  //状态标记
$(document.body).infinite().on("infinite", function() {
  if(loading) return;
  loading = true;
  $('.weui-loadmore').show()
  setTimeout(function() {
    $('.weui-loadmore').hide()
    $(".m-list").append("<li> 我是新加载的内容 </li>");
    loading = false;
  }, 500);   //模拟延迟
});