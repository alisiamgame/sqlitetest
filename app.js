
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path')
  , sqlite3 = require('sqlite3').verbose();

var app = express();

/*
var db = new sqlite3.Database('../../sqlitedata/Log_20130723.log');

db.serialize(function() {
	db.each("select * from log_pc", function(err, row) {
		console.log(row);
	});
});

db.serialize(function() {
	db.each("select * from log_pc", function(err, row) {
		console.log(row.action_id);
	});
});

db.close();
*/

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/users', user.list);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
