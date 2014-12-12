(function() {
  'use strict';

  angular
  .module('app.company')
  .config(config);

  config.$inject = ['$stateProvider'];

  function config($stateProvider) {

    var apply = {
      name: 'apply',
      url: '/apply/:role',
      templateProvider: template,
      controller: 'Apply',
      controllerAs: 'vm'
    };

    template.$inject = ['$timeout'];

    function template($timeout) {
      return $timeout(function() {
        return '<div data-ng-include=\"\'app/company/apply/apply.html\'\"</div>';
      });
    }

    $stateProvider.state(apply);
  
  }

})();
