(function() {
  'use strict';

  angular
  .module('app.customer')
  .controller('Refer', Refer);

  Refer.$inject = ['$scope', 'template'];

  function Refer($scope, template) {
    var vm = this;

    activate();

    function activate() {
      console.log('Activating Refer Controller');
      template.get('app/customer/refer/language/refer.es.json')
      .then(function(result) {
        vm.text = result;
        $scope.app.setTitle(vm.text.title);
      }); // Loads text files.
    }
  }

})();
