/**
* Code.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
  	userId:{
  		type: 'STRING'
  	},
  	data:{
  		type: 'STRING',
  		maxLength: 51200
  	},
  	keepPrivate:{
  		type: 'BOOLEAN',
  		defaulsTo: false
  	}
  }
};

