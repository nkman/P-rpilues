var fs = require('fs');
require('shelljs/global');

exports.proceedCodeExecution = function(code, userId, cb){
	fs.mkdir('temp',function(err){
		if(err && err.code != 'EEXIST'){
			return cb(err, null);
		}
		else{
			User.findOne({id: userId}, function(err, user){
				if(err){
					return cb(err, null);
				}
				if(!user || user.length == 0){
					return cb(null, "No such user");
				}

				createFolders(code, user, function(err, output){
					if(err){
						return cb(err, null);
					}
					saveCode(code, user, function(err, savedCode){
						if(err){
							return cb(err, null);
						}
						return cb(null, output);
					});
				});
			});
		}
	});
}

function createFolders(code, user, cb){
	fs.mkdir('temp/'+user.username, function(err){
		if(err && err.code != 'EEXIST'){
			return cb(err, null);
		}
		else{
			fs.writeFile('temp/'+user.username+'/tempcode.c', code, function(err, wrote){
				if(err){
					sails.log.error(err);
					return cb(err, null);
				}
				else
					executeCode('temp/'+user.username, function(err, response){
						if(err){
							sails.log.error(err);
							return cb(err, null);
						}
						else
							return cb(null, response);
					});
			});
		}
	});
}

function executeCode(dir, cb){
	var x = exec('cd '+dir+' && gcc tempcode.c');
	if(x.code != 0){
		sails.log.error(x.output);
		return cb(x.output, null);
	}
	else{
		sails.log.info(x.output);
		x = exec('cd '+dir+' && ./a.out');
		if(x.code != 0){
			sails.log.error(x.output);
			return cb(x.output, null);
		}
		else{
			sails.log.info(x.output);
			return cb(null, x.output);
		}
	}
}

function saveCode(code, user, cb){
	Code.create({userId: user.id, data: code}, function(err, result){
		if(err){
			return cb(err, null);
		}
		return cb(null, result);
	});
}