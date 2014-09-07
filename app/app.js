var angular = require('angular');
require('restangular');
require('ng-tags-input');

angular.module('aj', ['restangular', 'ngTagsInput']);

var controllers = require('./controllers')
angular.module('aj')
  .controller('MainCtrl', ['Restangular', controllers.main])
  .controller('TagsCtrl', controllers.tags);
