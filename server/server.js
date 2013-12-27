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
var chatMessages = [];


var player1 = {
	id: 'twitter',
	X: 700, Y: 300
};

players.push(player1);

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

/*setInterval(function() {
	twitter.getTweets(function(tweets) {
		console.log("Got some tweets.");
	});
});
*/

// Okay lets get some connections.
wss.on('connection', function(ws) {

	// Connection close handler.
	ws.on('close', function() {
		// TODO: some kind of client id.
		console.log("Client closed:");
	});

	ws.on('message', function(dataIn) {
		
		console.log("data: " + dataIn);
		var data = JSON.parse(dataIn);

		if(data.messagetype == "connect")
		{
			console.log('connection for ' + data.player)
			players.push(data.player);
		}
		
		if(data.messagetype == "move")
		{
			console.log('move for ' + data.player.id)
			for (var i = players.length - 1; i >= 0; i--) {
				if(players[i].id == data.player.id)
				{
					console.log('moved ' + data.player.id)
					players[i].X = data.player.X;
					players[i].Y = data.player.Y;
				}		
			};
		}

		if(data.messagetype == "chat")
		{	
			console.log('chat message received.');
			chatMessages.push(data);
		}
	});

	// push updates
	setInterval(function() {
		ws.send(JSON.stringify(players), function() { });
		ws.send(JSON.stringify(chatMessages), function() { });
	}, gameloopInterval);
	
});