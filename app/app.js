var printer = require('./printer');
var $ = require('jquery');
printer.print();
printer.print();

$( ".content" ).append( "<p>Content...</p>" );

var angular = require('angular');
require('restangular');

angular.module('aj', ['restangular']);
angular.module('aj')
  .controller('MainCtrl', ['$scope', 'Restangular', function($scope, Restangular) {
    $scope.initialValue = 'asdf';
    var User = Restangular.allUrl('users', 'https://api.github.com/users');
    $scope.fetchUser = function (name) {
      User.one(name).get().then(
        function (data) {
          $scope.user = data;
        },
        function (err) {
          $scope.err = err;
        }
      )
    };
    $scope.fetchUser('ajaegle');
  }]);
