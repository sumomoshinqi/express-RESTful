/** 
 * Mongoose Schema for the Entity Driver
 * @author Clark Jeria
 * @version 0.0.2
 */

var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var DriverSchema   = new Schema({
    name: { type: String, required: true, trim: true, unique: true },
    firstName: { type: String, required: true, trim: true },
	lastName: { type: String, required: true, trim: true },
	emailAddress: { type: String, required: true, trim: true },
	password: { type: String, required: true, trim: false },
	addressLine1: { type: String, trim: true },
	addressLine2: { type: String, trim: true },
	city: { type: String, trim: true },
	state: { type: String, trim: true },
	zip: { type: Number, trim: true },
	phoneNumber: { type: Number, trim: true }
});

module.exports = mongoose.model('Driver', DriverSchema);