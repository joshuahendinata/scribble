const Resource = require('resourcejs');
const _ = require('lodash');

module.exports = function(app, route) {

  // Setup the controller for REST;
  Resource(app, '', route, app.models.SRTO).rest({
    beforePost: function test(req, res, next) {
      console.log("BEFORE POST");
      next();
    },
    beforeIndex: function(req, res, next){
      req.query = _.omit(req.query, 'tsp'); // remove the timestamp parameter
      console.log(req.query);
      next();
    }
  });

  // Return middleware.
  return function(req, res, next) {
    next();
  };
};
