(function() {
  'use strict';

  angular
  .module('app.services')
  .controller('Metromesh', Metromesh);

  Metromesh.$inject = ['$scope', 'template'];

  function Metromesh($scope, template) {
    var vm = this;

    activate();

    function activate() {
      console.log('Activating Metromesh Controller');
      template.get('app/services/metromesh/language/metromesh.es.json')
      .then(function(result) {
        vm.text = result;
        $scope.app.setTitle(vm.text.title);
      }); // Loads text files.
    }
  }

})();
