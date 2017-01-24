<<<<<<< HEAD
http = require('http');
async = require('async');
stuff = require('./node.stuff.js');           //  my own auxilary routines from stuff.js
mongojs = require('mongojs');                 //  mongodb library
httpdispatcher = require('httpdispatcher');   //  http dispatcher

//  -------------------------------------------------------------------------------------------------------------
//  connect to db and set up server
//  with error handling because why not
//  -------------------------------------------------------------------------------------------------------------

db = mongojs('dbTwitterXp', ['tweets']);
coll = db.collection('tweets');

server = http.createServer(handleRequest).listen(31337);
dispatcher = new httpdispatcher;

db.on('error', function (err) {
    console.log('Database fainted! Error: ', err);
    process.exit();
});

server.on('error', function() {
  console.log('Server has fainted!');
});

server.on('listening', function(){
    console.log('Pikaaa...')
});

//  -------------------------------------------------------------------------------------------------------------
//  http dispatcher init
//  -------------------------------------------------------------------------------------------------------------

function handleRequest(req, res) {
  console.log('A wild request appeared! '+req.url);
  try {
    dispatcher.dispatch(req, res);
  } catch(err) {
    console.log('Error: "'+err+'" It\'s super effective!');
  }
}

//  -------------------------------------------------------------------------------------------------------------
//  respond to incoming http requests
//  -------------------------------------------------------------------------------------------------------------

dispatcher.onGet('/getstats', function(req, res) {

//  default number of days will be 10 unless specified otherwise in http parameter
//  if days parameter is "today" or negative then days = 0

  var days = 10;
  if (typeof req.params.days != 'undefined' && !isNaN(req.params.days)) {
    days = Math.floor(Number(req.params.days));
  }
  if (days <= 0) days = 0;
  
//  get the starting date for filtering

  var startdate = new Date();
  startdate.setDate(startdate.getDate()-days);
  startdate.setHours(0, 0, 0, 1);

  var enddate = new Date();
  enddate.setHours(23, 59, 59, 999);

//  get data from mongodb and send it to client
//  we search string with regexp because we don't want "java" to find "javascript" as well
//  we also filter out documents which have no timestamp_ms field

  var searchwords = ['java', 'javascript', 'ruby', 'scala', 'python'];
  findings = new Array();

  var t = 0;
  async.eachSeries(searchwords, function(word, callback){

      var regexp = new RegExp('\\b'+searchwords[t]+'\\b', 'gi');
      
      coll.find({ timestamp_ms: { $gte: startdate.getTime() },
                  timestamp_ms: { $lte: enddate.getTime() },
                  text: regexp
                }, function(err, docs) {
                                        var element = { 
                                                        'searchword': searchwords[t], 
                                                        'tweets': docs.length 
                                                      };
                                        findings.push(element);
                                        t++;
                                        
                                        if (findings.length == searchwords.length) {
                                          var json = {
                                                        'startdate': startdate,
                                                        'enddate': enddate,
                                                        'days': days,
                                                        'findings': findings
                                                      };
                                        
                                          res.writeHead(200, { 'Content-Type': 'application/json',
                                                               'charset': 'utf-8',
                                                               'Access-Control-Allow-Origin': '*' 
                                                             });
                                          res.end(JSON.stringify(json, null, ' '));
                                        }
                                        callback();
                                      });
  })
});

//  -------------------------------------------------------------------------------------------------------------
//  respond to incoming http requests
//  -------------------------------------------------------------------------------------------------------------

dispatcher.onGet('/mixitup', function(req, res) {

  console.log('Mixing up database!');
  
  var startdate = new Date();
  startdate.setDate(startdate.getDate()-10);
  startdate.setHours(0, 0, 0, 1);

  var enddate = new Date();
  enddate.setHours(23, 59, 59, 999);
  
  coll.find({ id: { $exists: true }}).forEach(function(err, doc) {
    if (doc != null) {
      coll.update({ id: doc.id }, 
                  {$set: { timestamp_ms: Math.floor(Math.random()*(enddate.getTime()-startdate.getTime()+1)+startdate.getTime()) }})
    }
  });
  
  res.writeHead(200, { 'Content-Type': 'application/json',
                       'charset': 'utf-8',
                       'Access-Control-Allow-Origin': '*' 
                     });
  res.end('Database is mixed up now. Is this you wanted? Are you happy now?!');

});
=======
http = require('http');
async = require('async');
stuff = require('./node.stuff.js');           //  my own auxilary routines from stuff.js
mongojs = require('mongojs');                 //  mongodb library
httpdispatcher = require('httpdispatcher');   //  http dispatcher

