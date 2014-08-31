
exports.createUser = function(firstName, lastName, phone, username, passwd, cb){
	User.findOne({'username': username}, function(err, user){
		if(err){
			sails.log.error(err);
			return cb(err, null);
		}
		if(!user || user.length == 0){
			User.create({firstName: firstName, lastName: lastName, phone: phone, username: username, password: passwd}, function(err, user){
				if(err){
					return cb(err, null);
				}
				else{
					return cb(null, user);
				}
			});
		}
		else{
			return cb(null, "Username exists !!");
		}
	});
}