(function() {
  'use strict';

  angular
  .module('app.core')
  .directive('vCenter', vCenter);

  vCenter.$inject = ['$window', '$timeout'];

  /* @ngInject */
  function vCenter($window, $timeout) {
    
    var directive = {
      link: link,
      restrict: 'EA'
    };

    return directive;

    function link(scope, element, attrs) {
      var w = angular.element($window);

      $timeout(function() {
        vcenter();
      });

      w.bind('resize', function () {
        vcenter();  
      });

      function vcenter() {
        var box = angular.element(element[0]);
        var windowHeight = $window.innerHeight;
        var boxHeight = element[0].offsetHeight;
        var margin = boxHeight > windowHeight ? '2em' : ((windowHeight - boxHeight) / 2) + 'px';
        box.css({'margin-top': margin});
      }
    }
  }
})();
