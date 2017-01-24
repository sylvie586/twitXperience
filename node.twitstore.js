stuff = require('./node.stuff.js');   //  my own auxilary routines from stuff.js

//  npm install these!
twit = require('twit');               //  twit library by Tolga Tezel https://github.com/ttezel/twit
mongojs = require('mongojs');         //  mongodb library

//  create twit object
T = new twit({
  consumer_key:         'fc5LYTA9HIZwTK9pFxGIEPrHE',
  consumer_secret:      'U9GRZi5RepXIoOIZQUZQgqB6u7AtGvLKCqhVHr2V26NRscDEmM',
  access_token:         '4321066893-uJIRCJk9M3ZOOzeRo9FZLaxNGa9bb8jVcR1fO4M',
  access_token_secret:  'FrKff7WGsTyYOv0AkY1WkbEC91cwQaGgYoCU71iNuJVSO',
  timeout_ms:           60*1000,  // optional HTTP request timeout to apply to all requests.
});

//  -------------------------------------------------------------------------------------------------------------
//  connect to db and start stream
//  -------------------------------------------------------------------------------------------------------------

db = mongojs('dbTwitterXp');
coll = db.collection('tweets');

stream = T.stream('statuses/filter', { 'track': 'javascript,java,ruby,python,scala' });
console.log(stuff.timestamp2log(new Date())+'Started listening to Twitter stream...');

//  -------------------------------------------------------------------------------------------------------------
//  on stream update - store incoming tweets to MongoDB
//  -------------------------------------------------------------------------------------------------------------

stream.on('tweet', function (tweet) {
    tweet.timestamp_ms = Number(tweet.timestamp_ms);
    coll.insert(tweet);
    console.log(stuff.timestamp2log(new Date())+'#'+tweet.id_str+' '+tweet.user.screen_name);
});

stuff = require('./node.stuff.js');   //  my own auxilary routines from stuff.js

//  npm install these!
twit = require('twit');               //  twit library by Tolga Tezel https://github.com/ttezel/twit
mongojs = require('mongojs');         //  mongodb library

//  create twit object
T = new twit({
  consumer_key:         'fc5LYTA9HIZwTK9pFxGIEPrHE',
  consumer_secret:      'U9GRZi5RepXIoOIZQUZQgqB6u7AtGvLKCqhVHr2V26NRscDEmM',
  access_token:         '4321066893-uJIRCJk9M3ZOOzeRo9FZLaxNGa9bb8jVcR1fO4M',
  access_token_secret:  'FrKff7WGsTyYOv0AkY1WkbEC91cwQaGgYoCU71iNuJVSO',
  timeout_ms:           60*1000,  // optional HTTP request timeout to apply to all requests.
});

//  -------------------------------------------------------------------------------------------------------------
//  connect to db and start stream
//  -------------------------------------------------------------------------------------------------------------

db = mongojs('dbTwitterXp');
coll = db.collection('tweets');

stream = T.stream('statuses/filter', { 'track': 'javascript,java,ruby,python,scala' });
console.log(stuff.timestamp2log(new Date())+'Started listening to Twitter stream...');

//  -------------------------------------------------------------------------------------------------------------
//  on stream update - store incoming tweets to MongoDB
//  -------------------------------------------------------------------------------------------------------------

stream.on('tweet', function (tweet) {
    tweet.timestamp_ms = Number(tweet.timestamp_ms);
    coll.insert(tweet);
    console.log(stuff.timestamp2log(new Date())+'#'+tweet.id_str+' '+tweet.user.screen_name);
});
