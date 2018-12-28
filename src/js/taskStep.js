// 全局备注：
// 只有type是 2(输入文本) 跟 3(上传图片)才是必填




// $('.next').removeAttr('disabled')
var pb2 = $.photoBrowser({
  items: [
    {
      image: "http://img.jianzhimao.com/miaotask/comp/6259790/b3b53c5acc13dcba8d52fd24a7ab07e1.jpg",
      caption: "描述文案"
    },
    {
      image: "http://img.jianzhimao.com/miaotask/comp/6259790/659f7447a2f97ad0ef7decf72afeb14e.jpg",
      caption: "描述文案"
    },
    {
      image: "./images/swiper-3.jpg",
      caption: "描述文案"
    }
  ]
});

// 提交参数
var params = []
// 通过情况,获取数据后初始化
var passRecord = {
  step1: false,
  step2: false,
  step3: false,
  step4: false,
}
// 需要绑定事件的步骤
var eventList = [{ type: 2, num: 3 }, { type: 3, num: 4 }]


// 预览图片
$('.previewBox').on('click', 'li', function () {
  var items = getImgListByClass('.previewBox')
  var index = $(this).index()
  initPreviewComp(items, index).open()
})

// 打开快速切换步骤面板
$('.title').on('click', function () {
  $(this).toggleClass('active')
})

// 点击快速切换步骤
$('.stepList').on('click', 'li', function () {
  var stepNum = $(this).index() + 1
  console.log('stepNum=>', stepNum)
  setStepNum(stepNum)

  setActive($(this))


})


// 切换show hide
function toggleShow(el) {
  if (el.attr('style') === 'display: block;') {
    el.hide()
  } else {
    el.show()
  }
}

// 设置当前步数
function setStepNum(num) {
  $('.title').attr('step-num', num)
  toStep(num)
}
// 获取当前步数
function getStepNum() {
  return { cur: +$('.title').attr('step-num'), total: $('.stepList li').length }
}

// 跳转到某一步
function toStep(num) {
  var stepNum = getStepNum()
  var title = $('.stepList li').eq(stepNum.cur - 1).text()
  // 设置步骤名
  $('.stepName').text(title)

  // 初始化步骤内容
  initStepContent(num)

  // 到了最后一步
  if (stepNum.cur === stepNum.total) {
    $('.submit').show().siblings().hide()
  } else {
    $('.next').show().siblings().hide()
  }

}

// 初始化对应步骤内容
function initStepContent(num) {
  $('.step' + num).show().siblings().hide()
  judgeBtn(num)
}

// 按钮是否可点击
function judgeBtn(num) {
  var bol = $('.step' + num).attr('pass') !== 'true'
  setBtnDisabled(num, bol)

}

// 下一步
$('.next').click(function () {
  if ($(this).attr('disabled')) return
  var num = getStepNum().cur + 1
  setStepNum(num)
})

// 提交
$('.submit').click(function () {
  if ($(this).attr('disabled')) return
  console.log('提交任务')
})


// 获取数据完第一步
toStep(4)


//判断是否可以提交
function updatePassValue(step, value) {
  passRecord['step'+step] = value
  console.log(passRecord)
  
  setBtnDisabled(step, value)
  
}

// 设置按钮disabled
function setBtnDisabled(step, disabled){
  // 最后一步
  if(step === getStepNum().total){
    if(disabled){
      $('.submit').attr('disabled', 'true')
    }else{
      $('.submit').removeAttr('disabled')
    }
  }else{
    // 普通的下一步
    if(disabled){
      $('.next').attr('disabled', 'true')
    }else{
      $('.next').removeAttr('disabled')
    }

  }

}

initContentEvent()
// 初始化内容 事件
function initContentEvent() {
  eventList.forEach(function(item, index){
    // 输入文本。
    if(item.type == 2){
      $('.step' + item.num).on('input', 'textarea', function(e){
        var value = e.target.value
        // params[item.num]
        setParams(item.num, item.type, value)
        if(value){
          updatePassValue(item.num, false)
        }else{
          updatePassValue(item.num, true)
        }
      })
    }
    // 上传图片
    if(item.type == 3){

    }
  });

}

// 设置提交参数
function setParams(num, type, data){
  // 没有参数
  params[num] = {
    type,
    num,
    msg: data
  }

  if(type == 3){
    params[num].img = data
    delete params[num].msg
  }
  console.log(params)

}