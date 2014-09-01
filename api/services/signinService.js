var bcrypt = require('bcrypt');
var redis = require("redis");
var crypto = require('crypto');

var client = redis.createClient();
client.on("error", function (err) {
	console.log("Error creating redis client : " + err);
});

exports.login = function(username, password, cookie, cb){
	User.findOne({'username': username}, function(err, user){
		if(err)
			return cb(err, null);
		if(!user || user.length == 0)
			return cb(null, "No such user");

		var hash = user.password;
		bcrypt.compare(password, hash, function(err,result){
			if(err)
				return cb(err, null);

			if(!result)
				return cb(null, "Wrong password !!");
			else if(result){
				delete user.createdAt;
				delete user.updatedAt;

				client.set(user.id, cookie['sails.sid'], function(err, set){
					if(err){
						sails.log.error(err);
						return cb({errorMessage:"Redis cannot set the token !!",errorCode:"REDIS_ERROR"},null);
					}
					user.cookies = user.id +'_fcuk_'+cookie['sails.sid'];
					return cb(null, user);
				});
			}
		});
	});
}

exports.logout = function(cooki, cb){
	client.del(cooki, function(err, deleted){
		if(err)
			return cb(err, null);
		return cb(null, deleted);
	});
};