var MainCtrl = function($scope, Restangular) {
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
}

module.exports = {
  main: MainCtrl
}
