"use strict";
const express     = require('express');
const Restaurant  = require('../models/restaurantModel').Restaurant;
const Dish        = require('../models/dishModel').Dish;
const Order       = require('../models/orderModel').Order;
const Employee    = require('../models/employeeModel').Employee;
const ObjectId    = require('mongodb').ObjectId;
const Router      = require('router')
const router      = Router()

router.get('/', (req, res) => {
  res.json('Welcome to FoodAdvisor!')
});
router.get('/restaurants', (req, res) => {
  return Restaurant.find({}, function(err, restaurants) {
    if(err) {
      res.json(err);
    }
    res.json(restaurants);
  })
});
router.get('/restaurants/:id', (req, res) => {
  return Restaurant.findById({_id: req.params.id}, (err, restaurant) => {
    if(err) {
      res.json(err);
    }
    console.log(restaurant)
    res.json(restaurant);
  })
});
router.get('/restaurants/:id/menu', (req, res) => {
  return Restaurant.findById({_id: req.params.id}, (err, restaurant) => {
    if (err) throw err;
    // let dishId = restaurant.menu.dishes_id;
    // return Dish.find({_id: dishId}, (err, dish) =>{
    //   if(err) {
    //     res.json(err);
    //   }
    //   return (dish.name)
    // })
    // console.log(dishId)
    res.json(restaurant.menu);
  })
});

router.post('/restaurants/new', function (req, res, next) {
  let newRestaurant = new Restaurant({
    name: req.body.name,
    address: req.body.address,
    hours: req.body.hours,
    isDelivery: req.body.isDelivery,
  });
  newRestaurant.save((err,restaurant) => {
    if(err) {
      res.json(err);
    }
    else { 
      res.json({message: "restaurant successfully added!", restaurant });
    }
  })
});
router.patch('/restaurants/:id', function (req, res, next) {
  return Restaurant.findById({_id: req.params.id}, (err, restaurant) =>{
    if(err){
      res.json(err);
    }
    else{ 
      let newRestaurant = {
        name: req.body.name || restaurant.name,
        address: req.body.address || restaurant.address,
        hours: req.body.hours || restaurant.hours,
        isDelivery: req.body.isDelivery || restaurant.isDelivery,
        // menu: DishMenu
      };
      
      Object.assign(restaurant, newRestaurant).save((err, restaurant)=>{
        if(err){
          res.json(err);
        }
        else {
          console.log(restaurant)
          res.json({message: "restaurant Successfully changed"});
        }
      })
    };
  })
})
router.patch('/restaurants/:id/menu', function (req, res, next) {
  return Restaurant.findById({_id: req.params.id}, (err, restaurant) =>{
    if(err){
      res.json(err);
    }
    else{ 
      let dish1 = Dish.find({_id: req.body.menu.dishes_id}, function(err, dish) {
        if(err) {
          res.json(err);
        }
        let DishMenu = {
          weight: req.body.menu.weight || restaurant.menu.weight,
          price: req.body.menu.price || restaurant.menu.price,
          dishes_id: dish[0]._id,
        }
        restaurant.menu = DishMenu;
        restaurant.save((err, restaurant)=> {
          if(err) {
            res.json(err);
          }
          else{   
            console.log(restaurant.menu.dishes_id)       
          res.json({message: "menu successfully added!", restaurant });
        }
      })
    })
    }
  })
})
router.delete('/restaurants/:id', function(req, res){
  return Restaurant.remove({_id: req.params.id}, function(err, restaurant){
    if(err){
      res.json(err);
    }
    res.json({ message: 'Successfully deleted' });
  })
})

router.post('/dishes/new', function (req, res, next) {
  let newDish = new Dish(req.body);
  newDish.save((err,dish) => {
    if(err) {
      res.json(err);
    }
    else { 
      res.json({message: "dish successfully added!", dish });
    }
  })
})
router.get('/dishes', (req, res) => {
  return Dish.find({}, function(err, dishes) {
    if(err) {
      res.json(err);
    }
    res.json(dishes);
  })
});
router.get('/dishes/:id', (req, res) => {
  return Dish.findById({_id: req.params.id}, (err, dish) => {
    if(err) {
      res.json(err);
    }
    res.json(dish);
  })
});
router.patch('/dishes/:id', (req, res) =>{
  return Dish.findById({_id: req.params.id}, (err, dish)=>{
    if(err) {
      res.json(err);
    }
    let newDish = {
      name: req.body.name || dish.name,
    }
    Object.assign(dish, newDish).save((err, dish)=>{
      if(err){
        res.json(err);
      }
      else {
        res.json({message: "successfully changed"});
      }
    })
  })
})
router.delete('/dishes/:id', function(req, res){
  return Dish.remove({_id: req.params.id}, function(err, dish){
    if(err){
      res.json(err);
    }
    res.json({ message: 'Successfully deleted' });
  })
})

