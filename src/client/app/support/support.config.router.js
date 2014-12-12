(function() {
  'use strict';

  angular
  .module('app.support')
  .config(config);

  config.$inject = ['$stateProvider'];

  function config($stateProvider) {

    var support = {
      name: 'support',
      url: '/support',
      templateProvider: template,
      controller: 'Support',
      controllerAs: 'vm'
    };

    template.$inject = ['$timeout'];

    function template($timeout) {
      return $timeout(function() {
        return '<div data-ng-include=\"\'app/support/support.html\'\"</div>';
      });
    }

    $stateProvider.state(support);
  
  }

})();
