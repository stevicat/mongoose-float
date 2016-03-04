var should = require('should');
var mongoose = require('mongoose');
var Float = require('../lib/index.js').initType(mongoose);
var Schema = mongoose.Schema;

var UserSchema = Schema({
	balance: {
		type: Float
	}
});
var User = mongoose.model('User', UserSchema);

describe('SchemaTypes Float', function () {
	describe('mongoose-float', function () {
		it('should contain initType method', function () {
			var module = require('../lib/index.js');
			module.should.have.ownProperty('initType');
			module.initType.should.be.a.Function;
		});
	});

	describe('mongoose.Schema.Types.Float', function () {
		before(function () {
			var module = require('../lib/index.js').initType(mongoose);
		});
		it('mongoose.Schema.Types should contain Float type property', function () {
			mongoose.Schema.Types.should.have.ownProperty('Float');
		});
		it('mongoose.Schema.Types.Float should contain the constructor', function () {
			mongoose.Schema.Types.Float.should.be.a.Function;
		});
		it('mongoose.Schema.Types.Float should contain cast method', function () {
			mongoose.Schema.Types.Float.prototype.cast.should.be.a.Function;
		});
	});

	describe('new Schema', function () {
		it('should store positive value', function () {
			var user = new User({ balance: 1000 });
			user.balance.should.equal(1000.00);
		});
		it('should store negative value', function () {
			var user = new User({ balance: -1000 });
			user.balance.should.equal(-1000.00);
		});
		it('should not save all of the fractional digits, just two of them', function () {
			var user = new User({ balance: 100.111111111 });
			user.balance.should.equal(100.11);
		});
		it('should throw error if the value is not Number type', function () {
			var user = new User({ balance: '1000' });
			user.validate(function (err) {
				should.exist(err);

				done();
			});
		});
	});
});
