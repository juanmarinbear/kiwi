(function() {
  'use strict';

  angular
  .module('app')
  .controller('App', App);

  App.$inject = ['$scope', '$window', '$timeout', 'template', 'mediaquery'];

  function App($scope, $window, $timeout, template, mediaquery) {
    var vm = this;
    vm.menu = {};
    vm.menu.active = false;
    vm.w = angular.element($window); // TODO: Refactor to directive.

    $scope.app = {
      getTitle: getTitle,
      screen: mediaquery.screenSize(),
      setTitle: setTitle,
      splash: false,
      title: '',
      section: 'home',
      'justiceText': null
    };

    activate();

    function activate() {
      console.log('Activating App Controller');
      template.get('app/language/menu.es.json')
      .then(function(result) {
        vm.menu = result;
        $scope.app.justiceText = result.justiceText;
        $scope.app.setTitle('Kiwi Networks');
        $timeout(function() {
          toggleSplash();
          showMenu();
        }, 1000);
      });
    }

    function getTitle() {
      return vm.title; 
    }

    function toggleSplash() {
      $scope.app.splash = !$scope.app.splash; 
    }

    function setTitle(title) {
      vm.title = title; 
    }

    function showMenu() {
      $timeout(function() {
        vm.menu.active = true;
        $scope.$emit('menuToggle', {active: true});
        $timeout(function() {
          vm.menu.active = false; 
          $scope.$emit('menuToggle', {active: false});
        }, 1500);
      }, 1500);
    }

    vm.w.bind('resize', function() {
      $scope.app.screen = mediaquery.screenSize();
      $scope.$apply();
    });

    $scope.$on('menuToggle', function(event, data) {
      if (data.active) {
        vm.section = {
          'margin-left': '150px'
        };
      } else {
        vm.section = {
          'margin-left': '0px'
        };
      }
    });
  }

})();
