/**
 * CodeController
 *
 * @description :: Server-side logic for managing codes
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	submit: function(req, res){
		var code = req.param('code');
		codeExecutionService.proceedCodeExecution(code, 'nkman', function(err, result){
			if(err)
				res.send(err, 500);
			else
				res.send(result, 200);
		});
	}
};

