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

	if(req.cookies['user'] == null){
		return res.forbidden('Login First!!.');
	}
	else if(req.cookies['user'])
		var cookie = req.cookies['user'].split('_fcuk_');

	if(!cookie || cookie.length != 2){
		// sails.log.info("Here");
		return res.forbidden('Login First!!');
	}
	else
	client.get(cookie[0], function(err, cock){
		if(err)
			return res.forbidden('Login First!!');

		if(cookie[1] == cock){
			return next();
		}
		else
	  		return res.forbidden('Login First!!');
	});
};
