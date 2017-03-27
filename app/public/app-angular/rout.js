'use strict';

  foodApp.config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("/restaurants");
    $stateProvider
      .state('restaurants', { 
        url: '/restaurants',
        templateUrl: '/app-angular/restaurants/restaurants-view.html',
        controller: 'restaurantsCtrl', 
      })
      .state('restaurant', {
        url: '/restaurants/:id', 
        templateUrl: '/app-angular/restaurant/restaurant-view.html',
        controller: 'restaurantsCtrl', 
      }) 
      .state('dishes', {
        url: '/dishes',
        templateUrl: '/app-angular/dishes/dishes-view.html',
        controller: 'dishesCtrl',
      })
      .state('basket', {//в случае success показывать сообщеньке
        url: '/basket',
        templateUrl: '/app-angular/basket/basket-view.html',
        controller: 'basketCtrl',
      })
      .state('about', {
        url: '/about',
        templateUrl: '/app-angular/about/about-view.html',
        controller: 'aboutCtrl',        
      })
      .state('contacts', {
        url: '/contacts',
        templateUrl: '/app-angular/contacts/contacts-view.html',
        controller: 'contactsCtrl',                
      })
      .state('news', {
        url: '/news',
        templateUrl: '/app-angular/news/news-view.html',
        // controller: 'newsCtrl', 
      })
      .state("orders-admin", {
        url: '/orders-admin',
        templateUrl : "/app-angular/order-admin/order-admin-view.html",
        controller: 'orderAdminCtrl', 
      })
      .state("orders-courier", {
        url: '/orders-courier',
        templateUrl : "/app-angular/order-courier/order-courier-view.html",
        controller: "orderCourierCtrl"
      })
  })

  .controller('restaurantsCtrl', function($scope, $http, $state) {
    $scope.moveRest = function(id){ 
      $scope.rest = this.restaurant;
      console.log($scope.rest.name)
 
      $state.go('restaurant', {id:id}) 
    }
    $scope.orderMessage = function(order){
      
    }
    $http.get('/api/restaurants')
      .then(function mySucces(response) {
         $scope.restaurants = response.data;
         console.log($scope.restaurants[3].img)
      }, function myError(response) {
        $scope.textError = response.statusText;
      });
  })

  .controller('restaurantCtrl', function($scope, $http) {
    
  })

  .controller('dishesCtrl', function($scope, $http) {
    $scope.findDish = function (dish){

    }
    $http.get('/api/restaurants/:id/menu')
      .then(function mySucces(response) {
        console.log(response.data)
         $scope.dishes = response.data;
      }, function myError(response) {
        $scope.textError = response.statusText;
    });
  })

  .controller('basketCtrl', ['$scope', function($scope) {
  
  }])

  .controller('aboutCtrl', ['$scope', function($scope) {
  
  }])

  .controller('contactsCtrl', ['$scope', function($scope) {
  
  }])

  .controller('orderAdminCtrl', ['$scope', function($scope) {
  
  }])

  .controller('orderCourierCtrl', ['$scope', function($scope) {
  
  }])
