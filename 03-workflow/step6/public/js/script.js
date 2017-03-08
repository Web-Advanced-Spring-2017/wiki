// http://www.huffingtonpost.com/feeds/verticals/arts/index.xml
// Sample Output: https://github.com/bobby-brennan/rss-parser/blob/master/test/output/reddit.json

$(document).ready(function() {
	$('#submit-url').click(function(event) {
		submitUrl()
	})

	$('#feed-url').submit(function(event) {
		event.preventDefault()
		submitUrl()
			// var self = $(this)
			//
			// var data = {
			//   url: self.find('input[name="url-input"]').val()
			// }
			// clearFeed() // Add callback
			// getFeed(data)
	})

	function submitUrl() {
		var feedUrl = $('#feed-url').find('input[name="url-input"]').val()
		var data = {
			url: feedUrl
		}
		clearFeed() // Add callback
		getFeed(data)
	}

	function clearFeed() {
		$('#newsFeed').empty()
	}

	function getFeed(data) {
		$.ajax({
			type: 'POST',
			data: JSON.stringify(data),
			contentType: 'application/json',
			url: 'http://localhost:3000/feed',
			success: function(feed) {
				console.log('Got Feed')
				displayFeed(feed)
			},
			error: function(request, status, error) {
				console.error(request.responseText)
			}
		})
	}

	function displayFeed(feed) {
		feed.entries.forEach(function(entry) {
			console.log(entry.title)
			var newsFeed = $('#newsFeed')
			var article = `<div class="newsArticle">
			<h1>` + entry.title + `</h1>
			<p>` + entry.content + `</p> </div> <hr>
			`
			newsFeed.append(article)
		})
	}
})
