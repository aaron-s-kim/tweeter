
$(document).ready(function(){
  // console.log('DOM is ready for jQuery');

  $("#tweet-text").on('input', function(event) { // ES5 function convention to use 'this' inside function scope
    let text = event.target.value; // equivalent to $(this).val()
    let remChars = 140 - text.length;

    const counter = $(this).parentsUntil(".new-tweet").find(".counter");
    counter.html(remChars);
    counter.toggleClass('over-limit', (remChars < 0));
  });
});
