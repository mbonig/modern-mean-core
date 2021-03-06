(function() {
  'use strict';

  angular
    .module('users')
    .controller('SignupAuthenticationController', SignupAuthenticationController);

  SignupAuthenticationController.$inject = ['Authentication', 'PasswordValidator', '$state', '$location', '$mdToast'];

  function SignupAuthenticationController(Authentication, PasswordValidator, $state, $location, $mdToast) {
    var vm = this;

    vm.authentication = Authentication;
    vm.clearForm = clearForm;
    vm.error = undefined;
    vm.forms = {};
    vm.popoverMsg = PasswordValidator.getPopoverMsg();
    vm.signup = signup;
    vm.user = {};

    function signup () {
      vm.error = undefined;

      var toast = $mdToast.simple()
        .position('bottom right')
        .hideDelay(6000);

      Authentication
        .signup(vm.user)
        .then(
          function (response) {
            $state.go('root.home');
            toast.textContent('Signup Successful!').theme('toast-success');
            $mdToast.show(toast);
            vm.clearForm();
          },
          function (err) {
            vm.error = err.data.message;
          }
        );
    }

    function clearForm() {
      vm.user = {};
      vm.user.email = '';
      vm.user.password = '';
      vm.forms.signUp.$rollbackViewValue();
      vm.forms.signUp.$setPristine();
      vm.forms.signUp.$setUntouched();
    }

    console.log('SignupAuthenticationController::Init::vm', vm);
  }
})();
