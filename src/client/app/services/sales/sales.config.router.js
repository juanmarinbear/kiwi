(function() {
  'use strict';

  angular
  .module('app.services')
  .config(config);

  config.$inject = ['$stateProvider'];

  function config($stateProvider) {

    var sales = {
      name: 'sales',
      url: '/sales/:service',
      templateProvider: template,
      controller: 'Sales',
      controllerAs: 'vm'
    };

    template.$inject = ['$timeout'];

    function template($timeout) {
      return $timeout(function() {
        return '<div data-ng-include=\"\'app/services/sales/sales.html\'\"</div>';
      });
    }

    $stateProvider.state(sales);
  
  }

})();
