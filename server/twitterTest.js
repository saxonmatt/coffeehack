var Twit = require('twit')

var T = new Twit({
    consumer_key:         'RCkPF4og3Myzh5LUex6rg'
  , consumer_secret:      'dapto57KIBifXXoEJR4ZIdB3Y3DOJUKvDko8wEgiGE'
  , access_token:         '29684038-uBUO3ok2Ri8xr0dfEKJM9VjQ8a3TU67KjQ7tkROs6'
  , access_token_secret:  'gU5Ddmu9PupaLcqIZr4otlb4AatJ7uOsrfszzzjPJg2EN'
})

console.log('Searching Twitter');

T.get('search/tweets', { q: 'coffee since:2013-12-01', count: 10 }, function(err, reply) {
    if(err) return handleError(err);
    
 	var max = 0, popular;

	//console.log(reply);

	  var tweets = reply.results, i = reply.length;

	  while(i--) {
	    var tweet = tweets[i];
	    //console.log(tweet.metadata);

		console.log(tweet.metadata.text);
	  }

})




function handleError(err) {
  console.error('twit response status:', err.statusCode);
  console.error('data:', err.data);
}