var socket = io("http://localhost:3000");

socket.on("disconnect", function() {
	alert("Disconnected");
});

socket.on("connect", function() {
	alert("Connected to socket");
});

socket.on("message", function(message) {
	alert(message);
});