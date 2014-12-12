(function() {
  'use strict';

  angular
  .module('app.company')
  .config(config);

  config.$inject = ['$stateProvider'];

  function config($stateProvider) {

    var concesion = {
      name: 'concesion',
      url: '/concesion',
      templateProvider: template,
      controller: 'Concesion',
      controllerAs: 'vm'
    };

    template.$inject = ['$timeout'];

    function template($timeout) {
      return $timeout(function() {
        return '<div data-ng-include=\"\'app/company/concesion/concesion.html\'\"</div>';
      });
    }

    $stateProvider.state(concesion);
  
  }

})();
