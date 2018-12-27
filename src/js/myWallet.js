// $('#tab1').infinite(50);
var distance = 50;
var loading = {
  income: false,
  output: false
};  //状态标记
// $('#tab1').infinite().on("infinite", function() {
//   if(loading) return;
//   loading = true;
//   $('.weui-loadmore').show()
//   setTimeout(function() {
//     $('.weui-loadmore').hide()
//     $(".shouru_box").append("<li> 我是新加载的内容 </li>");
//     loading = false;
//   }, 500);   //模拟延迟
// });
var income = {
  loading: false,
  pageNum: 1,
  pageSize: 20,
}

var output = {
  loading: false,
  pageNum: 1,
  pageSize: 20,
}

// 收入明细
$('#tab1').on('scroll', function (e) {
  var scrollTop = e.target.scrollTop, //滚动高度
    totalHeight = e.target.scrollHeight, //总高度
    screenHeight = $('#tab1').height() //窗口高度
  if (!income.loading && (totalHeight <= (scrollTop + screenHeight + distance))) {
    console.log('加载数据')
    income.loading = true;
    $('.weui-loadmore').show()
    setTimeout(function () {
      income.loading = false;
      $('.weui-loadmore').hide()
      $(".shouru_box").append("<li> 我是新加载的内容 </li>");
    },1000)
  }

})

// 支出明细
$('#tab2').on('scroll', function (e) {
  var scrollTop = e.target.scrollTop, //滚动高度
    totalHeight = e.target.scrollHeight, //总高度
    screenHeight = $('#tab2').height() //窗口高度
  if (!income.loading && (totalHeight <= (scrollTop + screenHeight + distance))) {
    console.log('加载数据')
    income.loading = true;
    $('.weui-loadmore').show()
    setTimeout(function () {
      income.loading = false;
      $('.weui-loadmore').hide()
      $(".shouru_box").append("<li> 我是新加载的内容 </li>");
    },1000)
  }

})