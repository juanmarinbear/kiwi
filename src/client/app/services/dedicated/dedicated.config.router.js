(function() {
  'use strict';

  angular
  .module('app.services')
  .config(config);

  config.$inject = ['$stateProvider'];

  function config($stateProvider) {

    var dedicated = {
      name: 'dedicated',
      url: '/dedicated',
      templateProvider: template,
      controller: 'Dedicated',
      controllerAs: 'vm'
    };

    template.$inject = ['$timeout'];

    function template($timeout) {
      return $timeout(function() {
        return '<div data-ng-include=\"\'app/services/dedicated/dedicated.html\'\"</div>';
      });
    }

    $stateProvider.state(dedicated);
  
  }

})();
