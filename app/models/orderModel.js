const mongoose = require('../libs/mongoose'),
  Schema = mongoose.Schema;

const orderSchema = new Schema({
  phone: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  assigne_courier_id:{

    $ref: 'employees',
    type: Schema.Types.ObjectId
  },
  dishes_id:{
    $ref: 'dishes', 
    type: Schema.Types.ObjectId
  },
  restaurant_id:{
    $ref: 'restaurants',
    type: Schema.Types.ObjectId
  },  

})

exports.Order = mongoose.model('orders', orderSchema);