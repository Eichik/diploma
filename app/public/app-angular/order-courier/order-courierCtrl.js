'use strict';

var foodApp = angular.module("foodApp", ['ui-router'])
  .controller("orderCourierCtrl", function($scope, $http) {
    $scope.status = ['pending', 'in_progress', 'cancelled', 'delivered'];
 
});