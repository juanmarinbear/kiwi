(function() {
  'use strict';

  angular
  .module('app.services')
  .config(config);

  config.$inject = ['$stateProvider'];

  function config($stateProvider) {

    var services = {
      name: 'services',
      url: '/services',
      templateProvider: template,
      controller: 'Services',
      controllerAs: 'vm'
    };

    template.$inject = ['$timeout'];

    function template($timeout) {
      return $timeout(function() {
        return '<div data-ng-include=\"\'app/services/services.html\'\"</div>';
      });
    }

    $stateProvider.state(services);
  
  }

})();
