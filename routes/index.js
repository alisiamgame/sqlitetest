
var sqlite3 = require('sqlite3').verbose();
var Iconv = require('iconv').Iconv;
var Buffer = require('buffer').Buffer;

exports.index = function(req, res){
	var db = new sqlite3.Database('../../sqlitedata/Log_20130723.log');

	db.serialize(function() {
		db.all("select * from log_pc limit 10", function(err, rows) {
			res.locals.rows = rows;
			res.render('index', { title: 'Express' });
		});
	});

	db.close();
};