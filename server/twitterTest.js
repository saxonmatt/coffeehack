var twitterStuff = require('./twitterStuff');

twitterStuff.getTwitterDebug(debugCallback);

twitterStuff.getTweets(function tweetsCallback(results)
{

	//console.log(results);

	var tweets = results.statuses, i = results.statuses.length;

	while(i--) {
	var tweet = tweets[i];
		console.log(tweet.text);
	}
});

function debugCallback(paramname)
{	
	console.log('test1');	
	console.log(paramname);
}
