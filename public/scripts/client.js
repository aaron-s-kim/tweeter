/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function () {

  // use AJAX to fetch (GET) data from server; receive arr as JSON
  const loadTweets = function() {
    $.ajax('/tweets', {method: 'GET'}) // http://localhost:8080/tweets
    .then(function(arrTweets) {
      $('#tweets-container').empty(); // removes all child nodes of matched element from DOM
      renderTweets(arrTweets.reverse());
    });
  };
  loadTweets();

  // pass in arr of Objs, then append each to #tweets-container
  const renderTweets = function(tweets) {
    // Mentor: can use regular for loop for consistency
    jQuery.each(tweets, (key) => {
      const tweet = createTweetElement(tweets[key]);
      $('#tweets-container').append(tweet);
    });
  };

  const createTweetElement = function(tweetData) {
    // timeago adds count once time-mark passes
    let $tweet = $(`
    <article class="tweet">
      <header>
        <div class="tweet-name">
          <img class="i-avatar" src="https://i.imgur.com/73hZDYK.png" alt="avatar-icon">
          <div id="display-name">${tweetData.user.name}</div>
        </div>
        <div id="handle-name">${tweetData.user.handle}</div>
      </header>
      <div class="tweet-content">${tweetData.content.text}</div>
      <footer>
        <div class="time-passed">${timeago.format(Number(`${tweetData.created_at}`))}</div>
        <div class='icons'>
          <i id='i-flag' class="fas fa-flag"></i>
          <i id='i-retweet' class="fas fa-retweet"></i>
          <i id='i-heart' class="fas fa-heart"></i>
        </div>
      </footer>
    </article>
    `);
    return $tweet;
  };

  $("form").submit(function(event) {
    event.preventDefault(); // prevents triggering of default action

    let textStr = $('#tweet-text').val();
    console.log(textStr);
    if (textStr === '') {
      window.alert('text cannot be empty');
      return false;
    }
    if (textStr === null) {
      window.alert('text cannot null');
      return false;
    }
    if (textStr.length > 140) {
      window.alert('Over character limit');
      return false;
    }

    const url = $(this).attr("action"); // => '/tweets'
    let queryStr = $(this).serialize() // turns set of form data into query string; does not accept args
    $.post(url, queryStr, function() { // Send data to server using HTTP POST request; equivalent to Ajax function
      $('#tweet-text').val(''); // resets textarea input after post; .val() to get/replace input element value
      loadTweets();
    });

  });

});
