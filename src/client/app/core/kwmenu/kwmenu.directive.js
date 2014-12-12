(function() {
  'use strict';

  angular
  .module('app.core')
  .directive('kwMenu', kwMenu);

  kwMenu.$inject = ['$timeout'];

  /* @ngInject */
  function kwMenu($timeout) {

    var directive = {
      link: link,
      restrict: 'EA',
      scope: {
        kwMenu: '=',
        active: '='
      },
      templateUrl: 'app/core/kwmenu/kwmenu.html'
    };

    return directive;

    function link(scope, element, attrs) {
      scope.active = scope.active || false;
      scope.icon = 'ion-kiwi';
      scope.sectionStyle = sectionStyle;
      scope.toggleMenu = toggleMenu;
      scope.toggleSection = toggleSection;

      activate();

      function activate() {
        $timeout(function() {
          scope.current = scope.kwMenu.sections[0];
        });
      }

      function sectionStyle(section) {
        if (section.visible) {
          return {'margin-top': '0'};
        } else {
          return {'margin-top': '-' + section.sections.length * (44 / 16) + 'rem'};
        }
      }

      function toggleMenu() {
        scope.active = !scope.active;
        scope.$emit('menuToggle', {active: scope.active});
      }

      function toggleSection(section) {
        if (scope.current && scope.current.name === section.name) {
          scope.current = null;
        } else {
          if (scope.current) {
            scope.current.visible = !scope.current.visible; 
          }
          scope.current = section;
        }
        section.visible = !section.visible;
      }

    }
  }
})();
