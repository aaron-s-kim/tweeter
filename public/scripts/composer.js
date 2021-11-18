(function() {
  $(window).scroll(function() { // Bind event handler to scroll JS event
    toggleBackToTop();
  });
  
  // Show and hide back to top button 
  function toggleBackToTop() {
    offset = 100, // Offset position when to show
    scrollTop = 0,
    $btn = $('#i-arrow-up');
    $nav = $('#navbar');

    scrollTop = $(window).scrollTop(); // Get current vertical position of scroll bar
    
    if(scrollTop >= offset) {
      $btn.fadeIn();
      $nav.fadeOut();

    } else {
      $btn.fadeOut();
      $nav.fadeIn();
    }
    
  }
})();