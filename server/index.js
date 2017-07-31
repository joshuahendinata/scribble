
const path = require('path'); // system module

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
global.dbConfigUrl = 'mongodb://admin:Password1@ds153732.mlab.com:53732/sr-mgmt-system';
const _ = require('lodash');

const app = express();
const port = 3000;

//body parser MW
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Set static folder
app.use(express.static(path.join(__dirname, '../client/dist')));

// Connect to MongoDB
mongoose.connect(global.dbConfigUrl);
mongoose.connection.once('open', function () {

	app.models = require('./models/index');

	// load ALL the routes
	const routes = require('./routes');

	// iterate value, key in the routes.js
	_.each(routes, function (controller, route) {
		app.use(route, controller(app, route));
	});

	console.log('Listening on port ' + port);
	app.listen(port);

	app.models.SRTO.findOne({
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

app.get(['/app/*', '/', '/app'], function(req, res, next){
  res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});