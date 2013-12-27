
var host = location.origin.replace(/^http/, 'ws')

var ws;


var networking = {
	chat: function(playername, chatMessage, onsuccess, onerror) {
		console.log("Chatting: " + playername);

		var data = {
			messagetype : 'chat',
			chat : {
				id : playername,
				message : chatMessage
			}
		};

		var dataToSend = JSON.stringify(data);
		ws.send(dataToSend);
	},

	updatePlayer: function(playername, x, y, onconnected, onerror) {
		console.log("Move: " + playername);

		var data = {
			messagetype : 'move',
			player: {
				id: playername,
				X: x, Y: y
			}
		};

		var dataToSend = JSON.stringify(data);
		ws.send(dataToSend);
	},

	connect: function(playername, x, y, onconnected, onerror) {
		
		ws = new WebSocket(host);
		ws.onopen = function() {

			console.log("Player: " + playername + " trying to connect...");
			var data = {
				messagetype : "connect",
				player: {
					id: playername,
					X: x, Y: y
				}
			};

			var dataToSend = JSON.stringify(data);
			ws.send(dataToSend);


		};

		ws.onmessage = function (event) {

			var players = JSON.parse(event.data);

			for (var i = players.length - 1; i >= 0; i--) {

				var playerData = players[i];
				var player = me.game.world.getEntityByProp('name', playerData.id)
				if(player == null || player.length == 0)
				{
					console.log("Player not found. adding: " + playerData.id);
					player = new game.PlayerEntity(960, 448, { image: "dude", spritewidth: 64, spriteheight:64 }, playerData.id, playerData.id);
					me.game.world.addChild(player);	
				};

				player.posX = playerData.X;
				player.posY = playerData.Y;
			}

		};
		onconnected();
	}
};