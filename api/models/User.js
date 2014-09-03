/**
* User.js
*
* @description :: It keeps user details.
* @docs        :: http://sailsjs.org/#!documentation/models
*/
var bcrypt = require('bcrypt');

module.exports = {

  attributes: {
  	username:{
  		type: 'STRING',
  		minLength: 4,
  		unique: true,
  		required: true
  	},
  	firstName:{
  		type : 'STRING',
  		required: true
  	},
  	lastName:{
  		type : 'STRING',
  		required: true
  	},
  	phone: {
  		type: 'STRING',
  		minLength: 10,
  		maxLength: 10
  	},
  	password: {
  		type: 'STRING',
  		minLength: 4,
  		required: true,
  		columnName: 'encryptPasswd'
  	}
  },

  beforeCreate: function(values, next) {
    bcrypt.hash(values.password, 10, function(err, hash) {
      if(err) return next(err);
      values.password = hash;
      values.username = values.username.replace(/[^a-zA-Z0-9]/g,'');
      next();
    });
  }
};

