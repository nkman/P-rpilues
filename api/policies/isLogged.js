/**
 * isLogged
 *
 * @module      :: Policy
 * @description :: Simple policy to check if user is logged in.
 *                 
 * @docs        :: http://sailsjs.org/#!documentation/policies
 *
 */

var sails = require('sails');
var redis = require("redis"),
client = redis.createClient();

client.on("error", function (err) {
	console.log("Error creating redis client : " + err);
});

module.exports = function(req, res, next) {

	// User is allowed, proceed to the next policy, 
	// or if this is the last policy, the controller
	var cookie = req.signedCookies['user'].split('_fcuk_');
	client.get(cookie[0], function(err, cock){
  	if(cookie[1] == cock)
  		return next();
  	else
  		res.view('home');
	});

	// User is not allowed
	// (default res.forbidden() behavior can be overridden in `config/403.js`)
	return res.forbidden('You are not permitted to perform this action.');
};
