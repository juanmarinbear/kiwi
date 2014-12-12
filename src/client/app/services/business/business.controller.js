(function() {
  'use strict';

  angular
  .module('app.services')
  .controller('Business', Business);

  Business.$inject = ['$scope', 'template'];

  function Business($scope, template) {
    var vm = this;

    activate();

    function activate() {
      console.log('Activating Business Controller');
      template.get('app/services/business/language/business.es.json')
      .then(function(result) {
        vm.text = result;
        $scope.app.setTitle(vm.text.title);
      }); // Loads text files.
    }
  }

})();
