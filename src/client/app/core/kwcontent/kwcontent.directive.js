(function() {
  'use strict';

  angular
  .module('app.core')
  .directive('kwContent', kwContent);

  kwContent.$inject = [];

  /* @ngInject */
  function kwContent() {
    
    var directive = {
      link: link,
      restrict: 'EA',
      scope: {
        app: '=',
        nav: '='
      },
      templateUrl: 'app/core/kwcontent/kwcontent.html'
    };

    return directive;

    function link(scope, element, attrs) {
      scope.getTransition = getTransition;

      scope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
        scope.transition = getTransition(fromState.name, toState.name);
        scope.app.section = toState.name;
        console.log(scope.app.section);
      });

      function getTransition(from, to) {
        var indexes = {};

        if (typeof scope.nav === 'undefined') {
          return 'appear';
        }

        angular.forEach(scope.nav.sections, function(parent, parentIndex) {
          angular.forEach(parent.sections, function(child, childIndex) {

            if (from === child.name) {
              indexes.fromParent = parentIndex;
              indexes.fromChild = childIndex;
            }

            if (to === child.name) {
              indexes.toParent = parentIndex;
              indexes.toChild = childIndex;
            }
          });
        });

        if (from === '') {
          return 'appear';
        }

        if (typeof indexes.fromParent === 'undefined') {
          return 'right';
        }

        if (typeof indexes.toParent === 'undefined') {
          return 'left';
        }

        if (indexes.fromParent === indexes.toParent) {
          return indexes.fromChild > indexes.toChild ? 'down' : 'up';
        } else {
          return indexes.fromParent > indexes.toParent ? 'left' : 'right';
        }
      }
    }
  }
})();
