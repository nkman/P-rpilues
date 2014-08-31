var fs = require('fs');
require('shelljs/global');

exports.proceedCodeExecution = function(code, username, cb){
	fs.mkdir('temp',function(err){
		if(err && err.code != 'EEXIST'){
			return cb(err, null);
		}
		else{
			fs.mkdir('temp/'+username, function(err){
				if(err && err.code != 'EEXIST'){
					return cb(err, null);
				}
				else{
					fs.writeFile('temp/'+username+'/tempcode.c', code, function(err, wrote){
						if(err){
							sails.log.error(err);
							return cb(err, null);
						}
						else
							executeCode('temp/'+username, function(err, response){
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