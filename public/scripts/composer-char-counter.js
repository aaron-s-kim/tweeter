$(document).ready(function(){

  // real-time page counter feedback for character limit
  $("#tweet-text").on('input', function(event) { // ES5 function convention to use 'this' inside function scope
    let text = event.target.value;
    let remChars = 140 - text.length;

    // search tree up, then down to select counter element
    const counter = $(this).parentsUntil(".new-tweet").find(".counter");
    counter.html(remChars);
    counter.toggleClass('over-limit', (remChars < 0));
  });
});
