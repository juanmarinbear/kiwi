(function() {
  'use strict';

  angular
  .module('app.company')
  .controller('Stories', Stories);

  Stories.$inject = ['$scope', '$sce', 'template'];

  function Stories($scope, $sce, template) {
    var vm = this;
    vm.trustHtml = trustHtml;

    activate();

    function activate() {
      console.log('Activating Stories Controller');
      template.get('app/company/stories/language/stories.es.json')
      .then(function(result) {
        vm.text = result;
        $scope.app.setTitle(vm.text.title);
      }); // Loads text files.
    }

    function trustHtml(html) {
      return $sce.trustAsHtml(html);
    }
  }

})();
