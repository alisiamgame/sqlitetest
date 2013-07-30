
var sqlite3 = require('sqlite3').verbose();
var Iconv = require('iconv').Iconv;
var Buffer = require('buffer').Buffer;

exports.index = function(req, res){
	var db = new sqlite3.Database('./Log_20130723_utf8.log');

	db.serialize(function() {

		db.all("select * from log_pc limit 10", function(err, rows) {			
			res.locals.rows = rows;
			res.render('index', { title: 'Express' });			
		});

/*
		db.each("select * from log_pc limit 10", function(err, row) {
			var buffer = new Buffer(row.szaccountname, 'base64');
			
			//console.log(row);
			console.log(buffer.length);
			console.log(buffer);
			for (var i = 0; i < buffer.length; i++) {
				console.log(buffer[i]);
			}
			res.render('index', { title: 'Express' });			
		});
*/
	});

	db.close();
};