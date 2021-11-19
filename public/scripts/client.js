/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function () {
  // on page load, if no error message, hide; if scroll-to-top button visible, hide
  if ($('#error-message').is(":empty")) {
    $('#error-message').hide();
  }
  if ($('#i-arrow-up').is(":visible")) {
    $('#i-arrow-up').hide();
  }

  // use AJAX to fetch (GET) data from server; receive arr as JSON
  const loadTweets = function() {
    $.ajax('/tweets', {method: 'GET'})
    .then(function(arrTweets) { // when resolved, run callback
      $('#tweets-container').empty(); // removes all child nodes to eliminate duplicates
      renderTweets(arrTweets);
    });
  };
  loadTweets();

  // pass in arr of Objs, then append each to #tweets-container
  const renderTweets = function(tweets) {
    jQuery.each(tweets, (key) => {
      const tweet = createTweetElement(tweets[key]);
      $('#tweets-container').prepend(tweet); // inserts to beginning of element
    });
  };

  // create single tweet element
  const createTweetElement = ({user, content, created_at}) => {
    const { name, handle, avatars } = user;
    const { text } = content;

    // escape function to prevent Cross-site scripting
    const escape = function(str) {
      let div = document.createElement("div");
      div.appendChild(document.createTextNode(str));
      return div.innerHTML;
    };

    // return jQuery obj - constructed elements
    // timeago adds count once time-mark passes
    return $(`
    <article class="tweet">
      <header>
        <div class="tweet-name">
          <img class="i-avatar" src="${avatars}" alt="avatar-icon">
          <div id="display-name">${name}</div>
        </div>
        <div id="handle-name">${handle}</div>
      </header>
      <div class="tweet-content">${escape(text)}</div>
      <footer>
        <div class="time-passed">${timeago.format(Number(`${created_at}`))}</div>
        <div class='icons'>
          <i id='i-flag' class="fas fa-flag"></i>
          <i id='i-retweet' class="fas fa-retweet"></i>
          <i id='i-heart' class="fas fa-heart"></i>
        </div>
      </footer>
    </article>
    `);
  };

  // navbar arrow click event listener to hide/display input box
  $('#i-arrow').on('click', function() {
    if ($('.new-tweet').is(":visible")) {
      $('.new-tweet').slideUp("slow");
    } else {
      $('.new-tweet').slideDown("slow");
    }
  });

  // scroll-to-top click event listener
  $('#i-arrow-up').on('click', function() {
    $('html, body').animate({
      scrollTop: 0
    }, 'fast');
  });

  // tweet submit event listener
  $("form").submit(function(event) {
    event.preventDefault(); // prevents triggering of default action page reload

    // if error message visible, clear error text, hide
    if ($('#error-message').is(":visible")) {
      $('#error-message').empty();
      $('#error-message').slideUp("fast");
    }

    // validation and error messages for input text if: empty string, null, or over character limit
    let textStr = $('#tweet-text').val();
    if (textStr === '') {
      $('#error-message').text('⚠️ Text cannot be empty. Plz rspct our extrajudiciary rule for content. #kthxbai.⚠️ ');
      $('#error-message').slideDown("slow");
      return false;
    }
    if (textStr === null) {
      $('#error-message').text('⚠️ Text cannot be null. Plz rspct our interplanetary rule for this primitive data type. #kthxbai.⚠️ ');
      $('#error-message').slideDown("slow");
      return false;
    }
    if (textStr.length > 140) {
      $('#error-message').text('⚠️ Too long. Plz rspct our constabulatory limit of 140 chars. #kthxbai.⚠️ ');
      $('#error-message').slideDown("slow");
      return false;
    }

    const url = $(this).attr("action"); // => '/tweets'
    let queryStr = $(this).serialize(); // turns set of form data into query string; does not accept args
    $.post(url, queryStr, function() { // Send data to server using HTTP POST request; equivalent to Ajax function
      $('#tweet-text').val(''); // resets textarea input after post; .val() to get/replace input element value
      $('.counter').val(140);
      loadTweets();
    });

  });

});
