(function() {
  'use strict';

  angular
  .module('app.company')
  .config(config);

  config.$inject = ['$stateProvider'];

  function config($stateProvider) {

    var security = {
      name: 'security',
      url: '/security',
      templateProvider: template,
      controller: 'Security',
      controllerAs: 'vm'
    };

    template.$inject = ['$timeout'];

    function template($timeout) {
      return $timeout(function() {
        return '<div data-ng-include=\"\'app/company/security/security.html\'\"</div>';
      });
    }

    $stateProvider.state(security);
  
  }

})();
