/**
* This file provided by Facebook is for non-commercial testing and evaluation
* purposes only. Facebook reserves all rights not expressly granted.
*
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
* IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
* FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
* FACEBOOK BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
* ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
* WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

var fs = require('fs');
var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();

//database variables
var MongoClient = require('mongodb').MongoClient;
var dbConnection;
//change the username for the db
var USERNAME = 'cs336';
//change the password for the db
var PASSWORD = 'PASSWORD';

GLOBAL.number1 =1;
GLOBAL.number2 =2;

//connects to database
var APP_PATH = path.join(__dirname, 'dist');
MongoClient.connect('mongodb://'+USERNAME+':'+PASSWORD+'@ds063406.mlab.com:63406/cs336project', function (err, db) {
  if (err) throw err;
  dbConnection = db;
})

app.set('port', (process.env.PORT || 3000));

app.use('/', express.static(path.join(__dirname, 'dist')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Additional middleware which will set headers that we need on each request.
app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Cache-Control', 'no-cache');
  next();
});

app.get('/api/squadrons', function(req, res) {
  GLOBAL.number1 = Math.floor(Math.random() * 10) + 1;
  GLOBAL.number2 = Math.floor(Math.random() * 10) + 1;
  while(GLOBAL.number1  == GLOBAL.number2){
    GLOBAL.number2 = Math.floor(Math.random() * 10) + 1;
  }
  dbConnection.collection("squadrons").find({$or: [ {"squadron": Number(GLOBAL.number1)}, {"squadron": Number(GLOBAL.number2)}]}).toArray(function(err, docs) {
    if (err) throw err;
    res.json(docs);
  });
});

app.get('/api/matchups', function(req, res){
  dbConnection.collection("matchups").find({}).toArray(function(err, data){
    if (err) throw err;
    res.json(data);
  });
});

app.post('/api/matchups', function(req, res){
  console.log("post");
  var matchup1={
    squadron1: GLOBAL.number1, //placeholder
    squadron2: GLOBAL.number2, //placeholder
    percentage: req.body.valueone,
  };
  var matchup2 = {
    squadron1: GLOBAL.number2, //placeholder
    squadron2: GLOBAL.number1, //placeholder
    percentage: req.body.valuetwo,
  };
  dbConnection.collection("matchups").insertOne(matchup1);
  dbConnection.collection("matchups").insertOne(matchup2);
});

app.get('*', function (request, response){
  response.sendFile(path.resolve(APP_PATH, 'index.tmpl.html'))
});

app.listen(app.get('port'), function() {
  console.log('Server started: http://localhost:' + app.get('port') + '/');
});
