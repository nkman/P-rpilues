var fs = require('fs');
require('shelljs/global');

exports.proceedCodeExecution = function(code, userId, stdin, note, cb){
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
				saveCode(code, user, note, function(err, savedCode){
					if(err){
						return cb(err, null);
					}
					createFolders(code, user, stdin, function(err, output){
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

function createFolders(code, user, stdin, cb){
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
				fs.writeFile('temp/'+user.username+'/stdin.txt', stdin, function(err, input){
					if(err){
						sails.log.error(err);
						return cb(err, null);
					}
					executeCode('temp/'+user.username, function(err, response){
						if(err){
							return cb(err, null);
						}
						else
							return cb(null, response);
					});
				});
			});
		}
	});
}

function executeCode(dir, cb){
	var x = exec('cd '+dir+' && gcc tempcode.c');
	var calbak = {};
	calbak.error = x.output;
	if(x.code != 0){
		return cb(null, calbak);
	}
	else{
		x = exec('cd '+dir+' && cat stdin.txt | ./a.out');
		calbak.output = x.output;
		if(x.code != 0){
			return cb(null, calbak);
		}
		else{
			sails.log.info(calbak);
			return cb(null, calbak);
		}
	}
}

function saveCode(code, user, note, cb){
	Code.create({userId: user.id, data: code, notes: note}, function(err, result){
		if(err){
			return cb(err, null);
		}
		return cb(null, result);
	});
}

exports.getCodes = function(userId, count, cb){
	Code.find({userId: userId}).skip(10*count).limit(10).then(function(err, codes){
		if(err){
			return cb(null, err);
		}
		return cb(null, codes);
	});
}

exports.getExactCode = function(id, cb){
	Code.findOne({id: id}, function(err, code){
		if(err)
			return cb(err, null);
		else
			return cb(null, code);
	});
}