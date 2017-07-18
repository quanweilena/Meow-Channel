var express = require('express');
var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectId;
var bodyParser = require('body-parser');
var bcrypt = require('bcryptjs');
var app = express();

var db = null;

MongoClient.connect('mongodb://localhost:27017/mittens', function(err, dbconn){
	if(!err){
		console.log('We are connected!');
		db =  dbconn;
	}
});

app.use(bodyParser.json());

app.use(express.static('public'));



app.get('/meows',function(req,res,next){
	db.collection('meows', function(err, meowsCollection){
		meowsCollection.find().toArray(function(err, meows){
		return res.json(meows);
		});
	});
	
});

app.post('/meows', function(req,res,next){
	db.collection('meows', function(err, meowsCollection){
		var newMeow = {
			text: req.body.newMeow
		};
		meowsCollection.insert(newMeow, {w:1}, function(err){
		return res.send();
		});
	});
});

app.put('/meows/remove', function(req,res,next){
	db.collection('meows', function(err, meowsCollection){
		var meowID = req.body.meow._id;

		meowsCollection.remove({_id: ObjectId(meowID)}, {w:1}, function(err){
		return res.send();
		});
	});
});

app.post('/users', function(req,res,next){

	db.collection('users', function(err, usersCollection){
		bcrypt.genSalt(10, function(err, salt) {
		    bcrypt.hash(req.body.password, salt, function(err, hash) {
		        var newUser = {
					username: req.body.username,
					password: hash
				};
				usersCollection.insert(newUser, {w:1}, function(err){
					return res.send();
				});
			});
		});	
	});
});

app.listen(3000, function () {
  console.log('Mittens app listening on port 3000!');
});



