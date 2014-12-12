(function() {
  'use strict';

  angular
  .module('app.home')
  .config(config);

  config.$inject = ['$stateProvider'];

  function config($stateProvider) {

    var home = {
      name: 'home',
      url: '/',
      templateProvider: template,
      controller: 'Home',
      controllerAs: 'vm'
    };

    template.$inject = ['$timeout'];

    function template($timeout) {
      return $timeout(function() {
        return '<div data-ng-include=\"\'app/home/home.html\'\"</div>';
      });
    }

    $stateProvider.state(home);
  
  }

})();
