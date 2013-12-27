
var host = location.origin.replace(/^http/, 'ws')

var ws;


var networking = {
	connect: function(playername, x, y, onconnected, onerror) {
		
		ws = new WebSocket(host);
		ws.onopen = function() {
			console.log("Player: " + playername + " trying to connect...");
			ws.send(playername);
		};

		ws.onmessage = function (event) {

			var players = JSON.parse(event.data);

			for (var i = players.length - 1; i >= 0; i--) {

				var playerData = players[i];
				var player = me.game.world.getEntityByProp('name', playerData.id)
				if(player == null)
				{
					player = new game.PlayerEntity(960, 448, { image: "dude", spritewidth: 64, spriteheight:64 }, playerData.id, playerData.id);
					me.game.world.addChild(player);	
				};
			}

		};
		onconnected();
	}
};