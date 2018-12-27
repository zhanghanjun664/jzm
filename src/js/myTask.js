// 任务列表
$('.m-list').on('click', 'li', function(){
  var id = $(this).attr('task-id')
  console.log(id)
  // 跳转任务详情
  // location.href = ''
})

// 删除
$('.m-list').on('click', 'li .btn', function(e){
  e.stopPropagation()
  var taskId = $(this).attr('task-id')
  console.log($(this))
  $.confirm({
    title: '标题',
    text: '点击了'+taskId,
    onOK: function () {
      //点击确认
      console.log('ok')
    },
    onCancel: function () {
      console.log('cancel')
    }
  });
})

//  余额
$('.balance').click(function(){
  console.log(1)
  location.href = 'myWallet.html'
})