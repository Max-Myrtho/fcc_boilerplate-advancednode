$(document).ready(function () {
  /*global io*/
  let socket = io();

  socket.on("user count", function (data) {
    console.log(data);
  });

  socket.on("user", (data) => {
    $("#num-users").text(data.currentUsers + " users online");
    let message =
      data.username +
      (data.connected ? " has joined the chat." : " has left the chat.");
    $("#messages").append($("<li>").html("<b>" + message + "</b>"));
  });

  // Form submittion with new message in field with id 'm'
  $("form").submit(function () {
    var messageToSend = $("#m").val();
    socket.emit("chat message", messageToSend);
    $("#m").val("");
    return false; // prevent form submit from refreshing page
  });

  socket.on("chat message", (data) => {
    $("#messages").append($("<li>").text(`${data.username}: ${data.message}`));
  });
});
