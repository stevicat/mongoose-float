'use strict';

var mongoose = require('mongoose');
var util = require('util');

function Float(key, options) {
	mongoose.SchemaTypes.Number.call(this, key, options);
}

util.inherits(Float, mongoose.SchemaTypes.Number);

Float.prototype.cast = function(value) {
	if (typeof value !== 'number') return new Error('The value you passed should be number');

	return Number(value.toFixed(2));
};

module.exports.initType = function(mongoose) {
	mongoose.SchemaTypes.Float = mongoose.Types.Float = Float;

	return Float;
};
