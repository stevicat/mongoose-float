'use strict';

var mongoose = require('mongoose');

function FloatType(digits) {
	function Float(path, options) {
		mongoose.SchemaTypes.Number.call(this, path, options);
	}

	Float.prototype.__proto__ = mongoose.SchemaTypes.Number.prototype;
	Float.prototype.cast = function(value) {
		if (typeof value !== 'number') return new Error('The value you passed should be number');

		return Number(value.toFixed(digits || 2));
	};

	return Float;
}

module.exports.loadType = function(mongoose, digits) {
	var floatType = new FloatType(digits);

	mongoose.SchemaTypes.Float = mongoose.Types.Float = floatType;

	return floatType;
};
