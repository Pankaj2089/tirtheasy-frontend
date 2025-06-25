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
     
     if ($(this).scrollTop() > 150)
     {
      $('.inner-page-search ').addClass("sticky");
     }
     else
     {
      $('.inner-page-search').removeClass("sticky");
     
     }
});




