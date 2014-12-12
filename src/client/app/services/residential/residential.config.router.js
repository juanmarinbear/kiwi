(function() {
  'use strict';

  angular
  .module('app.services')
  .config(config);

  config.$inject = ['$stateProvider'];

  function config($stateProvider) {

    var residential = {
      name: 'residential',
      url: '/residential',
      templateProvider: template,
      controller: 'Residential',
      controllerAs: 'vm'
    };

    template.$inject = ['$timeout'];

    function template($timeout) {
      return $timeout(function() {
        return '<div data-ng-include=\"\'app/services/residential/residential.html\'\"</div>';
      });
    }

    $stateProvider.state(residential);
  
  }

})();
