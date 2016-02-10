(function() {
  'use strict';

  angular
  .module('app.company')
  .config(config);

  config.$inject = ['$stateProvider'];

  function config($stateProvider) {

    var justice = {
      name: 'justice',
      url: '/serguridad-y-justicia',
      templateProvider: template,
      controller: 'Justice',
      controllerAs: 'vm'
    };

    template.$inject = ['$timeout'];

    function template($timeout) {
      return $timeout(function() {
        return '<div data-ng-include=\"\'app/company/justice/justice.html\'\"</div>';
      });
    }

    $stateProvider.state(justice);
  
  }

})();
