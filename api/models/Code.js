/**
* Code.js
*
* @description :: It keeps schema od code collection.
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
  	},
  	notes:{
  		type: 'STRING',
  		maxLength: 51200
  	}
  }
};

