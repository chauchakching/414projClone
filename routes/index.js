var express = require('express')
var router = express.Router()
var fs = require('fs')
//var mongo = require('mongodb').MongoClient;
var pg = require('pg')
// connect to the db
//mongo.connect("mongodb://localhost:")
/*pg.defaults.ssl = true;
pg.connect(process.env.DATABASE_URL, function(err, client){
	if (err) throw err;
	console.log('Connected to postgres! Getting schemas...');

	client.query('SELECT TA')
})*/
///////////////////////////////////////////////////////////////
//////////////////////      mongodb     ///////////////////////
///////////////////////////////////////////////////////////////

var mongoose = require('mongoose')
var autoincrement = require('mongoose-auto-increment')
var Schema = mongoose.Schema;

var dbuser = 'ccc'
var dbpassword = '414asgn2'
var conn = mongoose.createConnection ('mongodb://'+dbuser+':'+dbpassword+'@ds011870.mlab.com:11870/414asgn2')

autoincrement.initialize(conn)

conn.on('error', function(err) {
	console.log("Connection error: " + err);
});

process.on('SIGHT', function (){
	mongoose.connection.close(function (){
		console.log('Mongoose default connection '+'disconnected through app termination.');
	process.exit(0);
	});
});

// schema
var RecordSchema = new Schema({
	session: 	{ type: Number, required: true },
	//url: 		{ type: String, required: true},
	videoID: 	{ type: String, required: true},
	time: 		{ type: Date, required: true}
});

RecordSchema.plugin(autoincrement.plugin, 'record')

// generate model
var RecordModel = conn.model('record', RecordSchema)

// data initialization
conn.once('open', function () {
	console.log("Connection to sanddb is open...")
	
	sync(function(){
		// clear tables
		RecordModel.remove({},function(){console.log("old playlist removed.")});
	});
});

///////////////////////////////////////////////////////////////
//////////////////////////   other    /////////////////////////
///////////////////////////////////////////////////////////////

// socket.io connection


router.get('/session/:id', function(req, res, next) {
	
});
/* GET home page. */
router.get('/', function(req, res, next) {
	console.log('let router do this')
	//res.render('index', { title: 'Express' });
	loadHome(req, res, next);
  	
});

function loadHome(req, res, next){
	fs.readFile('./index.html', function(err, html){
		if (err){
			throw err;
		}
		res.writeHeader(200, {"Content-Type": "text/html"});
		res.write(html);
		res.end();
	});
}

module.exports = router;
