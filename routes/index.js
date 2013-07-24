
/*
 * GET home page.
 */

var sqlite3 = require('sqlite3').verbose();
var Iconv = require('iconv').Iconv;
var Buffer = require('buffer').Buffer;

exports.index = function(req, res){
	var db = new sqlite3.Database('../../sqlitedata/Log_20130723.log');

	db.serialize(function() {
		db.all("select * from log_pc limit 10", function(err, rows) {
			//res.locals.rows = rows;
			
			var transcopy = new Buffer(rows);
			console.log(transcopy);
			//var buffer = iconv.convert(transcopy);
			//console.log(buffer.toJSON());
			
			//console.log(res.locals.rows);
			//res.render('index', { title: 'Express' });
		});
		
		db.each("select * from log_pc limit 10", function(err, row) {
			var iconv = new Iconv('EUC-KR', 'UTF-8');
			var buffer = iconv.convert(row.szaccountname);
			console.log(buffer.toString('utf8'));
			console.log(buffer.inspect());
			console.log(row.szaccountname);
			res.locals.row = row;
			res.locals.szaccountname = buffer.toString('utf8');
			
			res.render('index', { title: 'Express' });
		});
	});
	
	//console.log(iconv.convert(buffer));

	db.close();
};