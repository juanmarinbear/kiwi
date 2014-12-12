(function() {
  'use strict';

  angular
  .module('app.services')
  .config(config);

  config.$inject = ['$stateProvider'];

  function config($stateProvider) {

    var business = {
      name: 'business',
      url: '/business',
      templateProvider: template,
      controller: 'Business',
      controllerAs: 'vm'
    };

    template.$inject = ['$timeout'];

    function template($timeout) {
      return $timeout(function() {
        return '<div data-ng-include=\"\'app/services/business/business.html\'\"</div>';
      });
    }

    $stateProvider.state(business);
  
  }

})();
