(function() {
  'use strict';

  angular
  .module('app.services')
  .controller('Faq', Faq);

  Faq.$inject = ['$scope', '$location', '$anchorScroll', '$timeout', 'template'];

  function Faq($scope, $location, $anchorScroll, $timeout, template) {
    var vm = this;
    vm.scroll = scroll;

    activate();

    function activate() {
      console.log('Activating Faq Controller');
      template.get('app/services/faq/language/faq.es.json')
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
