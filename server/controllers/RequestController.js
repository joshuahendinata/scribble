var Resource = require('resourcejs');
var nextSequence = require('./CountersControllers');
var sequenceName = "requestSequence";
var _ = require('lodash');

module.exports = function (app, route) {

  // Setup the controller for REST;
  Resource(app, '', route, app.models.requestTO).rest({
    beforePost: function test(req, res, next) {
      console.log("BEFORE POST");
      nextSequence('requestSequence', req.body, next); // insert a sequence id before saving
    },
    beforeIndex: function(req, res, next){
      req.query = _.omit(req.query, 'tsp'); // remove the timestamp parameter
      console.log(req.query);
      next();
    },
    afterIndex: function(req, res, next){
      console.log("AFTER INDEX");
      console.log(res._headers['content-range'].split('/')[1]);
      next();
    }
  });

  // Return middleware.
  return function (req, res, next) {
    next();
  };
};
