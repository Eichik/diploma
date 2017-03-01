const mongoose = require('../libs/mongoose'),
  Schema = mongoose.Schema;

const restaurantSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  hours: {
    type: String,
    required: true
  },
  isDelivery: {
    type: Boolean,
    required: true
  },
  menu: {
    dishes_id:{
      $ref: 'dishes',
      type: Schema.Types.ObjectId,   
    },
    weight:{
      type: Number
    },
    price:{
      type: Number
    },
  }
})

exports.Restaurant = mongoose.model('restaurants', restaurantSchema);