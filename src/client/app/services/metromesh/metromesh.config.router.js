(function() {
  'use strict';

  angular
  .module('app.services')
  .config(config);

  config.$inject = ['$stateProvider'];

  function config($stateProvider) {

    var metromesh = {
      name: 'metromesh',
      url: '/metromesh',
      templateProvider: template,
      controller: 'Metromesh',
      controllerAs: 'vm'
    };

    template.$inject = ['$timeout'];

    function template($timeout) {
      return $timeout(function() {
        return '<div data-ng-include=\"\'app/services/metromesh/metromesh.html\'\"</div>';
      });
    }

    $stateProvider.state(metromesh);
  
  }

})();
