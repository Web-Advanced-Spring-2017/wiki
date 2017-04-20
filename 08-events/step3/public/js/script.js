$(document).ready(function() {
  var socket = io()
  socket.on('pipe',function (data) {
    $('#log').append(`<p>${data}</p>`)
  })
})
