(function() {
  'use strict';

  angular
  .module('app.company')
  .controller('Careers', Careers);

  Careers.$inject = ['$scope', '$location', '$anchorScroll', '$timeout', 'template'];

  function Careers($scope, $location, $anchorScroll, $timeout, template) {
    var vm = this;
    vm.scroll = scroll;

    activate();

    function activate() {
      console.log('Activating Careers Controller');
      template.get('app/company/careers/language/careers.es.json')
      .then(function(result) {
        vm.text = result;
        $scope.app.setTitle(vm.text.title);
      }); // Loads text files.
    }

    function scroll(anchor) {
      $location.hash(anchor);
      $anchorScroll();
    }
  }

})();
