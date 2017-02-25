// var data = {
//   url: "http://www.huffingtonpost.com/feeds/verticals/arts/index.xml"
// };

var data = {};
data.title = "title";
data.message = "message";

$.ajax({
  type: 'POST',
  data: JSON.stringify(data),
  contentType: 'application/json',
  url: 'http://localhost:3000/feed',
  success: function(data) {
    console.log('success');
    console.log(JSON.stringify(data));
  },
  error: function(request, status, error) {
    console.error(request.responseText);
  }
});
