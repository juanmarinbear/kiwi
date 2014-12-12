(function() {
  'use strict';

  angular
  .module('app.customer')
  .config(config);

  config.$inject = ['$stateProvider'];

  function config($stateProvider) {

    var refer = {
      name: 'refer',
      url: '/refer',
      templateProvider: template,
      controller: 'Refer',
      controllerAs: 'vm'
    };

    template.$inject = ['$timeout'];

    function template($timeout) {
      return $timeout(function() {
        return '<div data-ng-include=\"\'app/customer/refer/refer.html\'\"</div>';
      });
    }

    $stateProvider.state(refer);
  
  }

})();
