
var path = require('path'); // system module

var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var _ = require('lodash');

var app = express();
var port = 3000;

//body parser MW
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Set static folder
app.use(express.static(path.join(__dirname, '../client/dist')));

// Connect to MongoDB
mongoose.connect('mongodb://admin:Password1@ds153732.mlab.com:53732/sr-mgmt-system');
mongoose.connection.once('open', function () {

	app.models = require('./models/index');

	// load ALL the routes
	var routes = require('./routes');

	// key, value in the routes.js
	_.each(routes, function (controller, route) {
		app.use(route, controller(app, route));
	});

	console.log('Listening on port ' + port);
	app.listen(port);

	var result = app.models.SRTO.findOne({
		_id: '596b9370e8c01918b8abb5a7'
	})
	.populate('requestList')
	.exec(function(err, person){
		if (err){
			console.log(err);
			return;
		}

		console.log(person);
	});

});

app.get('/', function(req, res, next){
  res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});