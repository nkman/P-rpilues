/**
 * CodeController
 *
 * @description :: Server-side logic for managing codes
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	code: function(req, res){
		return res.view('code');
	},

	submit: function(req, res){
		var code = req.param('code');
		var userId = req.cookies['user'].split('_fcuk_')[0];
		if(!userId)
			res.forbidden("Not Allowed!!");
		codeExecutionService.proceedCodeExecution(code, userId, function(err, result){
			if(err)
				res.send(err, 500);
			else
				res.send(result, 200);
		});
	}
};

