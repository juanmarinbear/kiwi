(function() {
  'use strict';

  angular
  .module('app.company')
  .controller('About', About);

  About.$inject = ['$scope', 'template'];

  function About($scope, template) {
    var vm = this;

    activate();

    function activate() {
      console.log('Activating About Controller');
      template.get('app/company/about/language/about.es.json')
      .then(function(result) {
        vm.text = result;
        $scope.app.setTitle(vm.text.title);
      }); // Loads text files.
    }
  }

})();
