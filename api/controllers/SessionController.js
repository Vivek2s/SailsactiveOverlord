/**
 * SessionController
 *
 * @description :: Server-side logic for managing sessions
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	
	'new': function (req,res) {

		// var oldDate = new Date();
		// var newDate = new Date(oldDate.getTime() + 60000);
		// req.session.cookie.expires = newDate;
		// req.session.authenticated = true;
		// console.log(req.session);
		res.view('session/new');
	},

	create : function (req,res,next) {

		//console.log(req);
		if(!req.param('username') || !req.param('password')) {
			var error =  [{name: 'user or password requires', message:'Must enter both username or password'}];

			console.log('1');
			res.redirect('/session/new');
			return;
		}


		User.findOne({
			username:req.param('username')
		}).exec(function (err,user){

			if(err) return next('err');

		if(!user) {
			var invalidUser = [{name:'UserInvalid' , message:'username is invalid'}]
			console.log('invalid user');
			res.redirect('/session/new');
			return;
		}

			console.log('finduser'+user.username);
			if(req.param('password') != user.password) {
				res.redirect('/session/new');
				return;
			}
			else {
				req.session.authenticated = true;
				req.session.user = user;
				res.redirect('/user/show/' + user.id);
			}
		});
	},

	destroy:function(req,res,next) {
		req.session.destroy();
		res.redirect('/session/new');
	},

};
