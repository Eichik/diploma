const mongoose = require('../libs/mongoose'),
  Schema = mongoose.Schema;

const dishSchema = new Schema({
	name: {
		type: String,
		required: true
	}
})

exports.Dish = mongoose.model('dishes', dishSchema);

