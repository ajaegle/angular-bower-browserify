var angular = require('angular');
require('restangular');

angular.module('aj', ['restangular']);

var controllers = require('./controllers')
angular.module('aj')
  .controller('MainCtrl', ['Restangular', controllers.main]);
