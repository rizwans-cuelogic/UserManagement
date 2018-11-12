var socket = io("http://localhost:4000");


console.log(socket);
socket.on("disconnect", function() {
	console.log("Disconnected");
});

socket.on("connect", function() {
	console.log("Connected to socket");
});

socket.on("message", function(message) {
	console.log(message);
});