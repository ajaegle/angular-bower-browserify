var MainCtrl = function(Restangular) {
  this.initialValue = 'asdf';
  var vm = this;
  var User = Restangular.allUrl('users', 'https://api.github.com/users');
  this.fetchUser = function (name) {
    User.one(name).get().then(
      function (data) {
        vm.user = data;
      },
      function (err) {
        vm.err = err;
      }
    )
  };
  this.fetchUser('ajaegle');
}

module.exports = {
  main: MainCtrl
}
