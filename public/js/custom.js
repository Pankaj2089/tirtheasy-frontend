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


$("#show-more-content").hide();

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



