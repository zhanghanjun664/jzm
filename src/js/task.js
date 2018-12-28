
var beanList = [
  {
    "auditFinishTime": "12-18",
    "userNickName": "kobe",
    money: '19.90'
  },
  {
    "auditFinishTime": "12-19",
    "userNickName": "zhj",
    money: '26.90'
  },
  {
    "auditFinishTime": "12-18",
    "userNickName": "kobe",
    money: '19.90'
  },
  {
    "auditFinishTime": "12-19",
    "userNickName": "zhj",
    money: '26.90'
  },
  {
    "auditFinishTime": "12-18",
    "userNickName": "kobe",
    money: '19.90'
  },
  {
    "auditFinishTime": "12-19",
    "userNickName": "zhj",
    money: '26.90'
  },
  {
    "auditFinishTime": "12-18",
    "userNickName": "kobe",
    money: '19.90'
  },
  {
    "auditFinishTime": "12-19",
    "userNickName": "zhj",
    money: '26.90'
  },
]

// 获取列表模板
function getHmpl(type, dataSource) {
  var html = '', getTmpl = ''
  switch (type) {
    case 'compTask':
      getTmpl = function (data) {
        return (
          '<div class="swiper-slide">' +
          '<img src="../img/money.png" >' +
          '<div class="info">' +
          ' <div>' + data.userNickName + '</div>' +
          ' <div>' +
          '<span class="didiao">任务报酬</span>' +
          '<span class="num">' + data.money + '元</span>' +
          '</div>' +
          '</div>' +
          '<div class="didiao">' + data.auditFinishTime + '</div>' +
          '</div>'
        )
      }
  }



  for (var i = 0; i < dataSource.length; i++) {
    html += getTmpl(dataSource[i])
  }
  return html

}


// 初始化完成任务轮播
function initCompTaskList() {
  var length = $('.swiper-slide').length
  // length = 12
  console.log('length=>', length)
  new Swiper('.swiper-container', {
    autoplay: false,//可选选项，自动滑动
    speed: 100,
    direction: 'vertical',
    slidesPerView: length,
    height: 50 * length,
    loop: true,
    // allowTouchMove: false,
    // simulateTouch: false,
  })

}

getCompTask()
function getCompTask() {
  // 获取数据

  // 获取模板
  var tmpl = getHmpl('compTask', beanList)
  $('.swiper-wrapper').append(tmpl)

  // 初始化轮播
  initCompTaskList()


}


// 开始任务
$('.btn').click(function () {
  $.confirm({
    title: '提示',
    text: '确定开始该任务？请在2小时内完成。',
    onOK: function () {
      //点击确认
      // 提交完跳转
      location.href = 'taskStep.html'
    },
    onCancel: function () {
    }
  })
})