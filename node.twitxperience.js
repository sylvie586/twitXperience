http = require('http');
async = require('async');
stuff = require('./node.stuff.js');           //  My own auxilary routines from stuff.js
mongojs = require('mongojs');                 //  A simple mongodb library
httpdispatcher = require('httpdispatcher');   //  http dispatcher

//  -------------------------------------------------------------------------------------------------------------
//  connect to db and set up server
//  with error handling because why not
//  -------------------------------------------------------------------------------------------------------------

db = mongojs('dbTwitXperience', ['tweets']);
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
//  http dispatcher init, and some fun custom messages
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

//start:  1484283600001
//exists: 1484983183725
//end:    1485233999999

//  get data from mongodb and send it to client
//  we search string with regexp because we don't want "java" to find "javascript" as well
//  we also filter out documents which have no timestamp_ms field

  var searchwords = ['java', 'javascript', 'ruby', 'scala', 'python'];
  findings = new Array();

  var t = 0;
  async.eachSeries(searchwords, function(word, callback){

      var regexp = new RegExp('\\b'+searchwords[t]+'\\b', 'gi');

      coll.find({ 'timestamp_ms': { $gte: '"'+String(startdate.getTime())+'"' },
                  'timestamp_ms': { $lte: '"'+String(enddate.getTime())+'"' },
                  'timestamp_ms': { $ne: '"undefined"' },
                  'text': regexp
                }, function(err, docs) {
                                        var element = { 
                                                        'searchword': searchwords[t], 
                                                        'tweets': docs.length 
                                                      };
                                        findings.push(element);
                                        t++;
                                        
                                        if (findings.length == searchwords.length) {
                                          var json = {
                                                        'startdate': startdate.getTime(),
                                                        'enddate': enddate.getTime(),
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
