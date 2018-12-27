var length = $('.swiper-slide').length
var mySwiper = new Swiper('.swiper-container', {
  autoplay: 500,//可选选项，自动滑动
  speed: 100,
  direction : 'vertical',
  slidesPerView: length,
  height: 50 * length,
  loop: true,
  allowTouchMove: false,
})