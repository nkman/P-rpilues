var bcrypt = require('bcrypt');

exports.signinUser = function(username, password, cb){
	User.findOne({'username': username}).done(function(err, user){
		if(err)
			return cb(err, null);
		if(!user || user.length == 0)
			return cb(null, "No such user");

		var hash = user.password;
		bcrypt.compare(password,hash,function(err,result){
			if(err)
				return cb(err, null);

			if(!result)
				return cb(null, "Wrong password !!");
			else if(result){
				delete user.createdAt;
				delete user.updatedAt;
				return cb(null, user);
			}
		});
	});
}