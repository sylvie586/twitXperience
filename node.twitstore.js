stuff = require('./node.stuff.js');   //  My own auxilary routines from stuff.js.

//  npm install these!
twit = require('twit');               //  I've found a library called 'twit' which came in handy. (https://github.com/ttezel/twit)
mongojs = require('mongojs');         //  A simple mongodb library.

//  I create the twit object here.
T = new twit({
  consumer_key:         'fc5LYTA9HIZwTK9pFxGIEPrHE',
  consumer_secret:      'U9GRZi5RepXIoOIZQUZQgqB6u7AtGvLKCqhVHr2V26NRscDEmM',
  access_token:         '4321066893-uJIRCJk9M3ZOOzeRo9FZLaxNGa9bb8jVcR1fO4M',
  access_token_secret:  'FrKff7WGsTyYOv0AkY1WkbEC91cwQaGgYoCU71iNuJVSO',
  timeout_ms:           60*1000,  // optional HTTP request timeout to apply to all requests.
});

//  -------------------------------------------------------------------------------------------------------------
//  Connect to db and start stream.
//  -------------------------------------------------------------------------------------------------------------

db = mongojs('dbTwitXperience');
coll = db.collection('tweets');

stream = T.stream('statuses/filter', { 'track': 'javascript,java,ruby,python,scala' });
console.log(stuff.timestamp2log(new Date())+'Started listening to Twitter stream...');

//  -------------------------------------------------------------------------------------------------------------
//  On stream update - store incoming tweets to MongoDB.
//  -------------------------------------------------------------------------------------------------------------

stream.on('tweet', function (tweet) {
    coll.insert(tweet);
    console.log(stuff.timestamp2log(new Date())+'#'+tweet.id_str+' '+tweet.user.screen_name);
});
