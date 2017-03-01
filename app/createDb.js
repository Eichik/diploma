const Dish = require('./models/dishModel').Dish;
const Restaurant = require('./models/restaurantModel').Restaurant;
const Order = require('./models/orderModel').Order;
const Employee = require('./models/employeeModel').Employee;


let dish = new Dish({
  name:"tiramisy",
});

let restaurant = new Restaurant({
  name:"bottle",
  address:"majener street 201",
  hours: "10:00am - 02:00am",
  isDelivery: true,
  menu: {
    dishes_id:{
      ref: 'dishes',
      _id: ("58a1bb3f05bd70633e31630c"),
    },
    weight: 100, 
    price: 6, 
  }
});

let order = new Order({
  phone: +375294775225,
  status: 'delivered',
  address: "crowned street 31a"
})

let employee = new Employee({
  fullname: "Samno Anjelika",
  isAdmin: false,
  isCourier: true,
  phone: +375292446020
})

// restaurant.save(function(err, user, affected) {
//   if (err) throw err;
//   Restaurant.find({name: "bottle"}, function(err, restaurant) {
//    console.log(restaurant);
//   });
// });
