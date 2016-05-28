/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

	schema:true,
  attributes: {
  	name:{
  		type:'string',
  		required:true
  	},
  	username:{
  		type:'string',
  		email:true,
  		unique:true,
  		required:true
  	},
  	password:{
  		type:'string',
  		required:true
  	},
		password_confirm:{
  		type:'string',
  		required:true
  	},

  	toJSON: function(){
  		var obj = this.toObject();
  		delete obj.password;
  		delete obj.password_confirm;
  		delete obj._csrf;
  		return obj;
  	}
  },

  beforeCreate: function (values,next) {

    if(!values.password || values.password != values.password_confirm) {
      return next({err: ["Password don't match with confirm password"]});
    }
  }
};

