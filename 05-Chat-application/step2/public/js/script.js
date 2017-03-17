$(document).ready(function() {
  $('input#input_text, textarea#textarea1').characterCounter();
  var socket = io();
  var userName = null;
  var chat = {
    init: function() {
      var msg = {
        from: userName,
        content: userName + " Joined"
      };
      this.msgFromUser(msg);
    },
    msgFromUser: function(msg) {
      this.addMsg(msg, "self");
      socket.emit('msgFromUser', msg);
    },
    msgFromFriend: function(msg) {
      console.log("new message from " + msg.from);
      this.addMsg(msg, "friend");
    },
    addMsg: function(msg, sender) {

      var insertHtml = null;

      switch (sender) {
        case "friend":
          insertHtml = '<div class="row msg-container"><div class="msg friend-msg col s12"><img class="left avatar" src="https://api.adorable.io/avatars/285/' + msg.from + '.png"><p class="left z-depth-3">' + msg.content + '</p></div></div>';
          break;
        case "self":
          insertHtml = '<div class="row msg-container"><div class="msg user-msg col s12"><img class="right avatar" src="https://api.adorable.io/avatars/285/' + userName + '.png"><p class="right z-depth-3">' + msg.content + '</p></div></div>';
          break;
        default:
          console.log("Err in inserting message");
      }

      // If new message: add to container else insertAfter to last message
      var ele = null;
      if ($(".msg-container").length === 0) {
        ele = $("#scroll-container");
        $(ele).prepend(insertHtml);
      } else {
        ele = $(".msg-container:last");
        $(insertHtml).insertAfter(ele);
      }

      // CSS & Animation
      ele = $(".msg-container:last");
      $(ele).css({
        opacity: 0.25,
        "margin-top": "50px"
      });
      $(ele).animate({
        opacity: 1,
        "margin-top": "20px"
      }, {
        duration: 500
      });
      this.scrollToBottom();
    },
    scrollToBottom: function() {
      $("#scroll-container").animate({
        scrollTop: $("#scroll-container")[0].scrollHeight
      }, 1000);
    }
  };
  socket.on('connect', function() {
    // socket connected
    userName = socket.id;
    chat.init();
  });


  // When Enter Key is hit
  $(document).keypress(function(e) {
    if (e.which === 13) {
      submitUserMsg();
    }
  });

  // Message from Friend
  socket.on('msgFromFriend', function(msg) {
    chat.msgFromFriend(msg);
  });

  $("#submitButton").click(function(e) {
    e.preventDefault();
    submitUserMsg();
  });

  function submitUserMsg() {
    var userMsg = $("#input_text");
    if (userMsg.val()) {
      var msg = {
        from: userName,
        content: userMsg.val()
      };
      chat.msgFromUser(msg);
      userMsg.val('');
      return true;
    }
  }
});
