(function() {
  'use strict';

  angular
  .module('app.company')
  .config(config);

  config.$inject = ['$stateProvider'];

  function config($stateProvider) {

    var unsubscribe = {
      name: 'unsubscribe',
      url: '/unsubscribe',
      templateProvider: template,
      controller: 'Unsubscribe',
      controllerAs: 'vm'
    };

    template.$inject = ['$timeout'];

    function template($timeout) {
      return $timeout(function() {
        return '<div data-ng-include=\"\'app/company/unsubscribe/unsubscribe.html\'\"</div>';
      });
    }

    $stateProvider.state(unsubscribe);
  
  }

})();