//  -------------------------------------------------------------------------------------------------------------
//  connect to db and set up server
//  with error handling because why not
//  -------------------------------------------------------------------------------------------------------------

db = mongojs('dbTwitterXp', ['tweets']);
coll = db.collection('tweets');

server = http.createServer(handleRequest).listen(31337);
dispatcher = new httpdispatcher;

db.on('error', function (err) {
    console.log('Database fainted! Error: ', err);
    process.exit();
});

server.on('error', function() {
  console.log('Server has fainted!');
});

server.on('listening', function(){
    console.log('Pikaaa...')
});

//  -------------------------------------------------------------------------------------------------------------
//  http dispatcher init
//  -------------------------------------------------------------------------------------------------------------

function handleRequest(req, res) {
  console.log('A wild request appeared! '+req.url);
  try {
    dispatcher.dispatch(req, res);
  } catch(err) {
    console.log('Error: "'+err+'" It\'s super effective!');
  }
}

//  -------------------------------------------------------------------------------------------------------------
//  respond to incoming http requests
//  -------------------------------------------------------------------------------------------------------------

dispatcher.onGet('/getstats', function(req, res) {

//  default number of days will be 10 unless specified otherwise in http parameter
//  if days parameter is "today" or negative then days = 0

  var days = 10;
  if (typeof req.params.days != 'undefined' && !isNaN(req.params.days)) {
    days = Math.floor(Number(req.params.days));
  }
  if (days <= 0) days = 0;
  
//  get the starting date for filtering

  var startdate = new Date();
  startdate.setDate(startdate.getDate()-days);
  startdate.setHours(0, 0, 0, 1);

  var enddate = new Date();
  enddate.setHours(23, 59, 59, 999);

//  get data from mongodb and send it to client
//  we search string with regexp because we don't want "java" to find "javascript" as well
//  we also filter out documents which have no timestamp_ms field

  var searchwords = ['java', 'javascript', 'ruby', 'scala', 'python'];
  findings = new Array();

  var t = 0;
  async.eachSeries(searchwords, function(word, callback){

      var regexp = new RegExp('\\b'+searchwords[t]+'\\b', 'gi');
      
      coll.find({ timestamp_ms: { $gte: startdate.getTime() },
                  timestamp_ms: { $lte: enddate.getTime() },
                  text: regexp
                }, function(err, docs) {
                                        var element = { 
                                                        'searchword': searchwords[t], 
                                                        'tweets': docs.length 
                                                      };
                                        findings.push(element);
                                        t++;
                                        
                                        if (findings.length == searchwords.length) {
                                          var json = {
                                                        'startdate': startdate,
                                                        'enddate': enddate,
                                                        'days': days,
                                                        'findings': findings
                                                      };
                                        
                                          res.writeHead(200, { 'Content-Type': 'application/json',
                                                               'charset': 'utf-8',
                                                               'Access-Control-Allow-Origin': '*' 
                                                             });
                                          res.end(JSON.stringify(json, null, ' '));
                                        }
                                        callback();
                                      });
  })
});

//  -------------------------------------------------------------------------------------------------------------
//  respond to incoming http requests
//  -------------------------------------------------------------------------------------------------------------

dispatcher.onGet('/mixitup', function(req, res) {

  console.log('Mixing up database!');
  
  var startdate = new Date();
  startdate.setDate(startdate.getDate()-10);
  startdate.setHours(0, 0, 0, 1);

  var enddate = new Date();
  enddate.setHours(23, 59, 59, 999);
  
  coll.find({ id: { $exists: true }}).forEach(function(err, doc) {
    if (doc != null) {
      coll.update({ id: doc.id }, 
                  {$set: { timestamp_ms: Math.floor(Math.random()*(enddate.getTime()-startdate.getTime()+1)+startdate.getTime()) }})
    }
  });
  
  res.writeHead(200, { 'Content-Type': 'application/json',
                       'charset': 'utf-8',
                       'Access-Control-Allow-Origin': '*' 
                     });
  res.end('Database is mixed up now. Is this you wanted? Are you happy now?!');

});
>>>>>>> c563de8311cf2d808b64aa74ae40acdd41c30ccd
