var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var PaymentAccountSchema   = new Schema({
	accountType: { type: String, enum: ['CREDIT', 'DEBIT', 'PAYPAL'] },
	accountNumber: { type: Number, required: true},
	expirationDate: Date,
	nameOnAccount: { type: String, required: true },
	bank: String
});

module.exports = mongoose.model('PaymentAccount', PaymentAccountSchema);