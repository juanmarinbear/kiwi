(function() {
  'use strict';

  angular
  .module('app.services')
  .controller('Services', Services);

  Services.$inject = ['$scope', 'template'];

  function Services($scope, template) {
    var vm = this;

    activate();

    function activate() {
      console.log('Activating Services Controller');
      template.get('app/services/language/services.es.json')
      .then(function(result) {
        vm.text = result;
        $scope.app.setTitle(vm.text.title);
      }); // Loads text files.
    }
  }

})();
