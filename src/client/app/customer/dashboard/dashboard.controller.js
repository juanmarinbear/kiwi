(function() {
  'use strict';

  angular
  .module('app.customer')
  .controller('Dashboard', Dashboard);

  Dashboard.$inject = ['$scope', 'template'];

  function Dashboard($scope, template) {
    var vm = this;

    activate();

    function activate() {
      console.log('Activating Dashboard Controller');
      template.get('app/customer/dashboard/language/dashboard.es.json')
      .then(function(result) {
        vm.text = result;
        $scope.app.setTitle(vm.text.title);
      }); // Loads text files.
    }
  }

})();
