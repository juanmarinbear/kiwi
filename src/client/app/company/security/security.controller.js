(function() {
  'use strict';

  angular
  .module('app.company')
  .controller('Security', Security);

  Security.$inject = ['$scope', 'template'];

  function Security($scope, template) {
    var vm = this;

    activate();

    function activate() {
      template.get('app/company/security/language/security.es.json')
      .then(function(result) {
        vm.text = result;
        $scope.app.setTitle(vm.text.title);
      }); // Loads text files.
    }
  }

})();
