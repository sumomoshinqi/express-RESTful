/** 
 * Mongoose Schema for the Entity Car
 * @author Clark Jeria
 * @version 0.0.2
 */

var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var CarSchema   = new Schema({
    license: { type: String, required: true, trim: true },
    make: { type: String, required: true, trim: true },
    model: { type: String, required: true, trim: true },
	doorCount: { type: Number, required: true, trim: true },
	driver: {type: Schema.ObjectId, ref: 'Driver'}
});

module.exports = mongoose.model('Car', CarSchema);