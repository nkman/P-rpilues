/**
 * CodeController
 *
 * @description :: Server-side logic for managing codes
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	code: function(req, res){
		sails.log("TIME: "+ new Date()+ ": "
                +req.method+ " "
                +req.headers.host+" "
                +req.url+ " "
                +JSON.stringify(req.params)+" "+req.route.params+" "+req.ip
                );

		userService.userDetail(req.cookies['user'].split('_fcuk_')[0], function(err, user){
			if(err)
				return res.send(err, 500);
			else
				return res.view('code',{
					user: user, code: null
				});
		});
	},

	submit: function(req, res){
		sails.log("TIME: "+ new Date()+ ": "
                +req.method+ " "
                +req.headers.host+" "
                +req.url+ " "
                +JSON.stringify(req.params)+" "+req.route.params+" "+req.ip
                );

		var code = req.param('code');
		var stdin = req.param('stdin');
		var note = req.param('notes');

		var userId = req.cookies['user'].split('_fcuk_')[0];
		if(!userId)
			res.forbidden("Not Allowed!!");

		codeExecutionService.proceedCodeExecution(code, userId, stdin, note, function(err, result){
			if(err)
				res.send(err, 500);
			else
				res.send(result, 200);
		});
	},

	mycodes: function(req, res){
		/*Multiple of 10*/
		sails.log("TIME: "+ new Date()+ ": "
                +req.method+ " "
                +req.headers.host+" "
                +req.url+ " "
                +JSON.stringify(req.params)+" "+req.route.params+" "+req.ip
                );

		var count = req.param('count');
		codeExecutionService.getCodes(req.cookies['user'].split('_fcuk_')[0], count, function(err, codes){
			if(err)
				return res.send(err, 500);
			else
				return res.view('mycodes',{
					code: codes
				});
		});
	},

	view: function(req, res){
		sails.log("TIME: "+ new Date()+ ": "
                +req.method+ " "
                +req.headers.host+" "
                +req.url+ " "
                +JSON.stringify(req.params)+" "+req.route.params+" "+req.ip
                );
		
		codeExecutionService.getExactCode(req.param('id'), function(err, code){
			if(err)
				res.send(err, 500);
			else
				userService.userDetail(req.cookies['user'].split('_fcuk_')[0], function(err, user){
					if(err)
						return res.send(err, 500);
					else
						return res.view('code',{
							user: user, code: code
						});
				});
		});
	}
};

