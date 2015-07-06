var express = require('express'),
	http = require('http'),
	bodyParser = require('body-parser'),
	DataStore = require('nedb'),
	app = express(),
	http_port = 3000,
	usersDb = new DataStore({filename:'users.nedb'});

app.use(express.static(__dirname + '/src'));
app.use(bodyParser());


app.get('/users', function(req, res) {
	usersDb.find({}, function(err, docs){
		if (err)
			res.send(err);

		res.send(docs);
	});
});

app.get('/users/:user_id', function(req, res) {
	usersDb.findOne({ _id: req.params.user_id }, function(err, docs) {
		if (err)
			res.send(err);

		res.send(docs);
	});
});

app.post('/users', function(req, res) {
	usersDb.insert([{ name: req.body.name, age: req.body.age }], function(err, docs) {
		if (err)
			res.send(err);

		res.send(docs);
	});
});

app.put('/users/:user_id', function(req, res) {
	usersDb.update({ _id: req.params.user_id  }, { name: req.body.name, age: req.body.age}, {}, function (err, numReplaced) {
		if (err)
			res.send(err);

		res.send({result: numReplaced});
	});
});

app.delete('/users/:user_id', function(req, res) {
	usersDb.remove({ _id: req.params.user_id }, function(err, numRemoved){
		if (err)
			res.send(err);
		
		res.send(numRemoved);
	});
});


usersDb.loadDatabase();
app.listen(http_port);

console.log('Users listening on port: ' + http_port);
