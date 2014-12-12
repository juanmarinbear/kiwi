(function() {
  'use strict';

  angular
  .module('app.customer')
  .config(config);

  config.$inject = ['$stateProvider'];

  function config($stateProvider) {

    var dashboard = {
      name: 'dashboard',
      url: '/dashboard',
      templateProvider: template,
      controller: 'Dashboard',
      controllerAs: 'vm'
    };

    template.$inject = ['$timeout'];

    function template($timeout) {
      return $timeout(function() {
        return '<div data-ng-include=\"\'app/customer/dashboard/dashboard.html\'\"</div>';
      });
    }

    $stateProvider.state(dashboard);
  
  }

})();
