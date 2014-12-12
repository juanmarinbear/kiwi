(function() {
  'use strict';

  angular
  .module('app.services')
  .controller('Dedicated', Dedicated);

  Dedicated.$inject = ['$scope', 'template'];

  function Dedicated($scope, template) {
    var vm = this;

    activate();

    function activate() {
      console.log('Activating Dedicated Controller');
      template.get('app/services/dedicated/language/dedicated.es.json')
      .then(function(result) {
        vm.text = result;
        $scope.app.setTitle(vm.text.title);
      }); // Loads text files.
    }
  }

})();
