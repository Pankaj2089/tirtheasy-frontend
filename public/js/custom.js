new WOW().init();


$(window).scroll(function(){
     if ($(this).scrollTop() > 450)
     {
      $('.main-search-box ').addClass("sticky");
     }
     else
     {
      $('.main-search-box').removeClass("sticky");
     
     }

});

$(window).scroll(function(){
     if ($(this).scrollTop() > 150)
     {
      $('.inner-page-search ').addClass("sticky");
     }
     else
     {
      $('.inner-page-search').removeClass("sticky");
     }

});

$(document).ready(function() {

  $('.hero-banner').owlCarousel({
    loop:true,
    margin:0,
    nav:false,
    items:1,
    autoplay:true,
    dots: false,
    autoplayTimeout:5000,
  });

$('.promotions-sldier').owlCarousel({
  loop:true,
  margin:20,
  autoplay:false,
  nav:true,
  items:3,
  dots:false,
  responsive : {
    0 : {
        items:1.1,
    },
    // breakpoint from 480 up
    480 : {
      items:1.3,
    },
    // breakpoint from 768 up
    768 : {
      items:2,
    },
    992:{
      items:3,
    },
    1000:{
      items:3,
    },

    1400:{
      items:3,
    },
  }
});

$('.outside-india-sldier').owlCarousel({
  loop:true,
  margin:20,
  autoplay:true,
  nav:false,
  items:5,
  dots:false,
  slideTransition: 'linear',
  autoplaySpeed: 15000,
  smartSpeed: 15000,
  responsive : {
    0 : {
        items:1.2,
    },
    
    480 : {
      items:1.5,
    },
    
    768 : {
      items:3,
    },
    992:{
      items:4,
    },
    1000:{
      items:5,
    },
  }
});

$('.top-hotels-sldier').owlCarousel({
  loop:true,
  margin:20,
  autoplay:false,
  nav:true,
  items:4,
  dots:false,
  responsive : {
    0 : {
        items:1.2,
    },
    // breakpoint from 480 up
    480 : {
      items:1.5,
    },
    // breakpoint from 768 up
    768 : {
      items:2,
    },
    992:{
      items:3,
    },
    1000:{
      items:4,
    },
  }
});

$('.guest_reviews-sldier').owlCarousel({
  loop:true,
  margin:20,
  autoplay:false,
  nav:true,
  items:3,
  dots:false,
  responsive : {
    0 : {
        items:1.3,
        margin:10,
    },
    // breakpoint from 480 up
    480 : {
      items:1.4,
      margin:10,
    },
    // breakpoint from 768 up
    768 : {
      items:2,
      margin:0,
    },
    992:{
      items:2.5,
      margin:15,
    },

     1200:{
      items:3,
      margin:15,
    },
   
  }
});

$('.outside-india-sldier').owlCarousel({
  loop:true,
  margin:20,
  autoplay:true,
  nav:false,
  items:5,
  dots:false,
  slideTransition: 'linear',
  autoplaySpeed: 15000,
  smartSpeed: 15000,
  responsive : {
    0 : {
        items:1.2,
    },
    
    480 : {
      items:1.5,
    },
    
    768 : {
      items:3,
    },
    992:{
      items:4,
    },
    1000:{
      items:5,
    },
  }
});

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


$('.trending-news').owlCarousel({
    loop:true,
    margin:0,
    items:1,
    autoplay:true,
    nav:true,
    dots:false,
    // animateOut: 'fadeOut',
    // animateIn: 'fadeIn',
    autoplayTimeout:5000,   
})
  
});


/*--increase product qty box--*/
$(document).ready(function() {
    $('.minus').click(function () {
      var $input = $(this).parent().find('input');
      var count = parseInt($input.val()) - 1;
      count = count < 1 ? 1 : count;
      $input.val(count);
      $input.change();
      return false;
    });
    $('.plus').click(function () {
      var $input = $(this).parent().find('input');
      $input.val(parseInt($input.val()) + 1);
      $input.change();
      return false;
    });
  });
/*--increase product qty box end--*/

// $("select")
//   .customSelectBox()
//   .change(function () {
//     // Do something with `$(this).val()` !!
// });


$("#show-more-content").hide();

$("#show-more").click(function () {
  $("#show-more-content").show(300);
  $("#show-less").show();
  $("#show-more").hide();
});

$("#show-less").click(function () {
  $("#show-more-content").hide(150);
  $("#show-more").show();
  $(this).hide();
});




/*--Timer section--*/
$(document).ready(function() {
// Start time: 7 minutes 32 seconds = 452 seconds
  let remainingTime = 7 * 60 + 32;
  const timerEl = document.getElementById("session-timer");

  const updateTimer = () => {
    const minutes = Math.floor(remainingTime / 60);
    const seconds = remainingTime % 60;
    // timerEl.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    // if (remainingTime > 0) {
    //   remainingTime--;
    // } else {
    //   clearInterval(timerInterval);
    //   timerEl.textContent = "00:00";
    // }
  };

  updateTimer(); // Initial call
  const timerInterval = setInterval(updateTimer, 1000);

});



