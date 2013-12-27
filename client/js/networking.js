
//var host = location.origin.replace(/^http/, 'ws')
var host = "ws://secret-reaches-8341.herokuapp.com/"

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
		console.log("Move: " + playername + ' to ' + x + ',' + y);

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
					X: 960, Y: 448
				}
			};
					player = new game.PlayerEntity(960, 448, { image: "dude", spritewidth: 64, spriteheight:64 }, 
						playername, playername, true);
					me.game.world.addChild(player);	

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
					player = new game.PlayerEntity(playerData.X, playerData.Y, { image: "dude", spritewidth: 64, spriteheight:64 }, playerData.id, playerData.id, false);
					me.game.world.addChild(player);	
				}
				else
				{
					console.log("Player " + player.id + ' is now at ' + playerData.X + ',' + playerData.Y);

					player[0].posX = playerData.X;
					player[0].posY = playerData.Y;
				}
			}

		};
		onconnected();
	}
};