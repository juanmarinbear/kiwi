(function() {
  'use strict';

  angular
  .module('app.company')
  .controller('Privacy', Privacy);

  Privacy.$inject = ['$scope', 'template'];

  function Privacy($scope, template) {
    var vm = this;

    activate();

    function activate() {
      console.log('Activating Privacy Controller');
      template.get('app/company/privacy/language/privacy.es.json')
      .then(function(result) {
        vm.text = result;
        $scope.app.setTitle(vm.text.title);
      }); // Loads text files.
    }
  }

})();
