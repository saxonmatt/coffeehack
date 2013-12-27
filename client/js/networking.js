
var host = location.origin.replace(/^http/, 'ws')

var ws;

//ws.onmessage = function (event) {
//var li = document.createElement('li');
//li.innerHTML = JSON.parse(event.data);
//document.querySelector('#pings').appendChild(li);
//};

var networking = {
	connect: function(playername, x, y, onconnected, onerror) {
		ws = new WebSocket(host);

		console.log("Player: " + playername + " trying to connect...");

		onconnected();
	}
};