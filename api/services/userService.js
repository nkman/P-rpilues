
exports.userDetail = function(userId, cb){
	User.findOne({id: userId}, function(err, user){
		var error = {};
		if(err){
			error.error = err;
			error.cause = "DATABASE_FAILURE";
			return cb(error, null);
		}
		if(!user || user.length <= 0){
			error.error = "No such user";
			error.cause = "USER_NOT_FOUND";
			return cb(null, error);
		}
		else
			return cb(null, user);
	});
}