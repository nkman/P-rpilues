/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	user: function(req, res){
		sails.log("TIME: "+ new Date()+ ": "
                +req.method+ " "
                +req.headers.host+" "
                +req.url+ " "
                +JSON.stringify(req.params)+" "+req.route.params+" "+req.ip
                );

		var firstName = req.param('firstName');
		var lastName = req.param('lastName');
		var phone = req.param('phone');
		var username = req.param('username');
		var passwd = req.param('password');

		if(!firstName || !lastName || !phone || !username || !passwd)
			return res.send("Validation error", 500);

		sails.log.info(firstName+" "+lastName+" "+phone+" "+username+" "+passwd);
		signupService.createUser(firstName, lastName, phone, username, passwd, function(err, result){
			if(err)
				return res.send(err, 500);
			else
				return res.redirect('home');
		});
	},

	login: function(req, res){
		sails.log("TIME: "+ new Date()+ ": "
                +req.method+ " "
                +req.headers.host+" "
                +req.url+ " "
                +JSON.stringify(req.params)+" "+req.route.params+" "+req.ip
                );

		var username = req.param('username');
		var password = req.param('password');

		if(!username || !password)
			return res.send("Error", 400);

		sails.log.info(username+" "+password);
		sails.log.info(req.signedCookies['sails.sid']);
		signinService.login(username, password, req.signedCookies, function(err, result){
			if(err)
				return res.send(err, 500);
			else{
				// res.cookie('user', user.cookies, { expires: new Date(Date.now() + 900000), httpOnly: true });
				res.cookie('user', result.cookies);
				return res.redirect('code');
			}
		});
	},

	logout: function(req, res){
		sails.log("TIME: "+ new Date()+ ": "
                +req.method+ " "
                +req.headers.host+" "
                +req.url+ " "
                +JSON.stringify(req.params)+" "+req.route.params+" "+req.ip
                );
		
		signinService.logout(req.cookies['user'].split('_fcuk_')[0], function(err, logout){
			if(err)
				return res.send(err, 500);
			else
				return res.redirect('home');
		});
	}
};

