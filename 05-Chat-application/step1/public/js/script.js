/* global io */
$(document).ready(function() {
	$('input#input_text, textarea#textarea1').characterCounter()

	var socket = io()

	var chat = {
		init: function() {
			console.log('chat init')
			this.msgFromUser('Hello')
		},
		msgFromUser: function(msg) {
			socket.emit('msgFromUser', msg)
			this.addMsg(msg, 'user')
		},
		msgFromFriend: function(msg) {
			this.addMsg(msg, 'friend')
		},
		addMsg: function(msg, sender) {
			var insertHtml = null
			switch (sender) {
				case 'friend':
					insertHtml = '<div class="row msg-container"><div class="msg friend-msg col s12"><img class="left avatar" src="https://api.adorable.io/avatars/285/abott@adorable.png"><p class="left z-depth-3">' + msg + '</p></div></div>'
					break
				case 'user':
					insertHtml = '<div class="row msg-container"><div class="msg user-msg col s12"><img class="right avatar" src="https://api.adorable.io/avatars/285/abott@adorable.png"><p class="right z-depth-3">' + msg + '</p></div></div>'
					break
				default:
					console.log('Err in inserting message')
			}

			// If new message: add to container else insertAfter to last message
			var ele = null

			if ($('.msg-container').length === 0) {
				ele = $('#scroll-container')
				$(ele).prepend(insertHtml)
			} else {
				ele = $('.msg-container:last')
				$(insertHtml).insertAfter(ele)
			}

			// CSS & Animation
			ele = $('.msg-container:last')
			$(ele).css({
				opacity: 0.25,
				'margin-top': '50px'
			})
			$(ele).animate({
				opacity: 1,
				'margin-top': '20px'
			}, {
				duration: 500
			})
			this.scrollToBottom()
		},
		scrollToBottom: function() {
			$('#scroll-container').animate({
				scrollTop: $('#scroll-container')[0].scrollHeight
			}, 1000)
		}
	}
	chat.init()


	// When Enter Key is hit
	$(document).keypress(function(e) {
		if (e.which === 13) {
			submitUserMsg()
		}
	})

	// Message from Bot
	socket.on('msgFromBot', function(msg) {
		chat.msgFromBot(msg)
	})

	$('#submitButton').click(function(e) {
		console.log('hello')
		e.preventDefault()
		submitUserMsg()
	})

	function submitUserMsg() {
		var userMsg = $('#input_text')
		if (userMsg.val()) {
			chat.msgFromUser(userMsg.val())
			userMsg.val('')
			return true
		}
	}
})
