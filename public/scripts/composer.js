(function() {
  $(window).scroll(function() { // Bind event handler to scroll JS event
    toggleBackToTop();
  });
  
  // Show and hide back to top button
  function toggleBackToTop() {
    let offset = 100; // Offset position when to show
    let scrollTop = 0;
    let $btn = $('#i-arrow-up');
    let $nav = $('#navbar');

    scrollTop = $(window).scrollTop(); // Get current vertical position of scroll bar
    
    if (scrollTop >= offset) {
      $btn.fadeIn();
      $nav.fadeOut();
    } else {
      $btn.fadeOut();
      $nav.fadeIn();
    }
    
  }
})();