(function() {
  'use strict';

  angular
  .module('app.home')
  .controller('Home', Home);

  Home.$inject = ['$scope', 'template'];

  function Home($scope, template) {
    var vm = this;

    activate();

    function activate() {
      console.log('Activating Home Controller');
      template.get('app/home/language/home.es.json')
      .then(function(result) {
        vm.text = result;
        $scope.app.setTitle(vm.text.title);
      }); // Loads text files.
    }
  }

})();
