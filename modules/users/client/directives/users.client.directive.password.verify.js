(function() {
  'use strict';

  angular
    .module('users')
    .directive('passwordVerify', passwordVerify);

  DirectiveController.$inject = ['$scope'];
  function DirectiveController($scope) {
    var vm = this;

    $scope.$watchCollection('vm.passwordVerify', function (newObj, oldObj) {
      if (newObj.newPassword && newObj.verifyPassword) {
        if (newObj.newPassword !== newObj.verifyPassword) {
          vm.model.$setValidity('required', false);
        } else {
          vm.model.$setValidity('required', true);
        }
      }
    }, true);

  }

  function passwordVerify() {
    return {
      require: 'ngModel',
      scope: {
        passwordVerify: '='
      },
      controller: DirectiveController,
      controllerAs: 'vm',
      bindToController: true,
      link: function(scope, element, attrs, ngModel) {
        scope.vm.model = ngModel;
      }
    };
  }
})();
