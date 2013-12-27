
var Twit = require('twit');

module.exports = {
	getTwitterDebug: function getTwitterDebug(callback) {
		callback('Twitter Stuff ok');
	},
	getTweets: function getTweets(callback) {
		getTweetMessages(callback);
	}
};

 function getTweetMessages(callback) {

	var T = new Twit({
	    consumer_key:         'RCkPF4og3Myzh5LUex6rg'
	  , consumer_secret:      'dapto57KIBifXXoEJR4ZIdB3Y3DOJUKvDko8wEgiGE'
	  , access_token:         '29684038-uBUO3ok2Ri8xr0dfEKJM9VjQ8a3TU67KjQ7tkROs6'
	  , access_token_secret:  'gU5Ddmu9PupaLcqIZr4otlb4AatJ7uOsrfszzzjPJg2EN'
	})

	console.log('Searching Twitter...');

	T.get('search/tweets', { q: '#coffee', count: 10 }, function(err, reply) {
	    if(err) return handleError(err);

		var tweets = reply.statuses, i = reply.statuses.length;

		console.log('Found ' + i + ' tweets');
		
		return callback(reply);
	})

};

function handleError(err) {
  console.error('twit response status:', err.statusCode);
  console.error('data:', err.data);
}