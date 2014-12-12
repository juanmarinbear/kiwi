(function() {
  'use strict';

  angular
  .module('app.company')
  .controller('Concesion', Concesion);

  Concesion.$inject = ['$scope', 'template'];

  function Concesion($scope, template) {
    var vm = this;

    activate();

    function activate() {
      console.log('Activating Concesion Controller');
      template.get('app/company/concesion/language/concesion.es.json')
      .then(function(result) {
        vm.text = result;
        $scope.app.setTitle(vm.text.title);
      }); // Loads text files.
    }
  }

})();
