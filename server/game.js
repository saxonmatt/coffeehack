module.exports = {
	update: function(gametime, players) {
		//console.log('Gameloop: ' + gametime);
		for(var i = 0; i < players.length; i++) {
			console.log('Update player: ' + players[i].id + ' @ ' + players[i].X + ' x ' + players[i].Y);
		}
	}
}