router.get('/orders', (req, res) => {
  return Order.find({}, function(err, orders) {
    if(err) {
      res.json(err);
    }
    res.json(orders);
  })
});
router.get('/orders/:id', (req, res) => {
  return Order.findById({_id: req.params.id}, (err, order) => {
    if(err) {
      res.json(err);
    }
    res.json(order);
  })
})
router.post('/orders', function (req, res, next) {
  let assigneCourierId = {
    $ref: "employee",
    $id: req.body.assigne_courier_id,
  }
  let dishesId = {
    $ref: "dishes",
    $id: req.body.dishes_id,
  }
  let restaurantId = {
    $ref: "restaurants",
    $id: req.body.restaurant_id,
  }
  let newOrder = new Order({
    status: req.body.status,
    address: req.body.address,
    phone: req.body.phone,
    assigne_courier_id: assigneCourierId,
    dishes_id:dishesId,
    restaurant_id: restaurantId,
  })
  newOrder.save((err,order) => {
    if(err) {
      res.json(err);
    }
    else { 
      res.json({message: "order successfully added!", order });
    }
  })
})
router.patch('/orders/:id', (req, res) =>{
  return Order.findById({_id: req.params.id}, (err, order)=>{
    if(err) {
      res.json(err);
    }
    let assigneCourierId = {
    $ref: "employee",
    $id: req.body.assigne_courier_id,
    }
    let dishesId = {
      $ref: "dishes",
      $id: req.body.dishes_id,
    }
    let restaurantId = {
      $ref: "restaurants",
      $id: req.body.restaurant_id,
    }
    let newOrder = {
      phone: req.body.phone || order.phone,
      status: req.body.status || order.status,
      address: req.body.address || order.address,
      assigne_courier_id: assigneCourierId,
      dishes_id:dishesId,
      restaurant_id: restaurantId,
    }
    Object.assign(order, newOrder).save((err, order)=>{
      if(err){
        res.json(err);
      }
      else {
        res.json({message: "Order Successfully changed"});
      }
    })
  })
})
router.delete('/orders/:id', function(req, res){
  return Order.remove({_id: req.params.id}, function(err, order){
    if(err){
      res.json(err);
    }
    res.json({ message: 'Successfully deleted' });
  })
})

router.get('/employees', (req, res) => {
  return Employee.find({}, function(err, employees) {
    if(err) {
      res.json(err);
    }
    res.json(employees);
  })
});
router.get('/employees/:id', (req, res) => {
  return Employee.findById({_id: req.params.id}, (err, employee) => {
    if(err) {
      res.json(err);
    }
    res.json(employee);
  })
})
router.post('/employees/new', function (req, res, next) {
  let employee1 = Dish.find({_id: req.body.order_id}, function(err, employee) {
    if(err) {
      res.json(err);
    }
    let newEmployee = new Employee({
      fullname: req.body.fullname,
      isAdmin: req.body.isAdmin,
      isCourier: req.body.isCourier,
      phone: req.body.phone,
      order_list: ObjectId(employee._id),
    })
    newEmployee.save((err, employee)=>{
      if(err) {
        res.json(err);
      }
      else{
        res.json({message: "employee successfully added!", employee});
      }
    })
  })
})
router.patch('/employees/:id', (req, res) =>{
  return Employee.findById({_id: req.params.id}, (err, employee)=>{
    if(err) {
      res.json(err);
    }
    let newEmployee = {
      fullname: req.body.fullname || employee.fullname,
      isAdmin: req.body.isAdmin || employee.isAdmin,
      isCourier: req.body.isCourier || employee.isCourier,
      phone: req.body.phone || employee.phone,
    }
    Object.assign(employee, newEmployee).save((err, employee)=>{
      if(err){
        res.json(err);
      }
      else {
        res.json({message: "employee successfully changed"});
      }
    }) 
  })
})
router.delete('/employees/:id', function(req, res){
  return Employee.remove({_id: req.params.id}, function(err, employee){
    if(err){
      res.json(err);
    }
    res.json({ message: 'Successfully deleted' });
  })
})


module.exports = router;