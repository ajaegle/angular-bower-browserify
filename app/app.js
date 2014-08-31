var printer = require('./printer');
var $ = require('jquery');
printer.print();
printer.print();

$( ".content" ).append( "<p>Content...</p>" );

var angular = require('angular');
require('restangular');

angular.module('aj', ['restangular']);

var controllers = require('./controllers')
angular.module('aj')
  .controller('MainCtrl', ['$scope', 'Restangular', controllers.main]);
