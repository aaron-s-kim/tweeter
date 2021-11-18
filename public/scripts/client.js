/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function () {

  // // Test / driver code (temporary). Eventually will get this from the server.
  // const data = [
  //   {
  //     "user": {
  //       "name": "Newton",
  //       "avatars": "https://i.imgur.com/73hZDYK.png",
  //       "handle": "@SirIsaac"
  //     },
  //     "content": {
  //       "text": "If I have seen further it is by standing on the shoulders of giants"
  //     },
  //     "created_at": 1461116232227
  //   },
  //   {
  //     "user": {
  //       "name": "Descartes",
  //       "avatars": "https://i.imgur.com/nlhLi3I.png",
  //       "handle": "@rd"
  //     },
  //     "content": {
  //       "text": "Je pense , donc je suis"
  //     },
  //     "created_at": 1461113959088
  //   }
  // ];

  // $(function() {
  //   const $button = $('#load-more-posts');
  //   $button.on('click', function () {
  //     console.log('Button clicked, performing ajax call...');
      
  //     $.ajax('more-posts.html', { method: 'GET' })
  //     .then(function (morePostsHtml) {
  //       console.log('Success: ', morePostsHtml);
  //       $button.replaceWith(morePostsHtml);
  //     });
  //   });
  // });

  // use AJAX to fetch (GET) data from server; receive arr of tweets as JSON
  const loadTweets = function() {
    $.ajax('/tweets', {method: 'GET'}) // http://localhost:8080/tweets
    .then(function(arrTweets) {
      console.log('Success:', arrTweets);
      renderTweets(arrTweets);
    });
  };
  loadTweets();

  // take in arr of tweet Objs, then append each to #tweets-container
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

  // renderTweets(data);

});
