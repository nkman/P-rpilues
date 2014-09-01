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
	// sails.log.info(req.cookies['user']);
	if(req.cookies['user'] == null){
		return res.forbidden('You are not permitted to perform this action.');
	}

	var cookie = req.cookies['user'].split('_fcuk_');

	if(!cookie || cookie.length != 2){
		// sails.log.info("Here");
		return res.forbidden('You are not permitted to perform this action.');
	}
	client.get(cookie[0], function(err, cock){
		if(err)
			return res.forbidden('You are not permitted to perform this action.');

		// sails.log.info(cock); sails.log.info(cookie[1]);
		if(cookie[1] == cock){
			return next();
		}
		else
	  		return res.forbidden('You are not permitted to perform this action.');
	});

	// User is not allowed
	// (default res.forbidden() behavior can be overridden in `config/403.js`)
	// return res.forbidden('You are not permitted to perform this action.');
};
