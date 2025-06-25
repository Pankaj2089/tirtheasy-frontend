new WOW().init();


$(window).scroll(function(){
     if ($(this).scrollTop() > 550)
     {
      $('.main-search-box ').addClass("sticky");
     }
     else
     {
      $('.main-search-box').removeClass("sticky");
     
     }

});

$(document).ready(function() {
  
    setTimeout(() => {

$('.facilites-slider-mob').owlCarousel({
 loop:true,
  margin:10,
  autoplay:true,
  nav:false,
  items:1.5,
  dots:false,
  slideTransition: 'linear',
  autoplaySpeed: 15000,
  smartSpeed: 15000,
})
  }, 2000);
  



  
});






