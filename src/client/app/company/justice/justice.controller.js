(function() {
  'use strict';

  angular
  .module('app.company')
  .controller('Justice', Justice);

  Justice.$inject = ['$scope', 'template'];

  function Justice($scope, template) {
    var vm = this;

    activate();

    function activate() {
      console.log('Activating Justice Controller');
      template.get('app/company/justice/language/justice.es.json')
      .then(function(result) {
        vm.text = result;
        $scope.app.setTitle(vm.text.title);
      }); // Loads text files.
    }
  }

})();
