(function() {
  'use strict';

  angular
  .module('app.support')
  .config(config);

  config.$inject = ['$stateProvider'];

  function config($stateProvider) {

    var status = {
      name: 'status',
      url: '/status',
      templateProvider: template,
      controller: 'Status',
      controllerAs: 'vm'
    };

    template.$inject = ['$timeout'];

    function template($timeout) {
      return $timeout(function() {
        return '<div data-ng-include=\"\'app/support/status/status.html\'\"</div>';
      });
    }

    $stateProvider.state(status);
  
  }

})();
