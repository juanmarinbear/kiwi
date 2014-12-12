(function() {
  'use strict';

  angular
  .module('app.core')
  .directive('kwLoading', kwLoading);

  kwLoading.$inject = ['$rootScope'];

  /* @ngInject */
  function kwLoading($rootScope) {
    
    var directive = {
      link: link,
      restrict: 'EA',
      scope: true,
      templateUrl: 'app/core/kwloading/kwloading.html'
    };

    return directive;

    function link(scope, element, attrs) {
      scope.loading = false;
      scope.loadingIcon = 'ion-load-a';

      $rootScope.$on('startLoading', function() {
        toggle();
      });

      $rootScope.$on('stopLoading', function() {
        toggle();
      });

      function toggle() {
        scope.loading = !scope.loading;
      }
    }
  }
})();
