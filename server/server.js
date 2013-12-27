var WebSocketServer = require('ws').Server
	, http = require('http')
	, express = require('express')
	, app = express()
	, port = process.env.PORT || 8080
	, lolguids = require('./lolguids')
	, game = require('./game');
	//, twitter = require('./twitterStuff');


var gameloopInterval = 1000;
var twitterloopInterval = 10000;
var players = [];


app.use(express.static(__dirname + '/'));

var server = http.createServer(app);
server.listen(port);

console.log('http server listening on %d', port);

var wss = new WebSocketServer({server: server});

console.log('websocket server created');


// gamelooping
setInterval(function() {
	game.update(Date(), players);
}, gameloopInterval);

//setInterval(function() {
//	twitter.getTweets(function(tweets) {
//		console.log("Got some tweets.");
//	});
//});


// Okay lets get some connections.
wss.on('connection', function(ws) {

	var playerid = lolguids.guid();
	
	// Connection close handler.
	ws.on('close', function() {
		// TODO: some kind of client id.
		console.log("Client closed: " + playerid);
	});

	// push updates
	setInterval(function() {
		ws.send(JSON.stringify("Server update for player: " + playerid), function() { });
	}, gameloopInterval);

	var player = {
		id: playerid
	};

	players.push(player);

	ws.send(JSON.stringify(playerid), function() { });
});