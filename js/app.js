// Gets time
function getNow() {
  // Formats tim
  var result = moment().format("YYYY-MM-DD | HH:mm:ss:SS");
  return result;
}

// Displays time in DOM, and refreshes every half second
function localClock() {
  $(".local-time").text(getNow());
  t = setTimeout(function() {
    localClock();
  }, 500);
}

// makes AJAX call to the server
function asyncDemo(url) {
  $.ajax({
    type: "GET",
    url: url,
    // Timestamps AJAX call in DOM
    beforeSend : function() {
      $(".results").append("<p>Request sent at: " + getNow() + "</p>");
    }
  })
  // Timestamps response once it is returned
  .done(function(data) {
    $(".results")
      .append("<p>Response at: " + getNow() + "</p>")
      .append("<p>Response object <em>hello</em> is: <b>" + data.hello + "</b></p><hr>");
    setTimeout(function() {
      asyncDemo(url);
    }, 10000);
  });
}

// Defined globally to be accessed within doc ready block and AJAX call
var url = "http://echo.jsontest.com/hello/world";

// Adds updating clock and makes AJAX call to server
$(document).ready(function(){
  localClock();
  asyncDemo(url);
});
