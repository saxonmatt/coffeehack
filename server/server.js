var WebSocketServer = require('ws').Server
	, http = require('http')
	, express = require('express')
	, app = express()
	, port = process.env.PORT || 8080
	, lolguids = require('./lolguids')
	, game = require('./game');


var gameloopInterval = 1000;

app.use(express.static(__dirname + '/'));

var server = http.createServer(app);
server.listen(port);

console.log('http server listening on %d', port);

var wss = new WebSocketServer({server: server});

console.log('websocket server created');


// gamelooping
setInterval(function() {
	game.update(Date());
}, gameloopInterval);


// Okay lets get some connections.
wss.on('connection', function(ws) {
	
	// Connection close handler.
	ws.on('close', function() {
		// TODO: some kind of client id.
		console.log("Client closed.");
	});



});