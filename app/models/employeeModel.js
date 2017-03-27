const mongoose = require('../libs/mongoose'),
  Schema = mongoose.Schema;

const employeeSchema = new Schema({
  fullname: {
    type: String,
    required: true
  },
  isAdmin: {
    type: Boolean,
    required: true
  },
  isCourier: {
    type: Boolean,
    required: true
  },
  phone: {
    type: Number,
    required: true
  },
  order_list:{

    $ref: 'orders',
    type: Schema.Types.ObjectId,
  },

})

exports.Employee = mongoose.model('employees', employeeSchema);