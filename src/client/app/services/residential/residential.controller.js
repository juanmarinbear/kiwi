(function() {
  'use strict';

  angular
  .module('app.services')
  .controller('Residential', Residential);

  Residential.$inject = ['$scope', 'template'];

  function Residential($scope, template) {
    var vm = this;

    activate();

    function activate() {
      console.log('Activating Residential Controller');
      template.get('app/services/residential/language/residential.es.json')
      .then(function(result) {
        vm.text = result;
        $scope.app.setTitle(vm.text.title);
      }); // Loads text files.
    }
  }

})();
