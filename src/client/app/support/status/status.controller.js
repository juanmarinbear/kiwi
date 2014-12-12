(function() {
  'use strict';

  angular
  .module('app.company')
  .controller('Status', Status);

  Status.$inject = ['$scope', 'template'];

  function Status($scope, template) {
    var vm = this;

    activate();

    function activate() {
      console.log('Activating Status Controller');
      template.get('app/support/status/language/status.es.json')
      .then(function(result) {
        vm.text = result;
        $scope.app.setTitle(vm.text.title);
      }); // Loads text files.
    }
  }

})();
