function getNow() {
  var result = moment().format("YYYY-MM-DD | HH:mm:ss:SS");
  return result;
}

function localClock() {
  $(".local-time").text(getNow());
  t = setTimeout(function() {
    localClock();
  }, 500);
}

function asyncDemo(url) {
  $.ajax({
    type: "GET",
    url: url,
    beforeSend : function() {
      $(".results").append("<p>Request sent at: " + getNow() + "</p>");
    }
  })
  .done(function(data) {
    $(".results")
      .append("<p>Response at: " + getNow() + "</p>")
      .append("<p>Response object <em>hello</em> is: <b>" + data.hello + "</b></p><hr>");
    setTimeout(function() {
      asyncDemo(url);
    }, 10000);
  });
}

var url = "http://echo.jsontest.com/hello/world";

$(document).ready(function(){
  localClock();
  asyncDemo(url);
});
